<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of announcements (admin view)
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Announcement::query();

            // Apply filters
            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }

            if ($request->filled('category')) {
                $query->where('category', $request->category);
            }

            if ($request->has('featured') && $request->featured !== null) {
                $query->where('is_featured', $request->boolean('featured'));
            }

            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%")
                      ->orWhere('author', 'like', "%{$search}%");
                });
            }

            // Apply ordering
            $announcements = $query->latest('published_at')->get();

            return response()->json([
                'success' => true,
                'data' => $announcements,
                'message' => 'Announcements retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve announcements',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created announcement
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'content_html' => 'nullable|string',
                'author' => 'required|string|max:255',
                'status' => 'required|in:draft,published,archived',
                'category' => 'nullable|string|max:255',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:5120', // 5MB = 5120KB
                'images.*' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:5120', // 5MB = 5120KB
                'image_url' => 'nullable|url',
                'is_featured' => 'nullable|boolean',
                'scheduled_publish_at' => 'nullable|date', // Allow any valid date
                'scheduled_unpublish_at' => 'nullable|date|after:scheduled_publish_at',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        // Additional custom validation for scheduling
        if ($request->scheduled_publish_at) {
            $scheduledTime = \Carbon\Carbon::parse($request->scheduled_publish_at);
            $now = \Carbon\Carbon::now();

            // Allow scheduling up to 5 minutes in the past to account for timezone/processing delays
            if ($scheduledTime->lt($now->subMinutes(5))) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => [
                        'scheduled_publish_at' => ['The scheduled publish date cannot be more than 5 minutes in the past.']
                    ]
                ], 422);
            }
        }

        $imagePath = null;
        $images = [];
        $externalLink = null;

        // Handle main image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('announcements', 'public');
        }

        // Handle gallery images upload
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $images[] = $file->store('announcements', 'public');
            }
        }

        // Handle external link (Google Drive, etc.)
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
            'is_featured' => $request->boolean('is_featured', false),
            'published_at' => $request->status === 'published' && !$request->scheduled_publish_at ? now() : null,
            'scheduled_publish_at' => $request->scheduled_publish_at,
            'scheduled_unpublish_at' => $request->scheduled_unpublish_at,
        ]);

        // Create notification for immediate publishing
        if ($request->status === 'published' && !$request->scheduled_publish_at) {
            Notification::createNotification(
                'announcement_published',
                'Announcement Published',
                "'{$announcement->title}' has been published immediately",
                ['announcement_id' => $announcement->id, 'manual' => true]
            );
        }

        // Create notification for scheduled publishing
        if ($request->scheduled_publish_at) {
            Notification::createNotification(
                'announcement_scheduled',
                'Announcement Scheduled',
                "'{$announcement->title}' is scheduled to publish on " . \Carbon\Carbon::parse($request->scheduled_publish_at)->format('M j, Y \a\t g:i A'),
                ['announcement_id' => $announcement->id, 'scheduled_for' => $request->scheduled_publish_at]
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Announcement created successfully',
            'data' => $announcement
        ], 201);
    }

    /**
     * Display the specified announcement
     */
    public function show(Announcement $announcement): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $announcement
        ]);
    }

    /**
     * Update the specified announcement
     */
    public function update(Request $request, Announcement $announcement): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'sometimes|nullable|string|max:255',
                'content' => 'sometimes|nullable|string',
                'content_html' => 'sometimes|nullable|string',
                'author' => 'sometimes|nullable|string|max:255',
                'status' => 'sometimes|in:draft,published,archived',
                'category' => 'sometimes|nullable|string|max:255',
                'image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,gif,webp|max:5120', // 5MB = 5120KB
                'images.*' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,gif,webp|max:5120', // 5MB = 5120KB
                'image_url' => 'sometimes|nullable|url',
                'is_featured' => 'sometimes|boolean',
                'scheduled_publish_at' => 'sometimes|nullable|date',
                'scheduled_unpublish_at' => 'sometimes|nullable|date|after:scheduled_publish_at',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        $data = [];

        // Update text fields
        if ($request->has('title')) { $data['title'] = $request->title; }
        if ($request->has('content')) { $data['content'] = $request->content; }
        if ($request->has('content_html')) { $data['content_html'] = $request->content_html; }
        if ($request->has('author')) { $data['author'] = $request->author; }
        if ($request->has('category')) { $data['category'] = $request->category; }

        // Update status and published_at
        if ($request->has('status')) {
            $data['status'] = $request->status;
            // Only set published_at if not using scheduled publishing
            if ($request->status === 'published' && !$request->scheduled_publish_at) {
                $data['published_at'] = now();
            } elseif ($request->status !== 'published') {
                $data['published_at'] = null;
            }
        }

        // Update boolean fields
        if ($request->has('is_featured')) {
            $data['is_featured'] = $request->boolean('is_featured');
        }

        // Update scheduling
        if ($request->has('scheduled_publish_at')) {
            $data['scheduled_publish_at'] = $request->scheduled_publish_at;
        }
        if ($request->has('scheduled_unpublish_at')) {
            $data['scheduled_unpublish_at'] = $request->scheduled_unpublish_at;
        }

        // Handle main image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($announcement->image_path) {
                Storage::disk('public')->delete($announcement->image_path);
            }
            $data['image_path'] = $request->file('image')->store('announcements', 'public');
        }

        // Handle gallery images upload
        if ($request->hasFile('images')) {
            // Delete old images if exist
            if ($announcement->images) {
                foreach ($announcement->images as $oldImage) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
            $images = [];
            foreach ($request->file('images') as $file) {
                $images[] = $file->store('announcements', 'public');
            }
            $data['images'] = $images;
        }

        // Handle external link
        if ($request->has('image_url')) {
            $data['external_link'] = $request->filled('image_url')
                ? $this->convertGDriveLink($request->image_url)
                : null;
        }

        // Store original status for comparison
        $originalStatus = $announcement->status;

        $announcement->update($data);

        // Create notifications for status changes
        if ($request->has('status') && $originalStatus !== $request->status) {
            if ($request->status === 'published' && !$request->scheduled_publish_at) {
                Notification::createNotification(
                    'announcement_published',
                    'Announcement Published',
                    "'{$announcement->title}' has been published",
                    ['announcement_id' => $announcement->id, 'manual' => true]
                );
            } elseif ($request->status === 'archived' && $originalStatus === 'published') {
                Notification::createNotification(
                    'announcement_archived',
                    'Announcement Archived',
                    "'{$announcement->title}' has been archived manually",
                    ['announcement_id' => $announcement->id, 'manual' => true]
                );
            }
        }

        // Create notification for new scheduled publishing
        if ($request->has('scheduled_publish_at') && $request->scheduled_publish_at) {
            Notification::createNotification(
                'announcement_scheduled',
                'Announcement Scheduled',
                "'{$announcement->title}' is scheduled to publish on " . \Carbon\Carbon::parse($request->scheduled_publish_at)->format('M j, Y \a\t g:i A'),
                ['announcement_id' => $announcement->id, 'scheduled_for' => $request->scheduled_publish_at]
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Announcement updated successfully',
            'data' => $announcement
        ]);
    }

    /**
     * Remove the specified announcement (soft delete)
     */
    public function destroy(Announcement $announcement): JsonResponse
    {
        $announcement->delete();

        return response()->json([
            'success' => true,
            'message' => 'Announcement moved to trash successfully'
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

        // Delete associated files
        if ($announcement->image_path) {
            Storage::disk('public')->delete($announcement->image_path);
        }
        if ($announcement->images) {
            foreach ($announcement->images as $image) {
                Storage::disk('public')->delete($image);
            }
        }

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
