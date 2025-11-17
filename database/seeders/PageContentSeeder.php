<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PageContent;
use App\Models\DownloadFile;
use App\Models\ExternalLink;
use App\Models\StaffProfile;

class PageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Home Page Content
        $homeContent = [
            [
                'page_name' => 'home',
                'section_name' => 'hero',
                'content_type' => 'hero_section',
                'content_data' => json_encode([
                    'title' => 'Welcome to Taft National High School',
                    'subtitle' => 'Moving forward with strength, growth, and resilience',
                    'description' => 'Empowering students with quality education, fostering academic excellence, and building character for a brighter future in Surigao City.',
                    'cta_text' => 'Explore Our Programs',
                    'cta_link' => '/academics',
                    'background_image' => '/images/BG1.jpg'
                ]),
                'display_order' => 1,
                'is_active' => true,
                'is_featured' => true
            ],
            [
                'page_name' => 'home',
                'section_name' => 'mission',
                'content_type' => 'text_content',
                'content_data' => json_encode([
                    'title' => 'PASEO. VERDE. STORM.',
                    'description' => 'Our core values that guide us in providing quality education and building character for our students.'
                ]),
                'display_order' => 2,
                'is_active' => true,
                'is_featured' => false
            ],
            [
                'page_name' => 'home',
                'section_name' => 'features',
                'content_type' => 'feature_list',
                'content_data' => json_encode([
                    'features' => [
                        [
                            'title' => 'Academic Excellence',
                            'description' => 'Comprehensive K-12 curriculum designed to prepare students for higher education and career success.',
                            'icon' => 'graduation-cap'
                        ],
                        [
                            'title' => 'Quality Education',
                            'description' => 'Dedicated teachers and modern facilities ensuring the highest standards of learning.',
                            'icon' => 'book-open'
                        ],
                        [
                            'title' => 'Student Support',
                            'description' => 'Holistic approach to student development including guidance and counseling services.',
                            'icon' => 'users'
                        ],
                        [
                            'title' => 'Community Engagement',
                            'description' => 'Strong partnerships with parents and community for student success.',
                            'icon' => 'heart'
                        ]
                    ]
                ]),
                'display_order' => 3,
                'is_active' => true,
                'is_featured' => false
            ],
            [
                'page_name' => 'home',
                'section_name' => 'statistics',
                'content_type' => 'statistics',
                'content_data' => json_encode([
                    'stats' => [
                        ['label' => 'Students', 'value' => '1,200+', 'icon' => 'users'],
                        ['label' => 'Faculty', 'value' => '45+', 'icon' => 'graduation-cap'],
                        ['label' => 'Years of Excellence', 'value' => '21+', 'icon' => 'award'],
                        ['label' => 'Programs', 'value' => '7+', 'icon' => 'book-open']
                    ]
                ]),
                'display_order' => 4,
                'is_active' => true,
                'is_featured' => false
            ],
            [
                'page_name' => 'home',
                'section_name' => 'application_forms',
                'content_type' => 'form_list',
                'content_data' => json_encode([
                    'title' => 'Online Application Forms',
                    'description' => 'Access important forms for enrollment and school services',
                    'forms' => [
                        [
                            'name' => 'Enrollment Application Form',
                            'description' => 'For new students enrolling in Grades 7-12',
                            'type' => 'PDF',
                            'size' => '245 KB'
                        ],
                        [
                            'name' => 'Transfer Credential Form',
                            'description' => 'For students transferring from other schools',
                            'type' => 'PDF',
                            'size' => '189 KB'
                        ],
                        [
                            'name' => 'Good Moral Character Certificate',
                            'description' => 'Required certificate for enrollment',
                            'type' => 'PDF',
                            'size' => '156 KB'
                        ],
                        [
                            'name' => 'Parent/Guardian Consent Form',
                            'description' => 'For various school activities and programs',
                            'type' => 'PDF',
                            'size' => '198 KB'
                        ],
                        [
                            'name' => 'Scholarship Application Form',
                            'description' => 'For financial assistance programs',
                            'type' => 'PDF',
                            'size' => '167 KB'
                        ],
                        [
                            'name' => 'Student ID Application Form',
                            'description' => 'For school identification card',
                            'type' => 'PDF',
                            'size' => '134 KB'
                        ]
                    ]
                ]),
                'display_order' => 5,
                'is_active' => true,
                'is_featured' => false
            ]
        ];

        foreach ($homeContent as $content) {
            PageContent::create($content);
        }

        // Sample Download Files
        $downloadFiles = [
            [
                'name' => 'Enrollment Requirements 2024-2025',
                'description' => 'Complete list of requirements for enrollment',
                'file_path' => '/downloads/enrollment-requirements-2024.pdf',
                'file_type' => 'PDF',
                'file_size' => '2.3 MB',
                'category' => 'forms',
                'download_count' => 245,
                'is_active' => true,
                'display_order' => 1
            ],
            [
                'name' => 'Academic Calendar 2024-2025',
                'description' => 'Official academic calendar with important dates',
                'file_path' => '/downloads/academic-calendar-2024.pdf',
                'file_type' => 'PDF',
                'file_size' => '1.8 MB',
                'category' => 'academic',
                'download_count' => 189,
                'is_active' => true,
                'display_order' => 2
            ],
            [
                'name' => 'Student Handbook',
                'description' => 'Comprehensive guide for students',
                'file_path' => '/downloads/student-handbook-2024.pdf',
                'file_type' => 'PDF',
                'file_size' => '4.7 MB',
                'category' => 'handbooks',
                'download_count' => 156,
                'is_active' => true,
                'display_order' => 3
            ]
        ];

        foreach ($downloadFiles as $file) {
            DownloadFile::create($file);
        }

        // Sample External Links
        $externalLinks = [
            [
                'title' => 'Department of Education (DepEd)',
                'description' => 'Official website of the Department of Education Philippines',
                'url' => 'https://www.deped.gov.ph',
                'category' => 'government',
                'icon' => 'globe',
                'color' => 'blue',
                'is_active' => true,
                'display_order' => 1,
                'click_count' => 0
            ],
            [
                'title' => 'DepEd Learning Resources Portal',
                'description' => 'Access to learning materials and resources',
                'url' => 'https://lrmds.deped.gov.ph',
                'category' => 'education',
                'icon' => 'book-open',
                'color' => 'green',
                'is_active' => true,
                'display_order' => 2,
                'click_count' => 0
            ],
            [
                'title' => 'K-12 Learning Portal',
                'description' => 'Comprehensive K-12 education resources and information',
                'url' => 'https://www.k12philippines.com',
                'category' => 'education',
                'icon' => 'graduation-cap',
                'color' => 'purple',
                'is_active' => true,
                'display_order' => 3,
                'click_count' => 0
            ]
        ];

        foreach ($externalLinks as $link) {
            ExternalLink::create($link);
        }

        // Sample Staff Profiles
        $staffProfiles = [
            [
                'user_id' => null,
                'staff_type' => 'principal',
                'full_name' => 'Dr. Manuel B. Dayondon',
                'position' => 'School Principal IV',
                'department' => 'Administration',
                'education' => 'Ph.D. in Educational Management',
                'experience' => '15+ years in educational leadership',
                'achievements' => 'Former Assistant Principal of Taft NHS, Led 5+ schools with excellence, Graduate school instructor at SPUS, Regional awardee for educational leadership',
                'profile_image' => '/images/Principal.jpg',
                'contact_info' => json_encode([
                    'email' => 'principal@taftnhs.edu.ph',
                    'phone' => '(055) 123-4567',
                    'office' => "Principal's Office, Main Building"
                ]),
                'is_active' => true,
                'display_order' => 1
            ],
            [
                'user_id' => null,
                'staff_type' => 'assistant_principal',
                'full_name' => 'Mrs. Mary Ann E. Gubaton',
                'position' => 'Assistant Principal - Junior High School',
                'department' => 'Academic Affairs',
                'education' => 'Master of Arts in Education Management',
                'experience' => '15+ years in educational leadership',
                'achievements' => 'Specializes in curriculum development, Former Department Head, National trainer for K-12 implementation, Published researcher in education',
                'profile_image' => '/images/ASSISTANT1.jpg',
                'contact_info' => json_encode([
                    'email' => 'm.gubaton@taftnhs.edu.ph',
                    'phone' => '+63 912 345 6789',
                    'office' => "Assistant Principal's Office, Main Building"
                ]),
                'is_active' => true,
                'display_order' => 2
            ]
        ];

        foreach ($staffProfiles as $profile) {
            StaffProfile::create($profile);
        }
    }
}
