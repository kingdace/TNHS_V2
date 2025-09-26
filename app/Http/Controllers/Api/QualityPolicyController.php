<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QualityPolicy;
use Illuminate\Http\Request;

class QualityPolicyController extends Controller
{
    /**
     * Get public quality policy
     */
    public function public()
    {
        try {
            $policy = QualityPolicy::active()->first();

            if (!$policy) {
                return response()->json([
                    'success' => true,
                    'data' => null,
                    'message' => 'No active quality policy found'
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $policy,
                'message' => 'Quality policy retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve quality policy',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
