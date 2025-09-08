<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Show the admin login form
     */
    public function showLoginForm()
    {
        // If user is already authenticated as admin, redirect to dashboard
        if (Auth::check() && Auth::user()->isAdmin()) {
            return redirect('/admin');
        }

        // Return the main app view - React will handle the login page
        return view('app');
    }

    /**
     * Handle admin login
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);

            $credentials = $request->only('email', 'password');
            $remember = $request->boolean('remember');

            // Find user by email
            $user = User::where('email', $credentials['email'])->first();

            // Check if user exists and is admin
            if (!$user || !$user->isAdmin()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials or insufficient privileges.',
                ], 401);
            }

            // Check if user is active
            if (!$user->isActive()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Your account has been deactivated. Please contact the administrator.',
                ], 401);
            }

            // Attempt to authenticate
            if (Auth::attempt($credentials, $remember)) {
                // Update last login timestamp
                $user->updateLastLogin();

                // Regenerate session ID for security
                $request->session()->regenerate();

                return response()->json([
                    'success' => true,
                    'message' => 'Login successful!',
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                    ],
                    'redirect' => '/admin',
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials.',
            ], 401);
        } catch (\Exception $e) {
            \Log::error('Login error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'An error occurred during login. Please try again.',
            ], 500);
        }
    }

    /**
     * Handle admin logout
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            // Log the logout attempt
            \Log::info('Admin logout attempt', [
                'user_id' => Auth::id(),
                'ip' => $request->ip(),
            ]);

            Auth::logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            \Log::info('Admin logout successful', [
                'ip' => $request->ip(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully.',
                'redirect' => route('admin.login'),
            ]);
        } catch (\Exception $e) {
            \Log::error('Logout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'An error occurred during logout. Please try again.',
            ], 500);
        }
    }

    /**
     * Get current admin user info
     */
    public function me(): JsonResponse
    {
        $user = Auth::user();

        if (!$user || !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Not authenticated as admin.',
            ], 401);
        }

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'last_login_at' => $user->last_login_at,
            ],
        ]);
    }

    /**
     * Check if user is authenticated as admin
     */
    public function check(): JsonResponse
    {
        $user = Auth::user();

        return response()->json([
            'authenticated' => $user && $user->isAdmin(),
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ] : null,
        ]);
    }
}
