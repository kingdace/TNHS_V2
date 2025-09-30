import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
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
    });
    const [newSubject, setNewSubject] = useState("");

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

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await adminService.academicPrograms.create(
                formData
            );
            if (response.success) {
                setShowForm(false);
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
                });
                fetchPrograms();
            }
        } catch (err) {
            setError("Failed to create academic program");
            console.error("Error creating program:", err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await adminService.academicPrograms.update(
                editingProgram.id,
                formData
            );
            if (response.success) {
                setShowForm(false);
                setEditingProgram(null);
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
                });
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
        });
        setShowForm(true);
    };

    const addSubject = () => {
        if (newSubject.trim()) {
            setFormData({
                ...formData,
                subjects: [...formData.subjects, newSubject.trim()],
            });
            setNewSubject("");
        }
    };

    const removeSubject = (index) => {
        setFormData({
            ...formData,
            subjects: formData.subjects.filter((_, i) => i !== index),
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
                                className="p-6 hover:bg-gray-50 transition-colors"
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

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                {editingProgram
                                    ? "Edit Program"
                                    : "Add New Program"}
                            </h2>

                            <form
                                onSubmit={
                                    editingProgram ? handleUpdate : handleCreate
                                }
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Program Type
                                        </label>
                                        <select
                                            value={formData.program_type}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    program_type:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="junior_high">
                                                Junior High School
                                            </option>
                                            <option value="senior_high">
                                                Senior High School
                                            </option>
                                            <option value="special">
                                                ALS Program
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Grade Level
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="12"
                                            value={formData.grade_level}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    grade_level: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Program Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.program_name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                program_name: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subjects
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={newSubject}
                                            onChange={(e) =>
                                                setNewSubject(e.target.value)
                                            }
                                            placeholder="Add a subject"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    addSubject();
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={addSubject}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.subjects.map(
                                            (subject, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                                >
                                                    {subject}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeSubject(index)
                                                        }
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Requirements
                                    </label>
                                    <textarea
                                        value={formData.requirements}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                requirements: e.target.value,
                                            })
                                        }
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Duration
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.duration}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    duration: e.target.value,
                                                })
                                            }
                                            placeholder="e.g., 1 Year, 2 Semesters"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Display Order
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.display_order}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    display_order:
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={formData.is_active}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                is_active: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="is_active"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Active
                                    </label>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingProgram(null);
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
                                            });
                                        }}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        {editingProgram ? "Update" : "Create"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcademicPrograms;
