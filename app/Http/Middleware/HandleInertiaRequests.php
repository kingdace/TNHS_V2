<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'inertia-app';

    /**
     * Determine if the request is an Inertia request.
     */
    public function isInertiaRequest(Request $request): bool
    {
        // Only use Inertia for auth routes
        $authRoutes = ['login', 'register', 'forgot-password', 'reset-password', 'verify-email', 'confirm-password', 'dashboard', 'profile'];

        foreach ($authRoutes as $route) {
            if ($request->is($route) || $request->is($route . '/*')) {
                return true;
            }
        }

        return false;
    }

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
