import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NotificationBell from "../NotificationBell";
import {
    Menu,
    X,
    Home,
    Users,
    FileText,
    Settings,
    LogOut,
    Bell,
    Search,
    ChevronDown,
    User,
    GraduationCap,
    BookOpen,
    School,
    Phone,
    Download,
    ExternalLink,
    UserCheck,
    Calendar,
    Image,
    TrendingUp,
    Clock,
    Shield,
    Target,
    Award,
    Crown,
} from "lucide-react";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const userMenuRef = useRef(null);

    const navigation = [
        // Core Management
        {
            name: "Dashboard",
            description: "Overview and statistics",
            href: "/admin",
            icon: Home,
        },

        // Content Management
        {
            name: "Announcements",
            description: "News and events management",
            href: "/admin/news-events",
            icon: Bell,
        },
        {
            name: "Principal Corner",
            description: "Principal's messages",
            href: "/admin/principal-corner",
            icon: Crown,
        },
        {
            name: "Hero Carousel",
            description: "Homepage slideshow",
            href: "/admin/hero-carousel",
            icon: Image,
        },

        // Academic Management
        {
            name: "Academic Programs",
            description: "Manage academic programs",
            href: "/admin/academic-programs",
            icon: BookOpen,
        },
        {
            name: "Junior High Content",
            description: "Manage Junior High page content",
            href: "/admin/junior-high-content",
            icon: School,
        },
        {
            name: "ALS Content",
            description: "Manage ALS program content",
            href: "/admin/als-content",
            icon: GraduationCap,
        },
        {
            name: "Senior High Strands",
            description: "Manage Senior High strands",
            href: "/admin/senior-high-strands",
            icon: School,
        },

        // People Management
        {
            name: "Faculty & Staff",
            description: "Staff management",
            href: "/admin/staff-profiles",
            icon: Users,
        },

        // Media Management
        {
            name: "Gallery",
            description: "Photo management",
            href: "/admin/gallery",
            icon: Image,
        },
        {
            name: "Resources",
            description: "File downloads",
            href: "/admin/resources",
            icon: Download,
        },
        // Hidden - Duplicate functionality with Resources
        // {
        //     name: "Download Files",
        //     description: "Manage downloadable files",
        //     href: "/admin/download-files",
        //     icon: Download,
        // },
        // {
        //     name: "External Links",
        //     description: "Manage external links",
        //     href: "/admin/external-links",
        //     icon: ExternalLink,
        // },

        // Contact Management
        {
            name: "Contact Information",
            description: "Manage contact details",
            href: "/admin/contact-info",
            icon: Phone,
        },

        // Enrollment Management
        {
            name: "Enrollment Guidelines",
            description: "Manage enrollment information",
            href: "/admin/enrollment-guidelines",
            icon: GraduationCap,
        },

        // Site Management
        {
            name: "About Management",
            description: "School information",
            href: "/admin/about",
            icon: FileText,
        },
    ];

    const isActive = (href) => {
        return location.pathname === href;
    };

    const isParentActive = (children) => {
        if (!children) return false;
        return children.some((child) => isActive(child.href));
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target)
            ) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getCurrentDate = () => {
        const now = new Date();
        return now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getCurrentPageTitle = () => {
        const path = location.pathname;
        if (path === "/admin") return "Dashboard";
        if (path.includes("/admin/news-events"))
            return "Announcements Management";
        if (path.includes("/admin/principal-corner")) return "Principal Corner";
        if (path.includes("/admin/hero-carousel")) return "Hero Carousel";
        if (path.includes("/admin/staff-profiles")) return "Faculty & Staff";
        if (path.includes("/admin/gallery")) return "Gallery Management";
        if (path.includes("/admin/resources")) return "Resources Management";
        if (path.includes("/admin/about")) return "About Management";
        if (path.includes("/admin/contact-info")) return "Contact Information";
        if (path.includes("/admin/academic-programs"))
            return "Academic Programs";
        if (path.includes("/admin/enrollment-guidelines"))
            return "Enrollment Guidelines";
        if (path.includes("/admin/junior-high-content"))
            return "Junior High Content";
        if (path.includes("/admin/als-content")) return "ALS Content";
        if (path.includes("/admin/senior-high-strands"))
            return "Senior High Strands";
        if (path.includes("/admin/page-content")) return "Page Content";
        if (path.includes("/admin/users")) return "User Management";
        if (path.includes("/admin/download-files")) return "Download Files";
        if (path.includes("/admin/external-links")) return "External Links";

        return "Admin Panel";
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Full-width Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 shadow-xl border-b border-blue-700/30">
                <div className="h-16 flex items-center justify-between px-4">
                    {/* Left side - Brand and Toggle */}
                    <div className="flex items-center space-x-3">
                        <button
                            type="button"
                            className="h-10 w-10 inline-flex items-center justify-center rounded-lg text-blue-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all duration-200"
                            onClick={() =>
                                setIsSidebarCollapsed(!isSidebarCollapsed)
                            }
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center shadow-lg overflow-hidden bg-white/10 backdrop-blur-sm">
                                <img
                                    src="/images/Logo.jpg"
                                    alt="TNHS Logo"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">
                                    Taft National High School
                                </h1>
                                <p className="text-xs text-blue-200">
                                    School Management System
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Center - Brand Tag & Date */}
                    <div className="hidden md:flex flex-col items-center">
                        <span className="text-lg font-bold text-white tracking-widest font-mono">
                            PASEO. VERDE. STORM.
                        </span>
                        <p className="text-xs text-blue-200 -mt-1">
                            {getCurrentDate()}
                        </p>
                    </div>

                    {/* Right side - Essential Actions */}
                    <div className="flex items-center space-x-3">
                        {/* Time */}
                        <div className="hidden lg:flex items-center space-x-2 text-sm text-blue-100 bg-white/5 px-3 py-1.5 rounded-lg">
                            <Clock className="h-4 w-4" />
                            <span>{getCurrentTime()}</span>
                        </div>

                        {/* Notifications */}
                        <NotificationBell />

                        {/* User Menu */}
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() =>
                                    setIsUserMenuOpen(!isUserMenuOpen)
                                }
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all duration-200"
                            >
                                <div className="h-8 w-8 rounded-full flex items-center justify-center shadow-sm overflow-hidden bg-white/10 backdrop-blur-sm">
                                    <img
                                        src="/images/Logo.jpg"
                                        alt="TNHS Logo"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="hidden md:block text-left">
                                    <div className="text-sm font-medium text-white">
                                        {user?.name || "Admin"}
                                    </div>
                                </div>
                                <ChevronDown className="h-4 w-4 text-slate-300" />
                            </button>

                            {/* User dropdown */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <div className="text-sm font-medium text-gray-900">
                                            {user?.name || "Admin"}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {user?.role || "Administrator"}
                                        </div>
                                    </div>
                                    <Link
                                        to="/admin/profile"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        <User className="mr-3 h-4 w-4" />
                                        Profile
                                    </Link>
                                    <Link
                                        to="/admin/settings"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        <Settings className="mr-3 h-4 w-4" />
                                        Settings
                                    </Link>
                                    <hr className="my-2" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut className="mr-3 h-4 w-4" />
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-16 left-0 bottom-0 z-40 transition-all duration-300 ${
                    isSidebarCollapsed ? "w-16" : "w-72"
                }`}
            >
                <div className="h-full flex flex-col bg-white border-r border-gray-200 shadow-sm">
                    {/* Navigation Content */}
                    <div className="flex-1 flex flex-col overflow-y-auto sidebar-scrollbar">
                        {/* Navigation */}
                        <nav
                            className={`flex-1 py-6 ${
                                isSidebarCollapsed
                                    ? "space-y-0.5 px-2"
                                    : "space-y-1 px-4"
                            }`}
                        >
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const hasChildren =
                                    item.children && item.children.length > 0;
                                const isItemActive =
                                    isActive(item.href) ||
                                    isParentActive(item.children);

                                return (
                                    <div key={item.name}>
                                        <Link
                                            to={item.href}
                                            className={`${
                                                isSidebarCollapsed
                                                    ? isItemActive
                                                        ? "mx-2 rounded-xl relative"
                                                        : "text-gray-600 hover:bg-white mx-2 rounded-xl"
                                                    : isItemActive
                                                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                                                    : "text-gray-700 hover:bg-white"
                                            } group flex items-center ${
                                                isSidebarCollapsed
                                                    ? "justify-center py-2 px-3"
                                                    : "px-4 py-3"
                                            } text-sm font-medium rounded-lg transition-all duration-200`}
                                            title={
                                                isSidebarCollapsed
                                                    ? item.name
                                                    : ""
                                            }
                                        >
                                            {isSidebarCollapsed ? (
                                                <div
                                                    className={`${
                                                        isItemActive
                                                            ? "bg-blue-500 shadow-lg shadow-blue-500/30"
                                                            : "bg-gray-200"
                                                    } p-2.5 rounded-xl`}
                                                >
                                                    <Icon
                                                        className={`${
                                                            isItemActive
                                                                ? "text-white"
                                                                : "text-gray-600"
                                                        } h-5 w-5`}
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    <div
                                                        className={`${
                                                            isItemActive
                                                                ? "bg-blue-100"
                                                                : "bg-gray-100"
                                                        } p-2 rounded-lg mr-3 flex-shrink-0`}
                                                    >
                                                        <Icon
                                                            className={`${
                                                                isItemActive
                                                                    ? "text-blue-600"
                                                                    : "text-gray-600"
                                                            } h-5 w-5`}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div
                                                            className={`font-semibold ${
                                                                isItemActive
                                                                    ? "text-gray-900"
                                                                    : "text-gray-900"
                                                            }`}
                                                        >
                                                            {item.name}
                                                        </div>
                                                        <div
                                                            className={`text-xs ${
                                                                isItemActive
                                                                    ? "text-gray-600"
                                                                    : "text-gray-500"
                                                            }`}
                                                        >
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                    {hasChildren && (
                                                        <ChevronDown className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </>
                                            )}
                                        </Link>
                                    </div>
                                );
                            })}
                        </nav>

                        {/* Bottom Section - Only show when not collapsed */}
                        {!isSidebarCollapsed && (
                            <div className="px-4 py-4 border-t border-gray-100">
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-700">
                                        Taft National High School
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        © 2025 All rights reserved.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div
                className={`pt-16 transition-all duration-300 ${
                    isSidebarCollapsed ? "ml-16" : "ml-72"
                }`}
            >
                <div className="flex flex-col flex-1 min-h-screen">
                    {/* Page content */}
                    <main className="flex-1 p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
