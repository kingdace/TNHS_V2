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
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
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
}
