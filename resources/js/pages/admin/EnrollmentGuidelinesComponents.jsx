import React, { useState, useEffect } from "react";
import {
    Plus,
    Save,
    X,
    Loader2,
    Edit,
    Trash2,
    FileText,
    BookOpen,
    Star,
} from "lucide-react";

// Grade Categories Tab Component
export const GradeCategoriesTab = ({
    categories,
    onUpdate,
    saving,
    getIconComponent,
}) => {
    const [editingCategory, setEditingCategory] = useState(null);

    const handleEdit = (category) => {
        const transformedCategory = {
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
        setEditingCategory(transformedCategory);
    };

    const handleSave = async () => {
        if (editingCategory) {
            await onUpdate(editingCategory.category_id, editingCategory);
            setEditingCategory(null);
        }
    };

    const handleCancel = () => {
        setEditingCategory(null);
    };

    const handleFieldChange = (field, value) => {
        setEditingCategory((prev) => ({ ...prev, [field]: value }));
    };

    const handleArrayFieldChange = (field, index, value) => {
        setEditingCategory((prev) => {
            const newArray = [...prev[field]];
            newArray[index] = value;
            return { ...prev, [field]: newArray };
        });
    };

    const addArrayItem = (field) => {
        setEditingCategory((prev) => ({
            ...prev,
            [field]: [...prev[field], ""],
        }));
    };

    const removeArrayItem = (field, index) => {
        setEditingCategory((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Grade Categories
                    </h3>
                    <p className="text-sm text-gray-600">
                        Manage Junior High and Senior High enrollment categories
                    </p>
                </div>
            </div>

            <div className="grid gap-6">
                {categories.map((category) => {
                    const IconComponent = getIconComponent(category.icon);
                    const isEditing =
                        editingCategory?.category_id === category.category_id;

                    return (
                        <div
                            key={category.category_id}
                            className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                        >
                            <div className="p-4 border-b border-gray-200 bg-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                category.bg_color ||
                                                "bg-blue-50"
                                            }`}
                                        >
                                            <IconComponent className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">
                                                {category.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {category.description}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-2"
                                    >
                                        <Edit className="h-4 w-4" />
                                        Edit
                                    </button>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="p-4 space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={editingCategory.name}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    editingCategory.description
                                                }
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Notes
                                        </label>
                                        <textarea
                                            value={editingCategory.notes}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    "notes",
                                                    e.target.value
                                                )
                                            }
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Requirements */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Requirements
                                                </label>
                                                <button
                                                    onClick={() =>
                                                        addArrayItem(
                                                            "requirements"
                                                        )
                                                    }
                                                    className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs flex items-center gap-1"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                    Add
                                                </button>
                                            </div>
                                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                                {editingCategory.requirements.map(
                                                    (req, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex gap-2"
                                                        >
                                                            <input
                                                                type="text"
                                                                value={req}
                                                                onChange={(e) =>
                                                                    handleArrayFieldChange(
                                                                        "requirements",
                                                                        index,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                                                                placeholder="Requirement text"
                                                            />
                                                            <button
                                                                onClick={() =>
                                                                    removeArrayItem(
                                                                        "requirements",
                                                                        index
                                                                    )
                                                                }
                                                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Processes */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Processes
                                                </label>
                                                <button
                                                    onClick={() =>
                                                        addArrayItem(
                                                            "processes"
                                                        )
                                                    }
                                                    className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs flex items-center gap-1"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                    Add
                                                </button>
                                            </div>
                                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                                {editingCategory.processes.map(
                                                    (proc, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex gap-2"
                                                        >
                                                            <input
                                                                type="text"
                                                                value={proc}
                                                                onChange={(e) =>
                                                                    handleArrayFieldChange(
                                                                        "processes",
                                                                        index,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                                                                placeholder="Process step"
                                                            />
                                                            <button
                                                                onClick={() =>
                                                                    removeArrayItem(
                                                                        "processes",
                                                                        index
                                                                    )
                                                                }
                                                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-4 border-t">
                                        <button
                                            onClick={handleCancel}
                                            className="px-3 py-1.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm flex items-center gap-2"
                                        >
                                            {saving && (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            )}
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
// Special Programs Tab Component
export const SpecialProgramsTab = ({
    programs,
    onUpdate,
    saving,
    getIconComponent,
}) => {
    const [editingProgram, setEditingProgram] = useState(null);

    const handleEdit = (program) => {
        const transformedProgram = {
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
        setEditingProgram(transformedProgram);
    };

    const handleSave = async () => {
        if (editingProgram) {
            await onUpdate(editingProgram.program_id, editingProgram);
            setEditingProgram(null);
        }
    };

    const handleCancel = () => {
        setEditingProgram(null);
    };

    const handleFieldChange = (field, value) => {
        setEditingProgram((prev) => ({ ...prev, [field]: value }));
    };

    const handleArrayFieldChange = (field, index, value) => {
        setEditingProgram((prev) => {
            const newArray = [...prev[field]];
            newArray[index] = value;
            return { ...prev, [field]: newArray };
        });
    };

    const addArrayItem = (field) => {
        setEditingProgram((prev) => ({
            ...prev,
            [field]: [...prev[field], ""],
        }));
    };

    const removeArrayItem = (field, index) => {
        setEditingProgram((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Special Programs
                    </h3>
                    <p className="text-sm text-gray-600">
                        Manage ALS and other special educational programs
                    </p>
                </div>
            </div>

            <div className="grid gap-6">
                {programs.map((program) => {
                    const IconComponent = getIconComponent(program.icon);
                    const isEditing =
                        editingProgram?.program_id === program.program_id;

                    return (
                        <div
                            key={program.program_id}
                            className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                        >
                            <div className="p-4 border-b border-gray-200 bg-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                program.bg_color || "bg-teal-50"
                                            }`}
                                        >
                                            <IconComponent className="h-5 w-5 text-teal-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">
                                                {program.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {program.description}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleEdit(program)}
                                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm flex items-center gap-2"
                                    >
                                        <Edit className="h-4 w-4" />
                                        Edit
                                    </button>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="p-4 space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={editingProgram.name}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    editingProgram.description
                                                }
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Notes
                                        </label>
                                        <textarea
                                            value={editingProgram.notes}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    "notes",
                                                    e.target.value
                                                )
                                            }
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        {/* Features */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Features
                                                </label>
                                                <button
                                                    onClick={() =>
                                                        addArrayItem("features")
                                                    }
                                                    className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs flex items-center gap-1"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                    Add
                                                </button>
                                            </div>
                                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                                {editingProgram.features.map(
                                                    (feature, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex gap-2"
                                                        >
                                                            <input
                                                                type="text"
                                                                value={feature}
                                                                onChange={(e) =>
                                                                    handleArrayFieldChange(
                                                                        "features",
                                                                        index,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                                                                placeholder="Feature"
                                                            />
                                                            <button
                                                                onClick={() =>
                                                                    removeArrayItem(
                                                                        "features",
                                                                        index
                                                                    )
                                                                }
                                                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Requirements */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Requirements
                                                </label>
                                                <button
                                                    onClick={() =>
                                                        addArrayItem(
                                                            "requirements"
                                                        )
                                                    }
                                                    className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs flex items-center gap-1"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                    Add
                                                </button>
                                            </div>
                                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                                {editingProgram.requirements.map(
                                                    (req, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex gap-2"
                                                        >
                                                            <input
                                                                type="text"
                                                                value={req}
                                                                onChange={(e) =>
                                                                    handleArrayFieldChange(
                                                                        "requirements",
                                                                        index,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                                                                placeholder="Requirement"
                                                            />
                                                            <button
                                                                onClick={() =>
                                                                    removeArrayItem(
                                                                        "requirements",
                                                                        index
                                                                    )
                                                                }
                                                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Processes */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Processes
                                                </label>
                                                <button
                                                    onClick={() =>
                                                        addArrayItem(
                                                            "processes"
                                                        )
                                                    }
                                                    className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs flex items-center gap-1"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                    Add
                                                </button>
                                            </div>
                                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                                {editingProgram.processes.map(
                                                    (proc, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex gap-2"
                                                        >
                                                            <input
                                                                type="text"
                                                                value={proc}
                                                                onChange={(e) =>
                                                                    handleArrayFieldChange(
                                                                        "processes",
                                                                        index,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                                                                placeholder="Process step"
                                                            />
                                                            <button
                                                                onClick={() =>
                                                                    removeArrayItem(
                                                                        "processes",
                                                                        index
                                                                    )
                                                                }
                                                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-4 border-t">
                                        <button
                                            onClick={handleCancel}
                                            className="px-3 py-1.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white rounded-lg text-sm flex items-center gap-2"
                                        >
                                            {saving && (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            )}
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
