/**
 * History Service
 * Handles fetching and managing school history content from the API
 */

const API_BASE_URL = "/api";
const getHeaders = () => ({
    "Content-Type": "application/json",
    "X-CSRF-TOKEN":
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || "",
});

export const historyService = {
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
            const response = await fetch(
                `${API_BASE_URL}/school-info/history`,
                {
                    method: "PUT",
                    headers: {
                        ...getHeaders(),
                        Accept: "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ content }),
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
                `${API_BASE_URL}/school-info/milestones`,
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
            console.error("Error fetching history milestones:", error);
            return [];
        }
    },

    /**
     * Create a new milestone
     */
    async createMilestone(milestone) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/school-info/milestones`,
                {
                    method: "POST",
                    headers: {
                        ...getHeaders(),
                        Accept: "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(milestone),
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
            console.error("Error creating milestone:", error);
            throw error;
        }
    },

    /**
     * Update a milestone
     */
    async updateMilestone(id, milestone) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/school-info/milestones/${id}`,
                {
                    method: "PUT",
                    headers: {
                        ...getHeaders(),
                        Accept: "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(milestone),
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
            console.error("Error updating milestone:", error);
            throw error;
        }
    },

    /**
     * Delete a milestone
     */
    async deleteMilestone(id) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/school-info/milestones/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        ...getHeaders(),
                        Accept: "application/json",
                    },
                    credentials: "include",
                }
            );

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
                `${API_BASE_URL}/school-info/achievements`,
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
            console.error("Error fetching history achievements:", error);
            return [];
        }
    },

    /**
     * Create a new achievement
     */
    async createAchievement(achievement) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/school-info/achievements`,
                {
                    method: "POST",
                    headers: {
                        ...getHeaders(),
                        Accept: "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(achievement),
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
            console.error("Error creating achievement:", error);
            throw error;
        }
    },

    /**
     * Update an achievement
     */
    async updateAchievement(id, achievement) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/school-info/achievements/${id}`,
                {
                    method: "PUT",
                    headers: {
                        ...getHeaders(),
                        Accept: "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(achievement),
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
            console.error("Error updating achievement:", error);
            throw error;
        }
    },

    /**
     * Delete an achievement
     */
    async deleteAchievement(id) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/school-info/achievements/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        ...getHeaders(),
                        Accept: "application/json",
                    },
                    credentials: "include",
                }
            );

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
