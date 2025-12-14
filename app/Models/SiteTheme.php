<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteTheme extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'is_active',
        'colors',
        'description',
    ];

    protected $casts = [
        'colors' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Scope to get the active theme
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Activate this theme and deactivate all others
     */
    public function activate()
    {
        // Deactivate all themes
        self::query()->update(['is_active' => false]);
        
        // Activate this theme
        $this->is_active = true;
        $this->save();
        
        return $this;
    }
}
