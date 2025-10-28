import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    GripVertical,
    Search,
    Filter,
    User,
    UserCheck,
    GraduationCap,
    Mail,
    Phone,
    MapPin,
    AlertCircle,
    CheckCircle,
    Loader2,
    Crown,
    Shield,
    Users,
    X,
} from "lucide-react";

const StaffProfiles = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [formData, setFormData] = useState({
        staff_type: "teacher",
        full_name: "",
        position: "",
        department: "",
        education: "",
        experience: "",
        achievements: "",
        profile_image: "",
        contact_info: {
            email: "",
            phone: "",
            address: "",
        },
        is_active: true,
        display_order: 0,
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            setLoading(true);
            const response = await adminService.staffProfiles.getAll({
                type: filterType,
                active: null,
            });
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
            await adminService.staffProfiles.create(formData);
            await fetchStaff();
            setShowForm(false);
            resetForm();
        } catch (err) {
            setError("Failed to create staff profile");
            console.error("Error creating staff:", err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await adminService.staffProfiles.update(editingStaff.id, formData);
            await fetchStaff();
            setShowForm(false);
            setEditingStaff(null);
            resetForm();
        } catch (err) {
            setError("Failed to update staff profile");
            console.error("Error updating staff:", err);
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
            staff_type: "teacher",
            full_name: "",
            position: "",
            department: "",
            education: "",
            experience: "",
            achievements: "",
            profile_image: "",
            contact_info: {
                email: "",
                phone: "",
                address: "",
            },
            is_active: true,
            display_order: 0,
        });
    };

    const handleEdit = (item) => {
        setEditingStaff(item);
        setFormData({
            staff_type: item.staff_type,
            full_name: item.full_name,
            position: item.position || "",
            department: item.department || "",
            education: item.education || "",
            experience: item.experience || "",
            achievements: item.achievements || "",
            profile_image: item.profile_image || "",
            contact_info: item.contact_info || {
                email: "",
                phone: "",
                address: "",
            },
            is_active: item.is_active,
            display_order: item.display_order,
        });
        setShowForm(true);
    };

    const getStaffTypeIcon = (type) => {
        switch (type) {
            case "principal":
                return Crown;
            case "assistant_principal":
                return Shield;
            case "teacher":
                return GraduationCap;
            case "admin":
                return UserCheck;
            case "support":
                return Users;
            default:
                return User;
        }
    };

    const getStaffTypeColor = (type) => {
        switch (type) {
            case "principal":
                return "bg-purple-100 text-purple-800";
            case "assistant_principal":
                return "bg-blue-100 text-blue-800";
            case "teacher":
                return "bg-green-100 text-green-800";
            case "admin":
                return "bg-orange-100 text-orange-800";
            case "support":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStaffTypeLabel = (type) => {
        switch (type) {
            case "principal":
                return "Principal";
            case "assistant_principal":
                return "Assistant Principal";
            case "teacher":
                return "Teacher";
            case "admin":
                return "Administrative Staff";
            case "support":
                return "Support Staff";
            default:
                return type;
        }
    };

    const filteredStaff = staff.filter((item) => {
        const matchesSearch =
            item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.department?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = !filterType || item.staff_type === filterType;
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
                    <h1 className="text-2xl font-bold">Faculty & Staff</h1>
                    <p className="text-blue-100 text-sm">
                        Manage faculty and staff profiles
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-royal-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Staff
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
                                placeholder="Search staff..."
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
                            <option value="principal">Principal</option>
                            <option value="assistant_principal">
                                Assistant Principal
                            </option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Administrative Staff</option>
                            <option value="support">Support Staff</option>
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

            {/* Staff List */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Staff Member
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Position
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
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
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {item.profile_image ? (
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover"
                                                            src={
                                                                item.profile_image
                                                            }
                                                            alt={item.full_name}
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
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {item.department ||
                                                            "No department"}
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
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStaffTypeColor(
                                                    item.staff_type
                                                )}`}
                                            >
                                                {getStaffTypeLabel(
                                                    item.staff_type
                                                )}
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
                                    {editingStaff
                                        ? "Edit Staff Profile"
                                        : "Add New Staff"}
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                    full_name: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Staff Type *
                                        </label>
                                        <select
                                            required
                                            value={formData.staff_type}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    staff_type: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="principal">
                                                Principal
                                            </option>
                                            <option value="assistant_principal">
                                                Assistant Principal
                                            </option>
                                            <option value="teacher">
                                                Teacher
                                            </option>
                                            <option value="admin">
                                                Administrative Staff
                                            </option>
                                            <option value="support">
                                                Support Staff
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                    position: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
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
                                                    department: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Education Background
                                    </label>
                                    <textarea
                                        value={formData.education}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                education: e.target.value,
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
                                                experience: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Professional experience and background..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Achievements
                                    </label>
                                    <textarea
                                        value={formData.achievements}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                achievements: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Awards, recognitions, and achievements..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.contact_info.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    contact_info: {
                                                        ...formData.contact_info,
                                                        email: e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.contact_info.phone}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    contact_info: {
                                                        ...formData.contact_info,
                                                        phone: e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
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
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        {editingStaff ? "Update" : "Create"}
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
