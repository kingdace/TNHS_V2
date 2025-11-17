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
        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('category');
            $table->string('image_path');
            $table->string('thumbnail_path')->nullable();
            $table->string('alt_text')->nullable();
            $table->json('tags')->nullable();
            $table->date('event_date')->nullable();
            $table->string('photographer')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('view_count')->default(0);
            $table->integer('like_count')->default(0);
            $table->integer('display_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            // Indexes for performance
            $table->index(['category', 'is_active']);
            $table->index(['is_featured', 'is_active']);
            $table->index(['event_date', 'is_active']);
            $table->index('display_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallery_images');
    }
};
