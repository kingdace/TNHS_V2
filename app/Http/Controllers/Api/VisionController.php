<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vision;
use Illuminate\Http\Request;

class VisionController extends Controller
{
    /**
     * Get public visions
     */
    public function public()
    {
        try {
            $visions = Vision::active()
                ->ordered()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $visions,
                'message' => 'Visions retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve visions',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
