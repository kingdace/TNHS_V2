import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicService } from "../../../services/publicService";
import {
    GraduationCap,
    Award,
    Mail,
    Phone,
    BookOpen,
    Users,
    ChevronRight,
    Home,
    Briefcase,
    Star,
} from "lucide-react";

const TeachingStaff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const data = await publicService.staffProfiles.getByType("teacher");
            setStaff(data);
        } catch (error) {
            console.error("Error fetching teaching staff:", error);
        } finally {
            setLoading(false);
        }
    };

    // Get gradient color based on index for variety
    const getGradientColor = (index) => {
        const gradients = [
            "from-blue-500 to-indigo-600",
            "from-purple-500 to-pink-600",
            "from-green-500 to-teal-600",
            "from-orange-500 to-red-600",
            "from-cyan-500 to-blue-600",
            "from-violet-500 to-purple-600",
        ];
        return gradients[index % gradients.length];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link
                            to="/"
                            className="hover:text-blue-600 transition-colors duration-200 flex items-center"
                        >
                            <Home className="h-4 w-4 mr-1" />
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link
                            to="/faculty"
                            className="hover:text-blue-600 transition-colors duration-200"
                        >
                            Faculty
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-semibold">
                            Teaching Staff
                        </span>
                    </div>
                </nav>

                {/* Compact Header */}
                <div className="mb-6 text-center relative">
                    {/* Subtle glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-200/40 to-blue-200/30 blur-3xl rounded-full"></div>

                    <div className="relative">
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent mb-3 tracking-tight">
                            Teaching Staff
                        </h1>
                        <div className="flex items-center justify-center space-x-3 mb-2">
                            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-purple-400 to-purple-500 rounded-full"></div>
                            <GraduationCap className="w-6 h-6 text-purple-500" />
                            <div className="h-1 w-16 bg-gradient-to-r from-purple-500 via-purple-400 to-transparent rounded-full"></div>
                        </div>
                        <p className="text-base font-semibold text-gray-700">
                            Taft National High School
                        </p>
                        <p className="text-sm text-purple-600 font-medium italic">
                            Dedicated educators committed to excellence
                        </p>
                    </div>
                </div>

                {/* Stats Overview */}
                {!loading && staff.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-semibold">
                                        Total Teachers
                                    </p>
                                    <p className="text-4xl font-bold text-blue-600">
                                        {staff.length}
                                    </p>
                                </div>
                                <div className="bg-blue-100 p-4 rounded-full">
                                    <Users className="h-8 w-8 text-blue-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-semibold">
                                        Departments
                                    </p>
                                    <p className="text-4xl font-bold text-purple-600">
                                        {
                                            new Set(
                                                staff
                                                    .map((s) => s.department)
                                                    .filter(Boolean)
                                            ).size
                                        }
                                    </p>
                                </div>
                                <div className="bg-purple-100 p-4 rounded-full">
                                    <BookOpen className="h-8 w-8 text-purple-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-green-500 transform hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-semibold">
                                        Excellence
                                    </p>
                                    <p className="text-4xl font-bold text-green-600">
                                        100%
                                    </p>
                                </div>
                                <div className="bg-green-100 p-4 rounded-full">
                                    <Award className="h-8 w-8 text-green-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Staff Grid - Enhanced Design */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-600 mt-4 font-medium">
                                Loading our amazing teachers...
                            </p>
                        </div>
                    </div>
                ) : staff.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {staff.map((member, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Gradient Header with Profile */}
                                <div
                                    className={`relative h-48 bg-gradient-to-br ${getGradientColor(
                                        index
                                    )} flex items-center justify-center overflow-hidden`}
                                >
                                    {/* Animated Background Pattern */}
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                                    </div>

                                    {/* Profile Image Placeholder */}
                                    <div className="relative z-10">
                                        <div className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <GraduationCap className="h-16 w-16 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Position Badge */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1 shadow-lg">
                                        <span className="text-xs font-bold text-gray-700 flex items-center">
                                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                                            Teacher
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 space-y-4">
                                    {/* Name */}
                                    <div className="text-center border-b pb-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                                            {member.full_name}
                                        </h3>
                                        <p className="text-blue-600 font-semibold text-sm">
                                            {member.position || "Teacher"}
                                        </p>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-3">
                                        {member.department && (
                                            <div className="flex items-start space-x-3 bg-gray-50 rounded-lg p-3">
                                                <Briefcase className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-500 font-semibold">
                                                        Department
                                                    </p>
                                                    <p className="text-gray-800 font-medium">
                                                        {member.department}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {member.contact_info?.email && (
                                            <div className="flex items-start space-x-3 bg-blue-50 rounded-lg p-3">
                                                <Mail className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs text-gray-500 font-semibold mb-1">
                                                        Email
                                                    </p>
                                                    <a
                                                        href={`mailto:${member.contact_info.email}`}
                                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm break-all"
                                                    >
                                                        {
                                                            member.contact_info
                                                                .email
                                                        }
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {member.contact_info?.phone && (
                                            <div className="flex items-start space-x-3 bg-green-50 rounded-lg p-3">
                                                <Phone className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-500 font-semibold mb-1">
                                                        Phone
                                                    </p>
                                                    <p className="text-green-600 font-medium">
                                                        {
                                                            member.contact_info
                                                                .phone
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
                            <BookOpen className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">
                                No staff information available at the moment.
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                Please check back later.
                            </p>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/faculty"
                        className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <ChevronRight className="h-5 w-5 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Back to Faculty Overview
                    </Link>
                    <Link
                        to="/"
                        className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <Home className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TeachingStaff;
