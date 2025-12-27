import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicService } from "../../../services/publicService";
import { principalProfileService } from "../../../services/principalProfileService";
import {
    GraduationCap,
    Award,
    Mail,
    Phone,
    Star,
    ChevronRight,
    Home,
    Crown,
    Briefcase,
    Users,
    Sparkles,
} from "lucide-react";

const AssistantPrincipal = () => {
    const [assistantPrincipals, setAssistantPrincipals] = useState([]);
    const [principalProfile, setPrincipalProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [apData, principalData] = await Promise.all([
                publicService.staffProfiles.getByType("assistant_principal"),
                principalProfileService.getAllData(),
            ]);

            setAssistantPrincipals(apData);
            setPrincipalProfile(principalData.profile);
            setError(null);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load information");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
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
                            Assistant Principals
                        </span>
                    </div>
                </div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNyw5OSwxMzUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
                {/* Compact Header */}
                <div className="mb-8 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-200/40 to-indigo-200/30 blur-3xl rounded-full"></div>

                    <div className="relative">
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent mb-3 tracking-tight">
                            Leadership Team
                        </h1>
                        <div className="flex items-center justify-center space-x-3 mb-2">
                            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-blue-400 to-blue-500 rounded-full"></div>
                            <Crown className="w-6 h-6 text-blue-500" />
                            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 via-blue-400 to-transparent rounded-full"></div>
                        </div>
                        <p className="text-base font-semibold text-gray-700">
                            Taft National High School
                        </p>
                        <p className="text-sm text-blue-600 font-medium italic">
                            Organizational Structure
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-600 mt-4 font-medium">
                                Loading leadership team...
                            </p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
                            <Crown className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg mb-2">
                                {error}
                            </p>
                            <p className="text-gray-500 text-sm">
                                Please try again later.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Principal Card - Top of Hierarchy */}
                        {principalProfile && (
                            <div className="flex justify-center">
                                <div className="w-full max-w-3xl">
                                    <div className="relative bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl shadow-md overflow-hidden">
                                        {/* Decorative Elements */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

                                        <div className="relative p-8">
                                            <div className="flex flex-col md:flex-row items-center gap-6 text-white">
                                                {/* Principal Image - Squared with rounded corners */}
                                                <div className="relative flex-shrink-0">
                                                    <div className="absolute -inset-3 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl blur opacity-60 animate-pulse"></div>
                                                    <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                                                        {principalProfile.profile_image ? (
                                                            <img
                                                                src={
                                                                    principalProfile.profile_image.startsWith(
                                                                        "http"
                                                                    )
                                                                        ? principalProfile.profile_image
                                                                        : `/storage/${principalProfile.profile_image.replace(
                                                                              /^\/?storage\//,
                                                                              ""
                                                                          )}`
                                                                }
                                                                alt={
                                                                    principalProfile.full_name
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                                                                <Crown className="h-20 w-20 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Principal Info - Centered on mobile */}
                                                <div className="flex-1 text-center md:text-left">
                                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-3">
                                                        <Crown className="h-5 w-5 text-yellow-300" />
                                                        <span className="text-sm font-bold">
                                                            SCHOOL PRINCIPAL
                                                        </span>
                                                    </div>
                                                    <h3 className="text-3xl md:text-4xl font-black mb-2">
                                                        {principalProfile.full_name ||
                                                            "Name not set"}
                                                    </h3>
                                                    <p className="text-lg text-blue-100 mb-4 font-semibold">
                                                        {principalProfile.position ||
                                                            "School Principal"}
                                                    </p>

                                                    {/* Contact Info - Centered */}
                                                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                                        {principalProfile.email && (
                                                            <a
                                                                href={`mailto:${principalProfile.email}`}
                                                                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
                                                            >
                                                                <Mail className="h-4 w-4" />
                                                                <span className="text-sm font-medium">
                                                                    {
                                                                        principalProfile.email
                                                                    }
                                                                </span>
                                                            </a>
                                                        )}
                                                        {principalProfile.phone && (
                                                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                                                                <Phone className="h-4 w-4" />
                                                                <span className="text-sm font-medium">
                                                                    {
                                                                        principalProfile.phone
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Connector Line */}
                                    <div className="flex justify-center py-3">
                                        <div className="w-1 h-6 bg-gradient-to-b from-blue-400 via-indigo-400 to-transparent rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Assistant Principals - 2 Column Grid */}
                        <div>
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm mb-3">
                                    <Sparkles className="h-5 w-5 text-green-600" />
                                    <h2 className="text-2xl font-black text-gray-800">
                                        Assistant Principals
                                    </h2>
                                </div>
                                <p className="text-gray-600">
                                    Supporting leadership and educational
                                    excellence
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {assistantPrincipals.map((assistant, index) => {
                                    const isEven = index % 2 === 0;
                                    const gradientColors = isEven
                                        ? "from-green-500 via-emerald-500 to-teal-600"
                                        : "from-orange-500 via-amber-500 to-yellow-600";

                                    return (
                                        <div
                                            key={assistant.id}
                                            className="h-full"
                                        >
                                            <div
                                                className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col border-l-4 border-gray-100"
                                                style={{
                                                    borderLeftColor: isEven
                                                        ? "#10b981"
                                                        : "#f97316",
                                                }}
                                            >
                                                {/* Decorative corner accents */}
                                                <div
                                                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradientColors} opacity-10 rounded-bl-full`}
                                                ></div>
                                                <div
                                                    className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr ${gradientColors} opacity-5 rounded-tr-full`}
                                                ></div>

                                                {/* Subtle icon watermark */}
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
                                                    <Users className="w-48 h-48 text-gray-900" />
                                                </div>

                                                <div className="p-6 flex-1 flex flex-col relative z-10">
                                                    {/* Header with Image - Centered */}
                                                    <div className="flex flex-col items-center text-center mb-6">
                                                        {/* Image - Squared with rounded corners */}
                                                        <div className="relative mb-4">
                                                            <div className="w-28 h-28 rounded-xl overflow-hidden border-4 border-white shadow-md">
                                                                {assistant.profile_image_url ? (
                                                                    <img
                                                                        src={
                                                                            assistant.profile_image_url
                                                                        }
                                                                        alt={
                                                                            assistant.full_name
                                                                        }
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div
                                                                        className={`w-full h-full bg-gradient-to-br ${gradientColors} flex items-center justify-center`}
                                                                    >
                                                                        <Users className="h-14 w-14 text-white" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Name & Title */}
                                                        <div
                                                            className={`inline-flex items-center gap-2 ${
                                                                isEven
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-orange-100 text-orange-700"
                                                            } px-3 py-1 rounded-full mb-3`}
                                                        >
                                                            <Star className="h-4 w-4" />
                                                            <span className="text-xs font-bold">
                                                                ASSISTANT
                                                                PRINCIPAL
                                                            </span>
                                                        </div>
                                                        <h3 className="text-xl font-black text-gray-900 mb-1">
                                                            {
                                                                assistant.full_name
                                                            }
                                                        </h3>
                                                        <p className="text-sm text-gray-600 font-medium">
                                                            {assistant.position ||
                                                                "Assistant Principal"}
                                                        </p>
                                                    </div>

                                                    {/* Info Grid - Centered */}
                                                    <div className="space-y-3 mb-6 flex-1">
                                                        {assistant.department && (
                                                            <div
                                                                className={`flex items-center justify-center gap-2 text-sm ${
                                                                    isEven
                                                                        ? "bg-blue-50"
                                                                        : "bg-amber-50"
                                                                } p-3 rounded-lg`}
                                                            >
                                                                <Briefcase
                                                                    className={`h-5 w-5 ${
                                                                        isEven
                                                                            ? "text-blue-600"
                                                                            : "text-amber-600"
                                                                    } flex-shrink-0`}
                                                                />
                                                                <span className="font-bold text-gray-800">
                                                                    {
                                                                        assistant.department
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {assistant.education && (
                                                            <div
                                                                className={`flex items-center justify-center gap-2 text-sm ${
                                                                    isEven
                                                                        ? "bg-purple-50"
                                                                        : "bg-rose-50"
                                                                } p-3 rounded-lg`}
                                                            >
                                                                <GraduationCap
                                                                    className={`h-5 w-5 ${
                                                                        isEven
                                                                            ? "text-purple-600"
                                                                            : "text-rose-600"
                                                                    } flex-shrink-0`}
                                                                />
                                                                <span className="text-gray-700 font-medium">
                                                                    {
                                                                        assistant.education
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {assistant.experience && (
                                                            <div
                                                                className={`flex items-center justify-center gap-2 text-sm ${
                                                                    isEven
                                                                        ? "bg-green-50"
                                                                        : "bg-orange-50"
                                                                } p-3 rounded-lg`}
                                                            >
                                                                <Award
                                                                    className={`h-5 w-5 ${
                                                                        isEven
                                                                            ? "text-green-600"
                                                                            : "text-orange-600"
                                                                    } flex-shrink-0`}
                                                                />
                                                                <span className="text-gray-700 font-medium">
                                                                    {
                                                                        assistant.experience
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Contact - Centered in same row */}
                                                    <div className="flex flex-wrap justify-center gap-2 pt-4 border-t border-gray-100">
                                                        {assistant.contact_info
                                                            ?.email && (
                                                            <a
                                                                href={`mailto:${assistant.contact_info.email}`}
                                                                className={`flex items-center justify-center gap-2 text-sm ${
                                                                    isEven
                                                                        ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                                                                        : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                                                                } px-4 py-2.5 rounded-lg transition-all font-medium`}
                                                            >
                                                                <Mail className="h-4 w-4" />
                                                                <span className="truncate">
                                                                    {
                                                                        assistant
                                                                            .contact_info
                                                                            .email
                                                                    }
                                                                </span>
                                                            </a>
                                                        )}
                                                        {assistant.contact_info
                                                            ?.phone && (
                                                            <div
                                                                className={`flex items-center justify-center gap-2 text-sm ${
                                                                    isEven
                                                                        ? "bg-green-50 text-green-700"
                                                                        : "bg-amber-50 text-amber-700"
                                                                } px-4 py-2.5 rounded-lg font-medium`}
                                                            >
                                                                <Phone className="h-4 w-4" />
                                                                {
                                                                    assistant
                                                                        .contact_info
                                                                        .phone
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Section */}
                <div className="relative mt-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 via-indigo-300/20 to-blue-300/20 blur-3xl"></div>
                    <div className="relative flex flex-wrap justify-center gap-4">
                        <Link
                            to="/faculty"
                            className="group inline-flex items-center px-8 py-4 bg-white hover:bg-blue-50 text-gray-700 font-bold rounded-2xl border-2 border-blue-300 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1"
                        >
                            <ChevronRight className="h-5 w-5 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform text-blue-600" />
                            Back to Faculty
                        </Link>
                        <Link
                            to="/"
                            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white font-bold rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1"
                        >
                            <Home className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssistantPrincipal;
