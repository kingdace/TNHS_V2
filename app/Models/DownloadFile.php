<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DownloadFile extends Model
{
    protected $fillable = [
        'name',
        'description',
        'file_path',
        'file_type',
        'file_size',
        'category',
        'download_count',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'download_count' => 'integer',
        'display_order' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('created_at');
    }

    public function incrementDownloadCount()
    {
        $this->increment('download_count');
    }
}
