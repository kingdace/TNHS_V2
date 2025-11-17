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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Resources Management
                    </h1>
                    <p className="text-gray-600">
                        Manage downloadable resources for the public website
                    </p>
                </div>
                <Button
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                    className="bg-royal-blue hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Resource
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search resources..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="sm:w-48">
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
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
                    <Card>
                        <CardContent className="text-center py-8">
                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No resources found
                            </h3>
                            <p className="text-gray-600">
                                {searchTerm || selectedCategory !== "all"
                                    ? "Try adjusting your search or filter"
                                    : "Get started by adding your first resource"}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    filteredResources.map((resource) => (
                        <Card key={resource.id}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {resource.name}
                                            </h3>
                                            <span
                                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    resource.is_active
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {resource.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                {resource.category}
                                            </span>
                                        </div>
                                        {resource.description && (
                                            <p className="text-gray-600 mb-3">
                                                {resource.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>
                                                Type:{" "}
                                                {resource.file_type?.toUpperCase()}
                                            </span>
                                            <span>
                                                Size:{" "}
                                                {formatFileSize(
                                                    resource.file_size
                                                )}
                                            </span>
                                            <span>
                                                Downloads:{" "}
                                                {resource.download_count}
                                            </span>
                                            <span>
                                                Order: {resource.display_order}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleToggleActive(resource)
                                            }
                                        >
                                            {resource.is_active ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(resource)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(resource.id)
                                            }
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
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
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">
                                    {editingResource
                                        ? "Edit Resource"
                                        : "Add Resource"}
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowForm(false)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name *
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.name[0]}
                                        </p>
                                    )}
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        File {!editingResource && "*"}
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                // Check file size (10MB = 10 * 1024 * 1024 bytes)
                                                const maxSize =
                                                    10 * 1024 * 1024;
                                                if (file.size > maxSize) {
                                                    setErrors({
                                                        ...errors,
                                                        file: [
                                                            `File size must be less than 10MB. Current size: ${(
                                                                file.size /
                                                                1024 /
                                                                1024
                                                            ).toFixed(2)}MB`,
                                                        ],
                                                    });
                                                    e.target.value = ""; // Clear the input
                                                    return;
                                                } else {
                                                    // Clear any previous file errors
                                                    const newErrors = {
                                                        ...errors,
                                                    };
                                                    delete newErrors.file;
                                                    setErrors(newErrors);
                                                }
                                            }
                                            setFormData({
                                                ...formData,
                                                file: file,
                                            });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                        required={!editingResource}
                                    />
                                    {errors.file && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.file[0]}
                                        </p>
                                    )}
                                    <p className="text-gray-500 text-sm mt-1">
                                        Maximum file size: 10MB. Current file:{" "}
                                        {formData.file
                                            ? `${(
                                                  formData.file.size /
                                                  1024 /
                                                  1024
                                              ).toFixed(2)}MB`
                                            : "None selected"}
                                    </p>
                                </div>

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
                                                display_order:
                                                    parseInt(e.target.value) ||
                                                    0,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                        min="0"
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
                                        className="h-4 w-4 text-royal-blue focus:ring-royal-blue border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="is_active"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Active
                                    </label>
                                </div>

                                {errors.general && (
                                    <div className="flex items-center gap-2 text-red-600 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.general}
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={submitting}
                                        className="bg-royal-blue hover:bg-blue-700"
                                    >
                                        {submitting ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        ) : (
                                            <Save className="w-4 h-4 mr-2" />
                                        )}
                                        {editingResource ? "Update" : "Create"}
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
