<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GuidingPrinciple;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GuidingPrincipleController extends Controller
{
    /**
     * Display a listing of guiding principles.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = GuidingPrinciple::query();

            // Apply filters
            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Apply ordering
            $query->ordered();

            $principles = $query->get();

            return response()->json([
                'success' => true,
                'data' => $principles,
                'message' => 'Guiding principles retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve guiding principles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created guiding principle.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'icon' => 'nullable|string|max:100',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $principle = GuidingPrinciple::create($validated);

            return response()->json([
                'success' => true,
                'data' => $principle,
                'message' => 'Guiding principle created successfully'
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
                'message' => 'Failed to create guiding principle',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified guiding principle.
     */
    public function show(GuidingPrinciple $guidingPrinciple): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $guidingPrinciple,
                'message' => 'Guiding principle retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve guiding principle',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified guiding principle.
     */
    public function update(Request $request, GuidingPrinciple $guidingPrinciple): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'icon' => 'nullable|string|max:100',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $guidingPrinciple->update($validated);

            return response()->json([
                'success' => true,
                'data' => $guidingPrinciple,
                'message' => 'Guiding principle updated successfully'
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
                'message' => 'Failed to update guiding principle',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified guiding principle.
     */
    public function destroy(GuidingPrinciple $guidingPrinciple): JsonResponse
    {
        try {
            $guidingPrinciple->delete();

            return response()->json([
                'success' => true,
                'message' => 'Guiding principle deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete guiding principle',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of guiding principle.
     */
    public function toggleActive(GuidingPrinciple $guidingPrinciple): JsonResponse
    {
        try {
            $guidingPrinciple->update(['is_active' => !$guidingPrinciple->is_active]);

            return response()->json([
                'success' => true,
                'data' => $guidingPrinciple,
                'message' => 'Guiding principle status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update guiding principle status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
