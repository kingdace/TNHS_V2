<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnrollmentCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'description',
        'icon',
        'color_gradient',
        'bg_color',
        'border_color',
        'notes',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    /**
     * Get the requirements for this category.
     */
    public function requirements()
    {
        return $this->hasMany(EnrollmentRequirement::class, 'category_id', 'category_id')
                    ->where('is_active', true)
                    ->orderBy('display_order');
    }

    /**
     * Get the processes for this category.
     */
    public function processes()
    {
        return $this->hasMany(EnrollmentProcess::class, 'category_id', 'category_id')
                    ->where('is_active', true)
                    ->orderBy('step_number');
    }

    /**
     * Scope a query to only include active categories.
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
     * Get category by category_id.
     */
    public function scopeByCategoryId($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }
}
