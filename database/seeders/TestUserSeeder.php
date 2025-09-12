<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create test admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@tnhs.edu.ph',
            'password' => Hash::make('password'),
            'is_admin' => true,
            'is_active' => true,
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create test regular user
        User::create([
            'name' => 'Test User',
            'email' => 'user@tnhs.edu.ph',
            'password' => Hash::make('password'),
            'is_admin' => false,
            'is_active' => true,
            'role' => 'user',
            'email_verified_at' => now(),
        ]);
    }
}
