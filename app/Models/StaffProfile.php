<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffProfile extends Model
{
    protected $fillable = [
        'user_id',
        'staff_type',
        'full_name',
        'position',
        'department',
        'education',
        'experience',
        'achievements',
        'profile_image',
        'contact_info',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
        'contact_info' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('staff_type', $type);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order');
    }
}
