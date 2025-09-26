<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PrivacyPolicy;

class PrivacyPolicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PrivacyPolicy::create([
            'title' => 'Privacy Policy',
            'introduction' => 'Taft National High School (TNHS) is committed to protecting the privacy and personal information of our students, parents, staff, and visitors. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information in accordance with the Data Privacy Act of 2012 (Republic Act No. 10173) and other applicable laws.',
            'information_collected' => [
                'Student Information (name, ID, academic records, attendance)',
                'Parent/Guardian Information (contact details, address, employment)',
                'Staff Information (personal details, employment records, performance)'
            ],
            'how_we_use' => [
                'Academic record keeping and reporting',
                'Student progress monitoring',
                'Communication with parents and guardians',
                'Emergency contact and safety measures'
            ],
            'data_protection' => [
                'Secure encrypted storage systems',
                'Access control and authorization',
                'Regular monitoring and auditing',
                'Data retention policies'
            ],
            'your_rights' => [
                'Right to be informed about data collection',
                'Right to access your personal data',
                'Right to correct inaccurate information',
                'Right to object to data processing'
            ],
            'policy_updates' => 'This Privacy Policy may be updated from time to time. We will notify you of any significant changes by posting the updated policy on our website and through appropriate communication channels.',
            'is_active' => true
        ]);
    }
}
