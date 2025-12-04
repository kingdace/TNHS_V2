<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AcademicProgram;

class ALSAcademicProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Delete existing ALS program if it exists
        AcademicProgram::where('program_name', 'Alternative Learning System (ALS)')
            ->where('program_type', 'special')
            ->delete();

        // Create ALS program with rich content structure
        AcademicProgram::create([
            'program_type' => 'special',
            'grade_level' => null,
            'program_name' => 'Alternative Learning System (ALS)',
            'description' => 'Flexible learning program for out-of-school youth and adults who want to continue their education.',
            'subjects' => [
                'Basic Literacy',
                'Functional Literacy',
                'Elementary Level',
                'Secondary Level'
            ],
            'requirements' => 'Age 18 and above, Educational background verification',
            'duration' => 'Flexible schedule',
            'is_active' => true,
            'display_order' => 7,

            // Rich content fields for dynamic system
            'page_content' => [
                'header_title' => 'TAFT NATIONAL HIGH SCHOOL ALS SHS',
                'main_description' => 'The Alternative Learning System (ALS) is a flexible learning program that provides opportunities for out-of-school youth and adults to continue their education through various learning modalities.',
                'section_titles' => [
                    'qualifications' => 'QUALIFICATIONS',
                    'requirements' => 'REQUIREMENTS',
                    'contact' => 'Contact Information',
                    'enrollment' => 'Enrollment Information'
                ],
                'call_to_action' => 'Ready to Join Our Alternative Learning System?',
                'cta_description' => 'Contact our academic department to learn more about the ALS program, enrollment process, and flexible learning schedules.'
            ],

            // Qualifications (using program_benefits structure)
            'program_benefits' => [
                [
                    'title' => 'Age Requirement',
                    'description' => 'Must be 18 years old',
                    'icon' => '👤',
                    'color' => 'blue'
                ],
                [
                    'title' => 'Educational Background',
                    'description' => 'ALS JHS Passer / Grade 10 Completer',
                    'icon' => '📚',
                    'color' => 'blue'
                ],
                [
                    'title' => 'Alternative Path',
                    'description' => 'Old Curriculum Graduate (4th Year High School)',
                    'icon' => '🎓',
                    'color' => 'blue'
                ]
            ],

            // Requirements (using admission_requirements structure)
            'admission_requirements' => [
                'documents' => [
                    ['id' => 1, 'text' => 'PSA Birth Certificate'],
                    ['id' => 2, 'text' => 'Report Card / A & E Certificate'],
                    ['id' => 3, 'text' => 'ALS Enrollment Form']
                ],
                'contact_info' => [
                    ['id' => 1, 'text' => '+639505358285', 'type' => 'phone'],
                    ['id' => 2, 'text' => 'Nueva Ext. Brgy. Taft, Surigao City', 'type' => 'address']
                ]
            ],

            // Additional Features (using why_choose_features)
            'why_choose_features' => [
                ['text' => 'Flexible learning schedule', 'color' => 'green'],
                ['text' => 'Self-paced learning approach', 'color' => 'green'],
                ['text' => 'Alternative pathway to education', 'color' => 'blue'],
                ['text' => 'Experienced ALS facilitators', 'color' => 'blue'],
                ['text' => 'Modular learning materials', 'color' => 'green'],
                ['text' => 'Community-based learning centers', 'color' => 'blue']
            ]
        ]);

        $this->command->info('ALS Academic Program seeded successfully with rich content structure.');
    }
}
