import axios from "axios";

const API_BASE_URL = "/api";

export const academicProgramService = {
    // Get all academic programs
    async getAll(params = {}) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/academic-programs`,
                { params }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching academic programs:", error);
            throw error;
        }
    },

    // Get academic programs by grade level
    async getByGrade(grade) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/academic-programs/grade/${grade}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching academic programs by grade:", error);
            throw error;
        }
    },

    // Get academic programs by type
    async getByType(type) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/academic-programs/type/${type}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching academic programs by type:", error);
            throw error;
        }
    },

    // Get academic program by ID
    async getById(id) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/academic-programs/${id}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching academic program:", error);
            throw error;
        }
    },

    // Get featured academic programs
    async getFeatured() {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/academic-programs`,
                { params: { featured: true } }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching featured academic programs:", error);
            throw error;
        }
    },

    // Get active academic programs
    async getActive() {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/academic-programs`,
                { params: { active: true } }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching active academic programs:", error);
            throw error;
        }
    },
};
