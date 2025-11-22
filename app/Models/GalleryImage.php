<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GalleryImage extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'category',
        'image_path',
        'thumbnail_path',
        'alt_text',
        'tags',
        'event_date',
        'photographer',
        'is_featured',
        'is_active',
        'view_count',
        'like_count',
        'display_order',
    ];

    protected $casts = [
        'tags' => 'array',
        'event_date' => 'date',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'view_count' => 'integer',
        'like_count' => 'integer',
        'display_order' => 'integer',
    ];

    protected $dates = ['deleted_at'];

    /**
     * Scope for active images
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for featured images
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope by category
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope for ordering
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('created_at', 'desc')->orderBy('display_order');
    }

    /**
     * Scope for search
     */
    public function scopeSearch($query, $term)
    {
        return $query->where(function($q) use ($term) {
            $q->where('title', 'like', "%{$term}%")
              ->orWhere('description', 'like', "%{$term}%")
              ->orWhere('alt_text', 'like', "%{$term}%")
              ->orWhereJsonContains('tags', $term);
        });
    }

    /**
     * Increment view count
     */
    public function incrementViewCount()
    {
        $this->increment('view_count');
    }

    /**
     * Increment like count
     */
    public function incrementLikeCount()
    {
        $this->increment('like_count');
    }

    /**
     * Get full image URL
     */
    public function getImageUrlAttribute()
    {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }

    /**
     * Get thumbnail URL
     */
    public function getThumbnailUrlAttribute()
    {
        return $this->thumbnail_path ? asset('storage/' . $this->thumbnail_path) : $this->image_url;
    }

    /**
     * Get formatted tags
     */
    public function getFormattedTagsAttribute()
    {
        return $this->tags ? implode(', ', $this->tags) : '';
    }

    /**
     * Available categories
     */
    public static function getCategories()
    {
        return [
            'events' => 'School Events',
            'academic' => 'Academic Life',
            'sports' => 'Sports & Recreation',
            'arts' => 'Arts & Culture',
            'facilities' => 'Facilities & Campus',
            'community' => 'Community Engagement',
        ];
    }

    /**
     * Get category label
     */
    public function getCategoryLabelAttribute()
    {
        $categories = self::getCategories();
        return $categories[$this->category] ?? $this->category;
    }
}
