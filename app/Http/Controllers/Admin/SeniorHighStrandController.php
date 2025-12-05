<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SeniorHighStrand;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class SeniorHighStrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $strands = SeniorHighStrand::ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $strands,
                'message' => 'Senior High strands retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve strands',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'strand_id' => 'required|string|unique:senior_high_strands,strand_id|max:50',
                'title' => 'required|string|max:255',
                'short_title' => 'required|string|max:50',
                'description' => 'required|string',
                'features' => 'nullable|array',
                'features.*' => 'string',
                'color' => 'nullable|string|max:100',
                'bg_color' => 'nullable|string|max:100',
                'border_color' => 'nullable|string|max:100',
                'icon' => 'nullable|string|max:10',
                'gradient' => 'nullable|string|max:150',
                'image_path' => 'nullable|string|max:255',
                'career_paths' => 'nullable|array',
                'strand_overview' => 'nullable|array',
                'career_guide_intro' => 'nullable|string',
                'is_active' => 'nullable|boolean',
                'display_order' => 'nullable|integer|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $strand = SeniorHighStrand::create($request->all());

            return response()->json([
                'success' => true,
                'data' => $strand,
                'message' => 'Strand created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create strand',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        try {
            $strand = SeniorHighStrand::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $strand,
                'message' => 'Strand retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Strand not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $strand = SeniorHighStrand::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'strand_id' => 'sometimes|string|max:50|unique:senior_high_strands,strand_id,' . $id,
                'title' => 'sometimes|string|max:255',
                'short_title' => 'sometimes|string|max:50',
                'description' => 'sometimes|string',
                'features' => 'sometimes|array',
                'features.*' => 'string',
                'color' => 'sometimes|string|max:100',
                'bg_color' => 'sometimes|string|max:100',
                'border_color' => 'sometimes|string|max:100',
                'icon' => 'sometimes|string|max:10',
                'gradient' => 'sometimes|string|max:150',
                'image_path' => 'sometimes|string|max:255',
                'career_paths' => 'sometimes|array',
                'strand_overview' => 'sometimes|array',
                'career_guide_intro' => 'nullable|string',
                'is_active' => 'sometimes|boolean',
                'display_order' => 'sometimes|integer|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $strand->update($request->all());

            return response()->json([
                'success' => true,
                'data' => $strand->fresh(),
                'message' => 'Strand updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update strand',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $strand = SeniorHighStrand::findOrFail($id);
            $strand->delete();

            return response()->json([
                'success' => true,
                'message' => 'Strand deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete strand',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of a strand.
     */
    public function toggleActive(string $id): JsonResponse
    {
        try {
            $strand = SeniorHighStrand::findOrFail($id);
            $strand->is_active = !$strand->is_active;
            $strand->save();

            return response()->json([
                'success' => true,
                'data' => $strand,
                'message' => 'Strand status toggled successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to toggle strand status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reorder strands.
     */
    public function reorder(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'strands' => 'required|array',
                'strands.*.id' => 'required|exists:senior_high_strands,id',
                'strands.*.display_order' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            foreach ($request->strands as $strandData) {
                SeniorHighStrand::where('id', $strandData['id'])
                    ->update(['display_order' => $strandData['display_order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Strands reordered successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to reorder strands',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
