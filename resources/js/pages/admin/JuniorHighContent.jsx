import React, { useState, useEffect } from "react";
import {
    Save,
    Plus,
    Trash2,
    AlertCircle,
    CheckCircle,
    Loader2,
    BookOpen,
    Users,
    FileText,
    Calendar,
} from "lucide-react";
import { academicProgramService } from "../../services/academicProgramService";

const JuniorHighContent = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [activeTab, setActiveTab] = useState("header");

    const [contentData, setContentData] = useState({
        header: {
            title: "WHY CHOOSE TAFT NHS JUNIOR HIGH SCHOOL?",
            program_name: "Junior High School Program",
            description:
                "Taft NHS Junior High School offers a comprehensive academic program that covers the four years of Junior High School (Grades 7-10). The curriculum features the interaction of nine subject areas designed to meet the goals of integrative and transformative education.",
        },
        benefits: {
            section_title: "PROGRAM BENEFITS",
            items: [
                {
                    id: 1,
                    title: "Excel in Core Subjects",
                    description:
                        "Master essential subjects including Mathematics, English, Filipino, Science, and Social Studies to build a strong foundation for Senior High School.",
                    icon: "📚",
                    color: "blue",
                },
                {
                    id: 2,
                    title: "Develop Life Skills",
                    description:
                        "Participate in MAPEH, TLE, and Values Education programs that promote physical health, creativity, technical skills, and moral development.",
                    icon: "👤",
                    color: "green",
                },
            ],
        },
        features: {
            section_title: "Why Choose Our Junior High School?",
            items: [
                {
                    id: 1,
                    text: "Comprehensive curriculum aligned with DepEd standards",
                    color: "green",
                },
                {
                    id: 2,
                    text: "Well-rounded education covering all subject areas",
                    color: "green",
                },
                {
                    id: 3,
                    text: "Holistic student development programs",
                    color: "green",
                },
                {
                    id: 4,
                    text: "Experienced and dedicated teaching staff",
                    color: "green",
                },
                {
                    id: 5,
                    text: "Modern facilities and learning resources",
                    color: "blue",
                },
                {
                    id: 6,
                    text: "Strong foundation for Senior High School",
                    color: "blue",
                },
                {
                    id: 7,
                    text: "Character formation and values education",
                    color: "blue",
                },
                {
                    id: 8,
                    text: "Safe and nurturing learning environment",
                    color: "blue",
                },
            ],
        },
        requirements: {
            section_title: "Admission Requirements",
            documents: [
                { id: 1, text: "Report Card (Form 138)" },
                { id: 2, text: "Birth Certificate (PSA)" },
                { id: 3, text: "Certificate of Good Moral Character" },
                { id: 4, text: "2x2 ID Photos (3 copies)" },
            ],
            schedule: [
                { id: 1, text: "April - May: Early Enrollment" },
                { id: 2, text: "June: Regular Enrollment" },
                { id: 3, text: "Monday - Friday: 8:00 AM - 4:00 PM" },
                { id: 4, text: "School Registrar Office" },
            ],
        },
    });

    const tabs = [
        {
            id: "header",
            label: "Header & Description",
            icon: <FileText className="h-4 w-4" />,
        },
        {
            id: "benefits",
            label: "Program Benefits",
            icon: <BookOpen className="h-4 w-4" />,
        },
        {
            id: "features",
            label: "Why Choose Features",
            icon: <Users className="h-4 w-4" />,
        },
        {
            id: "requirements",
            label: "Admission Requirements",
            icon: <Calendar className="h-4 w-4" />,
        },
    ];

    useEffect(() => {
        fetchJuniorHighContent();
    }, []);

    const fetchJuniorHighContent = async () => {
        try {
            setLoading(true);
            const response = await academicProgramService.getJuniorHigh();

            if (response.success && response.data) {
                // Map API data to our content structure
                const apiData = response.data;
                setContentData({
                    header: {
                        title:
                            apiData.page_content?.header_title ||
                            contentData.header.title,
                        program_name:
                            apiData.program_name ||
                            contentData.header.program_name,
                        description:
                            apiData.page_content?.main_description ||
                            apiData.description ||
                            contentData.header.description,
                    },
                    benefits: {
                        section_title:
                            apiData.page_content?.section_titles?.benefits ||
                            contentData.benefits.section_title,
                        items: (
                            apiData.program_benefits ||
                            contentData.benefits.items
                        ).map((benefit, index) => ({
                            ...benefit,
                            id: benefit.id || Date.now() + index + 2000,
                        })),
                    },
                    features: {
                        section_title:
                            apiData.page_content?.section_titles?.features ||
                            contentData.features.section_title,
                        items: (
                            apiData.why_choose_features ||
                            contentData.features.items
                        ).map((feature, index) => ({
                            ...feature,
                            id: feature.id || Date.now() + index + 3000,
                        })),
                    },
                    requirements: {
                        section_title:
                            apiData.page_content?.section_titles
                                ?.requirements ||
                            contentData.requirements.section_title,
                        documents: (
                            apiData.admission_requirements?.documents ||
                            contentData.requirements.documents
                        ).map((doc, index) => ({
                            ...doc,
                            id: doc.id || Date.now() + index,
                        })),
                        schedule: (
                            apiData.admission_requirements?.schedule ||
                            contentData.requirements.schedule
                        ).map((item, index) => ({
                            ...item,
                            id: item.id || Date.now() + index + 1000,
                        })),
                    },
                });
            }
        } catch (err) {
            console.error("Error fetching Junior High content:", err);
            setError("Failed to load content. Using default values.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            // Convert our content structure to API format
            const apiData = {
                program_type: "junior_high",
                program_name: contentData.header.program_name,
                description: contentData.header.description,
                page_content: {
                    header_title: contentData.header.title,
                    main_description: contentData.header.description,
                    section_titles: {
                        benefits: contentData.benefits.section_title,
                        features: contentData.features.section_title,
                        requirements: contentData.requirements.section_title,
                    },
                },
                program_benefits: contentData.benefits.items,
                why_choose_features: contentData.features.items,
                admission_requirements: {
                    documents: contentData.requirements.documents,
                    schedule: contentData.requirements.schedule,
                },
                is_active: true,
            };

            const response = await academicProgramService.updateJuniorHigh(
                apiData
            );

            if (response.success) {
                setSuccess("Junior High content updated successfully!");
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError(response.error || "Failed to update content");
            }
        } catch (err) {
            console.error("Error saving Junior High content:", err);
            setError("Failed to save content. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    // Helper functions for managing dynamic content
    const addBenefit = () => {
        const newBenefit = {
            id: Date.now() + Math.random(),
            title: "",
            description: "",
            icon: "📚",
            color: "blue",
        };
        setContentData({
            ...contentData,
            benefits: {
                ...contentData.benefits,
                items: [...contentData.benefits.items, newBenefit],
            },
        });
    };

    const removeBenefit = (id) => {
        setContentData({
            ...contentData,
            benefits: {
                ...contentData.benefits,
                items: contentData.benefits.items.filter(
                    (item) => item.id !== id
                ),
            },
        });
    };

    const updateBenefit = (id, field, value) => {
        setContentData({
            ...contentData,
            benefits: {
                ...contentData.benefits,
                items: contentData.benefits.items.map((item) =>
                    item.id === id ? { ...item, [field]: value } : item
                ),
            },
        });
    };

    const addFeature = () => {
        const newFeature = {
            id: Date.now() + Math.random(),
            text: "",
            color: "green",
        };
        setContentData({
            ...contentData,
            features: {
                ...contentData.features,
                items: [...contentData.features.items, newFeature],
            },
        });
    };

    const removeFeature = (id) => {
        setContentData({
            ...contentData,
            features: {
                ...contentData.features,
                items: contentData.features.items.filter(
                    (item) => item.id !== id
                ),
            },
        });
    };

    const updateFeature = (id, field, value) => {
        setContentData({
            ...contentData,
            features: {
                ...contentData.features,
                items: contentData.features.items.map((item) =>
                    item.id === id ? { ...item, [field]: value } : item
                ),
            },
        });
    };

    const addDocument = () => {
        const newDoc = {
            id: Date.now() + Math.random(),
            text: "",
        };
        setContentData({
            ...contentData,
            requirements: {
                ...contentData.requirements,
                documents: [...contentData.requirements.documents, newDoc],
            },
        });
    };

    const removeDocument = (id) => {
        setContentData({
            ...contentData,
            requirements: {
                ...contentData.requirements,
                documents: contentData.requirements.documents.filter(
                    (item) => item.id !== id
                ),
            },
        });
    };

    const updateDocument = (id, value) => {
        setContentData({
            ...contentData,
            requirements: {
                ...contentData.requirements,
                documents: contentData.requirements.documents.map((item) =>
                    item.id === id ? { ...item, text: value } : item
                ),
            },
        });
    };

    const addScheduleItem = () => {
        const newItem = {
            id: Date.now() + Math.random(),
            text: "",
        };
        setContentData({
            ...contentData,
            requirements: {
                ...contentData.requirements,
                schedule: [...contentData.requirements.schedule, newItem],
            },
        });
    };

    const removeScheduleItem = (id) => {
        setContentData({
            ...contentData,
            requirements: {
                ...contentData.requirements,
                schedule: contentData.requirements.schedule.filter(
                    (item) => item.id !== id
                ),
            },
        });
    };

    const updateScheduleItem = (id, value) => {
        setContentData({
            ...contentData,
            requirements: {
                ...contentData.requirements,
                schedule: contentData.requirements.schedule.map((item) =>
                    item.id === id ? { ...item, text: value } : item
                ),
            },
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">
                    Loading Junior High content...
                </span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Compact Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg px-6 py-4 text-white shadow-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 className="text-xl font-bold">
                            Junior High Content Management
                        </h1>
                        <p className="text-blue-100 text-sm">
                            Manage Junior High School page content
                        </p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
                    >
                        {saving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* Status Messages */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{success}</span>
                </div>
            )}

            {/* Main Content Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Centered Tab Navigation */}
                <div className="border-b border-gray-200 bg-gray-50">
                    <div className="flex justify-center">
                        <nav className="flex space-x-1 p-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? "bg-blue-600 text-white shadow-sm"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-white"
                                    }`}
                                >
                                    {tab.icon}
                                    <span className="hidden sm:inline">
                                        {tab.label}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {/* Header & Description Tab */}
                    {activeTab === "header" && (
                        <div className="max-w-4xl mx-auto min-h-[500px] flex flex-col justify-start space-y-8">
                            {/* Page Header Section */}
                            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
                                    📝 Page Header Settings
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Page Header Title
                                        </label>
                                        <input
                                            type="text"
                                            value={contentData.header.title}
                                            onChange={(e) =>
                                                setContentData({
                                                    ...contentData,
                                                    header: {
                                                        ...contentData.header,
                                                        title: e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., WHY CHOOSE TAFT NHS JUNIOR HIGH SCHOOL?"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            This appears as the main banner
                                            title on the Junior High page
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Program Name
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                contentData.header.program_name
                                            }
                                            onChange={(e) =>
                                                setContentData({
                                                    ...contentData,
                                                    header: {
                                                        ...contentData.header,
                                                        program_name:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., Junior High School Program"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            The official name of the program
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Program Description Section */}
                            <div className="bg-green-50 p-6 rounded-lg border border-green-200 flex-1">
                                <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                                    📄 Program Description
                                </h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Main Program Description
                                    </label>
                                    <textarea
                                        value={contentData.header.description}
                                        onChange={(e) =>
                                            setContentData({
                                                ...contentData,
                                                header: {
                                                    ...contentData.header,
                                                    description: e.target.value,
                                                },
                                            })
                                        }
                                        rows={8}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        placeholder="Enter the main program description that will appear on the Junior High page..."
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        This description appears in multiple
                                        places on the Junior High page. Make it
                                        comprehensive and engaging.
                                    </p>
                                </div>
                            </div>

                            {/* Preview Section */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                    👁️ Preview
                                </h3>
                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="text-lg font-bold text-blue-600 mb-2">
                                        {contentData.header.title ||
                                            "Page Header Title"}
                                    </h4>
                                    <h5 className="text-md font-semibold text-gray-800 mb-3">
                                        {contentData.header.program_name ||
                                            "Program Name"}
                                    </h5>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {contentData.header.description ||
                                            "Program description will appear here..."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Program Benefits Tab */}
                    {activeTab === "benefits" && (
                        <div className="max-w-5xl mx-auto space-y-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    value={contentData.benefits.section_title}
                                    onChange={(e) =>
                                        setContentData({
                                            ...contentData,
                                            benefits: {
                                                ...contentData.benefits,
                                                section_title: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., PROGRAM BENEFITS"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <span className="text-blue-600">⭐</span>
                                    Program Benefits
                                </h3>
                                <button
                                    onClick={addBenefit}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Benefit
                                </button>
                            </div>

                            <div className="space-y-4">
                                {contentData.benefits.items.map((benefit) => (
                                    <div
                                        key={benefit.id}
                                        className="bg-gray-50 p-4 rounded-lg"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <input
                                                    type="text"
                                                    value={benefit.title}
                                                    onChange={(e) =>
                                                        updateBenefit(
                                                            benefit.id,
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Benefit title"
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                />
                                                <select
                                                    value={benefit.icon}
                                                    onChange={(e) =>
                                                        updateBenefit(
                                                            benefit.id,
                                                            "icon",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="📚">
                                                        📚 Books
                                                    </option>
                                                    <option value="👤">
                                                        👤 Person
                                                    </option>
                                                    <option value="🎯">
                                                        🎯 Target
                                                    </option>
                                                    <option value="⭐">
                                                        ⭐ Star
                                                    </option>
                                                    <option value="🏆">
                                                        🏆 Trophy
                                                    </option>
                                                    <option value="💡">
                                                        💡 Idea
                                                    </option>
                                                </select>
                                                <select
                                                    value={benefit.color}
                                                    onChange={(e) =>
                                                        updateBenefit(
                                                            benefit.id,
                                                            "color",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="blue">
                                                        Blue
                                                    </option>
                                                    <option value="green">
                                                        Green
                                                    </option>
                                                    <option value="purple">
                                                        Purple
                                                    </option>
                                                    <option value="red">
                                                        Red
                                                    </option>
                                                    <option value="yellow">
                                                        Yellow
                                                    </option>
                                                </select>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeBenefit(benefit.id)
                                                }
                                                className="ml-2 text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <textarea
                                            value={benefit.description}
                                            onChange={(e) =>
                                                updateBenefit(
                                                    benefit.id,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Benefit description"
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Why Choose Features Tab */}
                    {activeTab === "features" && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    value={contentData.features.section_title}
                                    onChange={(e) =>
                                        setContentData({
                                            ...contentData,
                                            features: {
                                                ...contentData.features,
                                                section_title: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Features
                                </h3>
                                <button
                                    onClick={addFeature}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Feature
                                </button>
                            </div>

                            <div className="space-y-3">
                                {contentData.features.items.map((feature) => (
                                    <div
                                        key={feature.id}
                                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                    >
                                        <input
                                            type="text"
                                            value={feature.text}
                                            onChange={(e) =>
                                                updateFeature(
                                                    feature.id,
                                                    "text",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Feature text"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        <select
                                            value={feature.color}
                                            onChange={(e) =>
                                                updateFeature(
                                                    feature.id,
                                                    "color",
                                                    e.target.value
                                                )
                                            }
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="green">Green</option>
                                            <option value="blue">Blue</option>
                                            <option value="purple">
                                                Purple
                                            </option>
                                        </select>
                                        <button
                                            onClick={() =>
                                                removeFeature(feature.id)
                                            }
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Admission Requirements Tab */}
                    {activeTab === "requirements" && (
                        <div className="max-w-5xl mx-auto space-y-6">
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    value={
                                        contentData.requirements.section_title
                                    }
                                    onChange={(e) =>
                                        setContentData({
                                            ...contentData,
                                            requirements: {
                                                ...contentData.requirements,
                                                section_title: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Admission Requirements"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Required Documents */}
                                <div className="bg-white border border-purple-200 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
                                            📄 Required Documents
                                        </h3>
                                        <button
                                            onClick={addDocument}
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add Document
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {contentData.requirements.documents.map(
                                            (doc) => (
                                                <div
                                                    key={doc.id}
                                                    className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg"
                                                >
                                                    <span className="text-purple-600 font-bold">
                                                        •
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={doc.text}
                                                        onChange={(e) =>
                                                            updateDocument(
                                                                doc.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Document requirement"
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            removeDocument(
                                                                doc.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-800 p-1"
                                                        title="Remove document"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Enrollment Schedule */}
                                <div className="bg-white border border-pink-200 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2">
                                            📅 Enrollment Schedule
                                        </h3>
                                        <button
                                            onClick={addScheduleItem}
                                            className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add Schedule
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {contentData.requirements.schedule.map(
                                            (item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg"
                                                >
                                                    <span className="text-pink-600 font-bold">
                                                        •
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={item.text}
                                                        onChange={(e) =>
                                                            updateScheduleItem(
                                                                item.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Schedule item"
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            removeScheduleItem(
                                                                item.id
                                                            )
                                                        }
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JuniorHighContent;
