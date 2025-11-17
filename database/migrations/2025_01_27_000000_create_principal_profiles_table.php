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
        Schema::create('principal_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('position');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->text('bio')->nullable();
            $table->text('leadership_profile')->nullable();
            $table->text('office_hours')->nullable();
            $table->string('profile_image')->nullable();
            $table->json('contact_info')->nullable(); // For additional contact details
            $table->json('office_hours_detail')->nullable(); // Detailed office hours
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('principal_profiles');
    }
};

