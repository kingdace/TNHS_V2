<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HistoryMilestone;
use Illuminate\Http\Request;

class HistoryMilestoneController extends Controller
{
    /**
     * Get public milestones
     */
    public function public()
    {
        try {
            $milestones = HistoryMilestone::where('is_active', true)
                ->orderBy('year', 'asc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $milestones,
                'message' => 'Milestones retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve milestones',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
