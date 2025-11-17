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
        Schema::create('principal_awards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('principal_profile_id')->nullable()->constrained('principal_profiles')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('award_year');
            $table->enum('level', ['local', 'provincial', 'regional', 'national', 'international']);
            $table->string('issuing_organization')->nullable();
            $table->string('category')->nullable(); // Achievement, Service, Excellence, etc.
            $table->string('image_path')->nullable();
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('principal_awards');
    }
};

