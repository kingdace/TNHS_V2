<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\HeroCarouselController;
use App\Http\Controllers\Admin\HeroCarouselController as AdminHeroCarouselController;
use App\Http\Controllers\Admin\AuthController;

// Test route without any middleware
Route::get('/test-login', function () {
    return response()->json(['message' => 'Test route works!']);
});

Route::post('/test-login', function () {
    return response()->json(['message' => 'POST test route works!']);
});

// API Routes - must come before the catch-all route
Route::prefix('api')->group(function () {
    Route::get('/announcements/public', [AnnouncementController::class, 'public']);
    Route::apiResource('announcements', AnnouncementController::class);

    // Hero Carousel API
    Route::get('/hero-carousel', [HeroCarouselController::class, 'index']);
    Route::get('/hero-carousel/{heroCarousel}', [HeroCarouselController::class, 'show']);
});

// Admin authentication routes
Route::prefix('admin')->name('admin.')->group(function () {
    // Public login route
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');

    // Authentication API routes - no middleware needed
    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
        Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
        Route::get('/check', [AuthController::class, 'check'])->name('auth.check');
        Route::get('/me', [AuthController::class, 'me'])->name('auth.me');
    });

    // Protected admin routes
    Route::middleware(['admin.auth'])->group(function () {
        Route::resource('hero-carousel', AdminHeroCarouselController::class);
    });
});

// React SPA route - all other routes will be handled by React Router
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');
