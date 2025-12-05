/**
 * Enhanced Search Service
 * Provides comprehensive search functionality across multiple content types
 */
class SearchService {
    constructor() {
        this.baseURL = "/api";
        this.cache = new Map();
        this.debounceTimer = null;
        this.suggestionTimer = null;
        this.CACHE_TTL = 5 * 60 * 1000; // 5 minutes
        this.DEBOUNCE_DELAY = 300; // 300ms
    }

    /**
     * Perform global search across all content types
     * @param {string} query - Search query
     * @param {Object} options - Search options
     * @returns {Promise<Object>} Search results
     */
    async globalSearch(query, options = {}) {
        const { categories = [], limit = 20, useCache = true } = options;

        if (!query || query.trim().length < 2) {
            return {
                success: true,
                data: {},
                total_results: 0,
                message: "Please enter at least 2 characters to search",
            };
        }

        const cacheKey = this.generateCacheKey(query, categories, limit);

        // Check cache first
        if (useCache && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.CACHE_TTL) {
                return cached.data;
            } else {
                this.cache.delete(cacheKey);
            }
        }

        try {
            const params = new URLSearchParams({
                q: query.trim(),
                limit: limit.toString(),
            });

            if (categories.length > 0) {
                params.append("categories", categories.join(","));
            }

            const response = await fetch(`${this.baseURL}/search?${params}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(
                    `Search failed: ${response.status} ${response.statusText}`
                );
            }

            const result = await response.json();

            // Cache successful results
            if (useCache && result.success) {
                this.cache.set(cacheKey, {
                    data: result,
                    timestamp: Date.now(),
                });

                // Clean up old cache entries
                this.cleanupCache();
            }

            return result;
        } catch (error) {
            console.error("Search error:", error);
            return {
                success: false,
                error: error.message || "Search failed. Please try again.",
                data: {},
                total_results: 0,
            };
        }
    }

    /**
     * Debounced search - delays search execution until user stops typing
     * @param {string} query - Search query
     * @param {Function} callback - Callback function to handle results
     * @param {number} delay - Debounce delay in milliseconds
     */
    debouncedSearch(query, callback, delay = this.DEBOUNCE_DELAY) {
        clearTimeout(this.debounceTimer);

        if (!query || query.trim().length < 2) {
            callback({
                success: true,
                data: {},
                total_results: 0,
            });
            return;
        }

        this.debounceTimer = setTimeout(async () => {
            try {
                const result = await this.globalSearch(query);
                callback(result);
            } catch (error) {
                callback({
                    success: false,
                    error: error.message,
                    data: {},
                    total_results: 0,
                });
            }
        }, delay);
    }

    /**
     * Get search suggestions
     * @param {string} query - Partial search query
     * @returns {Promise<Array>} Array of suggestions
     */
    async getSearchSuggestions(query) {
        if (!query || query.trim().length < 1) {
            return this.getPopularSearches();
        }

        try {
            const params = new URLSearchParams({ q: query.trim() });
            const response = await fetch(
                `${this.baseURL}/search/suggestions?${params}`
            );

            if (!response.ok) {
                throw new Error(`Suggestions failed: ${response.status}`);
            }

            const result = await response.json();
            return result.success ? result.suggestions : [];
        } catch (error) {
            console.error("Suggestions error:", error);
            return this.getPopularSearches();
        }
    }

    /**
     * Debounced suggestions
     * @param {string} query - Search query
     * @param {Function} callback - Callback function
     * @param {number} delay - Debounce delay
     */
    debouncedSuggestions(query, callback, delay = 200) {
        clearTimeout(this.suggestionTimer);

        this.suggestionTimer = setTimeout(async () => {
            try {
                const suggestions = await this.getSearchSuggestions(query);
                callback(suggestions);
            } catch (error) {
                callback([]);
            }
        }, delay);
    }

    /**
     * Get popular search terms
     * @returns {Array} Popular search terms
     */
    getPopularSearches() {
        return [
            "enrollment",
            "events",
            "announcements",
            "calendar",
            "senior high school",
            "junior high school",
            "STEM strand",
            "HUMSS",
            "TVL",
            "ABM",
            "GAS",
            "arts and design",
        ];
    }

    /**
     * Get search categories with metadata
     * @returns {Array} Search categories
     */
    getSearchCategories() {
        return [
            {
                type: "announcements",
                label: "Announcements",
                icon: "📢",
                description: "School news and updates",
                color: "bg-blue-500",
            },
            {
                type: "events",
                label: "Events",
                icon: "📅",
                description: "School calendar and activities",
                color: "bg-green-500",
            },
            {
                type: "academics",
                label: "Academic Pages",
                icon: "🏫",
                description: "Junior High, Senior High, Strands",
                color: "bg-teal-500",
            },
        ];
    }

    /**
     * Format search results for display
     * @param {Object} results - Raw search results
     * @returns {Object} Formatted results
     */
    formatResults(results) {
        if (!results.success || !results.data) {
            return { categories: [], totalResults: 0 };
        }

        const categories = this.getSearchCategories();
        const formattedCategories = [];

        categories.forEach((category) => {
            const categoryResults = results.data[category.type];
            if (categoryResults && categoryResults.length > 0) {
                formattedCategories.push({
                    ...category,
                    results: categoryResults,
                    count: categoryResults.length,
                });
            }
        });

        const formatted = {
            categories: formattedCategories,
            totalResults: results.total_results || 0,
            query: results.query,
        };

        console.log("🎨 Final formatted results:", formatted);
        return formatted;
    }

    /**
     * Generate cache key
     * @param {string} query - Search query
     * @param {Array} categories - Selected categories
     * @param {number} limit - Result limit
     * @returns {string} Cache key
     */
    generateCacheKey(query, categories, limit) {
        return `search:${query.toLowerCase()}:${categories
            .sort()
            .join(",")}:${limit}`;
    }

    /**
     * Clean up old cache entries
     */
    cleanupCache() {
        const now = Date.now();
        for (const [key, value] of this.cache.entries()) {
            if (now - value.timestamp > this.CACHE_TTL) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * Clear all cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Cancel pending requests
     */
    cancelPendingRequests() {
        clearTimeout(this.debounceTimer);
        clearTimeout(this.suggestionTimer);
    }

    /**
     * Get result type icon
     * @param {string} type - Result type
     * @returns {string} Icon emoji
     */
    getResultIcon(type) {
        const icons = {
            announcement: "📢",
            event: "📅",
            staff: "👤",
            program: "🎓",
            academic_level: "🏫",
            strand: "📚",
            principal_post: "👨‍💼",
            award: "🏆",
            resource: "📄",
            external_link: "🔗",
        };
        return icons[type] || "📄";
    }

    /**
     * Get result type label
     * @param {string} type - Result type
     * @returns {string} Human-readable label
     */
    getResultTypeLabel(type) {
        const labels = {
            announcement: "Announcement",
            event: "Event",
            staff: "Staff Member",
            program: "Academic Program",
            academic_level: "Academic Level",
            strand: "Academic Strand",
            principal_post: "Principal Message",
            award: "Award",
            resource: "Resource",
            external_link: "External Link",
        };
        return labels[type] || "Content";
    }

    /**
     * Track search analytics (placeholder for future implementation)
     * @param {string} query - Search query
     * @param {number} resultCount - Number of results
     */
    trackSearch(query, resultCount) {
        // Placeholder for analytics tracking
        // Could send to analytics service or store locally
        console.log(`Search tracked: "${query}" - ${resultCount} results`);
    }
}

// Create and export singleton instance
export const searchService = new SearchService();
export default searchService;
