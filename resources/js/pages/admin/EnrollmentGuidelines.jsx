import React, { useState, useEffect } from "react";
import {
    Calendar,
    Users,
    Award,
    Globe,
    GraduationCap,
    Brain,
    FileText,
    BookOpen,
    Star,
    Plus,
    Save,
    X,
    AlertCircle,
    CheckCircle,
    Loader2,
    Edit,
    Trash2,
} from "lucide-react";
import { enrollmentGuidelinesService } from "../../services/enrollmentGuidelinesService";
import {
    GradeCategoriesTab,
    SpecialProgramsTab,
} from "./EnrollmentGuidelinesComponents";

const EnrollmentGuidelines = () => {
    const [activeTab, setActiveTab] = useState("info_cards");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Data states
    const [infoCards, setInfoCards] = useState([]);
    const [gradeCategories, setGradeCategories] = useState([]);
    const [specialPrograms, setSpecialPrograms] = useState([]);

    // Tab configuration
    const tabs = [
        {
            id: "info_cards",
            label: "Information Cards",
            icon: Calendar,
            color: "blue",
            count: infoCards.length,
        },
        {
            id: "grade_categories",
            label: "Grade Categories",
            icon: GraduationCap,
            color: "green",
            count: gradeCategories.length,
        },
        {
            id: "special_programs",
            label: "Special Programs",
            icon: Globe,
            color: "purple",
            count: specialPrograms.length,
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await enrollmentGuidelinesService.getAdminData();

            if (response.success) {
                setInfoCards(response.data.info_cards || []);
                setGradeCategories(response.data.grade_categories || []);
                setSpecialPrograms(response.data.special_programs || []);
            } else {
                setError(response.error || "Failed to fetch data");
            }
        } catch (err) {
            setError("Failed to fetch enrollment guidelines data");
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };
    const showSuccess = (message) => {
        setSuccess(message);
        setTimeout(() => setSuccess(""), 3000);
    };

    const showError = (message) => {
        setError(message);
        setTimeout(() => setError(""), 5000);
    };

    // Get tab gradient colors
    const getTabGradient = (color) => {
        const gradients = {
            blue: "from-blue-600 to-blue-700",
            green: "from-green-600 to-green-700",
            purple: "from-purple-600 to-purple-700",
        };
        return gradients[color] || gradients.blue;
    };

    // Get icon component
    const getIconComponent = (iconName) => {
        const icons = {
            Calendar,
            Users,
            Award,
            Globe,
            GraduationCap,
            Brain,
            FileText,
            BookOpen,
            Star,
        };
        return icons[iconName] || FileText;
    };

    // Handle info cards update
    const handleUpdateInfoCards = async (updatedCards) => {
        try {
            setSaving(true);
            setError("");

            const response = await enrollmentGuidelinesService.updateInfoCards(
                updatedCards
            );

            if (response.success) {
                setInfoCards(updatedCards);
                showSuccess("Information cards updated successfully!");
            } else {
                showError(
                    response.error || "Failed to update information cards"
                );
            }
        } catch (err) {
            showError("Failed to update information cards");
            console.error("Error updating info cards:", err);
        } finally {
            setSaving(false);
        }
    };

    // Handle category update
    const handleUpdateCategory = async (categoryId, categoryData) => {
        try {
            setSaving(true);
            setError("");

            const response = await enrollmentGuidelinesService.updateCategory(
                categoryId,
                categoryData
            );

            if (response.success) {
                await fetchData(); // Refresh data
                showSuccess("Category updated successfully!");
            } else {
                showError(response.error || "Failed to update category");
            }
        } catch (err) {
            showError("Failed to update category");
            console.error("Error updating category:", err);
        } finally {
            setSaving(false);
        }
    };

    // Handle special program update
    const handleUpdateSpecialProgram = async (programId, programData) => {
        try {
            setSaving(true);
            setError("");

            const response =
                await enrollmentGuidelinesService.updateSpecialProgram(
                    programId,
                    programData
                );

            if (response.success) {
                await fetchData(); // Refresh data
                showSuccess("Special program updated successfully!");
            } else {
                showError(response.error || "Failed to update special program");
            }
        } catch (err) {
            showError("Failed to update special program");
            console.error("Error updating special program:", err);
        } finally {
            setSaving(false);
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
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl px-6 py-3 text-white shadow-lg">
                <div>
                    <h1 className="text-xl font-bold">
                        Enrollment Guidelines Management
                    </h1>
                    <p className="text-blue-100 text-xs">
                        Manage enrollment information, grade categories, and
                        special programs
                    </p>
                </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    {success}
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    {error}
                </div>
            )}

            {/* Centered Tabs with Compact Design */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
                <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-slate-50">
                    <nav className="flex justify-center">
                        <div className="flex space-x-1 p-3">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all duration-200 ${
                                            isActive
                                                ? `bg-gradient-to-r ${getTabGradient(
                                                      tab.color
                                                  )} text-white shadow-md transform scale-105`
                                                : "text-gray-600 hover:text-gray-800 hover:bg-white/60 hover:shadow-sm"
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span className="hidden sm:inline">
                                            {tab.label}
                                        </span>
                                        <span className="sm:hidden">
                                            {tab.label.split(" ")[0]}
                                        </span>
                                        <span
                                            className={`px-1.5 py-0.5 text-xs rounded-full font-semibold ${
                                                isActive
                                                    ? "bg-white/20 text-white"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {tab.count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === "info_cards" && (
                        <InfoCardsTab
                            cards={infoCards}
                            onUpdate={handleUpdateInfoCards}
                            saving={saving}
                            getIconComponent={getIconComponent}
                        />
                    )}

                    {activeTab === "grade_categories" && (
                        <GradeCategoriesTab
                            categories={gradeCategories}
                            onUpdate={handleUpdateCategory}
                            saving={saving}
                            getIconComponent={getIconComponent}
                        />
                    )}

                    {activeTab === "special_programs" && (
                        <SpecialProgramsTab
                            programs={specialPrograms}
                            onUpdate={handleUpdateSpecialProgram}
                            saving={saving}
                            getIconComponent={getIconComponent}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
// Information Cards Tab Component
const InfoCardsTab = ({ cards, onUpdate, saving, getIconComponent }) => {
    const [editingCards, setEditingCards] = useState([]);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setEditingCards(cards.map((card) => ({ ...card })));
        setHasChanges(false);
    }, [cards]);

    const handleCardChange = (index, field, value) => {
        const updatedCards = [...editingCards];
        updatedCards[index] = { ...updatedCards[index], [field]: value };
        setEditingCards(updatedCards);
        setHasChanges(true);
    };

    const handleSave = () => {
        onUpdate(editingCards);
        setHasChanges(false);
    };

    const handleCancel = () => {
        setEditingCards(cards.map((card) => ({ ...card })));
        setHasChanges(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Information Cards
                    </h3>
                    <p className="text-sm text-gray-600">
                        Manage the 4 main information cards displayed on the
                        enrollment page
                    </p>
                </div>
                <div className="flex gap-2">
                    {hasChanges && (
                        <>
                            <button
                                onClick={handleCancel}
                                className="px-3 py-1.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center gap-2 text-sm shadow-md hover:shadow-lg"
                            >
                                {saving && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}
                                Save Changes
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {editingCards.map((card, index) => {
                    const IconComponent = getIconComponent(card.icon);
                    return (
                        <div
                            key={card.id}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color
                                        ?.replace("text-", "bg-")
                                        .replace("-600", "-100")}`}
                                >
                                    <IconComponent
                                        className={`h-5 w-5 ${
                                            card.color || "text-gray-600"
                                        }`}
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={card.title}
                                        onChange={(e) =>
                                            handleCardChange(
                                                index,
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-medium"
                                        placeholder="Card Title"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Content
                                    </label>
                                    <input
                                        type="text"
                                        value={card.content}
                                        onChange={(e) =>
                                            handleCardChange(
                                                index,
                                                "content",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                        placeholder="Main content"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Details
                                    </label>
                                    <input
                                        type="text"
                                        value={card.details || ""}
                                        onChange={(e) =>
                                            handleCardChange(
                                                index,
                                                "details",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                        placeholder="Additional details"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Icon
                                        </label>
                                        <select
                                            value={card.icon || ""}
                                            onChange={(e) =>
                                                handleCardChange(
                                                    index,
                                                    "icon",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                        >
                                            <option value="Calendar">
                                                Calendar
                                            </option>
                                            <option value="Users">Users</option>
                                            <option value="Award">Award</option>
                                            <option value="Globe">Globe</option>
                                            <option value="GraduationCap">
                                                GraduationCap
                                            </option>
                                            <option value="Brain">Brain</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Color
                                        </label>
                                        <select
                                            value={card.color || ""}
                                            onChange={(e) =>
                                                handleCardChange(
                                                    index,
                                                    "color",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                        >
                                            <option value="text-blue-600">
                                                Blue
                                            </option>
                                            <option value="text-green-600">
                                                Green
                                            </option>
                                            <option value="text-purple-600">
                                                Purple
                                            </option>
                                            <option value="text-teal-600">
                                                Teal
                                            </option>
                                            <option value="text-orange-600">
                                                Orange
                                            </option>
                                            <option value="text-red-600">
                                                Red
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EnrollmentGuidelines;
