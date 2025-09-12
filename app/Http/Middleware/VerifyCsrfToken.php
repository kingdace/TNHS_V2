<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        // Only exclude specific API routes that need to be public
        'api/announcements/public',
        'api/hero-carousel',
        'api/academic-programs',
        'api/school-info',
        'api/contact-info',
    ];
}
