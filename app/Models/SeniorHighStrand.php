<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeniorHighStrand extends Model
{
    use HasFactory;

    protected $fillable = [
        'strand_id',
        'title',
        'short_title',
        'header_title',
        'description',
        'features',
        'color',
        'bg_color',
        'border_color',
        'icon',
        'gradient',
        'image_path',
        'career_paths',
        'strand_overview',
        'career_guide_intro',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'features' => 'array',
        'career_paths' => 'array',
        'strand_overview' => 'array',
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    /**
     * Scope a query to only include active strands.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to order by display order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('short_title');
    }

    /**
     * Scope a query to filter by strand ID.
     */
    public function scopeByStrandId($query, $strandId)
    {
        return $query->where('strand_id', $strandId);
    }
}
