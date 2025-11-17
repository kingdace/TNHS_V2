import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { publicService } from "../../../services/publicService";
import {
    ChevronRight,
    Home,
    ChevronDown,
    ChevronUp,
    Users,
    Loader2,
} from "lucide-react";

const Staff = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [allStaff, setAllStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAllStaff();
    }, []);

    const fetchAllStaff = async () => {
        try {
            setLoading(true);
            // Fetch all staff types except assistant principals (they have their own page)
            const [teachers, adminStaff, supportStaff] = await Promise.all([
                publicService.staffProfiles.getByType("teacher"),
                publicService.staffProfiles.getByType("admin"),
                publicService.staffProfiles.getByType("support"),
            ]);

            setAllStaff([...teachers, ...adminStaff, ...supportStaff]);
            setError(null);
        } catch (err) {
            console.error("Error fetching staff:", err);
            setError("Failed to load staff information");
        } finally {
            setLoading(false);
        }
    };

    const toggleDropdown = (section) => {
        setOpenDropdown(openDropdown === section ? null : section);
    };

    // Group staff by department dynamically
    const getGroupedStaff = () => {
        const grouped = {};

        allStaff.forEach((staff) => {
            const department = staff.department || "Other Staff";
            if (!grouped[department]) {
                grouped[department] = {
                    count: 0,
                    staff: [],
                    color: getDepartmentColor(department),
                };
            }
            grouped[department].staff.push(staff);
            grouped[department].count++;
        });

        return grouped;
    };

    const getDepartmentColor = (department) => {
        const colorMap = {
            "Implementation Teachers": "green",
            "Administrative Assistants": "blue",
            Security: "purple",
            "Utility and Maintenance": "orange",
            "Other Staff": "gray",
        };
        return colorMap[department] || "blue";
    };

    const getColorClasses = (color) => {
        const colors = {
            green: "from-green-100 to-green-200",
            blue: "from-blue-100 to-blue-200",
            purple: "from-purple-100 to-purple-200",
            orange: "from-orange-100 to-orange-200",
            gray: "from-gray-100 to-gray-200",
        };
        return colors[color] || colors.blue;
    };

    const staffData = getGroupedStaff();

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">
                        Loading staff directory...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Users className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg mb-2">{error}</p>
                    <p className="text-gray-500 text-sm">
                        Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="mb-8">
                    <div className="flex items-center space-x-4 text-lg text-gray-600">
                        <Link
                            to="/"
                            className="hover:text-blue-600 transition-colors duration-200 flex items-center"
                        >
                            <Home className="h-5 w-5 mr-1" />
                            HOME
                        </Link>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <Link
                            to="/about"
                            className="hover:text-blue-600 transition-colors duration-200"
                        >
                            ABOUT
                        </Link>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900 font-bold">STAFF</span>
                    </div>
                </nav>

                {/* Compact Header */}
                <div className="mb-6 text-center relative">
                    {/* Subtle glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-200/40 to-blue-200/30 blur-3xl rounded-full"></div>

                    <div className="relative">
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-green-700 bg-clip-text text-transparent mb-3 tracking-tight">
                            Faculty & Staff
                        </h1>
                        <div className="flex items-center justify-center space-x-3 mb-2">
                            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-green-400 to-green-500 rounded-full"></div>
                            <Users className="w-6 h-6 text-green-500" />
                            <div className="h-1 w-16 bg-gradient-to-r from-green-500 via-green-400 to-transparent rounded-full"></div>
                        </div>
                        <p className="text-base font-semibold text-gray-700">
                            Taft National High School
                        </p>
                        <p className="text-sm text-green-600 font-medium italic">
                            Dedicated professionals shaping tomorrow's leaders
                        </p>
                    </div>
                </div>

                {/* Staff Directory Section */}
                <div className="mt-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Staff Directory
                        </h2>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
                    </div>

                    {/* Staff Sections Dropdowns */}
                    <div className="space-y-6">
                        {Object.keys(staffData).length === 0 ? (
                            <div className="text-center py-20">
                                <Users className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600 text-lg">
                                    No staff information available.
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Please check back later.
                                </p>
                            </div>
                        ) : (
                            Object.entries(staffData).map(([section, data]) => (
                                <div
                                    key={section}
                                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                                >
                                    {/* Dropdown Header */}
                                    <button
                                        onClick={() => toggleDropdown(section)}
                                        className="w-full flex items-center justify-between p-8 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div
                                                className={`w-4 h-4 rounded-full bg-gradient-to-r ${getColorClasses(
                                                    data.color
                                                )
                                                    .replace("from-", "from-")
                                                    .replace("to-", "to-")}`}
                                            ></div>
                                            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center">
                                                {section}
                                                <span className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
                                                    {data.count} Staff
                                                </span>
                                            </h3>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className={`w-8 h-8 rounded-full bg-gradient-to-r ${getColorClasses(
                                                    data.color
                                                )
                                                    .replace("from-", "from-")
                                                    .replace(
                                                        "to-",
                                                        "to-"
                                                    )} flex items-center justify-center`}
                                            >
                                                {openDropdown === section ? (
                                                    <ChevronUp className="h-5 w-5 text-white" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5 text-white" />
                                                )}
                                            </div>
                                        </div>
                                    </button>

                                    {/* Dropdown Content */}
                                    {openDropdown === section && (
                                        <div className="px-8 pb-8 bg-gradient-to-br from-gray-50 to-blue-50">
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                                {data.staff.map((staff, i) => (
                                                    <div
                                                        key={staff.id || i}
                                                        className="group"
                                                    >
                                                        <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                                                            <div
                                                                className={`w-full h-56 bg-gradient-to-br ${getColorClasses(
                                                                    data.color
                                                                )} flex items-center justify-center relative`}
                                                            >
                                                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                                                {staff.profile_image_url ? (
                                                                    <img
                                                                        src={
                                                                            staff.profile_image_url
                                                                        }
                                                                        alt={
                                                                            staff.full_name
                                                                        }
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <Users className="h-16 w-16 text-white/70" />
                                                                )}
                                                            </div>
                                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-700 via-blue-600 to-transparent p-4">
                                                                <h4 className="text-white font-bold text-sm mb-1 leading-tight">
                                                                    {
                                                                        staff.full_name
                                                                    }
                                                                </h4>
                                                                <p className="text-white/90 text-xs font-medium">
                                                                    {
                                                                        staff.position
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Staff;
