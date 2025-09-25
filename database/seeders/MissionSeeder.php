<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $missions = [
            [
                'title' => 'Our Mission',
                'content' => 'To provide quality secondary education that develops students\' intellectual, moral, and social capabilities, preparing them to become productive citizens who contribute to the development of their community and the nation.',
                'image_path' => null,
                'display_order' => 1,
                'is_active' => true,
            ],
        ];

        foreach ($missions as $mission) {
            \App\Models\Mission::create($mission);
        }
    }
}
