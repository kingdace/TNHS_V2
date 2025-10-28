<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Announcement extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'content',
        'content_html',
        'author',
        'image_path',
        'images',
        'external_link',
        'category',
        'status',
        'is_featured',
        'published_at',
        'scheduled_publish_at',
        'scheduled_unpublish_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'scheduled_publish_at' => 'datetime',
        'scheduled_unpublish_at' => 'datetime',
        'is_featured' => 'boolean',
        'images' => 'array',
    ];

    protected $appends = [
        'formatted_published_at',
        'formatted_scheduled_publish_at',
        'formatted_scheduled_unpublish_at',
        'is_scheduled',
        'publish_date_for_form',
        'unpublish_date_for_form',
    ];

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function scopeArchived($query)
    {
        return $query->where('status', 'archived');
    }

    /**
     * Get formatted published date
     */
    public function getFormattedPublishedAtAttribute()
    {
        if (!$this->published_at) {
            return null;
        }

        return $this->published_at->format('M j, Y \a\t g:i A');
    }

    /**
     * Get formatted scheduled publish date
     */
    public function getFormattedScheduledPublishAtAttribute()
    {
        if (!$this->scheduled_publish_at) {
            return null;
        }

        return $this->scheduled_publish_at->format('M j, Y \a\t g:i A');
    }

    /**
     * Get formatted scheduled unpublish date
     */
    public function getFormattedScheduledUnpublishAtAttribute()
    {
        if (!$this->scheduled_unpublish_at) {
            return null;
        }

        return $this->scheduled_unpublish_at->format('M j, Y \a\t g:i A');
    }

    /**
     * Check if announcement is scheduled
     */
    public function getIsScheduledAttribute()
    {
        return !is_null($this->scheduled_publish_at) || !is_null($this->scheduled_unpublish_at);
    }

    /**
     * Get publish date in datetime-local format for forms
     */
    public function getPublishDateForFormAttribute()
    {
        return $this->scheduled_publish_at ? $this->scheduled_publish_at->format('Y-m-d\TH:i') : null;
    }

    /**
     * Get unpublish date in datetime-local format for forms
     */
    public function getUnpublishDateForFormAttribute()
    {
        return $this->scheduled_unpublish_at ? $this->scheduled_unpublish_at->format('Y-m-d\TH:i') : null;
    }

    /**
     * Scope to get announcements that should be published now
     */
    public function scopeShouldBePublished($query)
    {
        return $query->where('status', 'draft')
                    ->where('scheduled_publish_at', '<=', now());
    }

    /**
     * Scope to get announcements that should be unpublished now
     */
    public function scopeShouldBeUnpublished($query)
    {
        return $query->where('status', 'published')
                    ->where('scheduled_unpublish_at', '<=', now());
    }
}
