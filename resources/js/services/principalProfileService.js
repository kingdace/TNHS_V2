/**
 * Principal Profile Service
 * Handles fetching principal profile, awards, and related content
 */

const API_BASE_URL = "/api";

export const principalProfileService = {
    /**
     * Get active principal profile
     */
    async getProfile() {
        try {
            const response = await fetch(`${API_BASE_URL}/principal-profiles`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error("Error fetching principal profile:", error);
            return null;
        }
    },

    /**
     * Get principal awards
     */
    async getAwards() {
        try {
            const response = await fetch(`${API_BASE_URL}/principal-awards`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error("Error fetching principal awards:", error);
            return [];
        }
    },

    /**
     * Get principal biography (from principal_corner)
     */
    async getBiography() {
        try {
            const response = await fetch(
                `${API_BASE_URL}/principal-corner?type=biography`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.success && data.data.length > 0 ? data.data[0] : null;
        } catch (error) {
            console.error("Error fetching principal biography:", error);
            return null;
        }
    },

    /**
     * Get principal vision/PDS (from principal_corner)
     */
    async getVision() {
        try {
            const response = await fetch(
                `${API_BASE_URL}/principal-corner?type=vision`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.success && data.data.length > 0 ? data.data[0] : null;
        } catch (error) {
            console.error("Error fetching principal vision:", error);
            return null;
        }
    },

    /**
     * Get all principal data at once
     */
    async getAllData() {
        try {
            const [profile, awards, biography, vision] = await Promise.all([
                this.getProfile(),
                this.getAwards(),
                this.getBiography(),
                this.getVision(),
            ]);

            return {
                profile,
                awards,
                biography,
                vision,
            };
        } catch (error) {
            console.error("Error fetching all principal data:", error);
            return {
                profile: null,
                awards: [],
                biography: null,
                vision: null,
            };
        }
    },
};
