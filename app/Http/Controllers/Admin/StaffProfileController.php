<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StaffProfile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

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
            $validated = $request->validate([
                'user_id' => 'nullable|exists:users,id',
                'staff_type' => ['required', Rule::in(['principal', 'assistant_principal', 'teacher', 'admin', 'support'])],
                'full_name' => 'required|string|max:255',
                'position' => 'nullable|string|max:255',
                'department' => 'nullable|string|max:255',
                'education' => 'nullable|string',
                'experience' => 'nullable|string',
                'achievements' => 'nullable|string',
                'profile_image' => 'nullable|string|max:255',
                'contact_info' => 'nullable|array',
                'contact_info.email' => 'nullable|email|max:255',
                'contact_info.phone' => 'nullable|string|max:20',
                'contact_info.address' => 'nullable|string|max:500',
                'is_active' => 'boolean',
                'display_order' => 'integer|min:0',
            ]);

            $staff = StaffProfile::create($validated);

            return response()->json([
                'success' => true,
                'data' => $staff,
                'message' => 'Staff profile created successfully'
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
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
                'profile_image' => 'nullable|string|max:255',
                'contact_info' => 'nullable|array',
                'contact_info.email' => 'nullable|email|max:255',
                'contact_info.phone' => 'nullable|string|max:20',
                'contact_info.address' => 'nullable|string|max:500',
                'is_active' => 'boolean',
                'display_order' => 'integer|min:0',
            ]);

            $staffProfile->update($validated);

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
}
