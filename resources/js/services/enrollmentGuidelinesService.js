import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

class EnrollmentGuidelinesService {
    constructor() {
        this.baseURL = `${API_BASE_URL}/api/enrollment-guidelines`;
        this.adminBaseURL = `${API_BASE_URL}/api/admin/enrollment-guidelines`;
    }

    // Public API methods
    async getAll() {
        try {
            const response = await axios.get(this.baseURL);
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error fetching enrollment guidelines:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to fetch enrollment guidelines",
            };
        }
    }

    async getInfoCards() {
        try {
            const response = await axios.get(`${this.baseURL}/info-cards`);
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error fetching info cards:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to fetch info cards",
            };
        }
    }

    async getGradeCategories() {
        try {
            const response = await axios.get(
                `${this.baseURL}/grade-categories`
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error fetching grade categories:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to fetch grade categories",
            };
        }
    }

    async getSpecialPrograms() {
        try {
            const response = await axios.get(
                `${this.baseURL}/special-programs`
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error fetching special programs:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to fetch special programs",
            };
        }
    }

    async getCategory(categoryId) {
        try {
            const response = await axios.get(
                `${this.baseURL}/category/${categoryId}`
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error fetching category:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message || "Failed to fetch category",
            };
        }
    }

    async getSpecialProgram(programId) {
        try {
            const response = await axios.get(
                `${this.baseURL}/special-program/${programId}`
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error fetching special program:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to fetch special program",
            };
        }
    }

    // Admin API methods
    async getAdminData() {
        try {
            const response = await axios.get(this.adminBaseURL, {
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"),
                },
            });
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error fetching admin enrollment guidelines:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to fetch admin data",
            };
        }
    }

    async updateInfoCards(cards) {
        try {
            const response = await axios.put(
                `${this.adminBaseURL}/info-cards`,
                {
                    cards: cards,
                },
                {
                    headers: {
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content"),
                        "Content-Type": "application/json",
                    },
                }
            );
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error("Error updating info cards:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to update info cards",
                errors: error.response?.data?.errors || {},
            };
        }
    }

    async updateCategory(categoryId, categoryData) {
        try {
            const response = await axios.put(
                `${this.adminBaseURL}/category/${categoryId}`,
                categoryData,
                {
                    headers: {
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content"),
                        "Content-Type": "application/json",
                    },
                }
            );
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error("Error updating category:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to update category",
                errors: error.response?.data?.errors || {},
            };
        }
    }

    async updateSpecialProgram(programId, programData) {
        try {
            const response = await axios.put(
                `${this.adminBaseURL}/special-program/${programId}`,
                programData,
                {
                    headers: {
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content"),
                        "Content-Type": "application/json",
                    },
                }
            );
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error("Error updating special program:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to update special program",
                errors: error.response?.data?.errors || {},
            };
        }
    }

    // Helper methods for data transformation
    transformInfoCardForAdmin(card) {
        return {
            id: card.id,
            card_type: card.card_type,
            title: card.title,
            content: card.content,
            details: card.details || "",
            icon: card.icon || "",
            color: card.color || "",
            is_active: card.is_active,
            display_order: card.display_order,
        };
    }

    transformCategoryForAdmin(category) {
        return {
            category_id: category.category_id,
            name: category.name,
            description: category.description || "",
            icon: category.icon || "",
            color_gradient: category.color_gradient || "",
            bg_color: category.bg_color || "",
            border_color: category.border_color || "",
            notes: category.notes || "",
            is_active: category.is_active,
            display_order: category.display_order,
            requirements:
                category.requirements?.map((req) => req.requirement_text) || [],
            processes: category.processes?.map((proc) => proc.step_text) || [],
        };
    }

    transformSpecialProgramForAdmin(program) {
        return {
            program_id: program.program_id,
            name: program.name,
            description: program.description || "",
            icon: program.icon || "",
            color_gradient: program.color_gradient || "",
            bg_color: program.bg_color || "",
            border_color: program.border_color || "",
            notes: program.notes || "",
            features: program.features || [],
            is_active: program.is_active,
            display_order: program.display_order,
            requirements:
                program.requirements?.map((req) => req.requirement_text) || [],
            processes: program.processes?.map((proc) => proc.step_text) || [],
        };
    }

    // Icon mapping for frontend
    getIconComponent(iconName) {
        const iconMap = {
            Calendar: "Calendar",
            Users: "Users",
            Award: "Award",
            Globe: "Globe",
            GraduationCap: "GraduationCap",
            Brain: "Brain",
            FileText: "FileText",
            BookOpen: "BookOpen",
            Star: "Star",
        };
        return iconMap[iconName] || "FileText";
    }
}

export const enrollmentGuidelinesService = new EnrollmentGuidelinesService();
