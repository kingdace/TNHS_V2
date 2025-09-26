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
        Schema::create('quality_policies', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default('QUALITY POLICY');
            $table->text('intro_statement');
            $table->text('concluding_statement');
            $table->json('key_points'); // Array of the 6 key points
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quality_policies');
    }
};
