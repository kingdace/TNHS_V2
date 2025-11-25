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
        Schema::create('special_program_requirements', function (Blueprint $table) {
            $table->id();
            $table->string('program_id'); // Foreign key to special_programs
            $table->text('requirement_text');
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('program_id')->references('program_id')->on('special_programs')->onDelete('cascade');
            $table->index(['program_id', 'display_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('special_program_requirements');
    }
};
