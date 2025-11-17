<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    /**
     * Upload an image file
     */
    public function upload(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
                'folder' => 'string|nullable'
            ]);

            $image = $request->file('image');
            $folder = $request->input('folder', 'uploads');

            // Generate unique filename
            $filename = Str::random(40) . '.' . $image->getClientOriginalExtension();

            // Store the image
            $path = $image->storeAs("public/{$folder}", $filename);

            // Remove 'public/' from path for database storage
            $relativePath = str_replace('public/', '', $path);

            return response()->json([
                'success' => true,
                'path' => $relativePath,
                'url' => Storage::url($relativePath),
                'message' => 'Image uploaded successfully'
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
                'message' => 'Failed to upload image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete an image file
     */
    public function delete(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'path' => 'required|string'
            ]);

            $path = 'public/' . $request->input('path');

            if (Storage::exists($path)) {
                Storage::delete($path);
            }

            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
