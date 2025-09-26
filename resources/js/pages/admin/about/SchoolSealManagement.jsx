import React, { useState, useEffect } from "react";
import {
    Shield,
    BookOpen,
    Star,
    Flame,
    Key,
    Sun,
    MapPin,
    Plus,
    Edit,
    Trash,
    Eye as EyeIcon,
    EyeOff,
    Search,
    MoreVertical,
    CheckCircle,
    XCircle,
    AlertCircle,
    Image as ImageIcon,
} from "lucide-react";
import Modal from "../../../components/Modal";
import { adminService } from "../../../services/adminService";

const SchoolSealManagement = () => {
    // State management
    const [activeTab, setActiveTab] = useState("seal-info");
    const [sealInfo, setSealInfo] = useState([]);
    const [symbolicElements, setSymbolicElements] = useState([]);
    const [coreValues, setCoreValues] = useState([]);

    // UI State
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("create");
    const [editingItem, setEditingItem] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    // Form state
    const [formData, setFormData] = useState({
        info_type: "seal_image",
        title: "",
        content: "",
        subtitle: "",
        name: "",
        icon: "",
        color: "",
        emoji: "",
        meaning: "",
        interpretation: "",
        image: null,
        display_order: 0,
        is_active: true,
    });

    // Tab configuration
    const tabs = [
        {
            id: "seal-info",
            label: "School Seal Info",
            icon: Shield,
            color: "blue",
        },
        {
            id: "symbolic-elements",
            label: "Symbolic Elements",
            icon: Flame,
            color: "orange",
        },
        {
            id: "core-values",
            label: "Core Values",
            icon: Star,
            color: "yellow",
        },
    ];

    // Info type options
    const infoTypeOptions = [
        { value: "seal_image", label: "School Seal Image" },
        { value: "school_identity", label: "School Identity" },
        { value: "motto", label: "School Motto" },
    ];

    // Icon options for symbolic elements
    const iconOptions = [
        { value: "Flame", label: "Flame", icon: Flame },
        { value: "Key", label: "Key", icon: Key },
        { value: "BookOpen", label: "Book Open", icon: BookOpen },
        { value: "Sun", label: "Sun", icon: Sun },
        { value: "Shield", label: "Shield", icon: Shield },
        { value: "MapPin", label: "Map Pin", icon: MapPin },
    ];

    // Color options for core values
    const colorOptions = [
        { value: "from-red-500 to-pink-500", label: "Red to Pink" },
        { value: "from-blue-500 to-cyan-500", label: "Blue to Cyan" },
        { value: "from-green-500 to-emerald-500", label: "Green to Emerald" },
        { value: "from-yellow-500 to-orange-500", label: "Yellow to Orange" },
        { value: "from-purple-500 to-pink-500", label: "Purple to Pink" },
        { value: "from-indigo-500 to-blue-500", label: "Indigo to Blue" },
    ];

    // Fetch data based on active tab
    const fetchData = async () => {
        setLoading(true);
        try {
            switch (activeTab) {
                case "seal-info":
                    const sealInfoData =
                        await adminService.schoolSealInfo.getAll();
                    setSealInfo(sealInfoData.data || []);
                    break;
                case "symbolic-elements":
                    const symbolicElementsData =
                        await adminService.schoolSealSymbolicElements.getAll();
                    setSymbolicElements(symbolicElementsData.data || []);
                    break;
                case "core-values":
                    const coreValuesData =
                        await adminService.schoolSealCoreValues.getAll();
                    setCoreValues(coreValuesData.data || []);
                    break;
            }
        } catch (error) {
            console.error(`Error fetching ${activeTab}:`, error);
            showToast("Failed to fetch data", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdown && !event.target.closest(".dropdown-container")) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdown]);

    // Show toast notification
    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(
            () => setToast({ show: false, message: "", type: "success" }),
            3000
        );
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            info_type: "seal_image",
            title: "",
            content: "",
            subtitle: "",
            name: "",
            icon: "",
            color: "",
            emoji: "",
            meaning: "",
            interpretation: "",
            image: null,
            display_order: 0,
            is_active: true,
        });
        setEditingItem(null);
    };

    // Open modal
    const openModal = (type, item = null) => {
        setModalType(type);
        if (item) {
            setEditingItem(item);
            setFormData({
                info_type: item.info_type || "seal_image",
                title: item.title || "",
                content: item.content || item.description || "",
                subtitle: item.subtitle || "",
                name: item.name || "",
                icon: item.icon || "",
                color: item.color || "",
                emoji: item.emoji || "",
                meaning: item.meaning || "",
                interpretation: item.interpretation || "",
                image: null,
                display_order: item.display_order || 0,
                is_active: item.is_active,
            });
        } else {
            resetForm();
        }
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    // Handle dropdown toggle
    const toggleDropdown = (itemId) => {
        setOpenDropdown(openDropdown === itemId ? null : itemId);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();

            // Add CSRF token first
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");
            if (csrfToken) {
                formDataToSend.append("_token", csrfToken);
            }

            // Add common fields - always send required fields
            if (formData.title) formDataToSend.append("title", formData.title);
            if (formData.content || activeTab === "core-values") {
                // For core-values, send as description (required)
                if (activeTab === "core-values") {
                    formDataToSend.append(
                        "description",
                        formData.content || ""
                    );
                } else {
                    formDataToSend.append("content", formData.content || "");
                }
            }
            if (formData.subtitle)
                formDataToSend.append("subtitle", formData.subtitle);
            if (
                formData.name ||
                activeTab === "symbolic-elements" ||
                activeTab === "core-values"
            ) {
                formDataToSend.append("name", formData.name || "");
            }
            if (formData.icon) formDataToSend.append("icon", formData.icon);
            if (formData.color) formDataToSend.append("color", formData.color);
            if (formData.emoji) formDataToSend.append("emoji", formData.emoji);
            if (formData.meaning || activeTab === "symbolic-elements")
                formDataToSend.append("meaning", formData.meaning || "");
            if (formData.interpretation || activeTab === "symbolic-elements")
                formDataToSend.append(
                    "interpretation",
                    formData.interpretation || ""
                );
            if (formData.info_type || activeTab === "seal-info")
                formDataToSend.append(
                    "info_type",
                    formData.info_type || "seal_image"
                );
            if (formData.image) formDataToSend.append("image", formData.image);
            formDataToSend.append("display_order", formData.display_order || 0);
            formDataToSend.append("is_active", formData.is_active ? "1" : "0");

            let response;
            if (modalType === "create") {
                switch (activeTab) {
                    case "seal-info":
                        response = await adminService.schoolSealInfo.create(
                            formDataToSend
                        );
                        break;
                    case "symbolic-elements":
                        response =
                            await adminService.schoolSealSymbolicElements.create(
                                formDataToSend
                            );
                        break;
                    case "core-values":
                        response =
                            await adminService.schoolSealCoreValues.create(
                                formDataToSend
                            );
                        break;
                }
            } else {
                switch (activeTab) {
                    case "seal-info":
                        response = await adminService.schoolSealInfo.update(
                            editingItem.id,
                            formDataToSend
                        );
                        break;
                    case "symbolic-elements":
                        response =
                            await adminService.schoolSealSymbolicElements.update(
                                editingItem.id,
                                formDataToSend
                            );
                        break;
                    case "core-values":
                        response =
                            await adminService.schoolSealCoreValues.update(
                                editingItem.id,
                                formDataToSend
                            );
                        break;
                }
            }

            if (response.success) {
                showToast(response.message, "success");
                closeModal();
                fetchData();
            } else {
                // Show validation errors if present
                if (response.errors) {
                    const errorMessages = Object.values(response.errors)
                        .flat()
                        .join(", ");
                    showToast(`Validation failed: ${errorMessages}`, "error");
                } else {
                    showToast(response.message || "Operation failed", "error");
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            showToast("Failed to save changes", "error");
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?"))
            return;

        try {
            let response;
            switch (activeTab) {
                case "seal-info":
                    response = await adminService.schoolSealInfo.delete(id);
                    break;
                case "symbolic-elements":
                    response =
                        await adminService.schoolSealSymbolicElements.delete(
                            id
                        );
                    break;
                case "core-values":
                    response = await adminService.schoolSealCoreValues.delete(
                        id
                    );
                    break;
            }

            if (response.success) {
                showToast(response.message, "success");
                fetchData();
            } else {
                showToast(response.message || "Delete failed", "error");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            showToast("Failed to delete item", "error");
        }
    };

    // Handle toggle active
    const handleToggleActive = async (id) => {
        try {
            let response;
            switch (activeTab) {
                case "seal-info":
                    response = await adminService.schoolSealInfo.toggleActive(
                        id
                    );
                    break;
                case "symbolic-elements":
                    response =
                        await adminService.schoolSealSymbolicElements.toggleActive(
                            id
                        );
                    break;
                case "core-values":
                    response =
                        await adminService.schoolSealCoreValues.toggleActive(
                            id
                        );
                    break;
            }

            if (response.success) {
                showToast(response.message, "success");
                fetchData();
            } else {
                showToast(response.message || "Toggle failed", "error");
            }
        } catch (error) {
            console.error("Error toggling active status:", error);
            showToast("Failed to update status", "error");
        }
    };

    // Get current data based on active tab
    const getCurrentData = () => {
        switch (activeTab) {
            case "seal-info":
                return sealInfo;
            case "symbolic-elements":
                return symbolicElements;
            case "core-values":
                return coreValues;
            default:
                return [];
        }
    };

    // Filter data based on search query
    const getFilteredData = () => {
        const data = getCurrentData();
        if (!searchQuery) return data;

        return data.filter(
            (item) =>
                item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.content
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.meaning?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // Render item based on type
    const renderItem = (item, index) => {
        const isActive = item.is_active;

        return (
            <div
                key={item.id}
                className={`bg-white rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-md ${
                    isActive ? "border-green-200" : "border-gray-200"
                }`}
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        {activeTab === "symbolic-elements" && item.icon && (
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                {React.createElement(
                                    iconOptions.find(
                                        (opt) => opt.value === item.icon
                                    )?.icon || Flame,
                                    { className: "w-6 h-6 text-white" }
                                )}
                            </div>
                        )}
                        {activeTab === "core-values" && item.icon && (
                            <div
                                className={`w-12 h-12 bg-gradient-to-r ${
                                    item.color || "from-blue-500 to-green-500"
                                } rounded-full flex items-center justify-center`}
                            >
                                {React.createElement(
                                    iconOptions.find(
                                        (opt) => opt.value === item.icon
                                    )?.icon || Star,
                                    { className: "w-6 h-6 text-white" }
                                )}
                            </div>
                        )}
                        {activeTab === "seal-info" && item.image_path && (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                <img
                                    src={item.image_path}
                                    alt={item.title || "School Seal"}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display =
                                            "flex";
                                    }}
                                />
                                <div
                                    className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center"
                                    style={{ display: "none" }}
                                >
                                    <ImageIcon className="w-6 h-6 text-gray-600" />
                                </div>
                            </div>
                        )}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {item.title || item.name}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                                {item.info_type && (
                                    <span
                                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                            item.info_type === "seal_image"
                                                ? "bg-blue-100 text-blue-800"
                                                : item.info_type ===
                                                  "school_identity"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-purple-100 text-purple-800"
                                        }`}
                                    >
                                        {infoTypeOptions.find(
                                            (type) =>
                                                type.value === item.info_type
                                        )?.label || item.info_type}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleToggleActive(item.id)}
                            className={`p-2 rounded-full transition-colors ${
                                isActive
                                    ? "text-green-600 hover:bg-green-100"
                                    : "text-gray-400 hover:bg-gray-100"
                            }`}
                        >
                            {isActive ? (
                                <CheckCircle className="w-5 h-5" />
                            ) : (
                                <XCircle className="w-5 h-5" />
                            )}
                        </button>

                        <div className="relative dropdown-container">
                            <button
                                onClick={() => toggleDropdown(item.id)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <MoreVertical className="w-5 h-5" />
                            </button>
                            {openDropdown === item.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                openModal("edit", item);
                                                setOpenDropdown(null);
                                            }}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            <Edit className="w-4 h-4 mr-3" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDelete(item.id);
                                                setOpenDropdown(null);
                                            }}
                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <Trash className="w-4 h-4 mr-3" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    {item.content && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {item.content}
                        </p>
                    )}
                    {item.subtitle && (
                        <p className="text-gray-600 text-sm italic">
                            {item.subtitle}
                        </p>
                    )}
                    {item.meaning && (
                        <p className="text-gray-600 text-sm">
                            <strong>Meaning:</strong> {item.meaning}
                        </p>
                    )}
                    {item.interpretation && (
                        <p className="text-gray-600 text-sm">
                            <strong>Interpretation:</strong>{" "}
                            {item.interpretation}
                        </p>
                    )}
                    {item.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {item.description}
                        </p>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>Order: {item.display_order}</span>
                    <span
                        className={`px-2 py-1 rounded-full ${
                            isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                    >
                        {isActive ? "Active" : "Inactive"}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* Sub-tabs */}
            <div className="mb-6 justify-center">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex justify-center space-x-8">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                        isActive
                                            ? `border-${tab.color}-500 text-${tab.color}-600`
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <button
                    onClick={() => openModal("create")}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New</span>
                </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
                {loading ? (
                    <div className="grid gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-lg border p-6 animate-pulse"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {getFilteredData().map((item, index) =>
                            renderItem(item, index)
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal show={showModal} onClose={closeModal}>
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                        {modalType === "create" ? "Add New" : "Edit"}{" "}
                        {tabs.find((t) => t.id === activeTab)?.label}
                    </h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeTab === "seal-info" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Info Type{" "}
                                    <span className="text-red-500">*</span>
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
                                    {infoTypeOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {activeTab === "seal-info" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                />
                            </div>
                        )}

                        {activeTab === "symbolic-elements" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name <span className="text-red-500">*</span>
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        )}

                        {activeTab === "core-values" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name <span className="text-red-500">*</span>
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        )}

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
                                        display_order:
                                            parseInt(e.target.value) || 0,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                min="0"
                            />
                        </div>
                    </div>

                    {activeTab === "seal-info" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={formData.subtitle}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            subtitle: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </>
                    )}

                    {activeTab === "symbolic-elements" && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Icon
                                    </label>
                                    <select
                                        value={formData.icon}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                icon: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select an icon</option>
                                        {iconOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Emoji
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.emoji}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                emoji: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="🔥"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Meaning{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.meaning}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            meaning: e.target.value,
                                        })
                                    }
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Interpretation{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.interpretation}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            interpretation: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {activeTab === "core-values" && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Icon
                                    </label>
                                    <select
                                        value={formData.icon}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                icon: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select an icon</option>
                                        {iconOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Color
                                    </label>
                                    <select
                                        value={formData.color}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                color: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select a color</option>
                                        {colorOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            content: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {(activeTab === "seal-info" ||
                        activeTab === "symbolic-elements" ||
                        activeTab === "core-values") && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        image: e.target.files[0],
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {modalType === "edit" && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Leave empty to keep current image
                                </p>
                            )}

                            {/* Image Preview */}
                            {(formData.image || editingItem?.image_path) && (
                                <div className="mt-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preview
                                    </label>
                                    <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                                        {formData.image ? (
                                            <img
                                                src={URL.createObjectURL(
                                                    formData.image
                                                )}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : editingItem?.image_path ? (
                                            <img
                                                src={editingItem.image_path}
                                                alt="Current image"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display =
                                                        "none";
                                                    e.target.nextSibling.style.display =
                                                        "flex";
                                                }}
                                            />
                                        ) : null}
                                        <div
                                            className="w-full h-full bg-gray-100 flex items-center justify-center"
                                            style={{ display: "none" }}
                                        >
                                            <ImageIcon className="w-8 h-8 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center space-x-4">
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

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {modalType === "create" ? "Create" : "Update"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Toast */}
            {toast.show && (
                <div
                    className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                        toast.type === "success"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                    }`}
                >
                    <div className="flex items-center space-x-2">
                        {toast.type === "success" ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchoolSealManagement;
