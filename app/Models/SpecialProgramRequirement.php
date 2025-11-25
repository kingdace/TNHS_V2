<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialProgramRequirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_id',
        'requirement_text',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    /**
     * Get the program that owns this requirement.
     */
    public function program()
    {
        return $this->belongsTo(SpecialProgram::class, 'program_id', 'program_id');
    }

    /**
     * Scope a query to only include active requirements.
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
        return $query->orderBy('display_order');
    }

    /**
     * Scope a query to filter by program.
     */
    public function scopeByProgram($query, $programId)
    {
        return $query->where('program_id', $programId);
    }
}
