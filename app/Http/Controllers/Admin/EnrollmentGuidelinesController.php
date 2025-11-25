<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\EnrollmentInfo;
use App\Models\EnrollmentCategory;
use App\Models\EnrollmentRequirement;
use App\Models\EnrollmentProcess;
use App\Models\SpecialProgram;
use App\Models\SpecialProgramRequirement;
use App\Models\SpecialProgramProcess;

class EnrollmentGuidelinesController extends Controller
{
    /**
     * Get all enrollment guidelines data
     */
    public function index()
    {
        try {
            $data = [
                'info_cards' => EnrollmentInfo::active()->ordered()->get(),
                'grade_categories' => EnrollmentCategory::active()->ordered()->with(['requirements', 'processes'])->get(),
                'special_programs' => SpecialProgram::active()->ordered()->with(['requirements', 'processes'])->get(),
            ];

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch enrollment guidelines data',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update enrollment info cards
     */
    public function updateInfoCards(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cards' => 'required|array',
            'cards.*.id' => 'required|exists:enrollment_info,id',
            'cards.*.title' => 'required|string|max:255',
            'cards.*.content' => 'required|string|max:255',
            'cards.*.details' => 'nullable|string',
            'cards.*.icon' => 'nullable|string|max:100',
            'cards.*.color' => 'nullable|string|max:100',
            'cards.*.is_active' => 'boolean',
            'cards.*.display_order' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            DB::beginTransaction();

            foreach ($request->cards as $cardData) {
                EnrollmentInfo::where('id', $cardData['id'])->update([
                    'title' => $cardData['title'],
                    'content' => $cardData['content'],
                    'details' => $cardData['details'] ?? null,
                    'icon' => $cardData['icon'] ?? null,
                    'color' => $cardData['color'] ?? null,
                    'is_active' => $cardData['is_active'] ?? true,
                    'display_order' => $cardData['display_order'] ?? 0,
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Information cards updated successfully',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to update information cards',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update enrollment category
     */
    public function updateCategory(Request $request, $categoryId)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:100',
            'color_gradient' => 'nullable|string|max:100',
            'bg_color' => 'nullable|string|max:100',
            'border_color' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
            'is_active' => 'boolean',
            'display_order' => 'integer|min:0',
            'requirements' => 'array',
            'requirements.*' => 'string',
            'processes' => 'array',
            'processes.*' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Update category
            $category = EnrollmentCategory::where('category_id', $categoryId)->firstOrFail();
            $category->update([
                'name' => $request->name,
                'description' => $request->description,
                'icon' => $request->icon,
                'color_gradient' => $request->color_gradient,
                'bg_color' => $request->bg_color,
                'border_color' => $request->border_color,
                'notes' => $request->notes,
                'is_active' => $request->is_active ?? true,
                'display_order' => $request->display_order ?? 0,
            ]);

            // Update requirements
            if ($request->has('requirements')) {
                EnrollmentRequirement::where('category_id', $categoryId)->delete();
                foreach ($request->requirements as $index => $requirement) {
                    if (!empty(trim($requirement))) {
                        EnrollmentRequirement::create([
                            'category_id' => $categoryId,
                            'requirement_text' => trim($requirement),
                            'display_order' => $index + 1,
                        ]);
                    }
                }
            }

            // Update processes
            if ($request->has('processes')) {
                EnrollmentProcess::where('category_id', $categoryId)->delete();
                foreach ($request->processes as $index => $process) {
                    if (!empty(trim($process))) {
                        EnrollmentProcess::create([
                            'category_id' => $categoryId,
                            'step_text' => trim($process),
                            'step_number' => $index + 1,
                        ]);
                    }
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Category updated successfully',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to update category',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update special program
     */
    public function updateSpecialProgram(Request $request, $programId)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:100',
            'color_gradient' => 'nullable|string|max:100',
            'bg_color' => 'nullable|string|max:100',
            'border_color' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
            'features' => 'array',
            'features.*' => 'string',
            'is_active' => 'boolean',
            'display_order' => 'integer|min:0',
            'requirements' => 'array',
            'requirements.*' => 'string',
            'processes' => 'array',
            'processes.*' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Update program
            $program = SpecialProgram::where('program_id', $programId)->firstOrFail();
            $program->update([
                'name' => $request->name,
                'description' => $request->description,
                'icon' => $request->icon,
                'color_gradient' => $request->color_gradient,
                'bg_color' => $request->bg_color,
                'border_color' => $request->border_color,
                'notes' => $request->notes,
                'features' => $request->features ?? [],
                'is_active' => $request->is_active ?? true,
                'display_order' => $request->display_order ?? 0,
            ]);

            // Update requirements
            if ($request->has('requirements')) {
                SpecialProgramRequirement::where('program_id', $programId)->delete();
                foreach ($request->requirements as $index => $requirement) {
                    if (!empty(trim($requirement))) {
                        SpecialProgramRequirement::create([
                            'program_id' => $programId,
                            'requirement_text' => trim($requirement),
                            'display_order' => $index + 1,
                        ]);
                    }
                }
            }

            // Update processes
            if ($request->has('processes')) {
                SpecialProgramProcess::where('program_id', $programId)->delete();
                foreach ($request->processes as $index => $process) {
                    if (!empty(trim($process))) {
                        SpecialProgramProcess::create([
                            'program_id' => $programId,
                            'step_text' => trim($process),
                            'step_number' => $index + 1,
                        ]);
                    }
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Special program updated successfully',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to update special program',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
