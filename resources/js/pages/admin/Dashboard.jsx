import React from "react";
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
} from "lucide-react";

const AdminDashboard = () => {
    const stats = [
        {
            title: "Total Students",
            value: "1,247",
            change: "+12%",
            changeType: "positive",
            icon: Users,
            color: "text-blue-600",
        },
        {
            title: "Active Announcements",
            value: "8",
            change: "+2",
            changeType: "positive",
            icon: Megaphone,
            color: "text-green-600",
        },
        {
            title: "Upcoming Events",
            value: "5",
            change: "-1",
            changeType: "negative",
            icon: Calendar,
            color: "text-purple-600",
        },
        {
            title: "Enrollment Rate",
            value: "94%",
            change: "+3%",
            changeType: "positive",
            icon: TrendingUp,
            color: "text-orange-600",
        },
    ];

    const recentAnnouncements = [
        {
            title: "Enrollment for School Year 2024-2025 Now Open",
            date: "August 30, 2024",
            status: "Published",
        },
        {
            title: "Academic Excellence Awards Ceremony",
            date: "August 25, 2024",
            status: "Published",
        },
        {
            title: "Parent-Teacher Conference Schedule",
            date: "August 20, 2024",
            status: "Draft",
        },
    ];

    const quickActions = [
        {
            name: "Create Announcement",
            icon: Plus,
            href: "/admin/announcements",
            variant: "default",
        },
        {
            name: "Manage Users",
            icon: Users,
            href: "/admin/users",
            variant: "outline",
        },
        {
            name: "View Reports",
            icon: Eye,
            href: "/admin/reports",
            variant: "outline",
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">
                    Welcome back! Here's what's happening at TNHS today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    {stat.title}
                                </CardTitle>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">
                                    {stat.value}
                                </div>
                                <p
                                    className={`text-xs ${
                                        stat.changeType === "positive"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {stat.change} from last month
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common administrative tasks
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {quickActions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <Button
                                        key={index}
                                        variant={action.variant}
                                        className="w-full justify-start"
                                        asChild
                                    >
                                        <Link to={action.href}>
                                            <Icon className="mr-2 h-4 w-4" />
                                            {action.name}
                                        </Link>
                                    </Button>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Announcements */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Recent Announcements</CardTitle>
                                    <CardDescription>
                                        Latest announcements and updates
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/admin/announcements">
                                        View All
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentAnnouncements.map(
                                    (announcement, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 border rounded-lg"
                                        >
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">
                                                    {announcement.title}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {announcement.date}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${
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
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
