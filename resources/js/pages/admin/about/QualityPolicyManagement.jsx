import React, { useState, useEffect } from "react";
import {
    Award,
    Plus,
    Edit,
    Trash,
    Eye as EyeIcon,
    EyeOff,
    CheckCircle,
    XCircle,
    AlertCircle,
    Save,
    X,
} from "lucide-react";
import { qualityPolicyService } from "../../../services/qualityPolicyService";

const QualityPolicyManagement = () => {
    // State management
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("create");
    const [editingPolicy, setEditingPolicy] = useState(null);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    // Form state
    const [formData, setFormData] = useState({
        title: "QUALITY POLICY",
        intro_statement: "",
        concluding_statement: "",
        key_points: ["", "", "", "", "", ""],
        is_active: true,
    });

    // Fetch data
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await qualityPolicyService.getAll();
            setPolicies(response.data || []);
        } catch (error) {
            console.error("Error fetching quality policies:", error);
            showToast("Failed to fetch data", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
            title: "QUALITY POLICY",
            intro_statement: "",
            concluding_statement: "",
            key_points: ["", "", "", "", "", ""],
            is_active: true,
        });
        setEditingPolicy(null);
    };

    // Open modal
    const openModal = (type, policy = null) => {
        setModalType(type);
        if (policy) {
            setEditingPolicy(policy);
            setFormData({
                title: policy.title || "QUALITY POLICY",
                intro_statement: policy.intro_statement || "",
                concluding_statement: policy.concluding_statement || "",
                key_points: policy.key_points || ["", "", "", "", "", ""],
                is_active: policy.is_active,
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (modalType === "create") {
                response = await qualityPolicyService.create(formData);
            } else {
                response = await qualityPolicyService.update(
                    editingPolicy.id,
                    formData
                );
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
    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this quality policy?"
            )
        )
            return;

        try {
            const response = await qualityPolicyService.delete(id);
            if (response.success) {
                showToast(response.message, "success");
                fetchData();
            } else {
                showToast(response.message || "Delete failed", "error");
            }
        } catch (error) {
            console.error("Error deleting policy:", error);
            showToast("Failed to delete policy", "error");
        }
    };

    // Handle toggle active
    const handleToggleActive = async (id) => {
        try {
            const response = await qualityPolicyService.toggleActive(id);
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

    // Handle key point change
    const handleKeyPointChange = (index, value) => {
        const newKeyPoints = [...formData.key_points];
        newKeyPoints[index] = value;
        setFormData({ ...formData, key_points: newKeyPoints });
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                    Quality Policy Management
                    </h2>
                    <p className="text-gray-600">
                        Manage the school's quality policy content
                    </p>
                </div>
                <button
                    onClick={() => openModal("create")}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New Policy</span>
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
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {policies.map((policy) => (
                            <div
                                key={policy.id}
                                className={`bg-white rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-md ${
                                    policy.is_active
                                        ? "border-green-200"
                                        : "border-gray-200"
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {policy.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {policy.intro_statement.substring(
                                                0,
                                                100
                                            )}
                                            ...
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() =>
                                                handleToggleActive(policy.id)
                                            }
                                            className={`p-2 rounded-full transition-colors ${
                                                policy.is_active
                                                    ? "text-green-600 hover:bg-green-100"
                                                    : "text-gray-400 hover:bg-gray-100"
                                            }`}
                                        >
                                            {policy.is_active ? (
                                                <CheckCircle className="w-5 h-5" />
                                            ) : (
                                                <XCircle className="w-5 h-5" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() =>
                                                openModal("edit", policy)
                                            }
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(policy.id)
                                            }
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <Trash className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                                    <span>
                                        {
                                            policy.key_points.filter((point) =>
                                                point.trim()
                                            ).length
                                        }{" "}
                                        key points
                                    </span>
                                    <span
                                        className={`px-2 py-1 rounded-full ${
                                            policy.is_active
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                        {policy.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">
                                {modalType === "create" ? "Add New" : "Edit"}{" "}
                                Quality Policy
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6 p-6">
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
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Introduction Statement
                                </label>
                                <textarea
                                    value={formData.intro_statement}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            intro_statement: e.target.value,
                                        })
                                    }
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="The Department of Education is committed to provide learners with quality basic education that is accessible, inclusive, and liberating through:"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Key Points (6 points)
                                </label>
                                <div className="space-y-3">
                                    {formData.key_points.map((point, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-3"
                                        >
                                            <span className="text-sm font-medium text-gray-500 w-8">
                                                {index + 1}.
                                            </span>
                                            <input
                                                type="text"
                                                value={point}
                                                onChange={(e) =>
                                                    handleKeyPointChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder={`Key point ${
                                                    index + 1
                                                }`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Concluding Statement
                                </label>
                                <textarea
                                    value={formData.concluding_statement}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            concluding_statement:
                                                e.target.value,
                                        })
                                    }
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="The Department upholds the highest standards of conduct and performance..."
                                    required
                                />
                            </div>

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
                                    {modalType === "create"
                                        ? "Create"
                                        : "Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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

export default QualityPolicyManagement;
