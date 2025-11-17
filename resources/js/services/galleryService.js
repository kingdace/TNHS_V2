/**
 * Gallery Service
 * Handles API calls for public gallery functionality
 */

const API_BASE_URL = "/api";

export const galleryService = {
    /**
     * Get all active gallery images
     */
    async getAll(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters);
            const response = await fetch(
                `${API_BASE_URL}/gallery?${queryParams}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching gallery images:", error);
            throw error;
        }
    },

    /**
     * Get gallery images by category
     */
    async getByCategory(category) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/gallery/category/${category}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching gallery images by category:", error);
            throw error;
        }
    },

    /**
     * Get featured gallery images
     */
    async getFeatured() {
        try {
            const response = await fetch(`${API_BASE_URL}/gallery-featured`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching featured gallery images:", error);
            throw error;
        }
    },

    /**
     * Get single gallery image
     */
    async getById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching gallery image:", error);
            throw error;
        }
    },

    /**
     * Increment like count
     */
    async incrementLike(id) {
        try {
            // Get CSRF token
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
            };

            // Add CSRF token if available
            if (csrfToken) {
                headers["X-CSRF-TOKEN"] = csrfToken;
            }

            const response = await fetch(`${API_BASE_URL}/gallery/${id}/like`, {
                method: "POST",
                headers: headers,
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error incrementing like count:", error);
            // Don't throw error for like tracking - it's not critical
            return null;
        }
    },

    /**
     * Get gallery statistics
     */
    async getStatistics() {
        try {
            const response = await fetch(`${API_BASE_URL}/gallery-statistics`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching gallery statistics:", error);
            throw error;
        }
    },

    /**
     * Get available categories
     */
    async getCategories() {
        try {
            const response = await fetch(`${API_BASE_URL}/gallery-categories`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching gallery categories:", error);
            throw error;
        }
    },

    /**
     * Transform image data for display
     */
    transformImage(image) {
        return {
            id: image.id,
            title: image.title,
            description: image.description,
            category: image.category,
            category_label: image.category_label,
            image_url: image.image_url,
            thumbnail_url: image.thumbnail_url,
            alt_text: image.alt_text,
            tags: image.tags || [],
            event_date: image.event_date,
            photographer: image.photographer,
            is_featured: image.is_featured,
            view_count: image.view_count || 0,
            like_count: image.like_count || 0,
            created_at: image.created_at,
            formatted_date: image.event_date
                ? new Date(image.event_date).toLocaleDateString()
                : new Date(image.created_at).toLocaleDateString(),
        };
    },

    /**
     * Get category icon (for UI)
     */
    getCategoryIcon(category) {
        const icons = {
            events: "Calendar",
            academic: "GraduationCap",
            sports: "Trophy",
            arts: "Palette",
            facilities: "Building",
            community: "Users",
        };
        return icons[category] || "Image";
    },

    /**
     * Get category color (for UI)
     */
    getCategoryColor(category) {
        const colors = {
            events: "from-blue-500 to-blue-600",
            academic: "from-green-500 to-green-600",
            sports: "from-orange-500 to-orange-600",
            arts: "from-purple-500 to-purple-600",
            facilities: "from-gray-500 to-gray-600",
            community: "from-red-500 to-red-600",
        };
        return colors[category] || "from-gray-500 to-gray-600";
    },
};
