<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default admin user
        User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'TNHS Administrator',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin123'), // Default password - should be changed in production
                'is_admin' => true,
                'is_active' => true,
                'role' => 'super_admin',
                'email_verified_at' => now(),
            ]
        );

        // Create additional admin users if needed
        User::updateOrCreate(
            ['email' => 'principal@tnhs.edu.ph'],
            [
                'name' => 'School Principal',
                'email' => 'principal@tnhs.edu.ph',
                'password' => Hash::make('principal123'),
                'is_admin' => true,
                'is_active' => true,
                'role' => 'principal',
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'webmaster@tnhs.edu.ph'],
            [
                'name' => 'Webmaster',
                'email' => 'webmaster@tnhs.edu.ph',
                'password' => Hash::make('webmaster123'),
                'is_admin' => true,
                'is_active' => true,
                'role' => 'webmaster',
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('Admin users created successfully!');
        $this->command->info('Default admin credentials:');
        $this->command->info('Email: admin@gmail.com');
        $this->command->info('Password: admin123');
        $this->command->warn('⚠️  IMPORTANT: Change default passwords in production!');
    }
}
