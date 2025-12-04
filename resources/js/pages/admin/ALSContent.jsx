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

const ALSContent = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [activeTab, setActiveTab] = useState("header");

    // Content data state
    const [contentData, setContentData] = useState({
        header: {
            title: "TAFT NATIONAL HIGH SCHOOL ALS SHS",
            description:
                "The Alternative Learning System (ALS) is a flexible learning program that provides opportunities for out-of-school youth and adults to continue their education through various learning modalities.",
            call_to_action: "Ready to Join Our Alternative Learning System?",
            cta_description:
                "Contact our academic department to learn more about the ALS program, enrollment process, and flexible learning schedules.",
        },
        qualifications: {
            section_title: "QUALIFICATIONS",
            items: [
                {
                    id: 1,
                    title: "Age Requirement",
                    description: "Must be 18 years old",
                    icon: "👤",
                    color: "blue",
                },
                {
                    id: 2,
                    title: "Educational Background",
                    description: "ALS JHS Passer / Grade 10 Completer",
                    icon: "📚",
                    color: "blue",
                },
                {
                    id: 3,
                    title: "Alternative Path",
                    description:
                        "Old Curriculum Graduate (4th Year High School)",
                    icon: "🎓",
                    color: "blue",
                },
            ],
        },
        requirements: {
            section_title: "REQUIREMENTS",
            documents: [
                { id: 1, text: "PSA Birth Certificate" },
                { id: 2, text: "Report Card / A & E Certificate" },
                { id: 3, text: "ALS Enrollment Form" },
            ],
            contact_info: [
                { id: 1, text: "+639505358285", type: "phone" },
                {
                    id: 2,
                    text: "Nueva Ext. Brgy. Taft, Surigao City",
                    type: "address",
                },
            ],
        },
        features: {
            section_title: "PROGRAM FEATURES",
            items: [
                { id: 1, text: "Flexible learning schedule", color: "green" },
                { id: 2, text: "Self-paced learning approach", color: "green" },
                {
                    id: 3,
                    text: "Alternative pathway to education",
                    color: "blue",
                },
                { id: 4, text: "Experienced ALS facilitators", color: "blue" },
            ],
        },
    });

    useEffect(() => {
        fetchALSContent();
    }, []);

    const fetchALSContent = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await academicProgramService.getALS();

            if (response.success && response.data) {
                const data = response.data;

                // Transform API data to component state structure
                setContentData({
                    header: {
                        title:
                            data.page_content?.header_title ||
                            contentData.header.title,
                        description:
                            data.page_content?.main_description ||
                            data.description ||
                            contentData.header.description,
                        call_to_action:
                            data.page_content?.call_to_action ||
                            contentData.header.call_to_action,
                        cta_description:
                            data.page_content?.cta_description ||
                            contentData.header.cta_description,
                    },
                    qualifications: {
                        section_title:
                            data.page_content?.section_titles?.qualifications ||
                            "QUALIFICATIONS",
                        items:
                            data.program_benefits ||
                            contentData.qualifications.items,
                    },
                    requirements: {
                        section_title:
                            data.page_content?.section_titles?.requirements ||
                            "REQUIREMENTS",
                        documents:
                            data.admission_requirements?.documents ||
                            contentData.requirements.documents,
                        contact_info:
                            data.admission_requirements?.contact_info ||
                            contentData.requirements.contact_info,
                    },
                    features: {
                        section_title: "PROGRAM FEATURES",
                        items:
                            data.why_choose_features ||
                            contentData.features.items,
                    },
                });
            }
        } catch (err) {
            console.error("Error fetching ALS content:", err);
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

            // Transform component state to API format
            const updateData = {
                program_name: "Alternative Learning System (ALS)",
                program_type: "special",
                description: contentData.header.description,
                page_content: {
                    header_title: contentData.header.title,
                    main_description: contentData.header.description,
                    section_titles: {
                        qualifications:
                            contentData.qualifications.section_title,
                        requirements: contentData.requirements.section_title,
                        contact: "Contact Information",
                        enrollment: "Enrollment Information",
                    },
                    call_to_action: contentData.header.call_to_action,
                    cta_description: contentData.header.cta_description,
                },
                program_benefits: contentData.qualifications.items,
                admission_requirements: {
                    documents: contentData.requirements.documents,
                    contact_info: contentData.requirements.contact_info,
                },
                why_choose_features: contentData.features.items,
                is_active: true,
            };

            const response = await academicProgramService.updateALS(updateData);

            if (response.success) {
                setSuccess("ALS content updated successfully!");
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError(
                    "Failed to save content: " +
                        (response.error || "Unknown error")
                );
            }
        } catch (err) {
            console.error("Error saving ALS content:", err);
            setError("Failed to save content. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    // Qualification handlers
    const addQualification = () => {
        const newId =
            Math.max(
                ...contentData.qualifications.items.map((q) => q.id || 0)
            ) + 1;
        setContentData((prev) => ({
            ...prev,
            qualifications: {
                ...prev.qualifications,
                items: [
                    ...prev.qualifications.items,
                    {
                        id: newId,
                        title: "",
                        description: "",
                        icon: "📋",
                        color: "blue",
                    },
                ],
            },
        }));
    };

    const updateQualification = (index, field, value) => {
        setContentData((prev) => ({
            ...prev,
            qualifications: {
                ...prev.qualifications,
                items: prev.qualifications.items.map((qual, i) =>
                    i === index ? { ...qual, [field]: value } : qual
                ),
            },
        }));
    };

    const removeQualification = (index) => {
        setContentData((prev) => ({
            ...prev,
            qualifications: {
                ...prev.qualifications,
                items: prev.qualifications.items.filter((_, i) => i !== index),
            },
        }));
    };

    // Document handlers
    const addDocument = () => {
        const newId =
            Math.max(
                ...contentData.requirements.documents.map((d) => d.id || 0)
            ) + 1;
        setContentData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                documents: [
                    ...prev.requirements.documents,
                    { id: newId, text: "" },
                ],
            },
        }));
    };

    const updateDocument = (index, value) => {
        setContentData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                documents: prev.requirements.documents.map((doc, i) =>
                    i === index ? { ...doc, text: value } : doc
                ),
            },
        }));
    };

    const removeDocument = (index) => {
        setContentData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                documents: prev.requirements.documents.filter(
                    (_, i) => i !== index
                ),
            },
        }));
    };

    // Contact info handlers
    const addContactInfo = () => {
        const newId =
            Math.max(
                ...contentData.requirements.contact_info.map((c) => c.id || 0)
            ) + 1;
        setContentData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                contact_info: [
                    ...prev.requirements.contact_info,
                    { id: newId, text: "", type: "phone" },
                ],
            },
        }));
    };

    const updateContactInfo = (index, field, value) => {
        setContentData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                contact_info: prev.requirements.contact_info.map((contact, i) =>
                    i === index ? { ...contact, [field]: value } : contact
                ),
            },
        }));
    };

    const removeContactInfo = (index) => {
        setContentData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                contact_info: prev.requirements.contact_info.filter(
                    (_, i) => i !== index
                ),
            },
        }));
    };

    // Feature handlers
    const addFeature = () => {
        const newId =
            Math.max(...contentData.features.items.map((f) => f.id || 0)) + 1;
        setContentData((prev) => ({
            ...prev,
            features: {
                ...prev.features,
                items: [
                    ...prev.features.items,
                    { id: newId, text: "", color: "green" },
                ],
            },
        }));
    };

    const updateFeature = (index, field, value) => {
        setContentData((prev) => ({
            ...prev,
            features: {
                ...prev.features,
                items: prev.features.items.map((feature, i) =>
                    i === index ? { ...feature, [field]: value } : feature
                ),
            },
        }));
    };

    const removeFeature = (index) => {
        setContentData((prev) => ({
            ...prev,
            features: {
                ...prev.features,
                items: prev.features.items.filter((_, i) => i !== index),
            },
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">
                        Loading ALS content...
                    </span>
                </div>
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
                            ALS Content Management
                        </h1>
                        <p className="text-blue-100 text-sm">
                            Manage Alternative Learning System program content
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
                            {[
                                {
                                    id: "header",
                                    label: "Header & Description",
                                    icon: <FileText className="h-4 w-4" />,
                                },
                                {
                                    id: "qualifications",
                                    label: "Qualifications",
                                    icon: <Users className="h-4 w-4" />,
                                },
                                {
                                    id: "requirements",
                                    label: "Requirements",
                                    icon: <BookOpen className="h-4 w-4" />,
                                },
                                {
                                    id: "features",
                                    label: "Features",
                                    icon: <Calendar className="h-4 w-4" />,
                                },
                            ].map((tab) => (
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
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Program Title
                                </label>
                                <input
                                    type="text"
                                    value={contentData.header.title}
                                    onChange={(e) =>
                                        setContentData((prev) => ({
                                            ...prev,
                                            header: {
                                                ...prev.header,
                                                title: e.target.value,
                                            },
                                        }))
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="TAFT NATIONAL HIGH SCHOOL ALS SHS"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Main Description
                                </label>
                                <textarea
                                    value={contentData.header.description}
                                    onChange={(e) =>
                                        setContentData((prev) => ({
                                            ...prev,
                                            header: {
                                                ...prev.header,
                                                description: e.target.value,
                                            },
                                        }))
                                    }
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Describe the ALS program..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Call to Action
                                </label>
                                <input
                                    type="text"
                                    value={contentData.header.call_to_action}
                                    onChange={(e) =>
                                        setContentData((prev) => ({
                                            ...prev,
                                            header: {
                                                ...prev.header,
                                                call_to_action: e.target.value,
                                            },
                                        }))
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ready to Join Our Alternative Learning System?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CTA Description
                                </label>
                                <textarea
                                    value={contentData.header.cta_description}
                                    onChange={(e) =>
                                        setContentData((prev) => ({
                                            ...prev,
                                            header: {
                                                ...prev.header,
                                                cta_description: e.target.value,
                                            },
                                        }))
                                    }
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Contact our academic department to learn more..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Qualifications Tab */}
                    {activeTab === "qualifications" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Program Qualifications
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Manage the qualification requirements
                                        for ALS program
                                    </p>
                                </div>
                                <button
                                    onClick={addQualification}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Qualification
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    value={
                                        contentData.qualifications.section_title
                                    }
                                    onChange={(e) =>
                                        setContentData((prev) => ({
                                            ...prev,
                                            qualifications: {
                                                ...prev.qualifications,
                                                section_title: e.target.value,
                                            },
                                        }))
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="QUALIFICATIONS"
                                />
                            </div>

                            <div className="space-y-4">
                                {contentData.qualifications.items.map(
                                    (qualification, index) => (
                                        <div
                                            key={qualification.id || index}
                                            className="bg-gray-50 p-4 rounded-lg"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <input
                                                        type="text"
                                                        value={
                                                            qualification.title
                                                        }
                                                        onChange={(e) =>
                                                            updateQualification(
                                                                index,
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Age Requirement"
                                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <select
                                                        value={
                                                            qualification.icon
                                                        }
                                                        onChange={(e) =>
                                                            updateQualification(
                                                                index,
                                                                "icon",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        <option value="👤">
                                                            👤 Person
                                                        </option>
                                                        <option value="📚">
                                                            📚 Books
                                                        </option>
                                                        <option value="🎓">
                                                            🎓 Graduate
                                                        </option>
                                                        <option value="📋">
                                                            📋 Clipboard
                                                        </option>
                                                        <option value="✅">
                                                            ✅ Check
                                                        </option>
                                                        <option value="🏆">
                                                            🏆 Trophy
                                                        </option>
                                                        <option value="💡">
                                                            💡 Idea
                                                        </option>
                                                    </select>
                                                    <select
                                                        value={
                                                            qualification.color
                                                        }
                                                        onChange={(e) =>
                                                            updateQualification(
                                                                index,
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
                                                        <option value="orange">
                                                            Orange
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
                                                        removeQualification(
                                                            index
                                                        )
                                                    }
                                                    className="ml-3 text-red-500 hover:text-red-700 p-2"
                                                    title="Remove qualification"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <textarea
                                                value={
                                                    qualification.description
                                                }
                                                onChange={(e) =>
                                                    updateQualification(
                                                        index,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Must be 18 years old"
                                                rows={2}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {/* Requirements Tab */}
                    {activeTab === "requirements" && (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Documents */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Required Documents
                                        </h3>
                                        <button
                                            onClick={addDocument}
                                            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-1 text-sm"
                                        >
                                            <Plus className="h-3 w-3" />
                                            Add Document
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {contentData.requirements.documents.map(
                                            (doc, index) => (
                                                <div
                                                    key={doc.id || index}
                                                    className="flex items-center gap-2"
                                                >
                                                    <span className="text-gray-400 text-sm">
                                                        •
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={doc.text}
                                                        onChange={(e) =>
                                                            updateDocument(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="PSA Birth Certificate"
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            removeDocument(
                                                                index
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700 p-1"
                                                        title="Remove document"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Contact Information
                                        </h3>
                                        <button
                                            onClick={addContactInfo}
                                            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1 text-sm"
                                        >
                                            <Plus className="h-3 w-3" />
                                            Add Contact
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {contentData.requirements.contact_info.map(
                                            (contact, index) => (
                                                <div
                                                    key={contact.id || index}
                                                    className="flex items-center gap-2"
                                                >
                                                    <select
                                                        value={contact.type}
                                                        onChange={(e) =>
                                                            updateContactInfo(
                                                                index,
                                                                "type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="px-2 py-2 border border-gray-300 rounded-lg text-sm"
                                                    >
                                                        <option value="phone">
                                                            📱 Phone
                                                        </option>
                                                        <option value="address">
                                                            📍 Address
                                                        </option>
                                                        <option value="email">
                                                            📧 Email
                                                        </option>
                                                    </select>
                                                    <input
                                                        type="text"
                                                        value={contact.text}
                                                        onChange={(e) =>
                                                            updateContactInfo(
                                                                index,
                                                                "text",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="+639505358285"
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            removeContactInfo(
                                                                index
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700 p-1"
                                                        title="Remove contact"
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

                    {/* Features Tab */}
                    {activeTab === "features" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Program Features
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Highlight the key features and benefits
                                        of the ALS program
                                    </p>
                                </div>
                                <button
                                    onClick={addFeature}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Feature
                                </button>
                            </div>

                            <div className="space-y-3">
                                {contentData.features.items.map(
                                    (feature, index) => (
                                        <div
                                            key={feature.id || index}
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                        >
                                            <input
                                                type="text"
                                                value={feature.text}
                                                onChange={(e) =>
                                                    updateFeature(
                                                        index,
                                                        "text",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Flexible learning schedule"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            />
                                            <select
                                                value={feature.color}
                                                onChange={(e) =>
                                                    updateFeature(
                                                        index,
                                                        "color",
                                                        e.target.value
                                                    )
                                                }
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            >
                                                <option value="green">
                                                    Green
                                                </option>
                                                <option value="blue">
                                                    Blue
                                                </option>
                                                <option value="purple">
                                                    Purple
                                                </option>
                                                <option value="orange">
                                                    Orange
                                                </option>
                                            </select>
                                            <button
                                                onClick={() =>
                                                    removeFeature(index)
                                                }
                                                className="text-red-500 hover:text-red-700 p-2"
                                                title="Remove feature"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ALSContent;
