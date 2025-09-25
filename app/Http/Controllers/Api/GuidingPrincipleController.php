<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GuidingPrinciple;
use Illuminate\Http\Request;

class GuidingPrincipleController extends Controller
{
    /**
     * Get public guiding principles
     */
    public function public()
    {
        try {
            $principles = GuidingPrinciple::active()
                ->ordered()
                ->get();

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
}
