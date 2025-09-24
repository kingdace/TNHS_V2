<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'excerpt',
        'event_type',
        'start_date',
        'end_date',
        'location',
        'image_path',
        'is_featured',
        'is_public',
        'slug',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_public' => 'boolean',
        'is_active' => 'boolean',
        'display_order' => 'integer',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    protected $appends = [
        'start_date_for_form',
        'end_date_for_form',
    ];

    /**
     * Get the start_date in datetime-local format for forms
     */
    public function getStartDateForFormAttribute()
    {
        return $this->start_date ? $this->start_date->format('Y-m-d\TH:i') : null;
    }

    /**
     * Get the end_date in datetime-local format for forms
     */
    public function getEndDateForFormAttribute()
    {
        return $this->end_date ? $this->end_date->format('Y-m-d\TH:i') : null;
    }

    /**
     * Scope a query to only include active events.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter by event type.
     */
    public function scopeByType($query, $type)
    {
        return $query->where('event_type', $type);
    }

    /**
     * Scope a query to only include featured events.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to order by display order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('start_date');
    }

    /**
     * Scope a query to filter by date range.
     */
    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('start_date', [$startDate, $endDate]);
    }

    /**
     * Scope a query to get upcoming events.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('start_date', '>=', now());
    }

    /**
     * Scope a query to get past events.
     */
    public function scopePast($query)
    {
        return $query->where('start_date', '<', now());
    }

    /**
     * Get the event duration in a readable format.
     */
    public function getDurationAttribute()
    {
        if (!$this->end_date) {
            return 'All day';
        }

        $start = Carbon::parse($this->start_date);
        $end = Carbon::parse($this->end_date);

        if ($start->isSameDay($end)) {
            return $start->format('g:i A') . ' - ' . $end->format('g:i A');
        }

        return $start->format('M j, Y g:i A') . ' - ' . $end->format('M j, Y g:i A');
    }
}
