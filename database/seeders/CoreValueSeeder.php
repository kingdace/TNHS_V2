<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CoreValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coreValues = [
            [
                'title' => 'MAKA-DIYOS',
                'description' => 'God-centered education that instills spiritual values and moral integrity in every student.',
                'icon' => 'Heart',
                'color' => 'from-red-500 to-pink-500',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'MAKA-TAO',
                'description' => 'Human-centered approach that promotes respect, empathy, and service to others.',
                'icon' => 'Users',
                'color' => 'from-blue-500 to-cyan-500',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'MAKAKALIKASAN',
                'description' => 'Environment-conscious education that fosters stewardship and sustainability.',
                'icon' => 'Globe',
                'color' => 'from-green-500 to-emerald-500',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'MAKABANSA',
                'description' => 'Nation-building through patriotic education and civic responsibility.',
                'icon' => 'Award',
                'color' => 'from-yellow-500 to-orange-500',
                'display_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($coreValues as $coreValue) {
            \App\Models\CoreValue::create($coreValue);
        }
    }
}
