import axios from "axios";

const API_BASE_URL = "/api/admin";

// Helper function to get CSRF token
const getCSRFToken = () => {
    const token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");
    return token || "";
};

// Configure axios defaults
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export const seniorHighStrandService = {
    // Get all strands
    async getAll() {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/senior-high-strands`,
                {
                    headers: {
                        "X-CSRF-TOKEN": getCSRFToken(),
                    },
                }
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error fetching strands:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message || "Failed to fetch strands",
            };
        }
    },

    // Get single strand by ID
    async getById(id) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/senior-high-strands/${id}`,
                {
                    headers: {
                        "X-CSRF-TOKEN": getCSRFToken(),
                    },
                }
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error fetching strand:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message || "Failed to fetch strand",
            };
        }
    },

    // Create new strand
    async create(data) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/senior-high-strands`,
                data,
                {
                    headers: {
                        "X-CSRF-TOKEN": getCSRFToken(),
                    },
                }
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error creating strand:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message || "Failed to create strand",
                errors: error.response?.data?.errors,
            };
        }
    },

    // Update strand
    async update(id, data) {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/senior-high-strands/${id}`,
                data,
                {
                    headers: {
                        "X-CSRF-TOKEN": getCSRFToken(),
                    },
                }
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error updating strand:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message || "Failed to update strand",
                errors: error.response?.data?.errors,
            };
        }
    },

    // Delete strand
    async delete(id) {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/senior-high-strands/${id}`,
                {
                    headers: {
                        "X-CSRF-TOKEN": getCSRFToken(),
                    },
                }
            );
            return {
                success: true,
                message: response.data.message,
            };
        } catch (error) {
            console.error("Error deleting strand:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message || "Failed to delete strand",
            };
        }
    },

    // Toggle active status
    async toggleActive(id) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/senior-high-strands/${id}/toggle-active`,
                {},
                {
                    headers: {
                        "X-CSRF-TOKEN": getCSRFToken(),
                    },
                }
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error toggling strand status:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to toggle strand status",
            };
        }
    },

    // Reorder strands
    async reorder(strands) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/senior-high-strands/reorder`,
                { strands },
                {
                    headers: {
                        "X-CSRF-TOKEN": getCSRFToken(),
                    },
                }
            );
            return {
                success: true,
                message: response.data.message,
            };
        } catch (error) {
            console.error("Error reordering strands:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to reorder strands",
            };
        }
    },
};
