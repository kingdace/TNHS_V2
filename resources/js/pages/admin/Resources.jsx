import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
    Plus,
    Search,
    Filter,
    Download,
    FileText,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Upload,
    X,
    Save,
    AlertCircle,
    File,
    FileImage,
    FileVideo,
    FileAudio,
    Archive,
    Calendar,
    TrendingUp,
    Users,
    Clock,
    ExternalLink,
} from "lucide-react";
import { adminService } from "../../services/adminService";

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showForm, setShowForm] = useState(false);
    const [editingResource, setEditingResource] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "academic",
        file: null,
        is_active: true,
        display_order: 0,
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const categories = [
        { value: "all", label: "All Categories" },
        { value: "academic", label: "Academic Resources" },
        { value: "forms", label: "Forms & Documents" },
        { value: "multimedia", label: "Multimedia" },
        { value: "links", label: "Useful Links" },
        { value: "handbooks", label: "Handbooks" },
        { value: "policies", label: "Policies" },
    ];

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            setLoading(true);
            console.log("Fetching resources...");
            const response = await adminService.resources.getAll();
            console.log("Fetch response:", response);
            if (response && response.success) {
                setResources(response.data);
            } else {
                console.log("Failed to fetch resources:", response);
            }
        } catch (error) {
            console.error("Error fetching resources:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        try {
            // Validate file size before submission
            if (formData.file && !editingResource) {
                const maxSize = 10 * 1024 * 1024; // 10MB
                if (formData.file.size > maxSize) {
                    setErrors({
                        file: [
                            `File size must be less than 10MB. Current size: ${(
                                formData.file.size /
                                1024 /
                                1024
                            ).toFixed(2)}MB`,
                        ],
                    });
                    setSubmitting(false);
                    return;
                }
            }

            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== "") {
                    if (typeof value === "boolean") {
                        form.append(key, value ? "1" : "0");
                    } else {
                        form.append(key, value);
                    }
                }
            });

            console.log(
                "Submitting form data:",
                Object.fromEntries(form.entries())
            );

            let response;
            if (editingResource) {
                console.log("Updating resource:", editingResource.id);
                response = await adminService.resources.update(
                    editingResource.id,
                    form
                );
            } else {
                console.log("Creating new resource");
                response = await adminService.resources.create(form);
            }

            console.log("API Response:", response);

            if (response && response.success) {
                await fetchResources();
                resetForm();
                setShowForm(false);
            } else {
                console.log("Response errors:", response?.errors);
                if (response && response.errors) {
                    setErrors(response.errors);
                } else {
                    setErrors({
                        general: response?.message || "Failed to save resource",
                    });
                }
            }
        } catch (error) {
            console.error("Error saving resource:", error);
            setErrors({ general: "Failed to save resource: " + error.message });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (resource) => {
        setEditingResource(resource);
        setFormData({
            name: resource.name,
            description: resource.description || "",
            category: resource.category,
            file: null, // Don't pre-fill file
            is_active: resource.is_active,
            display_order: resource.display_order,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this resource?")) {
            try {
                await adminService.resources.delete(id);
                await fetchResources();
            } catch (error) {
                console.error("Error deleting resource:", error);
            }
        }
    };

    const handleToggleActive = async (resource) => {
        try {
            await adminService.resources.toggleActive(resource.id);
            await fetchResources();
        } catch (error) {
            console.error("Error toggling resource status:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            category: "academic",
            file: null,
            is_active: true,
            display_order: 0,
        });
        setEditingResource(null);
        setErrors({});
    };

    const filteredResources = resources.filter((resource) => {
        const matchesSearch = resource.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" ||
            resource.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const getFileIcon = (fileType) => {
        if (!fileType) return <File className="w-5 h-5 text-gray-500" />;

        const type = fileType.toLowerCase();
        if (
            type.includes("image") ||
            ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(type)
        ) {
            return <FileImage className="w-5 h-5 text-blue-500" />;
        }
        if (
            type.includes("video") ||
            ["mp4", "avi", "mov", "wmv", "flv"].includes(type)
        ) {
            return <FileVideo className="w-5 h-5 text-purple-500" />;
        }
        if (
            type.includes("audio") ||
            ["mp3", "wav", "ogg", "flac"].includes(type)
        ) {
            return <FileAudio className="w-5 h-5 text-green-500" />;
        }
        if (["zip", "rar", "7z", "tar", "gz"].includes(type)) {
            return <Archive className="w-5 h-5 text-orange-500" />;
        }
        return <FileText className="w-5 h-5 text-gray-500" />;
    };

    const getCategoryColor = (category) => {
        const colors = {
            academic: "bg-blue-100 text-blue-800 border-blue-200",
            forms: "bg-green-100 text-green-800 border-green-200",
            multimedia: "bg-purple-100 text-purple-800 border-purple-200",
            links: "bg-orange-100 text-orange-800 border-orange-200",
            handbooks: "bg-indigo-100 text-indigo-800 border-indigo-200",
            policies: "bg-red-100 text-red-800 border-red-200",
        };
        return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Resources Management
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage downloadable resources and files for the public
                        website
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{resources.length} Total</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>
                                {resources.filter((r) => r.is_active).length}{" "}
                                Active
                            </span>
                        </div>
                    </div>
                    <Button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="bg-royal-blue hover:bg-blue-700 shadow-lg"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Resource
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card className="shadow-sm border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search resources by name..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent bg-white shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="lg:w-64">
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent bg-white shadow-sm appearance-none"
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Showing{" "}
                            <span className="font-semibold text-gray-900">
                                {filteredResources.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-900">
                                {resources.length}
                            </span>{" "}
                            resources
                            {searchTerm && (
                                <span>
                                    {" "}
                                    matching "
                                    <span className="font-medium text-royal-blue">
                                        {searchTerm}
                                    </span>
                                    "
                                </span>
                            )}
                            {selectedCategory !== "all" && (
                                <span>
                                    {" "}
                                    in{" "}
                                    <span className="font-medium text-royal-blue">
                                        {
                                            categories.find(
                                                (c) =>
                                                    c.value === selectedCategory
                                            )?.label
                                        }
                                    </span>
                                </span>
                            )}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Resources List */}
            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue mx-auto"></div>
                        <p className="mt-2 text-gray-600">
                            Loading resources...
                        </p>
                    </div>
                ) : filteredResources.length === 0 ? (
                    <Card className="border-0 shadow-sm">
                        <CardContent className="text-center py-12">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No resources found
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                {searchTerm || selectedCategory !== "all"
                                    ? "No resources match your current search criteria. Try adjusting your filters or search terms."
                                    : "Get started by uploading your first resource file for users to download."}
                            </p>
                            {!searchTerm && selectedCategory === "all" && (
                                <Button
                                    onClick={() => {
                                        resetForm();
                                        setShowForm(true);
                                    }}
                                    className="bg-royal-blue hover:bg-blue-700"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add First Resource
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    filteredResources.map((resource) => (
                        <Card
                            key={resource.id}
                            className="hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border border-gray-200 shadow-md bg-white"
                        >
                            <CardContent className="p-5">
                                <div className="flex items-center gap-4">
                                    {/* File Icon */}
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center border-2 border-blue-200 shadow-sm">
                                            {getFileIcon(resource.file_type)}
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
                                                    {resource.name}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                                            resource.is_active
                                                                ? "bg-green-100 text-green-800 border border-green-300"
                                                                : "bg-red-100 text-red-800 border border-red-300"
                                                        }`}
                                                    >
                                                        {resource.is_active
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>
                                                    <span
                                                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(
                                                            resource.category
                                                        )}`}
                                                    >
                                                        {categories.find(
                                                            (c) =>
                                                                c.value ===
                                                                resource.category
                                                        )?.label ||
                                                            resource.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2 ml-4">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleToggleActive(
                                                            resource
                                                        )
                                                    }
                                                    className="h-9 w-9 p-0 border-2 hover:scale-105 transition-transform"
                                                    title={
                                                        resource.is_active
                                                            ? "Deactivate"
                                                            : "Activate"
                                                    }
                                                >
                                                    {resource.is_active ? (
                                                        <EyeOff className="w-4 h-4 text-orange-600" />
                                                    ) : (
                                                        <Eye className="w-4 h-4 text-green-600" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleEdit(resource)
                                                    }
                                                    className="h-9 w-9 p-0 border-2 hover:scale-105 transition-transform"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4 text-blue-600" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            resource.id
                                                        )
                                                    }
                                                    className="h-9 w-9 p-0 border-2 hover:scale-105 transition-transform hover:border-red-400"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        {resource.description && (
                                            <p className="text-gray-600 mb-3 text-sm line-clamp-1">
                                                {resource.description}
                                            </p>
                                        )}

                                        {/* File Details - Compact Version */}
                                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1">
                                                    <File className="w-4 h-4 text-blue-600" />
                                                    <span className="text-sm font-semibold text-blue-900">
                                                        {resource.file_type?.toUpperCase() ||
                                                            "FILE"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Archive className="w-4 h-4 text-purple-600" />
                                                    <span className="text-sm font-semibold text-purple-900">
                                                        {formatFileSize(
                                                            resource.file_size
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Download className="w-4 h-4 text-green-600" />
                                                    <span className="text-sm font-semibold text-green-900">
                                                        {resource.download_count ||
                                                            0}{" "}
                                                        downloads
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <TrendingUp className="w-4 h-4 text-orange-600" />
                                                <span className="text-sm font-semibold text-orange-900">
                                                    #{resource.display_order}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {editingResource
                                            ? "Edit Resource"
                                            : "Add New Resource"}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        {editingResource
                                            ? "Update the resource information and file"
                                            : "Upload a new file resource for users to download"}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowForm(false)}
                                    className="h-8 w-8 p-0 hover:bg-gray-100"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Resource Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-colors"
                                            placeholder="Enter a descriptive name for the resource"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.name[0]}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-colors resize-none"
                                            placeholder="Provide a brief description of what this resource contains"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    category: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-colors"
                                            required
                                        >
                                            {categories
                                                .filter(
                                                    (cat) => cat.value !== "all"
                                                )
                                                .map((category) => (
                                                    <option
                                                        key={category.value}
                                                        value={category.value}
                                                    >
                                                        {category.label}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            File {!editingResource && "*"}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files[0];
                                                    if (file) {
                                                        const maxSize =
                                                            10 * 1024 * 1024;
                                                        if (
                                                            file.size > maxSize
                                                        ) {
                                                            setErrors({
                                                                ...errors,
                                                                file: [
                                                                    `File size must be less than 10MB. Current size: ${(
                                                                        file.size /
                                                                        1024 /
                                                                        1024
                                                                    ).toFixed(
                                                                        2
                                                                    )}MB`,
                                                                ],
                                                            });
                                                            e.target.value = "";
                                                            return;
                                                        } else {
                                                            const newErrors = {
                                                                ...errors,
                                                            };
                                                            delete newErrors.file;
                                                            setErrors(
                                                                newErrors
                                                            );
                                                        }
                                                    }
                                                    setFormData({
                                                        ...formData,
                                                        file: file,
                                                    });
                                                }}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-royal-blue file:text-white hover:file:bg-blue-700"
                                                required={!editingResource}
                                            />
                                        </div>
                                        {errors.file && (
                                            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.file[0]}
                                            </p>
                                        )}
                                        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Upload className="w-4 h-4 text-blue-600" />
                                                <span className="text-blue-800 font-medium">
                                                    File Requirements:
                                                </span>
                                            </div>
                                            <ul className="mt-1 text-sm text-blue-700 space-y-1">
                                                <li>
                                                    • Maximum file size: 10MB
                                                </li>
                                                <li>
                                                    • Current file:{" "}
                                                    {formData.file
                                                        ? `${(
                                                              formData.file
                                                                  .size /
                                                              1024 /
                                                              1024
                                                          ).toFixed(2)}MB`
                                                        : "None selected"}
                                                </li>
                                                {editingResource && (
                                                    <li>
                                                        • Leave empty to keep
                                                        current file
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Display Order
                                            </label>
                                            <input
                                                type="number"
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-colors"
                                                min="0"
                                                placeholder="0"
                                            />
                                        </div>

                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="is_active"
                                                    checked={formData.is_active}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            is_active:
                                                                e.target
                                                                    .checked,
                                                        })
                                                    }
                                                    className="h-5 w-5 text-royal-blue focus:ring-royal-blue border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor="is_active"
                                                    className="ml-3 block text-sm font-medium text-gray-900"
                                                >
                                                    Active Resource
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {errors.general && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                        <div className="flex items-center gap-2 text-red-800">
                                            <AlertCircle className="w-5 h-5" />
                                            <span className="font-medium">
                                                Error
                                            </span>
                                        </div>
                                        <p className="text-red-700 mt-1">
                                            {errors.general}
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                        className="px-6 py-2"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={submitting}
                                        className="bg-royal-blue hover:bg-blue-700 px-6 py-2 shadow-lg"
                                    >
                                        {submitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                {editingResource
                                                    ? "Updating..."
                                                    : "Creating..."}
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                {editingResource
                                                    ? "Update Resource"
                                                    : "Create Resource"}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resources;
