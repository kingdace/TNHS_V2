<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GalleryController extends Controller
{
    /**
     * Get all active gallery images
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = GalleryImage::active()->ordered();

            // Filter by category if provided
            if ($request->has('category') && $request->category !== 'all') {
                $query->byCategory($request->category);
            }

            // Search functionality
            if ($request->has('search') && $request->filled('search')) {
                $query->search($request->search);
            }

            // Filter by featured
            if ($request->has('featured') && $request->boolean('featured')) {
                $query->featured();
            }

            // Pagination
            $perPage = $request->get('per_page', 20);
            $perPage = min($perPage, 50); // Max 50 items per page

            if ($request->has('paginate') && $request->boolean('paginate')) {
                $images = $query->paginate($perPage);
            } else {
                $images = $query->get();
            }

            // Add URLs and additional data
            if ($images instanceof \Illuminate\Pagination\LengthAwarePaginator) {
                $images->getCollection()->each(function ($image) {
                    $this->addImageUrls($image);
                });
            } else {
                $images->each(function ($image) {
                    $this->addImageUrls($image);
                });
            }

            return response()->json([
                'success' => true,
                'data' => $images
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve gallery images',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get gallery images by category
     */
    public function getByCategory($category): JsonResponse
    {
        try {
            $images = GalleryImage::active()
                ->byCategory($category)
                ->ordered()
                ->get();

            $images->each(function ($image) {
                $this->addImageUrls($image);
            });

            return response()->json([
                'success' => true,
                'data' => $images
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve gallery images by category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get featured gallery images
     */
    public function getFeatured(): JsonResponse
    {
        try {
            $images = GalleryImage::active()
                ->featured()
                ->ordered()
                ->limit(10)
                ->get();

            $images->each(function ($image) {
                $this->addImageUrls($image);
            });

            return response()->json([
                'success' => true,
                'data' => $images
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve featured gallery images',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get single gallery image
     */
    public function show($id): JsonResponse
    {
        try {
            $image = GalleryImage::active()->findOrFail($id);

            // Increment view count
            $image->incrementViewCount();

            $this->addImageUrls($image);

            return response()->json([
                'success' => true,
                'data' => $image
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gallery image not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Increment like count
     */
    public function incrementLike($id): JsonResponse
    {
        try {
            $image = GalleryImage::active()->findOrFail($id);
            $image->incrementLikeCount();

            return response()->json([
                'success' => true,
                'data' => [
                    'like_count' => $image->like_count
                ],
                'message' => 'Like count updated'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update like count',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get gallery statistics
     */
    public function getStatistics(): JsonResponse
    {
        try {
            $totalImages = GalleryImage::active()->count();
            $totalViews = GalleryImage::active()->sum('view_count');
            $totalLikes = GalleryImage::active()->sum('like_count');

            $categories = GalleryImage::active()
                ->selectRaw('category, COUNT(*) as count')
                ->groupBy('category')
                ->get()
                ->mapWithKeys(function ($item) {
                    return [$item->category => $item->count];
                });

            $recentImages = GalleryImage::active()
                ->latest()
                ->limit(5)
                ->get();

            $recentImages->each(function ($image) {
                $this->addImageUrls($image);
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'total_images' => $totalImages,
                    'total_views' => $totalViews,
                    'total_likes' => $totalLikes,
                    'categories' => $categories,
                    'recent_images' => $recentImages
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve gallery statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get available categories
     */
    public function getCategories(): JsonResponse
    {
        try {
            $categories = GalleryImage::getCategories();

            // Get count for each category
            $categoriesWithCount = [];
            foreach ($categories as $key => $label) {
                $count = GalleryImage::active()->byCategory($key)->count();
                $categoriesWithCount[] = [
                    'value' => $key,
                    'label' => $label,
                    'count' => $count
                ];
            }

            return response()->json([
                'success' => true,
                'data' => $categoriesWithCount
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Add image URLs to model
     */
    private function addImageUrls($image): void
    {
        $image->image_url = $image->image_url;
        $image->thumbnail_url = $image->thumbnail_url;
        $image->category_label = $image->category_label;
        $image->formatted_tags = $image->formatted_tags;
    }
}
