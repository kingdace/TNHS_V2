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
        Schema::create('privacy_policies', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default('Privacy Policy');
            $table->text('introduction');
            $table->json('information_collected'); // Array of information types
            $table->json('how_we_use'); // Array of usage purposes
            $table->json('data_protection'); // Array of protection measures
            $table->json('your_rights'); // Array of user rights
            $table->text('policy_updates');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('privacy_policies');
    }
};
