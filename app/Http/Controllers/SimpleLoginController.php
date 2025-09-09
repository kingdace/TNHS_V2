<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class SimpleLoginController extends Controller
{
    public function login(Request $request)
    {
        try {
            $email = $request->input('email');
            $password = $request->input('password');

            if (!$email || !$password) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email and password are required'
                ], 400);
            }

            $user = User::where('email', $email)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials'
                ], 401);
            }

            if (!$user->isAdmin()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Access denied. Admin privileges required.'
                ], 401);
            }

            if (!Hash::check($password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials'
                ], 401);
            }

            // Login the user and start session
            Auth::login($user);

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
                'redirect' => '/admin'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Login failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully',
                'redirect' => '/admin/login'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Logout failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function check()
    {
        try {
            $user = Auth::user();

            return response()->json([
                'authenticated' => $user && $user->isAdmin(),
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ] : null
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'authenticated' => false,
                'user' => null
            ]);
        }
    }
}
