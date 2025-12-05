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
        Schema::create('senior_high_strands', function (Blueprint $table) {
            $table->id();
            $table->string('strand_id')->unique(); // 'stem', 'humss', 'tvl', 'abm', 'gas', 'arts_design'
            $table->string('title'); // Full title
            $table->string('short_title'); // Acronym (STEM, HUMSS, etc.)
            $table->text('description');
            $table->json('features'); // Array of feature strings
            $table->string('color'); // Gradient color classes
            $table->string('bg_color'); // Background color class
            $table->string('border_color'); // Border color class
            $table->string('icon'); // Emoji icon
            $table->string('gradient'); // Gradient classes
            $table->string('image_path'); // Static image path
            $table->json('career_paths'); // Array of career path options with details
            $table->json('strand_overview'); // Array of overview items
            $table->text('career_guide_intro')->nullable(); // Career matching guide intro text
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();

            // Indexes
            $table->index('strand_id');
            $table->index('is_active');
            $table->index('display_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('senior_high_strands');
    }
};
