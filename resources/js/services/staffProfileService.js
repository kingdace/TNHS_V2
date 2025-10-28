import axios from "axios";

const API_BASE_URL = "/api";

export const staffProfileService = {
    // Get all staff profiles
    async getAll(params = {}) {
        try {
            const response = await axios.get(`${API_BASE_URL}/staff-profiles`, {
                params,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching staff profiles:", error);
            throw error;
        }
    },

    // Get staff profiles by type
    async getByType(type) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/staff-profiles/type/${type}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching staff profiles by type:", error);
            throw error;
        }
    },

    // Get staff profile by ID
    async getById(id) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/staff-profiles/${id}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching staff profile:", error);
            throw error;
        }
    },

    // Get active staff profiles
    async getActive() {
        try {
            const response = await axios.get(`${API_BASE_URL}/staff-profiles`, {
                params: { active: true },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching active staff profiles:", error);
            throw error;
        }
    },

    // Get staff profiles by department
    async getByDepartment(department) {
        try {
            const response = await axios.get(`${API_BASE_URL}/staff-profiles`, {
                params: { department },
            });
            return response.data;
        } catch (error) {
            console.error(
                "Error fetching staff profiles by department:",
                error
            );
            throw error;
        }
    },

    // Get leadership team (principal, assistant principal, etc.)
    async getLeadership() {
        try {
            const response = await axios.get(`${API_BASE_URL}/staff-profiles`, {
                params: { type: "principal,assistant_principal,head_teacher" },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching leadership team:", error);
            throw error;
        }
    },

    // Get teaching staff
    async getTeachingStaff() {
        try {
            const response = await axios.get(`${API_BASE_URL}/staff-profiles`, {
                params: { type: "teacher" },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching teaching staff:", error);
            throw error;
        }
    },

    // Get administrative staff
    async getAdministrativeStaff() {
        try {
            const response = await axios.get(`${API_BASE_URL}/staff-profiles`, {
                params: { type: "administrative" },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching administrative staff:", error);
            throw error;
        }
    },

    // Get support staff
    async getSupportStaff() {
        try {
            const response = await axios.get(`${API_BASE_URL}/staff-profiles`, {
                params: { type: "support" },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching support staff:", error);
            throw error;
        }
    },
};
