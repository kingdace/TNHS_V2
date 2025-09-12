<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\HeroCarouselController;
use App\Http\Controllers\Admin\HeroCarouselController as AdminHeroCarouselController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// Public Routes (handled by React Router)
Route::get('/', function () {
    return view('app');
});

// API Routes - must come before the catch-all route
Route::prefix('api')->group(function () {
    Route::get('/announcements/public', [AnnouncementController::class, 'public']);
    Route::apiResource('announcements', AnnouncementController::class);
    Route::apiResource('hero-carousel', HeroCarouselController::class);
    Route::apiResource('academic-programs', \App\Http\Controllers\Api\AcademicProgramController::class);
    Route::apiResource('school-info', \App\Http\Controllers\Api\SchoolInfoController::class);
    Route::apiResource('contact-info', \App\Http\Controllers\Api\ContactInfoController::class);

    // Academic Programs API routes
    Route::get('/academic-programs/grade/{grade}', [\App\Http\Controllers\Api\AcademicProgramController::class, 'byGrade']);
    Route::get('/academic-programs/type/{type}', [\App\Http\Controllers\Api\AcademicProgramController::class, 'byType']);

    // School Info API routes
    Route::get('/school-info/type/{type}', [\App\Http\Controllers\Api\SchoolInfoController::class, 'byType']);
    Route::get('/school-info/history', [\App\Http\Controllers\Api\SchoolInfoController::class, 'history']);
    Route::get('/school-info/mission', [\App\Http\Controllers\Api\SchoolInfoController::class, 'mission']);
    Route::get('/school-info/vision', [\App\Http\Controllers\Api\SchoolInfoController::class, 'vision']);
    Route::get('/school-info/values', [\App\Http\Controllers\Api\SchoolInfoController::class, 'values']);
    Route::get('/school-info/achievements', [\App\Http\Controllers\Api\SchoolInfoController::class, 'achievements']);
    Route::get('/school-info/facilities', [\App\Http\Controllers\Api\SchoolInfoController::class, 'facilities']);

    // Contact Info API routes
    Route::get('/contact-info/type/{type}', [\App\Http\Controllers\Api\ContactInfoController::class, 'byType']);
    Route::get('/contact-info/emails', [\App\Http\Controllers\Api\ContactInfoController::class, 'emails']);
    Route::get('/contact-info/phones', [\App\Http\Controllers\Api\ContactInfoController::class, 'phones']);
    Route::get('/contact-info/addresses', [\App\Http\Controllers\Api\ContactInfoController::class, 'addresses']);
    Route::get('/contact-info/hours', [\App\Http\Controllers\Api\ContactInfoController::class, 'hours']);
});

// Admin API routes - protected with admin authentication middleware
Route::prefix('admin')->middleware(['admin.auth'])->group(function () {
        Route::resource('hero-carousel', AdminHeroCarouselController::class)->names([
            'index' => 'admin.hero-carousel.index',
            'create' => 'admin.hero-carousel.create',
            'store' => 'admin.hero-carousel.store',
            'show' => 'admin.hero-carousel.show',
            'edit' => 'admin.hero-carousel.edit',
            'update' => 'admin.hero-carousel.update',
            'destroy' => 'admin.hero-carousel.destroy'
        ]);
        Route::resource('academic-programs', \App\Http\Controllers\Admin\AcademicProgramController::class)->names([
            'index' => 'admin.academic-programs.index',
            'create' => 'admin.academic-programs.create',
            'store' => 'admin.academic-programs.store',
            'show' => 'admin.academic-programs.show',
            'edit' => 'admin.academic-programs.edit',
            'update' => 'admin.academic-programs.update',
            'destroy' => 'admin.academic-programs.destroy'
        ]);
        Route::resource('school-info', \App\Http\Controllers\Admin\SchoolInfoController::class)->names([
            'index' => 'admin.school-info.index',
            'create' => 'admin.school-info.create',
            'store' => 'admin.school-info.store',
            'show' => 'admin.school-info.show',
            'edit' => 'admin.school-info.edit',
            'update' => 'admin.school-info.update',
            'destroy' => 'admin.school-info.destroy'
        ]);
        Route::resource('contact-info', \App\Http\Controllers\Admin\ContactInfoController::class)->names([
            'index' => 'admin.contact-info.index',
            'create' => 'admin.contact-info.create',
            'store' => 'admin.contact-info.store',
            'show' => 'admin.contact-info.show',
            'edit' => 'admin.contact-info.edit',
            'update' => 'admin.contact-info.update',
            'destroy' => 'admin.contact-info.destroy'
        ]);
        // Route::resource('announcements', \App\Http\Controllers\Admin\AnnouncementController::class);
        // Route::resource('users', \App\Http\Controllers\Admin\UserController::class);

        // Academic Programs Admin routes
        Route::post('/academic-programs/reorder', [\App\Http\Controllers\Admin\AcademicProgramController::class, 'reorder']);
        Route::post('/academic-programs/{academicProgram}/toggle-active', [\App\Http\Controllers\Admin\AcademicProgramController::class, 'toggleActive']);

        // School Info Admin routes
        Route::post('/school-info/reorder', [\App\Http\Controllers\Admin\SchoolInfoController::class, 'reorder']);
        Route::post('/school-info/{schoolInfo}/toggle-active', [\App\Http\Controllers\Admin\SchoolInfoController::class, 'toggleActive']);

        // Contact Info Admin routes
        Route::post('/contact-info/reorder', [\App\Http\Controllers\Admin\ContactInfoController::class, 'reorder']);
        Route::post('/contact-info/{contactInfo}/toggle-active', [\App\Http\Controllers\Admin\ContactInfoController::class, 'toggleActive']);
    });

// Authentication routes
Route::get('/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])->name('logout');

// API Routes for authentication
Route::post('/api/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::post('/api/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy']);
Route::get('/api/user', function () {
    return response()->json(Auth::user() ?? null);
})->middleware('auth');

// Protected Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Dashboard - protected with admin authentication
Route::middleware(['auth', 'admin.auth'])->group(function () {
    Route::get('/admin', function () {
        return view('app');
    })->name('admin.dashboard');

    // Admin API Routes
    Route::prefix('admin')->group(function () {
        // Page Content Management
        Route::apiResource('page-content', \App\Http\Controllers\Admin\PageContentController::class);
        Route::post('page-content/reorder', [\App\Http\Controllers\Admin\PageContentController::class, 'reorder']);
        Route::post('page-content/{pageContent}/toggle-active', [\App\Http\Controllers\Admin\PageContentController::class, 'toggleActive']);
        Route::get('page-content/pages', [\App\Http\Controllers\Admin\PageContentController::class, 'getPages']);
        Route::get('page-content/pages/{page}/sections', [\App\Http\Controllers\Admin\PageContentController::class, 'getSections']);
        Route::get('page-content/page/{page}/section/{section}', [\App\Http\Controllers\Admin\PageContentController::class, 'getByPageSection']);

        // Download Files Management
        Route::apiResource('download-files', \App\Http\Controllers\Admin\DownloadFileController::class);
        Route::post('download-files/{downloadFile}/toggle-active', [\App\Http\Controllers\Admin\DownloadFileController::class, 'toggleActive']);
        Route::post('download-files/reorder', [\App\Http\Controllers\Admin\DownloadFileController::class, 'reorder']);

        // External Links Management
        Route::apiResource('external-links', \App\Http\Controllers\Admin\ExternalLinkController::class);
        Route::post('external-links/{externalLink}/toggle-active', [\App\Http\Controllers\Admin\ExternalLinkController::class, 'toggleActive']);
        Route::post('external-links/reorder', [\App\Http\Controllers\Admin\ExternalLinkController::class, 'reorder']);

        // Staff Profiles Management
        Route::apiResource('staff-profiles', \App\Http\Controllers\Admin\StaffProfileController::class);
        Route::post('staff-profiles/{staffProfile}/toggle-active', [\App\Http\Controllers\Admin\StaffProfileController::class, 'toggleActive']);
        Route::post('staff-profiles/reorder', [\App\Http\Controllers\Admin\StaffProfileController::class, 'reorder']);
    });
});

// Public API Routes for dynamic content
Route::get('/api/page-content/{page}', [\App\Http\Controllers\Api\PageContentController::class, 'getPageContents']);
Route::get('/api/page-content/{page}/{section}', [\App\Http\Controllers\Api\PageContentController::class, 'getPageContent']);
Route::get('/api/featured-content', [\App\Http\Controllers\Api\PageContentController::class, 'getFeaturedContent']);
Route::get('/api/content-type/{type}', [\App\Http\Controllers\Api\PageContentController::class, 'getContentByType']);

// Public API Routes for downloads
Route::get('/api/downloads', [\App\Http\Controllers\Api\DownloadFileController::class, 'index']);
Route::get('/api/downloads/category/{category}', [\App\Http\Controllers\Api\DownloadFileController::class, 'getByCategory']);
Route::get('/api/downloads/statistics', [\App\Http\Controllers\Api\DownloadFileController::class, 'getStatistics']);
Route::post('/api/downloads/{id}/increment', [\App\Http\Controllers\Api\DownloadFileController::class, 'incrementDownload']);

// Public API Routes for external links
Route::get('/api/external-links', [\App\Http\Controllers\Api\ExternalLinkController::class, 'index']);
Route::get('/api/external-links/category/{category}', [\App\Http\Controllers\Api\ExternalLinkController::class, 'getByCategory']);
Route::get('/api/external-links/statistics', [\App\Http\Controllers\Api\ExternalLinkController::class, 'getStatistics']);
Route::post('/api/external-links/{id}/increment', [\App\Http\Controllers\Api\ExternalLinkController::class, 'incrementClick']);

// Public API Routes for staff profiles
Route::get('/api/staff-profiles', function () {
    return response()->json([
        'success' => true,
        'data' => \App\Models\StaffProfile::active()->ordered()->get()
    ]);
});
Route::get('/api/staff-profiles/type/{type}', function ($type) {
    return response()->json([
        'success' => true,
        'data' => \App\Models\StaffProfile::active()->byType($type)->ordered()->get()
    ]);
});

// React SPA route - all routes will be handled by React Router
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');
