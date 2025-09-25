<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SchoolSealSymbolicElement;

class SchoolSealSymbolicElementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $elements = [
            [
                'name' => 'Torch',
                'icon' => 'Flame',
                'color' => 'bg-yellow-500',
                'emoji' => '🔥',
                'meaning' => 'Symbol of enlightenment and knowledge',
                'interpretation' => 'Represents education as a guiding light, dispelling the darkness of ignorance. It signifies our mission to empower students intellectually.',
                'image_path' => null,
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Crossed Keys',
                'icon' => 'Key',
                'color' => 'bg-blue-500',
                'emoji' => '🔑',
                'meaning' => 'Keys represent access and guardianship',
                'interpretation' => 'Signifies the unlocking of knowledge and our responsibility to safeguard and provide access to learning and opportunity.',
                'image_path' => null,
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Open Book with Laurel',
                'icon' => 'BookOpen',
                'color' => 'bg-green-500',
                'emoji' => '📖',
                'meaning' => 'Learning, wisdom, academic pursuit, honor, and excellence',
                'interpretation' => 'The open book symbolizes the foundation of education, while the laurel leaves represent our commitment to producing honorable and accomplished learners.',
                'image_path' => null,
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Rays',
                'icon' => 'Sun',
                'color' => 'bg-orange-500',
                'emoji' => '🌞',
                'meaning' => 'Progress, hope, and national identity',
                'interpretation' => 'These rays reflect our optimism and the role we play in national development through education, connected to our Philippine heritage.',
                'image_path' => null,
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Shield Shape',
                'icon' => 'Shield',
                'color' => 'bg-royal-blue',
                'emoji' => '🛡️',
                'meaning' => 'Protection and strength',
                'interpretation' => 'Reflects our role in safeguarding students and preparing them for life\'s challenges with resilience and determination.',
                'image_path' => null,
                'display_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Location & History',
                'icon' => 'MapPin',
                'color' => 'bg-purple-500',
                'emoji' => '📍',
                'meaning' => 'Foundation year and community identity',
                'interpretation' => '2003: Foundation year of our institution. SURIGAO CITY: Shows our community identity and pride in being part of this vibrant city.',
                'image_path' => null,
                'display_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($elements as $element) {
            SchoolSealSymbolicElement::create($element);
        }
    }
}
