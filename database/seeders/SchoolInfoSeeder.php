<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SchoolInfo;

class SchoolInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schoolInfo = [
            [
                'info_type' => 'history',
                'title' => 'Our History',
                'content' => 'Taft National High School was established in 1965 and has been serving the community of Taft, Surigao City for over 50 years. We have grown from a small school to a comprehensive educational institution. Throughout our history, we have maintained our commitment to academic excellence and character development, preparing thousands of students for successful futures.',
                'image_path' => null,
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'info_type' => 'mission',
                'title' => 'Our Mission',
                'content' => 'To provide quality education that empowers students to become responsible, productive, and successful individuals who contribute positively to society.',
                'image_path' => null,
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'info_type' => 'vision',
                'title' => 'Our Vision',
                'content' => 'To be a leading educational institution that fosters academic excellence, character development, and innovation in learning.',
                'image_path' => null,
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'info_type' => 'values',
                'title' => 'Our Core Values',
                'content' => 'Excellence, Integrity, Respect, Responsibility, and Service to the Community. These values guide our daily interactions and educational practices.',
                'image_path' => null,
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'info_type' => 'achievements',
                'title' => 'Notable Achievements',
                'content' => '95% graduation rate, 50+ awards and recognition, 1,200+ active students, and numerous academic competitions won at regional and national levels.',
                'image_path' => null,
                'display_order' => 5,
                'is_active' => true,
            ],
            [
                'info_type' => 'facilities',
                'title' => 'School Facilities',
                'content' => 'Modern classrooms, science laboratories, computer laboratory, library, gymnasium, canteen, and well-maintained grounds for various activities.',
                'image_path' => null,
                'display_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($schoolInfo as $info) {
            SchoolInfo::create($info);
        }

        $this->command->info('School information seeded successfully!');
    }
}
