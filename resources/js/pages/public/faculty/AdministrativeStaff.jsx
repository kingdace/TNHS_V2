import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicService } from "../../../services/publicService";
import {
    Briefcase,
    Mail,
    Phone,
    Shield,
    ChevronRight,
    Home,
    Building2,
    Users,
    ClipboardCheck,
    MapPin,
    Clock,
    Star,
    Crown,
    Loader2,
} from "lucide-react";

const AdministrativeStaff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const data = await publicService.staffProfiles.getByType("admin");
            setStaff(data);
        } catch (error) {
            console.error("Error fetching administrative staff:", error);
        } finally {
            setLoading(false);
        }
    };

    // Get card theme based on index
    const getCardTheme = (index) => {
        const themes = [
            {
                bg: "from-emerald-500 to-green-600",
                badge: "bg-emerald-100 text-emerald-700",
                iconBg: "bg-emerald-50",
                iconColor: "text-emerald-600",
            },
            {
                bg: "from-blue-500 to-indigo-600",
                badge: "bg-blue-100 text-blue-700",
                iconBg: "bg-blue-50",
                iconColor: "text-blue-600",
            },
            {
                bg: "from-purple-500 to-violet-600",
                badge: "bg-purple-100 text-purple-700",
                iconBg: "bg-purple-50",
                iconColor: "text-purple-600",
            },
            {
                bg: "from-orange-500 to-amber-600",
                badge: "bg-orange-100 text-orange-700",
                iconBg: "bg-orange-50",
                iconColor: "text-orange-600",
            },
        ];
        return themes[index % themes.length];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
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
                        <span className="text-gray-700">
                            Administrative Staff
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
                {/* Compact Header */}
                <div className="mb-6 text-center relative">
                    {/* Subtle glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-200/40 to-teal-200/30 blur-3xl rounded-full"></div>

                    <div className="relative">
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-3 tracking-tight">
                            Administrative Staff
                        </h1>
                        <div className="flex items-center justify-center space-x-3 mb-2">
                            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-emerald-400 to-emerald-500 rounded-full"></div>
                            <Building2 className="w-6 h-6 text-emerald-500" />
                            <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent rounded-full"></div>
                        </div>
                        <p className="text-base font-semibold text-gray-700">
                            Taft National High School
                        </p>
                        <p className="text-sm text-emerald-600 font-medium italic">
                            Supporting smooth school operations
                        </p>
                    </div>
                </div>
                {/* Info Cards */}
                {!loading && staff.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-emerald-500">
                            <div className="flex items-center space-x-4">
                                <div className="bg-emerald-100 p-4 rounded-full">
                                    <Users className="h-8 w-8 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm font-semibold">
                                        Team Members
                                    </p>
                                    <p className="text-4xl font-bold text-emerald-600">
                                        {staff.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-teal-500">
                            <div className="flex items-center space-x-4">
                                <div className="bg-teal-100 p-4 rounded-full">
                                    <ClipboardCheck className="h-8 w-8 text-teal-600" />
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm font-semibold">
                                        Operational Excellence
                                    </p>
                                    <p className="text-4xl font-bold text-teal-600">
                                        24/7
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Staff Cards - Modern Horizontal Layout */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block">
                            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-600 mt-4 font-medium">
                                Loading administrative team...
                            </p>
                        </div>
                    </div>
                ) : staff.length > 0 ? (
                    <div className="space-y-6 mb-12">
                        {staff.map((member, index) => {
                            const theme = getCardTheme(index);
                            return (
                                <div
                                    key={index}
                                    className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                                >
                                    <div className="md:flex">
                                        {/* Left Side - Gradient with Icon */}
                                        <div
                                            className={`md:w-72 bg-gradient-to-br ${theme.bg} p-8 flex items-center justify-center relative overflow-hidden`}
                                        >
                                            {/* Background Pattern */}
                                            <div className="absolute inset-0 opacity-10">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                                            </div>

                                            {/* Profile Image */}
                                            <div className="relative z-10">
                                                {member.profile_image_url ? (
                                                    <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white/30 group-hover:scale-110 transition-transform duration-300">
                                                        <img
                                                            src={
                                                                member.profile_image_url
                                                            }
                                                            alt={
                                                                member.full_name
                                                            }
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-40 h-40 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 group-hover:scale-110 transition-transform duration-300">
                                                        <Briefcase className="h-20 w-20 text-white" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Role Badge */}
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                                                <span className="text-xs font-bold text-gray-700 flex items-center">
                                                    <Shield className="h-3 w-3 mr-1" />
                                                    Admin
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right Side - Info */}
                                        <div className="flex-1 p-8">
                                            <div className="flex items-start justify-between mb-6">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                        {member.full_name}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        <div
                                                            className={`inline-flex items-center ${theme.badge} px-4 py-1.5 rounded-full font-semibold text-sm`}
                                                        >
                                                            <Star className="h-4 w-4 mr-1" />
                                                            {member.position ||
                                                                "Administrative Staff"}
                                                        </div>
                                                        {member.is_department_head && (
                                                            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium text-xs">
                                                                <Crown className="h-3 w-3 mr-1" />
                                                                Dept. Head
                                                            </div>
                                                        )}
                                                        <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium text-xs">
                                                            Level{" "}
                                                            {member.position_level ||
                                                                5}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Contact Information Grid */}
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {member.contact_info?.email && (
                                                    <div
                                                        className={`${theme.iconBg} rounded-xl p-4 flex items-start space-x-3`}
                                                    >
                                                        <Mail
                                                            className={`h-5 w-5 ${theme.iconColor} mt-0.5 flex-shrink-0`}
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-xs text-gray-500 font-semibold mb-1">
                                                                Email Address
                                                            </p>
                                                            <a
                                                                href={`mailto:${member.contact_info.email}`}
                                                                className={`${theme.iconColor} hover:underline font-medium text-sm break-all`}
                                                            >
                                                                {
                                                                    member
                                                                        .contact_info
                                                                        .email
                                                                }
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {member.contact_info?.phone && (
                                                    <div
                                                        className={`${theme.iconBg} rounded-xl p-4 flex items-start space-x-3`}
                                                    >
                                                        <Phone
                                                            className={`h-5 w-5 ${theme.iconColor} mt-0.5 flex-shrink-0`}
                                                        />
                                                        <div>
                                                            <p className="text-xs text-gray-500 font-semibold mb-1">
                                                                Phone Number
                                                            </p>
                                                            <p
                                                                className={`${theme.iconColor} font-medium`}
                                                            >
                                                                {
                                                                    member
                                                                        .contact_info
                                                                        .phone
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {member.department && (
                                                    <div
                                                        className={`${theme.iconBg} rounded-xl p-4 flex items-start space-x-3`}
                                                    >
                                                        <Building2
                                                            className={`h-5 w-5 ${theme.iconColor} mt-0.5 flex-shrink-0`}
                                                        />
                                                        <div>
                                                            <p className="text-xs text-gray-500 font-semibold mb-1">
                                                                Department
                                                            </p>
                                                            <p className="text-gray-800 font-medium">
                                                                {
                                                                    member.department
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                <div
                                                    className={`${theme.iconBg} rounded-xl p-4 flex items-start space-x-3`}
                                                >
                                                    <Clock
                                                        className={`h-5 w-5 ${theme.iconColor} mt-0.5 flex-shrink-0`}
                                                    />
                                                    <div>
                                                        <p className="text-xs text-gray-500 font-semibold mb-1">
                                                            Office Hours
                                                        </p>
                                                        <p className="text-gray-800 font-medium">
                                                            Mon-Fri, 8AM-5PM
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
                            <Building2 className="h-20 w-20 text-gray-300 mx-auto mb-4" />
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
                        className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <Home className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdministrativeStaff;
