<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AcademicProgram;

class AcademicProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            [
                'program_type' => 'junior_high',
                'grade_level' => 7,
                'program_name' => 'Junior High School - Grade 7',
                'description' => 'Foundation year focusing on core subjects and study habits development.',
                'subjects' => [
                    'English', 'Filipino', 'Mathematics', 'Science', 'Araling Panlipunan',
                    'Edukasyon sa Pagpapakatao', 'Music, Arts, Physical Education and Health (MAPEH)',
                    'Technology and Livelihood Education (TLE)'
                ],
                'requirements' => 'Elementary School Certificate, Birth Certificate, 2x2 ID Picture',
                'duration' => '1 Year',
                'is_active' => true,
                'display_order' => 1,
            ],
            [
                'program_type' => 'junior_high',
                'grade_level' => 8,
                'program_name' => 'Junior High School - Grade 8',
                'description' => 'Building upon Grade 7 foundation with more advanced concepts.',
                'subjects' => [
                    'English', 'Filipino', 'Mathematics', 'Science', 'Araling Panlipunan',
                    'Edukasyon sa Pagpapakatao', 'Music, Arts, Physical Education and Health (MAPEH)',
                    'Technology and Livelihood Education (TLE)'
                ],
                'requirements' => 'Grade 7 Certificate, Birth Certificate, 2x2 ID Picture',
                'duration' => '1 Year',
                'is_active' => true,
                'display_order' => 2,
            ],
            [
                'program_type' => 'junior_high',
                'grade_level' => 9,
                'program_name' => 'Junior High School - Grade 9',
                'description' => 'Preparing students for senior high school with specialized tracks.',
                'subjects' => [
                    'English', 'Filipino', 'Mathematics', 'Science', 'Araling Panlipunan',
                    'Edukasyon sa Pagpapakatao', 'Music, Arts, Physical Education and Health (MAPEH)',
                    'Technology and Livelihood Education (TLE)'
                ],
                'requirements' => 'Grade 8 Certificate, Birth Certificate, 2x2 ID Picture',
                'duration' => '1 Year',
                'is_active' => true,
                'display_order' => 3,
            ],
            [
                'program_type' => 'junior_high',
                'grade_level' => 10,
                'program_name' => 'Junior High School - Grade 10',
                'description' => 'Final year of junior high school with comprehensive preparation for senior high.',
                'subjects' => [
                    'English', 'Filipino', 'Mathematics', 'Science', 'Araling Panlipunan',
                    'Edukasyon sa Pagpapakatao', 'Music, Arts, Physical Education and Health (MAPEH)',
                    'Technology and Livelihood Education (TLE)'
                ],
                'requirements' => 'Grade 9 Certificate, Birth Certificate, 2x2 ID Picture',
                'duration' => '1 Year',
                'is_active' => true,
                'display_order' => 4,
            ],
            [
                'program_type' => 'senior_high',
                'grade_level' => 11,
                'program_name' => 'Senior High School - Grade 11',
                'description' => 'First year of senior high school with specialized academic tracks.',
                'subjects' => [
                    'Core Subjects: English, Filipino, Mathematics, Science, Araling Panlipunan',
                    'Specialized Subjects based on chosen track',
                    'Applied Subjects: Entrepreneurship, Research, Practical Research'
                ],
                'requirements' => 'Junior High School Certificate, Birth Certificate, 2x2 ID Picture',
                'duration' => '1 Year',
                'is_active' => true,
                'display_order' => 5,
            ],
            [
                'program_type' => 'senior_high',
                'grade_level' => 12,
                'program_name' => 'Senior High School - Grade 12',
                'description' => 'Final year of senior high school with advanced specialized training.',
                'subjects' => [
                    'Core Subjects: English, Filipino, Mathematics, Science, Araling Panlipunan',
                    'Specialized Subjects based on chosen track',
                    'Applied Subjects: Entrepreneurship, Research, Practical Research'
                ],
                'requirements' => 'Grade 11 Certificate, Birth Certificate, 2x2 ID Picture',
                'duration' => '1 Year',
                'is_active' => true,
                'display_order' => 6,
            ],
            [
                'program_type' => 'special',
                'grade_level' => null,
                'program_name' => 'Alternative Learning System (ALS)',
                'description' => 'Alternative learning program for out-of-school youth and adults.',
                'subjects' => [
                    'Basic Literacy', 'Functional Literacy', 'Elementary Level', 'Secondary Level'
                ],
                'requirements' => 'Age 15 and above, Basic literacy test',
                'duration' => 'Flexible',
                'is_active' => true,
                'display_order' => 7,
            ],
            [
                'program_type' => 'special',
                'grade_level' => null,
                'program_name' => 'Special Education Program',
                'description' => 'Specialized program for students with special needs.',
                'subjects' => [
                    'Adapted Core Subjects', 'Life Skills', 'Vocational Training', 'Therapy Sessions'
                ],
                'requirements' => 'Medical Certificate, Psychological Assessment, Parent/Guardian Consent',
                'duration' => 'Flexible',
                'is_active' => true,
                'display_order' => 8,
            ],
        ];

        foreach ($programs as $program) {
            AcademicProgram::create($program);
        }

        $this->command->info('Academic programs seeded successfully!');
    }
}
