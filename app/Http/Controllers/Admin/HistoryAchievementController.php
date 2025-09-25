<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HistoryAchievement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HistoryAchievementController extends Controller
{
    /**
     * Display a listing of history achievements.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = HistoryAchievement::query();

            // Apply filters
            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Apply ordering
            $query->ordered();

            $achievements = $query->get();

            return response()->json([
                'success' => true,
                'data' => $achievements,
                'message' => 'History achievements retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve history achievements',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created history achievement.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $achievement = HistoryAchievement::create($validated);

            return response()->json([
                'success' => true,
                'data' => $achievement,
                'message' => 'History achievement created successfully'
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
                'message' => 'Failed to create history achievement',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified history achievement.
     */
    public function show(HistoryAchievement $achievement): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $achievement,
                'message' => 'History achievement retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve history achievement',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified history achievement.
     */
    public function update(Request $request, HistoryAchievement $achievement): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $achievement->update($validated);

            return response()->json([
                'success' => true,
                'data' => $achievement,
                'message' => 'History achievement updated successfully'
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
                'message' => 'Failed to update history achievement',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified history achievement.
     */
    public function destroy(HistoryAchievement $achievement): JsonResponse
    {
        try {
            $achievement->delete();

            return response()->json([
                'success' => true,
                'message' => 'History achievement deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete history achievement',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
