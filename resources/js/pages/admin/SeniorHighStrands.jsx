import React, { useState, useEffect } from "react";
import {
    Save,
    Plus,
    Trash2,
    AlertCircle,
    CheckCircle,
    Loader2,
    Edit,
    GripVertical,
    Eye,
    EyeOff,
    X,
    School,
} from "lucide-react";
import { seniorHighStrandService } from "../../services/seniorHighStrandService";

const SeniorHighStrands = () => {
    const [strands, setStrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingStrand, setEditingStrand] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const [formData, setFormData] = useState({
        strand_id: "",
        title: "",
        short_title: "",
        header_title: "",
        description: "",
        features: [""],
        color: "",
        bg_color: "",
        border_color: "",
        icon: "",
        gradient: "",
        image_path: "",
        career_paths: [],
        strand_overview: [{ number: 1, text: "" }],
        career_guide_intro: "",
        is_active: true,
        display_order: 0,
    });

    useEffect(() => {
        fetchStrands();
    }, []);

    const fetchStrands = async () => {
        try {
            setLoading(true);
            const response = await seniorHighStrandService.getAll();
            if (response.success) {
                setStrands(response.data || []);
            } else {
                setError(response.error || "Failed to fetch strands");
            }
        } catch (err) {
            console.error("Error fetching strands:", err);
            setError("Failed to load strands");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (strand = null) => {
        if (strand) {
            setEditingStrand(strand);
            setFormData({
                strand_id: strand.strand_id || "",
                short_title: strand.short_title || "",
                header_title: strand.header_title || "",
                features: strand.features?.length > 0 ? strand.features : [""],
                color: strand.color || "",
                bg_color: strand.bg_color || "",
                border_color: strand.border_color || "",
                icon: strand.icon || "",
                gradient: strand.gradient || "",
                image_path: strand.image_path || "",
                career_paths: strand.career_paths || [],
                strand_overview:
                    strand.strand_overview?.length > 0
                        ? strand.strand_overview
                        : [{ number: 1, text: "" }],
                career_guide_intro: strand.career_guide_intro || "",
                is_active: strand.is_active ?? true,
                display_order: strand.display_order || 0,
            });
        } else {
            setEditingStrand(null);
            setFormData({
                strand_id: "",
                short_title: "",
                header_title: "",
                features: [""],
                color: "",
                bg_color: "",
                border_color: "",
                icon: "",
                gradient: "",
                image_path: "",
                career_paths: [],
                strand_overview: [{ number: 1, text: "" }],
                career_guide_intro: "",
                is_active: true,
                display_order: strands.length,
            });
        }
        setShowModal(true);
        setError("");
        setSuccess("");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingStrand(null);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            // Clean the data before sending
            const cleanedData = {
                ...formData,
                // Filter out empty features
                features:
                    formData.features.filter((f) => f.trim() !== "").length > 0
                        ? formData.features.filter((f) => f.trim() !== "")
                        : null,
                // Filter out empty strand overview items
                strand_overview:
                    formData.strand_overview.filter(
                        (item) => item.text.trim() !== ""
                    ).length > 0
                        ? formData.strand_overview.filter(
                              (item) => item.text.trim() !== ""
                          )
                        : null,
                // Send null for empty career paths
                career_paths:
                    formData.career_paths.length > 0
                        ? formData.career_paths
                        : null,
                // Send null for empty strings
                color: formData.color.trim() || null,
                bg_color: formData.bg_color.trim() || null,
                border_color: formData.border_color.trim() || null,
                icon: formData.icon.trim() || null,
                gradient: formData.gradient.trim() || null,
                image_path: formData.image_path.trim() || null,
                career_guide_intro: formData.career_guide_intro.trim() || null,
            };

            const response = editingStrand
                ? await seniorHighStrandService.update(
                      editingStrand.id,
                      cleanedData
                  )
                : await seniorHighStrandService.create(cleanedData);

            if (response.success) {
                setSuccess(
                    editingStrand
                        ? "Strand updated successfully!"
                        : "Strand created successfully!"
                );
                fetchStrands();
                handleCloseModal();
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError(response.error || "Failed to save strand");
            }
        } catch (err) {
            console.error("Error saving strand:", err);
            setError("Failed to save strand");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await seniorHighStrandService.delete(id);
            if (response.success) {
                setSuccess("Strand deleted successfully!");
                fetchStrands();
                setDeleteConfirm(null);
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError(response.error || "Failed to delete strand");
            }
        } catch (err) {
            console.error("Error deleting strand:", err);
            setError("Failed to delete strand");
        }
    };

    const handleToggleActive = async (id) => {
        try {
            const response = await seniorHighStrandService.toggleActive(id);
            if (response.success) {
                setSuccess("Strand status updated!");
                fetchStrands();
                setTimeout(() => setSuccess(""), 2000);
            } else {
                setError(response.error || "Failed to toggle status");
            }
        } catch (err) {
            console.error("Error toggling status:", err);
            setError("Failed to toggle status");
        }
    };

    const addFeature = () => {
        setFormData({
            ...formData,
            features: [...formData.features, ""],
        });
    };

    const removeFeature = (index) => {
        setFormData({
            ...formData,
            features: formData.features.filter((_, i) => i !== index),
        });
    };

    const updateFeature = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addStrandOverview = () => {
        setFormData({
            ...formData,
            strand_overview: [
                ...formData.strand_overview,
                { number: formData.strand_overview.length + 1, text: "" },
            ],
        });
    };

    const removeStrandOverview = (index) => {
        setFormData({
            ...formData,
            strand_overview: formData.strand_overview.filter(
                (_, i) => i !== index
            ),
        });
    };

    const updateStrandOverview = (index, field, value) => {
        const newOverview = [...formData.strand_overview];
        newOverview[index] = { ...newOverview[index], [field]: value };
        setFormData({ ...formData, strand_overview: newOverview });
    };

    const addCareerPath = () => {
        setFormData({
            ...formData,
            career_paths: [
                ...formData.career_paths,
                {
                    id: Date.now(),
                    title: "",
                    skills: "",
                    courses: [],
                    careers: [],
                },
            ],
        });
    };

    const removeCareerPath = (index) => {
        setFormData({
            ...formData,
            career_paths: formData.career_paths.filter((_, i) => i !== index),
        });
    };

    const updateCareerPath = (index, field, value) => {
        const newPaths = [...formData.career_paths];
        newPaths[index] = { ...newPaths[index], [field]: value };
        setFormData({ ...formData, career_paths: newPaths });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading strands...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <School className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Senior High Strands Management
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Manage Senior High School strand information
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add New Strand</span>
                    </button>
                </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">{success}</span>
                </div>
            )}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-800">{error}</span>
                </div>
            )}

            {/* Strands List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        All Strands ({strands.length})
                    </h2>
                    <div className="space-y-3">
                        {strands.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <School className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                                <p>
                                    No strands found. Create your first strand!
                                </p>
                            </div>
                        ) : (
                            strands.map((strand) => (
                                <div
                                    key={strand.id}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                                >
                                    <div className="flex items-center space-x-4 flex-1">
                                        <div className="flex items-center space-x-2">
                                            <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                                            <span className="text-2xl">
                                                {strand.icon}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-semibold text-gray-900">
                                                    {strand.short_title}
                                                </h3>
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${
                                                        strand.is_active
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {strand.is_active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {strand.title}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {strand.career_paths?.length ||
                                                    0}{" "}
                                                career paths •{" "}
                                                {strand.features?.length || 0}{" "}
                                                features
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() =>
                                                handleToggleActive(strand.id)
                                            }
                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            title={
                                                strand.is_active
                                                    ? "Deactivate"
                                                    : "Activate"
                                            }
                                        >
                                            {strand.is_active ? (
                                                <Eye className="h-5 w-5" />
                                            ) : (
                                                <EyeOff className="h-5 w-5" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleOpenModal(strand)
                                            }
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setDeleteConfirm(strand)
                                            }
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingStrand
                                    ? "Edit Strand"
                                    : "Add New Strand"}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900">
                                    Basic Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Strand ID *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.strand_id}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    strand_id: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., stem, humss, tvl"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Short Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.short_title}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    short_title: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., STEM, HUMSS"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Header Title
                                        <span className="text-gray-500 text-xs ml-2">
                                            (e.g., "🧬 From Taft NHS to Tomorrow
                                            - Choose STEM Today!")
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.header_title}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                header_title: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter header title with emoji..."
                                    />
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">
                                        Features
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                                    >
                                        <Plus className="h-4 w-4" />
                                        <span>Add Feature</span>
                                    </button>
                                </div>
                                {formData.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-2"
                                    >
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) =>
                                                updateFeature(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter feature..."
                                        />
                                        {formData.features.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFeature(index)
                                                }
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Strand Overview */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">
                                        Strand Overview
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={addStrandOverview}
                                        className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                                    >
                                        <Plus className="h-4 w-4" />
                                        <span>Add Item</span>
                                    </button>
                                </div>
                                {formData.strand_overview.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-2"
                                    >
                                        <input
                                            type="number"
                                            value={item.number}
                                            onChange={(e) =>
                                                updateStrandOverview(
                                                    index,
                                                    "number",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="#"
                                        />
                                        <input
                                            type="text"
                                            value={item.text}
                                            onChange={(e) =>
                                                updateStrandOverview(
                                                    index,
                                                    "text",
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter overview item..."
                                        />
                                        {formData.strand_overview.length >
                                            1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeStrandOverview(index)
                                                }
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Career Guide Intro */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Career Guide Introduction
                                </label>
                                <textarea
                                    value={formData.career_guide_intro}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            career_guide_intro: e.target.value,
                                        })
                                    }
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter career guide introduction text..."
                                />
                            </div>

                            {/* Career Paths */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">
                                        Career Paths (
                                        {formData.career_paths.length})
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={addCareerPath}
                                        className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                                    >
                                        <Plus className="h-4 w-4" />
                                        <span>Add Career Path</span>
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Note: Career paths are complex objects. For
                                    detailed editing, use the database or update
                                    via API.
                                </p>
                                {formData.career_paths.map((path, index) => (
                                    <div
                                        key={path.id || index}
                                        className="p-4 border border-gray-200 rounded-lg space-y-3"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-900">
                                                Career Path #{index + 1}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeCareerPath(index)
                                                }
                                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={path.title || ""}
                                            onChange={(e) =>
                                                updateCareerPath(
                                                    index,
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            placeholder="Career path title..."
                                        />
                                        <textarea
                                            value={path.skills || ""}
                                            onChange={(e) =>
                                                updateCareerPath(
                                                    index,
                                                    "skills",
                                                    e.target.value
                                                )
                                            }
                                            rows="2"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            placeholder="Skills/interests..."
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Settings */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900">
                                    Settings
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Display Order
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.display_order}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    display_order: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2 pt-7">
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
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="is_active"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Active
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5" />
                                            <span>
                                                {editingStrand
                                                    ? "Update Strand"
                                                    : "Create Strand"}
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Delete Strand
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete{" "}
                            <strong>{deleteConfirm.short_title}</strong>? This
                            action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end space-x-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeniorHighStrands;
