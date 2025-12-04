<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AcademicProgram;

class JuniorHighAcademicProgramSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create or update Junior High School Program
        AcademicProgram::updateOrCreate(
            [
                'program_type' => 'junior_high',
                'program_name' => 'Junior High School Program'
            ],
            [
                'grade_level' => 7, // Grades 7-10, using 7 as representative
                'description' => 'Taft NHS Junior High School offers a comprehensive academic program that covers the four years of Junior High School (Grades 7-10). The curriculum features the interaction of nine subject areas designed to meet the goals of integrative and transformative education.',
                'subjects' => [
                    'Mathematics',
                    'English',
                    'Filipino',
                    'Science',
                    'Social Studies',
                    'MAPEH (Music, Arts, Physical Education, Health)',
                    'TLE (Technology and Livelihood Education)',
                    'Values Education',
                    'Computer Education'
                ],
                'requirements' => 'Complete elementary education, submit required documents, pass entrance requirements',
                'duration' => '4 years (Grades 7-10)',
                'is_active' => true,
                'display_order' => 1,
                'featured' => true,
                'banner_color' => 'blue',
                'theme_color' => 'blue',

                // Page content
                'page_content' => [
                    'header_title' => 'WHY CHOOSE TAFT NHS JUNIOR HIGH SCHOOL?',
                    'main_description' => 'Taft NHS Junior High School offers a comprehensive academic program that covers the four years of Junior High School (Grades 7-10). The curriculum features the interaction of nine subject areas designed to meet the goals of integrative and transformative education.',
                    'section_titles' => [
                        'benefits' => 'PROGRAM BENEFITS',
                        'features' => 'Why Choose Our Junior High School?',
                        'requirements' => 'Admission Requirements'
                    ]
                ],

                // Program benefits
                'program_benefits' => [
                    [
                        'id' => 1,
                        'title' => 'Excel in Core Subjects',
                        'description' => 'Master essential subjects including Mathematics, English, Filipino, Science, and Social Studies to build a strong foundation for Senior High School.',
                        'icon' => '📚',
                        'color' => 'blue'
                    ],
                    [
                        'id' => 2,
                        'title' => 'Develop Life Skills',
                        'description' => 'Participate in MAPEH, TLE, and Values Education programs that promote physical health, creativity, technical skills, and moral development.',
                        'icon' => '👤',
                        'color' => 'green'
                    ]
                ],

                // Why choose features
                'why_choose_features' => [
                    [
                        'id' => 1,
                        'text' => 'Comprehensive curriculum aligned with DepEd standards',
                        'color' => 'green'
                    ],
                    [
                        'id' => 2,
                        'text' => 'Well-rounded education covering all subject areas',
                        'color' => 'green'
                    ],
                    [
                        'id' => 3,
                        'text' => 'Holistic student development programs',
                        'color' => 'green'
                    ],
                    [
                        'id' => 4,
                        'text' => 'Experienced and dedicated teaching staff',
                        'color' => 'green'
                    ],
                    [
                        'id' => 5,
                        'text' => 'Modern facilities and learning resources',
                        'color' => 'blue'
                    ],
                    [
                        'id' => 6,
                        'text' => 'Strong foundation for Senior High School',
                        'color' => 'blue'
                    ],
                    [
                        'id' => 7,
                        'text' => 'Character formation and values education',
                        'color' => 'blue'
                    ],
                    [
                        'id' => 8,
                        'text' => 'Safe and nurturing learning environment',
                        'color' => 'blue'
                    ]
                ],

                // Admission requirements
                'admission_requirements' => [
                    'documents' => [
                        ['id' => 1, 'text' => 'Report Card (Form 138)'],
                        ['id' => 2, 'text' => 'Birth Certificate (PSA)'],
                        ['id' => 3, 'text' => 'Certificate of Good Moral Character'],
                        ['id' => 4, 'text' => '2x2 ID Photos (3 copies)'],
                        ['id' => 5, 'text' => 'Medical Certificate'],
                        ['id' => 6, 'text' => 'Barangay Clearance']
                    ],
                    'schedule' => [
                        ['id' => 1, 'text' => 'April - May: Early Enrollment Period'],
                        ['id' => 2, 'text' => 'June: Regular Enrollment Period'],
                        ['id' => 3, 'text' => 'July: Late Enrollment (with penalty)'],
                        ['id' => 4, 'text' => 'Office Hours: Monday - Friday, 8:00 AM - 4:00 PM'],
                        ['id' => 5, 'text' => 'Location: School Registrar Office']
                    ]
                ],

                // Images
                'images' => [
                    'logo' => '/images/JLOGO.jpg',
                    'academic_excellence' => '/images/ACAD.jpg',
                    'student_life' => '/images/J1.jpg'
                ],

                // Curriculum highlights
                'curriculum_highlights' => [
                    [
                        'subject' => 'Mathematics',
                        'description' => 'Algebra, Geometry, Statistics and Probability'
                    ],
                    [
                        'subject' => 'Science',
                        'description' => 'Biology, Chemistry, Physics, Earth Science'
                    ],
                    [
                        'subject' => 'English',
                        'description' => 'Literature, Grammar, Communication Skills'
                    ],
                    [
                        'subject' => 'Filipino',
                        'description' => 'Wika at Pagbasa, Panitikan, Komunikasyon'
                    ]
                ],

                // SEO metadata
                'meta_title' => 'Junior High School Program - Taft National High School',
                'meta_description' => 'Comprehensive Junior High School program (Grades 7-10) at Taft NHS. Quality education with experienced teachers, modern facilities, and holistic student development.',
                'meta_keywords' => [
                    'junior high school',
                    'grades 7-10',
                    'taft national high school',
                    'secondary education',
                    'academic program',
                    'deped curriculum'
                ]
            ]
        );
    }
}
