import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Search,
    Filter,
    Info,
    AlertCircle,
    CheckCircle,
    Loader2,
    History,
    Target,
    Lightbulb,
    Award,
    Building,
    Heart,
} from "lucide-react";

const SchoolInfo = () => {
    const [schoolInfo, setSchoolInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingInfo, setEditingInfo] = useState(null);
    const [formData, setFormData] = useState({
        info_type: "history",
        title: "",
        content: "",
        image_path: "",
        display_order: 0,
        is_active: true,
    });

    const infoTypes = [
        { value: "history", label: "History", icon: History },
        { value: "mission", label: "Mission", icon: Target },
        { value: "vision", label: "Vision", icon: Lightbulb },
        { value: "values", label: "Values", icon: Heart },
        { value: "achievements", label: "Achievements", icon: Award },
        { value: "facilities", label: "Facilities", icon: Building },
    ];

    useEffect(() => {
        fetchSchoolInfo();
    }, []);

    const fetchSchoolInfo = async () => {
        try {
            setLoading(true);
            const response = await adminService.schoolInfo.getAll({
                type: filterType,
                active: null,
            });
            setSchoolInfo(response.data || []);
            setError("");
        } catch (err) {
            setError("Failed to fetch school information");
            console.error("Error fetching school info:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await adminService.schoolInfo.create(formData);
            if (response.success) {
                setShowForm(false);
                setFormData({
                    info_type: "history",
                    title: "",
                    content: "",
                    image_path: "",
                    display_order: 0,
                    is_active: true,
                });
                fetchSchoolInfo();
            }
        } catch (err) {
            setError("Failed to create school information");
            console.error("Error creating school info:", err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await adminService.schoolInfo.update(
                editingInfo.id,
                formData
            );
            if (response.success) {
                setShowForm(false);
                setEditingInfo(null);
                setFormData({
                    info_type: "history",
                    title: "",
                    content: "",
                    image_path: "",
                    display_order: 0,
                    is_active: true,
                });
                fetchSchoolInfo();
            }
        } catch (err) {
            setError("Failed to update school information");
            console.error("Error updating school info:", err);
        }
    };

    const handleDelete = async (id) => {
        if (
            window.confirm("Are you sure you want to delete this information?")
        ) {
            try {
                await adminService.schoolInfo.delete(id);
                fetchSchoolInfo();
            } catch (err) {
                setError("Failed to delete school information");
                console.error("Error deleting school info:", err);
            }
        }
    };

    const handleToggleActive = async (id) => {
        try {
            await adminService.schoolInfo.toggleActive(id);
            fetchSchoolInfo();
        } catch (err) {
            setError("Failed to toggle information status");
            console.error("Error toggling school info:", err);
        }
    };

    const handleEdit = (info) => {
        setEditingInfo(info);
        setFormData({
            info_type: info.info_type,
            title: info.title || "",
            content: info.content || "",
            image_path: info.image_path || "",
            display_order: info.display_order,
            is_active: info.is_active,
        });
        setShowForm(true);
    };

    const getInfoTypeIcon = (type) => {
        const infoType = infoTypes.find((t) => t.value === type);
        return infoType ? infoType.icon : Info;
    };

    const getInfoTypeColor = (type) => {
        const colors = {
            history: "bg-blue-100 text-blue-800",
            mission: "bg-green-100 text-green-800",
            vision: "bg-purple-100 text-purple-800",
            values: "bg-pink-100 text-pink-800",
            achievements: "bg-yellow-100 text-yellow-800",
            facilities: "bg-orange-100 text-orange-800",
        };
        return colors[type] || "bg-gray-100 text-gray-800";
    };

    const filteredInfo = schoolInfo.filter((info) => {
        const matchesSearch =
            info.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            info.content?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = !filterType || info.info_type === filterType;
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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        School Information
                    </h1>
                    <p className="text-gray-600">
                        Manage school history, mission, vision, and other
                        information
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Information
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search information..."
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
                            {infoTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
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

            {/* Information List */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {filteredInfo.length === 0 ? (
                    <div className="text-center py-12">
                        <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No information found
                        </h3>
                        <p className="text-gray-600">
                            {searchTerm || filterType
                                ? "Try adjusting your search or filters"
                                : "Get started by adding your first school information"}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {filteredInfo.map((info) => {
                            const Icon = getInfoTypeIcon(info.info_type);
                            return (
                                <div
                                    key={info.id}
                                    className="p-6 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div
                                                    className={`p-2 rounded-lg ${getInfoTypeColor(
                                                        info.info_type
                                                    )}`}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {info.title ||
                                                            info.info_type
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                info.info_type.slice(
                                                                    1
                                                                )}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <span className="capitalize">
                                                            {info.info_type.replace(
                                                                "_",
                                                                " "
                                                            )}
                                                        </span>
                                                        <span>•</span>
                                                        <span>
                                                            Order:{" "}
                                                            {info.display_order}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {info.content && (
                                                <div className="mb-3">
                                                    <p className="text-gray-600 line-clamp-3">
                                                        {info.content}
                                                    </p>
                                                </div>
                                            )}

                                            {info.image_path && (
                                                <div className="mb-3">
                                                    <div className="w-32 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <span className="text-xs text-gray-500">
                                                            Image Available
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                                        info.is_active
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {info.is_active ? (
                                                        <CheckCircle className="h-3 w-3" />
                                                    ) : (
                                                        <AlertCircle className="h-3 w-3" />
                                                    )}
                                                    {info.is_active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 ml-4">
                                            <button
                                                onClick={() =>
                                                    handleToggleActive(info.id)
                                                }
                                                className={`p-2 rounded-lg transition-colors ${
                                                    info.is_active
                                                        ? "text-red-600 hover:bg-red-50"
                                                        : "text-green-600 hover:bg-green-50"
                                                }`}
                                                title={
                                                    info.is_active
                                                        ? "Deactivate"
                                                        : "Activate"
                                                }
                                            >
                                                {info.is_active ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleEdit(info)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(info.id)
                                                }
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                {editingInfo
                                    ? "Edit Information"
                                    : "Add New Information"}
                            </h2>

                            <form
                                onSubmit={
                                    editingInfo ? handleUpdate : handleCreate
                                }
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Information Type
                                    </label>
                                    <select
                                        value={formData.info_type}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                info_type: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        {infoTypes.map((type) => (
                                            <option
                                                key={type.value}
                                                value={type.value}
                                            >
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                title: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Optional title for this information"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Content
                                    </label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                content: e.target.value,
                                            })
                                        }
                                        rows={6}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter the information content..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Image Path
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.image_path}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                image_path: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Optional image path (e.g., /images/school-history.jpg)"
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
                                                    parseInt(e.target.value) ||
                                                    0,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
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
                                            setEditingInfo(null);
                                            setFormData({
                                                info_type: "history",
                                                title: "",
                                                content: "",
                                                image_path: "",
                                                display_order: 0,
                                                is_active: true,
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
                                        {editingInfo ? "Update" : "Create"}
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

export default SchoolInfo;
