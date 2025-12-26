<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'gallery_image_id',
        'guest_id',
        'comment_text',
        'browser_fingerprint',
        'ip_address',
        'is_flagged',
    ];

    protected $casts = [
        'is_flagged' => 'boolean',
        'created_at' => 'datetime',
    ];

    /**
     * Get the gallery image that owns the comment
     */
    public function galleryImage()
    {
        return $this->belongsTo(GalleryImage::class);
    }

    /**
     * Scope to get only non-flagged comments
     */
    public function scopeNotFlagged($query)
    {
        return $query->where('is_flagged', false);
    }

    /**
     * Scope to order by newest first
     */
    public function scopeNewest($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
