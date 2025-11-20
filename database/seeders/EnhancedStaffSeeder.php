<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StaffProfile;

class EnhancedStaffSeeder extends Seeder
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
                'department' => 'Junior High School Administration',
                'education' => 'Master of Arts in Education Management',
                'experience' => '15+ Years in Educational Leadership',
                'achievements' => 'Known for her firm leadership and motherly presence that brings comfort and calm to both students and teachers. Her nurturing approach fosters a culture of support, discipline, and mutual respect within the school.',
                'profile_image' => 'faculty/ASSISTANT1.jpg',
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
                'department' => 'Senior High School Administration',
                'education' => 'Doctor of Philosophy in Educational Administration',
                'experience' => '20+ Years in Educational Leadership',
                'achievements' => 'Dedicated to fostering academic excellence and student development. Expert in senior high school curriculum implementation and student guidance programs.',
                'profile_image' => 'faculty/ASSISTANT2.jpg',
                'position_level' => 2,
                'is_department_head' => true,
                'contact_info' => [
                    'email' => 'm.santos@tnhs.edu.ph',
                    'phone' => '+63 912 345 6790',
                    'specializations' => ['Senior High Curriculum', 'Academic Planning', 'Student Development', 'Quality Assurance']
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
            [
                'staff_type' => 'admin',
                'full_name' => 'Ms. Grace Perez',
                'position' => 'School Registrar',
                'department' => 'Registrar Office',
                'education' => 'Bachelor of Science in Information Management',
                'experience' => '10 Years Administrative Experience',
                'achievements' => 'Efficient management of student records and academic documentation.',
                'position_level' => 5,
                'contact_info' => [
                    'email' => 'g.perez@tnhs.edu.ph',
                    'phone' => '+63 912 345 6818'
                ],
                'is_active' => true,
                'display_order' => 1,
            ],
            [
                'staff_type' => 'admin',
                'full_name' => 'Mr. Benjamin Cruz',
                'position' => 'School Treasurer',
                'department' => 'Finance Office',
                'education' => 'Bachelor of Science in Accounting',
                'experience' => '12 Years Financial Management Experience',
                'achievements' => 'Maintains transparent and accurate financial records for the school.',
                'position_level' => 5,
                'contact_info' => [
                    'email' => 'b.cruz@tnhs.edu.ph',
                    'phone' => '+63 912 345 6819'
                ],
                'is_active' => true,
                'display_order' => 2,
            ],
            [
                'staff_type' => 'admin',
                'full_name' => 'Mrs. Linda Gonzales',
                'position' => 'Guidance Counselor',
                'department' => 'Guidance Office',
                'education' => 'Master of Arts in Guidance and Counseling',
                'experience' => '15 Years Counseling Experience',
                'achievements' => 'Dedicated to student welfare and psychological support services.',
                'position_level' => 5,
                'contact_info' => [
                    'email' => 'l.gonzales@tnhs.edu.ph',
                    'phone' => '+63 912 345 6820'
                ],
                'is_active' => true,
                'display_order' => 3,
            ],
            [
                'staff_type' => 'admin',
                'full_name' => 'Mr. Richard Flores',
                'position' => 'School Librarian',
                'department' => 'Library',
                'education' => 'Master of Library and Information Science',
                'experience' => '8 Years Library Management Experience',
                'achievements' => 'Modernized library systems and promotes reading culture among students.',
                'position_level' => 5,
                'contact_info' => [
                    'email' => 'r.flores@tnhs.edu.ph',
                    'phone' => '+63 912 345 6821'
                ],
                'is_active' => true,
                'display_order' => 4,
            ],
        ];

        foreach ($adminStaff as $admin) {
            StaffProfile::create($admin);
        }

        $this->command->info('Administrative Staff seeded: ' . count($adminStaff));
    }

    private function seedSupportStaff()
    {
        $supportStaff = [
            [
                'staff_type' => 'support',
                'full_name' => 'Mr. Eduardo Santos',
                'position' => 'Head Maintenance',
                'department' => 'Maintenance Department',
                'education' => 'Technical Vocational Education',
                'experience' => '20 Years Maintenance Experience',
                'achievements' => 'Ensures school facilities are well-maintained and safe for students and staff.',
                'position_level' => 6,
                'contact_info' => [
                    'phone' => '+63 912 345 6822'
                ],
                'is_active' => true,
                'display_order' => 1,
            ],
            [
                'staff_type' => 'support',
                'full_name' => 'Ms. Carmen Lopez',
                'position' => 'School Nurse',
                'department' => 'Health Services',
                'education' => 'Bachelor of Science in Nursing',
                'experience' => '12 Years Healthcare Experience',
                'achievements' => 'Provides essential healthcare services and health education to the school community.',
                'position_level' => 5,
                'contact_info' => [
                    'email' => 'c.lopez@tnhs.edu.ph',
                    'phone' => '+63 912 345 6823'
                ],
                'is_active' => true,
                'display_order' => 2,
            ],
            [
                'staff_type' => 'support',
                'full_name' => 'Mr. Jose Rivera',
                'position' => 'Security Guard',
                'department' => 'Security Department',
                'education' => 'High School Graduate, Security Training Certified',
                'experience' => '15 Years Security Experience',
                'achievements' => 'Maintains school security and ensures safe learning environment.',
                'position_level' => 6,
                'contact_info' => [
                    'phone' => '+63 912 345 6824'
                ],
                'is_active' => true,
                'display_order' => 3,
            ],
            [
                'staff_type' => 'support',
                'full_name' => 'Mrs. Maria Diaz',
                'position' => 'Canteen Manager',
                'department' => 'Food Services',
                'education' => 'Food Safety and Hygiene Certified',
                'experience' => '10 Years Food Service Management',
                'achievements' => 'Provides nutritious and affordable meals for students and staff.',
                'position_level' => 6,
                'contact_info' => [
                    'phone' => '+63 912 345 6825'
                ],
                'is_active' => true,
                'display_order' => 4,
            ],
            [
                'staff_type' => 'support',
                'full_name' => 'Mr. Pablo Moreno',
                'position' => 'Janitor',
                'department' => 'Maintenance Department',
                'education' => 'Elementary Graduate',
                'experience' => '8 Years Janitorial Experience',
                'achievements' => 'Keeps school premises clean and hygienic for optimal learning environment.',
                'position_level' => 6,
                'contact_info' => [
                    'phone' => '+63 912 345 6826'
                ],
                'is_active' => true,
                'display_order' => 5,
            ],
            [
                'staff_type' => 'support',
                'full_name' => 'Ms. Ana Gutierrez',
                'position' => 'Administrative Assistant',
                'department' => 'Main Office',
                'education' => 'Bachelor of Science in Office Administration',
                'experience' => '6 Years Administrative Support Experience',
                'achievements' => 'Provides efficient administrative support to school management and faculty.',
                'position_level' => 5,
                'contact_info' => [
                    'email' => 'a.gutierrez@tnhs.edu.ph',
                    'phone' => '+63 912 345 6827'
                ],
                'is_active' => true,
                'display_order' => 6,
            ],
        ];

        foreach ($supportStaff as $support) {
            StaffProfile::create($support);
        }

        $this->command->info('Support Staff seeded: ' . count($supportStaff));
    }
}
