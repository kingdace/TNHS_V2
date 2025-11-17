<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PrincipalProfile;
use Illuminate\Http\JsonResponse;

class PrincipalProfileController extends Controller
{
    /**
     * Display a listing of active principal profiles.
     */
    public function index(): JsonResponse
    {
        try {
            $profile = PrincipalProfile::active()->with(['awards' => function($query) {
                $query->active()->ordered();
            }])->first();

            return response()->json([
                'success' => true,
                'data' => $profile,
                'message' => 'Principal profile retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve principal profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified principal profile.
     */
    public function show(PrincipalProfile $principalProfile): JsonResponse
    {
        try {
            if (!$principalProfile->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Principal profile not found'
                ], 404);
            }

            $principalProfile->load(['awards' => function($query) {
                $query->active()->ordered();
            }]);

            return response()->json([
                'success' => true,
                'data' => $principalProfile,
                'message' => 'Principal profile retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve principal profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

