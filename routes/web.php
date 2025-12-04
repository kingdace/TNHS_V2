<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Admin\AnnouncementController as AdminAnnouncementController;
use App\Http\Controllers\Api\HeroCarouselController;
use App\Http\Controllers\Api\EventController as PublicEventController;
use App\Http\Controllers\Admin\EventController as AdminEventController;
use App\Http\Controllers\Admin\HeroCarouselController as AdminHeroCarouselController;
use App\Http\Controllers\Admin\ImageUploadController;
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
    // CSRF token endpoint
    Route::get('/csrf-token', function () {
        return response()->json(['csrf_token' => csrf_token()]);
    });

    // Public announcements endpoints
    Route::get('/announcements/public', [AnnouncementController::class, 'public']);
    Route::get('/announcements/{announcement}', [AnnouncementController::class, 'show']);

    // Admin announcements endpoints (protected)
    Route::middleware(['auth', 'admin.auth'])->group(function () {
        Route::apiResource('announcements', AdminAnnouncementController::class);
        Route::get('/announcements-trashed', [AdminAnnouncementController::class, 'trashed']);
        Route::post('/announcements/{id}/restore', [AdminAnnouncementController::class, 'restore']);
        Route::delete('/announcements/{id}/force', [AdminAnnouncementController::class, 'forceDelete']);
    });
    Route::apiResource('hero-carousel', HeroCarouselController::class);

    // School Info API routes (must come before apiResource to avoid conflicts)
    Route::get('/school-info/type/{type}', [\App\Http\Controllers\Api\SchoolInfoController::class, 'byType']);
    Route::get('/school-info/history', [\App\Http\Controllers\Api\SchoolInfoController::class, 'history']);

    // Public History API routes
    Route::get('/history-milestones/public', [\App\Http\Controllers\Api\HistoryMilestoneController::class, 'public']);
    Route::get('/history-achievements/public', [\App\Http\Controllers\Api\HistoryAchievementController::class, 'public']);

    // Public Mission & Vision API routes
    Route::get('/missions/public', [\App\Http\Controllers\Api\MissionController::class, 'public']);
    Route::get('/visions/public', [\App\Http\Controllers\Api\VisionController::class, 'public']);
    Route::get('/core-values/public', [\App\Http\Controllers\Api\CoreValueController::class, 'public']);
    Route::get('/guiding-principles/public', [\App\Http\Controllers\Api\GuidingPrincipleController::class, 'public']);
    Route::get('/goal-objectives/public', [\App\Http\Controllers\Api\GoalObjectiveController::class, 'public']);

    // Public School Seal API routes
    Route::get('/school-seal-info/public', [\App\Http\Controllers\Api\SchoolSealInfoController::class, 'public']);
    Route::get('/school-seal-info/type/{type}', [\App\Http\Controllers\Api\SchoolSealInfoController::class, 'getByType']);
    Route::get('/school-seal-symbolic-elements/public', [\App\Http\Controllers\Api\SchoolSealSymbolicElementController::class, 'public']);
    Route::get('/school-seal-core-values/public', [\App\Http\Controllers\Api\SchoolSealCoreValueController::class, 'public']);

    // Public Quality Policy API routes
    Route::get('/quality-policies/public', [\App\Http\Controllers\Api\QualityPolicyController::class, 'public']);

    // Public Privacy Policy API routes
    Route::get('/privacy-policies/public', [\App\Http\Controllers\Api\PrivacyPolicyController::class, 'public']);
    Route::get('/school-info/mission', [\App\Http\Controllers\Api\SchoolInfoController::class, 'mission']);
    Route::get('/school-info/vision', [\App\Http\Controllers\Api\SchoolInfoController::class, 'vision']);
    Route::get('/school-info/values', [\App\Http\Controllers\Api\SchoolInfoController::class, 'values']);
    Route::get('/school-info/achievements', [\App\Http\Controllers\Api\SchoolInfoController::class, 'achievements']);
    Route::get('/school-info/facilities', [\App\Http\Controllers\Api\SchoolInfoController::class, 'facilities']);
    Route::apiResource('school-info', \App\Http\Controllers\Api\SchoolInfoController::class);

    Route::apiResource('academic-programs', \App\Http\Controllers\Api\AcademicProgramController::class);
    Route::apiResource('contact-info', \App\Http\Controllers\Api\ContactInfoController::class);

    // Public events (school calendar)
    Route::get('/events/public', [PublicEventController::class, 'publicByMonth']);
    Route::get('/events/public-list', [PublicEventController::class, 'publicList']);

    // Academic Programs API routes
    Route::get('/academic-programs/junior-high-content', [\App\Http\Controllers\Api\AcademicProgramController::class, 'getJuniorHigh']);
    Route::get('/academic-programs/als-content', [\App\Http\Controllers\Api\AcademicProgramController::class, 'getALS']);
    Route::get('/academic-programs/grade/{grade}', [\App\Http\Controllers\Api\AcademicProgramController::class, 'byGrade']);
    Route::get('/academic-programs/type/{type}', [\App\Http\Controllers\Api\AcademicProgramController::class, 'byType']);

    // Contact Info API routes
    Route::get('/contact-info/type/{type}', [\App\Http\Controllers\Api\ContactInfoController::class, 'byType']);
    Route::get('/contact-info/emails', [\App\Http\Controllers\Api\ContactInfoController::class, 'emails']);
    Route::get('/contact-info/phones', [\App\Http\Controllers\Api\ContactInfoController::class, 'phones']);
    Route::get('/contact-info/addresses', [\App\Http\Controllers\Api\ContactInfoController::class, 'addresses']);
    Route::get('/contact-info/hours', [\App\Http\Controllers\Api\ContactInfoController::class, 'hours']);

    // Enrollment Guidelines API routes
    Route::prefix('enrollment-guidelines')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\EnrollmentGuidelinesController::class, 'index']);
        Route::get('/info-cards', [\App\Http\Controllers\Api\EnrollmentGuidelinesController::class, 'getInfoCards']);
        Route::get('/grade-categories', [\App\Http\Controllers\Api\EnrollmentGuidelinesController::class, 'getGradeCategories']);
        Route::get('/special-programs', [\App\Http\Controllers\Api\EnrollmentGuidelinesController::class, 'getSpecialPrograms']);
        Route::get('/category/{categoryId}', [\App\Http\Controllers\Api\EnrollmentGuidelinesController::class, 'getCategory']);
        Route::get('/special-program/{programId}', [\App\Http\Controllers\Api\EnrollmentGuidelinesController::class, 'getSpecialProgram']);
    });

    // Notification routes (no auth required for now - can be added later)
    Route::prefix('notifications')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\NotificationController::class, 'index']);
        Route::get('/unread-count', [\App\Http\Controllers\Api\NotificationController::class, 'unreadCount']);
        Route::post('/{id}/mark-read', [\App\Http\Controllers\Api\NotificationController::class, 'markAsRead']);
        Route::post('/mark-all-read', [\App\Http\Controllers\Api\NotificationController::class, 'markAllAsRead']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\NotificationController::class, 'destroy']);
        Route::post('/cleanup', [\App\Http\Controllers\Api\NotificationController::class, 'cleanup']);
    });

    // Admin API routes - protected with admin authentication middleware
    Route::prefix('admin')->as('admin.')->middleware(['auth', 'admin.auth'])->group(function () {
        Route::apiResource('hero-carousel', AdminHeroCarouselController::class);
        Route::get('/hero-carousel-trashed', [AdminHeroCarouselController::class, 'trashed']);
        Route::post('/hero-carousel/{id}/restore', [AdminHeroCarouselController::class, 'restore']);
        Route::delete('/hero-carousel/{id}/force', [AdminHeroCarouselController::class, 'forceDelete']);

        Route::apiResource('academic-programs', \App\Http\Controllers\Admin\AcademicProgramController::class);
        Route::post('/academic-programs/reorder', [\App\Http\Controllers\Admin\AcademicProgramController::class, 'reorder']);
        Route::post('/academic-programs/{academicProgram}/toggle-active', [\App\Http\Controllers\Admin\AcademicProgramController::class, 'toggleActive']);

        Route::apiResource('school-info', \App\Http\Controllers\Admin\SchoolInfoController::class);
        Route::post('/school-info/reorder', [\App\Http\Controllers\Admin\SchoolInfoController::class, 'reorder']);
        Route::post('/school-info/{schoolInfo}/toggle-active', [\App\Http\Controllers\Admin\SchoolInfoController::class, 'toggleActive']);

        Route::apiResource('contact-info', \App\Http\Controllers\Admin\ContactInfoController::class);
        Route::post('/contact-info/reorder', [\App\Http\Controllers\Admin\ContactInfoController::class, 'reorder']);
        Route::post('/contact-info/{contactInfo}/toggle-active', [\App\Http\Controllers\Admin\ContactInfoController::class, 'toggleActive']);

        // Admin events (school calendar management)
        Route::apiResource('events', AdminEventController::class);

        // History Management
        Route::apiResource('history-milestones', \App\Http\Controllers\Admin\HistoryMilestoneController::class);
        Route::apiResource('history-achievements', \App\Http\Controllers\Admin\HistoryAchievementController::class);

        // Mission & Vision Management
        Route::apiResource('missions', \App\Http\Controllers\Admin\MissionController::class);
        Route::apiResource('visions', \App\Http\Controllers\Admin\VisionController::class);
        Route::apiResource('core-values', \App\Http\Controllers\Admin\CoreValueController::class);
        Route::apiResource('guiding-principles', \App\Http\Controllers\Admin\GuidingPrincipleController::class);
        Route::apiResource('goal-objectives', \App\Http\Controllers\Admin\GoalObjectiveController::class);

        // School Seal Management
        Route::apiResource('school-seal-info', \App\Http\Controllers\Admin\SchoolSealInfoController::class);
        Route::apiResource('school-seal-symbolic-elements', \App\Http\Controllers\Admin\SchoolSealSymbolicElementController::class);
        Route::apiResource('school-seal-core-values', \App\Http\Controllers\Admin\SchoolSealCoreValueController::class);

        // Quality Policy Management
        Route::apiResource('quality-policies', \App\Http\Controllers\Admin\QualityPolicyController::class);

        // Privacy Policy Management
        Route::apiResource('privacy-policies', \App\Http\Controllers\Admin\PrivacyPolicyController::class);

        // Enrollment Guidelines Management
        Route::prefix('enrollment-guidelines')->group(function () {
            Route::get('/', [\App\Http\Controllers\Admin\EnrollmentGuidelinesController::class, 'index']);
            Route::put('/info-cards', [\App\Http\Controllers\Admin\EnrollmentGuidelinesController::class, 'updateInfoCards']);
            Route::put('/category/{categoryId}', [\App\Http\Controllers\Admin\EnrollmentGuidelinesController::class, 'updateCategory']);
            Route::put('/special-program/{programId}', [\App\Http\Controllers\Admin\EnrollmentGuidelinesController::class, 'updateSpecialProgram']);
        });

        // Toggle active status routes
        Route::post('/missions/{mission}/toggle-active', [\App\Http\Controllers\Admin\MissionController::class, 'toggleActive']);
        Route::post('/visions/{vision}/toggle-active', [\App\Http\Controllers\Admin\VisionController::class, 'toggleActive']);
        Route::post('/core-values/{coreValue}/toggle-active', [\App\Http\Controllers\Admin\CoreValueController::class, 'toggleActive']);
        Route::post('/guiding-principles/{guidingPrinciple}/toggle-active', [\App\Http\Controllers\Admin\GuidingPrincipleController::class, 'toggleActive']);
        Route::post('/goal-objectives/{goalObjective}/toggle-active', [\App\Http\Controllers\Admin\GoalObjectiveController::class, 'toggleActive']);
        Route::post('/school-seal-info/{schoolSealInfo}/toggle-active', [\App\Http\Controllers\Admin\SchoolSealInfoController::class, 'toggleActive']);
        Route::post('/school-seal-symbolic-elements/{schoolSealSymbolicElement}/toggle-active', [\App\Http\Controllers\Admin\SchoolSealSymbolicElementController::class, 'toggleActive']);
        Route::post('/school-seal-core-values/{schoolSealCoreValue}/toggle-active', [\App\Http\Controllers\Admin\SchoolSealCoreValueController::class, 'toggleActive']);
        Route::post('/quality-policies/{qualityPolicy}/toggle-active', [\App\Http\Controllers\Admin\QualityPolicyController::class, 'toggleActive']);
        Route::post('/privacy-policies/{privacyPolicy}/toggle-active', [\App\Http\Controllers\Admin\PrivacyPolicyController::class, 'toggleActive']);
    });

    // Search Routes
    Route::get('/search', [\App\Http\Controllers\Api\SearchController::class, 'globalSearch']);
    Route::get('/search/suggestions', [\App\Http\Controllers\Api\SearchController::class, 'getSearchSuggestions']);
});



// API Routes for authentication
Route::post('/api/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::post('/api/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy']);
Route::get('/api/user', function () {
    return response()->json(Auth::user());
})->middleware('web');

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
    Route::prefix('api/admin')->group(function () {
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

        // Image Upload
        Route::post('upload-image', [ImageUploadController::class, 'upload']);
        Route::delete('delete-image', [ImageUploadController::class, 'delete']);

        // Principal Corner Management
        Route::apiResource('principal-corner', \App\Http\Controllers\Admin\PrincipalCornerController::class);
        Route::post('principal-corner/{principalCorner}/toggle-active', [\App\Http\Controllers\Admin\PrincipalCornerController::class, 'toggleActive']);
        Route::post('principal-corner/{principalCorner}/toggle-featured', [\App\Http\Controllers\Admin\PrincipalCornerController::class, 'toggleFeatured']);
        Route::post('principal-corner/reorder', [\App\Http\Controllers\Admin\PrincipalCornerController::class, 'reorder']);
        Route::get('principal-corner-trashed', [\App\Http\Controllers\Admin\PrincipalCornerController::class, 'trashed']);
        Route::post('principal-corner/{id}/restore', [\App\Http\Controllers\Admin\PrincipalCornerController::class, 'restore']);
        Route::delete('principal-corner/{id}/force', [\App\Http\Controllers\Admin\PrincipalCornerController::class, 'forceDelete']);

        // Principal Profile Management
        Route::apiResource('principal-profiles', \App\Http\Controllers\Admin\PrincipalProfileController::class);
        Route::post('principal-profiles/{principalProfile}/toggle-active', [\App\Http\Controllers\Admin\PrincipalProfileController::class, 'toggleActive']);

        // Principal Awards Management
        Route::apiResource('principal-awards', \App\Http\Controllers\Admin\PrincipalAwardController::class);
        Route::post('principal-awards/{principalAward}/toggle-active', [\App\Http\Controllers\Admin\PrincipalAwardController::class, 'toggleActive']);
        Route::post('principal-awards/reorder', [\App\Http\Controllers\Admin\PrincipalAwardController::class, 'reorder']);

        // Gallery Management
        Route::apiResource('gallery', \App\Http\Controllers\Admin\GalleryController::class);
        Route::post('gallery/{galleryImage}/toggle-active', [\App\Http\Controllers\Admin\GalleryController::class, 'toggleActive']);
        Route::post('gallery/{galleryImage}/toggle-featured', [\App\Http\Controllers\Admin\GalleryController::class, 'toggleFeatured']);
        Route::post('gallery/bulk-upload', [\App\Http\Controllers\Admin\GalleryController::class, 'bulkUpload']);
        Route::get('gallery-trashed', [\App\Http\Controllers\Admin\GalleryController::class, 'trashed']);
        Route::post('gallery/{id}/restore', [\App\Http\Controllers\Admin\GalleryController::class, 'restore']);
        Route::delete('gallery/{id}/force', [\App\Http\Controllers\Admin\GalleryController::class, 'forceDelete']);
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
Route::get('/api/staff-profiles', [\App\Http\Controllers\Api\StaffProfileController::class, 'index']);
Route::get('/api/staff-profiles/statistics', [\App\Http\Controllers\Api\StaffProfileController::class, 'getStatistics']);
Route::get('/api/staff-profiles/type/{type}', [\App\Http\Controllers\Api\StaffProfileController::class, 'getByType']);
Route::get('/api/staff-profiles/grade/{grade}', [\App\Http\Controllers\Api\StaffProfileController::class, 'getByGradeLevel']);
Route::get('/api/staff-profiles/hierarchy', [\App\Http\Controllers\Api\StaffProfileController::class, 'getHierarchy']);
Route::get('/api/staff-profiles/teachers-by-grades', [\App\Http\Controllers\Api\StaffProfileController::class, 'getTeachersByGrades']);
Route::get('/api/staff-profiles/{id}', [\App\Http\Controllers\Api\StaffProfileController::class, 'show']);
Route::get('/api/staff-statistics', [\App\Http\Controllers\Api\StaffProfileController::class, 'getStatistics']);
Route::get('/api/staff-types', [\App\Http\Controllers\Api\StaffProfileController::class, 'getTypes']);
Route::get('/api/staff-departments', [\App\Http\Controllers\Api\StaffProfileController::class, 'getDepartments']);

// Public API Routes for Principal Corner
Route::get('/api/principal-corner', [\App\Http\Controllers\Api\PrincipalCornerController::class, 'index']);
Route::get('/api/principal-corner/{principalCorner}', [\App\Http\Controllers\Api\PrincipalCornerController::class, 'show']);
Route::get('/api/principal-corner/featured', [\App\Http\Controllers\Api\PrincipalCornerController::class, 'featured']);
Route::get('/api/principal-corner/messages', [\App\Http\Controllers\Api\PrincipalCornerController::class, 'messages']);
Route::get('/api/principal-corner/announcements', [\App\Http\Controllers\Api\PrincipalCornerController::class, 'announcements']);
Route::get('/api/principal-corner/vision', [\App\Http\Controllers\Api\PrincipalCornerController::class, 'vision']);

// Public API Routes for Principal Profile
Route::get('/api/principal-profiles', [\App\Http\Controllers\Api\PrincipalProfileController::class, 'index']);
Route::get('/api/principal-awards', [\App\Http\Controllers\Api\PrincipalAwardController::class, 'index']);

// Public API Routes for Gallery
Route::get('/api/gallery', [\App\Http\Controllers\Api\GalleryController::class, 'index']);
Route::get('/api/gallery/{id}', [\App\Http\Controllers\Api\GalleryController::class, 'show']);
Route::get('/api/gallery/category/{category}', [\App\Http\Controllers\Api\GalleryController::class, 'getByCategory']);
Route::get('/api/gallery-featured', [\App\Http\Controllers\Api\GalleryController::class, 'getFeatured']);
Route::get('/api/gallery-categories', [\App\Http\Controllers\Api\GalleryController::class, 'getCategories']);
Route::get('/api/gallery-statistics', [\App\Http\Controllers\Api\GalleryController::class, 'getStatistics']);
Route::post('/api/gallery/{id}/like', [\App\Http\Controllers\Api\GalleryController::class, 'incrementLike']);

// Authentication routes - MUST come before catch-all route
Route::get('/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])->name('logout');

// React SPA route - all routes will be handled by React Router
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');
