import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import {
    Users,
    Megaphone,
    Calendar,
    TrendingUp,
    Plus,
    Edit,
    Eye,
    BookOpen,
    Phone,
    FileText,
    Images,
    Activity,
    Clock,
    CheckCircle,
    AlertCircle,
    ArrowUp,
    ArrowDown,
    BarChart3,
    PieChart,
    Target,
    Award,
    GraduationCap,
    UserCheck,
    Download,
    ExternalLink,
    School,
    Settings,
    Database,
    Shield,
    Zap,
} from "lucide-react";

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        stats: {
            totalStudents: 1247,
            activeAnnouncements: 8,
            upcomingEvents: 5,
            enrollmentRate: 94,
            totalPrograms: 12,
            staffMembers: 45,
            downloads: 156,
            pageViews: 2847,
        },
        recentActivity: [],
        systemHealth: {
            uptime: "99.9%",
            lastBackup: "2 hours ago",
            storageUsed: "68%",
        },
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading dashboard data
        const loadDashboardData = async () => {
            setLoading(true);
            // In a real app, this would fetch from your API
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };
        loadDashboardData();
    }, []);

    const stats = [
        {
            title: "Total Students",
            value: dashboardData.stats.totalStudents.toLocaleString(),
            change: "+12%",
            changeType: "positive",
            icon: Users,
            color: "from-royal-blue to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-royal-blue",
            description: "Enrolled students",
        },
        {
            title: "Active Announcements",
            value: dashboardData.stats.activeAnnouncements,
            change: "+2",
            changeType: "positive",
            icon: Megaphone,
            color: "from-royal-blue to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-royal-blue",
            description: "Published announcements",
        },
        {
            title: "Academic Programs",
            value: dashboardData.stats.totalPrograms,
            change: "+1",
            changeType: "positive",
            icon: BookOpen,
            color: "from-royal-blue to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-royal-blue",
            description: "Active programs",
        },
        {
            title: "Staff Members",
            value: dashboardData.stats.staffMembers,
            change: "+3",
            changeType: "positive",
            icon: UserCheck,
            color: "from-royal-blue to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-royal-blue",
            description: "Faculty & staff",
        },
        {
            title: "Downloads",
            value: dashboardData.stats.downloads,
            change: "+24",
            changeType: "positive",
            icon: Download,
            color: "from-royal-blue to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-royal-blue",
            description: "This month",
        },
        {
            title: "Page Views",
            value: dashboardData.stats.pageViews.toLocaleString(),
            change: "+8%",
            changeType: "positive",
            icon: TrendingUp,
            color: "from-royal-blue to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-royal-blue",
            description: "This month",
        },
    ];

    const recentAnnouncements = [
        {
            id: 1,
            title: "Enrollment for School Year 2024-2025 Now Open",
            date: "August 30, 2024",
            status: "Published",
            author: "Admin",
            views: 245,
            priority: "high",
        },
        {
            id: 2,
            title: "Academic Excellence Awards Ceremony",
            date: "August 25, 2024",
            status: "Published",
            author: "Principal",
            views: 189,
            priority: "medium",
        },
        {
            id: 3,
            title: "Parent-Teacher Conference Schedule",
            date: "August 20, 2024",
            status: "Draft",
            author: "Admin",
            views: 0,
            priority: "low",
        },
        {
            id: 4,
            title: "STEM Program Applications Open",
            date: "August 15, 2024",
            status: "Published",
            author: "STEM Coordinator",
            views: 156,
            priority: "high",
        },
    ];

    const quickActions = [
        {
            name: "Create Announcement",
            icon: Megaphone,
            href: "/admin/announcements",
            description: "Post new school announcements",
            color: "bg-[#03AED2] hover:bg-[#68D2E8]",
        },
        {
            name: "Add Academic Program",
            icon: BookOpen,
            href: "/admin/academic-programs",
            description: "Create new academic programs",
            color: "bg-[#03AED2] hover:bg-[#68D2E8]",
        },
        {
            name: "Manage Staff",
            icon: UserCheck,
            href: "/admin/staff-profiles",
            description: "Update staff profiles",
            color: "bg-[#03AED2] hover:bg-[#68D2E8]",
        },
        {
            name: "Upload Files",
            icon: Download,
            href: "/admin/download-files",
            description: "Add downloadable resources",
            color: "bg-[#03AED2] hover:bg-[#68D2E8]",
        },
    ];

    const systemMetrics = [
        {
            title: "System Uptime",
            value: dashboardData.systemHealth.uptime,
            icon: Activity,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Last Backup",
            value: dashboardData.systemHealth.lastBackup,
            icon: Clock,
            color: "text-slate-600",
            bgColor: "bg-slate-50",
        },
        {
            title: "Storage Used",
            value: dashboardData.systemHealth.storageUsed,
            icon: BarChart3,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
    ];

    const placeholderFeatures = [
        {
            title: "Content Management",
            description: "Manage website content and pages",
            icon: FileText,
            status: "In Development",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "User Management",
            description: "Manage admin users and permissions",
            icon: Users,
            status: "In Development",
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Analytics Dashboard",
            description: "View website analytics and reports",
            icon: BarChart3,
            status: "Planned",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Email Notifications",
            description: "Send automated email notifications",
            icon: Megaphone,
            status: "Planned",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto"></div>
                    <p className="mt-4 text-slate-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl px-6 py-4 text-white shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Welcome to TNHS Admin Panel
                        </h1>
                        <p className="text-white/80 text-sm">
                            Manage your school's digital presence and content.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="text-right">
                            <div className="text-xl font-semibold">
                                {new Date().toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                            <div className="text-white/80 text-sm">
                                {new Date().toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card
                            key={index}
                            className="relative overflow-hidden hover:shadow-lg transition-all duration-200 border-blue-100"
                        >
                            <div
                                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-10 -mt-10`}
                            ></div>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`p-2 rounded-lg ${stat.bgColor}`}
                                    >
                                        <Icon
                                            className={`h-5 w-5 ${stat.textColor}`}
                                        />
                                    </div>
                                    <div
                                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                                            stat.changeType === "positive"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {stat.change}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-royal-blue mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-royal-blue">
                                    {stat.title}
                                </div>
                                <div className="text-xs text-blue-700 mt-1">
                                    {stat.description}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="lg:col-span-1">
                    <Card className="h-full border-blue-100">
                        <CardHeader>
                            <CardTitle className="flex items-center text-royal-blue">
                                <Target className="mr-2 h-5 w-5 text-royal-blue" />
                                Quick Actions
                            </CardTitle>
                            <CardDescription className="text-blue-700">
                                Common administrative tasks
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {quickActions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <Link
                                        key={index}
                                        to={action.href}
                                        className="block"
                                    >
                                        <div className="flex items-center p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 group">
                                            <div
                                                className={`p-2 rounded-lg ${action.color} text-white mr-3 group-hover:scale-110 transition-transform duration-200`}
                                            >
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-royal-blue">
                                                    {action.name}
                                                </div>
                                                <div className="text-sm text-blue-700">
                                                    {action.description}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Announcements */}
                <div className="lg:col-span-2">
                    <Card className="h-full border-blue-100">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center text-royal-blue">
                                        <Megaphone className="mr-2 h-5 w-5 text-royal-blue" />
                                        Recent Announcements
                                    </CardTitle>
                                    <CardDescription className="text-blue-700">
                                        Latest announcements and updates
                                    </CardDescription>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="border-blue-200 text-royal-blue hover:bg-blue-50"
                                >
                                    <Link to="/admin/announcements">
                                        View All
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentAnnouncements.map((announcement) => (
                                    <div
                                        key={announcement.id}
                                        className="flex items-center justify-between p-4 border border-blue-100 rounded-xl hover:bg-blue-50 transition-all duration-200"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h4 className="font-medium text-royal-blue">
                                                    {announcement.title}
                                                </h4>
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${
                                                        announcement.priority ===
                                                        "high"
                                                            ? "bg-red-100 text-red-800"
                                                            : announcement.priority ===
                                                              "medium"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-slate-100 text-slate-800"
                                                    }`}
                                                >
                                                    {announcement.priority}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-blue-700">
                                                <span>{announcement.date}</span>
                                                <span>•</span>
                                                <span>
                                                    By {announcement.author}
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    {announcement.views} views
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span
                                                className={`px-3 py-1 text-xs rounded-full font-medium ${
                                                    announcement.status ===
                                                    "Published"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {announcement.status}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-slate-600 hover:bg-slate-100"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Placeholder Features */}
            <Card className="border-blue-100">
                <CardHeader>
                    <CardTitle className="flex items-center text-royal-blue">
                        <Zap className="mr-2 h-5 w-5 text-royal-blue" />
                        Upcoming Features
                    </CardTitle>
                    <CardDescription className="text-blue-700">
                        Features currently in development or planned
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {placeholderFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50 border border-blue-100"
                                >
                                    <div
                                        className={`p-3 rounded-lg ${feature.bgColor}`}
                                    >
                                        <Icon
                                            className={`h-6 w-6 ${feature.color}`}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-royal-blue mb-1">
                                            {feature.title}
                                        </div>
                                        <div className="text-xs text-blue-700 mb-2">
                                            {feature.description}
                                        </div>
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                                                feature.status ===
                                                "In Development"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {feature.status}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* System Health */}
            <Card className="border-blue-100">
                <CardHeader>
                    <CardTitle className="flex items-center text-royal-blue">
                        <Activity className="mr-2 h-5 w-5 text-royal-blue" />
                        System Health
                    </CardTitle>
                    <CardDescription className="text-blue-700">
                        Current system status and metrics
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {systemMetrics.map((metric, index) => {
                            const Icon = metric.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 p-4 rounded-xl bg-blue-50 border border-blue-100"
                                >
                                    <div
                                        className={`p-3 rounded-lg ${metric.bgColor}`}
                                    >
                                        <Icon
                                            className={`h-6 w-6 ${metric.color}`}
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-royal-blue">
                                            {metric.title}
                                        </div>
                                        <div className="text-lg font-bold text-royal-blue">
                                            {metric.value}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;
