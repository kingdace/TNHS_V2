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

export const qualityPolicyService = {
    /**
     * Admin: Get all quality policies
     */
    async getAll() {
        try {
            const response = await fetch("/api/admin/quality-policies", {
                method: "GET",
                headers: getHeaders(),
                credentials: "include",
            });
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching quality policies:", error);
            throw error;
        }
    },

    /**
     * Admin: Create quality policy
     */
    async create(payload) {
        try {
            const response = await fetch("/api/admin/quality-policies", {
                method: "POST",
                headers: getHeaders(),
                credentials: "include",
                body: JSON.stringify(payload),
            });
            const data = await response.json();

            if (!response.ok) {
                return data;
            }

            return data;
        } catch (error) {
            console.error("Error creating quality policy:", error);
            throw error;
        }
    },

    /**
     * Admin: Update quality policy
     */
    async update(id, payload) {
        try {
            const response = await fetch(`/api/admin/quality-policies/${id}`, {
                method: "PUT",
                headers: getHeaders(),
                credentials: "include",
                body: JSON.stringify(payload),
            });
            const data = await response.json();

            if (!response.ok) {
                return data;
            }

            return data;
        } catch (error) {
            console.error("Error updating quality policy:", error);
            throw error;
        }
    },

    /**
     * Admin: Delete quality policy
     */
    async delete(id) {
        try {
            const response = await fetch(`/api/admin/quality-policies/${id}`, {
                method: "DELETE",
                headers: getHeaders(),
                credentials: "include",
            });
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error deleting quality policy:", error);
            throw error;
        }
    },

    /**
     * Admin: Toggle active status
     */
    async toggleActive(id) {
        try {
            const response = await fetch(
                `/api/admin/quality-policies/${id}/toggle-active`,
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
            console.error("Error toggling quality policy status:", error);
            throw error;
        }
    },

    /**
     * Public: Get active quality policy
     */
    async getPublic() {
        try {
            const response = await fetch(
                `${API_BASE_URL}/quality-policies/public`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error("Error fetching public quality policy:", error);
            return null;
        }
    },
};
