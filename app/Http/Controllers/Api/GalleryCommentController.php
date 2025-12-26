<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryComment;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GalleryCommentController extends Controller
{
    /**
     * Get all comments for a specific gallery image
     */
    public function index($imageId)
    {
        try {
            $comments = GalleryComment::where('gallery_image_id', $imageId)
                ->notFlagged()
                ->newest()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $comments,
                'count' => $comments->count(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch comments',
            ], 500);
        }
    }

    /**
     * Store a new comment with rate limiting
     */
    public function store(Request $request, $imageId)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'guest_id' => 'required|string|max:10',
            'comment_text' => 'required|string|max:500',
            'browser_fingerprint' => 'nullable|string|max:64',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Check if image exists
            $image = GalleryImage::find($imageId);
            if (!$image) {
                return response()->json([
                    'success' => false,
                    'message' => 'Image not found',
                ], 404);
            }

            // Basic profanity filter (you can expand this list)
            $profanityWords = ['badword1', 'badword2', 'spam']; // Add more words
            $commentText = strtolower($request->comment_text);
            foreach ($profanityWords as $word) {
                if (str_contains($commentText, $word)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Comment contains inappropriate content',
                    ], 400);
                }
            }

            // Rate limiting: Check comments from this browser in the last 60 seconds
            $recentComment = GalleryComment::where('browser_fingerprint', $request->browser_fingerprint)
                ->where('created_at', '>', now()->subSeconds(60))
                ->first();

            if ($recentComment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Please wait 60 seconds before commenting again',
                    'cooldown' => true,
                ], 429);
            }

            // Rate limiting: Check comments per image (max 5)
            $imageCommentCount = GalleryComment::where('gallery_image_id', $imageId)
                ->where('browser_fingerprint', $request->browser_fingerprint)
                ->count();

            if ($imageCommentCount >= 5) {
                return response()->json([
                    'success' => false,
                    'message' => 'You have reached the comment limit for this image (5 max)',
                    'limit_reached' => true,
                ], 429);
            }

            // Rate limiting: Check daily total (max 20)
            $dailyCommentCount = GalleryComment::where('browser_fingerprint', $request->browser_fingerprint)
                ->whereDate('created_at', today())
                ->count();

            if ($dailyCommentCount >= 20) {
                return response()->json([
                    'success' => false,
                    'message' => 'You have reached your daily comment limit (20 max). Try again tomorrow!',
                    'daily_limit_reached' => true,
                ], 429);
            }

            // Create comment
            $comment = GalleryComment::create([
                'gallery_image_id' => $imageId,
                'guest_id' => $request->guest_id,
                'comment_text' => strip_tags($request->comment_text), // Remove HTML tags
                'browser_fingerprint' => $request->browser_fingerprint,
                'ip_address' => $request->ip(),
                'is_flagged' => false,
            ]);

            return response()->json([
                'success' => true,
                'data' => $comment,
                'message' => 'Comment posted successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to post comment',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a comment (Admin only)
     */
    public function destroy($id)
    {
        try {
            $comment = GalleryComment::find($id);

            if (!$comment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Comment not found',
                ], 404);
            }

            $comment->delete();

            return response()->json([
                'success' => true,
                'message' => 'Comment deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete comment',
            ], 500);
        }
    }

    /**
     * Get all comments for admin panel
     */
    public function adminIndex(Request $request)
    {
        try {
            $query = GalleryComment::with('galleryImage')->newest();

            // Filter by image if provided
            if ($request->has('image_id')) {
                $query->where('gallery_image_id', $request->image_id);
            }

            // Filter by flagged status
            if ($request->has('flagged')) {
                $query->where('is_flagged', $request->flagged);
            }

            $comments = $query->paginate(50);

            return response()->json([
                'success' => true,
                'data' => $comments,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch comments',
            ], 500);
        }
    }

    /**
     * Toggle flag status (Admin only)
     */
    public function toggleFlag($id)
    {
        try {
            $comment = GalleryComment::find($id);

            if (!$comment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Comment not found',
                ], 404);
            }

            $comment->is_flagged = !$comment->is_flagged;
            $comment->save();

            return response()->json([
                'success' => true,
                'data' => $comment,
                'message' => 'Comment flag status updated',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update comment',
            ], 500);
        }
    }
}
