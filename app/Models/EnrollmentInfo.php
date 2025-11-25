<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnrollmentInfo extends Model
{
    use HasFactory;

    protected $table = 'enrollment_info';

    protected $fillable = [
        'card_type',
        'title',
        'content',
        'details',
        'icon',
        'color',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    /**
     * Scope a query to only include active info cards.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter by card type.
     */
    public function scopeByType($query, $type)
    {
        return $query->where('card_type', $type);
    }

    /**
     * Scope a query to order by display order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('title');
    }

    /**
     * Get all card types.
     */
    public static function getCardTypes()
    {
        return [
            'enrollment_period' => 'Enrollment Period',
            'grade_levels' => 'Grade Levels',
            'programs_offered' => 'Programs Offered',
            'special_programs' => 'Special Programs',
        ];
    }
}
