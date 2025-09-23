import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
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
        {
            name: "Dashboard",
            href: "/admin",
            icon: Home,
        },
        {
            name: "Announcements",
            href: "/admin/announcements",
            icon: Bell,
            // badge: "3",
        },
        {
            name: "Hero Carousel",
            href: "/admin/hero-carousel",
            icon: Image,
        },
        {
            name: "Events",
            href: "/admin/events",
            icon: Calendar,
        },
        {
            name: "Academic Programs",
            href: "/admin/academic-programs",
            icon: BookOpen,
        },
        {
            name: "School Information",
            href: "/admin/school-info",
            icon: School,
        },
        {
            name: "Contact Information",
            href: "/admin/contact-info",
            icon: Phone,
        },
        {
            name: "Page Content",
            href: "/admin/page-content",
            icon: FileText,
        },
        {
            name: "Staff Profiles",
            href: "/admin/staff-profiles",
            icon: UserCheck,
        },
        {
            name: "Download Files",
            href: "/admin/download-files",
            icon: Download,
        },
        {
            name: "External Links",
            href: "/admin/external-links",
            icon: ExternalLink,
        },
        {
            name: "User Management",
            href: "/admin/users",
            icon: Users,
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
        if (path.includes("/admin/announcements")) return "Announcements";
        if (path.includes("/admin/hero-carousel")) return "Hero Carousel";
        if (path.includes("/admin/academic-programs"))
            return "Academic Programs";
        if (path.includes("/admin/school-info")) return "School Information";
        if (path.includes("/admin/contact-info")) return "Contact Information";
        if (path.includes("/admin/page-content")) return "Page Content";
        if (path.includes("/admin/users")) return "User Management";
        if (path.includes("/admin/staff-profiles")) return "Staff Profiles";
        if (path.includes("/admin/download-files")) return "Download Files";
        if (path.includes("/admin/external-links")) return "External Links";

        return "Admin Panel";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Full-width Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg border-b border-blue-800/20">
                <div className="h-16 flex items-center justify-between px-4">
                    {/* Left side - Brand and Toggle */}
                    <div className="flex items-center space-x-3">
                        <button
                            type="button"
                            className="h-10 w-10 inline-flex items-center justify-center rounded-lg text-blue-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-200/50 transition-all duration-200"
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
                                <p className="text-xs text-blue-100">
                                    Content Management System
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Essential Actions */}
                    <div className="flex items-center space-x-3 ml-auto">
                        {/* Search */}
                        <div className="hidden lg:block">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-100 z-10" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 w-48 bg-white/10 border border-blue-300/30 rounded-lg focus:ring-2 focus:ring-blue-300/50 focus:border-blue-300/50 text-sm text-white placeholder-blue-100/80"
                                />
                            </div>
                        </div>

                        {/* Time */}
                        <div className="hidden lg:flex items-center space-x-2 text-sm text-blue-100">
                            <Clock className="h-4 w-4" />
                            <span>{getCurrentTime()}</span>
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 text-blue-100 hover:bg-white/10 rounded-lg transition-all duration-200">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border border-blue-900"></span>
                        </button>

                        {/* User Menu */}
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() =>
                                    setIsUserMenuOpen(!isUserMenuOpen)
                                }
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-200/50 transition-all duration-200"
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
                                <ChevronDown className="h-4 w-4 text-blue-100" />
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
                <div className="h-full flex flex-col bg-blue-50/90 backdrop-blur-xl border-r border-blue-100 shadow-xl">
                    {/* Navigation Content */}
                    <div className="flex-1 flex flex-col overflow-y-auto sidebar-scrollbar">
                        {/* Navigation */}
                        <nav className="flex-1 px-4 py-6 space-y-2">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const hasChildren =
                                    item.children && item.children.length > 0;
                                const isItemActive =
                                    isActive(item.href) ||
                                    isParentActive(item.children);

                                return (
                                    <div key={item.name} className="space-y-1">
                                        <Link
                                            to={item.href}
                                            className={`${
                                                isItemActive
                                                    ? "bg-gradient-to-r from-royal-blue to-blue-600 text-white shadow-lg"
                                                    : "text-royal-blue hover:bg-blue-50 hover:text-blue-800 hover:shadow-sm"
                                            } group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                                                isSidebarCollapsed
                                                    ? "justify-center"
                                                    : ""
                                            }`}
                                            title={
                                                isSidebarCollapsed
                                                    ? item.name
                                                    : ""
                                            }
                                        >
                                            <Icon
                                                className={`${
                                                    isItemActive
                                                        ? "text-white"
                                                        : "text-blue-700 group-hover:text-blue-800"
                                                } h-5 w-5 flex-shrink-0 ${
                                                    isSidebarCollapsed
                                                        ? ""
                                                        : "mr-3"
                                                }`}
                                            />
                                            {!isSidebarCollapsed && (
                                                <>
                                                    <span className="flex-1 font-medium">
                                                        {item.name}
                                                    </span>
                                                    {item.badge && (
                                                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </Link>
                                        {hasChildren &&
                                            isItemActive &&
                                            !isSidebarCollapsed && (
                                                <div className="ml-4 space-y-1">
                                                    {item.children.map(
                                                        (child) => {
                                                            const ChildIcon =
                                                                child.icon;
                                                            return (
                                                                <Link
                                                                    key={
                                                                        child.name
                                                                    }
                                                                    to={
                                                                        child.href
                                                                    }
                                                                    className={`${
                                                                        isActive(
                                                                            child.href
                                                                        )
                                                                            ? "bg-blue-50 text-blue-800 border-l-2 border-royal-blue"
                                                                            : "text-blue-700 hover:text-blue-800 hover:bg-blue-50"
                                                                    } flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200`}
                                                                >
                                                                    <ChildIcon className="mr-3 h-4 w-4 flex-shrink-0" />
                                                                    <span className="font-medium">
                                                                        {
                                                                            child.name
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                );
                            })}
                        </nav>

                        {/* User Info - Only show when not collapsed */}
                        {!isSidebarCollapsed && (
                            <div className="px-4 py-4 border-t border-blue-100">
                                <div className="text-center">
                                    <p className="text-sm font-medium text-blue-900">
                                        {user?.name || "Admin User"}
                                    </p>
                                    <p className="text-xs text-blue-700">
                                        {user?.role || "Administrator"}
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
