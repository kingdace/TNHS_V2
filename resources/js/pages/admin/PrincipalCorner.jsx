import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Star,
    StarOff,
    GripVertical,
    Search,
    Filter,
    MessageSquare,
    Megaphone,
    Target,
    Award,
    Newspaper,
    AlertCircle,
    CheckCircle,
    Loader2,
    X,
} from "lucide-react";

const PrincipalCorner = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingContent, setEditingContent] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        excerpt: "",
        content_type: "message",
        author: "Dr. Maria Santos",
        image_path: "",
        attachments: [],
        is_featured: false,
        is_active: true,
        display_order: 0,
        published_at: "",
    });

    // Content type configurations
    const contentTypes = {
        message: {
            label: "Principal Message",
            icon: MessageSquare,
            color: "blue",
            description:
                "Welcome messages, announcements, and communications from the Principal",
        },
        announcement: {
            label: "Announcement",
            icon: Megaphone,
            color: "green",
            description: "Important school announcements and updates",
        },
        vision: {
            label: "Principal's Vision",
            icon: Target,
            color: "purple",
            description: "Vision statements and strategic goals",
        },
        achievement: {
            label: "Achievement & Award",
            icon: Award,
            color: "yellow",
            description: "Awards, recognitions, and achievements",
        },
        news: {
            label: "News & Updates",
            icon: Newspaper,
            color: "indigo",
            description: "School news and recent updates",
        },
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const response = await adminService.principalCorner.getAll({
                type: filterType,
                active: null,
            });
            setContent(response.data || []);
            setError("");
        } catch (err) {
            setError("Failed to fetch principal corner content");
            console.error("Error fetching content:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await adminService.principalCorner.create(formData);
            await fetchContent();
            setShowForm(false);
            resetForm();
        } catch (err) {
            setError("Failed to create content");
            console.error("Error creating content:", err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await adminService.principalCorner.update(
                editingContent.id,
                formData
            );
            await fetchContent();
            setShowForm(false);
            setEditingContent(null);
            resetForm();
        } catch (err) {
            setError("Failed to update content");
            console.error("Error updating content:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this content?")) {
            try {
                await adminService.principalCorner.delete(id);
                await fetchContent();
            } catch (err) {
                setError("Failed to delete content");
                console.error("Error deleting content:", err);
            }
        }
    };

    const handleToggleActive = async (id) => {
        try {
            await adminService.principalCorner.toggleActive(id);
            await fetchContent();
        } catch (err) {
            setError("Failed to toggle content status");
            console.error("Error toggling content:", err);
        }
    };

    const handleToggleFeatured = async (id) => {
        try {
            await adminService.principalCorner.toggleFeatured(id);
            await fetchContent();
        } catch (err) {
            setError("Failed to toggle featured status");
            console.error("Error toggling featured:", err);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            content: "",
            excerpt: "",
            content_type: "message",
            author: "Principal",
            image_path: "",
            attachments: [],
            is_featured: false,
            is_active: true,
            display_order: 0,
            published_at: "",
        });
    };

    const handleEdit = (item) => {
        setEditingContent(item);
        setFormData({
            title: item.title,
            content: item.content,
            excerpt: item.excerpt || "",
            content_type: item.content_type,
            author: item.author || "Principal",
            image_path: item.image_path || "",
            attachments: item.attachments || [],
            is_featured: item.is_featured,
            is_active: item.is_active,
            display_order: item.display_order,
            published_at: item.published_at
                ? item.published_at.split("T")[0]
                : "",
        });
        setShowForm(true);
    };

    const getContentTypeIcon = (type) => {
        switch (type) {
            case "message":
                return MessageSquare;
            case "announcement":
                return Megaphone;
            case "vision":
                return Target;
            case "achievement":
                return Award;
            case "news":
                return Newspaper;
            default:
                return MessageSquare;
        }
    };

    const getContentTypeColor = (type) => {
        switch (type) {
            case "message":
                return "bg-blue-100 text-blue-800";
            case "announcement":
                return "bg-green-100 text-green-800";
            case "vision":
                return "bg-purple-100 text-purple-800";
            case "achievement":
                return "bg-yellow-100 text-yellow-800";
            case "news":
                return "bg-orange-100 text-orange-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const filteredContent = content.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = !filterType || item.content_type === filterType;
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
                    <h1 className="text-2xl font-bold">Principal Corner</h1>
                    <p className="text-blue-100 text-sm">
                        Manage principal messages, announcements, and content
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-royal-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Content
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search content..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="md:w-48">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Types</option>
                            <option value="message">Message</option>
                            <option value="announcement">Announcement</option>
                            <option value="vision">Vision</option>
                            <option value="achievement">Achievement</option>
                            <option value="news">News</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error}
                </div>
            )}

            {/* Content List */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Content
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Featured
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredContent.map((item) => {
                                const TypeIcon = getContentTypeIcon(
                                    item.content_type
                                );
                                return (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                                        <TypeIcon className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {item.excerpt ||
                                                            item.content.substring(
                                                                0,
                                                                100
                                                            )}
                                                        ...
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getContentTypeColor(
                                                    item.content_type
                                                )}`}
                                            >
                                                {item.content_type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    item.content_type.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() =>
                                                    handleToggleActive(item.id)
                                                }
                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    item.is_active
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {item.is_active ? (
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                ) : (
                                                    <AlertCircle className="h-3 w-3 mr-1" />
                                                )}
                                                {item.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() =>
                                                    handleToggleFeatured(
                                                        item.id
                                                    )
                                                }
                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    item.is_featured
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {item.is_featured ? (
                                                    <Star className="h-3 w-3 mr-1" />
                                                ) : (
                                                    <StarOff className="h-3 w-3 mr-1" />
                                                )}
                                                {item.is_featured
                                                    ? "Featured"
                                                    : "Normal"}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingContent
                                        ? "Edit Content"
                                        : "Add New Content"}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingContent(null);
                                        resetForm();
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form
                                onSubmit={
                                    editingContent ? handleUpdate : handleCreate
                                }
                                className="space-y-6"
                            >
                                {/* Content Type Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Content Type *
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {Object.entries(contentTypes).map(
                                            ([key, config]) => {
                                                const Icon = config.icon;
                                                const isSelected =
                                                    formData.content_type ===
                                                    key;
                                                return (
                                                    <div
                                                        key={key}
                                                        onClick={() =>
                                                            setFormData({
                                                                ...formData,
                                                                content_type:
                                                                    key,
                                                            })
                                                        }
                                                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                            isSelected
                                                                ? `border-${config.color}-500 bg-${config.color}-50`
                                                                : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            <div
                                                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                                    isSelected
                                                                        ? `bg-${config.color}-100`
                                                                        : "bg-gray-100"
                                                                }`}
                                                            >
                                                                <Icon
                                                                    className={`w-5 h-5 ${
                                                                        isSelected
                                                                            ? `text-${config.color}-600`
                                                                            : "text-gray-600"
                                                                    }`}
                                                                />
                                                            </div>
                                                            <div>
                                                                <h3
                                                                    className={`font-medium ${
                                                                        isSelected
                                                                            ? `text-${config.color}-900`
                                                                            : "text-gray-900"
                                                                    }`}
                                                                >
                                                                    {
                                                                        config.label
                                                                    }
                                                                </h3>
                                                                <p
                                                                    className={`text-xs ${
                                                                        isSelected
                                                                            ? `text-${config.color}-600`
                                                                            : "text-gray-500"
                                                                    }`}
                                                                >
                                                                    {
                                                                        config.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Title *
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
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder={`Enter ${contentTypes[
                                                formData.content_type
                                            ]?.label.toLowerCase()} title...`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.author}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    author: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Dr. Maria Santos"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Excerpt
                                    </label>
                                    <textarea
                                        value={formData.excerpt}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                excerpt: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Brief summary of the content..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Content *
                                    </label>
                                    <textarea
                                        required
                                        value={formData.content}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                content: e.target.value,
                                            })
                                        }
                                        rows={
                                            formData.content_type === "vision"
                                                ? 12
                                                : 8
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder={
                                            formData.content_type === "message"
                                                ? "Enter the principal's message or welcome note..."
                                                : formData.content_type ===
                                                  "announcement"
                                                ? "Enter the announcement details..."
                                                : formData.content_type ===
                                                  "vision"
                                                ? "Enter the principal's vision statement and strategic goals..."
                                                : formData.content_type ===
                                                  "achievement"
                                                ? "Enter details about the achievement or award..."
                                                : "Enter the news content..."
                                        }
                                    />
                                    {formData.content_type === "vision" && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            💡 Tip: Include vision statement,
                                            strategic goals, and implementation
                                            plans
                                        </p>
                                    )}
                                    {formData.content_type ===
                                        "achievement" && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            💡 Tip: Include award name,
                                            organization, year, and significance
                                        </p>
                                    )}
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Image Path (Optional)
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
                                        placeholder="/images/principal/example.jpg"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        💡 Tip: Use relative path from public
                                        folder (e.g.,
                                        /images/principal/award.jpg)
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.author}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    author: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Dr. Maria Santos"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Published Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.published_at}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    published_at:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_active}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    is_active: e.target.checked,
                                                })
                                            }
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            Active
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_featured}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    is_featured:
                                                        e.target.checked,
                                                })
                                            }
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            Featured
                                        </span>
                                    </label>
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingContent(null);
                                            resetForm();
                                        }}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        {editingContent ? "Update" : "Create"}
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

export default PrincipalCorner;
