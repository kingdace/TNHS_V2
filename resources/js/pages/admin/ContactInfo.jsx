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
    Phone,
    AlertCircle,
    CheckCircle,
    Loader2,
    Mail,
    MapPin,
    Clock,
    ExternalLink,
} from "lucide-react";

const ContactInfo = () => {
    const [contactInfo, setContactInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingInfo, setEditingInfo] = useState(null);
    const [formData, setFormData] = useState({
        contact_type: "email",
        title: "",
        value: "",
        icon: "",
        display_order: 0,
        is_active: true,
    });

    const contactTypes = [
        {
            value: "email",
            label: "Email",
            icon: Mail,
            placeholder: "admin@tnhs.edu.ph",
        },
        {
            value: "phone",
            label: "Phone",
            icon: Phone,
            placeholder: "(02) 123-4567",
        },
        {
            value: "address",
            label: "Address",
            icon: MapPin,
            placeholder: "Taft, Eastern Samar, Philippines",
        },
        {
            value: "hours",
            label: "Office Hours",
            icon: Clock,
            placeholder: "Monday - Friday: 7:00 AM - 5:00 PM",
        },
        {
            value: "website",
            label: "Website",
            icon: ExternalLink,
            placeholder: "https://www.tnhs.edu.ph",
        },
        {
            value: "social",
            label: "Social Media",
            icon: ExternalLink,
            placeholder: "Facebook: @tnhs",
        },
    ];

    useEffect(() => {
        fetchContactInfo();
    }, []);

    const fetchContactInfo = async () => {
        try {
            setLoading(true);
            const response = await adminService.contactInfo.getAll({
                type: filterType,
                active: null,
            });
            setContactInfo(response.data || []);
            setError("");
        } catch (err) {
            setError("Failed to fetch contact information");
            console.error("Error fetching contact info:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await adminService.contactInfo.create(formData);
            if (response.success) {
                setShowForm(false);
                setFormData({
                    contact_type: "email",
                    title: "",
                    value: "",
                    icon: "",
                    display_order: 0,
                    is_active: true,
                });
                fetchContactInfo();
            }
        } catch (err) {
            setError("Failed to create contact information");
            console.error("Error creating contact info:", err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await adminService.contactInfo.update(
                editingInfo.id,
                formData
            );
            if (response.success) {
                setShowForm(false);
                setEditingInfo(null);
                setFormData({
                    contact_type: "email",
                    title: "",
                    value: "",
                    icon: "",
                    display_order: 0,
                    is_active: true,
                });
                fetchContactInfo();
            }
        } catch (err) {
            setError("Failed to update contact information");
            console.error("Error updating contact info:", err);
        }
    };

    const handleDelete = async (id) => {
        if (
            window.confirm(
                "Are you sure you want to delete this contact information?"
            )
        ) {
            try {
                await adminService.contactInfo.delete(id);
                fetchContactInfo();
            } catch (err) {
                setError("Failed to delete contact information");
                console.error("Error deleting contact info:", err);
            }
        }
    };

    const handleToggleActive = async (id) => {
        try {
            await adminService.contactInfo.toggleActive(id);
            fetchContactInfo();
        } catch (err) {
            setError("Failed to toggle contact information status");
            console.error("Error toggling contact info:", err);
        }
    };

    const handleEdit = (info) => {
        setEditingInfo(info);
        setFormData({
            contact_type: info.contact_type,
            title: info.title || "",
            value: info.value,
            icon: info.icon || "",
            display_order: info.display_order,
            is_active: info.is_active,
        });
        setShowForm(true);
    };

    const getContactTypeIcon = (type) => {
        const contactType = contactTypes.find((t) => t.value === type);
        return contactType ? contactType.icon : Phone;
    };

    const getContactTypeColor = (type) => {
        const colors = {
            email: "bg-blue-100 text-blue-800",
            phone: "bg-green-100 text-green-800",
            address: "bg-purple-100 text-purple-800",
            hours: "bg-orange-100 text-orange-800",
            website: "bg-indigo-100 text-indigo-800",
            social: "bg-pink-100 text-pink-800",
        };
        return colors[type] || "bg-gray-100 text-gray-800";
    };

    const getContactTypePlaceholder = (type) => {
        const contactType = contactTypes.find((t) => t.value === type);
        return contactType ? contactType.placeholder : "";
    };

    const filteredInfo = contactInfo.filter((info) => {
        const matchesSearch =
            info.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            info.value?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = !filterType || info.contact_type === filterType;
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
                        Contact Information
                    </h1>
                    <p className="text-gray-600">
                        Manage contact details, addresses, and communication
                        information
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Contact Info
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
                                placeholder="Search contact information..."
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
                            {contactTypes.map((type) => (
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

            {/* Contact Information List */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {filteredInfo.length === 0 ? (
                    <div className="text-center py-12">
                        <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No contact information found
                        </h3>
                        <p className="text-gray-600">
                            {searchTerm || filterType
                                ? "Try adjusting your search or filters"
                                : "Get started by adding your first contact information"}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {filteredInfo.map((info) => {
                            const Icon = getContactTypeIcon(info.contact_type);
                            return (
                                <div
                                    key={info.id}
                                    className="p-6 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div
                                                    className={`p-2 rounded-lg ${getContactTypeColor(
                                                        info.contact_type
                                                    )}`}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {info.title ||
                                                            info.contact_type
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                info.contact_type.slice(
                                                                    1
                                                                )}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <span className="capitalize">
                                                            {info.contact_type.replace(
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

                                            <div className="mb-3">
                                                <p className="text-gray-900 font-medium">
                                                    {info.value}
                                                </p>
                                                {info.icon && (
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Icon: {info.icon}
                                                    </p>
                                                )}
                                            </div>

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
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                {editingInfo
                                    ? "Edit Contact Information"
                                    : "Add New Contact Information"}
                            </h2>

                            <form
                                onSubmit={
                                    editingInfo ? handleUpdate : handleCreate
                                }
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Type
                                    </label>
                                    <select
                                        value={formData.contact_type}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                contact_type: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        {contactTypes.map((type) => (
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
                                        placeholder="Optional title for this contact info"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Value
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.value}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                value: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder={getContactTypePlaceholder(
                                            formData.contact_type
                                        )}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Icon
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.icon}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                icon: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Optional icon name (e.g., mail, phone, map-pin)"
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
                                                contact_type: "email",
                                                title: "",
                                                value: "",
                                                icon: "",
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

export default ContactInfo;
