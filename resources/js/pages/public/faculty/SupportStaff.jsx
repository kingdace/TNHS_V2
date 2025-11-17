import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicService } from "../../../services/publicService";
import {
    Wrench,
    Mail,
    Phone,
    Heart,
    ChevronRight,
    Home,
    Shield,
    Users,
    Zap,
    CheckCircle,
    Sparkles,
    Award,
} from "lucide-react";

const SupportStaff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const data = await publicService.staffProfiles.getByType("support");
            setStaff(data);
        } catch (error) {
            console.error("Error fetching support staff:", error);
        } finally {
            setLoading(false);
        }
    };

    // Get icon based on index for variety
    const getIcon = (index) => {
        const icons = [Wrench, Shield, Heart, Zap, CheckCircle, Sparkles];
        const Icon = icons[index % icons.length];
        return Icon;
    };

    // Get color theme based on index
    const getColorTheme = (index) => {
        const themes = [
            {
                gradient: "from-rose-500 to-pink-600",
                light: "from-rose-50 to-pink-50",
                badge: "bg-rose-100 text-rose-700 border-rose-200",
                iconBg: "bg-rose-100",
                iconColor: "text-rose-600",
                ring: "ring-rose-200",
            },
            {
                gradient: "from-cyan-500 to-blue-600",
                light: "from-cyan-50 to-blue-50",
                badge: "bg-cyan-100 text-cyan-700 border-cyan-200",
                iconBg: "bg-cyan-100",
                iconColor: "text-cyan-600",
                ring: "ring-cyan-200",
            },
            {
                gradient: "from-amber-500 to-orange-600",
                light: "from-amber-50 to-orange-50",
                badge: "bg-amber-100 text-amber-700 border-amber-200",
                iconBg: "bg-amber-100",
                iconColor: "text-amber-600",
                ring: "ring-amber-200",
            },
            {
                gradient: "from-violet-500 to-purple-600",
                light: "from-violet-50 to-purple-50",
                badge: "bg-violet-100 text-violet-700 border-violet-200",
                iconBg: "bg-violet-100",
                iconColor: "text-violet-600",
                ring: "ring-violet-200",
            },
        ];
        return themes[index % themes.length];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-2 py-4 text-sm">
                        <Link
                            to="/"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                            <Home className="h-4 w-4 mr-1" />
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <Link
                            to="/faculty"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Faculty
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">Support Staff</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
                {/* Compact Header */}
                <div className="mb-6 text-center relative">
                    {/* Subtle glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-200/40 to-red-200/30 blur-3xl rounded-full"></div>

                    <div className="relative">
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent mb-3 tracking-tight">
                            Support Staff
                        </h1>
                        <div className="flex items-center justify-center space-x-3 mb-2">
                            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-orange-400 to-orange-500 rounded-full"></div>
                            <Wrench className="w-6 h-6 text-orange-500" />
                            <div className="h-1 w-16 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent rounded-full"></div>
                        </div>
                        <p className="text-base font-semibold text-gray-700">
                            Taft National High School
                        </p>
                        <p className="text-sm text-orange-600 font-medium italic">
                            The backbone of our school community
                        </p>
                    </div>
                </div>
                {/* Feature Cards */}
                {!loading && staff.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 border-2 border-rose-100">
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-3 rounded-full">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-center text-gray-600 text-sm font-semibold mb-1">
                                Team Size
                            </p>
                            <p className="text-center text-3xl font-bold text-rose-600">
                                {staff.length}
                            </p>
                            <p className="text-center text-xs text-gray-500 mt-2">
                                Dedicated Members
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 border-2 border-orange-100">
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-3 rounded-full">
                                    <Award className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-center text-gray-600 text-sm font-semibold mb-1">
                                Service Quality
                            </p>
                            <p className="text-center text-3xl font-bold text-orange-600">
                                100%
                            </p>
                            <p className="text-center text-xs text-gray-500 mt-2">
                                Commitment
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 border-2 border-pink-100">
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-3 rounded-full">
                                    <Heart className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-center text-gray-600 text-sm font-semibold mb-1">
                                Care & Support
                            </p>
                            <p className="text-center text-3xl font-bold text-pink-600">
                                24/7
                            </p>
                            <p className="text-center text-xs text-gray-500 mt-2">
                                Always Available
                            </p>
                        </div>
                    </div>
                )}

                {/* Staff Grid - Compact Card Design */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block">
                            <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-600 mt-4 font-medium">
                                Loading support team...
                            </p>
                        </div>
                    </div>
                ) : staff.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {staff.map((member, index) => {
                            const theme = getColorTheme(index);
                            const Icon = getIcon(index);
                            return (
                                <div
                                    key={index}
                                    className={`group bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${theme.ring} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
                                >
                                    {/* Gradient Top Bar */}
                                    <div
                                        className={`h-2 bg-gradient-to-r ${theme.gradient}`}
                                    ></div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Profile Image */}
                                        <div className="flex justify-center mb-4">
                                            {member.profile_image_url ? (
                                                <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                    <img
                                                        src={
                                                            member.profile_image_url
                                                        }
                                                        alt={member.full_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                    className={`relative w-20 h-20 bg-gradient-to-br ${theme.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                                >
                                                    <Icon className="h-10 w-10 text-white" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Name & Position */}
                                        <div className="text-center mb-4">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                                {member.full_name}
                                            </h3>
                                            <div
                                                className={`inline-flex items-center ${theme.badge} px-3 py-1 rounded-full border text-xs font-semibold`}
                                            >
                                                {member.position ||
                                                    "Support Staff"}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray-200 my-4"></div>

                                        {/* Contact Info */}
                                        <div className="space-y-3">
                                            {member.contact_info?.email && (
                                                <div
                                                    className={`bg-gradient-to-br ${theme.light} rounded-lg p-3 hover:shadow-md transition-shadow`}
                                                >
                                                    <div className="flex items-start space-x-2">
                                                        <Mail
                                                            className={`h-4 w-4 ${theme.iconColor} mt-1 flex-shrink-0`}
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-xs text-gray-500 font-semibold mb-0.5">
                                                                Email
                                                            </p>
                                                            <a
                                                                href={`mailto:${member.contact_info.email}`}
                                                                className={`${theme.iconColor} hover:underline font-medium text-xs break-all`}
                                                            >
                                                                {
                                                                    member
                                                                        .contact_info
                                                                        .email
                                                                }
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {member.contact_info?.phone && (
                                                <div
                                                    className={`bg-gradient-to-br ${theme.light} rounded-lg p-3 hover:shadow-md transition-shadow`}
                                                >
                                                    <div className="flex items-start space-x-2">
                                                        <Phone
                                                            className={`h-4 w-4 ${theme.iconColor} mt-1 flex-shrink-0`}
                                                        />
                                                        <div>
                                                            <p className="text-xs text-gray-500 font-semibold mb-0.5">
                                                                Phone
                                                            </p>
                                                            <p
                                                                className={`${theme.iconColor} font-medium text-xs`}
                                                            >
                                                                {
                                                                    member
                                                                        .contact_info
                                                                        .phone
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto border-2 border-rose-100">
                            <Heart className="h-20 w-20 text-gray-300 mx-auto mb-4" />
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
                        className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <Home className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SupportStaff;
