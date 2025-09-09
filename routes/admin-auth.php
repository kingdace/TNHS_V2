<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;

// Admin auth routes with minimal middleware
Route::group(['prefix' => 'admin/auth', 'name' => 'admin.auth.'], function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/check', [AuthController::class, 'check'])->name('check');
    Route::get('/me', [AuthController::class, 'me'])->name('me');
});
