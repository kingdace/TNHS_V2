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
        // Rich content fields
        'page_content',
        'program_benefits',
        'why_choose_features',
        'admission_requirements',
        'images',
        'curriculum_highlights',
        'facilities',
        'extracurricular_activities',
        // SEO fields
        'meta_title',
        'meta_description',
        'meta_keywords',
        // Display settings
        'featured',
        'banner_color',
        'theme_color',
    ];

    protected $casts = [
        'subjects' => 'array',
        'is_active' => 'boolean',
        'display_order' => 'integer',
        'grade_level' => 'integer',
        // Rich content casts
        'page_content' => 'array',
        'program_benefits' => 'array',
        'why_choose_features' => 'array',
        'admission_requirements' => 'array',
        'images' => 'array',
        'curriculum_highlights' => 'array',
        'facilities' => 'array',
        'extracurricular_activities' => 'array',
        'meta_keywords' => 'array',
        'featured' => 'boolean',
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

    /**
     * Scope a query to only include featured programs.
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    /**
     * Get the page title for SEO.
     */
    public function getPageTitleAttribute()
    {
        return $this->meta_title ?: $this->program_name;
    }

    /**
     * Get the page description for SEO.
     */
    public function getPageDescriptionAttribute()
    {
        return $this->meta_description ?: $this->description;
    }

    /**
     * Get formatted program benefits for display.
     */
    public function getFormattedBenefitsAttribute()
    {
        if (!$this->program_benefits) {
            return [];
        }

        return collect($this->program_benefits)->map(function ($benefit) {
            return [
                'id' => $benefit['id'] ?? uniqid(),
                'title' => $benefit['title'] ?? '',
                'description' => $benefit['description'] ?? '',
                'icon' => $benefit['icon'] ?? '📚',
                'color' => $benefit['color'] ?? 'blue',
            ];
        });
    }

    /**
     * Get formatted why choose features for display.
     */
    public function getFormattedFeaturesAttribute()
    {
        if (!$this->why_choose_features) {
            return [];
        }

        return collect($this->why_choose_features)->map(function ($feature) {
            return [
                'id' => $feature['id'] ?? uniqid(),
                'text' => $feature['text'] ?? '',
                'color' => $feature['color'] ?? 'green',
            ];
        });
    }

    /**
     * Get formatted admission requirements for display.
     */
    public function getFormattedRequirementsAttribute()
    {
        if (!$this->admission_requirements) {
            return ['documents' => [], 'schedule' => []];
        }

        return [
            'documents' => $this->admission_requirements['documents'] ?? [],
            'schedule' => $this->admission_requirements['schedule'] ?? [],
        ];
    }

    /**
     * Get page content with defaults.
     */
    public function getPageContentWithDefaultsAttribute()
    {
        $defaults = [
            'header_title' => 'Academic Program',
            'main_description' => $this->description ?? '',
            'section_titles' => [
                'benefits' => 'PROGRAM BENEFITS',
                'features' => 'Why Choose This Program?',
                'requirements' => 'Admission Requirements',
            ],
        ];

        return array_merge($defaults, $this->page_content ?? []);
    }

    /**
     * Get images with defaults.
     */
    public function getImagesWithDefaultsAttribute()
    {
        $defaults = [
            'logo' => '/images/default-logo.jpg',
            'academic_excellence' => '/images/default-academic.jpg',
            'student_life' => '/images/default-student-life.jpg',
        ];

        return array_merge($defaults, $this->images ?? []);
    }
}
