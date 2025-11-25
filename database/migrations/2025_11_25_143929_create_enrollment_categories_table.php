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
        Schema::create('enrollment_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_id')->unique(); // 'junior-high', 'senior-high'
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->string('color_gradient')->nullable(); // 'from-blue-500 to-blue-600'
            $table->string('bg_color')->nullable(); // 'bg-blue-50'
            $table->string('border_color')->nullable(); // 'border-blue-200'
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();

            $table->index(['category_id']);
            $table->index(['is_active', 'display_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollment_categories');
    }
};
