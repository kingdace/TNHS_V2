<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DownloadFile;
use Illuminate\Http\Request;

class DownloadFileController extends Controller
{
    /**
     * Get all active download files
     */
    public function index(Request $request)
    {
        $query = DownloadFile::active()->ordered();

        // Filter by category if provided
        if ($request->has('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        // Search functionality
        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        $files = $query->get();

        return response()->json([
            'success' => true,
            'data' => $files
        ]);
    }

    /**
     * Get download files by category
     */
    public function getByCategory($category)
    {
        $files = DownloadFile::active()
            ->byCategory($category)
            ->ordered()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $files
        ]);
    }

    /**
     * Get download statistics
     */
    public function getStatistics()
    {
        $totalDownloads = DownloadFile::sum('download_count');
        $totalFiles = DownloadFile::active()->count();
        $categories = DownloadFile::active()
            ->selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_downloads' => $totalDownloads,
                'total_files' => $totalFiles,
                'categories' => $categories
            ]
        ]);
    }

    /**
     * Increment download count
     */
    public function incrementDownload($id)
    {
        $file = DownloadFile::findOrFail($id);
        $file->incrementDownloadCount();

        return response()->json([
            'success' => true,
            'message' => 'Download count updated'
        ]);
    }
}
