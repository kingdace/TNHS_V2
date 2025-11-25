/**
 * Contact Service
 * Handles all contact-related API calls for both public and admin functionality
 */

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Helper function to get authentication headers
const getHeaders = () => {
    const token = localStorage.getItem("auth_token");
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

// Helper function to make requests with proper error handling
const makeRequest = async (url, options = {}) => {
    const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

    try {
        const response = await fetch(fullUrl, {
            ...options,
            headers: {
                ...getHeaders(),
                ...options.headers,
            },
        });

        return response;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};

export const contactService = {
    /**
     * PUBLIC METHODS - For public pages (no authentication required)
     */
    public: {
        // Get all active contact information for public display
        async getAll() {
            try {
                console.log(
                    "Fetching contact info from:",
                    `${API_BASE_URL}/api/contact-info`
                );
                const response = await makeRequest("/api/contact-info");

                console.log("Response status:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Contact data received:", data);
                return data;
            } catch (error) {
                console.error("Error fetching public contact info:", error);
                throw error;
            }
        },

        // Get contact information by type (email, phone, address, hours, etc.)
        async getByType(type) {
            try {
                const response = await makeRequest(
                    `/api/contact-info/type/${type}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error(
                    `Error fetching contact info by type ${type}:`,
                    error
                );
                throw error;
            }
        },

        // Get specific contact types with dedicated methods
        async getEmails() {
            try {
                const response = await makeRequest("/api/contact-info/emails");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching email contacts:", error);
                throw error;
            }
        },

        async getPhones() {
            try {
                const response = await makeRequest("/api/contact-info/phones");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching phone contacts:", error);
                throw error;
            }
        },

        async getAddresses() {
            try {
                const response = await makeRequest(
                    "/api/contact-info/addresses"
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching address contacts:", error);
                throw error;
            }
        },

        async getHours() {
            try {
                const response = await makeRequest("/api/contact-info/hours");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching office hours:", error);
                throw error;
            }
        },
    },

    /**
     * ADMIN METHODS - For admin panel (authentication required)
     */
    admin: {
        // Get all contact information with filters
        async getAll(filters = {}) {
            try {
                const queryParams = new URLSearchParams(filters);
                const response = await makeRequest(
                    `/api/admin/contact-info?${queryParams}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching admin contact info:", error);
                throw error;
            }
        },

        // Create new contact information
        async create(contactData) {
            try {
                const response = await makeRequest("/api/admin/contact-info", {
                    method: "POST",
                    body: JSON.stringify(contactData),
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
                console.error("Error creating contact info:", error);
                throw error;
            }
        },

        // Update contact information
        async update(id, contactData) {
            try {
                const response = await makeRequest(
                    `/api/admin/contact-info/${id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(contactData),
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
                console.error("Error updating contact info:", error);
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
                console.error("Error deleting contact info:", error);
                throw error;
            }
        },

        // Toggle active status
        async toggleActive(id) {
            try {
                const response = await makeRequest(
                    `/api/admin/contact-info/${id}/toggle-active`,
                    {
                        method: "POST",
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
                console.error("Error toggling contact info status:", error);
                throw error;
            }
        },

        // Reorder contact information
        async reorder(orderData) {
            try {
                const response = await makeRequest(
                    "/api/admin/contact-info/reorder",
                    {
                        method: "POST",
                        body: JSON.stringify(orderData),
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
                console.error("Error reordering contact info:", error);
                throw error;
            }
        },
    },
};
