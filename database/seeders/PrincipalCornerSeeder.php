<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PrincipalCorner;

class PrincipalCornerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $principalCornerContent = [
            [
                'title' => 'Welcome Message from the Principal',
                'content' => 'Welcome to Taft National High School, where excellence in education meets character development. As your Principal, I am committed to providing a nurturing environment where every student can discover their potential and achieve their dreams.

Our school has a rich tradition of academic excellence and holistic development. We believe in fostering not just academic success, but also the values of integrity, respect, and service to others.

This academic year, we continue to focus on innovative teaching methods, student-centered learning, and the development of 21st-century skills. Our dedicated faculty and staff are here to support each student\'s journey toward success.

Together, we will continue to build a community where learning is engaging, meaningful, and transformative.',
                'excerpt' => 'A warm welcome message from the Principal highlighting our commitment to excellence and student development.',
                'content_type' => 'message',
                'author' => 'Dr. Maria Santos',
                'is_featured' => true,
                'is_active' => true,
                'display_order' => 1,
                'published_at' => now(),
            ],
            [
                'title' => 'Academic Excellence Initiative',
                'content' => 'I am pleased to announce the launch of our Academic Excellence Initiative, designed to enhance learning outcomes and student achievement across all grade levels.

This comprehensive program includes:
- Enhanced STEM curriculum integration
- Advanced placement course offerings
- Peer tutoring and mentoring programs
- Digital learning resources and platforms
- Professional development for teachers

Our goal is to ensure that every student receives the support and resources they need to excel academically while developing critical thinking and problem-solving skills.',
                'excerpt' => 'New academic programs and initiatives to enhance student learning and achievement.',
                'content_type' => 'announcement',
                'author' => 'Dr. Maria Santos',
                'is_featured' => true,
                'is_active' => true,
                'display_order' => 2,
                'published_at' => now(),
            ],
            [
                'title' => 'Principal\'s Vision for TNHS',
                'content' => 'My vision for Taft National High School is to create a transformative educational environment where every student discovers their potential, develops critical thinking skills, and becomes a responsible citizen who contributes meaningfully to society.

We envision TNHS as a beacon of excellence that not only imparts knowledge but also shapes character, fosters innovation, and prepares students for the challenges of the 21st century.

Our strategic goals include:
1. Academic Excellence - Maintaining high standards of teaching and learning
2. Character Development - Instilling values of integrity, respect, and service
3. Innovation - Embracing technology and modern teaching methods
4. Community Engagement - Building strong partnerships with families and the community
5. Student Well-being - Ensuring a safe, supportive, and inclusive environment

Together, we will continue to build a school that serves as a model of educational excellence in our region.',
                'excerpt' => 'The Principal\'s comprehensive vision for the future of Taft National High School.',
                'content_type' => 'vision',
                'author' => 'Dr. Maria Santos',
                'is_featured' => true,
                'is_active' => true,
                'display_order' => 3,
                'published_at' => now(),
            ],
            [
                'title' => 'Student Achievement Recognition',
                'content' => 'I am proud to announce that our students have achieved remarkable success in various academic competitions and extracurricular activities this semester.

Notable achievements include:
- First place in Regional Science Fair
- Outstanding performance in Mathematics Olympiad
- Excellence in Creative Writing Competition
- Leadership awards in Student Government
- Community service recognition

These achievements reflect not only the hard work of our students but also the dedication of our teachers and the support of our families. Congratulations to all our achievers!',
                'excerpt' => 'Celebrating student achievements and academic excellence across various competitions.',
                'content_type' => 'achievement',
                'author' => 'Dr. Maria Santos',
                'is_featured' => true,
                'is_active' => true,
                'display_order' => 4,
                'published_at' => now(),
            ],
            [
                'title' => 'School Safety and Security Updates',
                'content' => 'The safety and security of our students and staff remain our top priority. I want to inform you about recent updates to our safety protocols and security measures.

New safety measures include:
- Enhanced campus security monitoring
- Updated emergency response procedures
- Regular safety drills and training
- Improved communication systems
- Visitor management protocols

We are committed to maintaining a safe learning environment where students can focus on their education without concerns about their well-being.',
                'excerpt' => 'Important updates on school safety protocols and security measures.',
                'content_type' => 'announcement',
                'author' => 'Dr. Maria Santos',
                'is_featured' => false,
                'is_active' => true,
                'display_order' => 5,
                'published_at' => now(),
            ],
            [
                'title' => 'Digital Learning Platform Launch',
                'content' => 'We are excited to announce the launch of our new digital learning platform, designed to enhance the educational experience for all students at Taft National High School.

This innovative platform features:
- Interactive learning modules
- Virtual laboratory experiences
- Personalized study plans
- Online assessment tools
- Collaborative learning spaces
- Parent engagement portal

The platform integrates cutting-edge technology with traditional teaching methods, providing students with flexible learning options and teachers with powerful tools for instruction.',
                'excerpt' => 'Introduction of new digital learning tools and technology integration.',
                'content_type' => 'news',
                'author' => 'Dr. Maria Santos',
                'is_featured' => true,
                'is_active' => true,
                'display_order' => 6,
                'published_at' => now(),
            ],
        ];

        foreach ($principalCornerContent as $content) {
            PrincipalCorner::create($content);
        }
    }
}
