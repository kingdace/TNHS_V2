<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            // Load auth routes with NO middleware at all
            Route::group([], base_path('routes/auth.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'admin.auth' => \App\Http\Middleware\AdminAuth::class,
        ]);

        // Create a custom middleware group for admin auth without CSRF
        $middleware->group('admin.auth.group', [
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        ]);

        // Create a session-only middleware group (no CSRF)
        $middleware->group('session.only', [
            \Illuminate\Session\Middleware\StartSession::class,
        ]);

        // Completely disable CSRF protection
        $middleware->web(remove: [
            \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
        ]);

        // Remove CSRF from all groups
        $middleware->removeFromGroup('web', \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class);
        $middleware->removeFromGroup('api', \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class);

        // Remove CSRF from global middleware
        $middleware->remove(\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class);

        // Override the VerifyCsrfToken middleware completely
        $middleware->replace(\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class, \App\Http\Middleware\VerifyCsrfToken::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
