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
     * Store a newly created slide
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_path' => 'nullable|string|max:500',
            'cta_text' => 'nullable|string|max:100',
            'cta_link' => 'nullable|string|max:255',
            'display_order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        $slide = HeroCarousel::create($request->all());

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
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_path' => 'nullable|string|max:500',
            'cta_text' => 'nullable|string|max:100',
            'cta_link' => 'nullable|string|max:255',
            'display_order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        $heroCarousel->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Hero carousel slide updated successfully!',
            'data' => $heroCarousel
        ]);
    }

    /**
     * Remove the specified slide
     */
    public function destroy(HeroCarousel $heroCarousel): JsonResponse
    {
        $heroCarousel->delete();

        return response()->json([
            'success' => true,
            'message' => 'Hero carousel slide deleted successfully!'
        ]);
    }
}
