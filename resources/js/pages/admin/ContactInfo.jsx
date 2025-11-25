import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Search,
    Phone,
    AlertCircle,
    CheckCircle,
    Loader2,
    Mail,
    MapPin,
    Clock,
    ExternalLink,
    Building,
    Users,
    GraduationCap,
    Save,
    X,
} from "lucide-react";

const ContactInfo = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("general");
    const [editingSection, setEditingSection] = useState(null);
    const [saving, setSaving] = useState(false);

    // Organized contact data by category
    const [contactSections, setContactSections] = useState({
        general: {
            name: "General Information",
            icon: Building,
            color: "blue",
            contacts: {
                phone: {
                    label: "Main Phone",
                    value: "",
                    description: "",
                    id: null,
                },
                email: {
                    label: "Main Email",
                    value: "",
                    description: "",
                    id: null,
                },
                address: {
                    label: "School Address",
                    value: "",
                    description: "",
                    id: null,
                },
                hours: {
                    label: "Office Hours",
                    value: "",
                    description: "",
                    id: null,
                },
            },
        },
        admissions: {
            name: "Admissions Office",
            icon: GraduationCap,
            color: "green",
            contacts: {
                phone: {
                    label: "Admissions Phone",
                    value: "",
                    description: "",
                    id: null,
                },
                email: {
                    label: "Admissions Email",
                    value: "",
                    description: "",
                    id: null,
                },
                hours: {
                    label: "Admissions Hours",
                    value: "",
                    description: "",
                    id: null,
                },
                address: {
                    label: "School Address",
                    value: "",
                    description: "",
                    id: null,
                    readOnly: true,
                },
            },
        },
        support: {
            name: "Student Support",
            icon: Users,
            color: "purple",
            contacts: {
                phone: {
                    label: "Support Phone",
                    value: "",
                    description: "",
                    id: null,
                },
                email: {
                    label: "Support Email",
                    value: "",
                    description: "",
                    id: null,
                },
                hours: {
                    label: "Support Hours",
                    value: "",
                    description: "",
                    id: null,
                },
                address: {
                    label: "School Address",
                    value: "",
                    description: "",
                    id: null,
                    readOnly: true,
                },
            },
        },
    });

    const tabs = [
        {
            id: "general",
            name: "General Information",
            icon: Building,
            color: "blue",
        },
        {
            id: "admissions",
            name: "Admissions Office",
            icon: GraduationCap,
            color: "green",
        },
        {
            id: "support",
            name: "Student Support",
            icon: Users,
            color: "purple",
        },
    ];

    useEffect(() => {
        fetchContactInfo();
    }, []);

    const fetchContactInfo = async () => {
        try {
            setLoading(true);
            const response = await adminService.contactInfo.getAll();
            const contacts = response.data || [];

            // Organize contacts into sections
            const organized = { ...contactSections };

            contacts.forEach((contact) => {
                const category = contact.category || "general";
                const type = contact.type;

                if (organized[category] && organized[category].contacts[type]) {
                    organized[category].contacts[type] = {
                        id: contact.id,
                        label:
                            contact.label ||
                            organized[category].contacts[type].label,
                        value: contact.value || "",
                        description: contact.description || "",
                        department: contact.department || "",
                        position: contact.position || "",
                        is_active: contact.is_active ?? true,
                        display_order: contact.display_order || 0,
                    };
                }
            });

            setContactSections(organized);
            setError("");
        } catch (err) {
            setError("Failed to fetch contact information");
            console.error("Error fetching contact info:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSection = async (sectionId) => {
        try {
            setSaving(true);
            const section = contactSections[sectionId];

            // Save each contact in the section
            for (const [type, contact] of Object.entries(section.contacts)) {
                if (contact.value && contact.value.trim()) {
                    const contactData = {
                        type: type,
                        label: contact.label,
                        value: contact.value,
                        description: contact.description || "",
                        department: section.name,
                        position: "",
                        category: sectionId,
                        featured: true,
                        color: section.color,
                        is_active: true,
                        display_order: 0,
                    };

                    if (contact.id) {
                        // Update existing
                        await adminService.contactInfo.update(
                            contact.id,
                            contactData
                        );
                    } else {
                        // Create new
                        const response = await adminService.contactInfo.create(
                            contactData
                        );
                        if (response.success && response.data) {
                            // Update the contact with the new ID
                            setContactSections((prev) => ({
                                ...prev,
                                [sectionId]: {
                                    ...prev[sectionId],
                                    contacts: {
                                        ...prev[sectionId].contacts,
                                        [type]: {
                                            ...prev[sectionId].contacts[type],
                                            id: response.data.id,
                                        },
                                    },
                                },
                            }));
                        }
                    }
                }
            }

            setEditingSection(null);
            await fetchContactInfo();
            setError("");
        } catch (err) {
            setError("Failed to save contact information");
            console.error("Error saving contact info:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateContact = (sectionId, type, field, value) => {
        setContactSections((prev) => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                contacts: {
                    ...prev[sectionId].contacts,
                    [type]: {
                        ...prev[sectionId].contacts[type],
                        [field]: value,
                    },
                },
            },
        }));
    };

    const getContactIcon = (type) => {
        switch (type) {
            case "phone":
                return <Phone className="w-5 h-5" />;
            case "email":
                return <Mail className="w-5 h-5" />;
            case "address":
                return <MapPin className="w-5 h-5" />;
            case "hours":
                return <Clock className="w-5 h-5" />;
            default:
                return <Phone className="w-5 h-5" />;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Compact Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-900 mb-1">
                        Contact Information Management
                    </h1>
                    <p className="text-sm text-gray-600 max-w-xl mx-auto">
                        Manage contact details organized by department and
                        purpose
                    </p>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-6 py-4 rounded-r-lg flex items-center gap-3 shadow-sm">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{error}</span>
                </div>
            )}

            {/* Compact Centered Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <nav className="flex justify-center">
                        <div className="flex space-x-1 bg-gray-100 p-1 rounded-md">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`${
                                            isActive
                                                ? `bg-white text-${tab.color}-600 shadow-sm border border-gray-200`
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        } px-3 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-all duration-200 min-w-[120px] justify-center`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.name}
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                </div>

                {/* Enhanced Content */}
                {Object.entries(contactSections).map(([sectionId, section]) => {
                    if (activeTab !== sectionId) return null;

                    const Icon = section.icon;
                    const isEditing = editingSection === sectionId;

                    return (
                        <div key={sectionId} className="p-6">
                            {/* Compact Section Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-10 h-10 bg-gradient-to-br from-${section.color}-100 to-${section.color}-200 rounded-lg flex items-center justify-center shadow-sm border border-${section.color}-200`}
                                    >
                                        <Icon
                                            className={`w-5 h-5 text-${section.color}-600`}
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">
                                            {section.name}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            Manage contact information for{" "}
                                            {section.name.toLowerCase()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleSaveSection(sectionId)
                                                }
                                                disabled={saving}
                                                className={`px-4 py-2 bg-gradient-to-r from-${section.color}-600 to-${section.color}-700 text-white rounded-lg hover:from-${section.color}-700 hover:to-${section.color}-800 flex items-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg transition-all duration-200 font-medium text-sm`}
                                            >
                                                {saving ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Save className="w-4 h-4" />
                                                )}
                                                Save Changes
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setEditingSection(null)
                                                }
                                                className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 flex items-center gap-2 transition-all duration-200 font-medium text-sm"
                                            >
                                                <X className="w-4 h-4" />
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setEditingSection(sectionId)
                                            }
                                            className={`px-4 py-2 bg-gradient-to-r from-${section.color}-600 to-${section.color}-700 text-white rounded-lg hover:from-${section.color}-700 hover:to-${section.color}-800 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 font-medium text-sm`}
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit Section
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Compact Contact Fields */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {Object.entries(section.contacts).map(
                                    ([type, contact]) => (
                                        <div
                                            key={type}
                                            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <div
                                                    className={`w-6 h-6 bg-${section.color}-100 rounded-md flex items-center justify-center`}
                                                >
                                                    {getContactIcon(type)}
                                                </div>
                                                <label className="block text-sm font-semibold text-gray-900">
                                                    {contact.label}
                                                </label>
                                            </div>

                                            {isEditing ? (
                                                <div className="space-y-3">
                                                    <div>
                                                        <input
                                                            type={
                                                                type === "email"
                                                                    ? "email"
                                                                    : "text"
                                                            }
                                                            value={
                                                                contact.value
                                                            }
                                                            onChange={(e) =>
                                                                handleUpdateContact(
                                                                    sectionId,
                                                                    type,
                                                                    "value",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${section.color}-500 focus:border-${section.color}-500 transition-colors duration-200 bg-white text-sm`}
                                                            placeholder={`Enter ${contact.label.toLowerCase()}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <textarea
                                                            value={
                                                                contact.description
                                                            }
                                                            onChange={(e) =>
                                                                handleUpdateContact(
                                                                    sectionId,
                                                                    type,
                                                                    "description",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${section.color}-500 focus:border-${section.color}-500 transition-colors duration-200 bg-white resize-none text-sm`}
                                                            placeholder="Optional description"
                                                            rows="2"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                        <div className="text-gray-900 font-medium text-sm">
                                                            {contact.value || (
                                                                <span className="text-gray-400 italic text-base">
                                                                    Not set -
                                                                    Click "Edit
                                                                    Section" to
                                                                    add
                                                                </span>
                                                            )}
                                                        </div>
                                                        {contact.description && (
                                                            <div className="text-gray-600 mt-2 text-sm leading-relaxed">
                                                                {
                                                                    contact.description
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ContactInfo;
