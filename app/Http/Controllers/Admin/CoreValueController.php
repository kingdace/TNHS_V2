<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CoreValue;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CoreValueController extends Controller
{
    /**
     * Display a listing of core values.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = CoreValue::query();

            // Apply filters
            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Apply ordering
            $query->ordered();

            $coreValues = $query->get();

            return response()->json([
                'success' => true,
                'data' => $coreValues,
                'message' => 'Core values retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve core values',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created core value.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'icon' => 'nullable|string|max:100',
                'color' => 'nullable|string|max:100',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $coreValue = CoreValue::create($validated);

            return response()->json([
                'success' => true,
                'data' => $coreValue,
                'message' => 'Core value created successfully'
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
                'message' => 'Failed to create core value',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified core value.
     */
    public function show(CoreValue $coreValue): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $coreValue,
                'message' => 'Core value retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve core value',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified core value.
     */
    public function update(Request $request, CoreValue $coreValue): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'icon' => 'nullable|string|max:100',
                'color' => 'nullable|string|max:100',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $coreValue->update($validated);

            return response()->json([
                'success' => true,
                'data' => $coreValue,
                'message' => 'Core value updated successfully'
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
                'message' => 'Failed to update core value',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified core value.
     */
    public function destroy(CoreValue $coreValue): JsonResponse
    {
        try {
            $coreValue->delete();

            return response()->json([
                'success' => true,
                'message' => 'Core value deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete core value',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of core value.
     */
    public function toggleActive(CoreValue $coreValue): JsonResponse
    {
        try {
            $coreValue->update(['is_active' => !$coreValue->is_active]);

            return response()->json([
                'success' => true,
                'data' => $coreValue,
                'message' => 'Core value status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update core value status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
