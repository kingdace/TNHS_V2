/**
 * Admin Service
 * Handles API calls for admin functionality
 */

const API_BASE_URL = "/api";

// Helper function to get headers with CSRF token
const getHeaders = () => ({
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-CSRF-TOKEN":
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || "",
});

export const adminService = {
    /**
     * Events (School Calendar) Management
     */
    events: {
        async getAll(filters = {}) {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await fetch(`/api/admin/events?${query}`, {
                    method: "GET",
                    headers: getHeaders(),
                    credentials: "include",
                });
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching events:", error);
                throw error;
            }
        },
        async create(payload) {
            try {
                // If payload contains image (File), use FormData; else JSON
                if (payload.image instanceof File) {
                    const form = new FormData();
                    Object.entries(payload).forEach(([k, v]) => {
                        if (v === undefined || v === null || v === "") return;
                        if (typeof v === "boolean")
                            form.append(k, v ? "1" : "0");
                        else form.append(k, v);
                    });
                    const response = await fetch(`/api/admin/events`, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                        },
                        credentials: "include",
                        body: form,
                    });
                    if (!response.ok)
                        throw new Error(`HTTP ${response.status}`);
                    return await response.json();
                } else {
                    const response = await fetch(`/api/admin/events`, {
                        method: "POST",
                        headers: getHeaders(),
                        credentials: "include",
                        body: JSON.stringify(payload),
                    });
                    if (!response.ok)
                        throw new Error(`HTTP ${response.status}`);
                    return await response.json();
                }
            } catch (error) {
                console.error("Error creating event:", error);
                throw error;
            }
        },
        async update(id, payload) {
            try {
                if (payload.image instanceof File) {
                    const form = new FormData();
                    form.append("_method", "PUT");
                    Object.entries(payload).forEach(([k, v]) => {
                        if (v === undefined || v === null) return;
                        if (typeof v === "boolean")
                            form.append(k, v ? "1" : "0");
                        else form.append(k, v);
                    });
                    const response = await fetch(`/api/admin/events/${id}`, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                        },
                        credentials: "include",
                        body: form,
                    });
                    if (!response.ok)
                        throw new Error(`HTTP ${response.status}`);
                    return await response.json();
                } else {
                    const response = await fetch(`/api/admin/events/${id}`, {
                        method: "PUT",
                        headers: getHeaders(),
                        credentials: "include",
                        body: JSON.stringify(payload),
                    });
                    if (!response.ok)
                        throw new Error(`HTTP ${response.status}`);
                    return await response.json();
                }
            } catch (error) {
                console.error("Error updating event:", error);
                throw error;
            }
        },
        async delete(id) {
            try {
                const response = await fetch(`/api/admin/events/${id}`, {
                    method: "DELETE",
                    headers: getHeaders(),
                    credentials: "include",
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return await response.json();
            } catch (error) {
                console.error("Error deleting event:", error);
                throw error;
            }
        },
    },
    /**
     * Hero Carousel Management
     */
    heroCarousel: {
        // Get all hero carousel slides
        async getAll() {
            try {
                const response = await fetch(`/api/admin/hero-carousel`, {
                    method: "GET",
                    headers: getHeaders(),
                    credentials: "include",
                });
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
                const response = await fetch(`/api/admin/hero-carousel/${id}`, {
                    method: "GET",
                    headers: getHeaders(),
                    credentials: "include",
                });
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
                const form = new FormData();
                Object.entries(slideData).forEach(([key, value]) => {
                    if (value === undefined || value === null || value === "")
                        return;
                    if (typeof value === "boolean") {
                        form.append(key, value ? "1" : "0");
                    } else {
                        form.append(key, value);
                    }
                });

                const response = await fetch(`/api/admin/hero-carousel`, {
                    method: "POST",
                    // Do not set Content-Type for FormData; browser will set boundary
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                    },
                    credentials: "include",
                    body: form,
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
                const form = new FormData();
                // Laravel expects POST with _method=PUT for multipart
                form.append("_method", "PUT");
                Object.entries(slideData).forEach(([key, value]) => {
                    if (value === undefined || value === null || value === "")
                        return;
                    if (typeof value === "boolean") {
                        form.append(key, value ? "1" : "0");
                    } else {
                        form.append(key, value);
                    }
                });

                const response = await fetch(`/api/admin/hero-carousel/${id}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                    },
                    credentials: "include",
                    body: form,
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
                console.error("Error updating hero carousel slide:", error);
                throw error;
            }
        },

        // Delete a slide (soft delete)
        async delete(id) {
            try {
                const response = await fetch(`/api/admin/hero-carousel/${id}`, {
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
                console.error("Error deleting hero carousel slide:", error);
                throw error;
            }
        },

        // Get trashed slides
        async getTrashed() {
            try {
                const response = await fetch(
                    `/api/admin/hero-carousel-trashed`,
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
                return data.success ? data.data : [];
            } catch (error) {
                console.error(
                    "Error fetching trashed hero carousel slides:",
                    error
                );
                return [];
            }
        },

        // Restore a slide from trash
        async restore(id) {
            try {
                const response = await fetch(
                    `/api/admin/hero-carousel/${id}/restore`,
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
                console.error("Error restoring hero carousel slide:", error);
                throw error;
            }
        },

        // Permanently delete a slide
        async forceDelete(id) {
            try {
                const response = await fetch(
                    `/api/admin/hero-carousel/${id}/force`,
                    {
                        method: "DELETE",
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
                    "Error permanently deleting hero carousel slide:",
                    error
                );
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
                    `/api/admin/academic-programs?${queryParams}`,
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
                const response = await fetch("/api/admin/academic-programs", {
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
                const response = await fetch(
                    `/api/admin/academic-programs/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        credentials: "include",
                        body: JSON.stringify(programData),
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
                console.error("Error updating academic program:", error);
                throw error;
            }
        },

        // Delete an academic program
        async delete(id) {
            try {
                const response = await fetch(
                    `/api/admin/academic-programs/${id}`,
                    {
                        method: "DELETE",
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
                    "/api/admin/academic-programs/reorder",
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
                    `/api/admin/school-info?${queryParams}`,
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
                const response = await fetch("/api/admin/school-info", {
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
                const response = await fetch(`/api/admin/school-info/${id}`, {
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
                const response = await fetch(`/api/admin/school-info/${id}`, {
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
                const response = await fetch("/api/admin/school-info/reorder", {
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
                    `/api/admin/contact-info?${queryParams}`,
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
                const response = await fetch("/api/admin/contact-info", {
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
                const response = await fetch(`/api/admin/contact-info/${id}`, {
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
                const response = await fetch(`/api/admin/contact-info/${id}`, {
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
                const response = await fetch(
                    "/api/admin/contact-info/reorder",
                    {
                        method: "POST",
                        headers: getHeaders(),
                        credentials: "include",
                        body: JSON.stringify({ info }),
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
                console.error("Error reordering contact information:", error);
                throw error;
            }
        },
    },
};
