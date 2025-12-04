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

    /**
     * Get Junior High School program with rich content.
     */
    public function getJuniorHigh(): JsonResponse
    {
        try {
            $program = AcademicProgram::active()
                ->byType('junior_high')
                ->where('program_name', 'Junior High School Program')
                ->first();

            if (!$program) {
                return response()->json([
                    'success' => false,
                    'message' => 'Junior High School program not found'
                ], 404);
            }

            // Transform data for frontend consumption with safe access
            $transformedData = [
                'id' => $program->id,
                'program_name' => $program->program_name,
                'description' => $program->description,
                'page_content' => $program->page_content ?? [
                    'header_title' => 'WHY CHOOSE TAFT NHS JUNIOR HIGH SCHOOL?',
                    'main_description' => $program->description,
                    'section_titles' => [
                        'benefits' => 'PROGRAM BENEFITS',
                        'features' => 'Why Choose Our Junior High School?',
                        'requirements' => 'Admission Requirements'
                    ]
                ],
                'program_benefits' => $program->program_benefits ?? [],
                'why_choose_features' => $program->why_choose_features ?? [],
                'admission_requirements' => $program->admission_requirements ?? [
                    'documents' => [],
                    'schedule' => []
                ],
                'images' => $program->images ?? [
                    'logo' => '/images/JLOGO.jpg',
                    'academic_excellence' => '/images/ACAD.jpg',
                    'student_life' => '/images/J1.jpg'
                ],
                'subjects' => $program->subjects ?? [],
                'curriculum_highlights' => $program->curriculum_highlights ?? [],
                'meta_title' => $program->meta_title ?? $program->program_name,
                'meta_description' => $program->meta_description ?? $program->description,
                'theme_color' => $program->theme_color ?? 'blue',
                'banner_color' => $program->banner_color ?? 'blue',
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedData,
                'message' => 'Junior High School program retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve Junior High School program',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get ALS program with rich content.
     */
    public function getALS(): JsonResponse
    {
        try {
            $program = AcademicProgram::active()
                ->byType('special')
                ->where('program_name', 'Alternative Learning System (ALS)')
                ->first();

            if (!$program) {
                return response()->json([
                    'success' => false,
                    'message' => 'ALS program not found'
                ], 404);
            }

            // Transform data for frontend consumption with safe access
            $transformedData = [
                'id' => $program->id,
                'program_name' => $program->program_name,
                'description' => $program->description,
                'page_content' => $program->page_content ?? [
                    'header_title' => 'TAFT NATIONAL HIGH SCHOOL ALS SHS',
                    'main_description' => $program->description,
                    'section_titles' => [
                        'qualifications' => 'QUALIFICATIONS',
                        'requirements' => 'REQUIREMENTS',
                        'contact' => 'Contact Information',
                        'enrollment' => 'Enrollment Information'
                    ],
                    'call_to_action' => 'Ready to Join Our Alternative Learning System?',
                    'cta_description' => 'Contact our academic department to learn more about the ALS program, enrollment process, and flexible learning schedules.'
                ],
                'program_benefits' => $program->program_benefits ?? [],
                'why_choose_features' => $program->why_choose_features ?? [],
                'admission_requirements' => $program->admission_requirements ?? [
                    'documents' => [],
                    'contact_info' => []
                ],
                'images' => $program->images ?? [
                    'main' => '/images/ALS.jpg'
                ],
                'subjects' => $program->subjects ?? [],
                'meta_title' => $program->meta_title ?? $program->program_name,
                'meta_description' => $program->meta_description ?? $program->description,
                'theme_color' => $program->theme_color ?? 'blue-green',
                'banner_color' => $program->banner_color ?? 'blue-green',
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedData,
                'message' => 'ALS program retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve ALS program',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
