<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicProgram;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class AcademicProgramController extends Controller
{
    /**
     * Display a listing of academic programs.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = AcademicProgram::query();

            // Apply filters
            if ($request->has('type') && $request->type) {
                $query->byType($request->type);
            }

            if ($request->has('grade') && $request->grade) {
                $query->byGrade($request->grade);
            }

            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Apply ordering
            $query->ordered();

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
     * Store a newly created academic program.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'program_type' => ['required', Rule::in(['junior_high', 'senior_high', 'special'])],
                'grade_level' => 'nullable|integer|min:1|max:12',
                'program_name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'subjects' => 'nullable|array',
                'subjects.*' => 'string|max:255',
                'requirements' => 'nullable|string',
                'duration' => 'nullable|string|max:100',
                'is_active' => 'boolean',
                'display_order' => 'integer|min:0',
                // Rich content fields
                'page_content' => 'nullable|array',
                'program_benefits' => 'nullable|array',
                'why_choose_features' => 'nullable|array',
                'admission_requirements' => 'nullable|array',
                'images' => 'nullable|array',
                'curriculum_highlights' => 'nullable|array',
                'facilities' => 'nullable|array',
                'extracurricular_activities' => 'nullable|array',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string',
                'meta_keywords' => 'nullable|array',
                'featured' => 'boolean',
                'banner_color' => 'nullable|string|max:50',
                'theme_color' => 'nullable|string|max:50',
            ]);

            $program = AcademicProgram::create($validated);

            return response()->json([
                'success' => true,
                'data' => $program,
                'message' => 'Academic program created successfully'
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create academic program',
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
     * Update the specified academic program.
     */
    public function update(Request $request, AcademicProgram $academicProgram): JsonResponse
    {
        try {
            $validated = $request->validate([
                'program_type' => ['sometimes', Rule::in(['junior_high', 'senior_high', 'special'])],
                'grade_level' => 'nullable|integer|min:1|max:12',
                'program_name' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'subjects' => 'nullable|array',
                'subjects.*' => 'string|max:255',
                'requirements' => 'nullable|string',
                'duration' => 'nullable|string|max:100',
                'is_active' => 'boolean',
                'display_order' => 'integer|min:0',
                // Rich content fields
                'page_content' => 'nullable|array',
                'program_benefits' => 'nullable|array',
                'why_choose_features' => 'nullable|array',
                'admission_requirements' => 'nullable|array',
                'images' => 'nullable|array',
                'curriculum_highlights' => 'nullable|array',
                'facilities' => 'nullable|array',
                'extracurricular_activities' => 'nullable|array',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string',
                'meta_keywords' => 'nullable|array',
                'featured' => 'boolean',
                'banner_color' => 'nullable|string|max:50',
                'theme_color' => 'nullable|string|max:50',
            ]);

            $academicProgram->update($validated);

            return response()->json([
                'success' => true,
                'data' => $academicProgram,
                'message' => 'Academic program updated successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update academic program',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified academic program.
     */
    public function destroy(AcademicProgram $academicProgram): JsonResponse
    {
        try {
            $academicProgram->delete();

            return response()->json([
                'success' => true,
                'message' => 'Academic program deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete academic program',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of academic program.
     */
    public function toggleActive(AcademicProgram $academicProgram): JsonResponse
    {
        try {
            $academicProgram->update(['is_active' => !$academicProgram->is_active]);

            return response()->json([
                'success' => true,
                'data' => $academicProgram,
                'message' => 'Academic program status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update academic program status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reorder academic programs.
     */
    public function reorder(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'programs' => 'required|array',
                'programs.*.id' => 'required|exists:academic_programs,id',
                'programs.*.display_order' => 'required|integer|min:0',
            ]);

            foreach ($validated['programs'] as $programData) {
                AcademicProgram::where('id', $programData['id'])
                    ->update(['display_order' => $programData['display_order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Academic programs reordered successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to reorder academic programs',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
