<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AnnouncementController;

// API Routes - must come before the catch-all route
Route::prefix('api')->group(function () {
    Route::get('/announcements/public', [AnnouncementController::class, 'public']);
    Route::apiResource('announcements', AnnouncementController::class);
});

// React SPA route - all other routes will be handled by React Router
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
