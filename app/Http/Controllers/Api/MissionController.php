<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    /**
     * Get public missions
     */
    public function public()
    {
        try {
            $missions = Mission::active()
                ->ordered()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $missions,
                'message' => 'Missions retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve missions',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
