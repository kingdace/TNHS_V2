<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageContent extends Model
{
    protected $fillable = [
        'page_name',
        'section_name',
        'content_type',
        'content_data',
        'display_order',
        'metadata',
        'title',
        'description',
        'image_url',
        'link_url',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'metadata' => 'array',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeForPage($query, $pageName)
    {
        return $query->where('page_name', $pageName);
    }

    public function scopeForSection($query, $pageName, $sectionName)
    {
        return $query->where('page_name', $pageName)
                    ->where('section_name', $sectionName);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('created_at');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeByContentType($query, $contentType)
    {
        return $query->where('content_type', $contentType);
    }
}
