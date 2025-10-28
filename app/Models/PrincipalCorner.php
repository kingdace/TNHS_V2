<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrincipalCorner extends Model
{
    use HasFactory;

    protected $table = 'principal_corner';

    protected $fillable = [
        'title',
        'content',
        'excerpt',
        'content_type',
        'author',
        'image_path',
        'attachments',
        'is_featured',
        'is_active',
        'display_order',
        'published_at',
    ];

    protected $casts = [
        'attachments' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'display_order' => 'integer',
        'published_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active content.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include featured content.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to filter by content type.
     */
    public function scopeByType($query, $type)
    {
        return $query->where('content_type', $type);
    }

    /**
     * Scope a query to order by display order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('published_at', 'desc');
    }

    /**
     * Scope a query to only include published content.
     */
    public function scopePublished($query)
    {
        return $query->where(function ($q) {
            $q->whereNull('published_at')
              ->orWhere('published_at', '<=', now());
        });
    }

    /**
     * Get the read time estimate for the content.
     */
    public function getReadTimeAttribute()
    {
        $wordCount = str_word_count(strip_tags($this->content));
        $readTime = ceil($wordCount / 200); // Average reading speed: 200 words per minute
        return $readTime . ' min read';
    }
}
