<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteTheme;
use Illuminate\Support\Facades\Cache;

class ThemeController extends Controller
{
    /**
     * Get the currently active theme.
     */
    public function getActiveTheme()
    {
        // Cache the active theme for 1 hour
        $theme = Cache::remember('active_theme', 3600, function () {
            return SiteTheme::active()->first();
        });

        // Fallback to default theme if none is active
        if (!$theme) {
            $theme = SiteTheme::where('slug', 'royal-blue')->first();
            
            if ($theme) {
                $theme->activate();
            }
        }

        return response()->json($theme);
    }
}
