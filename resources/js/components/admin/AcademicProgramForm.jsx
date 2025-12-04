import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const AcademicProgramForm = ({
    formData,
    setFormData,
    onSubmit,
    onCancel,
    editingProgram,
}) => {
    const [activeTab, setActiveTab] = useState("basic");

    const tabs = [
        { id: "basic", label: "Basic Info", icon: "📝" },
        { id: "content", label: "Page Content", icon: "📄" },
        { id: "benefits", label: "Benefits", icon: "⭐" },
        { id: "features", label: "Features", icon: "✨" },
        { id: "requirements", label: "Requirements", icon: "📋" },
        { id: "media", label: "Images & SEO", icon: "🖼️" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            {editingProgram
                                ? "Edit Program"
                                : "Add New Program"}
                        </h2>
                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="flex space-x-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab.id
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info Tab */}
                        {activeTab === "basic" && (
                            <BasicInfoTab
                                formData={formData}
                                setFormData={setFormData}
                            />
                        )}

                        {/* Page Content Tab */}
                        {activeTab === "content" && (
                            <PageContentTab
                                formData={formData}
                                setFormData={setFormData}
                            />
                        )}

                        {/* Benefits Tab */}
                        {activeTab === "benefits" && (
                            <BenefitsTab
                                formData={formData}
                                setFormData={setFormData}
                            />
                        )}

                        {/* Features Tab */}
                        {activeTab === "features" && (
                            <FeaturesTab
                                formData={formData}
                                setFormData={setFormData}
                            />
                        )}

                        {/* Requirements Tab */}
                        {activeTab === "requirements" && (
                            <RequirementsTab
                                formData={formData}
                                setFormData={setFormData}
                            />
                        )}

                        {/* Media & SEO Tab */}
                        {activeTab === "media" && (
                            <MediaTab
                                formData={formData}
                                setFormData={setFormData}
                            />
                        )}

                        {/* Form Buttons */}
                        <div className="flex justify-end gap-3 pt-6 border-t">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                {editingProgram ? "Update" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Basic Info Tab Component
const BasicInfoTab = ({ formData, setFormData }) => {
    const [newSubject, setNewSubject] = useState("");

    const addSubject = () => {
        if (newSubject.trim()) {
            setFormData({
                ...formData,
                subjects: [...(formData.subjects || []), newSubject.trim()],
            });
            setNewSubject("");
        }
    };

    const removeSubject = (index) => {
        setFormData({
            ...formData,
            subjects: (formData.subjects || []).filter((_, i) => i !== index),
        });
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Program Type
                    </label>
                    <select
                        value={formData.program_type}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                program_type: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="junior_high">Junior High School</option>
                        <option value="senior_high">Senior High School</option>
                        <option value="special">Special Program</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Grade Level
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="12"
                        value={formData.grade_level}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                grade_level: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program Name
                </label>
                <input
                    type="text"
                    value={formData.program_name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            program_name: e.target.value,
                        })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                />
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subjects
                </label>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder="Add a subject"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addSubject())
                        }
                    />
                    <button
                        type="button"
                        onClick={addSubject}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {(formData.subjects || []).map((subject, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                            {subject}
                            <button
                                type="button"
                                onClick={() => removeSubject(index)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                    </label>
                    <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                duration: e.target.value,
                            })
                        }
                        placeholder="e.g., 4 years"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                                display_order: parseInt(e.target.value) || 0,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
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
                    Active Program
                </label>
            </div>
        </div>
    );
};

// Page Content Tab Component
const PageContentTab = ({ formData, setFormData }) => {
    const updatePageContent = (field, value) => {
        setFormData({
            ...formData,
            page_content: {
                ...formData.page_content,
                [field]: value,
            },
        });
    };

    const updateSectionTitle = (section, value) => {
        setFormData({
            ...formData,
            page_content: {
                ...formData.page_content,
                section_titles: {
                    ...formData.page_content.section_titles,
                    [section]: value,
                },
            },
        });
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Header Title
                </label>
                <input
                    type="text"
                    value={formData.page_content?.header_title || ""}
                    onChange={(e) =>
                        updatePageContent("header_title", e.target.value)
                    }
                    placeholder="e.g., WHY CHOOSE TAFT NHS JUNIOR HIGH SCHOOL?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Description
                </label>
                <textarea
                    value={formData.page_content?.main_description || ""}
                    onChange={(e) =>
                        updatePageContent("main_description", e.target.value)
                    }
                    rows={4}
                    placeholder="Main program description for the page"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Benefits Section Title
                    </label>
                    <input
                        type="text"
                        value={
                            formData.page_content?.section_titles?.benefits ||
                            ""
                        }
                        onChange={(e) =>
                            updateSectionTitle("benefits", e.target.value)
                        }
                        placeholder="PROGRAM BENEFITS"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Features Section Title
                    </label>
                    <input
                        type="text"
                        value={
                            formData.page_content?.section_titles?.features ||
                            ""
                        }
                        onChange={(e) =>
                            updateSectionTitle("features", e.target.value)
                        }
                        placeholder="Why Choose This Program?"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Requirements Section Title
                    </label>
                    <input
                        type="text"
                        value={
                            formData.page_content?.section_titles
                                ?.requirements || ""
                        }
                        onChange={(e) =>
                            updateSectionTitle("requirements", e.target.value)
                        }
                        placeholder="Admission Requirements"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};

// Benefits Tab Component
const BenefitsTab = ({ formData, setFormData }) => {
    const [newBenefit, setNewBenefit] = useState({
        title: "",
        description: "",
        icon: "📚",
        color: "blue",
    });

    const addBenefit = () => {
        if (newBenefit.title.trim() && newBenefit.description.trim()) {
            const benefits = formData.program_benefits || [];
            setFormData({
                ...formData,
                program_benefits: [
                    ...benefits,
                    {
                        ...newBenefit,
                        id: Date.now(),
                    },
                ],
            });
            setNewBenefit({
                title: "",
                description: "",
                icon: "📚",
                color: "blue",
            });
        }
    };

    const removeBenefit = (index) => {
        const benefits = formData.program_benefits || [];
        setFormData({
            ...formData,
            program_benefits: benefits.filter((_, i) => i !== index),
        });
    };

    const updateBenefit = (index, field, value) => {
        const benefits = [...(formData.program_benefits || [])];
        benefits[index] = { ...benefits[index], [field]: value };
        setFormData({
            ...formData,
            program_benefits: benefits,
        });
    };

    return (
        <div className="space-y-6">
            {/* Add New Benefit */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">
                    Add New Benefit
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={newBenefit.title}
                            onChange={(e) =>
                                setNewBenefit({
                                    ...newBenefit,
                                    title: e.target.value,
                                })
                            }
                            placeholder="e.g., Excel in Core Subjects"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Icon
                            </label>
                            <select
                                value={newBenefit.icon}
                                onChange={(e) =>
                                    setNewBenefit({
                                        ...newBenefit,
                                        icon: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="📚">📚 Books</option>
                                <option value="👤">👤 Person</option>
                                <option value="🎯">🎯 Target</option>
                                <option value="⭐">⭐ Star</option>
                                <option value="🏆">🏆 Trophy</option>
                                <option value="💡">💡 Idea</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Color
                            </label>
                            <select
                                value={newBenefit.color}
                                onChange={(e) =>
                                    setNewBenefit({
                                        ...newBenefit,
                                        color: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="purple">Purple</option>
                                <option value="red">Red</option>
                                <option value="yellow">Yellow</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={newBenefit.description}
                        onChange={(e) =>
                            setNewBenefit({
                                ...newBenefit,
                                description: e.target.value,
                            })
                        }
                        rows={2}
                        placeholder="Detailed description of this benefit"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="button"
                    onClick={addBenefit}
                    className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Benefit
                </button>
            </div>

            {/* Existing Benefits */}
            <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Current Benefits</h4>
                {(formData.program_benefits || []).map((benefit, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{benefit.icon}</span>
                                <input
                                    type="text"
                                    value={benefit.title}
                                    onChange={(e) =>
                                        updateBenefit(
                                            index,
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className="font-medium text-gray-900 bg-transparent border-none focus:ring-0 p-0"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeBenefit(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                        <textarea
                            value={benefit.description}
                            onChange={(e) =>
                                updateBenefit(
                                    index,
                                    "description",
                                    e.target.value
                                )
                            }
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Features Tab Component
const FeaturesTab = ({ formData, setFormData }) => {
    const [newFeature, setNewFeature] = useState({ text: "", color: "green" });

    const addFeature = () => {
        if (newFeature.text.trim()) {
            const features = formData.why_choose_features || [];
            setFormData({
                ...formData,
                why_choose_features: [
                    ...features,
                    {
                        ...newFeature,
                        id: Date.now(),
                    },
                ],
            });
            setNewFeature({ text: "", color: "green" });
        }
    };

    const removeFeature = (index) => {
        const features = formData.why_choose_features || [];
        setFormData({
            ...formData,
            why_choose_features: features.filter((_, i) => i !== index),
        });
    };

    return (
        <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">
                    Add New Feature
                </h4>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={newFeature.text}
                        onChange={(e) =>
                            setNewFeature({
                                ...newFeature,
                                text: e.target.value,
                            })
                        }
                        placeholder="e.g., Experienced and dedicated teaching staff"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={newFeature.color}
                        onChange={(e) =>
                            setNewFeature({
                                ...newFeature,
                                color: e.target.value,
                            })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="purple">Purple</option>
                    </select>
                    <button
                        type="button"
                        onClick={addFeature}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Current Features</h4>
                {(formData.why_choose_features || []).map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
                    >
                        <span
                            className={`text-${feature.color}-500 text-xl font-bold`}
                        >
                            ✓
                        </span>
                        <input
                            type="text"
                            value={feature.text}
                            onChange={(e) => {
                                const features = [
                                    ...(formData.why_choose_features || []),
                                ];
                                features[index] = {
                                    ...features[index],
                                    text: e.target.value,
                                };
                                setFormData({
                                    ...formData,
                                    why_choose_features: features,
                                });
                            }}
                            className="flex-1 bg-transparent border-none focus:ring-0 p-0"
                        />
                        <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-600 hover:text-red-800"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Requirements Tab Component
const RequirementsTab = ({ formData, setFormData }) => {
    const [newDocument, setNewDocument] = useState("");
    const [newScheduleItem, setNewScheduleItem] = useState("");

    const addDocument = () => {
        if (newDocument.trim()) {
            const requirements = formData.admission_requirements || {
                documents: [],
                schedule: [],
            };
            setFormData({
                ...formData,
                admission_requirements: {
                    ...requirements,
                    documents: [
                        ...requirements.documents,
                        { text: newDocument.trim() },
                    ],
                },
            });
            setNewDocument("");
        }
    };

    const addScheduleItem = () => {
        if (newScheduleItem.trim()) {
            const requirements = formData.admission_requirements || {
                documents: [],
                schedule: [],
            };
            setFormData({
                ...formData,
                admission_requirements: {
                    ...requirements,
                    schedule: [
                        ...requirements.schedule,
                        { text: newScheduleItem.trim() },
                    ],
                },
            });
            setNewScheduleItem("");
        }
    };

    const removeDocument = (index) => {
        const requirements = formData.admission_requirements || {
            documents: [],
            schedule: [],
        };
        setFormData({
            ...formData,
            admission_requirements: {
                ...requirements,
                documents: requirements.documents.filter((_, i) => i !== index),
            },
        });
    };

    const removeScheduleItem = (index) => {
        const requirements = formData.admission_requirements || {
            documents: [],
            schedule: [],
        };
        setFormData({
            ...formData,
            admission_requirements: {
                ...requirements,
                schedule: requirements.schedule.filter((_, i) => i !== index),
            },
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Required Documents */}
            <div>
                <h4 className="font-medium text-gray-900 mb-3">
                    📄 Required Documents
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newDocument}
                            onChange={(e) => setNewDocument(e.target.value)}
                            placeholder="e.g., Birth Certificate (PSA)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            onKeyPress={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), addDocument())
                            }
                        />
                        <button
                            type="button"
                            onClick={addDocument}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    {(formData.admission_requirements?.documents || []).map(
                        (doc, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
                            >
                                <span className="text-purple-500 text-lg font-bold">
                                    •
                                </span>
                                <input
                                    type="text"
                                    value={doc.text}
                                    onChange={(e) => {
                                        const requirements =
                                            formData.admission_requirements || {
                                                documents: [],
                                                schedule: [],
                                            };
                                        const documents = [
                                            ...requirements.documents,
                                        ];
                                        documents[index] = {
                                            text: e.target.value,
                                        };
                                        setFormData({
                                            ...formData,
                                            admission_requirements: {
                                                ...requirements,
                                                documents,
                                            },
                                        });
                                    }}
                                    className="flex-1 bg-transparent border-none focus:ring-0 p-0"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeDocument(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Enrollment Schedule */}
            <div>
                <h4 className="font-medium text-gray-900 mb-3">
                    📅 Enrollment Schedule
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newScheduleItem}
                            onChange={(e) => setNewScheduleItem(e.target.value)}
                            placeholder="e.g., April - May: Early Enrollment"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            onKeyPress={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), addScheduleItem())
                            }
                        />
                        <button
                            type="button"
                            onClick={addScheduleItem}
                            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    {(formData.admission_requirements?.schedule || []).map(
                        (item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
                            >
                                <span className="text-pink-500 text-lg font-bold">
                                    •
                                </span>
                                <input
                                    type="text"
                                    value={item.text}
                                    onChange={(e) => {
                                        const requirements =
                                            formData.admission_requirements || {
                                                documents: [],
                                                schedule: [],
                                            };
                                        const schedule = [
                                            ...requirements.schedule,
                                        ];
                                        schedule[index] = {
                                            text: e.target.value,
                                        };
                                        setFormData({
                                            ...formData,
                                            admission_requirements: {
                                                ...requirements,
                                                schedule,
                                            },
                                        });
                                    }}
                                    className="flex-1 bg-transparent border-none focus:ring-0 p-0"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeScheduleItem(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

// Media & SEO Tab Component
const MediaTab = ({ formData, setFormData }) => {
    const updateImage = (key, value) => {
        setFormData({
            ...formData,
            images: {
                ...formData.images,
                [key]: value,
            },
        });
    };

    return (
        <div className="space-y-6">
            {/* Images Section */}
            <div>
                <h4 className="font-medium text-gray-900 mb-4">
                    🖼️ Program Images
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Logo Image
                        </label>
                        <input
                            type="text"
                            value={formData.images?.logo || ""}
                            onChange={(e) =>
                                updateImage("logo", e.target.value)
                            }
                            placeholder="/images/JLOGO.jpg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Academic Excellence Image
                        </label>
                        <input
                            type="text"
                            value={formData.images?.academic_excellence || ""}
                            onChange={(e) =>
                                updateImage(
                                    "academic_excellence",
                                    e.target.value
                                )
                            }
                            placeholder="/images/ACAD.jpg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Student Life Image
                        </label>
                        <input
                            type="text"
                            value={formData.images?.student_life || ""}
                            onChange={(e) =>
                                updateImage("student_life", e.target.value)
                            }
                            placeholder="/images/J1.jpg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* SEO Section */}
            <div>
                <h4 className="font-medium text-gray-900 mb-4">
                    🔍 SEO Settings
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Meta Title
                        </label>
                        <input
                            type="text"
                            value={formData.meta_title || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    meta_title: e.target.value,
                                })
                            }
                            placeholder="Junior High School Program - Taft National High School"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Meta Description
                        </label>
                        <textarea
                            value={formData.meta_description || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    meta_description: e.target.value,
                                })
                            }
                            rows={3}
                            placeholder="Comprehensive Junior High School program (Grades 7-10) at Taft NHS..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Display Settings */}
            <div>
                <h4 className="font-medium text-gray-900 mb-4">
                    🎨 Display Settings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Banner Color
                        </label>
                        <select
                            value={formData.banner_color || "blue"}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    banner_color: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="purple">Purple</option>
                            <option value="red">Red</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Theme Color
                        </label>
                        <select
                            value={formData.theme_color || "blue"}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    theme_color: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="purple">Purple</option>
                            <option value="red">Red</option>
                        </select>
                    </div>
                    <div className="flex items-center pt-6">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={formData.featured || false}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    featured: e.target.checked,
                                })
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="featured"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Featured Program
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicProgramForm;
