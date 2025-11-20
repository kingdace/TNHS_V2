/**
 * Admin Service
 * Handles API calls for admin functionality
 */

const API_BASE_URL = "/api";

// Helper function to get headers with CSRF token
const getHeaders = () => {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    if (!csrfToken) {
        console.warn("CSRF token not found in meta tag");
    }

    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-TOKEN": csrfToken || "",
    };
};

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

export const adminService = {
    /**
     * Events (School Calendar) Management
     */
    events: {
        async getAll(filters = {}) {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await makeRequest(
                    `/api/admin/events?${query}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );
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
                    const response = await makeRequest(`/api/admin/events`, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                        },
                        body: form,
                    });
                    if (!response.ok)
                        throw new Error(`HTTP ${response.status}`);
                    return await response.json();
                } else {
                    const response = await makeRequest(`/api/admin/events`, {
                        method: "POST",
                        headers: getHeaders(),
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
                    const response = await makeRequest(
                        `/api/admin/events/${id}`,
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                            },
                            body: form,
                        }
                    );
                    if (!response.ok)
                        throw new Error(`HTTP ${response.status}`);
                    return await response.json();
                } else {
                    const response = await makeRequest(
                        `/api/admin/events/${id}`,
                        {
                            method: "PUT",
                            headers: getHeaders(),
                            body: JSON.stringify(payload),
                        }
                    );
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
                const response = await makeRequest(`/api/admin/events/${id}`, {
                    method: "DELETE",
                    headers: getHeaders(),
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
                const response = await makeRequest(`/api/admin/hero-carousel`, {
                    method: "GET",
                    headers: getHeaders(),
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
                const response = await makeRequest(
                    `/api/admin/hero-carousel/${id}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
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

                const response = await makeRequest(`/api/admin/hero-carousel`, {
                    method: "POST",
                    // Do not set Content-Type for FormData; browser will set boundary
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                    },
                    body: form,
                });

                const data = await response.json();

                if (!response.ok) {
                    // Return the error data so validation errors can be displayed
                    return data;
                }

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

                const response = await makeRequest(
                    `/api/admin/hero-carousel/${id}`,
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                        },
                        body: form,
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

        // Delete a slide (soft delete)
        async delete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/hero-carousel/${id}`,
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

        // Get trashed slides
        async getTrashed() {
            try {
                const response = await makeRequest(
                    `/api/admin/hero-carousel-trashed`,
                    {
                        method: "GET",
                        headers: getHeaders(),
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
                const response = await makeRequest(
                    `/api/admin/hero-carousel/${id}/restore`,
                    {
                        method: "POST",
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
                console.error("Error restoring hero carousel slide:", error);
                throw error;
            }
        },

        // Permanently delete a slide
        async forceDelete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/hero-carousel/${id}/force`,
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
                const response = await makeRequest(
                    `/api/admin/academic-programs?${queryParams}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
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
                const response = await makeRequest(
                    "/api/admin/academic-programs",
                    {
                        method: "POST",
                        headers: getHeaders(),
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
                console.error("Error creating academic program:", error);
                throw error;
            }
        },

        // Update an academic program
        async update(id, programData) {
            try {
                const response = await makeRequest(
                    `/api/admin/academic-programs/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
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
                const response = await makeRequest(
                    `/api/admin/academic-programs/${id}`,
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
                console.error("Error deleting academic program:", error);
                throw error;
            }
        },

        // Toggle active status
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/admin/academic-programs/${id}/toggle-active`,
                    {
                        method: "POST",
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
                console.error("Error toggling academic program status:", error);
                throw error;
            }
        },

        // Reorder programs
        async reorder(programs) {
            try {
                const response = await makeRequest(
                    "/api/admin/academic-programs/reorder",
                    {
                        method: "POST",
                        headers: getHeaders(),
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
                const response = await makeRequest(
                    `/api/admin/school-info?${queryParams}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
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
                const response = await makeRequest("/api/admin/school-info", {
                    method: "POST",
                    headers: getHeaders(),
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
                const response = await makeRequest(
                    `/api/admin/school-info/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        body: JSON.stringify(infoData),
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
                console.error("Error updating school information:", error);
                throw error;
            }
        },

        // Delete school information
        async delete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/school-info/${id}`,
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
                console.error("Error deleting school information:", error);
                throw error;
            }
        },

        // Toggle active status
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/admin/school-info/${id}/toggle-active`,
                    {
                        method: "POST",
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
                const response = await makeRequest(
                    "/api/admin/school-info/reorder",
                    {
                        method: "POST",
                        headers: getHeaders(),
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
                const response = await makeRequest(
                    `/api/admin/contact-info?${queryParams}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
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
                const response = await makeRequest("/api/admin/contact-info", {
                    method: "POST",
                    headers: getHeaders(),
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
                const response = await makeRequest(
                    `/api/admin/contact-info/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        body: JSON.stringify(infoData),
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
                console.error("Error updating contact information:", error);
                throw error;
            }
        },

        // Delete contact information
        async delete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/contact-info/${id}`,
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
                console.error("Error deleting contact information:", error);
                throw error;
            }
        },

        // Toggle active status
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/admin/contact-info/${id}/toggle-active`,
                    {
                        method: "POST",
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
                const response = await makeRequest(
                    "/api/admin/contact-info/reorder",
                    {
                        method: "POST",
                        headers: getHeaders(),
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

    /**
     * Mission Management
     */
    missions: {
        async getAll(filters = {}) {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await makeRequest(
                    `/api/admin/missions?${query}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching missions:", error);
                throw error;
            }
        },
        async create(payload) {
            try {
                // Support passing a ready FormData directly
                const form =
                    payload instanceof FormData
                        ? payload
                        : (() => {
                              const f = new FormData();
                              Object.entries(payload).forEach(([k, v]) => {
                                  if (v === undefined || v === null || v === "")
                                      return;
                                  if (typeof v === "boolean")
                                      f.append(k, v ? "1" : "0");
                                  else f.append(k, v);
                              });
                              return f;
                          })();

                const response = await makeRequest("/api/admin/missions", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                    },
                    body: form,
                });
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error creating mission:", error);
                throw error;
            }
        },
        async update(id, payload) {
            try {
                const form =
                    payload instanceof FormData
                        ? payload
                        : (() => {
                              const f = new FormData();
                              Object.entries(payload).forEach(([k, v]) => {
                                  if (v === undefined || v === null || v === "")
                                      return;
                                  if (typeof v === "boolean")
                                      f.append(k, v ? "1" : "0");
                                  else f.append(k, v);
                              });
                              return f;
                          })();
                if (!form.has("_method")) form.append("_method", "PUT");

                const response = await makeRequest(
                    `/api/admin/missions/${id}`,
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                        },
                        body: form,
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error updating mission:", error);
                throw error;
            }
        },
        async delete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/missions/${id}`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error deleting mission:", error);
                throw error;
            }
        },
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/missions/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error toggling mission active status:", error);
                throw error;
            }
        },
    },

    /**
     * Vision Management
     */
    visions: {
        async getAll(filters = {}) {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await makeRequest(
                    `/api/admin/visions?${query}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching visions:", error);
                throw error;
            }
        },
        async create(payload) {
            try {
                const form =
                    payload instanceof FormData
                        ? payload
                        : (() => {
                              const f = new FormData();
                              Object.entries(payload).forEach(([k, v]) => {
                                  if (v === undefined || v === null || v === "")
                                      return;
                                  if (typeof v === "boolean")
                                      f.append(k, v ? "1" : "0");
                                  else f.append(k, v);
                              });
                              return f;
                          })();

                const response = await makeRequest("/api/admin/visions", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                    },
                    body: form,
                });
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error creating vision:", error);
                throw error;
            }
        },
        async update(id, payload) {
            try {
                const form =
                    payload instanceof FormData
                        ? payload
                        : (() => {
                              const f = new FormData();
                              Object.entries(payload).forEach(([k, v]) => {
                                  if (v === undefined || v === null || v === "")
                                      return;
                                  if (typeof v === "boolean")
                                      f.append(k, v ? "1" : "0");
                                  else f.append(k, v);
                              });
                              return f;
                          })();
                if (!form.has("_method")) form.append("_method", "PUT");

                const response = await makeRequest(`/api/admin/visions/${id}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                    },
                    body: form,
                });
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error updating vision:", error);
                throw error;
            }
        },
        async delete(id) {
            try {
                const response = await makeRequest(`/api/admin/visions/${id}`, {
                    method: "DELETE",
                    headers: getHeaders(),
                });
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error deleting vision:", error);
                throw error;
            }
        },
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/visions/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error toggling vision active status:", error);
                throw error;
            }
        },
    },

    /**
     * Core Values Management
     */
    coreValues: {
        async getAll(filters = {}) {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await makeRequest(
                    `/api/admin/core-values?${query}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching core values:", error);
                throw error;
            }
        },
        async create(payload) {
            try {
                const response = await makeRequest("/api/admin/core-values", {
                    method: "POST",
                    headers: getHeaders(),
                    body: JSON.stringify(payload),
                });
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error creating core value:", error);
                throw error;
            }
        },
        async update(id, payload) {
            try {
                const response = await makeRequest(
                    `/api/admin/core-values/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        body: JSON.stringify(payload),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error updating core value:", error);
                throw error;
            }
        },
        async delete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/core-values/${id}`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error deleting core value:", error);
                throw error;
            }
        },
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/core-values/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(
                    "Error toggling core value active status:",
                    error
                );
                throw error;
            }
        },
    },

    /**
     * Guiding Principles Management
     */
    principles: {
        async getAll(filters = {}) {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await makeRequest(
                    `/api/admin/guiding-principles?${query}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching guiding principles:", error);
                throw error;
            }
        },
        async create(payload) {
            try {
                const response = await makeRequest(
                    "/api/admin/guiding-principles",
                    {
                        method: "POST",
                        headers: getHeaders(),
                        body: JSON.stringify(payload),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error creating guiding principle:", error);
                throw error;
            }
        },
        async update(id, payload) {
            try {
                const response = await makeRequest(
                    `/api/admin/guiding-principles/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        body: JSON.stringify(payload),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error updating guiding principle:", error);
                throw error;
            }
        },
        async delete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/guiding-principles/${id}`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error deleting guiding principle:", error);
                throw error;
            }
        },
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/guiding-principles/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(
                    "Error toggling guiding principle active status:",
                    error
                );
                throw error;
            }
        },
    },

    /**
     * Goals & Objectives Management
     */
    goals: {
        async getAll(filters = {}) {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await makeRequest(
                    `/api/admin/goal-objectives?${query}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching goals:", error);
                throw error;
            }
        },
        async create(payload) {
            try {
                const response = await makeRequest(
                    "/api/admin/goal-objectives",
                    {
                        method: "POST",
                        headers: getHeaders(),
                        body: JSON.stringify(payload),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error creating goal:", error);
                throw error;
            }
        },
        async update(id, payload) {
            try {
                const response = await makeRequest(
                    `/api/admin/goal-objectives/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        body: JSON.stringify(payload),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error updating goal:", error);
                throw error;
            }
        },
        async delete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/goal-objectives/${id}`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error deleting goal:", error);
                throw error;
            }
        },
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/goal-objectives/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error toggling goal active status:", error);
                throw error;
            }
        },
    },

    /**
     * Resources (Download Files) Management
     */
    resources: {
        async getAll(filters = {}) {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await makeRequest(
                    `/api/admin/download-files?${query}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching resources:", error);
                throw error;
            }
        },
        async create(payload) {
            try {
                // Add timeout for large file uploads
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

                const response = await makeRequest(
                    "/api/admin/download-files",
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                        },
                        body: payload, // FormData
                        signal: controller.signal,
                    }
                );

                clearTimeout(timeoutId);
                const data = await response.json();

                if (!response.ok) {
                    // Return validation errors for the UI to handle
                    return data;
                }

                return data;
            } catch (error) {
                if (error.name === "AbortError") {
                    throw new Error("Upload timeout - file may be too large");
                }
                console.error("Error creating resource:", error);
                throw error;
            }
        },
        async update(id, payload) {
            try {
                // Add _method for Laravel
                if (payload instanceof FormData) {
                    payload.append("_method", "PUT");
                }
                const response = await makeRequest(
                    `/api/admin/download-files/${id}`,
                    {
                        method: "POST", // Use POST with _method=PUT for FormData
                        headers: {
                            Accept: "application/json",
                            "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                        },
                        body: payload,
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    // Return validation errors for the UI to handle
                    return data;
                }

                return data;
            } catch (error) {
                console.error("Error updating resource:", error);
                throw error;
            }
        },
        async delete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/download-files/${id}`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error deleting resource:", error);
                throw error;
            }
        },
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/download-files/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error toggling resource status:", error);
                throw error;
            }
        },
    },

    /**
     * Gallery Management
     */
    gallery: {
        async getAll(filters = {}) {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await makeRequest(
                    `/api/admin/gallery?${query}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching gallery images:", error);
                throw error;
            }
        },
        async create(payload) {
            try {
                const response = await makeRequest("/api/admin/gallery", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                    },
                    body: payload, // FormData
                });

                const data = await response.json();

                if (!response.ok) {
                    return data;
                }

                return data;
            } catch (error) {
                console.error("Error creating gallery image:", error);
                throw error;
            }
        },
        async update(id, payload) {
            try {
                if (payload instanceof FormData) {
                    payload.append("_method", "PUT");
                }
                const response = await makeRequest(`/api/admin/gallery/${id}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                    },
                    body: payload,
                });

                const data = await response.json();

                if (!response.ok) {
                    return data;
                }

                return data;
            } catch (error) {
                console.error("Error updating gallery image:", error);
                throw error;
            }
        },
        async delete(id) {
            try {
                const response = await makeRequest(`/api/admin/gallery/${id}`, {
                    method: "DELETE",
                    headers: getHeaders(),
                });
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error deleting gallery image:", error);
                throw error;
            }
        },
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/gallery/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error toggling gallery image status:", error);
                throw error;
            }
        },
        async toggleFeatured(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/gallery/${id}/toggle-featured`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(
                    "Error toggling gallery image featured status:",
                    error
                );
                throw error;
            }
        },
        async bulkUpload(payload) {
            try {
                const response = await makeRequest(
                    "/api/admin/gallery/bulk-upload",
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                        },
                        body: payload, // FormData
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    return data;
                }

                return data;
            } catch (error) {
                console.error("Error bulk uploading gallery images:", error);
                throw error;
            }
        },
        async getTrashed() {
            try {
                const response = await makeRequest(
                    "/api/admin/gallery-trashed",
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching trashed gallery images:", error);
                throw error;
            }
        },
        async restore(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/gallery/${id}/restore`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error restoring gallery image:", error);
                throw error;
            }
        },
        async forceDelete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/gallery/${id}/force`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(
                    "Error permanently deleting gallery image:",
                    error
                );
                throw error;
            }
        },
    },

    /**
     * School Seal Management
     */
    schoolSealInfo: {
        async getAll() {
            try {
                const response = await fetch("/api/admin/school-seal-info", {
                    method: "GET",
                    headers: getHeaders(),
                    credentials: "include",
                });
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching school seal info:", error);
                throw error;
            }
        },
        async create(payload) {
            try {
                // Support passing a ready FormData directly
                if (payload instanceof FormData) {
                    // Ensure CSRF token is in FormData
                    if (!payload.has("_token")) {
                        const csrfToken = document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content");
                        if (csrfToken) {
                            payload.append("_token", csrfToken);
                        }
                    }

                    const response = await fetch(
                        "/api/admin/school-seal-info",
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "X-CSRF-TOKEN":
                                    document
                                        .querySelector(
                                            'meta[name="csrf-token"]'
                                        )
                                        ?.getAttribute("content") || "",
                            },
                            credentials: "include",
                            body: payload,
                        }
                    );
                    const data = await response.json();
                    if (!response.ok) return data;
                    return data;
                }

                // If payload contains image (File), use FormData; else JSON
                if (payload.image instanceof File) {
                    const form = new FormData();
                    Object.entries(payload).forEach(([k, v]) => {
                        if (v === undefined || v === null || v === "") return;
                        if (typeof v === "boolean")
                            form.append(k, v ? "1" : "0");
                        else form.append(k, v);
                    });
                    const response = await fetch(
                        "/api/admin/school-seal-info",
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "X-CSRF-TOKEN":
                                    document
                                        .querySelector(
                                            'meta[name="csrf-token"]'
                                        )
                                        ?.getAttribute("content") || "",
                            },
                            credentials: "include",
                            body: form,
                        }
                    );
                    const data = await response.json();

                    if (!response.ok) {
                        // Return the error data so validation errors can be displayed
                        return data;
                    }

                    return data;
                } else {
                    const response = await fetch(
                        "/api/admin/school-seal-info",
                        {
                            method: "POST",
                            headers: getHeaders(),
                            credentials: "include",
                            body: JSON.stringify(payload),
                        }
                    );
                    const data = await response.json();

                    if (!response.ok) {
                        // Return the error data so validation errors can be displayed
                        return data;
                    }

                    return data;
                }
            } catch (error) {
                console.error("Error creating school seal info:", error);
                throw error;
            }
        },
        async update(id, payload) {
            try {
                // Support passing a ready FormData directly
                if (payload instanceof FormData) {
                    if (!payload.has("_method"))
                        payload.append("_method", "PUT");

                    // Ensure CSRF token is in FormData
                    if (!payload.has("_token")) {
                        const csrfToken = document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content");
                        if (csrfToken) {
                            payload.append("_token", csrfToken);
                        }
                    }

                    const response = await fetch(
                        `/api/admin/school-seal-info/${id}`,
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "X-CSRF-TOKEN":
                                    document
                                        .querySelector(
                                            'meta[name="csrf-token"]'
                                        )
                                        ?.getAttribute("content") || "",
                            },
                            credentials: "include",
                            body: payload,
                        }
                    );
                    const data = await response.json();
                    if (!response.ok) return data;
                    return data;
                }

                // Use FormData for all updates to ensure consistency with backend
                const form = new FormData();
                form.append("_method", "PUT");

                Object.entries(payload).forEach(([k, v]) => {
                    if (v === undefined || v === null || v === "") return;
                    if (typeof v === "boolean") form.append(k, v ? "1" : "0");
                    else form.append(k, v);
                });

                const response = await fetch(
                    `/api/admin/school-seal-info/${id}`,
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "X-CSRF-TOKEN":
                                document
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.getAttribute("content") || "",
                        },
                        credentials: "include",
                        body: form,
                    }
                );
                const data = await response.json();

                if (!response.ok) {
                    // Return the error data so validation errors can be displayed
                    return data;
                }

                return data;
            } catch (error) {
                console.error("Error updating school seal info:", error);
                throw error;
            }
        },
        async delete(id) {
            try {
                const response = await fetch(
                    `/api/admin/school-seal-info/${id}`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error deleting school seal info:", error);
                throw error;
            }
        },
        async toggleActive(id) {
            try {
                const response = await fetch(
                    `/api/admin/school-seal-info/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(
                    "Error toggling school seal info active status:",
                    error
                );
                throw error;
            }
        },
    },

    schoolSealSymbolicElements: {
        async getAll() {
            try {
                const response = await fetch(
                    "/api/admin/school-seal-symbolic-elements",
                    {
                        method: "GET",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching symbolic elements:", error);
                throw error;
            }
        },
        async create(payload) {
            try {
                // Support passing a ready FormData directly
                if (payload instanceof FormData) {
                    // Ensure CSRF token is in FormData
                    if (!payload.has("_token")) {
                        const csrfToken = document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content");
                        if (csrfToken) {
                            payload.append("_token", csrfToken);
                        }
                    }

                    const response = await fetch(
                        "/api/admin/school-seal-symbolic-elements",
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                            },
                            credentials: "include",
                            body: payload,
                        }
                    );
                    const data = await response.json();
                    if (!response.ok) return data;
                    return data;
                }

                // If payload contains image (File), use FormData; else JSON
                if (payload.image instanceof File) {
                    const form = new FormData();
                    Object.entries(payload).forEach(([k, v]) => {
                        if (v === undefined || v === null || v === "") return;
                        if (typeof v === "boolean")
                            form.append(k, v ? "1" : "0");
                        else form.append(k, v);
                    });

                    // Add CSRF token
                    const csrfToken = document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content");
                    if (csrfToken) {
                        form.append("_token", csrfToken);
                    }

                    const response = await fetch(
                        "/api/admin/school-seal-symbolic-elements",
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                            },
                            credentials: "include",
                            body: form,
                        }
                    );
                    const data = await response.json();

                    if (!response.ok) {
                        // Return the error data so validation errors can be displayed
                        return data;
                    }

                    return data;
                } else {
                    const response = await fetch(
                        "/api/admin/school-seal-symbolic-elements",
                        {
                            method: "POST",
                            headers: getHeaders(),
                            credentials: "include",
                            body: JSON.stringify(payload),
                        }
                    );
                    const data = await response.json();

                    if (!response.ok) {
                        // Return the error data so validation errors can be displayed
                        return data;
                    }

                    return data;
                }
            } catch (error) {
                console.error("Error creating symbolic element:", error);
                throw error;
            }
        },
        async update(id, payload) {
            try {
                // Use FormData for all updates to ensure consistency with backend
                const form = new FormData();
                form.append("_method", "PUT");

                Object.entries(payload).forEach(([k, v]) => {
                    if (v === undefined || v === null || v === "") return;
                    if (typeof v === "boolean") form.append(k, v ? "1" : "0");
                    else form.append(k, v);
                });

                const response = await fetch(
                    `/api/admin/school-seal-symbolic-elements/${id}`,
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "X-CSRF-TOKEN":
                                document
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.getAttribute("content") || "",
                        },
                        credentials: "include",
                        body: form,
                    }
                );
                const data = await response.json();

                if (!response.ok) {
                    // Return the error data so validation errors can be displayed
                    return data;
                }

                return data;
            } catch (error) {
                console.error("Error updating symbolic element:", error);
                throw error;
            }
        },
        async delete(id) {
            try {
                const response = await fetch(
                    `/api/admin/school-seal-symbolic-elements/${id}`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error deleting symbolic element:", error);
                throw error;
            }
        },
        async toggleActive(id) {
            try {
                const response = await fetch(
                    `/api/admin/school-seal-symbolic-elements/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(
                    "Error toggling symbolic element active status:",
                    error
                );
                throw error;
            }
        },
    },

    schoolSealCoreValues: {
        async getAll() {
            try {
                const response = await fetch(
                    "/api/admin/school-seal-core-values",
                    {
                        method: "GET",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching core values:", error);
                throw error;
            }
        },
        async create(payload) {
            try {
                // Support passing a ready FormData directly
                if (payload instanceof FormData) {
                    // Ensure CSRF token is in FormData
                    if (!payload.has("_token")) {
                        const csrfToken = document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content");
                        if (csrfToken) {
                            payload.append("_token", csrfToken);
                        }
                    }

                    const response = await fetch(
                        "/api/admin/school-seal-core-values",
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                            },
                            credentials: "include",
                            body: payload,
                        }
                    );
                    const data = await response.json();
                    if (!response.ok) return data;
                    return data;
                }

                // If payload contains image (File), use FormData; else JSON
                if (payload.image instanceof File) {
                    const form = new FormData();
                    Object.entries(payload).forEach(([k, v]) => {
                        if (v === undefined || v === null || v === "") return;
                        if (typeof v === "boolean")
                            form.append(k, v ? "1" : "0");
                        else form.append(k, v);
                    });

                    // Add CSRF token
                    const csrfToken = document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content");
                    if (csrfToken) {
                        form.append("_token", csrfToken);
                    }

                    const response = await fetch(
                        "/api/admin/school-seal-core-values",
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "X-CSRF-TOKEN": getHeaders()["X-CSRF-TOKEN"],
                            },
                            credentials: "include",
                            body: form,
                        }
                    );
                    const data = await response.json();

                    if (!response.ok) {
                        // Return the error data so validation errors can be displayed
                        return data;
                    }

                    return data;
                } else {
                    const response = await fetch(
                        "/api/admin/school-seal-core-values",
                        {
                            method: "POST",
                            headers: getHeaders(),
                            credentials: "include",
                            body: JSON.stringify(payload),
                        }
                    );
                    const data = await response.json();

                    if (!response.ok) {
                        // Return the error data so validation errors can be displayed
                        return data;
                    }

                    return data;
                }
            } catch (error) {
                console.error("Error creating core value:", error);
                throw error;
            }
        },
        async update(id, payload) {
            try {
                // Use FormData for all updates to ensure consistency with backend
                const form = new FormData();
                form.append("_method", "PUT");

                Object.entries(payload).forEach(([k, v]) => {
                    if (v === undefined || v === null || v === "") return;
                    if (typeof v === "boolean") form.append(k, v ? "1" : "0");
                    else form.append(k, v);
                });

                const response = await fetch(
                    `/api/admin/school-seal-core-values/${id}`,
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "X-CSRF-TOKEN":
                                document
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.getAttribute("content") || "",
                        },
                        credentials: "include",
                        body: form,
                    }
                );
                const data = await response.json();

                if (!response.ok) {
                    // Return the error data so validation errors can be displayed
                    return data;
                }

                return data;
            } catch (error) {
                console.error("Error updating core value:", error);
                throw error;
            }
        },
        async delete(id) {
            try {
                const response = await fetch(
                    `/api/admin/school-seal-core-values/${id}`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error deleting core value:", error);
                throw error;
            }
        },
        async toggleActive(id) {
            try {
                const response = await fetch(
                    `/api/admin/school-seal-core-values/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                        credentials: "include",
                    }
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(
                    "Error toggling core value active status:",
                    error
                );
                throw error;
            }
        },
    },

    /**
     * Principal Corner Management
     */
    principalCorner: {
        // Get all principal corner content
        async getAll(filters = {}) {
            try {
                const queryParams = new URLSearchParams(filters);
                const response = await fetch(
                    `/api/admin/principal-corner?${queryParams}`,
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
                console.error(
                    "Error fetching principal corner content:",
                    error
                );
                throw error;
            }
        },

        // Create new principal corner content
        async create(contentData) {
            try {
                const response = await fetch("/api/admin/principal-corner", {
                    method: "POST",
                    headers: getHeaders(),
                    credentials: "include",
                    body: JSON.stringify(contentData),
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
                console.error(
                    "Error creating principal corner content:",
                    error
                );
                throw error;
            }
        },

        // Update principal corner content
        async update(id, contentData) {
            try {
                const response = await fetch(
                    `/api/admin/principal-corner/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        credentials: "include",
                        body: JSON.stringify(contentData),
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
                    "Error updating principal corner content:",
                    error
                );
                throw error;
            }
        },

        // Delete principal corner content
        async delete(id) {
            try {
                const response = await fetch(
                    `/api/admin/principal-corner/${id}`,
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
                    "Error deleting principal corner content:",
                    error
                );
                throw error;
            }
        },

        // Toggle active status
        async toggleActive(id) {
            try {
                const response = await fetch(
                    `/api/admin/principal-corner/${id}/toggle-active`,
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
                    "Error toggling principal corner content status:",
                    error
                );
                throw error;
            }
        },

        // Toggle featured status
        async toggleFeatured(id) {
            try {
                const response = await fetch(
                    `/api/admin/principal-corner/${id}/toggle-featured`,
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
                    "Error toggling principal corner featured status:",
                    error
                );
                throw error;
            }
        },

        // Get trashed content
        async getTrashed() {
            try {
                const response = await fetch(
                    "/api/admin/principal-corner-trashed",
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
                console.error("Error fetching trashed content:", error);
                throw error;
            }
        },

        // Restore trashed content
        async restore(id) {
            try {
                const response = await fetch(
                    `/api/admin/principal-corner/${id}/restore`,
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
                console.error("Error restoring content:", error);
                throw error;
            }
        },

        // Permanently delete content
        async forceDelete(id) {
            try {
                const response = await fetch(
                    `/api/admin/principal-corner/${id}/force`,
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
                console.error("Error permanently deleting content:", error);
                throw error;
            }
        },
    },

    /**
     * Staff Profiles Management
     */
    staffProfiles: {
        // Get all staff profiles
        async getAll(filters = {}) {
            try {
                const queryParams = new URLSearchParams(filters);
                const response = await makeRequest(
                    `/api/admin/staff-profiles?${queryParams}`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching staff profiles:", error);
                throw error;
            }
        },

        // Create new staff profile
        async create(staffData) {
            try {
                const response = await makeRequest(
                    "/api/admin/staff-profiles",
                    {
                        method: "POST",
                        headers: getHeaders(),
                        body: JSON.stringify(staffData),
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
                console.error("Error creating staff profile:", error);
                throw error;
            }
        },

        // Update staff profile
        async update(id, staffData) {
            try {
                const response = await makeRequest(
                    `/api/admin/staff-profiles/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        body: JSON.stringify(staffData),
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
                console.error("Error updating staff profile:", error);
                throw error;
            }
        },

        // Delete staff profile
        async delete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/staff-profiles/${id}`,
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
                console.error("Error deleting staff profile:", error);
                throw error;
            }
        },

        // Toggle active status
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/staff-profiles/${id}/toggle-active`,
                    {
                        method: "POST",
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
                console.error("Error toggling staff profile status:", error);
                throw error;
            }
        },
    },

    principalProfiles: {
        // Get all principal profiles
        async getAll() {
            try {
                const response = await makeRequest(
                    `/api/admin/principal-profiles`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.error("Error fetching principal profiles:", error);
                throw error;
            }
        },

        // Create principal profile
        async create(data) {
            try {
                const response = await makeRequest(
                    `/api/admin/principal-profiles`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                        body: JSON.stringify(data),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message || "Failed to create profile"
                    );
                }

                return await response.json();
            } catch (error) {
                console.error("Error creating principal profile:", error);
                throw error;
            }
        },

        // Update principal profile
        async update(id, data) {
            try {
                const response = await makeRequest(
                    `/api/admin/principal-profiles/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        body: JSON.stringify(data),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message || "Failed to update profile"
                    );
                }

                return await response.json();
            } catch (error) {
                console.error("Error updating principal profile:", error);
                throw error;
            }
        },

        // Delete principal profile
        async delete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/principal-profiles/${id}`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message || "Failed to delete profile"
                    );
                }

                return await response.json();
            } catch (error) {
                console.error("Error deleting principal profile:", error);
                throw error;
            }
        },

        // Toggle active status
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/principal-profiles/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message || "Failed to toggle status"
                    );
                }

                return await response.json();
            } catch (error) {
                console.error("Error toggling principal profile:", error);
                throw error;
            }
        },
    },

    principalAwards: {
        // Get all principal awards
        async getAll(principalProfileId) {
            try {
                const url = principalProfileId
                    ? `/api/admin/principal-awards?principal_profile_id=${principalProfileId}`
                    : `/api/admin/principal-awards`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: getHeaders(),
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.error("Error fetching principal awards:", error);
                throw error;
            }
        },

        // Create principal award
        async create(data) {
            try {
                const response = await makeRequest(
                    `/api/admin/principal-awards`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                        body: JSON.stringify(data),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message || "Failed to create award"
                    );
                }

                return await response.json();
            } catch (error) {
                console.error("Error creating principal award:", error);
                throw error;
            }
        },

        // Update principal award
        async update(id, data) {
            try {
                const response = await makeRequest(
                    `/api/admin/principal-awards/${id}`,
                    {
                        method: "PUT",
                        headers: getHeaders(),
                        body: JSON.stringify(data),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message || "Failed to update award"
                    );
                }

                return await response.json();
            } catch (error) {
                console.error("Error updating principal award:", error);
                throw error;
            }
        },

        // Delete principal award
        async delete(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/principal-awards/${id}`,
                    {
                        method: "DELETE",
                        headers: getHeaders(),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message || "Failed to delete award"
                    );
                }

                return await response.json();
            } catch (error) {
                console.error("Error deleting principal award:", error);
                throw error;
            }
        },

        // Toggle active status
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/principal-awards/${id}/toggle-active`,
                    {
                        method: "POST",
                        headers: getHeaders(),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message || "Failed to toggle status"
                    );
                }

                return await response.json();
            } catch (error) {
                console.error("Error toggling principal award:", error);
                throw error;
            }
        },
    },

    /**
     * Staff Profiles Management
     */
    async getStaffProfiles() {
        try {
            const response = await makeRequest("/api/staff-profiles", {
                method: "GET",
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error("Error fetching staff profiles:", error);
            return [];
        }
    },
};
