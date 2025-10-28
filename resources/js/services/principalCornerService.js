import axios from "axios";

const API_BASE_URL = "/api";

export const principalCornerService = {
    // Get all principal corner content
    async getAll(params = {}) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/principal-corner`,
                { params }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching principal corner content:", error);
            throw error;
        }
    },

    // Get featured principal corner content
    async getFeatured() {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/principal-corner/featured`
            );
            return response.data;
        } catch (error) {
            console.error(
                "Error fetching featured principal corner content:",
                error
            );
            throw error;
        }
    },

    // Get principal messages
    async getMessages() {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/principal-corner/messages`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching principal messages:", error);
            throw error;
        }
    },

    // Get principal announcements
    async getAnnouncements() {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/principal-corner/announcements`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching principal announcements:", error);
            throw error;
        }
    },

    // Get principal vision
    async getVision() {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/principal-corner/vision`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching principal vision:", error);
            throw error;
        }
    },

    // Get specific principal corner content by ID
    async getById(id) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/principal-corner/${id}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching principal corner content:", error);
            throw error;
        }
    },

    // Get content by type
    async getByType(type) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/principal-corner`,
                {
                    params: { type },
                }
            );
            return response.data;
        } catch (error) {
            console.error(
                "Error fetching principal corner content by type:",
                error
            );
            throw error;
        }
    },
};
