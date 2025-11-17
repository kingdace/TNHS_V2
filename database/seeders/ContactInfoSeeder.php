<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactInfo;

class ContactInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contactInfo = [
            [
                'contact_type' => 'email',
                'title' => 'General Inquiries',
                'value' => 'info@tnhs.edu.ph',
                'icon' => 'mail',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'contact_type' => 'phone',
                'title' => 'General Inquiries',
                'value' => '(02) 123-4567',
                'icon' => 'phone',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'contact_type' => 'email',
                'title' => 'Admissions',
                'value' => 'admissions@tnhs.edu.ph',
                'icon' => 'mail',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'contact_type' => 'phone',
                'title' => 'Admissions',
                'value' => '(02) 123-4568',
                'icon' => 'phone',
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'contact_type' => 'email',
                'title' => 'Academic Department',
                'value' => 'academics@tnhs.edu.ph',
                'icon' => 'mail',
                'display_order' => 5,
                'is_active' => true,
            ],
            [
                'contact_type' => 'phone',
                'title' => 'Academic Department',
                'value' => '(02) 123-4569',
                'icon' => 'phone',
                'display_order' => 6,
                'is_active' => true,
            ],
            [
                'contact_type' => 'address',
                'title' => 'School Address',
                'value' => 'Taft, Surigao City, Philippines',
                'icon' => 'map-pin',
                'display_order' => 7,
                'is_active' => true,
            ],
            [
                'contact_type' => 'hours',
                'title' => 'Office Hours',
                'value' => 'Monday - Friday: 7:00 AM - 5:00 PM',
                'icon' => 'clock',
                'display_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($contactInfo as $contact) {
            ContactInfo::create($contact);
        }

        $this->command->info('Contact information seeded successfully!');
    }
}
