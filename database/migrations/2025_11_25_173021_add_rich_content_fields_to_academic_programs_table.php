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
        Schema::table('academic_programs', function (Blueprint $table) {
            // Page content and headers
            $table->json('page_content')->nullable()->after('requirements');

            // Program benefits with icons and descriptions
            $table->json('program_benefits')->nullable()->after('page_content');

            // Why choose features list
            $table->json('why_choose_features')->nullable()->after('program_benefits');

            // Admission requirements (documents and schedule)
            $table->json('admission_requirements')->nullable()->after('why_choose_features');

            // Images and media
            $table->json('images')->nullable()->after('admission_requirements');

            // Additional features for future use
            $table->json('curriculum_highlights')->nullable()->after('images');
            $table->json('facilities')->nullable()->after('curriculum_highlights');
            $table->json('extracurricular_activities')->nullable()->after('facilities');

            // SEO and metadata
            $table->string('meta_title')->nullable()->after('extracurricular_activities');
            $table->text('meta_description')->nullable()->after('meta_title');
            $table->json('meta_keywords')->nullable()->after('meta_description');

            // Display settings
            $table->boolean('featured')->default(false)->after('meta_keywords');
            $table->string('banner_color', 50)->default('blue')->after('featured');
            $table->string('theme_color', 50)->default('blue')->after('banner_color');

            // Add indexes for better performance
            $table->index('featured');
            $table->index(['program_type', 'featured']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('academic_programs', function (Blueprint $table) {
            $table->dropIndex(['program_type', 'featured']);
            $table->dropIndex(['featured']);

            $table->dropColumn([
                'page_content',
                'program_benefits',
                'why_choose_features',
                'admission_requirements',
                'images',
                'curriculum_highlights',
                'facilities',
                'extracurricular_activities',
                'meta_title',
                'meta_description',
                'meta_keywords',
                'featured',
                'banner_color',
                'theme_color'
            ]);
        });
    }
};
