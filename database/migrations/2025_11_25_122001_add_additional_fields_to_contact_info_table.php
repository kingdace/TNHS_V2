<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contact_info', function (Blueprint $table) {
            // Add fields for enhanced contact information
            $table->string('department')->nullable()->after('icon'); // For department-specific contacts
            $table->string('position')->nullable()->after('department'); // Job position/title
            $table->text('description')->nullable()->after('position'); // Description of the contact/department
            $table->json('social_links')->nullable()->after('description'); // Social media links
            $table->json('additional_info')->nullable()->after('social_links'); // Extra flexible data
            $table->string('category')->default('general')->after('additional_info'); // Category grouping
            $table->boolean('featured')->default(false)->after('category'); // Featured contact
            $table->string('color')->nullable()->after('featured'); // Color theme for display

            // Rename existing columns to match new structure
            $table->renameColumn('contact_type', 'type');
            $table->renameColumn('title', 'label');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contact_info', function (Blueprint $table) {
            // Rename columns back
            $table->renameColumn('type', 'contact_type');
            $table->renameColumn('label', 'title');

            // Drop the new columns
            $table->dropColumn([
                'department',
                'position',
                'description',
                'social_links',
                'additional_info',
                'category',
                'featured',
                'color'
            ]);
        });
    }
};
