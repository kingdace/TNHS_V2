<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SchoolSealCoreValue;

class SchoolSealCoreValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coreValues = [
            [
                'name' => 'Excellence',
                'icon' => 'Star',
                'color' => 'bg-royal-blue',
                'description' => 'Pursuing the highest standards in all endeavors',
                'image_path' => null,
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Integrity',
                'icon' => 'Heart',
                'color' => 'bg-green-500',
                'description' => 'Maintaining honesty and strong moral principles',
                'image_path' => null,
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Unity',
                'icon' => 'Users',
                'color' => 'bg-blue-500',
                'description' => 'Working together toward common goals',
                'image_path' => null,
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Resilience',
                'icon' => 'Zap',
                'color' => 'bg-orange-500',
                'description' => 'Overcoming challenges with strength and determination',
                'image_path' => null,
                'display_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($coreValues as $value) {
            SchoolSealCoreValue::create($value);
        }
    }
}
