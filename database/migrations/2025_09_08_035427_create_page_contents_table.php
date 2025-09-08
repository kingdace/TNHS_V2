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
        Schema::create('page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('page_name', 50);
            $table->string('section_name', 50);
            $table->enum('content_type', ['text', 'html', 'json', 'image']);
            $table->longText('content_data');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['page_name', 'section_name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_contents');
    }
};
