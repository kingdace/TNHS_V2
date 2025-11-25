<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnrollmentProcess extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'step_text',
        'step_number',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'step_number' => 'integer',
    ];

    /**
     * Get the category that owns this process.
     */
    public function category()
    {
        return $this->belongsTo(EnrollmentCategory::class, 'category_id', 'category_id');
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
     * Scope a query to filter by category.
     */
    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }
}
