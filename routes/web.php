<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\HeroCarouselController;
use App\Http\Controllers\Admin\HeroCarouselController as AdminHeroCarouselController;
use App\Http\Controllers\Admin\AuthController;

// SIMPLE AUTH ROUTES - NO MIDDLEWARE AT ALL
Route::post('/auth/login', [App\Http\Controllers\SimpleLoginController::class, 'login']);
Route::post('/auth/logout', [App\Http\Controllers\SimpleLoginController::class, 'logout']);
Route::get('/auth/check', [App\Http\Controllers\SimpleLoginController::class, 'check']);

// API Routes - must come before the catch-all route
Route::prefix('api')->group(function () {
    Route::get('/announcements/public', [AnnouncementController::class, 'public']);
    Route::apiResource('announcements', AnnouncementController::class);

    // Hero Carousel API
    Route::get('/hero-carousel', [HeroCarouselController::class, 'index']);
    Route::get('/hero-carousel/{heroCarousel}', [HeroCarouselController::class, 'show']);

    // Academic Programs API
    Route::get('/academic-programs', [\App\Http\Controllers\Api\AcademicProgramController::class, 'index']);
    Route::get('/academic-programs/{academicProgram}', [\App\Http\Controllers\Api\AcademicProgramController::class, 'show']);
    Route::get('/academic-programs/type/{type}', [\App\Http\Controllers\Api\AcademicProgramController::class, 'byType']);
    Route::get('/academic-programs/grade/{grade}', [\App\Http\Controllers\Api\AcademicProgramController::class, 'byGrade']);

    // School Information API
    Route::get('/school-info', [\App\Http\Controllers\Api\SchoolInfoController::class, 'index']);
    Route::get('/school-info/{schoolInfo}', [\App\Http\Controllers\Api\SchoolInfoController::class, 'show']);
    Route::get('/school-info/type/{type}', [\App\Http\Controllers\Api\SchoolInfoController::class, 'byType']);
    Route::get('/school-info/history', [\App\Http\Controllers\Api\SchoolInfoController::class, 'history']);
    Route::get('/school-info/mission', [\App\Http\Controllers\Api\SchoolInfoController::class, 'mission']);
    Route::get('/school-info/vision', [\App\Http\Controllers\Api\SchoolInfoController::class, 'vision']);
    Route::get('/school-info/values', [\App\Http\Controllers\Api\SchoolInfoController::class, 'values']);
    Route::get('/school-info/achievements', [\App\Http\Controllers\Api\SchoolInfoController::class, 'achievements']);
    Route::get('/school-info/facilities', [\App\Http\Controllers\Api\SchoolInfoController::class, 'facilities']);

    // Contact Information API
    Route::get('/contact-info', [\App\Http\Controllers\Api\ContactInfoController::class, 'index']);
    Route::get('/contact-info/{contactInfo}', [\App\Http\Controllers\Api\ContactInfoController::class, 'show']);
    Route::get('/contact-info/type/{type}', [\App\Http\Controllers\Api\ContactInfoController::class, 'byType']);
    Route::get('/contact-info/emails', [\App\Http\Controllers\Api\ContactInfoController::class, 'emails']);
    Route::get('/contact-info/phones', [\App\Http\Controllers\Api\ContactInfoController::class, 'phones']);
    Route::get('/contact-info/addresses', [\App\Http\Controllers\Api\ContactInfoController::class, 'addresses']);
    Route::get('/contact-info/hours', [\App\Http\Controllers\Api\ContactInfoController::class, 'hours']);
});

// Admin authentication routes - completely separate from web middleware
Route::prefix('admin')->name('admin.')->group(function () {
    // Public login route
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
});


// Admin API routes - temporarily without middleware for testing
Route::prefix('admin')->group(function () {
        Route::resource('hero-carousel', AdminHeroCarouselController::class);

        // Academic Programs Management
        Route::resource('academic-programs', \App\Http\Controllers\Admin\AcademicProgramController::class);
        Route::post('academic-programs/{academicProgram}/toggle-active', [\App\Http\Controllers\Admin\AcademicProgramController::class, 'toggleActive']);
        Route::post('academic-programs/reorder', [\App\Http\Controllers\Admin\AcademicProgramController::class, 'reorder']);

        // School Information Management
        Route::resource('school-info', \App\Http\Controllers\Admin\SchoolInfoController::class);
        Route::post('school-info/{schoolInfo}/toggle-active', [\App\Http\Controllers\Admin\SchoolInfoController::class, 'toggleActive']);
        Route::post('school-info/reorder', [\App\Http\Controllers\Admin\SchoolInfoController::class, 'reorder']);

        // Contact Information Management
        Route::resource('contact-info', \App\Http\Controllers\Admin\ContactInfoController::class);
        Route::post('contact-info/{contactInfo}/toggle-active', [\App\Http\Controllers\Admin\ContactInfoController::class, 'toggleActive']);
        Route::post('contact-info/reorder', [\App\Http\Controllers\Admin\ContactInfoController::class, 'reorder']);
    });

// React SPA route - all other routes will be handled by React Router
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');
