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
        Schema::table('page_contents', function (Blueprint $table) {
            $table->integer('display_order')->default(0)->after('content_data');
            $table->json('metadata')->nullable()->after('display_order');
            $table->string('title')->nullable()->after('metadata');
            $table->text('description')->nullable()->after('title');
            $table->string('image_url')->nullable()->after('description');
            $table->string('link_url')->nullable()->after('image_url');
            $table->boolean('is_featured')->default(false)->after('link_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'display_order',
                'metadata',
                'title',
                'description',
                'image_url',
                'link_url',
                'is_featured'
            ]);
        });
    }
};
