<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminGalleryCommentController extends Controller
{
    /**
     * Delete a comment (admin only)
     */
    public function destroy($id)
    {
        try {
            $comment = GalleryComment::findOrFail($id);
            
            // Delete the comment
            $comment->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Comment deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete comment: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Admin reply to a comment
     */
    public function reply(Request $request, $imageId)
    {
        $validator = Validator::make($request->all(), [
            'comment_text' => 'required|string|max:500',
            'parent_id' => 'nullable|exists:gallery_comments,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $comment = GalleryComment::create([
                'gallery_image_id' => $imageId,
                'user_id' => Auth::id(), // Admin user ID
                'guest_id' => 'ADMIN', // Use 'ADMIN' instead of null
                'comment_text' => $request->comment_text,
                'parent_id' => $request->parent_id, // Support threaded replies
                'is_admin' => true // Mark as admin comment
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Reply posted successfully',
                'data' => [
                    'id' => $comment->id,
                    'gallery_image_id' => $comment->gallery_image_id,
                    'guest_id' => $comment->guest_id,
                    'comment_text' => $comment->comment_text,
                    'parent_id' => $comment->parent_id,
                    'created_at' => $comment->created_at->toISOString(),
                    'is_admin' => true,
                    'is_flagged' => false,
                    'user_name' => Auth::user()->name ?? 'Admin'
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to post reply: ' . $e->getMessage()
            ], 500);
        }
    }
}
