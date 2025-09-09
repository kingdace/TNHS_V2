<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicProgram extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_type',
        'grade_level',
        'program_name',
        'description',
        'subjects',
        'requirements',
        'duration',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'subjects' => 'array',
        'is_active' => 'boolean',
        'display_order' => 'integer',
        'grade_level' => 'integer',
    ];

    /**
     * Scope a query to only include active programs.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter by program type.
     */
    public function scopeByType($query, $type)
    {
        return $query->where('program_type', $type);
    }

    /**
     * Scope a query to order by display order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('program_name');
    }

    /**
     * Scope a query to filter by grade level.
     */
    public function scopeByGrade($query, $grade)
    {
        return $query->where('grade_level', $grade);
    }
}
