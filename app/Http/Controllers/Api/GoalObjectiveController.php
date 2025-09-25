<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GoalObjective;
use Illuminate\Http\Request;

class GoalObjectiveController extends Controller
{
    /**
     * Get public goals/objectives
     */
    public function public(Request $request)
    {
        try {
            $query = GoalObjective::active();

            // Filter by category if specified
            if ($request->has('category') && $request->category) {
                $query->byCategory($request->category);
            }

            $goals = $query->ordered()->get();

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
}
