import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicService } from "../../../services/publicService";
import {
    GraduationCap,
    Award,
    Mail,
    Phone,
    Star,
    ChevronRight,
    Home,
    Sparkles,
    Heart,
    Briefcase,
    Crown,
    Quote,
    Lightbulb,
    TrendingUp,
} from "lucide-react";

const AssistantPrincipal = () => {
    const [assistantPrincipals, setAssistantPrincipals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAssistantPrincipals();
    }, []);

    const fetchAssistantPrincipals = async () => {
        try {
            setLoading(true);
            const data = await publicService.staffProfiles.getByType(
                "assistant_principal"
            );
            console.log("Assistant Principals data received:", data);
            data.forEach((ap, index) => {
                console.log(
                    `AP ${index + 1}: ${ap.full_name} - Image URL: ${
                        ap.profile_image_url
                    }`
                );
            });
            setAssistantPrincipals(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching assistant principals:", err);
            setError("Failed to load assistant principal information");
        } finally {
            setLoading(false);
        }
    };

    const getSpecializations = (contactInfo) => {
        if (contactInfo?.specializations) {
            return Array.isArray(contactInfo.specializations)
                ? contactInfo.specializations
                : [];
        }
        return [];
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
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNyw5OSwxMzUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
                {/* Compact Header */}
                <div className="mb-6 text-center relative">
                    {/* Subtle glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-200/40 to-indigo-200/30 blur-3xl rounded-full"></div>

                    <div className="relative">
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent mb-3 tracking-tight">
                            Assistant Principals
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
                            Department Heads & Educational Leaders
                        </p>
                        <div className="mt-3 flex justify-center gap-4 text-xs">
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                                Position Level 2
                            </div>
                            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                                Department Leadership
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leadership Profiles - Hero Cards */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-600 mt-4 font-medium">
                                Loading assistant principals...
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
                    <div className="space-y-8 mb-10">
                        {assistantPrincipals.map((assistant, index) => {
                            const specializations = getSpecializations(
                                assistant.contact_info
                            );
                            const isEven = index % 2 === 0;
                            const gradientColors = isEven
                                ? "from-blue-600 via-purple-600 to-pink-600"
                                : "from-emerald-600 via-teal-600 to-cyan-600";
                            const bgColors = isEven
                                ? "from-blue-600 via-purple-600 to-indigo-700"
                                : "from-emerald-600 via-teal-600 to-cyan-700";
                            const glowColors = isEven
                                ? "from-yellow-400 via-pink-400 to-purple-400"
                                : "from-green-400 via-teal-400 to-cyan-400";
                            const badgeColors = isEven
                                ? "border-blue-200"
                                : "border-emerald-200";
                            const badgeTextColors = isEven
                                ? "text-blue-900"
                                : "text-emerald-900";

                            return (
                                <div
                                    key={assistant.id}
                                    className="group relative"
                                >
                                    {/* Decorative Background Elements */}
                                    <div
                                        className={`absolute -inset-4 bg-gradient-to-r ${gradientColors} rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500`}
                                    ></div>

                                    <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                                        {/* Top Decorative Strip with Pattern */}
                                        <div
                                            className={`h-3 bg-gradient-to-r ${gradientColors} relative overflow-hidden`}
                                        >
                                            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]"></div>
                                        </div>

                                        <div
                                            className={`lg:flex ${
                                                !isEven
                                                    ? "lg:flex-row-reverse"
                                                    : ""
                                            }`}
                                        >
                                            {/* Image Section */}
                                            <div className="lg:w-2/5 relative overflow-hidden">
                                                {/* Geometric Background */}
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-br ${bgColors}`}
                                                >
                                                    {/* Animated Circles */}
                                                    <div
                                                        className={`absolute ${
                                                            isEven
                                                                ? "top-0 left-0"
                                                                : "top-0 right-0"
                                                        } w-64 h-64 bg-white/10 rounded-full ${
                                                            isEven
                                                                ? "-translate-x-1/2 -translate-y-1/2"
                                                                : "translate-x-1/2 -translate-y-1/2"
                                                        } group-hover:scale-150 transition-transform duration-1000`}
                                                    ></div>
                                                    <div
                                                        className={`absolute ${
                                                            isEven
                                                                ? "bottom-0 right-0"
                                                                : "bottom-0 left-0"
                                                        } w-48 h-48 bg-white/10 rounded-full ${
                                                            isEven
                                                                ? "translate-x-1/2 translate-y-1/2"
                                                                : "-translate-x-1/2 translate-y-1/2"
                                                        } group-hover:scale-150 transition-transform duration-1000`}
                                                    ></div>
                                                </div>

                                                <div className="relative p-12 flex flex-col items-center justify-center min-h-[500px]">
                                                    {/* Profile Image with Multiple Layers */}
                                                    <div className="relative group/img">
                                                        {/* Outer Glow Ring */}
                                                        <div
                                                            className={`absolute inset-0 bg-gradient-to-tr ${glowColors} rounded-full blur-xl opacity-60 animate-pulse`}
                                                        ></div>

                                                        {/* Middle Ring */}
                                                        <div
                                                            className={`absolute -inset-2 bg-gradient-to-br from-white ${
                                                                isEven
                                                                    ? "to-blue-100"
                                                                    : "to-green-100"
                                                            } rounded-full`}
                                                        ></div>

                                                        {/* Image Container */}
                                                        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl group-hover/img:scale-110 transition-transform duration-500">
                                                            {assistant.profile_image_url ? (
                                                                <img
                                                                    src={
                                                                        assistant.profile_image_url
                                                                    }
                                                                    alt={
                                                                        assistant.full_name
                                                                    }
                                                                    className="w-full h-full object-cover"
                                                                    onLoad={() =>
                                                                        console.log(
                                                                            `✅ Image loaded: ${assistant.profile_image_url}`
                                                                        )
                                                                    }
                                                                    onError={(
                                                                        e
                                                                    ) => {
                                                                        console.error(
                                                                            `❌ Image failed to load: ${assistant.profile_image_url}`,
                                                                            e
                                                                        );
                                                                        console.log(
                                                                            "Image element:",
                                                                            e.target
                                                                        );
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div
                                                                    className={`w-full h-full bg-gradient-to-br ${bgColors} flex items-center justify-center`}
                                                                >
                                                                    <Crown className="h-32 w-32 text-white" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* School Badge - Floating */}
                                                    <div
                                                        className={`absolute bottom-8 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl border ${badgeColors}`}
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <div
                                                                className={`w-2 h-2 ${
                                                                    isEven
                                                                        ? "bg-blue-600"
                                                                        : "bg-emerald-600"
                                                                } rounded-full animate-pulse`}
                                                            ></div>
                                                            <span
                                                                className={`${badgeTextColors} font-bold text-sm`}
                                                            >
                                                                {assistant.department ||
                                                                    "ASSISTANT PRINCIPAL"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="lg:w-3/5 p-10 lg:p-12">
                                                {/* Header */}
                                                <div className="mb-8">
                                                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white px-4 py-2 rounded-full mb-4 shadow-lg">
                                                        <Crown className="h-4 w-4" />
                                                        <span className="text-sm font-bold tracking-wide">
                                                            ASSISTANT PRINCIPAL
                                                        </span>
                                                    </div>

                                                    <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                                                        {assistant.full_name}
                                                    </h2>

                                                    <div className="flex items-center space-x-3 text-gray-600">
                                                        <Star
                                                            className={`h-5 w-5 ${
                                                                isEven
                                                                    ? "text-yellow-500 fill-yellow-500"
                                                                    : "text-emerald-500 fill-emerald-500"
                                                            }`}
                                                        />
                                                        <span className="font-semibold">
                                                            {assistant.position ||
                                                                "Educational Leadership Specialist"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Info Cards Grid */}
                                                <div className="grid md:grid-cols-3 gap-3 mb-6">
                                                    {assistant.education && (
                                                        <div
                                                            className={`bg-gradient-to-br ${
                                                                isEven
                                                                    ? "from-blue-50 to-indigo-50 border-blue-100"
                                                                    : "from-emerald-50 to-green-50 border-emerald-100"
                                                            } rounded-xl p-4 border hover:shadow-md transition-shadow`}
                                                        >
                                                            <GraduationCap
                                                                className={`h-5 w-5 ${
                                                                    isEven
                                                                        ? "text-blue-600"
                                                                        : "text-emerald-600"
                                                                } mb-2`}
                                                            />
                                                            <h4 className="font-bold text-gray-900 mb-1 text-xs uppercase tracking-wide">
                                                                Education
                                                            </h4>
                                                            <p className="text-gray-700 text-xs leading-tight">
                                                                {
                                                                    assistant.education
                                                                }
                                                            </p>
                                                        </div>
                                                    )}

                                                    {assistant.experience && (
                                                        <div
                                                            className={`bg-gradient-to-br ${
                                                                isEven
                                                                    ? "from-purple-50 to-pink-50 border-purple-100"
                                                                    : "from-teal-50 to-cyan-50 border-teal-100"
                                                            } rounded-xl p-4 border hover:shadow-md transition-shadow`}
                                                        >
                                                            <Award
                                                                className={`h-5 w-5 ${
                                                                    isEven
                                                                        ? "text-purple-600"
                                                                        : "text-teal-600"
                                                                } mb-2`}
                                                            />
                                                            <h4 className="font-bold text-gray-900 mb-1 text-xs uppercase tracking-wide">
                                                                Experience
                                                            </h4>
                                                            <p className="text-gray-700 text-xs leading-tight">
                                                                {
                                                                    assistant.experience
                                                                }
                                                            </p>
                                                        </div>
                                                    )}

                                                    {assistant.department && (
                                                        <div
                                                            className={`bg-gradient-to-br ${
                                                                isEven
                                                                    ? "from-green-50 to-emerald-50 border-green-100"
                                                                    : "from-blue-50 to-indigo-50 border-blue-100"
                                                            } rounded-xl p-4 border hover:shadow-md transition-shadow`}
                                                        >
                                                            <Briefcase
                                                                className={`h-5 w-5 ${
                                                                    isEven
                                                                        ? "text-green-600"
                                                                        : "text-blue-600"
                                                                } mb-2`}
                                                            />
                                                            <h4 className="font-bold text-gray-900 mb-1 text-xs uppercase tracking-wide">
                                                                Specialization
                                                            </h4>
                                                            <p className="text-gray-700 text-xs leading-tight">
                                                                {
                                                                    assistant.department
                                                                }
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Key Strengths */}
                                                {specializations.length > 0 && (
                                                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 mb-6 border border-yellow-100">
                                                        <div className="flex items-start space-x-2 mb-2">
                                                            <Star className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                                            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wide">
                                                                Key Strengths
                                                            </h4>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {specializations.map(
                                                                (
                                                                    spec,
                                                                    specIndex
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            specIndex
                                                                        }
                                                                        className="text-xs bg-white px-2 py-1 rounded-md text-gray-700 font-medium"
                                                                    >
                                                                        • {spec}
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Leadership Quote */}
                                                {assistant.achievements && (
                                                    <div
                                                        className={`relative bg-gradient-to-br ${
                                                            isEven
                                                                ? "from-indigo-50 via-purple-50 to-pink-50 border-l-4 border-indigo-600"
                                                                : "from-emerald-50 via-teal-50 to-green-50 border-l-4 border-emerald-600"
                                                        } rounded-xl p-4 mb-4 overflow-hidden`}
                                                    >
                                                        {isEven ? (
                                                            <Quote className="absolute top-2 right-2 h-12 w-12 text-indigo-200 opacity-30" />
                                                        ) : (
                                                            <Lightbulb className="absolute top-2 right-2 h-12 w-12 text-emerald-200 opacity-30" />
                                                        )}
                                                        <div className="relative">
                                                            <div className="flex items-center space-x-2 mb-2">
                                                                {isEven ? (
                                                                    <Heart className="h-4 w-4 text-pink-600" />
                                                                ) : (
                                                                    <TrendingUp className="h-4 w-4 text-teal-600" />
                                                                )}
                                                                <h4 className="font-bold text-gray-900 text-sm">
                                                                    {isEven
                                                                        ? "Leadership Philosophy"
                                                                        : "Leadership Vision"}
                                                                </h4>
                                                            </div>
                                                            <p className="text-gray-700 text-xs leading-relaxed">
                                                                {
                                                                    assistant.achievements
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Contact Info */}
                                                <div className="flex flex-wrap gap-2">
                                                    {assistant.contact_info
                                                        ?.email && (
                                                        <a
                                                            href={`mailto:${assistant.contact_info.email}`}
                                                            className={`flex items-center space-x-2 bg-white hover:${
                                                                isEven
                                                                    ? "bg-blue-50 hover:border-blue-300"
                                                                    : "bg-emerald-50 hover:border-emerald-300"
                                                            } px-4 py-2 rounded-lg border border-gray-200 transition-all shadow-sm hover:shadow-md group/link`}
                                                        >
                                                            <Mail
                                                                className={`h-3 w-3 ${
                                                                    isEven
                                                                        ? "text-blue-600"
                                                                        : "text-emerald-600"
                                                                } group-hover/link:scale-110 transition-transform`}
                                                            />
                                                            <span className="text-xs font-semibold text-gray-700">
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
                                                        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                                                            <Phone className="h-3 w-3 text-green-600" />
                                                            <span className="text-xs font-semibold text-gray-700">
                                                                {
                                                                    assistant
                                                                        .contact_info
                                                                        .phone
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Navigation Section */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 via-indigo-300/20 to-blue-300/20 blur-3xl"></div>
                    <div className="relative flex flex-wrap justify-center gap-4">
                        <Link
                            to="/faculty"
                            className="group inline-flex items-center px-8 py-4 bg-white hover:bg-blue-50 text-gray-700 font-bold rounded-2xl border-2 border-blue-300 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-300/50 transform hover:-translate-y-1 hover:scale-105"
                        >
                            <ChevronRight className="h-5 w-5 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform text-blue-600" />
                            Back to Faculty
                        </Link>
                        <Link
                            to="/"
                            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 hover:scale-105"
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
