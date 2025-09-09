<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SimpleLoginController;

// AUTH ROUTES - WITH SESSION BUT NO CSRF
Route::middleware(['session.only'])->group(function () {
    Route::post('/auth/login', [SimpleLoginController::class, 'login']);
    Route::post('/auth/logout', [SimpleLoginController::class, 'logout']);
    Route::get('/auth/check', [SimpleLoginController::class, 'check']);
});
