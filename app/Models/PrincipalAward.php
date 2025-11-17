<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrincipalAward extends Model
{
    use HasFactory;

    protected $fillable = [
        'principal_profile_id',
        'title',
        'description',
        'award_year',
        'level',
        'issuing_organization',
        'category',
        'image_path',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    /**
     * Get the principal profile that owns this award.
     */
    public function principalProfile()
    {
        return $this->belongsTo(PrincipalProfile::class, 'principal_profile_id');
    }

    /**
     * Scope a query to only include active awards.
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
        return $query->orderBy('display_order')->orderBy('award_year', 'desc');
    }

    /**
     * Scope a query to filter by level.
     */
    public function scopeByLevel($query, $level)
    {
        return $query->where('level', $level);
    }
}

