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
        Schema::table('announcements', function (Blueprint $table) {
            $table->string('external_link')->nullable()->after('image_path');
            $table->string('category')->default('General')->after('external_link');
            $table->json('images')->nullable()->after('category');
            $table->text('content_html')->nullable()->after('content');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('announcements', function (Blueprint $table) {
            $table->dropColumn(['external_link', 'category', 'images', 'content_html']);
        });
    }
};
