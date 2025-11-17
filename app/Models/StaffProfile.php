<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffProfile extends Model
{
    protected $fillable = [
        'user_id',
        'staff_type',
        'full_name',
        'position',
        'department',
        'education',
        'experience',
        'achievements',
        'grade_levels',
        'subject_specialization',
        'reports_to',
        'is_department_head',
        'position_level',
        'profile_image',
        'contact_info',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_department_head' => 'boolean',
        'display_order' => 'integer',
        'position_level' => 'integer',
        'contact_info' => 'array',
        'grade_levels' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Organizational hierarchy relationships
    public function supervisor()
    {
        return $this->belongsTo(StaffProfile::class, 'reports_to');
    }

    public function subordinates()
    {
        return $this->hasMany(StaffProfile::class, 'reports_to');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('staff_type', $type);
    }

    public function scopeByGradeLevel($query, $grade)
    {
        return $query->whereJsonContains('grade_levels', $grade);
    }

    public function scopeBySubject($query, $subject)
    {
        return $query->where('subject_specialization', $subject);
    }

    public function scopeDepartmentHeads($query)
    {
        return $query->where('is_department_head', true);
    }

    public function scopeByPositionLevel($query, $level)
    {
        return $query->where('position_level', $level);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('position_level')->orderBy('display_order');
    }
}
