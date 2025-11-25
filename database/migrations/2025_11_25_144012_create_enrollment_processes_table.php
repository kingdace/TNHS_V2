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
        Schema::create('enrollment_processes', function (Blueprint $table) {
            $table->id();
            $table->string('category_id'); // Foreign key to enrollment_categories
            $table->text('step_text');
            $table->integer('step_number');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('category_id')->references('category_id')->on('enrollment_categories')->onDelete('cascade');
            $table->index(['category_id', 'step_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollment_processes');
    }
};
