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

export const privacyPolicyService = {
    /**
     * Admin: Get all privacy policies
     */
    async getAll() {
        try {
            const response = await fetch("/api/admin/privacy-policies", {
                method: "GET",
                headers: getHeaders(),
                credentials: "include",
            });
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching privacy policies:", error);
            throw error;
        }
    },

    /**
     * Admin: Create privacy policy
     */
    async create(payload) {
        try {
            const response = await fetch("/api/admin/privacy-policies", {
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
            console.error("Error creating privacy policy:", error);
            throw error;
        }
    },

    /**
     * Admin: Update privacy policy
     */
    async update(id, payload) {
        try {
            const response = await fetch(`/api/admin/privacy-policies/${id}`, {
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
            console.error("Error updating privacy policy:", error);
            throw error;
        }
    },

    /**
     * Admin: Delete privacy policy
     */
    async delete(id) {
        try {
            const response = await fetch(`/api/admin/privacy-policies/${id}`, {
                method: "DELETE",
                headers: getHeaders(),
                credentials: "include",
            });
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error deleting privacy policy:", error);
            throw error;
        }
    },

    /**
     * Admin: Toggle active status
     */
    async toggleActive(id) {
        try {
            const response = await fetch(
                `/api/admin/privacy-policies/${id}/toggle-active`,
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
            console.error("Error toggling privacy policy status:", error);
            throw error;
        }
    },

    /**
     * Public: Get active privacy policy
     */
    async getPublic() {
        try {
            const response = await fetch(
                `${API_BASE_URL}/privacy-policies/public`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error("Error fetching public privacy policy:", error);
            return null;
        }
    },
};
