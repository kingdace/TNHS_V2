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
            'author' => 'required|string|max:255',
            'status' => 'required|in:draft,published,archived',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
            'is_featured' => 'nullable|boolean',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('announcements', 'public');
        }

        $announcement = Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
            'author' => $request->author,
            'image_path' => $imagePath,
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
            'author' => 'sometimes|nullable|string|max:255',
            'status' => 'sometimes|in:draft,published,archived',
            'image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
            'is_featured' => 'sometimes|boolean',
        ]);

        $data = [];
        if ($request->has('title')) { $data['title'] = $request->title; }
        if ($request->has('content')) { $data['content'] = $request->content; }
        if ($request->has('author')) { $data['author'] = $request->author; }
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
}
