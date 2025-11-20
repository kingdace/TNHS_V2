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
    User,
    UserCheck,
    GraduationCap,
    Mail,
    Phone,
    AlertCircle,
    CheckCircle,
    Loader2,
    Crown,
    Shield,
    Users,
    X,
    Wrench,
    Building2,
    Tag,
    Upload,
    Image as ImageIcon,
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

const StaffProfiles = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("assistant_principal");
    const [showForm, setShowForm] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [formData, setFormData] = useState({
        staff_type: "assistant_principal",
        full_name: "",
        position: "",
        section: "",
        grade_levels: [],
        profile_image: "",
        contact_info: {
            email: "",
            phone: "",
        },
        is_active: true,
        display_order: 0,
        // Legacy fields (kept for backward compatibility)
        department: "",
        education: "",
        experience: "",
        achievements: "",
        specializations: "",
        subject_specialization: "",
        reports_to: "",
        is_department_head: false,
        position_level: 4,
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const tabs = [
        {
            id: "assistant_principal",
            label: "Assistant Principals",
            icon: Shield,
            color: "blue",
            count: 0,
        },
        {
            id: "teacher",
            label: "Teaching Staff",
            icon: GraduationCap,
            color: "green",
            count: 0,
        },
        {
            id: "admin",
            label: "Administrative Staff",
            icon: UserCheck,
            color: "orange",
            count: 0,
        },
        {
            id: "support",
            label: "Support Staff",
            icon: Wrench,
            color: "purple",
            count: 0,
        },
    ];

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            setLoading(true);
            const response = await adminService.staffProfiles.getAll();
            console.log("Admin API response:", response);
            if (response.data && response.data.length > 0) {
                console.log("First staff member:", response.data[0]);
                console.log(
                    "Profile image URL:",
                    response.data[0].profile_image_url
                );
            }
            setStaff(response.data || []);
            setError("");
        } catch (err) {
            setError("Failed to fetch staff profiles");
            console.error("Error fetching staff:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            setUploading(true);

            // Create FormData for file upload
            const formDataToSend = new FormData();

            // Add all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "contact_info") {
                    // Handle contact_info specially
                    const contactInfo = {
                        ...value,
                        specializations: formData.specializations
                            ? formData.specializations
                                  .split("\n")
                                  .map((s) => s.trim())
                                  .filter((s) => s)
                            : [],
                    };
                    formDataToSend.append(key, JSON.stringify(contactInfo));
                } else if (
                    key !== "profile_image" &&
                    key !== "specializations"
                ) {
                    if (typeof value === "boolean") {
                        formDataToSend.append(key, value ? "1" : "0");
                    } else {
                        // Handle numeric values properly (don't convert 0 to empty string)
                        formDataToSend.append(
                            key,
                            value !== null && value !== undefined
                                ? value.toString()
                                : ""
                        );
                    }
                }
            });

            // Add image file if selected
            if (imageFile) {
                formDataToSend.append("profile_image", imageFile);
            }

            // Debug: Log what we're sending
            console.log("FormData being sent:");
            for (let [key, value] of formDataToSend.entries()) {
                console.log(`${key}:`, value);
            }

            // Get CSRF token
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const response = await makeRequest("/api/admin/staff-profiles", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    Accept: "application/json",
                },
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message ||
                        `HTTP error! status: ${response.status}`
                );
            }

            await fetchStaff();
            setShowForm(false);
            resetForm();
        } catch (err) {
            setError(`Failed to create staff profile: ${err.message}`);
            console.error("Error creating staff:", err);
        } finally {
            setUploading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setUploading(true);

            // Create FormData for file upload
            const formDataToSend = new FormData();

            // Add _method for Laravel PUT requests
            formDataToSend.append("_method", "PUT");

            // Add all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "contact_info") {
                    // Handle contact_info specially
                    const contactInfo = {
                        ...value,
                        specializations: formData.specializations
                            ? formData.specializations
                                  .split("\n")
                                  .map((s) => s.trim())
                                  .filter((s) => s)
                            : [],
                    };
                    formDataToSend.append(key, JSON.stringify(contactInfo));
                } else if (
                    key !== "profile_image" &&
                    key !== "specializations"
                ) {
                    if (typeof value === "boolean") {
                        formDataToSend.append(key, value ? "1" : "0");
                    } else {
                        // Handle numeric values properly (don't convert 0 to empty string)
                        formDataToSend.append(
                            key,
                            value !== null && value !== undefined
                                ? value.toString()
                                : ""
                        );
                    }
                }
            });

            // Add image file if selected
            if (imageFile) {
                formDataToSend.append("profile_image", imageFile);
            }

            // Get CSRF token
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const response = await makeRequest(
                `/api/admin/staff-profiles/${editingStaff.id}`,
                {
                    method: "POST", // Always POST for FormData with _method
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                        Accept: "application/json",
                    },
                    body: formDataToSend,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message ||
                        `HTTP error! status: ${response.status}`
                );
            }

            await fetchStaff();
            setShowForm(false);
            setEditingStaff(null);
            resetForm();
        } catch (err) {
            setError("Failed to update staff profile");
            console.error("Error updating staff:", err);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (
            window.confirm(
                "Are you sure you want to delete this staff profile?"
            )
        ) {
            try {
                await adminService.staffProfiles.delete(id);
                await fetchStaff();
            } catch (err) {
                setError("Failed to delete staff profile");
                console.error("Error deleting staff:", err);
            }
        }
    };

    const handleToggleActive = async (id) => {
        try {
            await adminService.staffProfiles.toggleActive(id);
            await fetchStaff();
        } catch (err) {
            setError("Failed to toggle staff status");
            console.error("Error toggling staff:", err);
        }
    };

    const resetForm = () => {
        setFormData({
            staff_type: activeTab,
            full_name: "",
            position: "",
            section: "",
            grade_levels: [],
            profile_image: "",
            contact_info: {
                email: "",
                phone: "",
            },
            is_active: true,
            display_order: 0,
            // Legacy fields (kept for backward compatibility)
            department: "",
            education: "",
            experience: "",
            achievements: "",
            specializations: "",
            subject_specialization: "",
            reports_to: "",
            is_department_head: false,
            position_level:
                activeTab === "assistant_principal"
                    ? 2
                    : activeTab === "teacher"
                    ? 4
                    : activeTab === "admin"
                    ? 5
                    : 6,
        });
        setImageFile(null);
        setImagePreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                setError("Please select a valid image file");
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError("Image size must be less than 5MB");
                return;
            }

            setImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("folder", "staff-profiles");

        try {
            // Get CSRF token
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const headers = {
                Accept: "application/json",
            };

            // Add CSRF token if available
            if (csrfToken) {
                headers["X-CSRF-TOKEN"] = csrfToken;
            }

            const response = await makeRequest("/api/admin/upload-image", {
                method: "POST",
                headers: headers,
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Upload response:", response.status, errorText);
                throw new Error(`Upload failed: ${response.status}`);
            }

            const data = await response.json();
            return data.path;
        } catch (error) {
            console.error("Image upload error:", error);
            throw error;
        }
    };

    const handleEdit = (item) => {
        setEditingStaff(item);

        // Extract specializations from contact_info if available
        const specializations = item.contact_info?.specializations
            ? Array.isArray(item.contact_info.specializations)
                ? item.contact_info.specializations.join("\n")
                : item.contact_info.specializations
            : "";

        setFormData({
            staff_type: item.staff_type,
            full_name: item.full_name,
            position: item.position || "",
            section: item.section || "",
            grade_levels: item.grade_levels || [],
            profile_image: item.profile_image || "",
            contact_info: item.contact_info || {
                email: "",
                phone: "",
            },
            is_active: item.is_active,
            display_order: item.display_order,
            // Legacy fields (kept for backward compatibility)
            department: item.department || "",
            education: item.education || "",
            experience: item.experience || "",
            achievements: item.achievements || "",
            specializations: specializations,
            subject_specialization: item.subject_specialization || "",
            reports_to: item.reports_to || "",
            is_department_head: item.is_department_head || false,
            position_level: item.position_level || 4,
        });

        // Set image preview if exists
        setImageFile(null);
        setImagePreview(item.profile_image_url || null);

        setShowForm(true);
    };

    const getStaffTypeIcon = (type) => {
        switch (type) {
            case "assistant_principal":
                return Shield;
            case "teacher":
                return GraduationCap;
            case "admin":
                return UserCheck;
            case "support":
                return Wrench;
            default:
                return User;
        }
    };

    const getStaffTypeColor = (type) => {
        switch (type) {
            case "assistant_principal":
                return "bg-blue-100 text-blue-800";
            case "teacher":
                return "bg-green-100 text-green-800";
            case "admin":
                return "bg-orange-100 text-orange-800";
            case "support":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getTabColor = (color) => {
        const colors = {
            blue: "border-blue-500 text-blue-600 bg-blue-50",
            green: "border-green-500 text-green-600 bg-green-50",
            orange: "border-orange-500 text-orange-600 bg-orange-50",
            purple: "border-purple-500 text-purple-600 bg-purple-50",
        };
        return colors[color] || colors.blue;
    };

    // Filter staff by active tab and search term
    const filteredStaff = staff.filter((item) => {
        const matchesTab = item.staff_type === activeTab;
        const matchesSearch =
            item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.department?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // Update tab counts
    const updatedTabs = tabs.map((tab) => ({
        ...tab,
        count: staff.filter((s) => s.staff_type === tab.id).length,
    }));

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
                    <h1 className="text-2xl font-bold">
                        Faculty & Staff Management
                    </h1>
                    <p className="text-blue-100 text-sm">
                        Manage faculty and staff profiles by category
                    </p>
                </div>
                <button
                    onClick={() => {
                        setFormData({ ...formData, staff_type: activeTab });
                        setShowForm(true);
                    }}
                    className="bg-royal-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add{" "}
                    {updatedTabs
                        .find((t) => t.id === activeTab)
                        ?.label.slice(0, -1)}
                </button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {updatedTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                                        isActive
                                            ? getTabColor(tab.color)
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                    <span
                                        className={`ml-2 px-2 py-1 text-xs rounded-full ${
                                            isActive
                                                ? `bg-${tab.color}-100 text-${tab.color}-800`
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Search Bar and Filters */}
                <div className="p-4 bg-gray-100 border-b">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder={`Search ${updatedTabs
                                    .find((t) => t.id === activeTab)
                                    ?.label.toLowerCase()}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Grade Level Filter for Teachers */}
                        {activeTab === "teacher" && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">
                                    Grade:
                                </span>
                                <div className="flex gap-1">
                                    {[
                                        "All",
                                        "7",
                                        "8",
                                        "9",
                                        "10",
                                        "11",
                                        "12",
                                        "ALS",
                                    ].map((grade) => (
                                        <button
                                            key={grade}
                                            onClick={() => {
                                                // This will be implemented with state management
                                                console.log(
                                                    `Filter by grade: ${grade}`
                                                );
                                            }}
                                            className="px-2 py-1 text-xs rounded border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                        >
                                            {grade}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-4 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        {error}
                    </div>
                )}

                {/* Staff List */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Staff Member
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Position
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Department
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStaff.map((item) => {
                                const TypeIcon = getStaffTypeIcon(
                                    item.staff_type
                                );
                                return (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-100"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {item.profile_image_url ? (
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover"
                                                            src={
                                                                item.profile_image_url
                                                            }
                                                            alt={item.full_name}
                                                            onLoad={() =>
                                                                console.log(
                                                                    `✅ Admin image loaded: ${item.full_name} - ${item.profile_image_url}`
                                                                )
                                                            }
                                                            onError={(e) =>
                                                                console.error(
                                                                    `❌ Admin image failed: ${item.full_name} - ${item.profile_image_url}`,
                                                                    e
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <TypeIcon className="h-5 w-5 text-blue-600" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.full_name}
                                                        {item.is_department_head && (
                                                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                <Crown className="h-3 w-3 mr-1" />
                                                                Dept. Head
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {item.subject_specialization && (
                                                            <span className="mr-3">
                                                                📚{" "}
                                                                {
                                                                    item.subject_specialization
                                                                }
                                                            </span>
                                                        )}
                                                        {item.grade_levels &&
                                                            item.grade_levels
                                                                .length > 0 && (
                                                                <span className="mr-3">
                                                                    🎓 Grades:{" "}
                                                                    {item.grade_levels.join(
                                                                        ", "
                                                                    )}
                                                                </span>
                                                            )}
                                                        <span>
                                                            Order:{" "}
                                                            {item.display_order}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {item.position || "No position"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {item.department ||
                                                    "No department"}
                                            </div>
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

                    {filteredStaff.length === 0 && (
                        <div className="text-center py-12">
                            <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">
                                No{" "}
                                {updatedTabs
                                    .find((t) => t.id === activeTab)
                                    ?.label.toLowerCase()}{" "}
                                found.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingStaff
                                        ? `Edit ${updatedTabs
                                              .find((t) => t.id === activeTab)
                                              ?.label.slice(0, -1)}`
                                        : `Add New ${updatedTabs
                                              .find((t) => t.id === activeTab)
                                              ?.label.slice(0, -1)}`}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingStaff(null);
                                        resetForm();
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form
                                onSubmit={
                                    editingStaff ? handleUpdate : handleCreate
                                }
                                className="space-y-6"
                            >
                                {/* TEACHER FORM - Simplified */}
                                {formData.staff_type === "teacher" && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Full Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.full_name}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            full_name:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                            {/* Position and Level */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Position and Level *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.position}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            position:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="e.g., Teacher I, Teacher II, Master Teacher I"
                                                    required
                                                />
                                            </div>
                                            {/* Section */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Section
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        formData.section || ""
                                                    }
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            section:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="e.g., Section A, Section B"
                                                />
                                            </div>
                                        </div>

                                        {/* Grade Levels */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Grade Levels
                                            </label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {[
                                                    "7",
                                                    "8",
                                                    "9",
                                                    "10",
                                                    "11",
                                                    "12",
                                                    "ALS",
                                                ].map((grade) => (
                                                    <label
                                                        key={grade}
                                                        className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                formData.grade_levels?.includes(
                                                                    grade
                                                                ) || false
                                                            }
                                                            onChange={(e) => {
                                                                const currentGrades =
                                                                    formData.grade_levels ||
                                                                    [];
                                                                if (
                                                                    e.target
                                                                        .checked
                                                                ) {
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            grade_levels:
                                                                                [
                                                                                    ...currentGrades,
                                                                                    grade,
                                                                                ],
                                                                        }
                                                                    );
                                                                } else {
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            grade_levels:
                                                                                currentGrades.filter(
                                                                                    (
                                                                                        g
                                                                                    ) =>
                                                                                        g !==
                                                                                        grade
                                                                                ),
                                                                        }
                                                                    );
                                                                }
                                                            }}
                                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm">
                                                            Grade {grade}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* ASSISTANT PRINCIPAL FORM - Full Form (Keep Original) */}
                                {formData.staff_type ===
                                    "assistant_principal" && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Full Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.full_name}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            full_name:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            {/* Position */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Position
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.position}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            position:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Department
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.department}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        department:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* ADMINISTRATIVE STAFF FORM - Simplified */}
                                {formData.staff_type === "admin" && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Full Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.full_name}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            full_name:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                            {/* Position and Level */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Position and Level *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.position}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            position:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="e.g., Administrative Officer II, Registrar"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* SUPPORT STAFF FORM - Simplified */}
                                {formData.staff_type === "support" && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Full Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.full_name}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            full_name:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                            {/* Position and Level */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Position and Level *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.position}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            position:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="e.g., Maintenance Staff, Security Guard, Janitor"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Add Education, Experience, Achievements for ASSISTANT PRINCIPAL only */}
                                {formData.staff_type ===
                                    "assistant_principal" && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Education Background
                                                </label>
                                                <textarea
                                                    value={formData.education}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            education:
                                                                e.target.value,
                                                        })
                                                    }
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Educational qualifications and degrees..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Experience
                                                </label>
                                                <textarea
                                                    value={formData.experience}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            experience:
                                                                e.target.value,
                                                        })
                                                    }
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Professional experience and background..."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Achievements & Leadership
                                                Philosophy
                                            </label>
                                            <textarea
                                                value={formData.achievements}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        achievements:
                                                            e.target.value,
                                                    })
                                                }
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Awards, recognitions, achievements, and leadership philosophy..."
                                            />
                                        </div>

                                        {formData.staff_type ===
                                            "assistant_principal" && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Key
                                                    Strengths/Specializations
                                                    <span className="text-gray-500 text-xs ml-2">
                                                        (One per line)
                                                    </span>
                                                </label>
                                                <textarea
                                                    value={
                                                        formData.specializations
                                                    }
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            specializations:
                                                                e.target.value,
                                                        })
                                                    }
                                                    rows={4}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Curriculum Development&#10;Student Mentorship&#10;Team Leadership&#10;Crisis Management"
                                                />
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Profile Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Profile Image
                                    </label>
                                    <div className="space-y-4">
                                        {/* Image Preview */}
                                        {imagePreview && (
                                            <div className="flex items-center space-x-4">
                                                <div className="relative">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-600">
                                                        Current image
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setImagePreview(
                                                                null
                                                            );
                                                            setImageFile(null);
                                                            setFormData({
                                                                ...formData,
                                                                profile_image:
                                                                    "",
                                                            });
                                                        }}
                                                        className="text-red-600 hover:text-red-800 text-sm"
                                                    >
                                                        Remove image
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* File Input */}
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">
                                                            Click to upload
                                                        </span>{" "}
                                                        or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        PNG, JPG or JPEG (MAX.
                                                        5MB)
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Organizational Fields for ASSISTANT PRINCIPAL only */}
                                {formData.staff_type ===
                                    "assistant_principal" && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Position Level
                                            </label>
                                            <select
                                                value={formData.position_level}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        position_level:
                                                            parseInt(
                                                                e.target.value
                                                            ),
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value={1}>
                                                    Level 1 - Principal
                                                </option>
                                                <option value={2}>
                                                    Level 2 - Assistant
                                                    Principal
                                                </option>
                                                <option value={3}>
                                                    Level 3 - Department Head
                                                </option>
                                                <option value={4}>
                                                    Level 4 - Teacher
                                                </option>
                                                <option value={5}>
                                                    Level 5 - Administrative
                                                    Staff
                                                </option>
                                                <option value={6}>
                                                    Level 6 - Support Staff
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                        <div className="flex items-center">
                                            <label className="flex items-center mt-6">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        formData.is_department_head
                                                    }
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            is_department_head:
                                                                e.target
                                                                    .checked,
                                                        })
                                                    }
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">
                                                    Department Head
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Contact Information (Optional) */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Contact Information (Optional)
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={
                                                    formData.contact_info
                                                        ?.email || ""
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        contact_info: {
                                                            ...formData.contact_info,
                                                            email: e.target
                                                                .value,
                                                        },
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="teacher@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                value={
                                                    formData.contact_info
                                                        ?.phone || ""
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        contact_info: {
                                                            ...formData.contact_info,
                                                            phone: e.target
                                                                .value,
                                                        },
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="+63 912 345 6789"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Status */}
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
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingStaff(null);
                                            resetForm();
                                        }}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        {uploading && (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        )}
                                        {uploading
                                            ? "Uploading..."
                                            : editingStaff
                                            ? "Update"
                                            : "Create"}
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

export default StaffProfiles;
