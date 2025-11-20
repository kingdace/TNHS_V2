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

// Helper function to refresh CSRF token
const refreshCSRFToken = async () => {
    try {
        const response = await fetch("/api/csrf-token", {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            // Update the meta tag with the new token
            const metaTag = document.querySelector('meta[name="csrf-token"]');
            if (metaTag && data.csrf_token) {
                metaTag.setAttribute("content", data.csrf_token);
            }
            return data.csrf_token;
        }
    } catch (error) {
        console.warn("Failed to refresh CSRF token:", error);
    }
    return null;
};

// Helper function to handle API requests with CSRF retry
const makeRequest = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            credentials: "include",
            ...options,
        });

        // If we get a 419 CSRF error, try refreshing the token and retry once
        if (response.status === 419) {
            console.log("CSRF token expired, refreshing...");
            const newToken = await refreshCSRFToken();
            if (newToken) {
                // Update headers with new token
                const updatedHeaders = {
                    ...options.headers,
                    "X-CSRF-TOKEN": newToken,
                };

                // Retry the request with the new token
                const retryResponse = await fetch(url, {
                    ...options,
                    headers: updatedHeaders,
                    credentials: "include",
                });
                return retryResponse;
            }
        }

        return response;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};

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
        // Handle image source (file path or URL)
        const imageSrc = announcement.image_path
            ? announcement.image_path.startsWith("http")
                ? announcement.image_path // Direct URL
                : `/storage/${announcement.image_path}` // File path
            : null;

        // Handle gallery images
        const galleryImages = announcement.images
            ? Array.isArray(announcement.images)
                ? announcement.images.map((img) =>
                      img.startsWith("http") ? img : `/storage/${img}`
                  )
                : []
            : [];

        return {
            id: announcement.id,
            title: announcement.title,
            content: announcement.content,
            content_html: announcement.content_html,
            excerpt: this.truncateText(announcement.content, 150),
            author: announcement.author,
            date: this.formatDate(announcement.published_at),
            category: announcement.category || "General",
            views: Math.floor(Math.random() * 2000) + 500,
            image: imageSrc || this.getRandomImage(),
            images: galleryImages,
            external_link: announcement.external_link || null,
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
        if (!dateString) return "No date";

        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    },

    /**
     * Format date for display (date only)
     */
    formatDateOnly(dateString) {
        if (!dateString) return "No date";

        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    },

    /**
     * Format relative time (e.g., "2 hours ago", "3 days ago")
     */
    formatRelativeTime(dateString) {
        if (!dateString) return "No date";

        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return "Just now";
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        } else if (diffInSeconds < 2592000) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} day${days !== 1 ? "s" : ""} ago`;
        } else {
            return this.formatDateOnly(dateString);
        }
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
            console.log("Creating announcement with payload:", payload);

            // Validate image sizes before sending (5MB = 5 * 1024 * 1024 bytes)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes

            if (payload.image && payload.image.size > maxSize) {
                throw new Error(
                    `Main image is too large. Maximum size is 5MB, but the selected image is ${(
                        payload.image.size /
                        1024 /
                        1024
                    ).toFixed(2)}MB.`
                );
            }

            if (payload.images && Array.isArray(payload.images)) {
                for (let i = 0; i < payload.images.length; i++) {
                    if (payload.images[i].size > maxSize) {
                        throw new Error(
                            `Gallery image ${
                                i + 1
                            } is too large. Maximum size is 5MB, but the selected image is ${(
                                payload.images[i].size /
                                1024 /
                                1024
                            ).toFixed(2)}MB.`
                        );
                    }
                }
            }

            let body;
            let headers = {
                ...getHeaders(),
                Accept: "application/json",
            };

            // Check if we have files (image or images array)
            const hasFiles =
                payload.image || (payload.images && payload.images.length > 0);

            console.log("Has files:", hasFiles);

            if (hasFiles) {
                const formData = new FormData();
                Object.entries(payload).forEach(([key, value]) => {
                    if (value === undefined || value === null) return;

                    if (key === "images" && Array.isArray(value)) {
                        // Handle multiple images
                        value.forEach((file, index) => {
                            formData.append(`images[${index}]`, file);
                        });
                    } else if (typeof value === "boolean") {
                        formData.append(key, value ? "1" : "0");
                    } else if (key === "image_url" && !value && payload.image) {
                        // Skip empty image_url when we have a file
                        return;
                    } else if (key !== "images") {
                        // Skip the images key since we handled it above
                        formData.append(key, value);
                    }
                });
                body = formData;
                // Remove Content-Type header for FormData (browser sets it automatically)
                delete headers["Content-Type"];
            } else {
                // Use JSON for URL-only submissions
                const data = {};
                Object.entries(payload).forEach(([key, value]) => {
                    if (value === undefined || value === null) return;
                    if (key === "images") return; // Skip images array for JSON
                    if (typeof value === "boolean") {
                        data[key] = value ? 1 : 0;
                    } else {
                        data[key] = value;
                    }
                });
                body = JSON.stringify(data);
            }

            console.log("Sending request to:", `${API_BASE_URL}/announcements`);
            console.log("Request headers:", headers);
            console.log(
                "Request body type:",
                body instanceof FormData ? "FormData" : typeof body
            );

            const response = await makeRequest(
                `${API_BASE_URL}/announcements`,
                {
                    method: "POST",
                    headers,
                    body,
                }
            );

            console.log("Response status:", response.status);
            const responseData = await response.json();
            console.log("Response data:", responseData);

            if (!response.ok) {
                if (response.status === 422 && responseData.errors) {
                    // Handle validation errors
                    const errorMessages = Object.values(
                        responseData.errors
                    ).flat();
                    throw new Error(
                        `Validation failed: ${errorMessages.join(", ")}`
                    );
                } else {
                    throw new Error(
                        responseData.message || `HTTP ${response.status}`
                    );
                }
            }

            return responseData.data;
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
            // Validate image sizes before sending (5MB = 5 * 1024 * 1024 bytes)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes

            if (payload.image && payload.image.size > maxSize) {
                throw new Error(
                    `Main image is too large. Maximum size is 5MB, but the selected image is ${(
                        payload.image.size /
                        1024 /
                        1024
                    ).toFixed(2)}MB.`
                );
            }

            if (payload.images && Array.isArray(payload.images)) {
                for (let i = 0; i < payload.images.length; i++) {
                    if (payload.images[i].size > maxSize) {
                        throw new Error(
                            `Gallery image ${
                                i + 1
                            } is too large. Maximum size is 5MB, but the selected image is ${(
                                payload.images[i].size /
                                1024 /
                                1024
                            ).toFixed(2)}MB.`
                        );
                    }
                }
            }

            let body;
            let headers = {
                ...getHeaders(),
                Accept: "application/json",
            };

            // Check if we have files (image or images array)
            const hasFiles =
                payload.image || (payload.images && payload.images.length > 0);

            if (hasFiles) {
                const formData = new FormData();
                // Add _method for Laravel PUT requests
                formData.append("_method", "PUT");

                Object.entries(payload).forEach(([key, value]) => {
                    if (value === undefined || value === null) return;

                    if (key === "images" && Array.isArray(value)) {
                        // Handle multiple images
                        value.forEach((file, index) => {
                            formData.append(`images[${index}]`, file);
                        });
                    } else if (typeof value === "boolean") {
                        formData.append(key, value ? "1" : "0");
                    } else if (key === "image_url" && !value && payload.image) {
                        // Skip empty image_url when we have a file
                        return;
                    } else if (key !== "images") {
                        // Skip the images key since we handled it above
                        formData.append(key, value);
                    }
                });
                body = formData;
                // Remove Content-Type header for FormData (browser sets it automatically)
                delete headers["Content-Type"];
            } else {
                // Use FormData for all updates to ensure consistency
                const formData = new FormData();
                formData.append("_method", "PUT");

                Object.entries(payload).forEach(([key, value]) => {
                    if (value === undefined) return;
                    if (key === "images") return; // Skip images array for non-file updates

                    if (typeof value === "boolean") {
                        formData.append(key, value ? "1" : "0");
                    } else if (value === null) {
                        formData.append(key, "");
                    } else {
                        formData.append(key, value);
                    }
                });
                body = formData;
                // Remove Content-Type header for FormData (browser sets it automatically)
                delete headers["Content-Type"];
            }

            const response = await makeRequest(
                `${API_BASE_URL}/announcements/${id}`,
                {
                    method: "POST", // Use POST with _method=PUT for Laravel
                    headers,
                    body,
                }
            );

            const responseData = await response.json();

            if (!response.ok) {
                if (response.status === 422 && responseData.errors) {
                    // Handle validation errors
                    const errorMessages = Object.values(
                        responseData.errors
                    ).flat();
                    throw new Error(
                        `Validation failed: ${errorMessages.join(", ")}`
                    );
                } else {
                    throw new Error(
                        responseData.message || `HTTP ${response.status}`
                    );
                }
            }

            return responseData.data;
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
            const response = await makeRequest(
                `${API_BASE_URL}/announcements/${id}`,
                {
                    method: "DELETE",
                    headers: { ...getHeaders(), Accept: "application/json" },
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
            const response = await makeRequest(
                `${API_BASE_URL}/announcements/${id}/restore`,
                {
                    method: "POST",
                    headers: { ...getHeaders(), Accept: "application/json" },
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
            const response = await makeRequest(
                `${API_BASE_URL}/announcements/${id}/force`,
                {
                    method: "DELETE",
                    headers: { ...getHeaders(), Accept: "application/json" },
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
