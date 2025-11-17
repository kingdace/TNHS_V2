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
        Schema::table('staff_profiles', function (Blueprint $table) {
            // Grade levels for teachers (JSON array: ["7", "8", "9", "10", "11", "12"])
            $table->json('grade_levels')->nullable()->after('achievements');

            // Subject specialization for teachers
            $table->string('subject_specialization')->nullable()->after('grade_levels');

            // Organizational hierarchy fields
            $table->unsignedBigInteger('reports_to')->nullable()->after('subject_specialization');
            $table->boolean('is_department_head')->default(false)->after('reports_to');
            $table->tinyInteger('position_level')->default(4)->after('is_department_head')
                ->comment('1=Principal, 2=Assistant Principal, 3=Department Head, 4=Teacher, 5=Support Staff');

            // Add foreign key constraint for reports_to
            $table->foreign('reports_to')->references('id')->on('staff_profiles')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staff_profiles', function (Blueprint $table) {
            // Drop foreign key first
            $table->dropForeign(['reports_to']);

            // Drop columns
            $table->dropColumn([
                'grade_levels',
                'subject_specialization',
                'reports_to',
                'is_department_head',
                'position_level'
            ]);
        });
    }
};
