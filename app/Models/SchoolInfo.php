<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolInfo extends Model
{
    use HasFactory;

    protected $table = 'school_info';

    protected $fillable = [
        'info_type',
        'title',
        'content',
        'image_path',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    /**
     * Scope a query to only include active info.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter by info type.
     */
    public function scopeByType($query, $type)
    {
        return $query->where('info_type', $type);
    }

    /**
     * Scope a query to order by display order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('title');
    }
}
