<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactInfoDynamicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing contact info
        \App\Models\ContactInfo::truncate();

        // General Information Contacts
        \App\Models\ContactInfo::create([
            'type' => 'phone',
            'label' => 'Main Office Phone',
            'value' => '+63 123 456 7890',
            'department' => 'Main Office',
            'position' => 'General Information',
            'description' => 'Main office phone number for general inquiries',
            'icon' => 'phone',
            'category' => 'general',
            'featured' => true,
            'color' => 'blue',
            'is_active' => true,
            'display_order' => 1
        ]);

        \App\Models\ContactInfo::create([
            'type' => 'email',
            'label' => 'Main Office Email',
            'value' => 'tnhs@deped.gov.ph',
            'department' => 'Main Office',
            'position' => 'General Information',
            'description' => 'Main office email for general inquiries',
            'icon' => 'mail',
            'category' => 'general',
            'featured' => true,
            'color' => 'blue',
            'is_active' => true,
            'display_order' => 2
        ]);

        \App\Models\ContactInfo::create([
            'type' => 'address',
            'label' => 'School Address',
            'value' => 'Taguig National High School, Taguig City',
            'department' => 'Main Office',
            'position' => 'School Location',
            'description' => 'Physical address of the school',
            'icon' => 'map-pin',
            'category' => 'general',
            'featured' => true,
            'color' => 'blue',
            'is_active' => true,
            'display_order' => 3
        ]);

        \App\Models\ContactInfo::create([
            'type' => 'hours',
            'label' => 'Office Hours',
            'value' => 'Monday - Friday: 7:00 AM - 5:00 PM',
            'department' => 'Main Office',
            'position' => 'Operating Hours',
            'description' => 'Main office operating hours',
            'icon' => 'clock',
            'category' => 'general',
            'featured' => true,
            'color' => 'blue',
            'is_active' => true,
            'display_order' => 4
        ]);

        // Admissions Office Contacts
        \App\Models\ContactInfo::create([
            'type' => 'phone',
            'label' => 'Admissions Phone',
            'value' => '+63 123 456 7891',
            'department' => 'Admissions Office',
            'position' => 'Admissions Officer',
            'description' => 'Phone number for admissions and enrollment inquiries',
            'icon' => 'phone',
            'category' => 'admissions',
            'featured' => true,
            'color' => 'green',
            'is_active' => true,
            'display_order' => 5
        ]);

        \App\Models\ContactInfo::create([
            'type' => 'email',
            'label' => 'Admissions Email',
            'value' => 'admissions@tnhs.edu.ph',
            'department' => 'Admissions Office',
            'position' => 'Admissions Officer',
            'description' => 'Email for admissions and enrollment inquiries',
            'icon' => 'mail',
            'category' => 'admissions',
            'featured' => true,
            'color' => 'green',
            'is_active' => true,
            'display_order' => 6
        ]);

        \App\Models\ContactInfo::create([
            'type' => 'hours',
            'label' => 'Admissions Hours',
            'value' => 'Monday - Friday: 8:00 AM - 4:00 PM',
            'department' => 'Admissions Office',
            'position' => 'Operating Hours',
            'description' => 'Admissions office operating hours',
            'icon' => 'clock',
            'category' => 'admissions',
            'featured' => true,
            'color' => 'green',
            'is_active' => true,
            'display_order' => 7
        ]);

        // Student Support Contacts
        \App\Models\ContactInfo::create([
            'type' => 'phone',
            'label' => 'Student Support Phone',
            'value' => '+63 123 456 7892',
            'department' => 'Student Support Services',
            'position' => 'Guidance Counselor',
            'description' => 'Phone number for student support and guidance services',
            'icon' => 'phone',
            'category' => 'support',
            'featured' => true,
            'color' => 'purple',
            'is_active' => true,
            'display_order' => 8
        ]);

        \App\Models\ContactInfo::create([
            'type' => 'email',
            'label' => 'Student Support Email',
            'value' => 'support@tnhs.edu.ph',
            'department' => 'Student Support Services',
            'position' => 'Guidance Counselor',
            'description' => 'Email for student support and guidance services',
            'icon' => 'mail',
            'category' => 'support',
            'featured' => true,
            'color' => 'purple',
            'is_active' => true,
            'display_order' => 9
        ]);

        \App\Models\ContactInfo::create([
            'type' => 'hours',
            'label' => 'Student Support Hours',
            'value' => 'Monday - Friday: 7:30 AM - 4:30 PM',
            'department' => 'Student Support Services',
            'position' => 'Operating Hours',
            'description' => 'Student support services operating hours',
            'icon' => 'clock',
            'category' => 'support',
            'featured' => true,
            'color' => 'purple',
            'is_active' => true,
            'display_order' => 10
        ]);
    }
}
