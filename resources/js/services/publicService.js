/**
 * Public Service
 * Handles API calls for public website content
 */

const API_BASE_URL = "/api";

export const publicService = {
    /**
     * Hero Carousel - Public endpoints
     */
    heroCarousel: {
        // Get all active hero carousel slides
        async getActive() {
            try {
                const response = await fetch(`${API_BASE_URL}/hero-carousel`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : [];
            } catch (error) {
                console.error("Error fetching hero carousel slides:", error);
                return [];
            }
        },
    },

    /**
     * Announcements - Public endpoints
     */
    announcements: {
        // Get all published announcements
        async getPublished() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/announcements/public`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : [];
            } catch (error) {
                console.error("Error fetching announcements:", error);
                return [];
            }
        },
    },

    /**
     * Events (School Calendar) - Public endpoints
     */
    events: {
        /**
         * Get active events for a specific month (YYYY-MM), optionally filtered by types
         * Used for the homepage calendar component
         */
        async getByMonth(yearMonth, { types = [] } = {}) {
            try {
                const params = new URLSearchParams();
                params.set("month", yearMonth);
                if (types.length) params.set("types", types.join(","));
                const response = await fetch(
                    `${API_BASE_URL}/events/public?${params.toString()}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : [];
            } catch (error) {
                console.error("Error fetching public events:", error);
                return [];
            }
        },

        /**
         * Get public events for the events listing page
         * Returns only events marked as public with pagination
         */
        async getPublicList({
            type = null,
            featuredOnly = false,
            limit = 12,
            page = 1,
        } = {}) {
            try {
                const params = new URLSearchParams();
                if (type) params.set("type", type);
                if (featuredOnly) params.set("featured_only", "1");
                params.set("limit", limit.toString());
                params.set("page", page.toString());

                const response = await fetch(
                    `${API_BASE_URL}/events/public-list?${params.toString()}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success
                    ? data
                    : { data: [], pagination: { total: 0, pages: 0 } };
            } catch (error) {
                console.error("Error fetching public events list:", error);
                return { data: [], pagination: { total: 0, pages: 0 } };
            }
        },
    },

    /**
     * Mission & Vision - Public endpoints
     */
    missions: {
        async getPublic() {
            try {
                const response = await fetch(`${API_BASE_URL}/missions/public`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : [];
            } catch (error) {
                console.error("Error fetching missions:", error);
                return [];
            }
        },
    },

    visions: {
        async getPublic() {
            try {
                const response = await fetch(`${API_BASE_URL}/visions/public`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : [];
            } catch (error) {
                console.error("Error fetching visions:", error);
                return [];
            }
        },
    },

    coreValues: {
        async getPublic() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/core-values/public`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : [];
            } catch (error) {
                console.error("Error fetching core values:", error);
                return [];
            }
        },
    },

    guidingPrinciples: {
        async getPublic() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/guiding-principles/public`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : [];
            } catch (error) {
                console.error("Error fetching guiding principles:", error);
                return [];
            }
        },
    },

    goals: {
        async getPublic(filters = {}) {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await fetch(
                    `${API_BASE_URL}/goal-objectives/public?${query}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : [];
            } catch (error) {
                console.error("Error fetching goals:", error);
                return [];
            }
        },
    },

    /**
     * School Seal - Public endpoints
     */
    schoolSealInfo: {
        async getPublic() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/school-seal-info/public`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : [];
            } catch (error) {
                console.error("Error fetching school seal info:", error);
                return [];
            }
        },
        async getByType(type) {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/school-seal-info/type/${type}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : [];
            } catch (error) {
                console.error(
                    "Error fetching school seal info by type:",
                    error
                );
                return [];
            }
        },
    },

    schoolSealSymbolicElements: {
        async getPublic() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/school-seal-symbolic-elements/public`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : [];
            } catch (error) {
                console.error("Error fetching symbolic elements:", error);
                return [];
            }
        },
    },

    schoolSealCoreValues: {
        async getPublic() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/school-seal-core-values/public`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : [];
            } catch (error) {
                console.error("Error fetching school seal core values:", error);
                return [];
            }
        },
    },
};
