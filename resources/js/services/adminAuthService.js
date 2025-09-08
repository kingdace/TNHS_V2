/**
 * Admin Authentication Service
 * Handles admin authentication API calls
 */

const API_BASE_URL = "/admin";

export const adminAuthService = {
    /**
     * Login admin user
     */
    async login(credentials) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(credentials),
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
            console.error("Login error:", error);
            throw error;
        }
    },

    /**
     * Logout admin user
     */
    async logout() {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
            console.error("Logout error:", error);
            throw error;
        }
    },

    /**
     * Check authentication status
     */
    async checkAuth() {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/check`, {
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Auth check error:", error);
            return { authenticated: false, user: null };
        }
    },

    /**
     * Get current admin user info
     */
    async getCurrentUser() {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Get user error:", error);
            throw error;
        }
    },
};
