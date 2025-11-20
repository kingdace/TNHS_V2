import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import {
    Plus,
    Download,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Search,
    Filter,
    ChevronDown,
    FileText,
    Upload,
    X,
} from "lucide-react";

// Helper function to refresh CSRF token
const refreshCSRFToken = async () => {
    try {
        const response = await fetch("/api/csrf-token", {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            // Update the meta tag with the new token
            const metaTag = document.querySelector('meta[name="csrf-token"]');
            if (metaTag && data.csrf_token) {
                metaTag.setAttribute("content", data.csrf_token);
            }
            return data.csrf_token;
        }
    } catch (error) {
        console.warn("Failed to refresh CSRF token:", error);
    }
    return null;
};

// Helper function to handle API requests with CSRF retry
const makeRequest = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            credentials: "include",
            ...options,
        });

        // If we get a 419 CSRF error, try refreshing the token and retry once
        if (response.status === 419) {
            console.log("CSRF token expired, refreshing...");
            const newToken = await refreshCSRFToken();
            if (newToken) {
                // Update headers with new token
                const updatedHeaders = {
                    ...options.headers,
                    "X-CSRF-TOKEN": newToken,
                };

                // Retry the request with the new token
                const retryResponse = await fetch(url, {
                    ...options,
                    headers: updatedHeaders,
                    credentials: "include",
                });
                return retryResponse;
            }
        }

        return response;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};

const AdminDownloadFiles = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
        file: null,
        category: "Forms",
        is_active: true,
        display_order: 0,
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterActive, setFilterActive] = useState("");

    const categories = [
        "Forms",
        "Documents",
        "Policies",
        "Guidelines",
        "Reports",
        "Manuals",
        "Other",
    ];

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await makeRequest("/api/admin/download-files", {
                headers: {
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                setItems(data.data || []);
            } else {
                throw new Error(
                    data.message || "Failed to fetch download files"
                );
            }
        } catch (err) {
            console.error("Error fetching download files:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("category", form.category);
            formData.append("is_active", form.is_active ? "1" : "0");
            formData.append("display_order", form.display_order.toString());

            if (form.file) {
                formData.append("file", form.file);
            }

            const url = editing
                ? `/api/admin/download-files/${editing.id}`
                : "/api/admin/download-files";

            const method = editing ? "POST" : "POST";
            if (editing) {
                formData.append("_method", "PUT");
            }

            // Get CSRF token
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const response = await makeRequest(url, {
                method,
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                await fetchItems();
                resetForm();
                setShowForm(false);
            } else {
                if (data.errors) {
                    const errorMessages = Object.values(data.errors).flat();
                    setError(errorMessages.join(", "));
                } else {
                    setError(data.message || "Operation failed");
                }
            }
        } catch (err) {
            console.error("Error saving download file:", err);
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this download file?")) {
            return;
        }

        try {
            // Get CSRF token
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const response = await makeRequest(
                `/api/admin/download-files/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                        "X-Requested-With": "XMLHttpRequest",
                    },
                }
            );

            const data = await response.json();

            if (data.success) {
                await fetchItems();
            } else {
                setError(data.message || "Failed to delete download file");
            }
        } catch (err) {
            console.error("Error deleting download file:", err);
            setError(err.message);
        }
    };

    const handleToggleActive = async (item) => {
        try {
            // Get CSRF token
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const response = await makeRequest(
                `/api/admin/download-files/${item.id}/toggle-active`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                        "X-Requested-With": "XMLHttpRequest",
                    },
                }
            );

            const data = await response.json();

            if (data.success) {
                await fetchItems();
            } else {
                setError(data.message || "Failed to update status");
            }
        } catch (err) {
            console.error("Error toggling status:", err);
            setError(err.message);
        }
    };

    const resetForm = () => {
        setForm({
            name: "",
            description: "",
            file: null,
            category: "Forms",
            is_active: true,
            display_order: 0,
        });
        setEditing(null);
    };

    const startEdit = (item) => {
        setForm({
            name: item.name,
            description: item.description || "",
            file: null,
            category: item.category,
            is_active: item.is_active,
            display_order: item.display_order,
        });
        setEditing(item);
        setShowForm(true);
    };

    const filteredItems = items.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description &&
                item.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()));
        const matchesCategory =
            !filterCategory || item.category === filterCategory;
        const matchesActive =
            filterActive === "" ||
            (filterActive === "active" && item.is_active) ||
            (filterActive === "inactive" && !item.is_active);

        return matchesSearch && matchesCategory && matchesActive;
    });

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">
                        Loading download files...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Download Files
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage downloadable files and documents
                    </p>
                </div>
                <Button
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add File
                </Button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search files..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={filterCategory}
                                onChange={(e) =>
                                    setFilterCategory(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={filterActive}
                                onChange={(e) =>
                                    setFilterActive(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editing
                                        ? "Edit Download File"
                                        : "Add Download File"}
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowForm(false)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        File Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter file name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={form.description}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter file description"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        File{" "}
                                        {editing
                                            ? "(leave empty to keep current file)"
                                            : "*"}
                                    </label>
                                    <input
                                        type="file"
                                        required={!editing}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                file: e.target.files[0],
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Max file size: 10MB. Supported formats:
                                        PDF, DOC, XLS, PPT, TXT, ZIP, RAR
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            required
                                            value={form.category}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    category: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            {categories.map((category) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Display Order
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={form.display_order}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    display_order:
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={form.is_active}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                is_active: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="is_active"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Active (visible to public)
                                    </label>
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        {editing ? "Update File" : "Add File"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Files List */}
            <div className="grid gap-4">
                {filteredItems.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No download files found
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm || filterCategory || filterActive
                                    ? "Try adjusting your filters"
                                    : "Get started by adding your first download file"}
                            </p>
                            {!searchTerm &&
                                !filterCategory &&
                                !filterActive && (
                                    <Button
                                        onClick={() => {
                                            resetForm();
                                            setShowForm(true);
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add First File
                                    </Button>
                                )}
                        </CardContent>
                    </Card>
                ) : (
                    filteredItems.map((item) => (
                        <Card
                            key={item.id}
                            className="hover:shadow-md transition-shadow"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {item.name}
                                            </h3>
                                            <span
                                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    item.is_active
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {item.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </div>

                                        {item.description && (
                                            <p className="text-gray-600 mb-3">
                                                {item.description}
                                            </p>
                                        )}

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            <span>
                                                Category: {item.category}
                                            </span>
                                            <span>
                                                Type:{" "}
                                                {item.file_type?.toUpperCase()}
                                            </span>
                                            <span>
                                                Size:{" "}
                                                {formatFileSize(item.file_size)}
                                            </span>
                                            <span>
                                                Downloads: {item.download_count}
                                            </span>
                                            <span>
                                                Order: {item.display_order}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 ml-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleToggleActive(item)
                                            }
                                            title={
                                                item.is_active
                                                    ? "Deactivate"
                                                    : "Activate"
                                            }
                                        >
                                            {item.is_active ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => startEdit(item)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                        {item.file_path && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    window.open(
                                                        `/storage/${item.file_path}`,
                                                        "_blank"
                                                    )
                                                }
                                                title="Download file"
                                            >
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminDownloadFiles;
