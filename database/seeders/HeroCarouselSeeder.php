<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HeroCarousel;

class HeroCarouselSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slides = [
            [
                'title' => 'Enrollment for School Year 2024-2025',
                'subtitle' => 'NOW OPEN',
                'description' => 'Join our community of learners and start your journey towards academic excellence. We are now accepting applications for incoming Grade 7 students and transferees.',
                'image_path' => '/images/BG1.jpg',
                'cta_text' => 'Apply Now',
                'cta_link' => '/admissions',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Academic Excellence Awards',
                'subtitle' => 'RECOGNITION CEREMONY',
                'description' => 'Join us in celebrating the outstanding achievements of our students who have demonstrated exceptional academic performance and leadership qualities.',
                'image_path' => '/images/BG2.jpg',
                'cta_text' => 'View Details',
                'cta_link' => '/news',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Campus Life at TNHS',
                'subtitle' => 'EXPERIENCE EXCELLENCE',
                'description' => 'Experience the vibrant campus life at TNHS where students develop academically, socially, and personally in a supportive and nurturing environment.',
                'image_path' => '/images/BG3.jpg',
                'cta_text' => 'Learn More',
                'cta_link' => '/about',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Quality Education at TNHS',
                'subtitle' => 'BUILDING FUTURES',
                'description' => 'Providing quality education with dedicated teachers and modern facilities to ensure every student reaches their full potential.',
                'image_path' => '/images/BG4.jpg',
                'cta_text' => 'Explore Programs',
                'cta_link' => '/academics',
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Welcome to TNHS',
                'subtitle' => 'JOIN OUR COMMUNITY',
                'description' => 'Become part of a vibrant learning community where students thrive academically and grow personally.',
                'image_path' => '/images/BG5.jpg',
                'cta_text' => 'Discover More',
                'cta_link' => '/about',
                'display_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($slides as $slide) {
            HeroCarousel::create($slide);
        }
    }
}
