import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import {
    Users,
    Megaphone,
    Edit,
    FileText,
    Images,
    Activity,
    Clock,
    CheckCircle,
    AlertCircle,
    Target,
    Database,
    Star,
    Calendar as CalendarIcon,
    User,
    Tag,
    BookOpen,
    AlertTriangle,
} from "lucide-react";
import { announcementService } from "../../services/announcementService";
import { galleryService } from "../../services/galleryService";
import { resourcesService } from "../../services/resourcesService";
import { adminService } from "../../services/adminService";

// Simple cache for dashboard data (5 minutes TTL)
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let dashboardCache = {
    data: null,
    timestamp: null,
    isValid: () => {
        return (
            dashboardCache.timestamp &&
            Date.now() - dashboardCache.timestamp < CACHE_TTL
        );
    },
};

const AdminDashboard = () => {
    // Main container for all dashboard content - ULTRA COMPACT
    const DashboardContainer = ({ children }) => (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-1 px-3 pb-3">
            <div className="max-w-7xl mx-auto space-y-4">{children}</div>
        </div>
    );

    const [dashboardData, setDashboardData] = useState({
        announcements: [],
        events: [],
        gallery: [],
        resources: [],
        staffProfiles: [],
        stats: {
            totalAnnouncements: 0,
            publishedAnnouncements: 0,
            draftAnnouncements: 0,
            scheduledAnnouncements: 0,
            featuredAnnouncements: 0,
            expiringAnnouncements: 0,
            totalEvents: 0,
            publishedEvents: 0,
            totalGalleryImages: 0,
            totalResources: 0,
            totalStaffProfiles: 0,
        },
    });

    const [loading, setLoading] = useState(true);
    const [secondaryLoading, setSecondaryLoading] = useState(true);
    const [error, setError] = useState("");

    // Progressive loading: Load critical data first, then secondary data
    useEffect(() => {
        loadCriticalData();
    }, []);

    // Load secondary data after critical data is loaded
    useEffect(() => {
        if (!loading) {
            loadSecondaryData();
        }
    }, [loading]);

    // Load critical data first (announcements for stats and recent items)
    const loadCriticalData = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            // Check cache first
            if (dashboardCache.isValid()) {
                setDashboardData(dashboardCache.data);
                setLoading(false);
                return;
            }

            // Load only announcements first (most important for dashboard)
            const announcementsResponse = await announcementService
                .list()
                .catch(() => []);

            // Extract announcements data
            const announcements = Array.isArray(announcementsResponse)
                ? announcementsResponse
                : [];

            // Calculate critical stats from announcements only
            const criticalStats = {
                totalAnnouncements: announcements.length,
                publishedAnnouncements: announcements.filter(
                    (a) => a?.status === "published"
                ).length,
                draftAnnouncements: announcements.filter(
                    (a) => a?.status === "draft"
                ).length,
                scheduledAnnouncements: announcements.filter(
                    (a) => a?.scheduled_publish_at
                ).length,
                featuredAnnouncements: announcements.filter(
                    (a) => a?.is_featured
                ).length,
                expiringAnnouncements: announcements.filter((a) => {
                    if (!a?.scheduled_unpublish_at) return false;
                    const expiryDate = new Date(a.scheduled_unpublish_at);
                    const now = new Date();
                    const daysUntilExpiry = Math.ceil(
                        (expiryDate - now) / (1000 * 60 * 60 * 24)
                    );
                    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
                }).length,
                // Placeholder values for secondary data
                totalEvents: 0,
                publishedEvents: 0,
                totalGalleryImages: 0,
                totalResources: 0,
                totalStaffProfiles: 0,
            };

            // Update state with critical data
            setDashboardData((prev) => ({
                ...prev,
                announcements: announcements.slice(0, 5), // Only keep first 5 for display
                stats: criticalStats,
            }));
        } catch (err) {
            console.error("Error loading critical dashboard data:", err);
            setError("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    }, []);

    // Load secondary data (events, gallery, resources, staff) in background
    const loadSecondaryData = useCallback(async () => {
        try {
            setSecondaryLoading(true);

            // Load secondary data in parallel
            const [
                eventsResponse,
                galleryResponse,
                resourcesResponse,
                staffProfiles,
            ] = await Promise.all([
                adminService.events
                    .getAll()
                    .catch(() => ({ success: true, data: [] })),
                // Get minimal data for counts only
                galleryService
                    .list()
                    .then((data) => ({
                        count: Array.isArray(data)
                            ? data.length
                            : data?.success && Array.isArray(data.data)
                            ? data.data.length
                            : 0,
                    }))
                    .catch(() => ({ count: 0 })),
                resourcesService
                    .list()
                    .then((data) => ({
                        count: Array.isArray(data)
                            ? data.length
                            : data?.success && Array.isArray(data.data)
                            ? data.data.length
                            : 0,
                    }))
                    .catch(() => ({ count: 0 })),
                adminService.getStaffProfiles().catch(() => []),
            ]);

            // Extract secondary data
            const events = Array.isArray(eventsResponse)
                ? eventsResponse
                : eventsResponse?.success && Array.isArray(eventsResponse.data)
                ? eventsResponse.data
                : [];

            // Update state with secondary data
            setDashboardData((prev) => {
                const updatedStats = {
                    ...prev.stats,
                    totalEvents: events.length,
                    publishedEvents: events.filter(
                        (e) => e?.status === "published"
                    ).length,
                    totalGalleryImages: galleryResponse.count || 0,
                    totalResources: resourcesResponse.count || 0,
                    totalStaffProfiles: Array.isArray(staffProfiles)
                        ? staffProfiles.length
                        : 0,
                };

                const updatedData = {
                    ...prev,
                    events: events.slice(0, 5), // Only keep first 5 for display
                    stats: updatedStats,
                };

                // Cache the complete data
                dashboardCache.data = updatedData;
                dashboardCache.timestamp = Date.now();

                return updatedData;
            });
        } catch (err) {
            console.error("Error loading secondary dashboard data:", err);
            // Don't show error for secondary data, just log it
        } finally {
            setSecondaryLoading(false);
        }
    }, []);

    // Manual refresh function (clears cache)
    const refreshDashboard = useCallback(() => {
        dashboardCache.data = null;
        dashboardCache.timestamp = null;
        loadCriticalData();
    }, [loadCriticalData]);

    // Memoize stats cards to prevent unnecessary recalculations
    const statsCards = useMemo(
        () => [
            {
                title: "Total Announcements",
                value: dashboardData.stats.totalAnnouncements,
                change: `${dashboardData.stats.publishedAnnouncements} published`,
                changeType: "info",
                icon: Megaphone,
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50",
                textColor: "text-blue-600",
                description: "All announcements",
            },
            {
                title: "Published Content",
                value: dashboardData.stats.publishedAnnouncements,
                change: `${dashboardData.stats.draftAnnouncements} drafts`,
                changeType: "positive",
                icon: CheckCircle,
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-50",
                textColor: "text-green-600",
                description: "Live announcements",
            },
            {
                title: "Featured Content",
                value: dashboardData.stats.featuredAnnouncements,
                change: "On homepage",
                changeType: "info",
                icon: Star,
                color: "from-yellow-500 to-yellow-600",
                bgColor: "bg-yellow-50",
                textColor: "text-yellow-600",
                description: "Featured items",
            },
            {
                title: "Scheduled Posts",
                value: dashboardData.stats.scheduledAnnouncements,
                change: "Upcoming",
                changeType: "info",
                icon: Clock,
                color: "from-cyan-500 to-cyan-600",
                bgColor: "bg-cyan-50",
                textColor: "text-cyan-600",
                description: "Auto-publish queue",
            },
            {
                title: "Expiring Soon",
                value: dashboardData.stats.expiringAnnouncements,
                change: "Within 7 days",
                changeType: "warning",
                icon: AlertTriangle,
                color: "from-orange-500 to-orange-600",
                bgColor: "bg-orange-50",
                textColor: "text-orange-600",
                description: "Needs attention",
            },
        ],
        [dashboardData.stats]
    );

    const quickActions = [
        {
            name: "Announcements",
            icon: Megaphone,
            href: "/admin/news-events",
            description: "Manage announcements & events",
            color: "bg-blue-500 hover:bg-blue-600",
        },
        {
            name: "Gallery",
            icon: Images,
            href: "/admin/gallery",
            description: "Photo management",
            color: "bg-purple-500 hover:bg-purple-600",
        },
        {
            name: "Faculty & Staff",
            icon: Users,
            href: "/admin/staff-profiles",
            description: "Staff management",
            color: "bg-teal-500 hover:bg-teal-600",
        },
        {
            name: "Resources",
            icon: FileText,
            href: "/admin/resources",
            description: "File downloads",
            color: "bg-indigo-500 hover:bg-indigo-600",
        },
        {
            name: "Principal Corner",
            icon: BookOpen,
            href: "/admin/principal-corner",
            description: "Principal's messages",
            color: "bg-green-500 hover:bg-green-600",
        },
    ];

    // Skeleton component for loading states
    const SkeletonCard = () => (
        <Card className="relative overflow-hidden border-0 shadow-md h-full bg-white">
            <CardContent className="p-3 relative flex flex-col items-center justify-center text-center h-full min-h-[120px]">
                <div className="animate-pulse">
                    <div className="p-2.5 rounded-xl bg-gray-200 mb-2 w-12 h-12"></div>
                    <div className="h-6 bg-gray-200 rounded mb-1.5 w-16"></div>
                    <div className="h-4 bg-gray-200 rounded mb-1.5 w-20"></div>
                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                </div>
            </CardContent>
        </Card>
    );

    const SkeletonContent = () => (
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="animate-pulse p-3 border border-slate-200 rounded-xl bg-white"
                >
                    <div className="flex items-center space-x-3">
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="flex items-center space-x-3 mt-2">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (loading) {
        return (
            <DashboardContainer>
                {/* Header - Show immediately */}
                <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-lg px-4 py-3 text-white shadow-lg overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                    </div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Database className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold flex items-center">
                                    TNHS Admin Dashboard
                                    <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                </h1>
                                <p className="text-blue-100 text-sm flex items-center">
                                    <Activity className="h-3 w-3 mr-1" />
                                    Loading system data...
                                </p>
                            </div>
                        </div>
                        <div className="hidden md:block text-right">
                            <div className="text-sm font-medium flex items-center justify-end">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date().toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })}
                            </div>
                            <div className="text-blue-200 text-xs">
                                {new Date().toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skeleton Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>

                {/* Skeleton Quick Actions */}
                <Card className="relative overflow-hidden border-0 shadow-md bg-white">
                    <CardHeader className="relative bg-gradient-to-r from-slate-50 to-gray-50 p-4 border-b border-slate-100">
                        <CardTitle className="flex items-center text-slate-800 text-base font-semibold">
                            <div className="p-2 bg-slate-100 rounded-lg mr-3">
                                <Target className="h-5 w-5 text-slate-600" />
                            </div>
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative p-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="animate-pulse text-center p-4 rounded-xl border border-slate-200 bg-white"
                                >
                                    <div className="inline-flex p-3 rounded-lg bg-gray-200 mb-3 w-12 h-12"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-1 w-20 mx-auto"></div>
                                    <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </DashboardContainer>
        );
    }

    if (error) {
        return (
            <DashboardContainer className="mt-0">
                <Card className="border-red-200">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-2 text-red-600">
                            <AlertCircle className="h-5 w-5" />
                            <span>{error}</span>
                        </div>
                        <Button
                            onClick={refreshDashboard}
                            className="mt-4 bg-red-600 hover:bg-red-700"
                        >
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            </DashboardContainer>
        );
    }

    return (
        <DashboardContainer>
            {/* Header - ENHANCED COMPACT */}
            <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-lg px-4 py-3 text-white shadow-lg overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                </div>

                <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            <Database className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold flex items-center">
                                TNHS Admin Dashboard
                                <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            </h1>
                            <p className="text-blue-100 text-sm flex items-center">
                                <Activity className="h-3 w-3 mr-1" />
                                School management system
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className="text-sm font-medium flex items-center justify-end">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date().toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })}
                        </div>
                        <div className="text-blue-200 text-xs">
                            {new Date().toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid - 5 CARDS ENHANCED DESIGN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                {/* Performance Indicator */}
                {dashboardData.stats.expiringAnnouncements > 0 && (
                    <div className="col-span-full mb-2">
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center space-x-3">
                            <AlertTriangle className="h-5 w-5 text-orange-600" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-orange-800">
                                    {dashboardData.stats.expiringAnnouncements}{" "}
                                    announcement
                                    {dashboardData.stats.expiringAnnouncements >
                                    1
                                        ? "s"
                                        : ""}{" "}
                                    expiring within 7 days
                                </p>
                                <p className="text-xs text-orange-600">
                                    Review and extend if needed
                                </p>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                asChild
                                className="border-orange-300 text-orange-700 hover:bg-orange-100"
                            >
                                <Link to="/admin/announcements">Review</Link>
                            </Button>
                        </div>
                    </div>
                )}
                {statsCards.map((stat, index) => {
                    const Icon = stat.icon;
                    const changeColor =
                        stat.changeType === "positive"
                            ? "bg-green-100 text-green-800"
                            : stat.changeType === "warning"
                            ? "bg-orange-100 text-orange-800"
                            : stat.changeType === "negative"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800";

                    return (
                        <Card
                            key={index}
                            className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md h-full bg-white group"
                        >
                            {/* Enhanced Background Gradient */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-8`}
                            ></div>
                            {/* Enhanced Decorative Elements */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/15 rounded-full -mr-10 -mt-10"></div>
                            <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full -ml-6 -mb-6"></div>

                            <CardContent className="p-3 relative flex flex-col items-center justify-center text-center h-full min-h-[120px]">
                                {/* Centered Icon */}
                                <div
                                    className={`p-2.5 rounded-xl ${stat.bgColor} shadow-lg group-hover:shadow-xl transition-all duration-300 mb-2 group-hover:scale-110`}
                                >
                                    <Icon
                                        className={`h-5 w-5 ${stat.textColor}`}
                                    />
                                </div>

                                {/* Centered Value */}
                                <div className="text-xl font-bold text-slate-800 mb-1.5 group-hover:text-slate-900 transition-colors">
                                    {stat.value}
                                </div>

                                {/* Centered Title */}
                                <div className="text-sm font-semibold text-slate-700 mb-1.5">
                                    {stat.title}
                                </div>

                                {/* Centered Badge */}
                                <div
                                    className={`text-xs font-medium px-3 py-1 rounded-full ${changeColor} shadow-sm`}
                                >
                                    {stat.change}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions - ENHANCED DESIGN */}
            <Card className="relative overflow-hidden border-0 shadow-md bg-white">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-white to-gray-50 opacity-50"></div>

                <CardHeader className="relative bg-gradient-to-r from-slate-50 to-gray-50 p-4 border-b border-slate-100">
                    <CardTitle className="flex items-center text-slate-800 text-base font-semibold">
                        <div className="p-2 bg-slate-100 rounded-lg mr-3">
                            <Target className="h-5 w-5 text-slate-600" />
                        </div>
                        Quick Actions
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <Link
                                    key={index}
                                    to={action.href}
                                    className="group"
                                >
                                    <div className="relative text-center p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-white overflow-hidden">
                                        {/* Subtle background gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-50"></div>

                                        <div className="relative">
                                            <div
                                                className={`inline-flex p-3 rounded-xl ${action.color} mb-3 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 shadow-lg`}
                                            >
                                                <Icon className="h-5 w-5 text-white" />
                                            </div>
                                            <div className="text-sm font-semibold text-slate-800 mb-1">
                                                {action.name}
                                            </div>
                                            <div className="text-xs text-slate-600">
                                                {action.description}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Welcome Message for New Users */}
            {!loading &&
                !secondaryLoading &&
                dashboardData.stats.totalAnnouncements === 0 && (
                    <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
                        <CardContent className="p-6 text-center">
                            <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                                <Megaphone className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                Welcome to TNHS Admin Dashboard!
                            </h3>
                            <p className="text-slate-600 mb-4">
                                Get started by creating your first announcement
                                or exploring the quick actions below.
                            </p>
                            <Button
                                asChild
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Link to="/admin/news-events">
                                    Create First Announcement
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent School Highlights - ENHANCED */}
                <div className="lg:col-span-1">
                    <Card className="relative h-full border-0 shadow-md bg-white overflow-hidden">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-50"></div>

                        <CardHeader className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-blue-100">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center text-slate-800 text-base font-semibold">
                                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                        <Star className="h-5 w-5 text-blue-600" />
                                    </div>
                                    Recent School Highlights
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="border-blue-200 text-blue-600 hover:bg-blue-50 text-xs px-3 py-1.5 font-medium shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    <Link to="/admin/news-events">
                                        View All
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="relative p-4">
                            {secondaryLoading ? (
                                <SkeletonContent />
                            ) : !Array.isArray(dashboardData.announcements) ||
                              dashboardData.announcements.length === 0 ? (
                                <div className="text-center py-8 text-slate-500">
                                    <div className="p-4 bg-slate-100 rounded-full w-fit mx-auto mb-4">
                                        <Megaphone className="h-12 w-12 text-slate-400" />
                                    </div>
                                    <p className="font-medium mb-4">
                                        No announcements yet
                                    </p>
                                    <Button
                                        asChild
                                        className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <Link to="/admin/news-events">
                                            Create First Announcement
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {dashboardData.announcements
                                        .slice(0, 3)
                                        .map((announcement) => (
                                            <div
                                                key={announcement.id}
                                                className="relative flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-md transition-all duration-300 bg-white overflow-hidden"
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <h4 className="font-medium text-slate-800 line-clamp-1 text-sm">
                                                            {announcement.title}
                                                        </h4>
                                                        {announcement.is_featured && (
                                                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                                        )}
                                                        <span
                                                            className={`px-1.5 py-0.5 text-xs rounded-full font-medium ${
                                                                announcement.status ===
                                                                "published"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : announcement.status ===
                                                                      "draft"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : "bg-slate-100 text-slate-800"
                                                            }`}
                                                        >
                                                            {
                                                                announcement.status
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-3 text-xs text-slate-600">
                                                        <span className="flex items-center space-x-1">
                                                            <User className="h-3 w-3" />
                                                            <span>
                                                                {
                                                                    announcement.author
                                                                }
                                                            </span>
                                                        </span>
                                                        <span className="flex items-center space-x-1">
                                                            <CalendarIcon className="h-3 w-3" />
                                                            <span>
                                                                {new Date(
                                                                    announcement.created_at
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        </span>
                                                        <span className="flex items-center space-x-1">
                                                            <Tag className="h-3 w-3" />
                                                            <span>
                                                                {
                                                                    announcement.category
                                                                }
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                        className="text-slate-600 hover:bg-slate-100"
                                                    >
                                                        <Link
                                                            to={`/admin/news-events`}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent School Events - ENHANCED */}
                <div className="lg:col-span-1">
                    <Card className="relative h-full border-0 shadow-md bg-white overflow-hidden">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 opacity-50"></div>

                        <CardHeader className="relative bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-green-100">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center text-slate-800 text-base font-semibold">
                                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                                        <CalendarIcon className="h-5 w-5 text-green-600" />
                                    </div>
                                    Recent School Events
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="border-green-200 text-green-600 hover:bg-green-50 text-xs px-3 py-1.5 font-medium shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    <Link to="/admin/news-events">
                                        View All
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="relative p-4">
                            {secondaryLoading ? (
                                <SkeletonContent />
                            ) : !Array.isArray(dashboardData.events) ||
                              dashboardData.events.length === 0 ? (
                                <div className="text-center py-8 text-slate-500">
                                    <div className="p-4 bg-slate-100 rounded-full w-fit mx-auto mb-4">
                                        <CalendarIcon className="h-12 w-12 text-slate-400" />
                                    </div>
                                    <p className="font-medium mb-4">
                                        No events yet
                                    </p>
                                    <Button
                                        asChild
                                        className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <Link to="/admin/news-events">
                                            Create First Event
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {dashboardData.events
                                        .slice(0, 3)
                                        .map((event) => (
                                            <div
                                                key={event.id}
                                                className="relative flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-md transition-all duration-300 bg-white overflow-hidden"
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <h4 className="font-medium text-slate-800 line-clamp-1 text-sm">
                                                            {event.title}
                                                        </h4>
                                                        {event.is_featured && (
                                                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                                        )}
                                                        <span
                                                            className={`px-1.5 py-0.5 text-xs rounded-full font-medium ${
                                                                event.status ===
                                                                "published"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : event.status ===
                                                                      "draft"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : "bg-slate-100 text-slate-800"
                                                            }`}
                                                        >
                                                            {event.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-3 text-xs text-slate-600">
                                                        <span className="flex items-center space-x-1">
                                                            <User className="h-3 w-3" />
                                                            <span>
                                                                {event.author}
                                                            </span>
                                                        </span>
                                                        <span className="flex items-center space-x-1">
                                                            <CalendarIcon className="h-3 w-3" />
                                                            <span>
                                                                {new Date(
                                                                    event.event_date ||
                                                                        event.created_at
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        </span>
                                                        <span className="flex items-center space-x-1">
                                                            <Tag className="h-3 w-3" />
                                                            <span>
                                                                {event.category}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                        className="text-slate-600 hover:bg-slate-100"
                                                    >
                                                        <Link
                                                            to={`/admin/news-events`}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* System Status Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>System Online</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Database className="h-4 w-4 text-blue-500" />
                            <span>Database Connected</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-purple-500" />
                            <span>Scheduler Active</span>
                        </div>
                    </div>
                    <div className="text-xs text-slate-500">
                        Last updated: {new Date().toLocaleTimeString()}
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default AdminDashboard;
