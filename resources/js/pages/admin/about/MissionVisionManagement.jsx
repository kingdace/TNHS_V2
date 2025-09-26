import React, { useState, useEffect } from "react";
import {
    Target,
    Eye,
    Heart,
    BookOpen,
    Award,
    Globe,
    Lightbulb,
    Users,
    Plus,
    Edit,
    Trash,
    Eye as EyeIcon,
    EyeOff,
    Search,
    Filter,
    MoreVertical,
    CheckCircle,
    XCircle,
    AlertCircle,
} from "lucide-react";
import Modal from "../../../components/Modal";
import { adminService } from "../../../services/adminService";

const MissionVisionManagement = () => {
    // State management
    const [activeTab, setActiveTab] = useState("missions");
    const [missions, setMissions] = useState([]);
    const [visions, setVisions] = useState([]);
    const [coreValues, setCoreValues] = useState([]);
    const [principles, setPrinciples] = useState([]);
    const [goals, setGoals] = useState([]);

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
        title: "",
        content: "",
        description: "",
        icon: "",
        color: "",
        category: "",
        image: null,
        display_order: 0,
        is_active: true,
        type: "mission", // mission or vision
    });

    // Tab configuration
    const tabs = [
        {
            id: "missions",
            label: "Mission & Vision",
            icon: Target,
            color: "blue",
        },
        { id: "core-values", label: "Core Values", icon: Heart, color: "red" },
        {
            id: "principles",
            label: "Guiding Principles",
            icon: BookOpen,
            color: "purple",
        },
        {
            id: "goals",
            label: "Goals & Objectives",
            icon: Award,
            color: "yellow",
        },
    ];

    // Icon options for forms
    const iconOptions = [
        { value: "Heart", label: "Heart", icon: Heart },
        { value: "Users", label: "Users", icon: Users },
        { value: "Globe", label: "Globe", icon: Globe },
        { value: "Award", label: "Award", icon: Award },
        { value: "BookOpen", label: "Book Open", icon: BookOpen },
        { value: "Lightbulb", label: "Lightbulb", icon: Lightbulb },
        { value: "Target", label: "Target", icon: Target },
        { value: "Eye", label: "Eye", icon: EyeIcon },
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

    // Category options for goals
    const categoryOptions = [
        { value: "academic", label: "Academic Goals" },
        { value: "character", label: "Character Development" },
        { value: "community", label: "Community Engagement" },
        { value: "leadership", label: "Leadership Development" },
    ];

    // Fetch data based on active tab
    const fetchData = async () => {
        setLoading(true);
        try {
            switch (activeTab) {
                case "missions":
                    // Fetch both missions and visions for the combined tab
                    const [missionsData, visionsData] = await Promise.all([
                        adminService.missions.getAll(),
                        adminService.visions.getAll(),
                    ]);
                    setMissions(missionsData.data || []);
                    setVisions(visionsData.data || []);
                    break;
                case "core-values":
                    const coreValuesData =
                        await adminService.coreValues.getAll();
                    setCoreValues(coreValuesData.data || []);
                    break;
                case "principles":
                    const principlesData =
                        await adminService.principles.getAll();
                    setPrinciples(principlesData.data || []);
                    break;
                case "goals":
                    const goalsData = await adminService.goals.getAll();
                    setGoals(goalsData.data || []);
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
            title: "",
            content: "",
            description: "",
            icon: "",
            color: "",
            category: "",
            image: null,
            display_order: 0,
            is_active: true,
            type: "mission",
        });
        setEditingItem(null);
    };

    // Open modal
    const openModal = (type, item = null) => {
        setModalType(type);
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title || "",
                content: item.content || "",
                description: item.description || "",
                icon: item.icon || "",
                color: item.color || "",
                category: item.category || "",
                image: null,
                display_order: item.display_order || 0,
                is_active: item.is_active,
                type: item.type || "mission",
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
            const isMissionsTab = activeTab === "missions";
            // Build payload depending on tab
            const formDataToSend = isMissionsTab
                ? (() => {
                      const fd = new FormData();
                      if (formData.title) fd.append("title", formData.title);
                      if (formData.content)
                          fd.append("content", formData.content);
                      if (formData.image) fd.append("image", formData.image);
                      if (formData.type) fd.append("type", formData.type);
                      fd.append("display_order", formData.display_order);
                      fd.append("is_active", formData.is_active ? "1" : "0");
                      return fd;
                  })()
                : {
                      title: formData.title,
                      description: formData.description,
                      icon: formData.icon || undefined,
                      color: formData.color || undefined,
                      category: formData.category || undefined,
                      display_order: formData.display_order,
                      is_active: formData.is_active,
                  };

            let response;
            // Determine if it's a mission or vision based on editingItem or form data
            const isVision = editingItem
                ? editingItem.type === "vision"
                : formData.type === "vision";

            if (modalType === "create") {
                switch (activeTab) {
                    case "missions":
                        response = isVision
                            ? await adminService.visions.create(formDataToSend)
                            : await adminService.missions.create(
                                  formDataToSend
                              );
                        break;
                    case "core-values":
                        response = await adminService.coreValues.create(
                            formDataToSend
                        );
                        break;
                    case "principles":
                        response = await adminService.principles.create(
                            formDataToSend
                        );
                        break;
                    case "goals":
                        response = await adminService.goals.create(
                            formDataToSend
                        );
                        break;
                }
            } else {
                switch (activeTab) {
                    case "missions":
                        response = isVision
                            ? await adminService.visions.update(
                                  editingItem.id,
                                  formDataToSend
                              )
                            : await adminService.missions.update(
                                  editingItem.id,
                                  formDataToSend
                              );
                        break;
                    case "core-values":
                        response = await adminService.coreValues.update(
                            editingItem.id,
                            formDataToSend
                        );
                        break;
                    case "principles":
                        response = await adminService.principles.update(
                            editingItem.id,
                            formDataToSend
                        );
                        break;
                    case "goals":
                        response = await adminService.goals.update(
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
                showToast(response.message || "Operation failed", "error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            showToast("Failed to save changes", "error");
        }
    };

    // Handle delete
    const handleDelete = async (id, type = null) => {
        if (!window.confirm("Are you sure you want to delete this item?"))
            return;

        try {
            let response;
            switch (activeTab) {
                case "missions":
                    // Determine if it's a mission or vision
                    const item = getCurrentData().find(
                        (item) => item.id === id
                    );
                    const itemType = type || item?.type;
                    response =
                        itemType === "vision"
                            ? await adminService.visions.delete(id)
                            : await adminService.missions.delete(id);
                    break;
                case "core-values":
                    response = await adminService.coreValues.delete(id);
                    break;
                case "principles":
                    response = await adminService.principles.delete(id);
                    break;
                case "goals":
                    response = await adminService.goals.delete(id);
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
    const handleToggleActive = async (id, type = null) => {
        try {
            let response;
            switch (activeTab) {
                case "missions":
                    // Determine if it's a mission or vision
                    const item = getCurrentData().find(
                        (item) => item.id === id
                    );
                    const itemType = type || item?.type;
                    response =
                        itemType === "vision"
                            ? await adminService.visions.toggleActive(id)
                            : await adminService.missions.toggleActive(id);
                    break;
                case "core-values":
                    response = await adminService.coreValues.toggleActive(id);
                    break;
                case "principles":
                    response = await adminService.principles.toggleActive(id);
                    break;
                case "goals":
                    response = await adminService.goals.toggleActive(id);
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
            case "missions":
                // Combine missions and visions with type indicators and unique keys
                const missionsWithType = missions.map((mission) => ({
                    ...mission,
                    type: "mission",
                    uniqueKey: `mission-${mission.id}`,
                }));
                const visionsWithType = visions.map((vision) => ({
                    ...vision,
                    type: "vision",
                    uniqueKey: `vision-${vision.id}`,
                }));
                return [...missionsWithType, ...visionsWithType];
            case "core-values":
                return coreValues;
            case "principles":
                return principles;
            case "goals":
                return goals;
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
                item.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );
    };

    // Render item based on type
    const renderItem = (item, index) => {
        const isActive = item.is_active;

        return (
            <div
                key={item.uniqueKey || item.id}
                className={`bg-white rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-md ${
                    isActive ? "border-green-200" : "border-gray-200"
                }`}
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        {activeTab === "core-values" && item.icon && (
                            <div
                                className={`w-12 h-12 bg-gradient-to-r ${
                                    item.color || "from-blue-500 to-green-500"
                                } rounded-full flex items-center justify-center`}
                            >
                                {React.createElement(
                                    iconOptions.find(
                                        (opt) => opt.value === item.icon
                                    )?.icon || Heart,
                                    { className: "w-6 h-6 text-white" }
                                )}
                            </div>
                        )}
                        {activeTab === "principles" && item.icon && (
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                {React.createElement(
                                    iconOptions.find(
                                        (opt) => opt.value === item.icon
                                    )?.icon || BookOpen,
                                    { className: "w-6 h-6 text-white" }
                                )}
                            </div>
                        )}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {item.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                                {item.type && (
                                    <span
                                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                            item.type === "vision"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-blue-100 text-blue-800"
                                        }`}
                                    >
                                        {item.type === "vision"
                                            ? "Vision"
                                            : "Mission"}
                                    </span>
                                )}
                                {item.category && (
                                    <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                        {categoryOptions.find(
                                            (cat) => cat.value === item.category
                                        )?.label || item.category}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() =>
                                handleToggleActive(item.id, item.type)
                            }
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
                                                handleDelete(
                                                    item.id,
                                                    item.type
                                                );
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title{" "}
                                {activeTab !== "goals" && (
                                    <span className="text-red-500">*</span>
                                )}
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
                                required={activeTab !== "goals"}
                            />
                        </div>

                        {activeTab === "missions" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            type: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="mission">Mission</option>
                                    <option value="vision">Vision</option>
                                </select>
                            </div>
                        )}

                        {activeTab !== "missions" && (
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
                        )}
                    </div>

                    {activeTab === "missions" && (
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
                    )}

                    {(activeTab === "missions" || activeTab === "visions") && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content <span className="text-red-500">*</span>
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
                                required
                            />
                        </div>
                    )}

                    {(activeTab === "core-values" ||
                        activeTab === "principles" ||
                        activeTab === "goals") && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description{" "}
                                <span className="text-red-500">*</span>
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    )}

                    {(activeTab === "core-values" ||
                        activeTab === "principles") && (
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

                            {activeTab === "core-values" && (
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
                            )}
                        </div>
                    )}

                    {activeTab === "goals" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select a category</option>
                                {categoryOptions.map((option) => (
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

                    {(activeTab === "missions" || activeTab === "visions") && (
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

export default MissionVisionManagement;
