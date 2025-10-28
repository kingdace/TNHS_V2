<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StaffProfile;
use Carbon\Carbon;

class StaffProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StaffProfile::create([
            'staff_type' => 'principal',
            'full_name' => 'Dr. Maria Santos',
            'position' => 'Principal',
            'department' => 'School Administration',
            'education' => 'Doctor of Education (Ed.D.) in Educational Leadership, Master of Arts in Education, Bachelor of Science in Secondary Education',
            'experience' => '25 years in educational leadership, 15 years as Principal, Former Assistant Principal and Department Head',
            'achievements' => 'Outstanding Principal Award 2023, Regional Education Excellence Award, Published Author in Educational Leadership',
            'profile_image' => '/images/staff/principal-maria-santos.jpg',
            'contact_info' => [
                'email' => 'principal@tnhs.edu.ph',
                'phone' => '+63 912 345 6789',
                'address' => 'Principal\'s Office, Taft National High School'
            ],
            'is_active' => true,
            'display_order' => 1,
        ]);

        StaffProfile::create([
            'staff_type' => 'assistant_principal',
            'full_name' => 'Mr. Juan Dela Cruz',
            'position' => 'Assistant Principal',
            'department' => 'Academic Affairs',
            'education' => 'Master of Arts in Educational Management, Bachelor of Science in Mathematics Education',
            'experience' => '20 years in education, 8 years as Assistant Principal, Former Mathematics Department Head',
            'achievements' => 'Excellence in Academic Leadership Award, Mathematics Education Innovation Award',
            'profile_image' => '/images/staff/assistant-principal-juan-dela-cruz.jpg',
            'contact_info' => [
                'email' => 'assistant.principal@tnhs.edu.ph',
                'phone' => '+63 912 345 6790',
                'address' => 'Assistant Principal\'s Office, Taft National High School'
            ],
            'is_active' => true,
            'display_order' => 2,
        ]);

        StaffProfile::create([
            'staff_type' => 'teacher',
            'full_name' => 'Ms. Ana Rodriguez',
            'position' => 'Head Teacher',
            'department' => 'Student Affairs',
            'education' => 'Master of Arts in Guidance and Counseling, Bachelor of Science in Psychology',
            'experience' => '18 years in education, 10 years as Head Teacher, Specialized in Student Development',
            'achievements' => 'Student Development Excellence Award, Guidance Counselor of the Year 2022',
            'profile_image' => '/images/staff/head-teacher-ana-rodriguez.jpg',
            'contact_info' => [
                'email' => 'head.teacher@tnhs.edu.ph',
                'phone' => '+63 912 345 6791',
                'address' => 'Student Affairs Office, Taft National High School'
            ],
            'is_active' => true,
            'display_order' => 3,
        ]);

        StaffProfile::create([
            'staff_type' => 'teacher',
            'full_name' => 'Mr. Roberto Garcia',
            'position' => 'Senior Teacher',
            'department' => 'Science Department',
            'education' => 'Master of Science in Biology, Bachelor of Science in Biology Education',
            'experience' => '15 years in science education, Specialized in Biology and Environmental Science',
            'achievements' => 'Science Teaching Excellence Award, Environmental Education Innovation Award',
            'profile_image' => '/images/staff/senior-teacher-roberto-garcia.jpg',
            'contact_info' => [
                'email' => 'roberto.garcia@tnhs.edu.ph',
                'phone' => '+63 912 345 6792',
                'address' => 'Science Laboratory, Taft National High School'
            ],
            'is_active' => true,
            'display_order' => 4,
        ]);

        StaffProfile::create([
            'staff_type' => 'teacher',
            'full_name' => 'Ms. Carmen Lopez',
            'position' => 'Senior Teacher',
            'department' => 'Mathematics Department',
            'education' => 'Master of Arts in Mathematics Education, Bachelor of Science in Mathematics',
            'experience' => '12 years in mathematics education, Specialized in Advanced Mathematics',
            'achievements' => 'Mathematics Teaching Excellence Award, Student Achievement Recognition',
            'profile_image' => '/images/staff/senior-teacher-carmen-lopez.jpg',
            'contact_info' => [
                'email' => 'carmen.lopez@tnhs.edu.ph',
                'phone' => '+63 912 345 6793',
                'address' => 'Mathematics Department, Taft National High School'
            ],
            'is_active' => true,
            'display_order' => 5,
        ]);

        StaffProfile::create([
            'staff_type' => 'admin',
            'full_name' => 'Ms. Elena Martinez',
            'position' => 'Registrar',
            'department' => 'Registrar\'s Office',
            'education' => 'Bachelor of Science in Business Administration, Certificate in Records Management',
            'experience' => '10 years in school administration, Specialized in student records and enrollment',
            'achievements' => 'Administrative Excellence Award, Records Management Innovation Award',
            'profile_image' => '/images/staff/registrar-elena-martinez.jpg',
            'contact_info' => [
                'email' => 'registrar@tnhs.edu.ph',
                'phone' => '+63 912 345 6794',
                'address' => 'Registrar\'s Office, Taft National High School'
            ],
            'is_active' => true,
            'display_order' => 6,
        ]);

        StaffProfile::create([
            'staff_type' => 'admin',
            'full_name' => 'Mr. Carlos Mendoza',
            'position' => 'Finance Officer',
            'department' => 'Finance Office',
            'education' => 'Bachelor of Science in Accountancy, Certified Public Accountant (CPA)',
            'experience' => '8 years in school finance management, Specialized in budget planning and financial reporting',
            'achievements' => 'Financial Management Excellence Award, Budget Planning Innovation Award',
            'profile_image' => '/images/staff/finance-officer-carlos-mendoza.jpg',
            'contact_info' => [
                'email' => 'finance@tnhs.edu.ph',
                'phone' => '+63 912 345 6795',
                'address' => 'Finance Office, Taft National High School'
            ],
            'is_active' => true,
            'display_order' => 7,
        ]);

        StaffProfile::create([
            'staff_type' => 'support',
            'full_name' => 'Mr. Miguel Torres',
            'position' => 'School Librarian',
            'department' => 'Library Services',
            'education' => 'Bachelor of Library and Information Science, Certificate in Digital Library Management',
            'experience' => '6 years in library services, Specialized in digital resources and information literacy',
            'achievements' => 'Library Services Excellence Award, Digital Literacy Innovation Award',
            'profile_image' => '/images/staff/librarian-miguel-torres.jpg',
            'contact_info' => [
                'email' => 'library@tnhs.edu.ph',
                'phone' => '+63 912 345 6796',
                'address' => 'School Library, Taft National High School'
            ],
            'is_active' => true,
            'display_order' => 8,
        ]);

        StaffProfile::create([
            'staff_type' => 'support',
            'full_name' => 'Ms. Rosa Santos',
            'position' => 'Guidance Counselor',
            'department' => 'Guidance Office',
            'education' => 'Master of Arts in Guidance and Counseling, Bachelor of Science in Psychology',
            'experience' => '5 years in guidance counseling, Specialized in career guidance and student counseling',
            'achievements' => 'Guidance Counseling Excellence Award, Student Support Innovation Award',
            'profile_image' => '/images/staff/guidance-counselor-rosa-santos.jpg',
            'contact_info' => [
                'email' => 'guidance@tnhs.edu.ph',
                'phone' => '+63 912 345 6797',
                'address' => 'Guidance Office, Taft National High School'
            ],
            'is_active' => true,
            'display_order' => 9,
        ]);

        StaffProfile::create([
            'staff_type' => 'support',
            'full_name' => 'Mr. Jose Reyes',
            'position' => 'IT Support Specialist',
            'department' => 'Information Technology',
            'education' => 'Bachelor of Science in Information Technology, Certificate in Network Administration',
            'experience' => '4 years in educational technology, Specialized in network management and technical support',
            'achievements' => 'IT Support Excellence Award, Technology Innovation Award',
            'profile_image' => '/images/staff/it-support-jose-reyes.jpg',
            'contact_info' => [
                'email' => 'it.support@tnhs.edu.ph',
                'phone' => '+63 912 345 6798',
                'address' => 'IT Office, Taft National High School'
            ],
            'is_active' => true,
            'display_order' => 10,
        ]);
    }
}
