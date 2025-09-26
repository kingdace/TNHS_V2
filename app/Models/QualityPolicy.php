<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QualityPolicy extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'intro_statement',
        'concluding_statement',
        'key_points',
        'is_active',
    ];

    protected $casts = [
        'key_points' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Scope a query to only include active policies.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
