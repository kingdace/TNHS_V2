<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GoalObjective;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GoalObjectiveController extends Controller
{
    /**
     * Display a listing of goals/objectives.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = GoalObjective::query();

            // Apply filters
            if ($request->has('category') && $request->category) {
                $query->byCategory($request->category);
            }

            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Apply ordering
            $query->ordered();

            $goals = $query->get();

            return response()->json([
                'success' => true,
                'data' => $goals,
                'message' => 'Goals and objectives retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve goals and objectives',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created goal/objective.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'category' => 'required|string|max:100',
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $goal = GoalObjective::create($validated);

            return response()->json([
                'success' => true,
                'data' => $goal,
                'message' => 'Goal/Objective created successfully'
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
                'message' => 'Failed to create goal/objective',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified goal/objective.
     */
    public function show(GoalObjective $goalObjective): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $goalObjective,
                'message' => 'Goal/Objective retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve goal/objective',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified goal/objective.
     */
    public function update(Request $request, GoalObjective $goalObjective): JsonResponse
    {
        try {
            $validated = $request->validate([
                'category' => 'required|string|max:100',
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $goalObjective->update($validated);

            return response()->json([
                'success' => true,
                'data' => $goalObjective,
                'message' => 'Goal/Objective updated successfully'
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
                'message' => 'Failed to update goal/objective',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified goal/objective.
     */
    public function destroy(GoalObjective $goalObjective): JsonResponse
    {
        try {
            $goalObjective->delete();

            return response()->json([
                'success' => true,
                'message' => 'Goal/Objective deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete goal/objective',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of goal/objective.
     */
    public function toggleActive(GoalObjective $goalObjective): JsonResponse
    {
        try {
            $goalObjective->update(['is_active' => !$goalObjective->is_active]);

            return response()->json([
                'success' => true,
                'data' => $goalObjective,
                'message' => 'Goal/Objective status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update goal/objective status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
