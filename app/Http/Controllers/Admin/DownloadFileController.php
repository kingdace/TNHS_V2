<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DownloadFile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class DownloadFileController extends Controller
{
    /**
     * Display a listing of download files
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = DownloadFile::query();

            // Apply filters
            if ($request->filled('category')) {
                $query->byCategory($request->category);
            }

            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            }

            // Apply ordering
            $files = $query->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $files,
                'message' => 'Download files retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve download files',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created download file
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'file' => 'required|file|max:10240', // 10MB max
                'category' => 'required|string|max:100',
                'is_active' => 'boolean',
                'display_order' => 'integer|min:0',
            ]);

            // Store the file
            $file = $request->file('file');
            $path = $file->store('downloads', 'public');

            // Get file info
            $fileSize = $file->getSize();
            $fileType = $file->getClientOriginalExtension();

            $downloadFile = DownloadFile::create([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'file_path' => $path,
                'file_type' => $fileType,
                'file_size' => $fileSize,
                'category' => $validated['category'],
                'is_active' => $request->boolean('is_active', true),
                'display_order' => $validated['display_order'] ?? 0,
                'download_count' => 0,
            ]);

            return response()->json([
                'success' => true,
                'data' => $downloadFile,
                'message' => 'Download file created successfully'
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
                'message' => 'Failed to create download file',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified download file
     */
    public function show(DownloadFile $downloadFile): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $downloadFile,
                'message' => 'Download file retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve download file',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified download file
     */
    public function update(Request $request, DownloadFile $downloadFile): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'file' => 'sometimes|file|max:10240', // 10MB max
                'category' => 'sometimes|string|max:100',
                'is_active' => 'boolean',
                'display_order' => 'integer|min:0',
            ]);

            $data = $validated;

            // If new file uploaded, replace the old one
            if ($request->hasFile('file')) {
                // Delete old file
                if ($downloadFile->file_path) {
                    Storage::disk('public')->delete($downloadFile->file_path);
                }

                // Store new file
                $file = $request->file('file');
                $path = $file->store('downloads', 'public');

                $data['file_path'] = $path;
                $data['file_type'] = $file->getClientOriginalExtension();
                $data['file_size'] = $file->getSize();
            }

            $downloadFile->update($data);

            return response()->json([
                'success' => true,
                'data' => $downloadFile,
                'message' => 'Download file updated successfully'
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
                'message' => 'Failed to update download file',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified download file
     */
    public function destroy(DownloadFile $downloadFile): JsonResponse
    {
        try {
            // Delete the file from storage
            if ($downloadFile->file_path) {
                Storage::disk('public')->delete($downloadFile->file_path);
            }

            $downloadFile->delete();

            return response()->json([
                'success' => true,
                'message' => 'Download file deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete download file',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of download file
     */
    public function toggleActive(DownloadFile $downloadFile): JsonResponse
    {
        try {
            $downloadFile->update(['is_active' => !$downloadFile->is_active]);

            return response()->json([
                'success' => true,
                'data' => $downloadFile,
                'message' => 'Download file status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update download file status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reorder download files
     */
    public function reorder(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'files' => 'required|array',
                'files.*.id' => 'required|exists:download_files,id',
                'files.*.display_order' => 'required|integer|min:0',
            ]);

            foreach ($validated['files'] as $fileData) {
                DownloadFile::where('id', $fileData['id'])
                    ->update(['display_order' => $fileData['display_order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Download files reordered successfully'
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
                'message' => 'Failed to reorder download files',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
