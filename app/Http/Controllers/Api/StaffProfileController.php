<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StaffProfile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StaffProfileController extends Controller
{
    /**
     * Get all active staff profiles
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = StaffProfile::active()->ordered();

            // Filter by type if provided
            if ($request->has('type') && $request->type) {
                $query->byType($request->type);
            }

            // Filter by department if provided
            if ($request->has('department') && $request->department) {
                $query->where('department', $request->department);
            }

            $staff = $query->get();

            // Add profile image URLs
            $staff->each(function ($profile) {
                if ($profile->profile_image) {
                    $profile->profile_image_url = asset('storage/' . $profile->profile_image);
                } else {
                    $profile->profile_image_url = null;
                }
            });

            return response()->json([
                'success' => true,
                'data' => $staff
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve staff profiles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get staff profiles by type
     */
    public function getByType($type): JsonResponse
    {
        try {
            $staff = StaffProfile::active()
                ->byType($type)
                ->ordered()
                ->get();

            // Add profile image URLs
            $staff->each(function ($profile) {
                if ($profile->profile_image) {
                    $profile->profile_image_url = asset('storage/' . $profile->profile_image);
                } else {
                    $profile->profile_image_url = null;
                }
            });

            return response()->json([
                'success' => true,
                'data' => $staff
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve staff profiles by type',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get single staff profile
     */
    public function show($id): JsonResponse
    {
        try {
            $staff = StaffProfile::active()->findOrFail($id);

            // Add profile image URL
            if ($staff->profile_image) {
                $staff->profile_image_url = asset('storage/' . $staff->profile_image);
            } else {
                $staff->profile_image_url = null;
            }

            return response()->json([
                'success' => true,
                'data' => $staff
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Staff profile not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Get staff statistics
     */
    public function getStatistics(): JsonResponse
    {
        try {
            $totalStaff = StaffProfile::active()->count();
            $byType = StaffProfile::active()
                ->selectRaw('staff_type, COUNT(*) as count')
                ->groupBy('staff_type')
                ->get()
                ->mapWithKeys(function ($item) {
                    return [$item->staff_type => $item->count];
                });

            $byDepartment = StaffProfile::active()
                ->whereNotNull('department')
                ->selectRaw('department, COUNT(*) as count')
                ->groupBy('department')
                ->get()
                ->mapWithKeys(function ($item) {
                    return [$item->department => $item->count];
                });

            // Grade level statistics for teachers
            $byGrade = [];
            $teachers = StaffProfile::active()->byType('teacher')->get();
            foreach ($teachers as $teacher) {
                if ($teacher->grade_levels) {
                    foreach ($teacher->grade_levels as $grade) {
                        if (!isset($byGrade[$grade])) {
                            $byGrade[$grade] = 0;
                        }
                        $byGrade[$grade]++;
                    }
                }
            }

            // Department heads count
            $departmentHeads = StaffProfile::active()->where('is_department_head', true)->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'total_staff' => $totalStaff,
                    'by_type' => $byType,
                    'by_department' => $byDepartment,
                    'by_grade' => $byGrade,
                    'department_heads' => $departmentHeads
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve staff statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get available staff types
     */
    public function getTypes(): JsonResponse
    {
        try {
            $types = [
                'principal' => 'Principal',
                'assistant_principal' => 'Assistant Principal',
                'teacher' => 'Teaching Staff',
                'admin' => 'Administrative Staff',
                'support' => 'Support Staff'
            ];

            // Get counts for each type
            $typesWithCount = [];
            foreach ($types as $key => $label) {
                $count = StaffProfile::active()->byType($key)->count();
                $typesWithCount[] = [
                    'value' => $key,
                    'label' => $label,
                    'count' => $count
                ];
            }

            return response()->json([
                'success' => true,
                'data' => $typesWithCount
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve staff types',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get available departments
     */
    public function getDepartments(): JsonResponse
    {
        try {
            $departments = StaffProfile::active()
                ->whereNotNull('department')
                ->distinct()
                ->pluck('department')
                ->sort()
                ->values();

            return response()->json([
                'success' => true,
                'data' => $departments
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve departments',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get staff profiles by grade level
     */
    public function getByGradeLevel($grade): JsonResponse
    {
        try {
            $staff = StaffProfile::active()
                ->byType('teacher')
                ->byGradeLevel($grade)
                ->ordered()
                ->get();

            // Add profile image URLs
            $staff->each(function ($profile) {
                if ($profile->profile_image) {
                    $profile->profile_image_url = asset('storage/' . $profile->profile_image);
                } else {
                    $profile->profile_image_url = null;
                }
            });

            return response()->json([
                'success' => true,
                'data' => $staff,
                'grade' => $grade
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve staff profiles by grade level',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get organizational hierarchy
     */
    public function getHierarchy(): JsonResponse
    {
        try {
            $hierarchy = StaffProfile::active()
                ->ordered()
                ->with(['supervisor', 'subordinates'])
                ->get()
                ->groupBy('position_level');

            // Add profile image URLs
            foreach ($hierarchy as $level => $staff) {
                $staff->each(function ($profile) {
                    if ($profile->profile_image) {
                        $profile->profile_image_url = asset('storage/' . $profile->profile_image);
                    } else {
                        $profile->profile_image_url = null;
                    }
                });
            }

            return response()->json([
                'success' => true,
                'data' => $hierarchy
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve organizational hierarchy',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get teachers organized by grade levels
     */
    public function getTeachersByGrades(): JsonResponse
    {
        try {
            $teachers = StaffProfile::active()
                ->byType('teacher')
                ->ordered()
                ->get();

            // Add profile image URLs
            $teachers->each(function ($profile) {
                if ($profile->profile_image) {
                    $profile->profile_image_url = asset('storage/' . $profile->profile_image);
                } else {
                    $profile->profile_image_url = null;
                }
            });

            // Group by grade levels
            $gradeGroups = [];
            foreach ($teachers as $teacher) {
                if ($teacher->grade_levels) {
                    foreach ($teacher->grade_levels as $grade) {
                        if (!isset($gradeGroups[$grade])) {
                            $gradeGroups[$grade] = [];
                        }
                        $gradeGroups[$grade][] = $teacher;
                    }
                }
            }

            // Sort grade levels
            ksort($gradeGroups);

            return response()->json([
                'success' => true,
                'data' => $gradeGroups
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve teachers by grades',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
