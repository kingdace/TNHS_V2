<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StaffProfile;

class ComprehensiveStaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing records (except principal which should be managed separately)
        StaffProfile::whereIn('staff_type', ['assistant_principal', 'teacher', 'admin', 'support'])->delete();

        $this->seedAssistantPrincipals();
        $this->seedTeachingStaffWithGradeLevels();
        $this->seedAdministrativeStaff();
        $this->seedSupportStaff();

        $this->command->info('Enhanced staff profiles with grade levels seeded successfully!');
    }

    private function seedAssistantPrincipals()
    {
        $assistantPrincipals = [
            [
                'staff_type' => 'assistant_principal',
                'full_name' => 'Mrs. Mary Ann E. Gubaton',
                'position' => 'Assistant Principal - Junior High School',
                'department' => 'Junior High School',
                'education' => 'Master of Arts in Education Management',
                'experience' => '15+ Years in Educational Leadership',
                'achievements' => 'Known for her firm leadership and motherly presence that brings comfort and calm to both students and teachers. Her nurturing approach fosters a culture of support, discipline, and mutual respect within the school.',
                'profile_image' => 'staff-profiles/QJhleIOLEShgPdxCVsMSh2mK4a5IGOzfWBR8Vu9C.jpg',
                'position_level' => 2,
                'is_department_head' => true,
                'contact_info' => [
                    'email' => 'm.gubaton@tnhs.edu.ph',
                    'phone' => '+63 912 345 6789',
                    'specializations' => ['Curriculum Development', 'Student Mentorship', 'Team Leadership', 'Crisis Management']
                ],
                'is_active' => true,
                'display_order' => 1,
            ],
            [
                'staff_type' => 'assistant_principal',
                'full_name' => 'Dr. Maria Santos',
                'position' => 'Assistant Principal - Senior High School',
                'department' => 'Senior High School',
                'education' => 'Doctor of Philosophy in Educational Leadership',
                'experience' => '18+ Years in Educational Administration',
                'achievements' => 'Brings innovative leadership and strategic vision to our Senior High School program. Committed to preparing students for college and career readiness through comprehensive academic and extracurricular programs.',
                'profile_image' => 'staff-profiles/rU2jkSajVTWw1l7QkhlYJDT8pvm0G0sWkDf2QqWI.jpg',
                'position_level' => 2,
                'is_department_head' => true,
                'contact_info' => [
                    'email' => 'm.santos@tnhs.edu.ph',
                    'phone' => '+63 912 345 6790',
                    'specializations' => ['Strategic Planning', 'Career Guidance', 'Innovation Leader', 'College Readiness']
                ],
                'is_active' => true,
                'display_order' => 2,
            ],
        ];

        foreach ($assistantPrincipals as $assistant) {
            StaffProfile::create($assistant);
        }

        $this->command->info('Assistant Principals seeded: ' . count($assistantPrincipals));
    }

    private function seedTeachingStaffWithGradeLevels()
    {
        $teachers = [
            // GRADE 7 TEACHERS
            [
                'staff_type' => 'teacher',
                'full_name' => 'Ms. Ana Marie Cruz',
                'position' => 'Grade 7 Mathematics Teacher',
                'department' => 'Mathematics Department',
                'subject_specialization' => 'Mathematics',
                'grade_levels' => ['7'],
                'education' => 'Bachelor of Science in Mathematics Education',
                'experience' => '8 Years Teaching Experience',
                'position_level' => 4,
                'contact_info' => [
                    'email' => 'a.cruz@tnhs.edu.ph',
                    'phone' => '+63 912 345 6801'
                ],
                'is_active' => true,
                'display_order' => 1,
            ],
            [
                'staff_type' => 'teacher',
                'full_name' => 'Mr. Jose Rizal Dela Cruz',
                'position' => 'Grade 7 English Teacher',
                'department' => 'English Department',
                'subject_specialization' => 'English',
                'grade_levels' => ['7'],
                'education' => 'Bachelor of Arts in English Education',
                'experience' => '10 Years Teaching Experience',
                'position_level' => 4,
                'contact_info' => [
                    'email' => 'j.delacruz@tnhs.edu.ph',
                    'phone' => '+63 912 345 6802'
                ],
                'is_active' => true,
                'display_order' => 2,
            ],
            [
                'staff_type' => 'teacher',
                'full_name' => 'Mrs. Maria Luz Santos',
                'position' => 'Grade 7 Science Teacher',
                'department' => 'Science Department',
                'subject_specialization' => 'General Science',
                'grade_levels' => ['7'],
                'education' => 'Bachelor of Science in Biology Education',
                'experience' => '12 Years Teaching Experience',
                'position_level' => 4,
                'contact_info' => [
                    'email' => 'm.santos@tnhs.edu.ph',
                    'phone' => '+63 912 345 6803'
                ],
                'is_active' => true,
                'display_order' => 3,
            ],
            [
                'staff_type' => 'teacher',
                'full_name' => 'Ms. Carmen Reyes',
                'position' => 'Grade 7 Filipino Teacher',
                'department' => 'Filipino Department',
                'subject_specialization' => 'Filipino',
                'grade_levels' => ['7'],
                'education' => 'Bachelor of Arts in Filipino Education',
                'experience' => '9 Years Teaching Experience',
                'position_level' => 4,
                'contact_info' => [
                    'email' => 'c.reyes@tnhs.edu.ph',
                    'phone' => '+63 912 345 6804'
                ],
                'is_active' => true,
                'display_order' => 4,
            ],

            // GRADE 8 TEACHERS
            [
                'staff_type' => 'teacher',
                'full_name' => 'Mr. Roberto Garcia',
                'position' => 'Grade 8 Mathematics Teacher',
                'department' => 'Mathematics Department',
                'subject_specialization' => 'Mathematics',
                'grade_levels' => ['8'],
                'education' => 'Bachelor of Science in Mathematics Education',
                'experience' => '11 Years Teaching Experience',
                'position_level' => 4,
                'is_department_head' => true,
                'contact_info' => [
                    'email' => 'r.garcia@tnhs.edu.ph',
                    'phone' => '+63 912 345 6805'
                ],
                'is_active' => true,
                'display_order' => 5,
            ],
            [
                'staff_type' => 'teacher',
                'full_name' => 'Ms. Elena Villanueva',
                'position' => 'Grade 8 English Teacher',
                'department' => 'English Department',
                'subject_specialization' => 'English',
                'grade_levels' => ['8'],
                'education' => 'Bachelor of Arts in English Education',
                'experience' => '7 Years Teaching Experience',
                'position_level' => 4,
                'contact_info' => [
                    'email' => 'e.villanueva@tnhs.edu.ph',
                    'phone' => '+63 912 345 6806'
                ],
                'is_active' => true,
                'display_order' => 6,
            ],

            // GRADE 9 TEACHERS
            [
                'staff_type' => 'teacher',
                'full_name' => 'Mr. Antonio Mendoza',
                'position' => 'Grade 9 Algebra Teacher',
                'department' => 'Mathematics Department',
                'subject_specialization' => 'Algebra',
                'grade_levels' => ['9'],
                'education' => 'Bachelor of Science in Mathematics Education',
                'experience' => '13 Years Teaching Experience',
                'position_level' => 4,
                'contact_info' => [
                    'email' => 'a.mendoza@tnhs.edu.ph',
                    'phone' => '+63 912 345 6807'
                ],
                'is_active' => true,
                'display_order' => 7,
            ],
            [
                'staff_type' => 'teacher',
                'full_name' => 'Dr. Patricia Fernandez',
                'position' => 'Grade 9 Chemistry Teacher',
                'department' => 'Science Department',
                'subject_specialization' => 'Chemistry',
                'grade_levels' => ['9'],
                'education' => 'Doctor of Philosophy in Chemistry Education',
                'experience' => '15 Years Teaching Experience',
                'position_level' => 4,
                'is_department_head' => true,
                'contact_info' => [
                    'email' => 'p.fernandez@tnhs.edu.ph',
                    'phone' => '+63 912 345 6808'
                ],
                'is_active' => true,
                'display_order' => 8,
            ],

            // GRADE 10 TEACHERS
            [
                'staff_type' => 'teacher',
                'full_name' => 'Ms. Isabella Rodriguez',
                'position' => 'Grade 10 Geometry Teacher',
                'department' => 'Mathematics Department',
                'subject_specialization' => 'Geometry',
                'grade_levels' => ['10'],
                'education' => 'Bachelor of Science in Mathematics Education',
                'experience' => '9 Years Teaching Experience',
                'position_level' => 4,
                'contact_info' => [
                    'email' => 'i.rodriguez@tnhs.edu.ph',
                    'phone' => '+63 912 345 6809'
                ],
                'is_active' => true,
                'display_order' => 9,
            ],
            [
                'staff_type' => 'teacher',
                'full_name' => 'Mr. Gabriel Torres',
                'position' => 'Grade 10 Literature Teacher',
                'department' => 'English Department',
                'subject_specialization' => 'Literature',
                'grade_levels' => ['10'],
                'education' => 'Master of Arts in English Literature',
                'experience' => '14 Years Teaching Experience',
                'position_level' => 4,
                'is_department_head' => true,
                'contact_info' => [
                    'email' => 'g.torres@tnhs.edu.ph',
                    'phone' => '+63 912 345 6810'
                ],
                'is_active' => true,
                'display_order' => 10,
            ],

            // GRADE 11 TEACHERS
            [
                'staff_type' => 'teacher',
                'full_name' => 'Ms. Sophia Morales',
                'position' => 'Grade 11 General Mathematics Teacher',
                'department' => 'Mathematics Department',
                'subject_specialization' => 'General Mathematics',
                'grade_levels' => ['11'],
                'education' => 'Bachelor of Science in Mathematics Education',
                'experience' => '6 Years Teaching Experience',
                'position_level' => 4,
                'contact_info' => [
                    'email' => 's.morales@tnhs.edu.ph',
                    'phone' => '+63 912 345 6811'
                ],
                'is_active' => true,
                'display_order' => 11,
            ],
            [
                'staff_type' => 'teacher',
                'full_name' => 'Dr. Miguel Castillo',
                'position' => 'Grade 11 Earth Science Teacher',
                'department' => 'Science Department',
                'subject_specialization' => 'Earth Science',
                'grade_levels' => ['11'],
                'education' => 'Doctor of Philosophy in Earth Science',
                'experience' => '18 Years Teaching Experience',
                'position_level' => 4,
                'contact_info' => [
                    'email' => 'm.castillo@tnhs.edu.ph',
                    'phone' => '+63 912 345 6812'
                ],
                'is_active' => true,
                'display_order' => 12,
            ],

            // GRADE 12 TEACHERS
            [
                'staff_type' => 'teacher',
                'full_name' => 'Ms. Valentina Herrera',
                'position' => 'Grade 12 Statistics Teacher',
                'department' => 'Mathematics Department',
                'subject_specialization' => 'Statistics',
                'grade_levels' => ['12'],
                'education' => 'Master of Science in Statistics',
                'experience' => '10 Years Teaching Experience',
                'position_level' => 4,
                'contact_info' => [
                    'email' => 'v.herrera@tnhs.edu.ph',
                    'phone' => '+63 912 345 6813'
                ],
                'is_active' => true,
                'display_order' => 13,
            ],
            [
                'staff_type' => 'teacher',
                'full_name' => 'Mr. Leonardo Jimenez',
                'position' => 'Grade 12 Physics Teacher',
                'department' => 'Science Department',
                'subject_specialization' => 'Physics',
                'grade_levels' => ['12'],
                'education' => 'Master of Science in Physics Education',
                'experience' => '16 Years Teaching Experience',
                'position_level' => 4,
                'contact_info' => [
                    'email' => 'l.jimenez@tnhs.edu.ph',
                    'phone' => '+63 912 345 6814'
                ],
                'is_active' => true,
                'display_order' => 14,
            ],

            // MULTI-GRADE TEACHERS
            [
                'staff_type' => 'teacher',
                'full_name' => 'Mr. Carlos Ramos',
                'position' => 'Physical Education Teacher',
                'department' => 'Physical Education Department',
                'subject_specialization' => 'Physical Education',
                'grade_levels' => ['7', '8', '9', '10', '11', '12'],
                'education' => 'Bachelor of Science in Physical Education',
                'experience' => '12 Years Teaching Experience',
                'position_level' => 4,
                'is_department_head' => true,
                'contact_info' => [
                    'email' => 'c.ramos@tnhs.edu.ph',
                    'phone' => '+63 912 345 6815'
                ],
                'is_active' => true,
                'display_order' => 15,
            ],
            [
                'staff_type' => 'teacher',
                'full_name' => 'Ms. Melody Aguilar',
                'position' => 'Music Teacher',
                'department' => 'Arts Department',
                'subject_specialization' => 'Music',
                'grade_levels' => ['7', '8', '9', '10', '11', '12'],
                'education' => 'Bachelor of Music Education',
                'experience' => '8 Years Teaching Experience',
                'position_level' => 4,
                'contact_info' => [
                    'email' => 'm.aguilar@tnhs.edu.ph',
                    'phone' => '+63 912 345 6816'
                ],
                'is_active' => true,
                'display_order' => 16,
            ],

            // ALS TEACHER
            [
                'staff_type' => 'teacher',
                'full_name' => 'Mrs. Rosa Valdez',
                'position' => 'ALS Multi-Subject Teacher',
                'department' => 'Alternative Learning System',
                'subject_specialization' => 'Multi-Subject (ALS)',
                'grade_levels' => ['ALS'],
                'education' => 'Bachelor of Elementary Education, ALS Certified',
                'experience' => '14 Years Teaching Experience (5 Years ALS)',
                'position_level' => 4,
                'is_department_head' => true,
                'contact_info' => [
                    'email' => 'r.valdez@tnhs.edu.ph',
                    'phone' => '+63 912 345 6817'
                ],
                'is_active' => true,
                'display_order' => 17,
            ],
        ];

        foreach ($teachers as $teacher) {
            StaffProfile::create($teacher);
        }

        $this->command->info('Teaching Staff seeded: ' . count($teachers));
    }

    private function seedAdministrativeStaff()
    {
        $adminStaff = [
            ['name' => 'GLENNA G. ABNE', 'position' => 'ADAS II', 'image' => 'staff-profiles/0chHqMEcAh09ByqH7J11X1jEvQ1kltxUxzxVcdTm.jpg'],
            ['name' => 'MARKY LOU B. GA', 'position' => 'ADAS III', 'image' => 'staff-profiles/1RVJlauIZoYfVQmQeoj7vZvk0JykcDjpvbS5nJbv.jpg'],
            ['name' => 'MIA MADELETTE O. MARTINEZ', 'position' => 'AO II', 'image' => 'staff-profiles/aip9CmagsKlBy8kU7fCgvNacsoqgM9D9hTmxZ16s.jpg'],
            ['name' => 'DONNA MARCHIE N. SABAND', 'position' => 'ADAS II', 'image' => 'staff-profiles/bIJaUrPP4ec1BfwET7GoU87xGWZVIUMri2jZ9kD3.jpg'],
        ];

        $displayOrder = 1;
        foreach ($adminStaff as $staff) {
            StaffProfile::create([
                'staff_type' => 'admin',
                'full_name' => $staff['name'],
                'position' => $staff['position'],
                'department' => 'Administrative Assistants',
                'education' => null,
                'experience' => null,
                'achievements' => null,
                'profile_image' => $staff['image'] ?? null,
                'contact_info' => [
                    'email' => null,
                    'phone' => null,
                ],
                'is_active' => true,
                'display_order' => $displayOrder++,
            ]);
        }

        $this->command->info('Administrative Staff seeded: ' . count($adminStaff));
    }

    private function seedSupportStaff()
    {
        $supportStaff = [
            ['name' => 'PAULO JEFF P. GEOTINA', 'position' => 'School Guard', 'image' => 'staff-profiles/Cq4L4gMeMzx7E3i0YStQhjRuPUF02COStx0sML3h.jpg'],
            ['name' => 'ELSIE PLATIL', 'position' => 'Utility', 'image' => 'staff-profiles/EreFk8o2zJguephbsUnBfN55NFVz7U2iZ8ZPYU6E.jpg'],
            ['name' => 'CRISTIAN P. GRAVEN', 'position' => 'School Guard', 'image' => 'staff-profiles/f8Cbvsu0npNi1bEsKrILuVEN3w4f4quKovQPoRxk.jpg'],
            ['name' => 'ROBERT ERIC D. DIAN', 'position' => 'Utility', 'image' => 'staff-profiles/IMvUa0YmqioKg01fy4iIaP1y0hVMikjdAL38OtZf.jpg'],
            ['name' => 'LARRY A. RIVERA', 'position' => 'School Guard', 'image' => 'staff-profiles/Lr0xAaAnOPsdFpja6FcuWTtQBld5JzFfQeFtRjoD.jpg'],
            ['name' => 'RENANTE C. SUMAYLO', 'position' => 'School Guard', 'image' => 'staff-profiles/M002OJrnOs69rEw6PHxJ9yLwDQFo6TgMS21QSZ14.jpg'],
        ];

        $displayOrder = 1;
        foreach ($supportStaff as $staff) {
            // Determine department based on position
            $department = str_contains($staff['position'], 'Guard') ? 'Security' : 'Utility and Maintenance';

            StaffProfile::create([
                'staff_type' => 'support',
                'full_name' => $staff['name'],
                'position' => $staff['position'],
                'department' => $department,
                'education' => null,
                'experience' => null,
                'achievements' => null,
                'profile_image' => $staff['image'] ?? null,
                'contact_info' => [
                    'email' => null,
                    'phone' => null,
                ],
                'is_active' => true,
                'display_order' => $displayOrder++,
            ]);
        }

        $this->command->info('Support Staff seeded: ' . count($supportStaff));
    }
}
