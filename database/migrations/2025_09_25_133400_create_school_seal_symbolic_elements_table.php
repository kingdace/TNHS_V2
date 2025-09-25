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
        Schema::create('school_seal_symbolic_elements', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., 'Torch', 'Crossed Keys', 'Open Book with Laurel'
            $table->string('icon', 100)->nullable(); // Icon name for display
            $table->string('color', 50)->nullable(); // Background color class
            $table->string('emoji', 10)->nullable(); // Emoji representation
            $table->text('meaning'); // What it symbolizes
            $table->text('interpretation'); // Detailed explanation
            $table->string('image_path', 500)->nullable(); // Optional image
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['is_active', 'display_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_seal_symbolic_elements');
    }
};
