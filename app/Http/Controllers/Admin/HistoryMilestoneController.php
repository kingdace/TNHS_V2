<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HistoryMilestone;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class HistoryMilestoneController extends Controller
{
    /**
     * Display a listing of history milestones.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = HistoryMilestone::query();

            // Apply filters
            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Apply ordering
            $query->ordered();

            $milestones = $query->get();

            return response()->json([
                'success' => true,
                'data' => $milestones,
                'message' => 'History milestones retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve history milestones',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created history milestone.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'year' => 'required|string|max:10',
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'icon' => 'nullable|string|max:50',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $milestone = HistoryMilestone::create($validated);

            return response()->json([
                'success' => true,
                'data' => $milestone,
                'message' => 'History milestone created successfully'
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
                'message' => 'Failed to create history milestone',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified history milestone.
     */
    public function show(HistoryMilestone $milestone): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $milestone,
                'message' => 'History milestone retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve history milestone',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified history milestone.
     */
    public function update(Request $request, HistoryMilestone $milestone): JsonResponse
    {
        try {
            $validated = $request->validate([
                'year' => 'sometimes|string|max:10',
                'title' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'icon' => 'nullable|string|max:50',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $milestone->update($validated);

            return response()->json([
                'success' => true,
                'data' => $milestone,
                'message' => 'History milestone updated successfully'
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
                'message' => 'Failed to update history milestone',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified history milestone.
     */
    public function destroy(HistoryMilestone $milestone): JsonResponse
    {
        try {
            $milestone->delete();

            return response()->json([
                'success' => true,
                'message' => 'History milestone deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete history milestone',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
