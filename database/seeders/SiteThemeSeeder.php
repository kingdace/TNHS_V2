<?php

namespace Database\Seeders;

use App\Models\SiteTheme;
use Illuminate\Database\Seeder;

class SiteThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $themes = [
            [
                'name' => 'Royal Blue',
                'slug' => 'royal-blue',
                'is_active' => true,
                'description' => 'Professional, trustworthy, academic - The classic school theme',
                'colors' => [
                    'primary' => '#1e3a8a',
                    'secondary' => '#3b82f6',
                    'gradient_from' => '#1e3a8a',
                    'gradient_via' => '#1e40af',
                    'gradient_to' => '#4338ca',
                    'accent' => '#fbbf24',
                    'text_light' => '#e0e7ff',
                    'text_lighter' => '#bfdbfe',
                    'hover' => '#2563eb',
                ],
            ],
            [
                'name' => 'Forest Green',
                'slug' => 'forest-green',
                'is_active' => false,
                'description' => 'Growth, nature, harmony - Eco-friendly and refreshing',
                'colors' => [
                    'primary' => '#065f46',
                    'secondary' => '#10b981',
                    'gradient_from' => '#064e3b',
                    'gradient_via' => '#065f46',
                    'gradient_to' => '#115e59',
                    'accent' => '#fbbf24',
                    'text_light' => '#d1fae5',
                    'text_lighter' => '#a7f3d0',
                    'hover' => '#059669',
                ],
            ],
            [
                'name' => 'Deep Purple',
                'slug' => 'deep-purple',
                'is_active' => false,
                'description' => 'Creativity, wisdom, prestige - Elegant and inspiring',
                'colors' => [
                    'primary' => '#581c87',
                    'secondary' => '#a855f7',
                    'gradient_from' => '#581c87',
                    'gradient_via' => '#6b21a8',
                    'gradient_to' => '#4338ca',
                    'accent' => '#fbbf24',
                    'text_light' => '#ede9fe',
                    'text_lighter' => '#ddd6fe',
                    'hover' => '#9333ea',
                ],
            ],
            [
                'name' => 'Crimson Red',
                'slug' => 'crimson-red',
                'is_active' => false,
                'description' => 'Energy, passion, determination - Bold and powerful',
                'colors' => [
                    'primary' => '#991b1b',
                    'secondary' => '#ef4444',
                    'gradient_from' => '#7f1d1d',
                    'gradient_via' => '#991b1b',
                    'gradient_to' => '#9f1239',
                    'accent' => '#fbbf24',
                    'text_light' => '#fee2e2',
                    'text_lighter' => '#fecaca',
                    'hover' => '#dc2626',
                ],
            ],
            [
                'name' => 'Sunset Orange',
                'slug' => 'sunset-orange',
                'is_active' => false,
                'description' => 'Warmth, enthusiasm, creativity - Vibrant and energetic',
                'colors' => [
                    'primary' => '#9a3412',
                    'secondary' => '#f97316',
                    'gradient_from' => '#7c2d12',
                    'gradient_via' => '#9a3412',
                    'gradient_to' => '#c2410c',
                    'accent' => '#fbbf24',
                    'text_light' => '#ffedd5',
                    'text_lighter' => '#fed7aa',
                    'hover' => '#ea580c',
                ],
            ],
            [
                'name' => 'Midnight Navy',
                'slug' => 'midnight-navy',
                'is_active' => false,
                'description' => 'Sophistication, depth, authority - Sleek and modern',
                'colors' => [
                    'primary' => '#0c4a6e',
                    'secondary' => '#0ea5e9',
                    'gradient_from' => '#082f49',
                    'gradient_via' => '#0c4a6e',
                    'gradient_to' => '#075985',
                    'accent' => '#fbbf24',
                    'text_light' => '#e0f2fe',
                    'text_lighter' => '#bae6fd',
                    'hover' => '#0284c7',
                ],
            ],
            [
                'name' => 'Rose Pink',
                'slug' => 'rose-pink',
                'is_active' => false,
                'description' => 'Compassion, warmth, care - Gentle and welcoming',
                'colors' => [
                    'primary' => '#9f1239',
                    'secondary' => '#f43f5e',
                    'gradient_from' => '#881337',
                    'gradient_via' => '#9f1239',
                    'gradient_to' => '#be123c',
                    'accent' => '#fbbf24',
                    'text_light' => '#ffe4e6',
                    'text_lighter' => '#fecdd3',
                    'hover' => '#e11d48',
                ],
            ],
            [
                'name' => 'Slate Gray',
                'slug' => 'slate-gray',
                'is_active' => false,
                'description' => 'Neutral, professional, timeless - Clean and minimal',
                'colors' => [
                    'primary' => '#1e293b',
                    'secondary' => '#64748b',
                    'gradient_from' => '#0f172a',
                    'gradient_via' => '#1e293b',
                    'gradient_to' => '#334155',
                    'accent' => '#fbbf24',
                    'text_light' => '#f1f5f9',
                    'text_lighter' => '#e2e8f0',
                    'hover' => '#475569',
                ],
            ],
            [
                'name' => 'Amber Gold',
                'slug' => 'amber-gold',
                'is_active' => false,
                'description' => 'Excellence, achievement, prestige - Luxurious and bright',
                'colors' => [
                    'primary' => '#92400e',
                    'secondary' => '#f59e0b',
                    'gradient_from' => '#78350f',
                    'gradient_via' => '#92400e',
                    'gradient_to' => '#b45309',
                    'accent' => '#fbbf24',
                    'text_light' => '#fef3c7',
                    'text_lighter' => '#fde68a',
                    'hover' => '#d97706',
                ],
            ],
        ];

        foreach ($themes as $theme) {
            SiteTheme::create($theme);
        }
    }
}
