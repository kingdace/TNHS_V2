import { adminService } from "./adminService";

const themeService = {
    /**
     * Get the currently active theme
     */
    async getActiveTheme() {
        try {
            const response = await fetch("/api/theme/active");
            if (!response.ok) {
                throw new Error("Failed to fetch active theme");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching active theme:", error);
            // Return default theme as fallback
            return {
                id: 1,
                name: "Royal Blue",
                slug: "royal-blue",
                colors: {
                    primary: "#1e3a8a",
                    secondary: "#3b82f6",
                    gradient_from: "#1e3a8a",
                    gradient_via: "#1e40af",
                    gradient_to: "#4338ca",
                    accent: "#fbbf24",
                    text_light: "#e0e7ff",
                    text_lighter: "#bfdbfe",
                    hover: "#2563eb",
                },
            };
        }
    },

    /**
     * Get all available themes (Admin only)
     */
    async getAllThemes() {
        return await adminService.getThemes();
    },

    /**
     * Activate a theme (Admin only)
     */
    async activateTheme(themeId) {
        return await adminService.activateTheme(themeId);
    },
};

export default themeService;
