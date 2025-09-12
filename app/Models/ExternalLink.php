<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExternalLink extends Model
{
    protected $fillable = [
        'title',
        'description',
        'url',
        'category',
        'icon',
        'color',
        'is_active',
        'display_order',
        'click_count',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
        'click_count' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('created_at');
    }

    public function incrementClickCount()
    {
        $this->increment('click_count');
    }
}
