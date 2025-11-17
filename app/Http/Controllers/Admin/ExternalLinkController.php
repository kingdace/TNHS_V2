<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExternalLink;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ExternalLinkController extends Controller
{
    /**
     * Display a listing of external links
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = ExternalLink::query();

            // Apply filters
            if ($request->filled('category')) {
                $query->byCategory($request->category);
            }

            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('url', 'like', "%{$search}%");
                });
            }

            // Apply ordering
            $links = $query->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $links,
                'message' => 'External links retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve external links',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created external link
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'url' => 'required|url|max:500',
                'category' => 'required|string|max:100',
                'icon' => 'nullable|string|max:100',
                'color' => 'nullable|string|max:50',
                'is_active' => 'boolean',
                'display_order' => 'integer|min:0',
            ]);

            $link = ExternalLink::create([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'url' => $validated['url'],
                'category' => $validated['category'],
                'icon' => $validated['icon'] ?? null,
                'color' => $validated['color'] ?? null,
                'is_active' => $request->boolean('is_active', true),
                'display_order' => $validated['display_order'] ?? 0,
                'click_count' => 0,
            ]);

            return response()->json([
                'success' => true,
                'data' => $link,
                'message' => 'External link created successfully'
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
                'message' => 'Failed to create external link',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified external link
     */
    public function show(ExternalLink $externalLink): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $externalLink,
                'message' => 'External link retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve external link',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified external link
     */
    public function update(Request $request, ExternalLink $externalLink): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'url' => 'sometimes|url|max:500',
                'category' => 'sometimes|string|max:100',
                'icon' => 'nullable|string|max:100',
                'color' => 'nullable|string|max:50',
                'is_active' => 'boolean',
                'display_order' => 'integer|min:0',
            ]);

            $externalLink->update($validated);

            return response()->json([
                'success' => true,
                'data' => $externalLink,
                'message' => 'External link updated successfully'
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
                'message' => 'Failed to update external link',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified external link
     */
    public function destroy(ExternalLink $externalLink): JsonResponse
    {
        try {
            $externalLink->delete();

            return response()->json([
                'success' => true,
                'message' => 'External link deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete external link',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of external link
     */
    public function toggleActive(ExternalLink $externalLink): JsonResponse
    {
        try {
            $externalLink->update(['is_active' => !$externalLink->is_active]);

            return response()->json([
                'success' => true,
                'data' => $externalLink,
                'message' => 'External link status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update external link status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reorder external links
     */
    public function reorder(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'links' => 'required|array',
                'links.*.id' => 'required|exists:external_links,id',
                'links.*.display_order' => 'required|integer|min:0',
            ]);

            foreach ($validated['links'] as $linkData) {
                ExternalLink::where('id', $linkData['id'])
                    ->update(['display_order' => $linkData['display_order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'External links reordered successfully'
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
                'message' => 'Failed to reorder external links',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
