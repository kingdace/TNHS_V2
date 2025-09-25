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
            MissionSeeder::class,
            VisionSeeder::class,
            CoreValueSeeder::class,
            GuidingPrincipleSeeder::class,
            GoalObjectiveSeeder::class,
            SchoolSealInfoSeeder::class,
            SchoolSealSymbolicElementSeeder::class,
            SchoolSealCoreValueSeeder::class,
        ]);
    }
}
