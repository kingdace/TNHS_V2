<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vision;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class VisionController extends Controller
{
    /**
     * Display a listing of visions.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Vision::query();

            // Apply filters
            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Apply ordering
            $query->ordered();

            $visions = $query->get();

            return response()->json([
                'success' => true,
                'data' => $visions,
                'message' => 'Visions retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve visions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created vision.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'nullable|string|max:255',
                'content' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            // Handle image upload
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('visions', 'public');
                $validated['image_path'] = $imagePath;
            }

            $vision = Vision::create($validated);

            return response()->json([
                'success' => true,
                'data' => $vision,
                'message' => 'Vision created successfully'
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
                'message' => 'Failed to create vision',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified vision.
     */
    public function show(Vision $vision): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $vision,
                'message' => 'Vision retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve vision',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified vision.
     */
    public function update(Request $request, Vision $vision): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'nullable|string|max:255',
                'content' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($vision->image_path) {
                    Storage::disk('public')->delete($vision->image_path);
                }
                $imagePath = $request->file('image')->store('visions', 'public');
                $validated['image_path'] = $imagePath;
            }

            $vision->update($validated);

            return response()->json([
                'success' => true,
                'data' => $vision,
                'message' => 'Vision updated successfully'
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
                'message' => 'Failed to update vision',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified vision.
     */
    public function destroy(Vision $vision): JsonResponse
    {
        try {
            // Delete image if exists
            if ($vision->image_path) {
                Storage::disk('public')->delete($vision->image_path);
            }

            $vision->delete();

            return response()->json([
                'success' => true,
                'message' => 'Vision deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete vision',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of vision.
     */
    public function toggleActive(Vision $vision): JsonResponse
    {
        try {
            $vision->update(['is_active' => !$vision->is_active]);

            return response()->json([
                'success' => true,
                'data' => $vision,
                'message' => 'Vision status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update vision status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
