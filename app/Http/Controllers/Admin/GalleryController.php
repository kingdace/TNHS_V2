<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class GalleryController extends Controller
{
    /**
     * Display a listing of gallery images
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = GalleryImage::query();

            // Apply filters
            if ($request->filled('category')) {
                $query->byCategory($request->category);
            }

            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            if ($request->has('featured') && $request->featured !== null) {
                $query->where('is_featured', $request->boolean('featured'));
            }

            if ($request->filled('search')) {
                $query->search($request->search);
            }

            // Apply ordering
            $images = $query->ordered()->get();

            // Add URLs to response
            $images->each(function ($image) {
                $image->image_url = $image->image_url;
                $image->thumbnail_url = $image->thumbnail_url;
                $image->category_label = $image->category_label;
            });

            return response()->json([
                'success' => true,
                'data' => $images,
                'message' => 'Gallery images retrieved successfully'
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
     * Store a newly created gallery image
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'category' => 'required|string|in:events,academic,sports,arts,facilities,community',
                'image' => 'required|image|mimes:jpg,jpeg,png,gif,webp|max:10240', // 10MB max
                'alt_text' => 'nullable|string|max:255',
                'tags' => 'nullable|string',
                'event_date' => 'nullable|date',
                'photographer' => 'nullable|string|max:255',
                'is_featured' => 'boolean',
                'is_active' => 'boolean',
                'display_order' => 'integer|min:0',
            ]);

            // Handle image upload
            $image = $request->file('image');
            $imagePath = $this->storeImage($image);
            $thumbnailPath = $this->createThumbnail($image, $imagePath);

            // Process tags
            $tags = null;
            if ($request->filled('tags')) {
                $tags = array_map('trim', explode(',', $request->tags));
                $tags = array_filter($tags); // Remove empty values
            }

            $galleryImage = GalleryImage::create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'category' => $validated['category'],
                'image_path' => $imagePath,
                'thumbnail_path' => $thumbnailPath,
                'alt_text' => $validated['alt_text'] ?? $validated['title'],
                'tags' => $tags,
                'event_date' => $validated['event_date'],
                'photographer' => $validated['photographer'],
                'is_featured' => $request->boolean('is_featured', false),
                'is_active' => $request->boolean('is_active', true),
                'display_order' => $validated['display_order'] ?? 0,
            ]);

            // Add URLs to response
            $galleryImage->image_url = $galleryImage->image_url;
            $galleryImage->thumbnail_url = $galleryImage->thumbnail_url;
            $galleryImage->category_label = $galleryImage->category_label;

            return response()->json([
                'success' => true,
                'data' => $galleryImage,
                'message' => 'Gallery image created successfully'
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
                'message' => 'Failed to create gallery image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified gallery image
     */
    public function show(GalleryImage $galleryImage): JsonResponse
    {
        try {
            $galleryImage->image_url = $galleryImage->image_url;
            $galleryImage->thumbnail_url = $galleryImage->thumbnail_url;
            $galleryImage->category_label = $galleryImage->category_label;

            return response()->json([
                'success' => true,
                'data' => $galleryImage,
                'message' => 'Gallery image retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve gallery image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified gallery image
     */
    public function update(Request $request, GalleryImage $galleryImage): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'category' => 'sometimes|string|in:events,academic,sports,arts,facilities,community',
                'image' => 'sometimes|image|mimes:jpg,jpeg,png,gif,webp|max:10240',
                'alt_text' => 'nullable|string|max:255',
                'tags' => 'nullable|string',
                'event_date' => 'nullable|date',
                'photographer' => 'nullable|string|max:255',
                'is_featured' => 'boolean',
                'is_active' => 'boolean',
                'display_order' => 'integer|min:0',
            ]);

            $data = $validated;

            // Handle new image upload
            if ($request->hasFile('image')) {
                // Delete old images
                if ($galleryImage->image_path) {
                    Storage::disk('public')->delete($galleryImage->image_path);
                }
                if ($galleryImage->thumbnail_path) {
                    Storage::disk('public')->delete($galleryImage->thumbnail_path);
                }

                // Store new image
                $image = $request->file('image');
                $data['image_path'] = $this->storeImage($image);
                $data['thumbnail_path'] = $this->createThumbnail($image, $data['image_path']);
            }

            // Process tags
            if ($request->has('tags')) {
                if ($request->filled('tags')) {
                    $tags = array_map('trim', explode(',', $request->tags));
                    $data['tags'] = array_filter($tags);
                } else {
                    $data['tags'] = null;
                }
            }

            $galleryImage->update($data);

            // Add URLs to response
            $galleryImage->image_url = $galleryImage->image_url;
            $galleryImage->thumbnail_url = $galleryImage->thumbnail_url;
            $galleryImage->category_label = $galleryImage->category_label;

            return response()->json([
                'success' => true,
                'data' => $galleryImage,
                'message' => 'Gallery image updated successfully'
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
                'message' => 'Failed to update gallery image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified gallery image (soft delete)
     */
    public function destroy(GalleryImage $galleryImage): JsonResponse
    {
        try {
            $galleryImage->delete();

            return response()->json([
                'success' => true,
                'message' => 'Gallery image moved to trash successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete gallery image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status
     */
    public function toggleActive(GalleryImage $galleryImage): JsonResponse
    {
        try {
            $galleryImage->update(['is_active' => !$galleryImage->is_active]);

            return response()->json([
                'success' => true,
                'data' => $galleryImage,
                'message' => 'Gallery image status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update gallery image status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle featured status
     */
    public function toggleFeatured(GalleryImage $galleryImage): JsonResponse
    {
        try {
            $galleryImage->update(['is_featured' => !$galleryImage->is_featured]);

            return response()->json([
                'success' => true,
                'data' => $galleryImage,
                'message' => 'Gallery image featured status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update gallery image featured status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Bulk upload images
     */
    public function bulkUpload(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'images' => 'required|array|min:1|max:20',
                'images.*' => 'image|mimes:jpg,jpeg,png,gif,webp|max:10240',
                'category' => 'required|string|in:events,academic,sports,arts,facilities,community',
                'event_date' => 'nullable|date',
                'photographer' => 'nullable|string|max:255',
                'is_active' => 'boolean',
            ]);

            $uploadedImages = [];
            $errors = [];

            foreach ($request->file('images') as $index => $image) {
                try {
                    $imagePath = $this->storeImage($image);
                    $thumbnailPath = $this->createThumbnail($image, $imagePath);

                    $galleryImage = GalleryImage::create([
                        'title' => pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME),
                        'category' => $validated['category'],
                        'image_path' => $imagePath,
                        'thumbnail_path' => $thumbnailPath,
                        'alt_text' => pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME),
                        'event_date' => $validated['event_date'],
                        'photographer' => $validated['photographer'],
                        'is_active' => $request->boolean('is_active', true),
                        'display_order' => $index,
                    ]);

                    $uploadedImages[] = $galleryImage;
                } catch (\Exception $e) {
                    $errors[] = "Failed to upload image {$index}: " . $e->getMessage();
                }
            }

            return response()->json([
                'success' => true,
                'data' => $uploadedImages,
                'errors' => $errors,
                'message' => count($uploadedImages) . ' images uploaded successfully'
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
                'message' => 'Failed to upload images',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get trashed images
     */
    public function trashed(): JsonResponse
    {
        try {
            $images = GalleryImage::onlyTrashed()->latest('deleted_at')->get();

            $images->each(function ($image) {
                $image->image_url = $image->image_url;
                $image->thumbnail_url = $image->thumbnail_url;
                $image->category_label = $image->category_label;
            });

            return response()->json([
                'success' => true,
                'data' => $images
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve trashed images',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Restore trashed image
     */
    public function restore($id): JsonResponse
    {
        try {
            $image = GalleryImage::onlyTrashed()->findOrFail($id);
            $image->restore();

            return response()->json([
                'success' => true,
                'data' => $image,
                'message' => 'Gallery image restored successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to restore gallery image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Permanently delete image
     */
    public function forceDelete($id): JsonResponse
    {
        try {
            $image = GalleryImage::onlyTrashed()->findOrFail($id);

            // Delete files from storage
            if ($image->image_path) {
                Storage::disk('public')->delete($image->image_path);
            }
            if ($image->thumbnail_path) {
                Storage::disk('public')->delete($image->thumbnail_path);
            }

            $image->forceDelete();

            return response()->json([
                'success' => true,
                'message' => 'Gallery image permanently deleted'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to permanently delete gallery image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store image file
     */
    private function storeImage($image): string
    {
        $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        $path = $image->storeAs('gallery', $filename, 'public');
        return $path;
    }

    /**
     * Create thumbnail
     */
    private function createThumbnail($image, $originalPath): string
    {
        try {
            $thumbnailPath = 'gallery/thumbnails/' . basename($originalPath);
            $fullThumbnailPath = storage_path('app/public/' . $thumbnailPath);

            // Create thumbnails directory if it doesn't exist
            $thumbnailDir = dirname($fullThumbnailPath);
            if (!file_exists($thumbnailDir)) {
                mkdir($thumbnailDir, 0755, true);
            }

            // Create thumbnail using Intervention Image (if available) or basic resize
            if (class_exists('Intervention\Image\Facades\Image')) {
                $img = Image::make($image->getRealPath());
                $img->resize(400, 300, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
                $img->save($fullThumbnailPath, 80);
            } else {
                // Fallback: copy original image as thumbnail
                copy(storage_path('app/public/' . $originalPath), $fullThumbnailPath);
            }

            return $thumbnailPath;
        } catch (\Exception $e) {
            // If thumbnail creation fails, return null (will use original image)
            return null;
        }
    }
}
