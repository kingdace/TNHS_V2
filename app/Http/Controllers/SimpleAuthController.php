<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class SimpleAuthController extends Controller
{
    /**
     * Handle admin login - completely bypasses middleware
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $credentials = $request->only('email', 'password');
            
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
            
            // Check password
            if (Hash::check($credentials['password'], $user->password)) {
                // Manually log in the user
                Auth::login($user);
                
                // Update last login timestamp
                $user->updateLastLogin();
                
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
            return response()->json([
                'success' => false,
                'message' => 'An error occurred during login. Please try again.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Handle admin logout
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            
            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully.',
                'redirect' => '/admin/login',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred during logout. Please try again.',
            ], 500);
        }
    }
    
    /**
     * Check authentication status
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
