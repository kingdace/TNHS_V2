import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    MapPin,
    Users,
    Award,
    BookOpen,
    Building,
    Loader2,
} from "lucide-react";
import { historyService } from "../../services/historyService";

const AboutHistory = () => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistoryContent = async () => {
            try {
                setLoading(true);
                const [overviewData, milestonesData, achievementsData] =
                    await Promise.all([
                        historyService.getOverview(),
                        historyService.getMilestones(),
                        historyService.getAchievements(),
                    ]);

                // Structure the data to match the expected format
                setContent({
                    history_overview: overviewData ? [overviewData] : [],
                    history_milestones: milestonesData || [],
                    history_achievements: achievementsData || [],
                    history_legacy: [], // Will be populated when legacy management is implemented
                });
            } catch (error) {
                console.error("Error fetching history content:", error);
                setError("Failed to load history content");
            } finally {
                setLoading(false);
            }
        };

        fetchHistoryContent();
        window.scrollTo(0, 0);
    }, []);

    // Parse milestones from content data
    const getMilestones = () => {
        const milestonesSection = content.history_milestones || [];
        return milestonesSection.map((item) => ({
            year: item.year || "2023",
            title: item.title || "Milestone",
            description: item.description || "",
            icon: getIconForType(item.icon || "building"),
        }));
    };

    // Parse achievements from content data
    const getAchievements = () => {
        const achievementsSection = content.history_achievements || [];
        return achievementsSection.map((item) => ({
            title: item.title || "Achievement",
            description: item.description || "",
        }));
    };

    // Get overview content
    const getOverviewContent = () => {
        const overviewSection = content.history_overview || [];
        if (overviewSection.length > 0) {
            const item = overviewSection[0];
            return {
                title: item.title || "Our History",
                description: item.content || "",
                established: item.established || "2003",
                location: item.location || "Surigao City",
                facts: item.facts || [],
            };
        }
        return {
            title: "Our History",
            description:
                "A journey of excellence, growth, and commitment to quality education",
            established: "2003",
            location: "Surigao City",
            facts: [
                "Over 20 years of service",
                "Thousands of graduates",
                "K-12 compliant",
                "Community-centered",
            ],
        };
    };

    // Get legacy content
    const getLegacyContent = () => {
        const legacySection = content.history_legacy || [];
        return legacySection.map((item) => {
            const data = JSON.parse(item.content_data || "{}");
            return {
                title: data.title || item.title || "Legacy",
                description: data.description || item.description || "",
                icon: getIconForType(data.icon || "users"),
            };
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
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-600">
                            Loading history content...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">❌</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-3">
                            {error}
                        </h3>
                        <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
                            Unable to load the history content. Please try again
                            later.
                        </p>
                        <Link
                            to="/about"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to About
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const overview = getOverviewContent();
    const milestones = getMilestones();
    const achievements = getAchievements();
    const legacyItems = getLegacyContent();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        {overview.title}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {overview.description}
                    </p>
                </div>

                {/* School Overview */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Foundation & Growth
                            </h2>
                            <div
                                className="text-gray-600 leading-relaxed mb-6"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        overview.description ||
                                        "School history content will be displayed here.",
                                }}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-700">
                                        Est. {overview.established}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-700">
                                        {overview.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Quick Facts
                            </h3>
                            <ul className="space-y-3">
                                {overview.facts && overview.facts.length > 0 ? (
                                    overview.facts.map((fact, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center space-x-2"
                                        >
                                            <div
                                                className={`w-2 h-2 rounded-full ${
                                                    index % 2 === 0
                                                        ? "bg-blue-600"
                                                        : "bg-green-600"
                                                }`}
                                            ></div>
                                            <span className="text-gray-700">
                                                {fact}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            <span className="text-gray-700">
                                                Over 20 years of service
                                            </span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                            <span className="text-gray-700">
                                                Thousands of graduates
                                            </span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            <span className="text-gray-700">
                                                K-12 compliant
                                            </span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                            <span className="text-gray-700">
                                                Community-centered
                                            </span>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Milestones & Achievements
                    </h2>
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-green-500"></div>

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => {
                                const IconComponent = milestone.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`relative flex items-center ${
                                            index % 2 === 0
                                                ? "justify-start"
                                                : "justify-end"
                                        }`}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full border-4 border-white shadow-lg"></div>

                                        {/* Content */}
                                        <div
                                            className={`w-5/12 ${
                                                index % 2 === 0
                                                    ? "pr-8 text-right"
                                                    : "pl-8 text-left"
                                            }`}
                                        >
                                            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                                <div className="flex items-center space-x-3 mb-3">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                                        <IconComponent className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="text-2xl font-bold text-blue-600">
                                                        {milestone.year}
                                                    </div>
                                                </div>
                                                <h4 className="font-semibold text-gray-800 mb-2">
                                                    {milestone.title}
                                                </h4>
                                                <p className="text-gray-600 text-sm">
                                                    {milestone.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {achievements.map((achievement, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {achievement.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {achievement.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Legacy Section */}
                {legacyItems.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-center">
                            Our Legacy
                        </h2>
                        <div
                            className={`grid md:grid-cols-${Math.min(
                                legacyItems.length,
                                3
                            )} gap-8`}
                        >
                            {legacyItems.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <div key={index} className="text-center">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-blue-100">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/about"
                        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                        ← Back to About
                    </Link>
                    <Link
                        to="/about/mission"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Mission & Vision →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutHistory;
