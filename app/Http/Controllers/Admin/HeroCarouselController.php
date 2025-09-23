<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroCarousel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HeroCarouselController extends Controller
{
    /**
     * Display a listing of hero carousel slides
     */
    public function index(): JsonResponse
    {
        $slides = HeroCarousel::ordered()->get();

        return response()->json([
            'success' => true,
            'data' => $slides
        ]);
    }

    /**
     * Display trashed hero carousel slides
     */
    public function trashed(): JsonResponse
    {
        $slides = HeroCarousel::onlyTrashed()->ordered()->get();

        return response()->json([
            'success' => true,
            'data' => $slides
        ]);
    }

    /**
     * Store a newly created slide
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'cta_text' => 'nullable|string|max:100',
            'cta_link' => 'nullable|string|max:255',
            'display_order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        // Store uploaded image in public storage
        $path = $request->file('image')->store('hero', 'public');

        $slide = HeroCarousel::create([
            // DB requires non-null title; default to empty string when missing
            'title' => $request->input('title', '') ?? '',
            'subtitle' => $request->input('subtitle'),
            'description' => $request->input('description'),
            'image_path' => '/storage/' . $path,
            'cta_text' => $request->input('cta_text'),
            'cta_link' => $request->input('cta_link'),
            'display_order' => (int) $request->input('display_order', 0),
            'is_active' => filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Hero carousel slide created successfully!',
            'data' => $slide
        ], 201);
    }

    /**
     * Display the specified slide
     */
    public function show(HeroCarousel $heroCarousel): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $heroCarousel
        ]);
    }

    /**
     * Update the specified slide
     */
    public function update(Request $request, HeroCarousel $heroCarousel): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|nullable|string|max:255',
            'subtitle' => 'sometimes|nullable|string|max:255',
            'description' => 'sometimes|nullable|string',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'cta_text' => 'sometimes|nullable|string|max:100',
            'cta_link' => 'sometimes|nullable|string|max:255',
            'display_order' => 'sometimes|integer|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $data = $validated;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('hero', 'public');
            $data['image_path'] = '/storage/' . $path;
        }

        $heroCarousel->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Hero carousel slide updated successfully!',
            'data' => $heroCarousel
        ]);
    }

    /**
     * Remove the specified slide (soft delete)
     */
    public function destroy(HeroCarousel $heroCarousel): JsonResponse
    {
        $heroCarousel->delete();

        return response()->json([
            'success' => true,
            'message' => 'Hero carousel slide moved to trash successfully!'
        ]);
    }

    /**
     * Restore the specified slide from trash
     */
    public function restore($id): JsonResponse
    {
        $slide = HeroCarousel::onlyTrashed()->findOrFail($id);
        $slide->restore();

        return response()->json([
            'success' => true,
            'message' => 'Hero carousel slide restored successfully!',
            'data' => $slide
        ]);
    }

    /**
     * Permanently delete the specified slide
     */
    public function forceDelete($id): JsonResponse
    {
        $slide = HeroCarousel::onlyTrashed()->findOrFail($id);
        $slide->forceDelete();

        return response()->json([
            'success' => true,
            'message' => 'Hero carousel slide permanently deleted!'
        ]);
    }
}
