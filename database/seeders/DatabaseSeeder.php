<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            AnnouncementSeeder::class,
            HeroCarouselSeeder::class,
            AcademicProgramSeeder::class,
            SchoolInfoSeeder::class,
            ContactInfoSeeder::class,
        ]);
    }
}
