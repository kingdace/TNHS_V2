<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $visions = [
            [
                'title' => 'Our Vision',
                'content' => 'To be a leading educational institution that produces globally competitive graduates who are morally upright, academically excellent, and socially responsible citizens committed to nation-building.',
                'image_path' => null,
                'display_order' => 1,
                'is_active' => true,
            ],
        ];

        foreach ($visions as $vision) {
            \App\Models\Vision::create($vision);
        }
    }
}
