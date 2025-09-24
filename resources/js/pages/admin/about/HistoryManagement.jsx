import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import {
    Plus,
    Edit,
    Trash2,
    Save,
    X,
    Loader2,
    Calendar,
    MapPin,
    Users,
    Award,
    BookOpen,
    Building,
} from "lucide-react";
import { historyService } from "../../../services/historyService";
import RichTextEditor from "../../../components/RichTextEditor";

const HistoryManagement = () => {
    const [overview, setOverview] = useState({
        title: "Our History",
        description: "",
        established: "2003",
        location: "Surigao City",
        facts: [
            "Over 20 years of service",
            "Thousands of graduates",
            "K-12 compliant",
            "Community-centered",
        ],
    });
    const [milestones, setMilestones] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingMilestone, setEditingMilestone] = useState(null);
    const [editingAchievement, setEditingAchievement] = useState(null);
    const [showMilestoneForm, setShowMilestoneForm] = useState(false);
    const [showAchievementForm, setShowAchievementForm] = useState(false);

    // Form states
    const [milestoneForm, setMilestoneForm] = useState({
        year: "",
        title: "",
        description: "",
        icon: "building",
    });
    const [achievementForm, setAchievementForm] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        fetchHistoryData();
    }, []);

    const fetchHistoryData = async () => {
        try {
            setLoading(true);
            const [overviewData, milestonesData, achievementsData] =
                await Promise.all([
                    historyService.getOverview(),
                    historyService.getMilestones(),
                    historyService.getAchievements(),
                ]);

            if (overviewData) {
                setOverview({
                    title: overviewData.title || "Our History",
                    description: overviewData.content || "",
                    established: overviewData.established || "2003",
                    location: overviewData.location || "Surigao City",
                    facts: overviewData.facts || [
                        "Over 20 years of service",
                        "Thousands of graduates",
                        "K-12 compliant",
                        "Community-centered",
                    ],
                });
            }

            setMilestones(milestonesData || []);
            setAchievements(achievementsData || []);
        } catch (error) {
            console.error("Error fetching history data:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveOverview = async () => {
        try {
            setSaving(true);
            await historyService.updateOverview(overview);
            // Show success message
        } catch (error) {
            console.error("Error saving overview:", error);
        } finally {
            setSaving(false);
        }
    };

    const saveMilestone = async () => {
        try {
            setSaving(true);
            if (editingMilestone) {
                await historyService.updateMilestone(
                    editingMilestone.id,
                    milestoneForm
                );
            } else {
                await historyService.createMilestone(milestoneForm);
            }
            await fetchHistoryData();
            setShowMilestoneForm(false);
            setEditingMilestone(null);
            resetMilestoneForm();
        } catch (error) {
            console.error("Error saving milestone:", error);
        } finally {
            setSaving(false);
        }
    };

    const saveAchievement = async () => {
        try {
            setSaving(true);
            if (editingAchievement) {
                await historyService.updateAchievement(
                    editingAchievement.id,
                    achievementForm
                );
            } else {
                await historyService.createAchievement(achievementForm);
            }
            await fetchHistoryData();
            setShowAchievementForm(false);
            setEditingAchievement(null);
            resetAchievementForm();
        } catch (error) {
            console.error("Error saving achievement:", error);
        } finally {
            setSaving(false);
        }
    };

    const deleteMilestone = async (id) => {
        if (window.confirm("Are you sure you want to delete this milestone?")) {
            try {
                await historyService.deleteMilestone(id);
                await fetchHistoryData();
            } catch (error) {
                console.error("Error deleting milestone:", error);
            }
        }
    };

    const deleteAchievement = async (id) => {
        if (
            window.confirm("Are you sure you want to delete this achievement?")
        ) {
            try {
                await historyService.deleteAchievement(id);
                await fetchHistoryData();
            } catch (error) {
                console.error("Error deleting achievement:", error);
            }
        }
    };

    const editMilestone = (milestone) => {
        setEditingMilestone(milestone);
        setMilestoneForm({
            year: milestone.year || "",
            title: milestone.title || "",
            description: milestone.description || "",
            icon: milestone.icon || "building",
        });
        setShowMilestoneForm(true);
    };

    const editAchievement = (achievement) => {
        setEditingAchievement(achievement);
        setAchievementForm({
            title: achievement.title || "",
            description: achievement.description || "",
        });
        setShowAchievementForm(true);
    };

    const resetMilestoneForm = () => {
        setMilestoneForm({
            year: "",
            title: "",
            description: "",
            icon: "building",
        });
    };

    const resetAchievementForm = () => {
        setAchievementForm({
            title: "",
            description: "",
        });
    };

    const getIconForType = (type) => {
        const iconMap = {
            building: Building,
            award: Award,
            book: BookOpen,
            users: Users,
            calendar: Calendar,
            map: MapPin,
        };
        return iconMap[type] || Building;
    };

    if (loading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2">Loading history content...</span>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Overview Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        History Overview
                    </CardTitle>
                    <CardDescription>
                        Configure the main history page title and description
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Page Title
                            </label>
                            <input
                                type="text"
                                value={overview.title}
                                onChange={(e) =>
                                    setOverview({
                                        ...overview,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Established Year
                            </label>
                            <input
                                type="text"
                                value={overview.established}
                                onChange={(e) =>
                                    setOverview({
                                        ...overview,
                                        established: e.target.value,
                                    })
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                value={overview.location}
                                onChange={(e) =>
                                    setOverview({
                                        ...overview,
                                        location: e.target.value,
                                    })
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={overview.description}
                            onChange={(e) =>
                                setOverview({
                                    ...overview,
                                    description: e.target.value,
                                })
                            }
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="Enter the main history description..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quick Facts (one per line)
                        </label>
                        <textarea
                            value={overview.facts.join("\n")}
                            onChange={(e) =>
                                setOverview({
                                    ...overview,
                                    facts: e.target.value
                                        .split("\n")
                                        .filter((f) => f.trim()),
                                })
                            }
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="Enter quick facts, one per line..."
                        />
                    </div>
                    <Button
                        onClick={saveOverview}
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {saving ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                            <Save className="h-4 w-4 mr-2" />
                        )}
                        Save Overview
                    </Button>
                </CardContent>
            </Card>

            {/* Milestones Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Milestones & Timeline
                            </CardTitle>
                            <CardDescription>
                                Manage historical milestones and achievements
                            </CardDescription>
                        </div>
                        <Button
                            onClick={() => setShowMilestoneForm(true)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Milestone
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {milestones.map((milestone) => {
                            const IconComponent = getIconForType(
                                milestone.icon
                            );
                            return (
                                <div
                                    key={milestone.id}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <IconComponent className="h-8 w-8 text-blue-600" />
                                        <div>
                                            <div className="font-semibold">
                                                {milestone.year} -{" "}
                                                {milestone.title}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {milestone.description}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                editMilestone(milestone)
                                            }
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                deleteMilestone(milestone.id)
                                            }
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Achievements Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Achievements
                            </CardTitle>
                            <CardDescription>
                                Manage school achievements and recognitions
                            </CardDescription>
                        </div>
                        <Button
                            onClick={() => setShowAchievementForm(true)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Achievement
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className="p-4 border border-gray-200 rounded-lg"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-semibold">
                                            {achievement.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {achievement.description}
                                        </p>
                                    </div>
                                    <div className="flex gap-1 ml-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                editAchievement(achievement)
                                            }
                                        >
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                deleteAchievement(
                                                    achievement.id
                                                )
                                            }
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Milestone Form Modal */}
            {showMilestoneForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-xl flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-blue-900">
                                {editingMilestone
                                    ? "Edit Milestone"
                                    : "Add Milestone"}
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setShowMilestoneForm(false);
                                    setEditingMilestone(null);
                                    resetMilestoneForm();
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Year
                                    </label>
                                    <input
                                        type="text"
                                        value={milestoneForm.year}
                                        onChange={(e) =>
                                            setMilestoneForm({
                                                ...milestoneForm,
                                                year: e.target.value,
                                            })
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        placeholder="e.g., 2003"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Icon
                                    </label>
                                    <select
                                        value={milestoneForm.icon}
                                        onChange={(e) =>
                                            setMilestoneForm({
                                                ...milestoneForm,
                                                icon: e.target.value,
                                            })
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="building">
                                            Building
                                        </option>
                                        <option value="award">Award</option>
                                        <option value="book">Book</option>
                                        <option value="users">Users</option>
                                        <option value="calendar">
                                            Calendar
                                        </option>
                                        <option value="map">Map</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={milestoneForm.title}
                                    onChange={(e) =>
                                        setMilestoneForm({
                                            ...milestoneForm,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Milestone title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={milestoneForm.description}
                                    onChange={(e) =>
                                        setMilestoneForm({
                                            ...milestoneForm,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Describe this milestone..."
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowMilestoneForm(false);
                                        setEditingMilestone(null);
                                        resetMilestoneForm();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={saveMilestone}
                                    disabled={saving}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    {saving ? (
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    ) : (
                                        <Save className="h-4 w-4 mr-2" />
                                    )}
                                    {editingMilestone ? "Update" : "Create"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Achievement Form Modal */}
            {showAchievementForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-xl flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-blue-900">
                                {editingAchievement
                                    ? "Edit Achievement"
                                    : "Add Achievement"}
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setShowAchievementForm(false);
                                    setEditingAchievement(null);
                                    resetAchievementForm();
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={achievementForm.title}
                                    onChange={(e) =>
                                        setAchievementForm({
                                            ...achievementForm,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Achievement title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={achievementForm.description}
                                    onChange={(e) =>
                                        setAchievementForm({
                                            ...achievementForm,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Describe this achievement..."
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowAchievementForm(false);
                                        setEditingAchievement(null);
                                        resetAchievementForm();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={saveAchievement}
                                    disabled={saving}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    {saving ? (
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    ) : (
                                        <Save className="h-4 w-4 mr-2" />
                                    )}
                                    {editingAchievement ? "Update" : "Create"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryManagement;
