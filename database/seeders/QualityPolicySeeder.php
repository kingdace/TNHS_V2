<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\QualityPolicy;

class QualityPolicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        QualityPolicy::create([
            'title' => 'QUALITY POLICY',
            'intro_statement' => 'The Department of Education is committed to provide learners with quality basic education that is accessible, inclusive, and liberating through:',
            'concluding_statement' => 'The Department upholds the highest standards of conduct and performance to fulfill stakeholder\'s needs and expectations by adhering to constitutional mandates statutory, and regulatory requirements, and sustains client satisfaction through continuous improvement of the Quality Management System.',
            'key_points' => [
                'Proactive leadership',
                'Shared governance',
                'Evidence-based policies, standards, and programs',
                'Responsive and relevant curricula',
                'Highly competent and committed officials, and teaching and non-teaching personnel',
                'An enabling learning environment'
            ],
            'is_active' => true
        ]);
    }
}
