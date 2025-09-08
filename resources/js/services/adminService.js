/**
 * Admin Service
 * Handles API calls for admin functionality
 */

const API_BASE_URL = "/api";

export const adminService = {
    /**
     * Hero Carousel Management
     */
    heroCarousel: {
        // Get all hero carousel slides
        async getAll() {
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

        // Get a specific slide
        async getById(id) {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/hero-carousel/${id}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.success ? data.data : null;
            } catch (error) {
                console.error("Error fetching hero carousel slide:", error);
                return null;
            }
        },

        // Create a new slide
        async create(slideData) {
            try {
                const response = await fetch(`${API_BASE_URL}/hero-carousel`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN":
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content") || "",
                    },
                    body: JSON.stringify(slideData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message ||
                            `HTTP error! status: ${response.status}`
                    );
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error creating hero carousel slide:", error);
                throw error;
            }
        },

        // Update a slide
        async update(id, slideData) {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/hero-carousel/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-TOKEN":
                                document
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.getAttribute("content") || "",
                        },
                        body: JSON.stringify(slideData),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message ||
                            `HTTP error! status: ${response.status}`
                    );
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error updating hero carousel slide:", error);
                throw error;
            }
        },

        // Delete a slide
        async delete(id) {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/hero-carousel/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "X-CSRF-TOKEN":
                                document
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.getAttribute("content") || "",
                        },
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message ||
                            `HTTP error! status: ${response.status}`
                    );
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error deleting hero carousel slide:", error);
                throw error;
            }
        },
    },
};
