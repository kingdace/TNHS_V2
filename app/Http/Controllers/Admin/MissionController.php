<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class MissionController extends Controller
{
    /**
     * Display a listing of missions.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Mission::query();

            // Apply filters
            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Apply ordering
            $query->ordered();

            $missions = $query->get();

            return response()->json([
                'success' => true,
                'data' => $missions,
                'message' => 'Missions retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve missions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created mission.
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
                $imagePath = $request->file('image')->store('missions', 'public');
                $validated['image_path'] = $imagePath;
            }

            $mission = Mission::create($validated);

            return response()->json([
                'success' => true,
                'data' => $mission,
                'message' => 'Mission created successfully'
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
                'message' => 'Failed to create mission',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified mission.
     */
    public function show(Mission $mission): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $mission,
                'message' => 'Mission retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve mission',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified mission.
     */
    public function update(Request $request, Mission $mission): JsonResponse
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
                if ($mission->image_path) {
                    Storage::disk('public')->delete($mission->image_path);
                }
                $imagePath = $request->file('image')->store('missions', 'public');
                $validated['image_path'] = $imagePath;
            }

            $mission->update($validated);

            return response()->json([
                'success' => true,
                'data' => $mission,
                'message' => 'Mission updated successfully'
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
                'message' => 'Failed to update mission',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified mission.
     */
    public function destroy(Mission $mission): JsonResponse
    {
        try {
            // Delete image if exists
            if ($mission->image_path) {
                Storage::disk('public')->delete($mission->image_path);
            }

            $mission->delete();

            return response()->json([
                'success' => true,
                'message' => 'Mission deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete mission',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of mission.
     */
    public function toggleActive(Mission $mission): JsonResponse
    {
        try {
            $mission->update(['is_active' => !$mission->is_active]);

            return response()->json([
                'success' => true,
                'data' => $mission,
                'message' => 'Mission status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update mission status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
