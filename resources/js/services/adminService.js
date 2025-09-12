/**
 * Admin Service
 * Handles API calls for admin functionality
 */

const API_BASE_URL = "/api";

// Helper function to get headers with CSRF token
const getHeaders = () => ({
    "Content-Type": "application/json",
    "X-CSRF-TOKEN":
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || "",
});

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
                    headers: getHeaders(),
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
                        headers: getHeaders(),
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
                        headers: getHeaders(),
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

    /**
     * Academic Programs Management
     */
    academicPrograms: {
        // Get all academic programs
        async getAll(filters = {}) {
            try {
                const queryParams = new URLSearchParams(filters);
                const response = await fetch(
                    `/admin/academic-programs?${queryParams}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching academic programs:", error);
                throw error;
            }
        },

        // Create a new academic program
        async create(programData) {
            try {
                const response = await fetch("/admin/academic-programs", {
                    method: "POST",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify(programData),
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
                console.error("Error creating academic program:", error);
                throw error;
            }
        },

        // Update an academic program
        async update(id, programData) {
            try {
                const response = await fetch(`/admin/academic-programs/${id}`, {
                    method: "PUT",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify(programData),
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
                console.error("Error updating academic program:", error);
                throw error;
            }
        },

        // Delete an academic program
        async delete(id) {
            try {
                const response = await fetch(`/admin/academic-programs/${id}`, {
                    method: "DELETE",
                    headers: getHeaders(),
                    credentials: "include",
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
                console.error("Error deleting academic program:", error);
                throw error;
            }
        },

        // Toggle active status
        async toggleActive(id) {
            try {
                const response = await fetch(
                    `/admin/academic-programs/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                        credentials: "include",
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
                console.error("Error toggling academic program status:", error);
                throw error;
            }
        },

        // Reorder programs
        async reorder(programs) {
            try {
                const response = await fetch(
                    "/admin/academic-programs/reorder",
                    {
                        method: "POST",
                        headers: getHeaders(),
                        credentials: "include",
                        body: JSON.stringify({ programs }),
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
                console.error("Error reordering academic programs:", error);
                throw error;
            }
        },
    },

    /**
     * School Information Management
     */
    schoolInfo: {
        // Get all school information
        async getAll(filters = {}) {
            try {
                const queryParams = new URLSearchParams(filters);
                const response = await fetch(
                    `/admin/school-info?${queryParams}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching school information:", error);
                throw error;
            }
        },

        // Create new school information
        async create(infoData) {
            try {
                const response = await fetch("/admin/school-info", {
                    method: "POST",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify(infoData),
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
                console.error("Error creating school information:", error);
                throw error;
            }
        },

        // Update school information
        async update(id, infoData) {
            try {
                const response = await fetch(`/admin/school-info/${id}`, {
                    method: "PUT",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify(infoData),
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
                console.error("Error updating school information:", error);
                throw error;
            }
        },

        // Delete school information
        async delete(id) {
            try {
                const response = await fetch(`/admin/school-info/${id}`, {
                    method: "DELETE",
                    headers: getHeaders(),
                    credentials: "include",
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
                console.error("Error deleting school information:", error);
                throw error;
            }
        },

        // Toggle active status
        async toggleActive(id) {
            try {
                const response = await fetch(
                    `/admin/school-info/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                        credentials: "include",
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
                console.error(
                    "Error toggling school information status:",
                    error
                );
                throw error;
            }
        },

        // Reorder school information
        async reorder(info) {
            try {
                const response = await fetch("/admin/school-info/reorder", {
                    method: "POST",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify({ info }),
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
                console.error("Error reordering school information:", error);
                throw error;
            }
        },
    },

    /**
     * Contact Information Management
     */
    contactInfo: {
        // Get all contact information
        async getAll(filters = {}) {
            try {
                const queryParams = new URLSearchParams(filters);
                const response = await fetch(
                    `/admin/contact-info?${queryParams}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching contact information:", error);
                throw error;
            }
        },

        // Create new contact information
        async create(infoData) {
            try {
                const response = await fetch("/admin/contact-info", {
                    method: "POST",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify(infoData),
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
                console.error("Error creating contact information:", error);
                throw error;
            }
        },

        // Update contact information
        async update(id, infoData) {
            try {
                const response = await fetch(`/admin/contact-info/${id}`, {
                    method: "PUT",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify(infoData),
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
                console.error("Error updating contact information:", error);
                throw error;
            }
        },

        // Delete contact information
        async delete(id) {
            try {
                const response = await fetch(`/admin/contact-info/${id}`, {
                    method: "DELETE",
                    headers: getHeaders(),
                    credentials: "include",
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
                console.error("Error deleting contact information:", error);
                throw error;
            }
        },

        // Toggle active status
        async toggleActive(id) {
            try {
                const response = await fetch(
                    `/admin/contact-info/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                        credentials: "include",
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
                console.error(
                    "Error toggling contact information status:",
                    error
                );
                throw error;
            }
        },

        // Reorder contact information
        async reorder(info) {
            try {
                const response = await fetch("/admin/contact-info/reorder", {
                    method: "POST",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify({ info }),
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
                console.error("Error reordering contact information:", error);
                throw error;
            }
        },
    },
};
