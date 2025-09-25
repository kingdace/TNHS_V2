<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GoalObjectiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $goals = [
            // Academic Goals
            [
                'category' => 'academic',
                'title' => 'Achieve 100% passing rate in national examinations',
                'description' => 'Maintain high academic standards to ensure all students pass national examinations.',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'category' => 'academic',
                'title' => 'Maintain high academic standards across all subjects',
                'description' => 'Ensure consistent quality education across all subject areas.',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'category' => 'academic',
                'title' => 'Develop critical thinking and problem-solving skills',
                'description' => 'Foster analytical thinking and problem-solving abilities in students.',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'category' => 'academic',
                'title' => 'Prepare students for higher education and career paths',
                'description' => 'Equip students with necessary skills for future academic and professional success.',
                'display_order' => 4,
                'is_active' => true,
            ],
            // Character Development Goals
            [
                'category' => 'character',
                'title' => 'Instill moral values and ethical behavior',
                'description' => 'Develop strong moral foundation and ethical decision-making skills.',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'category' => 'character',
                'title' => 'Promote respect for diversity and inclusion',
                'description' => 'Foster understanding and appreciation for different cultures and backgrounds.',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'category' => 'character',
                'title' => 'Develop leadership and teamwork skills',
                'description' => 'Build leadership qualities and collaborative working abilities.',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'category' => 'character',
                'title' => 'Foster environmental consciousness and civic responsibility',
                'description' => 'Promote environmental awareness and active citizenship.',
                'display_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($goals as $goal) {
            \App\Models\GoalObjective::create($goal);
        }
    }
}
