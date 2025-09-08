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
};
