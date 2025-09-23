<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HeroCarousel extends Model
{
    use SoftDeletes;

    protected $table = 'hero_carousel';

    protected $fillable = [
        'title',
        'subtitle',
        'description',
        'image_path',
        'cta_text',
        'cta_link',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order');
    }
}
