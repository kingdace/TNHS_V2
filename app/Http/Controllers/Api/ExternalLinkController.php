<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExternalLink;
use Illuminate\Http\Request;

class ExternalLinkController extends Controller
{
    /**
     * Get all active external links
     */
    public function index(Request $request)
    {
        $query = ExternalLink::active()->ordered();

        // Filter by category if provided
        if ($request->has('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        // Search functionality
        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        $links = $query->get();

        return response()->json([
            'success' => true,
            'data' => $links
        ]);
    }

    /**
     * Get external links by category
     */
    public function getByCategory($category)
    {
        $links = ExternalLink::active()
            ->byCategory($category)
            ->ordered()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $links
        ]);
    }

    /**
     * Get link statistics
     */
    public function getStatistics()
    {
        $totalClicks = ExternalLink::sum('click_count');
        $totalLinks = ExternalLink::active()->count();
        $categories = ExternalLink::active()
            ->selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_clicks' => $totalClicks,
                'total_links' => $totalLinks,
                'categories' => $categories
            ]
        ]);
    }

    /**
     * Increment click count
     */
    public function incrementClick($id)
    {
        $link = ExternalLink::findOrFail($id);
        $link->incrementClickCount();

        return response()->json([
            'success' => true,
            'message' => 'Click count updated'
        ]);
    }
}
