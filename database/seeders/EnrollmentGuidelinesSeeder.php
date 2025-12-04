<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EnrollmentInfo;
use App\Models\EnrollmentCategory;
use App\Models\EnrollmentRequirement;
use App\Models\EnrollmentProcess;
use App\Models\SpecialProgram;
use App\Models\SpecialProgramRequirement;
use App\Models\SpecialProgramProcess;

class EnrollmentGuidelinesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        EnrollmentInfo::truncate();
        EnrollmentCategory::truncate();
        EnrollmentRequirement::truncate();
        EnrollmentProcess::truncate();
        SpecialProgram::truncate();
        SpecialProgramRequirement::truncate();
        SpecialProgramProcess::truncate();

        // Seed Enrollment Info Cards
        $infoCards = [
            [
                'card_type' => 'enrollment_period',
                'title' => 'Enrollment Period',
                'content' => 'Academic Year 2024-2025',
                'details' => 'March 1 - May 31, 2024',
                'icon' => 'Calendar',
                'color' => 'text-blue-600',
                'display_order' => 1,
            ],
            [
                'card_type' => 'grade_levels',
                'title' => 'Grade Levels',
                'content' => 'Junior & Senior High',
                'details' => 'Grades 7-12 + ALS',
                'icon' => 'Users',
                'color' => 'text-green-600',
                'display_order' => 2,
            ],
            [
                'card_type' => 'programs_offered',
                'title' => 'Programs Offered',
                'content' => 'Academic Tracks',
                'details' => 'STEM, ABM, HUMSS, GAS, TVL',
                'icon' => 'Award',
                'color' => 'text-purple-600',
                'display_order' => 3,
            ],
            [
                'card_type' => 'special_programs',
                'title' => 'Special Programs',
                'content' => 'Alternative Learning',
                'details' => 'ALS Program Available',
                'icon' => 'Globe',
                'color' => 'text-teal-600',
                'display_order' => 4,
            ],
        ];

        foreach ($infoCards as $card) {
            EnrollmentInfo::create($card);
        }

        // Seed Enrollment Categories
        $categories = [
            [
                'category_id' => 'junior-high',
                'name' => 'Junior High School (Grades 7-10)',
                'description' => 'Four-year junior high school program with comprehensive curriculum',
                'icon' => 'GraduationCap',
                'color_gradient' => 'from-blue-500 to-blue-600',
                'bg_color' => 'bg-blue-50',
                'border_color' => 'border-blue-200',
                'notes' => 'Grade 7: Most popular entry point for new students. Grades 8-10: Transferee students only',
                'display_order' => 1,
            ],
            [
                'category_id' => 'senior-high',
                'name' => 'Senior High School (Grades 11-12)',
                'description' => 'Two-year senior high school with specialized tracks and career preparation',
                'icon' => 'Brain',
                'color_gradient' => 'from-indigo-500 to-indigo-600',
                'bg_color' => 'bg-indigo-50',
                'border_color' => 'border-indigo-200',
                'notes' => 'Grade 11: Track selection required (STEM, ABM, HUMSS, GAS, TVL). Grade 12: Final year before graduation',
                'display_order' => 2,
            ],
        ];

        foreach ($categories as $category) {
            EnrollmentCategory::create($category);
        }

        // Seed Junior High Requirements
        $juniorHighRequirements = [
            'PSA Birth Certificate (Original + 2 photocopies)',
            'Report Card (SF9) from previous grade level (Original + 2 photocopies)',
            'Certificate of Good Moral Character',
            '2x2 ID Pictures (3 copies, white background)',
            'Medical Certificate (from any licensed physician)',
            'Parent/Guardian\'s Valid ID (2 photocopies)',
            'Certificate of Completion (Elementary) - For Grade 7 only',
            'Transfer Credential (Original + 2 photocopies) - For Grades 8-10 only',
        ];

        foreach ($juniorHighRequirements as $index => $requirement) {
            EnrollmentRequirement::create([
                'category_id' => 'junior-high',
                'requirement_text' => $requirement,
                'display_order' => $index + 1,
            ]);
        }

        // Seed Junior High Processes
        $juniorHighProcesses = [
            'Submit all required documents',
            'Academic assessment and interview (No entrance exam for Grade 7)',
            'Student and parent interview',
            'Parent/Guardian orientation (Grade 7)',
            'Enrollment completion and class assignment',
        ];

        foreach ($juniorHighProcesses as $index => $process) {
            EnrollmentProcess::create([
                'category_id' => 'junior-high',
                'step_text' => $process,
                'step_number' => $index + 1,
            ]);
        }

        // Seed Senior High Requirements
        $seniorHighRequirements = [
            'PSA Birth Certificate (Original + 2 photocopies)',
            'Report Card (SF9) from previous grade level (Original + 2 photocopies)',
            'Certificate of Good Moral Character',
            '2x2 ID Pictures (3 copies, white background)',
            'Medical Certificate (from any licensed physician)',
            'Parent/Guardian\'s Valid ID (2 photocopies)',
            'Certificate of Completion (Junior High School) - For Grade 11 only',
            'Track Preference Form (STEM, ABM, HUMSS, GAS, TVL) - For Grade 11 only',
            'Transfer Credential (Original + 2 photocopies) - For Grade 12 only',
        ];

        foreach ($seniorHighRequirements as $index => $requirement) {
            EnrollmentRequirement::create([
                'category_id' => 'senior-high',
                'requirement_text' => $requirement,
                'display_order' => $index + 1,
            ]);
        }

        // Seed Senior High Processes
        $seniorHighProcesses = [
            'Submit all required documents',
            'Track assessment and counseling (Grade 11)',
            'Student and parent interview',
            'Track selection and confirmation (Grade 11)',
            'Enrollment completion and class assignment',
        ];

        foreach ($seniorHighProcesses as $index => $process) {
            EnrollmentProcess::create([
                'category_id' => 'senior-high',
                'step_text' => $process,
                'step_number' => $index + 1,
            ]);
        }

        // Seed Special Programs
        $specialPrograms = [
            [
                'program_id' => 'als',
                'name' => 'Alternative Learning System (ALS)',
                'description' => 'Flexible learning program for out-of-school youth and adults',
                'icon' => 'Globe',
                'color_gradient' => 'from-teal-500 to-teal-600',
                'bg_color' => 'bg-teal-50',
                'border_color' => 'border-teal-200',
                'notes' => 'Self-paced learning with flexible schedule - perfect for working students',
                'features' => [
                    'Flexible learning schedule',
                    'Competency-based curriculum',
                    'Accreditation and Equivalency (A&E) Test preparation',
                    'Life skills integration',
                    'Community-based learning',
                ],
                'display_order' => 1,
            ],
            [
                'program_id' => 'sped',
                'name' => 'Special Education Program (SPED)',
                'description' => 'Future program - To be announced for upcoming academic years',
                'icon' => 'Brain',
                'color_gradient' => 'from-gray-400 to-gray-500',
                'bg_color' => 'bg-gray-50',
                'border_color' => 'border-gray-300',
                'notes' => 'This program is currently under development and will be available in future academic years. Stay tuned for announcements!',
                'features' => [
                    'Program under development',
                    'Comprehensive planning in progress',
                    'Faculty training scheduled',
                    'Facility preparation ongoing',
                    'Community consultation planned',
                ],
                'display_order' => 2,
            ],
        ];

        foreach ($specialPrograms as $program) {
            SpecialProgram::create($program);
        }

        // Seed ALS Requirements
        $alsRequirements = [
            'PSA Birth Certificate (Original + 2 photocopies)',
            'Certificate of Good Moral Character',
            '2x2 ID Pictures (3 copies, white background)',
            'Medical Certificate (from any licensed physician)',
            'Parent/Guardian\'s Valid ID (2 photocopies)',
            'ALS Registration Form',
            'Previous school records (if any)',
        ];

        foreach ($alsRequirements as $index => $requirement) {
            SpecialProgramRequirement::create([
                'program_id' => 'als',
                'requirement_text' => $requirement,
                'display_order' => $index + 1,
            ]);
        }

        // Seed ALS Processes
        $alsProcesses = [
            'Submit all required documents',
            'ALS assessment and interview',
            'Learning plan development',
            'Enrollment completion and schedule assignment',
        ];

        foreach ($alsProcesses as $index => $process) {
            SpecialProgramProcess::create([
                'program_id' => 'als',
                'step_text' => $process,
                'step_number' => $index + 1,
            ]);
        }

        // Seed SPED Requirements (Future Program)
        $spedRequirements = [
            'Program currently under development',
            'Requirements will be announced soon',
            'Stay tuned for official updates',
            'Contact school for more information',
            'Expected launch: Future academic year',
        ];

        foreach ($spedRequirements as $index => $requirement) {
            SpecialProgramRequirement::create([
                'program_id' => 'sped',
                'requirement_text' => $requirement,
                'display_order' => $index + 1,
            ]);
        }

        // Seed SPED Processes (Future Program)
        $spedProcesses = [
            'Program development in progress',
            'Faculty training and preparation',
            'Facility setup and equipment installation',
            'Official announcement and enrollment opening',
        ];

        foreach ($spedProcesses as $index => $process) {
            SpecialProgramProcess::create([
                'program_id' => 'sped',
                'step_text' => $process,
                'step_number' => $index + 1,
            ]);
        }
    }
}
