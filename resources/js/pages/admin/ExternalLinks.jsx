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
    ExternalLink,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Search,
    Filter,
    ChevronDown,
    Link,
    X,
    MousePointer,
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

const AdminExternalLinks = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        url: "",
        category: "Learning",
        icon: "",
        color: "blue",
        is_active: true,
        display_order: 0,
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterActive, setFilterActive] = useState("");

    const categories = [
        "Learning",
        "Resources",
        "Tools",
        "Communication",
        "Government",
        "Social Media",
        "Other",
    ];

    const colors = [
        { value: "blue", label: "Blue", class: "bg-blue-500" },
        { value: "green", label: "Green", class: "bg-green-500" },
        { value: "red", label: "Red", class: "bg-red-500" },
        { value: "yellow", label: "Yellow", class: "bg-yellow-500" },
        { value: "purple", label: "Purple", class: "bg-purple-500" },
        { value: "pink", label: "Pink", class: "bg-pink-500" },
        { value: "indigo", label: "Indigo", class: "bg-indigo-500" },
        { value: "gray", label: "Gray", class: "bg-gray-500" },
    ];

    const icons = [
        "book",
        "globe",
        "mail",
        "phone",
        "user",
        "users",
        "home",
        "settings",
        "calendar",
        "clock",
        "star",
        "heart",
        "camera",
        "video",
        "music",
        "file",
        "folder",
        "download",
        "upload",
        "search",
        "filter",
        "edit",
        "trash",
        "plus",
        "minus",
        "check",
        "x",
        "arrow-right",
        "arrow-left",
    ];

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await makeRequest("/api/admin/external-links", {
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
                    data.message || "Failed to fetch external links"
                );
            }
        } catch (err) {
            console.error("Error fetching external links:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const url = editing
                ? `/api/admin/external-links/${editing.id}`
                : "/api/admin/external-links";

            const method = editing ? "PUT" : "POST";

            // Get CSRF token
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const response = await makeRequest(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify(form),
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
            console.error("Error saving external link:", err);
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this external link?")) {
            return;
        }

        try {
            // Get CSRF token
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const response = await makeRequest(
                `/api/admin/external-links/${id}`,
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
                setError(data.message || "Failed to delete external link");
            }
        } catch (err) {
            console.error("Error deleting external link:", err);
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
                `/api/admin/external-links/${item.id}/toggle-active`,
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
            title: "",
            description: "",
            url: "",
            category: "Learning",
            icon: "",
            color: "blue",
            is_active: true,
            display_order: 0,
        });
        setEditing(null);
    };

    const startEdit = (item) => {
        setForm({
            title: item.title,
            description: item.description || "",
            url: item.url,
            category: item.category,
            icon: item.icon || "",
            color: item.color || "blue",
            is_active: item.is_active,
            display_order: item.display_order,
        });
        setEditing(item);
        setShowForm(true);
    };

    const filteredItems = items.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description &&
                item.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
            item.url.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            !filterCategory || item.category === filterCategory;
        const matchesActive =
            filterActive === "" ||
            (filterActive === "active" && item.is_active) ||
            (filterActive === "inactive" && !item.is_active);

        return matchesSearch && matchesCategory && matchesActive;
    });

    const getColorClass = (color) => {
        const colorMap = {
            blue: "bg-blue-500",
            green: "bg-green-500",
            red: "bg-red-500",
            yellow: "bg-yellow-500",
            purple: "bg-purple-500",
            pink: "bg-pink-500",
            indigo: "bg-indigo-500",
            gray: "bg-gray-500",
        };
        return colorMap[color] || "bg-blue-500";
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">
                        Loading external links...
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
                        External Links
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage external links and resources
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
                    Add Link
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
                                    placeholder="Search links..."
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
                                        ? "Edit External Link"
                                        : "Add External Link"}
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
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                title: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter link title"
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
                                        placeholder="Enter link description"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL *
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        value={form.url}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                url: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://example.com"
                                    />
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
                                            Color
                                        </label>
                                        <select
                                            value={form.color}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    color: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            {colors.map((color) => (
                                                <option
                                                    key={color.value}
                                                    value={color.value}
                                                >
                                                    {color.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Icon (optional)
                                        </label>
                                        <select
                                            value={form.icon}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    icon: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">No icon</option>
                                            {icons.map((icon) => (
                                                <option key={icon} value={icon}>
                                                    {icon}
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
                                        {editing ? "Update Link" : "Add Link"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Links List */}
            <div className="grid gap-4">
                {filteredItems.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <Link className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No external links found
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm || filterCategory || filterActive
                                    ? "Try adjusting your filters"
                                    : "Get started by adding your first external link"}
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
                                        Add First Link
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
                                    <div className="flex items-start space-x-4 flex-1">
                                        <div
                                            className={`w-12 h-12 rounded-lg ${getColorClass(
                                                item.color
                                            )} flex items-center justify-center text-white font-semibold`}
                                        >
                                            {item.icon ? (
                                                <span className="text-sm">
                                                    {item.icon}
                                                </span>
                                            ) : (
                                                <Link className="w-6 h-6" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {item.title}
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

                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                                                <span>
                                                    Category: {item.category}
                                                </span>
                                                <span>
                                                    Clicks: {item.click_count}
                                                </span>
                                                <span>
                                                    Order: {item.display_order}
                                                </span>
                                            </div>

                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 text-sm break-all"
                                            >
                                                {item.url}
                                            </a>
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
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                window.open(item.url, "_blank")
                                            }
                                            title="Visit link"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
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

export default AdminExternalLinks;
