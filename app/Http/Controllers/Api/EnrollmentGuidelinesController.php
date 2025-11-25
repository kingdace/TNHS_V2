<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EnrollmentInfo;
use App\Models\EnrollmentCategory;
use App\Models\SpecialProgram;

class EnrollmentGuidelinesController extends Controller
{
    /**
     * Get all enrollment guidelines data for public display
     */
    public function index()
    {
        try {
            $data = [
                'info_cards' => $this->getInfoCardsData(),
                'grade_categories' => $this->getGradeCategoriesData(),
                'special_programs' => $this->getSpecialProgramsData(),
            ];

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch enrollment guidelines',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get information cards data (private method for internal use)
     */
    private function getInfoCardsData()
    {
        return EnrollmentInfo::active()->ordered()->get();
    }

    /**
     * Get information cards
     */
    public function getInfoCards()
    {
        try {
            $cards = $this->getInfoCardsData();

            return response()->json([
                'success' => true,
                'data' => $cards,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch information cards',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get grade categories data (private method for internal use)
     */
    private function getGradeCategoriesData()
    {
        $categories = EnrollmentCategory::active()
            ->ordered()
            ->with(['requirements' => function ($query) {
                $query->active()->ordered();
            }, 'processes' => function ($query) {
                $query->active()->ordered();
            }])
            ->get();

        // Transform data to match frontend format
        return $categories->map(function ($category) {
            return [
                'id' => $category->category_id,
                'name' => $category->name,
                'description' => $category->description,
                'icon' => $category->icon,
                'color' => $category->color_gradient,
                'bgColor' => $category->bg_color,
                'borderColor' => $category->border_color,
                'notes' => $category->notes,
                'requirements' => $category->requirements->pluck('requirement_text')->toArray(),
                'process' => $category->processes->pluck('step_text')->toArray(),
            ];
        });
    }

    /**
     * Get grade categories with requirements and processes
     */
    public function getGradeCategories()
    {
        try {
            $transformedCategories = $this->getGradeCategoriesData();

            return response()->json([
                'success' => true,
                'data' => $transformedCategories,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch grade categories',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get special programs data (private method for internal use)
     */
    private function getSpecialProgramsData()
    {
        $programs = SpecialProgram::active()
            ->ordered()
            ->with(['requirements' => function ($query) {
                $query->active()->ordered();
            }, 'processes' => function ($query) {
                $query->active()->ordered();
            }])
            ->get();

        // Transform data to match frontend format
        return $programs->map(function ($program) {
            return [
                'id' => $program->program_id,
                'name' => $program->name,
                'description' => $program->description,
                'icon' => $program->icon,
                'color' => $program->color_gradient,
                'bgColor' => $program->bg_color,
                'borderColor' => $program->border_color,
                'notes' => $program->notes,
                'features' => $program->features ?? [],
                'requirements' => $program->requirements->pluck('requirement_text')->toArray(),
                'process' => $program->processes->pluck('step_text')->toArray(),
            ];
        });
    }

    /**
     * Get special programs with requirements and processes
     */
    public function getSpecialPrograms()
    {
        try {
            $transformedPrograms = $this->getSpecialProgramsData();

            return response()->json([
                'success' => true,
                'data' => $transformedPrograms,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch special programs',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get specific category by ID
     */
    public function getCategory($categoryId)
    {
        try {
            $category = EnrollmentCategory::where('category_id', $categoryId)
                ->active()
                ->with(['requirements' => function ($query) {
                    $query->active()->ordered();
                }, 'processes' => function ($query) {
                    $query->active()->ordered();
                }])
                ->firstOrFail();

            $transformedCategory = [
                'id' => $category->category_id,
                'name' => $category->name,
                'description' => $category->description,
                'icon' => $category->icon,
                'color' => $category->color_gradient,
                'bgColor' => $category->bg_color,
                'borderColor' => $category->border_color,
                'notes' => $category->notes,
                'requirements' => $category->requirements->pluck('requirement_text')->toArray(),
                'process' => $category->processes->pluck('step_text')->toArray(),
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedCategory,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Get specific special program by ID
     */
    public function getSpecialProgram($programId)
    {
        try {
            $program = SpecialProgram::where('program_id', $programId)
                ->active()
                ->with(['requirements' => function ($query) {
                    $query->active()->ordered();
                }, 'processes' => function ($query) {
                    $query->active()->ordered();
                }])
                ->firstOrFail();

            $transformedProgram = [
                'id' => $program->program_id,
                'name' => $program->name,
                'description' => $program->description,
                'icon' => $program->icon,
                'color' => $program->color_gradient,
                'bgColor' => $program->bg_color,
                'borderColor' => $program->border_color,
                'notes' => $program->notes,
                'features' => $program->features ?? [],
                'requirements' => $program->requirements->pluck('requirement_text')->toArray(),
                'process' => $program->processes->pluck('step_text')->toArray(),
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedProgram,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Special program not found',
                'error' => $e->getMessage(),
            ], 404);
        }
    }
}
