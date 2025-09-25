<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolInfo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SchoolInfoController extends Controller
{
    /**
     * Display a listing of active school information.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = SchoolInfo::active()->ordered();

            // Filter by info type if specified
            if ($request->has('type')) {
                $query->byType($request->type);
            }

            $schoolInfo = $query->get();

            return response()->json([
                'success' => true,
                'data' => $schoolInfo,
                'message' => 'School information retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve school information',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified school information.
     */
    public function show(SchoolInfo $schoolInfo): JsonResponse
    {
        try {
            if (!$schoolInfo->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'School information not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $schoolInfo,
                'message' => 'School information retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve school information',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get school information by type.
     */
    public function byType(string $type): JsonResponse
    {
        try {
            $schoolInfo = SchoolInfo::active()
                ->byType($type)
                ->ordered()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $schoolInfo,
                'message' => "School information for type '{$type}' retrieved successfully"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve school information by type',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get specific school information types (history, mission, vision, etc.).
     */
    public function history(): JsonResponse
    {
        $schoolInfo = SchoolInfo::active()
            ->byType('history')
            ->ordered()
            ->first(); // Return only the first record

        if (!$schoolInfo) {
            return response()->json([
                'success' => false,
                'message' => 'History information not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $schoolInfo,
            'message' => 'History information retrieved successfully'
        ]);
    }

    public function mission(): JsonResponse
    {
        return $this->byType('mission');
    }

    public function vision(): JsonResponse
    {
        return $this->byType('vision');
    }

    public function values(): JsonResponse
    {
        return $this->byType('values');
    }

    public function achievements(): JsonResponse
    {
        return $this->byType('achievements');
    }

    public function facilities(): JsonResponse
    {
        return $this->byType('facilities');
    }
}
