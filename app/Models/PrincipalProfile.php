<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrincipalProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'position',
        'email',
        'phone',
        'bio',
        'leadership_profile',
        'office_hours',
        'profile_image',
        'contact_info',
        'office_hours_detail',
        'is_active',
    ];

    protected $casts = [
        'contact_info' => 'array',
        'office_hours_detail' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get the awards for this principal.
     */
    public function awards()
    {
        return $this->hasMany(PrincipalAward::class, 'principal_profile_id')
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('award_year', 'desc');
    }

    /**
     * Scope a query to only include active principal profiles.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}

