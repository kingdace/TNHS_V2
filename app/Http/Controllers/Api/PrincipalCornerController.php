<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PrincipalCorner;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PrincipalCornerController extends Controller
{
    /**
     * Display a listing of active principal corner content.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = PrincipalCorner::active()->published()->ordered();

            // Filter by content type if specified
            if ($request->has('type')) {
                $query->byType($request->type);
            }

            // Filter by featured if specified
            if ($request->has('featured')) {
                $query->featured();
            }

            // Limit results if specified
            $limit = $request->get('limit');
            if ($limit) {
                $content = $query->limit($limit)->get();
            } else {
                $content = $query->get();
            }

            return response()->json([
                'success' => true,
                'data' => $content,
                'message' => 'Principal corner content retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve principal corner content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified principal corner content.
     */
    public function show(PrincipalCorner $principalCorner): JsonResponse
    {
        try {
            if (!$principalCorner->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Principal corner content not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $principalCorner,
                'message' => 'Principal corner content retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve principal corner content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get featured principal corner content.
     */
    public function featured(): JsonResponse
    {
        try {
            $content = PrincipalCorner::active()
                ->published()
                ->featured()
                ->ordered()
                ->limit(6)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $content,
                'message' => 'Featured principal corner content retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve featured principal corner content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get principal messages.
     */
    public function messages(): JsonResponse
    {
        try {
            $content = PrincipalCorner::active()
                ->published()
                ->byType('message')
                ->ordered()
                ->limit(5)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $content,
                'message' => 'Principal messages retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve principal messages',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get principal announcements.
     */
    public function announcements(): JsonResponse
    {
        try {
            $content = PrincipalCorner::active()
                ->published()
                ->byType('announcement')
                ->ordered()
                ->limit(5)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $content,
                'message' => 'Principal announcements retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve principal announcements',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get principal vision.
     */
    public function vision(): JsonResponse
    {
        try {
            $content = PrincipalCorner::active()
                ->published()
                ->byType('vision')
                ->ordered()
                ->first();

            return response()->json([
                'success' => true,
                'data' => $content,
                'message' => 'Principal vision retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve principal vision',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
