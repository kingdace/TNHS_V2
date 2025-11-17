/**
 * Resources Service
 * Handles API calls for public resources functionality
 */

const API_BASE_URL = "/api";

export const resourcesService = {
    /**
     * Get all resources (alias for getAll for dashboard compatibility)
     */
    async list(filters = {}) {
        return this.getAll(filters);
    },

    /**
     * Get all active resources
     */
    async getAll(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters);
            const response = await fetch(
                `${API_BASE_URL}/downloads?${queryParams}`,
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
            console.error("Error fetching resources:", error);
            throw error;
        }
    },

    /**
     * Get resources by category
     */
    async getByCategory(category) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/downloads/category/${category}`,
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
            console.error("Error fetching resources by category:", error);
            throw error;
        }
    },

    /**
     * Increment download count
     */
    async incrementDownload(id) {
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

            const response = await fetch(
                `${API_BASE_URL}/downloads/${id}/increment`,
                {
                    method: "POST",
                    headers: headers,
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error incrementing download count:", error);
            // Don't throw error for download tracking - it's not critical
            return null;
        }
    },

    /**
     * Get download statistics
     */
    async getStatistics() {
        try {
            const response = await fetch(
                `${API_BASE_URL}/downloads/statistics`,
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
            console.error("Error fetching download statistics:", error);
            throw error;
        }
    },

    /**
     * Download file and track download
     */
    async downloadFile(resource) {
        try {
            // Increment download count (don't wait for it to complete)
            this.incrementDownload(resource.id).catch((error) => {
                console.error("Failed to increment download count:", error);
            });

            // Create download link
            const link = document.createElement("a");
            link.href = `/storage/${resource.file_path}`;
            link.download = resource.name;
            link.target = "_blank";

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return true;
        } catch (error) {
            console.error("Error downloading file:", error);
            // Fallback: open file in new tab
            window.open(`/storage/${resource.file_path}`, "_blank");
            return false;
        }
    },

    /**
     * Transform resource data for display
     */
    transformResource(resource) {
        return {
            id: resource.id,
            name: resource.name,
            description: resource.description,
            category: resource.category,
            type: resource.file_type?.toUpperCase() || "FILE",
            size: this.formatFileSize(resource.file_size),
            downloads: resource.download_count || 0,
            date: new Date(resource.created_at).toLocaleDateString(),
            file_path: resource.file_path,
            priority: this.getPriority(resource.category),
            icon: this.getIcon(resource.file_type),
            color: this.getColor(resource.category),
        };
    },

    /**
     * Format file size
     */
    formatFileSize(bytes) {
        if (!bytes || bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    },

    /**
     * Get priority based on category
     */
    getPriority(category) {
        const priorities = {
            academic: "high",
            forms: "high",
            handbooks: "high",
            policies: "medium",
            multimedia: "medium",
            links: "low",
        };
        return priorities[category] || "medium";
    },

    /**
     * Get icon based on file type
     */
    getIcon(fileType) {
        // This will be used with Lucide React icons
        const icons = {
            pdf: "FileText",
            doc: "FileText",
            docx: "FileText",
            xls: "FileText",
            xlsx: "FileText",
            ppt: "FileText",
            pptx: "FileText",
            zip: "Archive",
            rar: "Archive",
            jpg: "Image",
            jpeg: "Image",
            png: "Image",
            gif: "Image",
            mp4: "Video",
            avi: "Video",
            mov: "Video",
            mp3: "Music",
            wav: "Music",
        };
        return icons[fileType?.toLowerCase()] || "FileText";
    },

    /**
     * Get color based on category
     */
    getColor(category) {
        const colors = {
            academic: "from-blue-500 to-blue-600",
            forms: "from-green-500 to-green-600",
            multimedia: "from-purple-500 to-purple-600",
            links: "from-orange-500 to-orange-600",
            handbooks: "from-indigo-500 to-indigo-600",
            policies: "from-red-500 to-red-600",
        };
        return colors[category] || "from-gray-500 to-gray-600";
    },
};
