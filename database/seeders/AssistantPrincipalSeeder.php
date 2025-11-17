<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StaffProfile;

class AssistantPrincipalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing assistant principal records
        StaffProfile::where('staff_type', 'assistant_principal')->delete();

        // Assistant Principal 1 - Junior High School
        StaffProfile::create([
            'staff_type' => 'assistant_principal',
            'full_name' => 'Mrs. Mary Ann E. Gubaton',
            'position' => 'Assistant Principal - Junior High School',
            'department' => 'Junior High School',
            'education' => 'Master of Arts in Education Management',
            'experience' => '15+ Years in Educational Leadership',
            'achievements' => 'Known for her firm leadership and motherly presence that brings comfort and calm to both students and teachers. Her nurturing approach fosters a culture of support, discipline, and mutual respect within the school.',
            'profile_image' => 'faculty/ASSISTANT1.jpg', // Assuming images will be stored here
            'contact_info' => [
                'email' => 'm.gubaton@tnhs.edu.ph',
                'phone' => '+63 912 345 6789',
                'address' => null
            ],
            'is_active' => true,
            'display_order' => 1,
        ]);

        // Assistant Principal 2 - Senior High School
        StaffProfile::create([
            'staff_type' => 'assistant_principal',
            'full_name' => 'Dr. Maria Santos',
            'position' => 'Assistant Principal - Senior High School',
            'department' => 'Senior High School',
            'education' => 'Doctor of Philosophy in Educational Leadership',
            'experience' => '18+ Years in Educational Administration',
            'achievements' => 'Brings innovative leadership and strategic vision to our Senior High School program. Committed to preparing students for college and career readiness through comprehensive academic and extracurricular programs.',
            'profile_image' => 'faculty/ASSISTANT2.jpg', // Assuming images will be stored here
            'contact_info' => [
                'email' => 'm.santos@tnhs.edu.ph',
                'phone' => '+63 912 345 6790',
                'address' => null
            ],
            'is_active' => true,
            'display_order' => 2,
        ]);

        $this->command->info('Assistant Principal profiles seeded successfully!');
    }
}
