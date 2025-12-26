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
        Schema::table('gallery_comments', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable()->after('gallery_image_id');
            $table->boolean('is_admin')->default(false)->after('is_flagged');
            
            // Add foreign key if users table exists
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gallery_comments', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn(['user_id', 'is_admin']);
        });
    }
};
