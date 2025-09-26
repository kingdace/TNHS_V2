<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivacyPolicy extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'introduction',
        'information_collected',
        'how_we_use',
        'data_protection',
        'your_rights',
        'policy_updates',
        'is_active',
    ];

    protected $casts = [
        'information_collected' => 'array',
        'how_we_use' => 'array',
        'data_protection' => 'array',
        'your_rights' => 'array',
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
