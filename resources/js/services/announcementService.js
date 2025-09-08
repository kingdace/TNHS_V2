/**
 * Announcement Service
 * Handles fetching announcements from the API
 */

const API_BASE_URL = "/api";

export const announcementService = {
    /**
     * Fetch all published announcements for public view
     */
    async getPublicAnnouncements() {
        try {
            console.log(
                "Making API call to:",
                `${API_BASE_URL}/announcements/public`
            );
            const response = await fetch(
                `${API_BASE_URL}/announcements/public`
            );

            console.log("API response status:", response.status);
            console.log("API response ok:", response.ok);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API response data:", data);

            if (data.success) {
                console.log(
                    "API returned success, data length:",
                    data.data.length
                );
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

    /**
     * Transform announcement data to match the expected format
     */
    transformAnnouncement(announcement) {
        return {
            id: announcement.id,
            title: announcement.title,
            content: announcement.content,
            excerpt: this.truncateText(announcement.content, 150),
            author: announcement.author,
            date: this.formatDate(announcement.published_at),
            category: "Announcements",
            views: Math.floor(Math.random() * 2000) + 500, // Random views for display
            image: this.getRandomImage(), // Random image for display
            featured: false, // Can be enhanced later
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
};
