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

    // Get Junior High School program with rich content
    async getJuniorHigh() {
        try {
            // Try the new endpoint first
            const response = await axios.get(
                `${API_BASE_URL}/academic-programs/junior-high-content`
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error fetching Junior High program:", error);

            // Fallback: try to get by type and filter
            try {
                const fallbackResponse = await axios.get(
                    `${API_BASE_URL}/academic-programs/type/junior_high`
                );

                const programs = fallbackResponse.data.data || [];
                const juniorHighProgram = programs.find(
                    (p) => p.program_name === "Junior High School Program"
                );

                if (juniorHighProgram) {
                    return {
                        success: true,
                        data: juniorHighProgram,
                    };
                }
            } catch (fallbackError) {
                console.error("Fallback also failed:", fallbackError);
            }

            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to fetch Junior High program",
            };
        }
    },

    // Update Junior High School program content
    async updateJuniorHigh(data) {
        try {
            // First, try to get the existing Junior High program
            const existingResponse = await this.getJuniorHigh();

            if (existingResponse.success && existingResponse.data?.id) {
                // Update existing program
                const response = await axios.put(
                    `/api/admin/academic-programs/${existingResponse.data.id}`,
                    data
                );
                return {
                    success: true,
                    data: response.data.data,
                };
            } else {
                // Create new Junior High program
                const response = await axios.post(
                    `/api/admin/academic-programs`,
                    data
                );
                return {
                    success: true,
                    data: response.data.data,
                };
            }
        } catch (error) {
            console.error("Error updating Junior High program:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to update Junior High program",
            };
        }
    },

    // Get ALS program with rich content
    async getALS() {
        try {
            // Try the new endpoint first
            const response = await axios.get(
                `${API_BASE_URL}/academic-programs/als-content`
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error fetching ALS program:", error);

            // Fallback: try to get by type and filter
            try {
                const fallbackResponse = await axios.get(
                    `${API_BASE_URL}/academic-programs/type/special`
                );

                const programs = fallbackResponse.data.data || [];
                const alsProgram = programs.find(
                    (p) =>
                        p.program_name === "Alternative Learning System (ALS)"
                );

                if (alsProgram) {
                    return {
                        success: true,
                        data: alsProgram,
                    };
                }
            } catch (fallbackError) {
                console.error("Fallback also failed:", fallbackError);
            }

            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to fetch ALS program",
            };
        }
    },

    // Update ALS program content
    async updateALS(data) {
        try {
            // First, try to get the existing ALS program
            const existingResponse = await this.getALS();

            if (existingResponse.success && existingResponse.data?.id) {
                // Update existing program
                const response = await axios.put(
                    `/api/admin/academic-programs/${existingResponse.data.id}`,
                    data
                );
                return {
                    success: true,
                    data: response.data.data,
                };
            } else {
                // Create new ALS program
                const response = await axios.post(
                    `/api/admin/academic-programs`,
                    data
                );
                return {
                    success: true,
                    data: response.data.data,
                };
            }
        } catch (error) {
            console.error("Error updating ALS program:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to update ALS program",
            };
        }
    },
};
