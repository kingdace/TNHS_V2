<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolInfo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class SchoolInfoController extends Controller
{
    /**
     * Display a listing of school information.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = SchoolInfo::query();

            // Apply filters
            if ($request->has('type') && $request->type) {
                $query->byType($request->type);
            }

            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Apply ordering
            $query->ordered();

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
     * Store a newly created school information.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'info_type' => 'required|string|max:100',
                'title' => 'nullable|string|max:255',
                'content' => 'nullable|string',
                'image_path' => 'nullable|string|max:500',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $schoolInfo = SchoolInfo::create($validated);

            return response()->json([
                'success' => true,
                'data' => $schoolInfo,
                'message' => 'School information created successfully'
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
                'message' => 'Failed to create school information',
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
     * Update the specified school information.
     */
    public function update(Request $request, SchoolInfo $schoolInfo): JsonResponse
    {
        try {
            $validated = $request->validate([
                'info_type' => 'sometimes|string|max:100',
                'title' => 'nullable|string|max:255',
                'content' => 'nullable|string',
                'image_path' => 'nullable|string|max:500',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $schoolInfo->update($validated);

            return response()->json([
                'success' => true,
                'data' => $schoolInfo,
                'message' => 'School information updated successfully'
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
                'message' => 'Failed to update school information',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified school information.
     */
    public function destroy(SchoolInfo $schoolInfo): JsonResponse
    {
        try {
            $schoolInfo->delete();

            return response()->json([
                'success' => true,
                'message' => 'School information deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete school information',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of school information.
     */
    public function toggleActive(SchoolInfo $schoolInfo): JsonResponse
    {
        try {
            $schoolInfo->update(['is_active' => !$schoolInfo->is_active]);

            return response()->json([
                'success' => true,
                'data' => $schoolInfo,
                'message' => 'School information status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update school information status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reorder school information.
     */
    public function reorder(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'info' => 'required|array',
                'info.*.id' => 'required|exists:school_info,id',
                'info.*.display_order' => 'required|integer|min:0',
            ]);

            foreach ($validated['info'] as $infoData) {
                SchoolInfo::where('id', $infoData['id'])
                    ->update(['display_order' => $infoData['display_order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'School information reordered successfully'
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
                'message' => 'Failed to reorder school information',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
