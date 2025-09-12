<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class AdminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Authentication required',
                    'error' => 'Unauthenticated'
                ], 401);
            }

            return redirect()->route('login');
        }

        /** @var User $user */
        $user = Auth::user();

        // Check if user is active
        if (!$user->is_active) {
            Auth::logout();

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Account is deactivated',
                    'error' => 'Account deactivated'
                ], 403);
            }

            return redirect()->route('login')->with('error', 'Your account has been deactivated.');
        }

        // Check if user is admin
        if (!$user->is_admin || !$user->is_active) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Admin access required',
                    'error' => 'Forbidden'
                ], 403);
            }

            return redirect('/')->with('error', 'You do not have permission to access this area.');
        }

        // Update last login time
        $user->last_login_at = now();
        $user->save();

        return $next($request);
    }
}
