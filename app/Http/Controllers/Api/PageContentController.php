<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageContent;
use Illuminate\Http\Request;

class PageContentController extends Controller
{
    /**
     * Get page content by page and section
     */
    public function getPageContent(Request $request, $page, $section = null)
    {
        $query = PageContent::active()->forPage($page);

        if ($section) {
            $query->where('section_name', $section);
        }

        $content = $query->ordered()->get();

        return response()->json([
            'success' => true,
            'data' => $content
        ]);
    }

    /**
     * Get all content for a specific page
     */
    public function getPageContents($page)
    {
        $content = PageContent::active()
            ->forPage($page)
            ->ordered()
            ->get()
            ->groupBy('section_name');

        return response()->json([
            'success' => true,
            'data' => $content
        ]);
    }

    /**
     * Get featured content
     */
    public function getFeaturedContent()
    {
        $content = PageContent::active()
            ->featured()
            ->ordered()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $content
        ]);
    }

    /**
     * Get content by type
     */
    public function getContentByType($type)
    {
        $content = PageContent::active()
            ->byContentType($type)
            ->ordered()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $content
        ]);
    }
}
