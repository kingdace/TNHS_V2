<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PrivacyPolicy;
use Illuminate\Http\Request;

class PrivacyPolicyController extends Controller
{
    /**
     * Get public privacy policy
     */
    public function public()
    {
        try {
            $policy = PrivacyPolicy::active()->first();

            if (!$policy) {
                return response()->json([
                    'success' => true,
                    'data' => null,
                    'message' => 'No active privacy policy found'
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $policy,
                'message' => 'Privacy policy retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve privacy policy',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
