<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Event;
use App\Models\StaffProfile;
use App\Models\AcademicProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class SearchController extends Controller
{
    /**
     * Global search across multiple content types
     */
    public function globalSearch(Request $request)
    {
        try {
            $query = trim($request->get('q', ''));
            $categories = $request->get('categories', []);
            $limit = min((int) $request->get('limit', 20), 50);

            // Handle categories as comma-separated string
            if (is_string($categories)) {
                $categories = array_filter(explode(',', $categories));
            }

            // Validate query length
            if (strlen($query) < 2) {
                return response()->json([
                    'success' => true,
                    'data' => [],
                    'query' => $query,
                    'total_results' => 0,
                    'message' => 'Query too short. Please enter at least 2 characters.'
                ]);
            }

            $results = [];

            // Search Announcements (PUBLIC)
            if (empty($categories) || in_array('announcements', $categories)) {
                $results['announcements'] = $this->searchAnnouncements($query, $limit);
            }

            // Search Events (PUBLIC)
            if (empty($categories) || in_array('events', $categories)) {
                $results['events'] = $this->searchEvents($query, $limit);
            }

            // Search Academic Content (PUBLIC - JHS, SHS, Strands)
            if (empty($categories) || in_array('academics', $categories)) {
                $results['academics'] = $this->searchHardcodedAcademics($query, $limit);
            }

            $totalResults = array_sum(array_map('count', $results));

            return response()->json([
                'success' => true,
                'data' => $results,
                'query' => $query,
                'total_results' => $totalResults,
                'categories_searched' => empty($categories) ? $this->getAllCategories() : $categories
            ]);

        } catch (\Exception $e) {
            Log::error('Search error: ' . $e->getMessage(), [
                'query' => $request->get('q'),
                'categories' => $request->get('categories'),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Search failed: ' . $e->getMessage(),
                'data' => [],
                'total_results' => 0
            ], 500);
        }
    }

    /**
     * Search announcements
     */
    private function searchAnnouncements($query, $limit)
    {
        try {
            return Announcement::where('status', 'published')
                ->where(function($q) use ($query) {
                    $q->where('title', 'LIKE', "%{$query}%")
                      ->orWhere('content', 'LIKE', "%{$query}%")
                      ->orWhere('author', 'LIKE', "%{$query}%");
                })
                ->latest('published_at')
                ->limit($limit)
                ->get()
                ->map(function($item) use ($query) {
                    return [
                        'id' => $item->id,
                        'type' => 'announcement',
                        'title' => $item->title,
                        'excerpt' => Str::limit(strip_tags($item->content), 120),
                        'category' => 'Announcement',
                        'date' => $item->published_at?->format('M j, Y'),
                        'url' => "/announcements/{$item->id}",
                        'image' => $item->image_path ? "/storage/{$item->image_path}" : null,
                        'relevance_score' => $this->calculateRelevance($query, [$item->title, $item->content, $item->author])
                    ];
                })
                ->sortByDesc('relevance_score')
                ->values()
                ->toArray();
        } catch (\Exception $e) {
            Log::error('Error searching announcements: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Search events
     */
    private function searchEvents($query, $limit)
    {
        try {
            return Event::where('is_active', true)
                ->where(function($q) use ($query) {
                    $q->where('title', 'LIKE', "%{$query}%")
                      ->orWhere('description', 'LIKE', "%{$query}%")
                      ->orWhere('event_type', 'LIKE', "%{$query}%")
                      ->orWhere('location', 'LIKE', "%{$query}%");
                })
                ->latest('start_date')
                ->limit($limit)
                ->get()
                ->map(function($item) use ($query) {
                    return [
                        'id' => $item->id,
                        'type' => 'event',
                        'title' => $item->title,
                        'excerpt' => Str::limit(strip_tags($item->description ?? ''), 120),
                        'category' => $item->event_type,
                        'date' => $item->start_date?->format('M j, Y'),
                        'url' => "/events/{$item->id}",
                        'image' => $item->image_path ? "/storage/{$item->image_path}" : null,
                        'relevance_score' => $this->calculateRelevance($query, [$item->title, $item->description, $item->event_type, $item->location])
                    ];
                })
                ->sortByDesc('relevance_score')
                ->values()
                ->toArray();
        } catch (\Exception $e) {
            Log::error('Error searching events: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Search staff profiles
     */
    private function searchStaff($query, $limit)
    {
        try {
            return StaffProfile::where('is_active', true)
                ->where(function($q) use ($query) {
                    $q->where('name', 'LIKE', "%{$query}%")
                      ->orWhere('position', 'LIKE', "%{$query}%")
                      ->orWhere('department', 'LIKE', "%{$query}%");
                })
                ->orderBy('name')
                ->limit($limit)
                ->get()
                ->map(function($item) use ($query) {
                    return [
                        'id' => $item->id,
                        'type' => 'staff',
                        'title' => $item->name,
                        'excerpt' => $item->position . ($item->department ? ' - ' . $item->department : ''),
                        'category' => $item->staff_type ?? 'Staff',
                        'url' => "/faculty/staff/{$item->id}",
                        'image' => $item->image_path ? "/storage/{$item->image_path}" : null,
                        'relevance_score' => $this->calculateRelevance($query, [$item->name, $item->position, $item->department])
                    ];
                })
                ->sortByDesc('relevance_score')
                ->values()
                ->toArray();
        } catch (\Exception $e) {
            Log::error('Error searching staff: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Search academic programs
     */
    private function searchAcademicPrograms($query, $limit)
    {
        try {
            return AcademicProgram::where('is_active', true)
                ->where(function($q) use ($query) {
                    $q->where('program_name', 'LIKE', "%{$query}%")
                      ->orWhere('description', 'LIKE', "%{$query}%")
                      ->orWhere('program_type', 'LIKE', "%{$query}%");
                })
                ->orderBy('display_order')
                ->limit($limit)
                ->get()
                ->map(function($item) use ($query) {
                    return [
                        'id' => $item->id,
                        'type' => 'program',
                        'title' => $item->program_name,
                        'excerpt' => Str::limit(strip_tags($item->description ?? ''), 120),
                        'category' => $item->program_type,
                        'url' => "/academics/programs/{$item->id}",
                        'image' => null,
                        'relevance_score' => $this->calculateRelevance($query, [$item->program_name, $item->description, $item->program_type])
                    ];
                })
                ->sortByDesc('relevance_score')
                ->values()
                ->toArray();
        } catch (\Exception $e) {
            Log::error('Error searching academic programs: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Search hard-coded academic content
     */
    private function searchHardcodedAcademics($query, $limit)
    {
        $hardcodedContent = [
            [
                'id' => 'junior-high',
                'type' => 'academic_level',
                'title' => 'Junior High School',
                'excerpt' => 'Comprehensive education program for Grades 7-10 students with focus on foundational learning and character development.',
                'category' => 'Academic Level',
                'url' => '/academics/junior-high',
                'image' => '/images/JHS.jpg',
                'keywords' => ['junior', 'high', 'school', 'grades', '7', '8', '9', '10', 'jhs', 'secondary']
            ],
            [
                'id' => 'senior-high',
                'type' => 'academic_level',
                'title' => 'Senior High School',
                'excerpt' => 'Specialized education program for Grades 11-12 with multiple strands: STEM, HUMSS, GAS, ABM, TVL, and Arts & Design.',
                'category' => 'Academic Level',
                'url' => '/academics/senior-high',
                'image' => '/images/SHS.jpg',
                'keywords' => ['senior', 'high', 'school', 'grades', '11', '12', 'shs', 'stem', 'humss', 'gas', 'abm', 'tvl', 'arts', 'design']
            ],
            [
                'id' => 'stem-strand',
                'type' => 'strand',
                'title' => 'STEM Strand',
                'excerpt' => 'Science, Technology, Engineering, and Mathematics strand for students interested in scientific and technical fields.',
                'category' => 'Senior High Strand',
                'url' => '/academics/senior-high#stem',
                'image' => null,
                'keywords' => ['stem', 'science', 'technology', 'engineering', 'mathematics']
            ],
            [
                'id' => 'humss-strand',
                'type' => 'strand',
                'title' => 'HUMSS Strand',
                'excerpt' => 'Humanities and Social Sciences strand focusing on human behavior, society, and social relationships.',
                'category' => 'Senior High Strand',
                'url' => '/academics/senior-high#humss',
                'image' => null,
                'keywords' => ['humss', 'humanities', 'social', 'sciences']
            ]
        ];

        $queryLower = strtolower($query);
        $results = [];

        foreach ($hardcodedContent as $content) {
            $relevanceScore = 0;

            // Check title match
            if (stripos($content['title'], $query) !== false) {
                $relevanceScore += 10;
            }

            // Check excerpt match
            if (stripos($content['excerpt'], $query) !== false) {
                $relevanceScore += 5;
            }

            // Check keywords match
            foreach ($content['keywords'] as $keyword) {
                if (stripos($keyword, $queryLower) !== false || stripos($queryLower, $keyword) !== false) {
                    $relevanceScore += 2;
                }
            }

            if ($relevanceScore > 0) {
                $content['relevance_score'] = $relevanceScore;
                unset($content['keywords']);
                $results[] = $content;
            }
        }

        // Sort by relevance and limit results
        usort($results, function($a, $b) {
            return $b['relevance_score'] <=> $a['relevance_score'];
        });

        return array_slice($results, 0, $limit);
    }

    /**
     * Calculate relevance score
     */
    private function calculateRelevance($query, $fields)
    {
        $score = 0;
        $queryLower = strtolower($query);

        foreach ($fields as $field) {
            if (!$field) continue;

            $fieldLower = strtolower($field);

            if ($fieldLower === $queryLower) {
                $score += 20;
            } elseif (strpos($fieldLower, $queryLower) === 0) {
                $score += 15;
            } elseif (strpos($fieldLower, $queryLower) !== false) {
                $score += 10;
            }
        }

        return $score;
    }

    /**
     * Get all available search categories (PUBLIC ONLY)
     */
    private function getAllCategories()
    {
        return [
            'announcements',
            'events',
            'academics'
        ];
    }

    /**
     * Get search suggestions
     */
    public function getSearchSuggestions(Request $request)
    {
        $query = trim($request->get('q', ''));

        if (strlen($query) < 2) {
            return response()->json([
                'success' => true,
                'suggestions' => $this->getPopularSearches()
            ]);
        }

        $suggestions = [];

        // Add hardcoded suggestions
        $hardcoded = [
            'junior high school',
            'senior high school',
            'stem strand',
            'humss strand',
            'gas strand',
            'abm strand',
            'tvl strand',
            'arts and design',
            'principal',
            'faculty',
            'staff',
            'events',
            'announcements'
        ];

        $hardcodedMatches = array_filter($hardcoded, function($item) use ($query) {
            return stripos($item, $query) === 0;
        });

        $suggestions = array_slice($hardcodedMatches, 0, 8);

        return response()->json([
            'success' => true,
            'suggestions' => $suggestions
        ]);
    }

    /**
     * Get popular search terms
     */
    private function getPopularSearches()
    {
        return [
            'enrollment',
            'events',
            'principal',
            'teachers',
            'senior high',
            'junior high',
            'stem',
            'announcements'
        ];
    }
}
