<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SchoolSealInfo;

class SchoolSealInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sealInfo = [
            [
                'info_type' => 'seal_image',
                'title' => 'School Seal',
                'content' => 'Official School Seal of Taft National High School',
                'image_path' => '/images/Logo.jpg',
                'subtitle' => null,
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'info_type' => 'school_identity',
                'title' => 'PASEO VERDE STORM',
                'content' => 'This is the official identity of our school community, representing a vibrant, united, and purpose-driven educational journey. "Paseo Verde" symbolizes our path of growth and sustainability in a nurturing environment, while "Storm" embodies the energy, strength, and unstoppable momentum of our students and staff moving together toward progress and positive change.',
                'image_path' => null,
                'subtitle' => 'Moving forward with strength, growth, and resilience',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'info_type' => 'motto',
                'title' => 'School Motto',
                'content' => 'This motto reinforces our values of collaboration, collective action, and shared responsibility in achieving educational and societal change through unity and determination.',
                'image_path' => null,
                'subtitle' => 'Together we can make a difference',
                'display_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($sealInfo as $info) {
            SchoolSealInfo::create($info);
        }
    }
}
