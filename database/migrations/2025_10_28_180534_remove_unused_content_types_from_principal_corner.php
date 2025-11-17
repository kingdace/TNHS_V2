<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update existing data to use only the 3 content types we want to keep
        // Map old types to new types
        DB::table('principal_corner')
            ->whereIn('content_type', ['message', 'announcement', 'news'])
            ->delete(); // Delete all unused content types

        // Now update the enum to only include the 3 content types
        DB::statement("ALTER TABLE `principal_corner` MODIFY COLUMN `content_type` ENUM('biography', 'vision', 'achievement') NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert to all content types
        DB::statement("ALTER TABLE `principal_corner` MODIFY COLUMN `content_type` ENUM('message', 'announcement', 'vision', 'achievement', 'news', 'biography') NOT NULL");
    }
};
