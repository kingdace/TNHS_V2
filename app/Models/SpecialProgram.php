<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialProgram extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_id',
        'name',
        'description',
        'icon',
        'color_gradient',
        'bg_color',
        'border_color',
        'notes',
        'features',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'features' => 'array',
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    /**
     * Get the requirements for this program.
     */
    public function requirements()
    {
        return $this->hasMany(SpecialProgramRequirement::class, 'program_id', 'program_id')
                    ->where('is_active', true)
                    ->orderBy('display_order');
    }

    /**
     * Get the processes for this program.
     */
    public function processes()
    {
        return $this->hasMany(SpecialProgramProcess::class, 'program_id', 'program_id')
                    ->where('is_active', true)
                    ->orderBy('step_number');
    }

    /**
     * Scope a query to only include active programs.
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
        return $query->orderBy('display_order')->orderBy('name');
    }

    /**
     * Get program by program_id.
     */
    public function scopeByProgramId($query, $programId)
    {
        return $query->where('program_id', $programId);
    }
}
