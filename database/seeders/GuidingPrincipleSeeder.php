<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GuidingPrincipleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $principles = [
            [
                'title' => 'Academic Excellence',
                'description' => 'Maintaining high standards of teaching and learning to ensure quality education for all students.',
                'icon' => 'BookOpen',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Student-Centered',
                'description' => 'Placing students at the heart of all educational decisions and activities.',
                'icon' => 'Users',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Innovation',
                'description' => 'Embracing new technologies and methodologies to enhance learning experiences.',
                'icon' => 'Lightbulb',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Community Engagement',
                'description' => 'Building strong partnerships with families and the community for holistic development.',
                'icon' => 'Globe',
                'display_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($principles as $principle) {
            \App\Models\GuidingPrinciple::create($principle);
        }
    }
}
