import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import AcademicProgramForm from "../../components/admin/AcademicProgramForm";
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    GripVertical,
    Search,
    Filter,
    BookOpen,
    GraduationCap,
    Star,
    AlertCircle,
    CheckCircle,
    Loader2,
} from "lucide-react";

const AcademicPrograms = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);
    const [formData, setFormData] = useState({
        program_type: "junior_high",
        grade_level: "",
        program_name: "",
        description: "",
        subjects: [],
        requirements: "",
        duration: "",
        is_active: true,
        display_order: 0,
        // Rich content fields
        page_content: {
            header_title: "",
            main_description: "",
            section_titles: {
                benefits: "PROGRAM BENEFITS",
                features: "Why Choose This Program?",
                requirements: "Admission Requirements",
            },
        },
        program_benefits: [],
        why_choose_features: [],
        admission_requirements: {
            documents: [],
            schedule: [],
        },
        images: {
            logo: "",
            academic_excellence: "",
            student_life: "",
        },
        curriculum_highlights: [],
        facilities: [],
        extracurricular_activities: [],
        meta_title: "",
        meta_description: "",
        meta_keywords: [],
        featured: false,
        banner_color: "blue",
        theme_color: "blue",
    });

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            setLoading(true);
            const response = await adminService.academicPrograms.getAll({
                type: filterType,
                active: null,
            });
            setPrograms(response.data || []);
            setError("");
        } catch (err) {
            setError("Failed to fetch academic programs");
            console.error("Error fetching programs:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (formData) => {
        try {
            const response = await adminService.academicPrograms.create(
                formData
            );
            if (response.success) {
                setShowForm(false);
                resetFormData();
                fetchPrograms();
            }
        } catch (err) {
            setError("Failed to create academic program");
            console.error("Error creating program:", err);
        }
    };

    const handleUpdate = async (formData) => {
        try {
            const response = await adminService.academicPrograms.update(
                editingProgram.id,
                formData
            );
            if (response.success) {
                setShowForm(false);
                setEditingProgram(null);
                resetFormData();
                fetchPrograms();
            }
        } catch (err) {
            setError("Failed to update academic program");
            console.error("Error updating program:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this program?")) {
            try {
                await adminService.academicPrograms.delete(id);
                fetchPrograms();
            } catch (err) {
                setError("Failed to delete academic program");
                console.error("Error deleting program:", err);
            }
        }
    };

    const handleToggleActive = async (id) => {
        try {
            await adminService.academicPrograms.toggleActive(id);
            fetchPrograms();
        } catch (err) {
            setError("Failed to toggle program status");
            console.error("Error toggling program:", err);
        }
    };

    const handleEdit = (program) => {
        setEditingProgram(program);
        setFormData({
            program_type: program.program_type,
            grade_level: program.grade_level || "",
            program_name: program.program_name,
            description: program.description || "",
            subjects: program.subjects || [],
            requirements: program.requirements || "",
            duration: program.duration || "",
            is_active: program.is_active,
            display_order: program.display_order,
            // Rich content fields with fallbacks
            page_content: program.page_content || {
                header_title: "",
                main_description: "",
                section_titles: {
                    benefits: "PROGRAM BENEFITS",
                    features: "Why Choose This Program?",
                    requirements: "Admission Requirements",
                },
            },
            program_benefits: program.program_benefits || [],
            why_choose_features: program.why_choose_features || [],
            admission_requirements: program.admission_requirements || {
                documents: [],
                schedule: [],
            },
            images: program.images || {
                logo: "",
                academic_excellence: "",
                student_life: "",
            },
            curriculum_highlights: program.curriculum_highlights || [],
            facilities: program.facilities || [],
            extracurricular_activities:
                program.extracurricular_activities || [],
            meta_title: program.meta_title || "",
            meta_description: program.meta_description || "",
            meta_keywords: program.meta_keywords || [],
            featured: program.featured || false,
            banner_color: program.banner_color || "blue",
            theme_color: program.theme_color || "blue",
        });
        setShowForm(true);
    };

    const resetFormData = () => {
        setFormData({
            program_type: "junior_high",
            grade_level: "",
            program_name: "",
            description: "",
            subjects: [],
            requirements: "",
            duration: "",
            is_active: true,
            display_order: 0,
            page_content: {
                header_title: "",
                main_description: "",
                section_titles: {
                    benefits: "PROGRAM BENEFITS",
                    features: "Why Choose This Program?",
                    requirements: "Admission Requirements",
                },
            },
            program_benefits: [],
            why_choose_features: [],
            admission_requirements: {
                documents: [],
                schedule: [],
            },
            images: {
                logo: "",
                academic_excellence: "",
                student_life: "",
            },
            curriculum_highlights: [],
            facilities: [],
            extracurricular_activities: [],
            meta_title: "",
            meta_description: "",
            meta_keywords: [],
            featured: false,
            banner_color: "blue",
            theme_color: "blue",
        });
    };

    const getProgramTypeIcon = (type) => {
        switch (type) {
            case "junior_high":
                return <BookOpen className="h-5 w-5" />;
            case "senior_high":
                return <GraduationCap className="h-5 w-5" />;
            case "special":
                return <Star className="h-5 w-5" />;
            default:
                return <BookOpen className="h-5 w-5" />;
        }
    };

    const getProgramTypeColor = (type) => {
        switch (type) {
            case "junior_high":
                return "bg-blue-100 text-blue-800";
            case "senior_high":
                return "bg-green-100 text-green-800";
            case "special":
                return "bg-orange-100 text-orange-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const filteredPrograms = programs.filter((program) => {
        const matchesSearch = program.program_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesFilter =
            !filterType || program.program_type === filterType;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl px-6 py-4 text-white shadow-lg flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Academic Programs</h1>
                    <p className="text-blue-100 text-sm">
                        Manage academic programs and curriculum
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-royal-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Program
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search programs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="w-48">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Types</option>
                            <option value="junior_high">Junior High</option>
                            <option value="senior_high">Senior High</option>
                            <option value="special">ALS Program</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    {error}
                </div>
            )}

            {/* Programs List */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
                {filteredPrograms.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No programs found
                        </h3>
                        <p className="text-gray-600">
                            {searchTerm || filterType
                                ? "Try adjusting your search or filters"
                                : "Get started by adding your first academic program"}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {filteredPrograms.map((program) => (
                            <div
                                key={program.id}
                                className="p-6 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div
                                                className={`p-2 rounded-lg ${getProgramTypeColor(
                                                    program.program_type
                                                )}`}
                                            >
                                                {getProgramTypeIcon(
                                                    program.program_type
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {program.program_name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="capitalize">
                                                        {program.program_type.replace(
                                                            "_",
                                                            " "
                                                        )}
                                                    </span>
                                                    {program.grade_level && (
                                                        <>
                                                            <span>•</span>
                                                            <span>
                                                                Grade{" "}
                                                                {
                                                                    program.grade_level
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                    {program.duration && (
                                                        <>
                                                            <span>•</span>
                                                            <span>
                                                                {
                                                                    program.duration
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {program.description && (
                                            <p className="text-gray-600 mb-3">
                                                {program.description}
                                            </p>
                                        )}

                                        {program.subjects &&
                                            program.subjects.length > 0 && (
                                                <div className="mb-3">
                                                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                                                        Subjects:
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {program.subjects.map(
                                                            (
                                                                subject,
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={index}
                                                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                                                >
                                                                    {subject}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        {program.requirements && (
                                            <div className="mb-3">
                                                <h4 className="text-sm font-medium text-gray-900 mb-1">
                                                    Requirements:
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {program.requirements}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                                    program.is_active
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {program.is_active ? (
                                                    <CheckCircle className="h-3 w-3" />
                                                ) : (
                                                    <AlertCircle className="h-3 w-3" />
                                                )}
                                                {program.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                Order: {program.display_order}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 ml-4">
                                        <button
                                            onClick={() =>
                                                handleToggleActive(program.id)
                                            }
                                            className={`p-2 rounded-lg transition-colors ${
                                                program.is_active
                                                    ? "text-red-600 hover:bg-red-50"
                                                    : "text-green-600 hover:bg-green-50"
                                            }`}
                                            title={
                                                program.is_active
                                                    ? "Deactivate"
                                                    : "Activate"
                                            }
                                        >
                                            {program.is_active ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleEdit(program)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(program.id)
                                            }
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Enhanced Form Modal */}
            {showForm && (
                <AcademicProgramForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={editingProgram ? handleUpdate : handleCreate}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingProgram(null);
                        resetFormData();
                    }}
                    editingProgram={editingProgram}
                />
            )}
        </div>
    );
};

export default AcademicPrograms;
