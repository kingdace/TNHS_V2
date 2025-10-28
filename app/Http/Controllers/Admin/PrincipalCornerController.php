<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PrincipalCorner;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class PrincipalCornerController extends Controller
{
    /**
     * Display a listing of principal corner content.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = PrincipalCorner::query();

            // Apply filters
            if ($request->has('type') && $request->type) {
                $query->byType($request->type);
            }

            if ($request->has('featured') && $request->featured !== null) {
                $query->where('is_featured', $request->boolean('featured'));
            }

            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Apply ordering
            $query->ordered();

            $content = $query->get();

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
     * Store a newly created principal corner content.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'excerpt' => 'nullable|string|max:500',
                'content_type' => ['required', Rule::in(['message', 'announcement', 'vision', 'achievement', 'news'])],
                'author' => 'nullable|string|max:255',
                'image_path' => 'nullable|string|max:500',
                'attachments' => 'nullable|array',
                'attachments.*' => 'string|max:500',
                'is_featured' => 'boolean',
                'is_active' => 'boolean',
                'display_order' => 'integer|min:0',
                'published_at' => 'nullable|date',
            ]);

            $content = PrincipalCorner::create($validated);

            return response()->json([
                'success' => true,
                'data' => $content,
                'message' => 'Principal corner content created successfully'
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
                'message' => 'Failed to create principal corner content',
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
     * Update the specified principal corner content.
     */
    public function update(Request $request, PrincipalCorner $principalCorner): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'content' => 'sometimes|string',
                'excerpt' => 'nullable|string|max:500',
                'content_type' => ['sometimes', Rule::in(['message', 'announcement', 'vision', 'achievement', 'news'])],
                'author' => 'nullable|string|max:255',
                'image_path' => 'nullable|string|max:500',
                'attachments' => 'nullable|array',
                'attachments.*' => 'string|max:500',
                'is_featured' => 'boolean',
                'is_active' => 'boolean',
                'display_order' => 'integer|min:0',
                'published_at' => 'nullable|date',
            ]);

            $principalCorner->update($validated);

            return response()->json([
                'success' => true,
                'data' => $principalCorner,
                'message' => 'Principal corner content updated successfully'
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
                'message' => 'Failed to update principal corner content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified principal corner content.
     */
    public function destroy(PrincipalCorner $principalCorner): JsonResponse
    {
        try {
            $principalCorner->delete();

            return response()->json([
                'success' => true,
                'message' => 'Principal corner content deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete principal corner content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle the active status of principal corner content.
     */
    public function toggleActive(PrincipalCorner $principalCorner): JsonResponse
    {
        try {
            $principalCorner->update(['is_active' => !$principalCorner->is_active]);

            return response()->json([
                'success' => true,
                'data' => $principalCorner,
                'message' => 'Principal corner content status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update principal corner content status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle the featured status of principal corner content.
     */
    public function toggleFeatured(PrincipalCorner $principalCorner): JsonResponse
    {
        try {
            $principalCorner->update(['is_featured' => !$principalCorner->is_featured]);

            return response()->json([
                'success' => true,
                'data' => $principalCorner,
                'message' => 'Principal corner content featured status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update principal corner content featured status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reorder principal corner content.
     */
    public function reorder(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'items' => 'required|array',
                'items.*.id' => 'required|exists:principal_corner,id',
                'items.*.display_order' => 'required|integer|min:0',
            ]);

            foreach ($validated['items'] as $item) {
                PrincipalCorner::where('id', $item['id'])
                    ->update(['display_order' => $item['display_order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Principal corner content reordered successfully'
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
                'message' => 'Failed to reorder principal corner content',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
