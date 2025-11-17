<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StaffProfile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class StaffProfileController extends Controller
{
    /**
     * Display a listing of staff profiles.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = StaffProfile::query();

            // Apply filters
            if ($request->has('type') && $request->type) {
                $query->byType($request->type);
            }

            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Apply ordering
            $query->ordered();

            $staff = $query->get();

            // Add profile image URLs
            $staff->each(function ($profile) {
                if ($profile->profile_image) {
                    $profile->profile_image_url = asset('storage/' . $profile->profile_image);
                } else {
                    $profile->profile_image_url = null;
                }
            });

            return response()->json([
                'success' => true,
                'data' => $staff,
                'message' => 'Staff profiles retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve staff profiles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created staff profile.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Debug: Log the incoming request data
            \Log::info('Staff Profile Store Request:', [
                'all_data' => $request->all(),
                'files' => $request->allFiles(),
                'has_image' => $request->hasFile('profile_image')
            ]);

            $validated = $request->validate([
                'user_id' => 'nullable|exists:users,id',
                'staff_type' => ['required', Rule::in(['principal', 'assistant_principal', 'teacher', 'admin', 'support'])],
                'full_name' => 'required|string|max:255',
                'position' => 'nullable|string|max:255',
                'department' => 'nullable|string|max:255',
                'education' => 'nullable|string',
                'experience' => 'nullable|string',
                'achievements' => 'nullable|string',
                'profile_image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:5120', // Accept image file
                'contact_info' => 'nullable|string', // JSON string from frontend
                'is_active' => 'nullable|in:0,1,true,false',
                'display_order' => 'nullable|integer|min:0',
            ]);

            // Parse contact_info JSON if provided
            if (isset($validated['contact_info'])) {
                $validated['contact_info'] = json_decode($validated['contact_info'], true);
            }

            // Handle image upload
            $imagePath = null;
            if ($request->hasFile('profile_image')) {
                try {
                    $imagePath = $this->storeProfileImage($request->file('profile_image'));
                } catch (\Exception $e) {
                    Log::error('Image upload failed during staff creation', [
                        'error' => $e->getMessage(),
                        'file' => $request->file('profile_image')->getClientOriginalName()
                    ]);
                    // Continue without image - don't fail the entire creation
                    $imagePath = null;
                }
            }

            // Convert string values to proper types
            if (isset($validated['is_active'])) {
                $validated['is_active'] = in_array($validated['is_active'], ['1', 'true', true], true);
            }

            if (isset($validated['display_order'])) {
                $validated['display_order'] = $validated['display_order'] !== null && $validated['display_order'] !== ''
                    ? (int) $validated['display_order']
                    : 0;
            } else {
                $validated['display_order'] = 0; // Default value
            }

            $staff = StaffProfile::create([
                ...$validated,
                'profile_image' => $imagePath,
            ]);

            // Add image URL to response
            if ($staff->profile_image) {
                $staff->profile_image_url = asset('storage/' . $staff->profile_image);
            }

            return response()->json([
                'success' => true,
                'data' => $staff,
                'message' => 'Staff profile created successfully'
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Staff Profile Validation Error:', [
                'errors' => $e->errors(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
                'debug_data' => $request->all() // Temporary debug info
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Staff Profile Creation Error:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create staff profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified staff profile.
     */
    public function show(StaffProfile $staffProfile): JsonResponse
    {
        try {
            // Add profile image URL
            if ($staffProfile->profile_image) {
                $staffProfile->profile_image_url = asset('storage/' . $staffProfile->profile_image);
            } else {
                $staffProfile->profile_image_url = null;
            }

            return response()->json([
                'success' => true,
                'data' => $staffProfile,
                'message' => 'Staff profile retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve staff profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified staff profile.
     */
    public function update(Request $request, StaffProfile $staffProfile): JsonResponse
    {
        try {
            $validated = $request->validate([
                'user_id' => 'nullable|exists:users,id',
                'staff_type' => ['sometimes', Rule::in(['principal', 'assistant_principal', 'teacher', 'admin', 'support'])],
                'full_name' => 'sometimes|required|string|max:255',
                'position' => 'nullable|string|max:255',
                'department' => 'nullable|string|max:255',
                'education' => 'nullable|string',
                'experience' => 'nullable|string',
                'achievements' => 'nullable|string',
                'profile_image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:5120', // Accept image file for updates too
                'contact_info' => 'nullable|string', // JSON string from frontend
                'is_active' => 'nullable|in:0,1,true,false',
                'display_order' => 'nullable|integer|min:0',
            ]);

            // Parse contact_info JSON if provided
            if (isset($validated['contact_info'])) {
                $validated['contact_info'] = json_decode($validated['contact_info'], true);
            }

            // Handle image upload for updates
            if ($request->hasFile('profile_image')) {
                try {
                    // Delete old image if exists
                    if ($staffProfile->profile_image) {
                        Storage::delete('public/' . $staffProfile->profile_image);
                    }

                    $validated['profile_image'] = $this->storeProfileImage($request->file('profile_image'));
                } catch (\Exception $e) {
                    Log::error('Image upload failed during staff update', [
                        'error' => $e->getMessage(),
                        'staff_id' => $staffProfile->id,
                        'file' => $request->file('profile_image')->getClientOriginalName()
                    ]);
                    // Don't update the image field if upload fails
                    unset($validated['profile_image']);
                }
            }

            // Convert string values to proper types
            if (isset($validated['is_active'])) {
                $validated['is_active'] = in_array($validated['is_active'], ['1', 'true', true], true);
            }

            if (isset($validated['display_order'])) {
                $validated['display_order'] = $validated['display_order'] !== null && $validated['display_order'] !== ''
                    ? (int) $validated['display_order']
                    : 0;
            } else {
                $validated['display_order'] = 0; // Default value
            }

            $staffProfile->update($validated);

            // Add image URL to response
            if ($staffProfile->profile_image) {
                $staffProfile->profile_image_url = asset('storage/' . $staffProfile->profile_image);
            }

            return response()->json([
                'success' => true,
                'data' => $staffProfile,
                'message' => 'Staff profile updated successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update staff profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified staff profile.
     */
    public function destroy(StaffProfile $staffProfile): JsonResponse
    {
        try {
            $staffProfile->delete();

            return response()->json([
                'success' => true,
                'message' => 'Staff profile deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete staff profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of staff profile.
     */
    public function toggleActive(StaffProfile $staffProfile): JsonResponse
    {
        try {
            $staffProfile->update(['is_active' => !$staffProfile->is_active]);

            return response()->json([
                'success' => true,
                'data' => $staffProfile,
                'message' => 'Staff profile status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update staff profile status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reorder staff profiles.
     */
    public function reorder(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'profiles' => 'required|array',
                'profiles.*.id' => 'required|exists:staff_profiles,id',
                'profiles.*.display_order' => 'required|integer|min:0',
            ]);

            foreach ($validated['profiles'] as $profileData) {
                StaffProfile::where('id', $profileData['id'])
                    ->update(['display_order' => $profileData['display_order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Staff profiles reordered successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to reorder staff profiles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store profile image and return the path
     */
    private function storeProfileImage($file): string
    {
        try {
            // Validate the uploaded file
            if (!$file->isValid()) {
                throw new \Exception('Uploaded file is not valid');
            }

            // Generate unique filename
            $filename = Str::random(40) . '.' . $file->getClientOriginalExtension();

            Log::info('Attempting to store image', [
                'original_name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'filename' => $filename
            ]);

            // Store in staff-profiles folder using the public disk
            $path = $file->storeAs('staff-profiles', $filename, 'public');

            if (!$path) {
                throw new \Exception('Failed to store image file - storeAs returned false');
            }

            // Verify the file was actually stored
            if (!Storage::disk('public')->exists($path)) {
                throw new \Exception('File was not found after storage attempt');
            }

            Log::info('Image stored successfully', [
                'original_name' => $file->getClientOriginalName(),
                'stored_path' => $path,
                'filename' => $filename,
                'full_path' => Storage::disk('public')->path($path)
            ]);

            // Return the path (already without 'public/' prefix when using public disk)
            return $path;
        } catch (\Exception $e) {
            Log::error('Image storage failed', [
                'error' => $e->getMessage(),
                'file_name' => $file->getClientOriginalName() ?? 'unknown',
                'file_size' => $file->getSize() ?? 0,
                'is_valid' => $file->isValid() ?? false
            ]);
            throw $e;
        }
    }
}
