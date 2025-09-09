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
        Schema::create('academic_programs', function (Blueprint $table) {
            $table->id();
            $table->enum('program_type', ['junior_high', 'senior_high', 'special'])->default('junior_high');
            $table->integer('grade_level')->nullable();
            $table->string('program_name');
            $table->text('description')->nullable();
            $table->json('subjects')->nullable();
            $table->text('requirements')->nullable();
            $table->string('duration', 100)->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();

            $table->index(['program_type', 'grade_level']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_programs');
    }
};
