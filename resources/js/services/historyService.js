/**
 * History Service
 * Handles fetching and managing school history content from the API
 */

const API_BASE_URL = "/api";

const getHeaders = () => {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    if (!csrfToken) {
        console.warn("CSRF token not found in meta tag");
    }

    return {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken || "",
        Accept: "application/json",
    };
};

export const historyService = {
    /**
     * Get a fresh CSRF token from the server
     */
    async refreshCSRFToken() {
        try {
            const response = await fetch("/api/csrf-token", {
                method: "GET",
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                // Update the meta tag with the new token
                const metaTag = document.querySelector(
                    'meta[name="csrf-token"]'
                );
                if (metaTag && data.csrf_token) {
                    metaTag.setAttribute("content", data.csrf_token);
                }
                return data.csrf_token;
            }
        } catch (error) {
            console.warn("Failed to refresh CSRF token:", error);
        }
        return null;
    },

    /**
     * Get history overview content
     */
    async getOverview() {
        try {
            const response = await fetch(
                `${API_BASE_URL}/school-info/history`,
                {
                    headers: { Accept: "application/json" },
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                return data.data;
            } else {
                throw new Error("API returned unsuccessful response");
            }
        } catch (error) {
            console.error("Error fetching history overview:", error);
            return null;
        }
    },

    /**
     * Update history overview content
     */
    async updateOverview(content) {
        try {
            // Get the current history record using the public endpoint
            const currentResponse = await fetch(
                `${API_BASE_URL}/school-info/history`,
                {
                    headers: { Accept: "application/json" },
                    credentials: "include",
                }
            );

            let currentRecord = null;
            if (currentResponse.ok) {
                const currentData = await currentResponse.json();
                if (currentData.success && currentData.data) {
                    currentRecord = currentData.data;
                }
            }

            // Store description as plain text
            const fullContent = content.description || "";

            console.log("Content length:", fullContent.length);
            console.log(
                "Content preview:",
                fullContent.substring(0, 200) + "..."
            );

            const payload = {
                info_type: "history",
                title: content.title || "Our History",
                content: fullContent, // Store as plain text
                display_order: 1,
                is_active: true,
            };

            console.log("Payload to send:", payload);

            let response;
            if (currentRecord && currentRecord.id) {
                // Update existing record
                console.log("Updating existing record ID:", currentRecord.id);
                response = await fetch(
                    `${API_BASE_URL}/admin/school-info/${currentRecord.id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        credentials: "include",
                        body: JSON.stringify(payload),
                    }
                );
            } else {
                // Create new record
                console.log("Creating new record");
                response = await fetch(`${API_BASE_URL}/admin/school-info`, {
                    method: "POST",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify(payload),
                });
            }

            // If we get a 419 CSRF error, try to refresh the token and retry once
            if (response.status === 419) {
                console.log(
                    "CSRF token mismatch, attempting to refresh token..."
                );
                await this.refreshCSRFToken();

                // Retry the request with the new token
                if (currentRecord && currentRecord.id) {
                    response = await fetch(
                        `${API_BASE_URL}/admin/school-info/${currentRecord.id}`,
                        {
                            method: "PUT",
                            headers: getHeaders(),
                            credentials: "include",
                            body: JSON.stringify(payload),
                        }
                    );
                } else {
                    response = await fetch(
                        `${API_BASE_URL}/admin/school-info`,
                        {
                            method: "POST",
                            headers: getHeaders(),
                            credentials: "include",
                            body: JSON.stringify(payload),
                        }
                    );
                }
            }

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Response error:", errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                return data.data;
            } else {
                throw new Error("API returned unsuccessful response");
            }
        } catch (error) {
            console.error("Error updating history overview:", error);
            throw error;
        }
    },

    /**
     * Get history milestones
     */
    async getMilestones() {
        try {
            const response = await fetch(
                `${API_BASE_URL}/history-milestones/public`,
                {
                    headers: { Accept: "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                return data.data;
            } else {
                throw new Error("API returned unsuccessful response");
            }
        } catch (error) {
            console.error("Error fetching history milestones:", error);
            return [];
        }
    },

    /**
     * Create a new milestone
     */
    async createMilestone(milestone) {
        try {
            let response = await fetch(
                `${API_BASE_URL}/admin/history-milestones`,
                {
                    method: "POST",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify(milestone),
                }
            );

            // If we get a 419 CSRF error, try to refresh the token and retry once
            if (response.status === 419) {
                console.log(
                    "CSRF token mismatch, attempting to refresh token..."
                );
                await this.refreshCSRFToken();

                response = await fetch(
                    `${API_BASE_URL}/admin/history-milestones`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                        credentials: "include",
                        body: JSON.stringify(milestone),
                    }
                );
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                return data.data;
            } else {
                throw new Error("API returned unsuccessful response");
            }
        } catch (error) {
            console.error("Error creating milestone:", error);
            throw error;
        }
    },

    /**
     * Update a milestone
     */
    async updateMilestone(id, milestone) {
        try {
            let response = await fetch(
                `${API_BASE_URL}/admin/history-milestones/${id}`,
                {
                    method: "PUT",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify(milestone),
                }
            );

            // If we get a 419 CSRF error, try to refresh the token and retry once
            if (response.status === 419) {
                console.log(
                    "CSRF token mismatch, attempting to refresh token..."
                );
                await this.refreshCSRFToken();

                response = await fetch(
                    `${API_BASE_URL}/admin/history-milestones/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        credentials: "include",
                        body: JSON.stringify(milestone),
                    }
                );
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                return data.data;
            } else {
                throw new Error("API returned unsuccessful response");
            }
        } catch (error) {
            console.error("Error updating milestone:", error);
            throw error;
        }
    },

    /**
     * Delete a milestone
     */
    async deleteMilestone(id) {
        try {
            let response = await fetch(
                `${API_BASE_URL}/admin/history-milestones/${id}`,
                {
                    method: "DELETE",
                    headers: getHeaders(),
                    credentials: "include",
                }
            );

            // If we get a 419 CSRF error, try to refresh the token and retry once
            if (response.status === 419) {
                console.log(
                    "CSRF token mismatch, attempting to refresh token..."
                );
                await this.refreshCSRFToken();

                response = await fetch(
                    `${API_BASE_URL}/admin/history-milestones/${id}`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error("Error deleting milestone:", error);
            throw error;
        }
    },

    /**
     * Get history achievements
     */
    async getAchievements() {
        try {
            const response = await fetch(
                `${API_BASE_URL}/history-achievements/public`,
                {
                    headers: { Accept: "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                return data.data;
            } else {
                throw new Error("API returned unsuccessful response");
            }
        } catch (error) {
            console.error("Error fetching history achievements:", error);
            return [];
        }
    },

    /**
     * Create a new achievement
     */
    async createAchievement(achievement) {
        try {
            let response = await fetch(
                `${API_BASE_URL}/admin/history-achievements`,
                {
                    method: "POST",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify(achievement),
                }
            );

            // If we get a 419 CSRF error, try to refresh the token and retry once
            if (response.status === 419) {
                console.log(
                    "CSRF token mismatch, attempting to refresh token..."
                );
                await this.refreshCSRFToken();

                response = await fetch(
                    `${API_BASE_URL}/admin/history-achievements`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                        credentials: "include",
                        body: JSON.stringify(achievement),
                    }
                );
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                return data.data;
            } else {
                throw new Error("API returned unsuccessful response");
            }
        } catch (error) {
            console.error("Error creating achievement:", error);
            throw error;
        }
    },

    /**
     * Update an achievement
     */
    async updateAchievement(id, achievement) {
        try {
            let response = await fetch(
                `${API_BASE_URL}/admin/history-achievements/${id}`,
                {
                    method: "PUT",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify(achievement),
                }
            );

            // If we get a 419 CSRF error, try to refresh the token and retry once
            if (response.status === 419) {
                console.log(
                    "CSRF token mismatch, attempting to refresh token..."
                );
                await this.refreshCSRFToken();

                response = await fetch(
                    `${API_BASE_URL}/admin/history-achievements/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        credentials: "include",
                        body: JSON.stringify(achievement),
                    }
                );
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                return data.data;
            } else {
                throw new Error("API returned unsuccessful response");
            }
        } catch (error) {
            console.error("Error updating achievement:", error);
            throw error;
        }
    },

    /**
     * Delete an achievement
     */
    async deleteAchievement(id) {
        try {
            let response = await fetch(
                `${API_BASE_URL}/admin/history-achievements/${id}`,
                {
                    method: "DELETE",
                    headers: getHeaders(),
                    credentials: "include",
                }
            );

            // If we get a 419 CSRF error, try to refresh the token and retry once
            if (response.status === 419) {
                console.log(
                    "CSRF token mismatch, attempting to refresh token..."
                );
                await this.refreshCSRFToken();

                response = await fetch(
                    `${API_BASE_URL}/admin/history-achievements/${id}`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error("Error deleting achievement:", error);
            throw error;
        }
    },
};
