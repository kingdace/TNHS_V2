import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../../contexts/AuthContext";
import {
    Menu,
    X,
    GraduationCap,
    BarChart3,
    Megaphone,
    Users,
    Settings,
    Images,
    Home,
    BookOpen,
    Info,
    Phone,
    LogOut,
    User,
    FileText,
} from "lucide-react";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: BarChart3 },
        {
            name: "Hero Carousel",
            href: "/admin/hero-carousel",
            icon: Images,
        },
        {
            name: "Academic Programs",
            href: "/admin/academic-programs",
            icon: BookOpen,
        },
        {
            name: "Announcements",
            href: "/admin/announcements",
            icon: Megaphone,
        },
        {
            name: "School Info",
            href: "/admin/school-info",
            icon: Info,
        },
        {
            name: "Contact Info",
            href: "/admin/contact-info",
            icon: Phone,
        },
        {
            name: "Page Content",
            href: "/admin/page-content",
            icon: FileText,
        },
        {
            name: "Users",
            href: "/admin/users",
            icon: Users,
        },
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div
                className={`fixed inset-0 z-50 lg:hidden ${
                    isSidebarOpen ? "block" : "hidden"
                }`}
            >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>
                    </div>
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <GraduationCap className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">
                                TNHS Admin
                            </span>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`${
                                            isActive(item.href)
                                                ? "bg-blue-100 text-blue-900"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        <Icon
                                            className={`${
                                                isActive(item.href)
                                                    ? "text-blue-500"
                                                    : "text-gray-400 group-hover:text-gray-500"
                                            } mr-4 h-6 w-6`}
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <GraduationCap className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">
                                TNHS Admin
                            </span>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`${
                                            isActive(item.href)
                                                ? "bg-blue-100 text-blue-900"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                                    >
                                        <Icon
                                            className={`${
                                                isActive(item.href)
                                                    ? "text-blue-500"
                                                    : "text-gray-400 group-hover:text-gray-500"
                                            } mr-3 h-6 w-6`}
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64 flex flex-col flex-1">
                {/* Top bar */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        {/* User menu */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <User className="h-5 w-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700">
                                    {user?.name || "Admin"}
                                </span>
                                <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded-full">
                                    {user?.role || "admin"}
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="flex items-center space-x-1"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
