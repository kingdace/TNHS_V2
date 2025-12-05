<?php

namespace Database\Seeders;

use App\Models\SeniorHighStrand;
use Illuminate\Database\Seeder;

class SeniorHighStrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        SeniorHighStrand::truncate();

        // STEM Strand
        SeniorHighStrand::create([
            'strand_id' => 'stem',
            'title' => 'Science, Technology, Engineering & Mathematics',
            'short_title' => 'STEM',
            'header_title' => '🧬 Innovate, Discover, Transform - STEM at Taft NHS',
            'description' => 'Advanced program focusing on science, technology, engineering, and mathematics. Prepare for college and university education in STEM fields.',
            'features' => [
                'Advanced Mathematics & Science',
                'Research & Development Projects',
                'Technology Integration',
                'Engineering Design Process',
                'College Preparation',
            ],
            'color' => 'from-purple-500 to-purple-600',
            'bg_color' => 'bg-purple-50',
            'border_color' => 'border-purple-200',
            'icon' => '🧬',
            'gradient' => 'from-purple-400 via-purple-500 to-purple-600',
            'image' => '/images/STEM.jpg',
            'image_path' => '/images/STEM.jpg',
            'strand_overview' => [
                ['number' => 1, 'text' => 'Biology & Life Sciences'],
                ['number' => 2, 'text' => 'Mathematics & Statistics'],
                ['number' => 3, 'text' => 'Computer Science & Technology'],
                ['number' => 4, 'text' => 'Engineering & Architecture'],
                ['number' => 5, 'text' => 'Environmental & Earth Sciences'],
                ['number' => 6, 'text' => 'STEM Education & Teaching'],
                ['number' => 7, 'text' => 'Design & Innovation'],
            ],
            'career_guide_intro' => '📋 Career Matching Guide based on your specific interests or skills within STEM. You can scan the categories below to find the ones that best describe you, then see the recommended college courses and careers that align with them:',
            'career_paths' => $this->getStemCareerPaths(),
            'is_active' => true,
            'display_order' => 1,
        ]);

        // HUMSS Strand
        SeniorHighStrand::create([
            'strand_id' => 'humss',
            'title' => 'Humanities and Social Sciences',
            'short_title' => 'HUMSS',
            'header_title' => '🌍 Understand Society, Shape the Future - HUMSS at Taft NHS',
            'description' => 'Comprehensive program in humanities and social sciences. Develop critical thinking and understanding of human behavior and society.',
            'features' => [
                'Social Sciences',
                'Humanities Studies',
                'Critical Thinking',
                'Research Skills',
                'Communication Excellence',
            ],
            'color' => 'from-blue-500 to-blue-600',
            'bg_color' => 'bg-blue-50',
            'border_color' => 'border-blue-200',
            'icon' => '🌍',
            'gradient' => 'from-pink-400 via-pink-500 to-pink-600',
            'image' => '/images/HUMMS.jpg',
            'image_path' => '/images/HUMSS.jpg',
            'strand_overview' => [
                ['number' => 1, 'text' => 'Political Science & Leadership'],
                ['number' => 2, 'text' => 'Communication & Media Studies'],
                ['number' => 3, 'text' => 'Psychology & Social Work'],
                ['number' => 4, 'text' => 'Education & Teaching'],
                ['number' => 5, 'text' => 'Arts & Creative Expression'],
            ],
            'career_guide_intro' => '📋 Career Matching Guide for HUMSS students, based on your specific interests or strengths. Each interest category includes recommended college courses and possible career paths:',
            'career_paths' => $this->getHumssCareerPaths(),
            'is_active' => true,
            'display_order' => 2,
        ]);

        // TVL Strand
        SeniorHighStrand::create([
            'strand_id' => 'tvl',
            'title' => 'Technical-Vocational-Livelihood',
            'short_title' => 'TVL',
            'header_title' => '🔧 From Circuits to Careers - CSS Begins at Taft NHS',
            'description' => 'Skills-based education with specialized strands for immediate employment and entrepreneurship opportunities.',
            'features' => [
                'ICT Strand',
                'Computer Systems Servicing',
                'Hands-on Training',
                'Industry Certification',
                'Employment Ready',
            ],
            'color' => 'from-green-500 to-green-600',
            'bg_color' => 'bg-green-50',
            'border_color' => 'border-green-200',
            'icon' => '🔧',
            'gradient' => 'from-green-400 via-green-500 to-green-600',
            'image_path' => '/images/CSS.jpg',
            'strand_overview' => [
                ['number' => 1, 'text' => 'Computer Hardware Servicing'],
                ['number' => 2, 'text' => 'Network Administration'],
                ['number' => 3, 'text' => 'Software Development'],
                ['number' => 4, 'text' => 'ICT Teaching'],
                ['number' => 5, 'text' => 'Business IT Integration'],
            ],
            'career_guide_intro' => '📋 Career Matching Guide for Computer System Servicing (CSS) graduates, based on your specific interests or technical skills. This can help you choose a college course or career path that aligns with what you\'re good at and passionate about:',
            'career_paths' => $this->getTvlCareerPaths(),
            'is_active' => true,
            'display_order' => 3,
        ]);
    }

    /**
     * Get STEM career paths data
     */
    private function getStemCareerPaths(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'You Love Biology and Living Things',
                'skills' => 'Studying plants, animals, cells, ecosystems, or human anatomy',
                'courses' => [
                    'BS Biology',
                    'BS Nursing',
                    'BS Medical Technology',
                    'BS Agriculture',
                    'BS Veterinary Medicine',
                    'BS Environmental Science',
                ],
                'careers' => [
                    'Doctor / Physician',
                    'Nurse / Healthcare Professional',
                    'Medical Technologist',
                    'Biologist / Research Scientist',
                    'Veterinarian',
                    'Environmental Scientist',
                ],
            ],
            [
                'id' => 2,
                'title' => 'You Enjoy Math and Problem-Solving',
                'skills' => 'Solving equations, analyzing data, working with numbers and patterns',
                'courses' => [
                    'BS Mathematics',
                    'BS Statistics',
                    'BS Applied Mathematics',
                    'BS Actuarial Science',
                    'BS Data Science',
                ],
                'careers' => [
                    'Data Analyst / Data Scientist',
                    'Statistician',
                    'Actuary',
                    'Financial Analyst',
                    'Operations Research Analyst',
                    'Math Teacher / Professor',
                ],
            ],
            [
                'id' => 3,
                'title' => 'You\'re Interested in Computers and Technology',
                'skills' => 'Coding, software, apps, websites, or tech gadgets',
                'courses' => [
                    'BS Computer Science',
                    'BS Information Technology',
                    'BS Computer Engineering',
                    'BS Software Engineering',
                ],
                'careers' => [
                    'Software Developer / Programmer',
                    'Web Developer',
                    'Mobile App Developer',
                    'IT Specialist / Systems Administrator',
                    'Cybersecurity Analyst',
                    'Game Developer',
                ],
            ],
            [
                'id' => 4,
                'title' => 'You Like Building and Designing Things',
                'skills' => 'Creating structures, machines, or systems; hands-on projects',
                'courses' => [
                    'BS Civil Engineering',
                    'BS Mechanical Engineering',
                    'BS Electrical Engineering',
                    'BS Architecture',
                    'BS Industrial Engineering',
                ],
                'careers' => [
                    'Civil Engineer',
                    'Mechanical Engineer',
                    'Electrical Engineer',
                    'Architect',
                    'Industrial Engineer',
                    'Construction Manager',
                ],
            ],
            [
                'id' => 5,
                'title' => 'You Care About the Environment',
                'skills' => 'Climate, conservation, sustainability, natural resources',
                'courses' => [
                    'BS Environmental Science',
                    'BS Geology',
                    'BS Forestry',
                    'BS Marine Biology',
                    'BS Environmental Engineering',
                ],
                'careers' => [
                    'Environmental Scientist',
                    'Geologist',
                    'Forester',
                    'Marine Biologist',
                    'Environmental Engineer',
                    'Conservation Scientist',
                ],
            ],
            [
                'id' => 6,
                'title' => 'You Want to Teach or Share Knowledge',
                'skills' => 'Explaining concepts, helping others learn, tutoring',
                'courses' => [
                    'Bachelor of Secondary Education (Major in Science/Math)',
                    'BS Biology with Education units',
                    'BS Mathematics with Education units',
                ],
                'careers' => [
                    'Science Teacher',
                    'Math Teacher',
                    'College Professor',
                    'Educational Consultant',
                    'Curriculum Developer',
                ],
            ],
            [
                'id' => 7,
                'title' => 'You\'re Creative and Like Innovation',
                'skills' => 'Designing new products, inventing, artistic problem-solving',
                'courses' => [
                    'BS Industrial Design',
                    'BS Product Design',
                    'BS Multimedia Arts (STEM track)',
                    'BS Architecture',
                ],
                'careers' => [
                    'Product Designer',
                    'Industrial Designer',
                    'UX/UI Designer',
                    'Innovation Consultant',
                    'Creative Technologist',
                ],
            ],
        ];
    }

    /**
     * Get HUMSS career paths data
     */
    private function getHumssCareerPaths(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'You\'re Interested in Politics and Leadership',
                'skills' => 'Governance, law, public service, advocacy',
                'courses' => [
                    'BA Political Science',
                    'Bachelor of Laws (LLB)',
                    'BA Public Administration',
                    'BA International Relations',
                ],
                'careers' => [
                    'Lawyer',
                    'Politician / Public Official',
                    'Diplomat',
                    'Policy Analyst',
                    'Government Relations Specialist',
                ],
            ],
            [
                'id' => 2,
                'title' => 'You Love Communication and Media',
                'skills' => 'Writing, speaking, journalism, broadcasting, social media',
                'courses' => [
                    'BA Communication',
                    'BA Journalism',
                    'BA Broadcasting',
                    'BA Mass Communication',
                ],
                'careers' => [
                    'Journalist / Reporter',
                    'News Anchor / Broadcaster',
                    'Content Creator / Influencer',
                    'Public Relations Specialist',
                    'Social Media Manager',
                ],
            ],
            [
                'id' => 3,
                'title' => 'You\'re Curious About Human Behavior',
                'skills' => 'Understanding people, emotions, mental health, counseling',
                'courses' => [
                    'BA Psychology',
                    'BA Social Work',
                    'BA Guidance and Counseling',
                ],
                'careers' => [
                    'Psychologist',
                    'Social Worker',
                    'Guidance Counselor',
                    'Human Resources Specialist',
                    'Mental Health Advocate',
                ],
            ],
            [
                'id' => 4,
                'title' => 'You Want to Teach and Inspire',
                'skills' => 'Educating, mentoring, helping students learn',
                'courses' => [
                    'Bachelor of Elementary Education',
                    'Bachelor of Secondary Education',
                    'BA in English / Filipino / Social Studies (with Education units)',
                ],
                'careers' => [
                    'Elementary Teacher',
                    'High School Teacher',
                    'College Professor',
                    'Educational Administrator',
                    'Curriculum Developer',
                ],
            ],
            [
                'id' => 5,
                'title' => 'You\'re Creative and Artistic',
                'skills' => 'Arts, literature, music, theater, creative writing',
                'courses' => [
                    'BA Fine Arts',
                    'BA Creative Writing',
                    'BA Literature',
                    'BA Theater Arts',
                    'BA Music',
                ],
                'careers' => [
                    'Artist / Painter',
                    'Writer / Author',
                    'Actor / Performer',
                    'Musician',
                    'Art Director',
                ],
            ],
        ];
    }

    /**
     * Get TVL career paths data
     */
    private function getTvlCareerPaths(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'You Enjoy Fixing Computers and Hardware',
                'skills' => 'Assembling PCs, troubleshooting hardware, replacing parts',
                'courses' => [
                    'BS Information Technology (Hardware track)',
                    'BS Industrial Technology - Computer & Electronics',
                    'BTVTED Computer Hardware Servicing',
                ],
                'careers' => [
                    'Computer Technician',
                    'IT Support Specialist',
                    'Hardware Engineer',
                    'Technical Trainer (TESDA/SHS)',
                ],
            ],
            [
                'id' => 2,
                'title' => 'You\'re Interested in Networking and Internet Systems',
                'skills' => 'Setting up LAN/WAN, configuring routers, understanding IP addresses',
                'courses' => [
                    'BS Information Technology (with Networking or Cybersecurity major)',
                    'BS Electronics and Communications Engineering (ECE)',
                    'BS Computer Engineering',
                    'BS Information Systems',
                ],
                'careers' => [
                    'Network Administrator / Network Technician',
                    'Systems Support Specialist',
                    'Cybersecurity Associate',
                    'IT Infrastructure Engineer',
                ],
            ],
            [
                'id' => 3,
                'title' => 'You\'re Curious About Software and Coding',
                'skills' => 'Programming basics, configuring apps, learning new software',
                'courses' => [
                    'BS Computer Science',
                    'BS Information Technology',
                    'BS Software Engineering',
                ],
                'careers' => [
                    'Software Developer / Programmer',
                    'Web Developer',
                    'Mobile App Developer',
                    'Quality Assurance Tester',
                ],
            ],
            [
                'id' => 4,
                'title' => 'You Like Teaching or Sharing Tech Knowledge',
                'skills' => 'Explaining tech concepts, helping others learn ICT skills',
                'courses' => [
                    'BTVTED (ICT major)',
                    'BS Information Technology with Education units',
                    'Bachelor of Technology and Livelihood Education',
                ],
                'careers' => [
                    'ICT Teacher (SHS/TESDA)',
                    'Technical Trainer',
                    'Corporate IT Trainer',
                    'E-Learning Developer',
                ],
            ],
            [
                'id' => 5,
                'title' => 'You Want to Use ICT in Business',
                'skills' => 'Combining tech with entrepreneurship, e-commerce, digital marketing',
                'courses' => [
                    'BS Business Administration (with IT minor)',
                    'BS Entrepreneurship',
                    'BS Information Systems',
                ],
                'careers' => [
                    'IT Business Analyst',
                    'E-Commerce Manager',
                    'Digital Marketing Specialist',
                    'Tech Entrepreneur',
                ],
            ],
        ];
    }
}
