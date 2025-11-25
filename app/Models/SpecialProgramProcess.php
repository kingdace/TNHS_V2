<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialProgramProcess extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_id',
        'step_text',
        'step_number',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'step_number' => 'integer',
    ];

    /**
     * Get the program that owns this process.
     */
    public function program()
    {
        return $this->belongsTo(SpecialProgram::class, 'program_id', 'program_id');
    }

    /**
     * Scope a query to only include active processes.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to order by step number.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('step_number');
    }

    /**
     * Scope a query to filter by program.
     */
    public function scopeByProgram($query, $programId)
    {
        return $query->where('program_id', $programId);
    }
}
