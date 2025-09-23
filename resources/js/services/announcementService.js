/**
 * Announcement Service
 * Handles fetching announcements from the API
 */

const API_BASE_URL = "/api";
const getHeaders = () => ({
    "Content-Type": "application/json",
    "X-CSRF-TOKEN":
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || "",
});

export const announcementService = {
    /**
     * Fetch all published announcements for public view
     */
    async getPublicAnnouncements({ featured = false } = {}) {
        try {
            const url = new URL(
                `${API_BASE_URL}/announcements/public`,
                window.location.origin
            );
            if (featured) url.searchParams.set("featured", "1");
            const response = await fetch(url.toString(), {
                headers: { Accept: "application/json" },
                credentials: "include",
            });

            console.log("API response status:", response.status);
            console.log("API response ok:", response.ok);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API response data:", data);

            if (data.success) {
                return data.data;
            } else {
                throw new Error("API returned unsuccessful response");
            }
        } catch (error) {
            console.error("Error fetching announcements:", error);
            // Return empty array as fallback
            return [];
        }
    },
    async getFeaturedAnnouncements() {
        return this.getPublicAnnouncements({ featured: true });
    },

    /**
     * Transform announcement data to match the expected format
     */
    transformAnnouncement(announcement) {
        const imageFromUpload = announcement.image_path
            ? `/storage/${announcement.image_path}`
            : null;
        return {
            id: announcement.id,
            title: announcement.title,
            content: announcement.content,
            excerpt: this.truncateText(announcement.content, 150),
            author: announcement.author,
            date: this.formatDate(announcement.published_at),
            category: "Announcements",
            views: Math.floor(Math.random() * 2000) + 500,
            image: imageFromUpload || this.getRandomImage(),
            featured: !!announcement.is_featured,
            tags: this.extractTags(announcement.title), // Extract tags from title
        };
    },

    /**
     * Truncate text to specified length
     */
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + "...";
    },

    /**
     * Format date for display
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    },

    /**
     * Get random image for announcements
     */
    getRandomImage() {
        const images = [
            "/images/BG1.jpg",
            "/images/BG2.jpg",
            "/images/BG3.jpg",
            "/images/BG4.jpg",
        ];
        return images[Math.floor(Math.random() * images.length)];
    },

    /**
     * Extract tags from announcement title
     */
    extractTags(title) {
        const commonTags = [
            "Enrollment",
            "Registration",
            "Technology",
            "Laboratory",
            "Innovation",
            "Awards",
            "Excellence",
            "Ceremony",
            "Conference",
            "Meeting",
            "Sports",
            "Event",
            "Update",
            "Important",
            "Notice",
        ];

        const titleWords = title.toLowerCase().split(" ");
        const matchedTags = commonTags.filter((tag) =>
            titleWords.some(
                (word) =>
                    tag.toLowerCase().includes(word) ||
                    word.includes(tag.toLowerCase())
            )
        );

        return matchedTags.length > 0 ? matchedTags.slice(0, 3) : ["General"];
    },

    /**
     * Admin: list all announcements (requires auth)
     */
    async list() {
        try {
            const response = await fetch(`${API_BASE_URL}/announcements`, {
                headers: { Accept: "application/json" },
                credentials: "include",
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data.data ?? [];
        } catch (error) {
            console.error("Error listing announcements:", error);
            return [];
        }
    },

    /**
     * Admin: create announcement
     */
    async create(payload) {
        try {
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                if (value === undefined || value === null) return;
                if (typeof value === "boolean") {
                    formData.append(key, value ? "1" : "0");
                } else {
                    formData.append(key, value);
                }
            });
            const response = await fetch(`${API_BASE_URL}/announcements`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                    Accept: "application/json",
                },
                credentials: "include",
                body: formData,
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("Error creating announcement:", error);
            throw error;
        }
    },

    /**
     * Admin: update announcement
     */
    async update(id, payload) {
        try {
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                if (value === undefined || value === null) return;
                if (typeof value === "boolean") {
                    formData.append(key, value ? "1" : "0");
                } else {
                    formData.append(key, value);
                }
            });
            // Laravel expects POST with _method=PUT for multipart
            formData.append("_method", "PUT");
            const response = await fetch(
                `${API_BASE_URL}/announcements/${id}`,
                {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                        Accept: "application/json",
                    },
                    credentials: "include",
                    body: formData,
                }
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("Error updating announcement:", error);
            throw error;
        }
    },

    /**
     * Admin: delete announcement
     */
    async remove(id) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/announcements/${id}`,
                {
                    method: "DELETE",
                    headers: { ...getHeaders(), Accept: "application/json" },
                    credentials: "include",
                }
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return true;
        } catch (error) {
            console.error("Error deleting announcement:", error);
            throw error;
        }
    },
    /**
     * Admin: list trashed announcements
     */
    async listTrashed() {
        try {
            const response = await fetch(
                `${API_BASE_URL}/announcements-trashed`,
                {
                    headers: { Accept: "application/json" },
                    credentials: "include",
                }
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data.data ?? [];
        } catch (error) {
            console.error("Error listing trashed announcements:", error);
            return [];
        }
    },

    /**
     * Admin: restore trashed announcement
     */
    async restore(id) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/announcements/${id}/restore`,
                {
                    method: "POST",
                    headers: { ...getHeaders(), Accept: "application/json" },
                    credentials: "include",
                }
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("Error restoring announcement:", error);
            throw error;
        }
    },

    /**
     * Admin: permanently delete trashed announcement
     */
    async forceDelete(id) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/announcements/${id}/force`,
                {
                    method: "DELETE",
                    headers: { ...getHeaders(), Accept: "application/json" },
                    credentials: "include",
                }
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return true;
        } catch (error) {
            console.error("Error force deleting announcement:", error);
            throw error;
        }
    },
};
