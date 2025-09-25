<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HistoryAchievement;
use Illuminate\Http\Request;

class HistoryAchievementController extends Controller
{
    /**
     * Get public achievements
     */
    public function public()
    {
        try {
            $achievements = HistoryAchievement::where('is_active', true)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $achievements,
                'message' => 'Achievements retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve achievements',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
