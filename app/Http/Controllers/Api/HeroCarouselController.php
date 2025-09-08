<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroCarousel;
use Illuminate\Http\JsonResponse;

class HeroCarouselController extends Controller
{
    /**
     * Get all active hero carousel slides
     */
    public function index(): JsonResponse
    {
        $slides = HeroCarousel::active()
            ->ordered()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $slides
        ]);
    }

    /**
     * Get a specific hero carousel slide
     */
    public function show(HeroCarousel $heroCarousel): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $heroCarousel
        ]);
    }
}
