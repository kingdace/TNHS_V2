import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
    Menu,
    X,
    GraduationCap,
    BarChart3,
    Megaphone,
    Users,
    Settings,
    LogOut,
    Images,
    Home,
} from "lucide-react";
import { adminAuthService } from "../../services/adminAuthService";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: BarChart3 },
        {
            name: "Hero Carousel",
            href: "/admin/hero-carousel",
            icon: Images,
        },
        {
            name: "Announcements",
            href: "/admin/announcements",
            icon: Megaphone,
        },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    const isActive = (path) => location.pathname === path;

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const authData = await adminAuthService.checkAuth();
            if (authData.authenticated) {
                setUser(authData.user);
            } else {
                navigate("/admin/login");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            navigate("/admin/login");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            console.log("Starting logout process...");
            const response = await adminAuthService.logout();
            console.log("Logout response:", response);

            // Clear user state
            setUser(null);

            if (response.success) {
                console.log("Logout successful, redirecting to login...");
                navigate("/admin/login");
            } else {
                console.error("Logout failed:", response.message);
                // Force logout even if API call fails
                navigate("/admin/login");
            }
        } catch (error) {
            console.error("Logout error:", error);
            // Clear user state even on error
            setUser(null);
            // Force logout even if API call fails
            navigate("/admin/login");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b">
                    <div className="flex items-center space-x-2">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                TNHS Admin
                            </h1>
                            <p className="text-xs text-gray-600">
                                Taft National High School
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="mt-6 px-3">
                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                        isActive(item.href)
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                    <div className="space-y-2">
                        <Link
                            to="/"
                            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                            <Home className="mr-3 h-5 w-5" />
                            View Website
                        </Link>
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="md:ml-64">
                {/* Top bar */}
                <div className="bg-white shadow-sm border-b px-4 py-3">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                Welcome, {user?.name || "Admin"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
