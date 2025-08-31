<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Announcement;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $announcements = [
            [
                'title' => 'Enrollment for School Year 2024-2025 Now Open',
                'content' => 'We are now accepting applications for the upcoming school year. Visit our admissions page for more information about requirements and application process.',
                'author' => 'School Administration',
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Academic Excellence Awards Ceremony 2024',
                'content' => 'Join us in celebrating the outstanding achievements of our students in the annual awards ceremony. The event will be held in the school auditorium.',
                'author' => 'Academic Department',
                'status' => 'published',
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Parent-Teacher Conference Schedule',
                'content' => 'Important dates for parent-teacher conferences have been announced. Please check the school calendar for your scheduled meeting time.',
                'author' => 'Guidance Office',
                'status' => 'published',
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'New Science Laboratory Facility Opening',
                'content' => 'State-of-the-art science laboratory to enhance hands-on learning experience for our students. Opening ceremony will be held next month.',
                'author' => 'Facilities Management',
                'status' => 'draft',
                'published_at' => null,
            ],
            [
                'title' => 'Sports Festival 2024 Schedule Announced',
                'content' => 'Annual sports festival featuring various athletic competitions and activities. Students are encouraged to participate and showcase their talents.',
                'author' => 'Physical Education Department',
                'status' => 'published',
                'published_at' => now()->subDays(15),
            ],
        ];

        foreach ($announcements as $announcement) {
            Announcement::create($announcement);
        }
    }
}
