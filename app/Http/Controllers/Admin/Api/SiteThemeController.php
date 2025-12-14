<?php

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteTheme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SiteThemeController extends Controller
{
    /**
     * Display a listing of all themes.
     */
    public function index()
    {
        $themes = SiteTheme::orderBy('is_active', 'desc')
            ->orderBy('name')
            ->get();

        return response()->json($themes);
    }

    /**
     * Display the specified theme.
     */
    public function show($id)
    {
        $theme = SiteTheme::findOrFail($id);
        return response()->json($theme);
    }

    /**
     * Activate the specified theme.
     */
    public function activate($id)
    {
        $theme = SiteTheme::findOrFail($id);
        $theme->activate();

        // Clear the active theme cache
        Cache::forget('active_theme');

        return response()->json([
            'message' => 'Theme activated successfully',
            'theme' => $theme,
        ]);
    }

    /**
     * Store a newly created theme (for future custom themes).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:site_themes',
            'description' => 'nullable|string',
            'colors' => 'required|array',
            'colors.primary' => 'required|string',
            'colors.secondary' => 'required|string',
            'colors.gradient_from' => 'required|string',
            'colors.gradient_via' => 'required|string',
            'colors.gradient_to' => 'required|string',
            'colors.accent' => 'required|string',
            'colors.text_light' => 'required|string',
            'colors.text_lighter' => 'required|string',
            'colors.hover' => 'required|string',
        ]);

        $theme = SiteTheme::create($validated);

        return response()->json([
            'message' => 'Theme created successfully',
            'theme' => $theme,
        ], 201);
    }

    /**
     * Update the specified theme.
     */
    public function update(Request $request, $id)
    {
        $theme = SiteTheme::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'colors' => 'sometimes|array',
        ]);

        $theme->update($validated);

        // Clear cache if this is the active theme
        if ($theme->is_active) {
            Cache::forget('active_theme');
        }

        return response()->json([
            'message' => 'Theme updated successfully',
            'theme' => $theme,
        ]);
    }
}
