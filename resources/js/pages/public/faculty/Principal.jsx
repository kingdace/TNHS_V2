import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    User,
    GraduationCap,
    Award,
    Mail,
    Phone,
    MapPin,
    BookOpen,
    Users,
    Calendar,
    Star,
    Target,
    Lightbulb,
    Trophy,
    Clock,
    Building,
    Globe,
    Heart,
    Shield,
    ArrowRight,
    CheckCircle,
    ChevronRight,
    ChevronLeft,
    Home,
    MessageSquare,
    FileText,
    Image,
    ExternalLink,
    TrendingUp,
    X,
    Crown,
    FileCheck,
} from "lucide-react";
import { principalCornerService } from "../../../services/principalCornerService";
import { principalProfileService } from "../../../services/principalProfileService";
import WorkExperienceDisplay from "../../../components/principal/WorkExperienceDisplay";
import PersonalDataSheetDisplay from "../../../components/principal/PersonalDataSheetDisplay";

const Principal = () => {
    const [showAboutPrincipal, setShowAboutPrincipal] = useState(false);
    const [showPrincipalVision, setShowPrincipalVision] = useState(false);

    // Dynamic data states
    const [principalCornerData, setPrincipalCornerData] = useState([]);
    const [featuredContent, setFeaturedContent] = useState([]);
    const [principalVision, setPrincipalVision] = useState(null);
    const [principalBiography, setPrincipalBiography] = useState(null);
    const [loading, setLoading] = useState(true);

    // Principal Profile & Awards data
    const [principalProfile, setPrincipalProfile] = useState(null);
    const [principalAwards, setPrincipalAwards] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch latest biography when modal opens
    useEffect(() => {
        if (showAboutPrincipal) {
            console.log("Modal opened, fetching latest biography...");
            const fetchLatestBiography = async () => {
                try {
                    const response = await fetch(
                        "/api/principal-corner?type=biography"
                    );
                    const result = await response.json();
                    console.log("Latest biography fetch:", result);

                    if (result?.data && result.data.length > 0) {
                        console.log("Updating biography to:", result.data[0]);
                        setPrincipalBiography(result.data[0]);
                    }
                } catch (err) {
                    console.error("Error fetching latest biography:", err);
                }
            };

            fetchLatestBiography();
        }
    }, [showAboutPrincipal]);

    // Fetch Principal Profile & Awards data
    useEffect(() => {
        const fetchPrincipalData = async () => {
            try {
                setDataLoading(true);
                const data = await principalProfileService.getAllData();

                console.log("=== PRINCIPAL DATA FETCHED ===");
                console.log("Profile:", data.profile);
                console.log("Awards:", data.awards);
                console.log("Biography:", data.biography);
                console.log("Vision:", data.vision);

                setPrincipalProfile(data.profile);
                setPrincipalAwards(data.awards);
                setPrincipalBiography(data.biography);
                setPrincipalVision(data.vision);
            } catch (error) {
                console.error("Error fetching principal data:", error);
            } finally {
                setDataLoading(false);
            }
        };

        fetchPrincipalData();
    }, []);

    // Fetch Principal Corner data
    useEffect(() => {
        const fetchPrincipalCornerData = async () => {
            try {
                setLoading(true);

                // Fetch all data in parallel
                const [allData, featured] = await Promise.all([
                    principalCornerService.getAll(),
                    principalCornerService.getFeatured(),
                ]);

                setPrincipalCornerData(allData.data || []);
                setFeaturedContent(featured.data || []);
            } catch (error) {
                console.error("Error fetching principal corner data:", error);
                setPrincipalCornerData([]);
                setFeaturedContent([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPrincipalCornerData();
    }, []);

    // Format principal corner data for display
    const formatPrincipalCornerData = (data) => {
        return data.map((item, index) => ({
            id: item.id,
            title: item.title,
            date: item.published_at
                ? new Date(item.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  })
                : "Recent",
            excerpt: item.excerpt || item.content.substring(0, 150) + "...",
            category:
                item.content_type.charAt(0).toUpperCase() +
                item.content_type.slice(1),
            fullContent: item.content,
            image: item.image_path || "/images/default-principal.jpg",
            images: item.image_path
                ? [item.image_path]
                : ["/images/default-principal.jpg"],
            author: item.author || "Principal",
            readTime: item.read_time || "3 min read",
        }));
    };

    // Get formatted data for display
    const newsUpdates = formatPrincipalCornerData(principalCornerData);
    const featuredUpdates = formatPrincipalCornerData(featuredContent);

    const leadershipTeam = [
        {
            name: "Dr. Maria Santos",
            position: "Principal",
            department: "School Administration",
            email: "principal@tnhs.edu.ph",
        },
        {
            name: "Mr. Juan Dela Cruz",
            position: "Assistant Principal",
            department: "Academic Affairs",
            email: "assistant.principal@tnhs.edu.ph",
        },
        {
            name: "Ms. Ana Rodriguez",
            position: "Head Teacher",
            department: "Student Affairs",
            email: "head.teacher@tnhs.edu.ph",
        },
    ];

    const directories = [
        {
            title: "Principal's Office",
            email: "principal@tnhs.edu.ph",
            phone: "09123456789",
            extension: "101",
        },
        {
            title: "Academic Affairs",
            email: "academic@tnhs.edu.ph",
            phone: "09123456790",
            extension: "102",
        },
        {
            title: "Student Affairs",
            email: "student.affairs@tnhs.edu.ph",
            phone: "09123456791",
            extension: "103",
        },
        {
            title: "Guidance Office",
            email: "guidance@tnhs.edu.ph",
            phone: "09123456792",
            extension: "104",
        },
    ];

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-amber-50 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-sky-300/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-200/30 to-yellow-300/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-blue-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsIDEwMCwwLjUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>

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
                                Office of the Principal
                            </span>
                        </div>
                    </div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Enhanced Page Title with Golden Accent */}
                    <div className="mb-6 text-center relative">
                        {/* Golden glow effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-200/40 to-yellow-200/30 blur-3xl rounded-full"></div>

                        <div className="relative">
                            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent mb-3 tracking-tight">
                                Office of the Principal
                            </h1>
                            <div className="flex items-center justify-center space-x-3 mb-2">
                                <div className="h-1 w-16 bg-gradient-to-r from-transparent via-amber-400 to-amber-500 rounded-full"></div>
                                <Crown className="w-6 h-6 text-amber-500" />
                                <div className="h-1 w-16 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent rounded-full"></div>
                            </div>
                            <p className="text-base font-semibold text-gray-700">
                                Taft National High School
                            </p>
                            <p className="text-sm text-blue-600 font-medium italic">
                                Competence, Service, and Uprightness
                            </p>
                        </div>
                    </div>
                    {/* Main Content - Enhanced with Light Blue & Golden Theme */}
                    <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-amber-50/20 border-2 border-blue-200/50 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm">
                        {/* Decorative corner accents */}
                        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-tl-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-amber-400/20 to-transparent rounded-br-3xl"></div>
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Left Column - Enhanced Principal Profile */}
                            <div className="space-y-8">
                                {/* Enhanced Principal Photo */}
                                <div className="flex justify-center">
                                    <div className="relative w-80 h-96">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-green-600 rounded-2xl transform rotate-3 shadow-2xl"></div>
                                        <div className="relative w-full h-full bg-white rounded-2xl flex items-center justify-center border-4 border-white overflow-hidden shadow-xl">
                                            {dataLoading ? (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-2xl"></div>
                                            ) : principalProfile?.profile_image ? (
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
                                                    alt={`${
                                                        principalProfile?.full_name ||
                                                        "Principal"
                                                    } - ${
                                                        principalProfile?.position ||
                                                        "School Principal"
                                                    }`}
                                                    className="w-full h-full object-cover rounded-2xl"
                                                    onError={(e) => {
                                                        e.target.style.display =
                                                            "none";
                                                        e.target.nextSibling.style.display =
                                                            "flex";
                                                    }}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl">
                                                    <div className="text-center">
                                                        <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                                            <User className="w-20 h-20 text-white" />
                                                        </div>
                                                        <p className="text-gray-600 text-sm font-medium mb-2">
                                                            No Photo Available
                                                        </p>
                                                        <p className="text-gray-500 text-xs px-4 bg-white/80 rounded-full py-1">
                                                            Photo not set
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Principal Name & Title */}
                                <div className="text-center space-y-3">
                                    {dataLoading ? (
                                        <>
                                            <div className="h-10 bg-gray-200 rounded-lg w-3/4 mx-auto animate-pulse"></div>
                                            <div className="h-8 bg-gray-200 rounded-full w-1/2 mx-auto animate-pulse"></div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                                <h2 className="text-4xl font-black tracking-tight mb-2">
                                                    {principalProfile?.full_name ||
                                                        "Name not set"}
                                                </h2>
                                            </div>
                                            <div className="inline-block">
                                                <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg">
                                                    {principalProfile?.position ||
                                                        "Position not set"}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-2 text-gray-600">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-sm font-medium">
                                                    Currently Active
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Enhanced Action Buttons */}
                                <div className="space-y-4">
                                    <button
                                        onClick={() =>
                                            setShowAboutPrincipal(true)
                                        }
                                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                                    >
                                        <User className="w-5 h-5" />
                                        <span>About the Principal</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            setShowPrincipalVision(true)
                                        }
                                        className="w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                                    >
                                        <FileText className="w-5 h-5" />
                                        <span>Personal Data Sheet</span>
                                    </button>
                                </div>

                                {/* Useful Information Cards - Compact */}
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Office Hours Card - Small */}
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 shadow-sm">
                                        <div className="flex items-center justify-center mb-2">
                                            <Clock className="w-4 h-4 text-blue-600 mr-2" />
                                            <h3 className="text-sm font-bold text-blue-800">
                                                Office Hours
                                            </h3>
                                        </div>
                                        {dataLoading ? (
                                            <div className="space-y-2">
                                                <div className="h-4 bg-blue-200 rounded animate-pulse"></div>
                                                <div className="h-4 bg-blue-200 rounded animate-pulse"></div>
                                            </div>
                                        ) : (
                                            <div className="text-xs text-gray-700 space-y-1 text-center">
                                                <div className="text-center">
                                                    <div className="font-medium text-blue-800">
                                                        Mon-Fri: 7AM-5PM
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-medium text-blue-800">
                                                        Saturday: 8AM-12PM
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Contact Information Card - Small */}
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 shadow-sm">
                                        <div className="flex items-center justify-center mb-2">
                                            <MessageSquare className="w-4 h-4 text-green-600 mr-2" />
                                            <h3 className="text-sm font-bold text-green-800">
                                                Contact
                                            </h3>
                                        </div>
                                        {dataLoading ? (
                                            <div className="space-y-2">
                                                <div className="h-4 bg-green-200 rounded animate-pulse"></div>
                                                <div className="h-4 bg-green-200 rounded animate-pulse"></div>
                                            </div>
                                        ) : (
                                            <div className="text-xs text-gray-700 space-y-1 text-center">
                                                <div className="flex items-center justify-center">
                                                    <Phone className="w-3 h-3 text-green-600 mr-1" />
                                                    <span>
                                                        {principalProfile?.phone ||
                                                            "Not set"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <Mail className="w-3 h-3 text-green-600 mr-1" />
                                                    <span className="truncate">
                                                        {principalProfile?.email ||
                                                            "Not set"}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Enhanced Bio */}
                            <div className="flex items-center">
                                <div
                                    className="space-y-6"
                                    id="about-principal-section"
                                >
                                    {/* Bio Header - Centered */}
                                    <div className="flex flex-col items-center -mb-5">
                                        {/* Compact Title Container - Always Centered */}
                                        <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-blue-100 px-10 py-2.5 rounded-full border border-green-200/50 shadow-sm mb-2">
                                            <User className="w-5 h-5 text-green-600 mr-2.5" />
                                            <h5 className="text-lg font-bold text-gray-900 whitespace-nowrap">
                                                Leadership Profile
                                            </h5>
                                        </div>

                                        {/* Closer Decorative Underline */}
                                        <div className="flex items-center space-x-1.5">
                                            <div className="w-6 h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                                            <div className="w-2.5 h-2.5 bg-gradient-to-br from-green-500 to-blue-500 rounded-full shadow-sm"></div>
                                            <div className="w-14 h-0.5 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded-full"></div>
                                            <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full shadow-sm"></div>
                                            <div className="w-6 h-0.5 bg-gradient-to-r from-teal-500 to-transparent rounded-full"></div>
                                        </div>
                                    </div>

                                    {/* Enhanced Bio Content - DYNAMIC */}
                                    <div className="text-gray-800">
                                        {dataLoading ? (
                                            <div className="space-y-4">
                                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                                            </div>
                                        ) : principalProfile?.leadership_profile ? (
                                            <div className="relative bg-gradient-to-r from-green-50 via-blue-50 to-teal-50 rounded-2xl p-8 border border-green-200/50 shadow-lg overflow-hidden">
                                                {/* Background Decorative Elements */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-transparent rounded-full blur-2xl"></div>
                                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-full blur-2xl"></div>

                                                <div className="relative">
                                                    {/* Decorative Quote Icon */}
                                                    <div className="absolute -top-2 -left-2 w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                                                        <svg
                                                            className="w-5 h-5 text-white"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                                        </svg>
                                                    </div>

                                                    {/* Leadership Profile Text */}
                                                    <div className="pl-8">
                                                        <div className="space-y-6">
                                                            {principalProfile.leadership_profile
                                                                .split("\n")
                                                                .filter(
                                                                    (
                                                                        paragraph
                                                                    ) =>
                                                                        paragraph.trim()
                                                                )
                                                                .map(
                                                                    (
                                                                        paragraph,
                                                                        index
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="relative"
                                                                        >
                                                                            {/* Paragraph Indicator */}
                                                                            <div className="absolute -left-4 top-2 w-2 h-2 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-60"></div>

                                                                            <p className="text-gray-800 text-lg leading-8 text-justify font-medium tracking-wide pl-2">
                                                                                {paragraph.trim()}
                                                                            </p>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>

                                                    {/* Enhanced Bottom Section */}
                                                    <div className="mt-8 pt-6 border-t border-green-200/50">
                                                        <div className="flex items-center justify-center space-x-4">
                                                            <div className="flex items-center space-x-2">
                                                                <GraduationCap className="w-5 h-5 text-green-600" />
                                                                <span className="text-sm font-medium text-gray-600">
                                                                    Educational
                                                                    Leadership
                                                                </span>
                                                            </div>
                                                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                            <div className="flex items-center space-x-2">
                                                                <Target className="w-5 h-5 text-blue-600" />
                                                                <span className="text-sm font-medium text-gray-600">
                                                                    Vision &
                                                                    Excellence
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Decorative Bottom Line */}
                                                        <div className="mt-4 flex justify-center">
                                                            <div className="flex items-center space-x-2">
                                                                <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-green-400 rounded-full"></div>
                                                                <div className="w-2 h-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-full"></div>
                                                                <div className="w-12 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-teal-500 rounded-full"></div>
                                                                <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full"></div>
                                                                <div className="w-6 h-0.5 bg-gradient-to-r from-teal-400 to-transparent rounded-full"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : principalProfile?.bio ? (
                                            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-l-4 border-green-500">
                                                <p className="text-base font-medium whitespace-pre-line text-justify leading-7">
                                                    {principalProfile.bio}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-gray-300">
                                                <p className="text-gray-500 text-center italic">
                                                    Leadership profile not set
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Achievements and Awards Section - Enhanced Golden & Blue */}
                    <div className="mt-16 relative bg-gradient-to-br from-amber-50 via-yellow-50 to-blue-50 rounded-3xl p-10 border-2 border-amber-200/50 shadow-2xl overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-300/20 to-transparent rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-300/20 to-transparent rounded-full blur-3xl"></div>

                        <div className="relative text-center mb-8">
                            {/* Compact Header */}
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                                    <Trophy className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                                    Achievements & Awards
                                </h2>
                            </div>
                            <div className="flex items-center justify-center space-x-2 mb-3">
                                <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-400 to-amber-500 rounded-full"></div>
                                <Star className="w-4 h-4 text-amber-500 fill-current" />
                                <div className="h-0.5 w-16 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent rounded-full"></div>
                            </div>
                            <p className="text-gray-600 max-w-2xl mx-auto text-base">
                                Recognition for outstanding leadership and
                                contributions to education
                            </p>
                        </div>

                        {/* Awards Grid - DYNAMIC */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
                            {principalAwards.length > 0 ? (
                                principalAwards.map((award, index) => {
                                    // Cycle through colors for variety
                                    const colors = [
                                        {
                                            bg: "from-blue-500 to-blue-600",
                                            badge: "bg-blue-100 text-blue-700",
                                            border: "border-blue-200",
                                            hover: "group-hover:text-blue-600",
                                        },
                                        {
                                            bg: "from-purple-500 to-purple-600",
                                            badge: "bg-purple-100 text-purple-700",
                                            border: "border-purple-200",
                                            hover: "group-hover:text-purple-600",
                                        },
                                        {
                                            bg: "from-amber-500 to-amber-600",
                                            badge: "bg-amber-100 text-amber-700",
                                            border: "border-amber-200",
                                            hover: "group-hover:text-amber-600",
                                        },
                                        {
                                            bg: "from-green-500 to-green-600",
                                            badge: "bg-green-100 text-green-700",
                                            border: "border-green-200",
                                            hover: "group-hover:text-green-600",
                                        },
                                    ];
                                    const colorScheme =
                                        colors[index % colors.length];

                                    return (
                                        <div
                                            key={award.id}
                                            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 text-center"
                                        >
                                            {/* Clean Trophy Icon */}
                                            <div className="flex justify-center mb-4">
                                                <div
                                                    className={`w-12 h-12 bg-gradient-to-br ${colorScheme.bg} rounded-full flex items-center justify-center shadow-sm`}
                                                >
                                                    <Trophy className="w-6 h-6 text-white" />
                                                </div>
                                            </div>

                                            {/* Award Title */}
                                            <h3 className="text-base font-semibold text-gray-900 mb-3 leading-snug">
                                                {award.title}
                                            </h3>

                                            {/* Year */}
                                            <div className="mb-3">
                                                <span className="text-2xl font-bold text-amber-500">
                                                    {award.award_year ||
                                                        "Recent"}
                                                </span>
                                            </div>

                                            {/* Level Badge */}
                                            {award.level && (
                                                <div className="flex justify-center mb-3">
                                                    <span
                                                        className={`${colorScheme.badge} px-3 py-1 rounded-full text-xs font-medium capitalize flex items-center space-x-1`}
                                                    >
                                                        <Star className="w-3 h-3" />
                                                        <span>
                                                            {award.level} Level
                                                        </span>
                                                    </span>
                                                </div>
                                            )}

                                            {/* Organization */}
                                            <div className="flex items-center justify-center space-x-1 text-gray-500">
                                                <Building className="w-3 h-3" />
                                                <span className="text-xs font-medium">
                                                    {award.issuing_organization ||
                                                        award.description}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : dataLoading ? (
                                // Loading skeleton
                                <>
                                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                                            <div className="flex-1">
                                                <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                                                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                                            </div>
                                        </div>
                                        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-1/3 mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                                            <div className="flex-1">
                                                <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                                                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                                            </div>
                                        </div>
                                        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-1/3 mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </>
                            ) : (
                                // No awards available
                                <div className="col-span-2 bg-white rounded-xl p-12 shadow-lg border border-gray-200 text-center">
                                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg font-medium">
                                        No awards available
                                    </p>
                                    <p className="text-gray-400 text-sm mt-2">
                                        Awards will be displayed here once added
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation - Enhanced with Gold/Blue Theme */}
                    <div className="mt-16 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 via-amber-200/20 to-blue-200/20 blur-2xl"></div>
                        <div className="relative flex flex-wrap justify-center gap-4">
                            <Link
                                to="/faculty"
                                className="inline-flex items-center px-8 py-4 bg-white hover:bg-blue-50 border-2 border-blue-400 text-blue-700 font-bold rounded-xl hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                Back to Faculty
                            </Link>
                            <Link
                                to="/"
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <Home className="w-5 w-5 mr-2" />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* About the Principal Modal - Enhanced Design */}
            {showAboutPrincipal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-gray-200">
                        {/* Modal Header - Clean */}
                        <div className="bg-green-600 text-white px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <User className="w-5 h-5 mr-3" />
                                <div>
                                    <h2 className="text-lg font-bold">
                                        About the Principal
                                    </h2>
                                    <p className="text-green-100 text-sm">
                                        Professional Biography
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowAboutPrincipal(false)}
                                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* Modal Content - Enhanced with WorkExperienceDisplay */}
                        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                            <WorkExperienceDisplay
                                content={principalBiography?.content}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Personal Data Sheet Modal - Enhanced Design */}
            {showPrincipalVision && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-gray-200">
                        {/* Modal Header - Enhanced */}
                        <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <FileText className="w-5 h-5 mr-3" />
                                <div>
                                    <h2 className="text-lg font-bold">
                                        Personal Data Sheet
                                    </h2>
                                    <p className="text-blue-100 text-sm">
                                        Official Information & Records
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowPrincipalVision(false)}
                                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* Modal Content - Enhanced with PersonalDataSheetDisplay */}
                        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                            <PersonalDataSheetDisplay
                                content={principalVision?.content}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Principal;
