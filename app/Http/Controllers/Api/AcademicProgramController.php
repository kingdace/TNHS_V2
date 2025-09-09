<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AcademicProgram;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AcademicProgramController extends Controller
{
    /**
     * Display a listing of active academic programs.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = AcademicProgram::active()->ordered();

            // Filter by program type if specified
            if ($request->has('type')) {
                $query->byType($request->type);
            }

            // Filter by grade level if specified
            if ($request->has('grade')) {
                $query->byGrade($request->grade);
            }

            $programs = $query->get();

            return response()->json([
                'success' => true,
                'data' => $programs,
                'message' => 'Academic programs retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve academic programs',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified academic program.
     */
    public function show(AcademicProgram $academicProgram): JsonResponse
    {
        try {
            if (!$academicProgram->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Academic program not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $academicProgram,
                'message' => 'Academic program retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve academic program',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get programs by type (junior_high, senior_high, special).
     */
    public function byType(string $type): JsonResponse
    {
        try {
            $programs = AcademicProgram::active()
                ->byType($type)
                ->ordered()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $programs,
                'message' => "{$type} programs retrieved successfully"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve programs by type',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get programs by grade level.
     */
    public function byGrade(int $grade): JsonResponse
    {
        try {
            $programs = AcademicProgram::active()
                ->byGrade($grade)
                ->ordered()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $programs,
                'message' => "Grade {$grade} programs retrieved successfully"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve programs by grade',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
