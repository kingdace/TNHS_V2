<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PrincipalAward;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PrincipalAwardController extends Controller
{
    /**
     * Display a listing of active awards.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = PrincipalAward::active()->ordered();

            // Filter by level if specified
            if ($request->has('level')) {
                $query->byLevel($request->level);
            }

            // Filter by principal_profile_id if specified
            if ($request->has('principal_profile_id')) {
                $query->where('principal_profile_id', $request->principal_profile_id);
            }

            $awards = $query->get();

            return response()->json([
                'success' => true,
                'data' => $awards,
                'message' => 'Principal awards retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve principal awards',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

