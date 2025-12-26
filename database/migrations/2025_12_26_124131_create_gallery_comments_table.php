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
        Schema::create('gallery_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_image_id')->constrained('gallery_images')->onDelete('cascade');
            $table->string('guest_id', 10); // e.g., "A7B2F1"
            $table->text('comment_text');
            $table->string('browser_fingerprint', 64)->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->boolean('is_flagged')->default(false);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('gallery_image_id');
            $table->index('guest_id');
            $table->index('created_at');
            $table->index('is_flagged');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallery_comments');
    }
};
