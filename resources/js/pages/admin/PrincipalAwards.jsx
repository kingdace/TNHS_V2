import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import {
    Plus,
    Edit,
    Trash2,
    Trophy,
    Star,
    GripVertical,
    Loader2,
    X,
    AlertCircle,
    CheckCircle,
} from "lucide-react";

const PrincipalAwards = () => {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingAward, setEditingAward] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        award_year: new Date().getFullYear(),
        level: "division",
        issuing_organization: "",
        description: "",
        display_order: 0,
        is_active: true,
    });

    const awardLevels = [
        { value: "international", label: "International", color: "purple" },
        { value: "national", label: "National", color: "blue" },
        { value: "regional", label: "Regional", color: "green" },
        { value: "division", label: "Division", color: "yellow" },
        { value: "school", label: "School", color: "gray" },
    ];

    useEffect(() => {
        fetchAwards();
    }, []);

    const fetchAwards = async () => {
        try {
            setLoading(true);
            const result = await adminService.principalAwards.getAll();
            setAwards(Array.isArray(result?.data) ? result.data : []);
            setError("");
        } catch (err) {
            console.error("Error fetching awards:", err);
            setError("Failed to fetch awards");
            setAwards([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAward) {
                await adminService.principalAwards.update(
                    editingAward.id,
                    formData
                );
            } else {
                await adminService.principalAwards.create(formData);
            }
            await fetchAwards();
            setShowForm(false);
            setEditingAward(null);
            resetForm();
        } catch (err) {
            setError("Failed to save award");
            console.error("Error saving award:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this award?")) {
            try {
                await adminService.principalAwards.delete(id);
                await fetchAwards();
            } catch (err) {
                setError("Failed to delete award");
                console.error("Error deleting award:", err);
            }
        }
    };

    const handleToggleActive = async (id) => {
        try {
            await adminService.principalAwards.toggleActive(id);
            await fetchAwards();
        } catch (err) {
            setError("Failed to toggle award status");
            console.error("Error toggling award:", err);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            award_year: new Date().getFullYear(),
            level: "division",
            issuing_organization: "",
            description: "",
            display_order: 0,
            is_active: true,
        });
    };

    const handleEdit = (award) => {
        setEditingAward(award);
        setFormData({
            title: award.title,
            award_year: award.award_year,
            level: award.level,
            issuing_organization: award.issuing_organization || "",
            description: award.description || "",
            display_order: award.display_order,
            is_active: award.is_active,
        });
        setShowForm(true);
    };

    const getLevelColor = (level) => {
        const levelConfig = awardLevels.find((l) => l.value === level);
        return levelConfig?.color || "gray";
    };

    const getLevelBadgeClass = (level) => {
        const color = getLevelColor(level);
        const colorMap = {
            purple: "bg-purple-100 text-purple-800",
            blue: "bg-blue-100 text-blue-800",
            green: "bg-green-100 text-green-800",
            yellow: "bg-yellow-100 text-yellow-800",
            gray: "bg-gray-100 text-gray-800",
        };
        return colorMap[color] || colorMap.gray;
    };

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
            <div className="bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl px-6 py-4 text-white shadow-lg flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Trophy className="h-6 w-6" />
                        Principal Awards & Achievements
                    </h1>
                    <p className="text-yellow-100 text-sm">
                        Manage principal's awards, recognitions, and
                        achievements
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-white text-yellow-600 hover:bg-yellow-50 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add Award
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error}
                </div>
            )}

            {/* Awards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {awards.length === 0 ? (
                    <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">
                            No awards added yet
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                            Click "Add Award" to create your first award
                        </p>
                    </div>
                ) : (
                    awards.map((award) => (
                        <div
                            key={award.id}
                            className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300 relative group"
                        >
                            {/* Status Badge */}
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={() => handleToggleActive(award.id)}
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        award.is_active
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {award.is_active ? (
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                    ) : (
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                    )}
                                    {award.is_active ? "Active" : "Inactive"}
                                </button>
                            </div>

                            {/* Award Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                <Trophy className="h-8 w-8 text-white" />
                            </div>

                            {/* Award Title */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2 pr-20">
                                {award.title}
                            </h3>

                            {/* Award Year */}
                            <p className="text-2xl font-bold text-yellow-600 mb-3">
                                {award.award_year}
                            </p>

                            {/* Level Badge */}
                            <span
                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getLevelBadgeClass(
                                    award.level
                                )}`}
                            >
                                {award.level.charAt(0).toUpperCase() +
                                    award.level.slice(1)}{" "}
                                Level
                            </span>

                            {/* Organization */}
                            {award.issuing_organization && (
                                <p className="text-sm text-gray-600 mb-3">
                                    <strong>Issued by:</strong>{" "}
                                    {award.issuing_organization}
                                </p>
                            )}

                            {/* Description */}
                            {award.description && (
                                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                                    {award.description}
                                </p>
                            )}

                            {/* Actions */}
                            <div className="flex space-x-2 pt-4 border-t">
                                <button
                                    onClick={() => handleEdit(award)}
                                    className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                                >
                                    <Edit className="h-4 w-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(award.id)}
                                    className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <Trophy className="h-6 w-6 text-yellow-600" />
                                    {editingAward
                                        ? "Edit Award"
                                        : "Add New Award"}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingAward(null);
                                        resetForm();
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Award Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Award Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                title: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="e.g., Outstanding School Principal"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Award Year */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Year *
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="1900"
                                            max="2100"
                                            value={formData.award_year}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    award_year: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Level */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Level *
                                        </label>
                                        <select
                                            required
                                            value={formData.level}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    level: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        >
                                            {awardLevels.map((level) => (
                                                <option
                                                    key={level.value}
                                                    value={level.value}
                                                >
                                                    {level.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Issuing Organization */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Issuing Organization
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.issuing_organization}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                issuing_organization:
                                                    e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="e.g., Department of Education"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="Brief description of the award..."
                                    />
                                </div>

                                {/* Active Status */}
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
                                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="is_active"
                                        className="ml-2 block text-sm text-gray-700"
                                    >
                                        Active (visible on public page)
                                    </label>
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end space-x-3 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingAward(null);
                                            resetForm();
                                        }}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                                    >
                                        {editingAward
                                            ? "Update Award"
                                            : "Add Award"}
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

export default PrincipalAwards;
