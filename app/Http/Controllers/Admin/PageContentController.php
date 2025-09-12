<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageContent;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PageContentController extends Controller
{
    /**
     * Display a listing of page content
     */
    public function index(Request $request)
    {
        $query = PageContent::query();

        // Filter by page if provided
        if ($request->has('page') && $request->page) {
            $query->where('page_name', $request->page);
        }

        // Filter by section if provided
        if ($request->has('section') && $request->section) {
            $query->where('section_name', $request->section);
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%")
                  ->orWhere('page_name', 'like', "%{$searchTerm}%")
                  ->orWhere('section_name', 'like', "%{$searchTerm}%");
            });
        }

        $content = $query->orderBy('page_name')
                        ->orderBy('section_name')
                        ->orderBy('display_order')
                        ->get()
                        ->groupBy('page_name');

        return response()->json([
            'success' => true,
            'data' => $content
        ]);
    }

    /**
     * Store a newly created page content
     */
    public function store(Request $request)
    {
        $request->validate([
            'page_name' => 'required|string|max:50',
            'section_name' => 'required|string|max:50',
            'content_type' => 'required|string|max:50',
            'content_data' => 'required|json',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string|max:255',
            'link_url' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer|min:0',
            'is_featured' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ]);

        $content = PageContent::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Page content created successfully',
            'data' => $content
        ], 201);
    }

    /**
     * Display the specified page content
     */
    public function show(PageContent $pageContent)
    {
        return response()->json([
            'success' => true,
            'data' => $pageContent
        ]);
    }

    /**
     * Update the specified page content
     */
    public function update(Request $request, PageContent $pageContent)
    {
        $request->validate([
            'page_name' => 'sometimes|required|string|max:50',
            'section_name' => 'sometimes|required|string|max:50',
            'content_type' => 'sometimes|required|string|max:50',
            'content_data' => 'sometimes|required|json',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string|max:255',
            'link_url' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer|min:0',
            'is_featured' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ]);

        $pageContent->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Page content updated successfully',
            'data' => $pageContent
        ]);
    }

    /**
     * Remove the specified page content
     */
    public function destroy(PageContent $pageContent)
    {
        $pageContent->delete();

        return response()->json([
            'success' => true,
            'message' => 'Page content deleted successfully'
        ]);
    }

    /**
     * Toggle active status
     */
    public function toggleActive(PageContent $pageContent)
    {
        $pageContent->update(['is_active' => !$pageContent->is_active]);

        return response()->json([
            'success' => true,
            'message' => 'Page content status updated successfully',
            'data' => $pageContent
        ]);
    }

    /**
     * Reorder page content
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:page_contents,id',
            'items.*.display_order' => 'required|integer|min:0',
        ]);

        foreach ($request->items as $item) {
            PageContent::where('id', $item['id'])
                     ->update(['display_order' => $item['display_order']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Page content reordered successfully'
        ]);
    }

    /**
     * Get content by page and section
     */
    public function getByPageSection(Request $request, $page, $section)
    {
        $content = PageContent::where('page_name', $page)
                            ->where('section_name', $section)
                            ->orderBy('display_order')
                            ->get();

        return response()->json([
            'success' => true,
            'data' => $content
        ]);
    }

    /**
     * Get all pages
     */
    public function getPages()
    {
        $pages = PageContent::select('page_name')
                           ->distinct()
                           ->orderBy('page_name')
                           ->pluck('page_name');

        return response()->json([
            'success' => true,
            'data' => $pages
        ]);
    }

    /**
     * Get sections for a specific page
     */
    public function getSections($page)
    {
        $sections = PageContent::where('page_name', $page)
                             ->select('section_name')
                             ->distinct()
                             ->orderBy('section_name')
                             ->pluck('section_name');

        return response()->json([
            'success' => true,
            'data' => $sections
        ]);
    }
}
