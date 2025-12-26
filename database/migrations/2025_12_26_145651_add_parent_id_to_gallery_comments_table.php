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
            // Add parent_id column for threaded comments
            $table->unsignedBigInteger('parent_id')->nullable()->after('comment_text');
            
            // Add foreign key constraint
            $table->foreign('parent_id')
                  ->references('id')
                  ->on('gallery_comments')
                  ->onDelete('cascade');
            
            // Add index for performance
            $table->index('parent_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gallery_comments', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
            $table->dropIndex(['parent_id']);
            $table->dropColumn('parent_id');
        });
    }
};
