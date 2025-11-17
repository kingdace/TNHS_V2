<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PrincipalProfile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class PrincipalProfileController extends Controller
{
    /**
     * Display a listing of principal profiles.
     */
    public function index(): JsonResponse
    {
        $profiles = PrincipalProfile::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $profiles
        ]);
    }

    /**
     * Store a newly created principal profile.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'leadership_profile' => 'nullable|string',
            'office_hours' => 'nullable|string',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'contact_info' => 'nullable|array',
            'office_hours_detail' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('profile_image')) {
            $image = $request->file('profile_image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('principal-profiles', $imageName, 'public');
            $validated['profile_image'] = $imagePath;
        }

        $profile = PrincipalProfile::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Principal profile created successfully!',
            'data' => $profile
        ], 201);
    }

    /**
     * Update the specified principal profile.
     */
    public function update(Request $request, PrincipalProfile $principalProfile): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'sometimes|string|max:255',
            'position' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255',
            'phone' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'leadership_profile' => 'nullable|string',
            'office_hours' => 'nullable|string',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'contact_info' => 'nullable|array',
            'office_hours_detail' => 'nullable|array',
            'is_active' => 'sometimes|boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('profile_image')) {
            // Delete old image if exists
            if ($principalProfile->profile_image && \Storage::disk('public')->exists($principalProfile->profile_image)) {
                \Storage::disk('public')->delete($principalProfile->profile_image);
            }

            $image = $request->file('profile_image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('principal-profiles', $imageName, 'public');
            $validated['profile_image'] = $imagePath;
        }

        $principalProfile->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Principal profile updated successfully!',
            'data' => $principalProfile
        ]);
    }

    /**
     * Remove the specified principal profile.
     */
    public function destroy(PrincipalProfile $principalProfile): JsonResponse
    {
        $principalProfile->delete();

        return response()->json([
            'success' => true,
            'message' => 'Principal profile deleted successfully!'
        ]);
    }

    /**
     * Toggle active status.
     */
    public function toggleActive(PrincipalProfile $principalProfile): JsonResponse
    {
        $principalProfile->is_active = !$principalProfile->is_active;
        $principalProfile->save();

        return response()->json([
            'success' => true,
            'message' => 'Principal profile status updated!',
            'data' => $principalProfile
        ]);
    }
}

