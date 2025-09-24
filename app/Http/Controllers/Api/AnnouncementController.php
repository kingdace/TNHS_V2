<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $announcements = Announcement::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $announcements
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'content_html' => 'nullable|string',
            'author' => 'required|string|max:255',
            'status' => 'required|in:draft,published,archived',
            'category' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
            'image_url' => 'nullable|url',
            'is_featured' => 'nullable|boolean',
        ]);

        $imagePath = null;
        $images = [];
        $externalLink = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('announcements', 'public');
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $images[] = $file->store('announcements', 'public');
            }
        }

        if ($request->filled('image_url')) {
            $externalLink = $this->convertGDriveLink($request->image_url);
        }

        $announcement = Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
            'content_html' => $request->content_html,
            'author' => $request->author,
            'image_path' => $imagePath,
            'images' => $images,
            'external_link' => $externalLink,
            'category' => $request->category ?? 'General',
            'status' => $request->status,
            'is_featured' => (bool) $request->boolean('is_featured'),
            'published_at' => $request->status === 'published' ? now() : null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Announcement created successfully',
            'data' => $announcement
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Announcement $announcement): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $announcement
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Announcement $announcement): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|nullable|string|max:255',
            'content' => 'sometimes|nullable|string',
            'content_html' => 'sometimes|nullable|string',
            'author' => 'sometimes|nullable|string|max:255',
            'status' => 'sometimes|in:draft,published,archived',
            'category' => 'sometimes|nullable|string|max:255',
            'image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
            'images.*' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
            'image_url' => 'sometimes|nullable|url',
            'is_featured' => 'sometimes|boolean',
        ]);

        $data = [];
        if ($request->has('title')) { $data['title'] = $request->title; }
        if ($request->has('content')) { $data['content'] = $request->content; }
        if ($request->has('content_html')) { $data['content_html'] = $request->content_html; }
        if ($request->has('author')) { $data['author'] = $request->author; }
        if ($request->has('category')) { $data['category'] = $request->category; }
        if ($request->has('status')) {
            $data['status'] = $request->status;
            $data['published_at'] = $request->status === 'published' ? now() : null;
        }
        if ($request->has('is_featured')) {
            $data['is_featured'] = (bool) $request->boolean('is_featured');
        }

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('announcements', 'public');
        }

        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $file) {
                $images[] = $file->store('announcements', 'public');
            }
            $data['images'] = $images;
        }

        if ($request->has('image_url')) {
            $data['external_link'] = $request->filled('image_url')
                ? $this->convertGDriveLink($request->image_url)
                : null;
        }

        $announcement->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Announcement updated successfully',
            'data' => $announcement
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Announcement $announcement): JsonResponse
    {
        $announcement->delete();

        return response()->json([
            'success' => true,
            'message' => 'Announcement deleted successfully'
        ]);
    }

    /**
     * Get published announcements for public view.
     */
    public function public(): JsonResponse
    {
        $query = Announcement::published()->latest('published_at');
        if (request()->boolean('featured')) {
            $query->where('is_featured', true);
        }
        $announcements = $query->get();

        return response()->json([
            'success' => true,
            'data' => $announcements
        ]);
    }

    /**
     * List trashed announcements (soft-deleted)
     */
    public function trashed(): JsonResponse
    {
        $announcements = Announcement::onlyTrashed()->latest('deleted_at')->get();
        return response()->json([
            'success' => true,
            'data' => $announcements
        ]);
    }

    /**
     * Restore a soft-deleted announcement
     */
    public function restore($id): JsonResponse
    {
        $announcement = Announcement::onlyTrashed()->findOrFail($id);
        $announcement->restore();
        return response()->json([
            'success' => true,
            'message' => 'Announcement restored successfully',
            'data' => $announcement
        ]);
    }

    /**
     * Permanently delete a soft-deleted announcement
     */
    public function forceDelete($id): JsonResponse
    {
        $announcement = Announcement::onlyTrashed()->findOrFail($id);
        $announcement->forceDelete();
        return response()->json([
            'success' => true,
            'message' => 'Announcement permanently deleted'
        ]);
    }

    /**
     * Convert Google Drive sharing link to direct view link
     */
    private function convertGDriveLink(string $url): string
    {
        // If it's already a direct link, return as is
        if (str_contains($url, 'drive.google.com/uc?')) {
            return $url;
        }

        // Extract file ID from sharing link
        $pattern = '/\/file\/d\/([a-zA-Z0-9_-]+)\//';
        if (preg_match($pattern, $url, $matches)) {
            $fileId = $matches[1];
            return "https://drive.google.com/uc?export=view&id={$fileId}";
        }

        // If not a GDrive link, return as is (could be other URL)
        return $url;
    }
}
