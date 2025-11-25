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
        Schema::create('special_programs', function (Blueprint $table) {
            $table->id();
            $table->string('program_id')->unique(); // 'als', 'others'
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->string('color_gradient')->nullable(); // 'from-teal-500 to-teal-600'
            $table->string('bg_color')->nullable(); // 'bg-teal-50'
            $table->string('border_color')->nullable(); // 'border-teal-200'
            $table->text('notes')->nullable();
            $table->json('features')->nullable(); // Array of program features
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();

            $table->index(['program_id']);
            $table->index(['is_active', 'display_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('special_programs');
    }
};
