<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PrincipalAward;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PrincipalAwardController extends Controller
{
    /**
     * Display a listing of principal awards.
     */
    public function index(Request $request): JsonResponse
    {
        $query = PrincipalAward::query();

        if ($request->has('principal_profile_id')) {
            $query->where('principal_profile_id', $request->principal_profile_id);
        }

        $awards = $query->ordered()->get();

        return response()->json([
            'success' => true,
            'data' => $awards
        ]);
    }

    /**
     * Store a newly created award.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'principal_profile_id' => 'required|exists:principal_profiles,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'award_year' => 'required|string|max:255',
            'level' => 'required|in:local,provincial,regional,national,international',
            'issuing_organization' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'image_path' => 'nullable|string',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        // Set defaults for optional fields
        $validated['display_order'] = $validated['display_order'] ?? 0;
        $validated['is_active'] = $validated['is_active'] ?? true;

        $award = PrincipalAward::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Principal award created successfully!',
            'data' => $award
        ], 201);
    }

    /**
     * Update the specified award.
     */
    public function update(Request $request, PrincipalAward $principalAward): JsonResponse
    {
        $validated = $request->validate([
            'principal_profile_id' => 'sometimes|exists:principal_profiles,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'award_year' => 'sometimes|string|max:255',
            'level' => 'sometimes|in:local,provincial,regional,national,international',
            'issuing_organization' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'image_path' => 'nullable|string',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $principalAward->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Principal award updated successfully!',
            'data' => $principalAward->fresh()
        ]);
    }

    /**
     * Remove the specified award.
     */
    public function destroy(PrincipalAward $principalAward): JsonResponse
    {
        $principalAward->delete();

        return response()->json([
            'success' => true,
            'message' => 'Principal award deleted successfully!'
        ]);
    }

    /**
     * Toggle active status.
     */
    public function toggleActive(PrincipalAward $principalAward): JsonResponse
    {
        $principalAward->is_active = !$principalAward->is_active;
        $principalAward->save();

        return response()->json([
            'success' => true,
            'message' => 'Award status updated!',
            'data' => $principalAward
        ]);
    }

    /**
     * Reorder awards.
     */
    public function reorder(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'awards' => 'required|array',
            'awards.*.id' => 'required|exists:principal_awards,id',
            'awards.*.display_order' => 'required|integer',
        ]);

        foreach ($validated['awards'] as $award) {
            PrincipalAward::where('id', $award['id'])
                ->update(['display_order' => $award['display_order']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Awards reordered successfully!'
        ]);
    }
}

