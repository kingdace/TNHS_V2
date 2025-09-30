import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    GraduationCap,
    Star,
    Users,
    Brain,
    Wrench,
    Laptop,
    Shield,
    Globe,
    Trophy,
    Lightbulb,
    ArrowRight,
    CheckCircle,
    Clock,
    Target,
    Award,
    Heart,
    Zap,
    Calculator,
    Microscope,
    Palette,
    Music,
    Dumbbell,
    Home,
    TreePine,
    Building,
    DollarSign,
    Scale,
    BookMarked,
    TrendingUp,
    Compass,
    MapPin,
    Calendar,
    Briefcase,
    Plus,
    Mail,
    Phone,
    Download,
    FileText,
    Info,
    ChevronRight,
    ExternalLink,
    Bookmark,
    UserCheck,
    School,
    Sparkles,
} from "lucide-react";

const Academics = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 pt-20 pb-12 relative overflow-hidden">
            {/* Simple Background Elements */}
            <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-30"></div>
            <div className="absolute top-40 right-20 w-12 h-12 bg-green-200 rounded-full opacity-40"></div>
            <div className="absolute top-60 left-1/4 w-8 h-8 bg-yellow-200 rounded-full opacity-35"></div>
            <div className="absolute top-80 right-1/3 w-14 h-14 bg-blue-200 rounded-full opacity-25"></div>
            <div className="absolute top-96 left-1/2 w-10 h-10 bg-green-200 rounded-full opacity-30"></div>

            {/* Simple Icons */}
            <div className="absolute top-32 right-10 text-blue-300 opacity-20">
                <BookOpen className="h-8 w-8" />
            </div>
            <div className="absolute top-48 left-16 text-green-300 opacity-25">
                <GraduationCap className="h-6 w-6" />
            </div>
            <div className="absolute top-72 right-1/4 text-yellow-300 opacity-20">
                <Star className="h-7 w-7" />
            </div>
            <div className="absolute top-88 left-1/3 text-blue-300 opacity-25">
                <Trophy className="h-5 w-5" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Compact Header */}
                <div className="text-center mb-4">
                    <div className="flex items-center justify-center mb-2">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg mr-3">
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-blue-600 mb-1">
                                Academic Programs Overview
                            </h1>
                            <div className="w-16 h-0.5 bg-blue-500 mx-auto rounded-full"></div>
                            <div className="w-12 h-0.5 bg-yellow-400 mx-auto rounded-full mt-0.5"></div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 max-w-2xl mx-auto leading-relaxed">
                        🎓 Discover our comprehensive academic curriculum
                        designed to prepare students for success.
                    </p>
                </div>

                {/* Compact Section Divider */}
                <div className="flex items-center justify-center mb-3">
                    <div className="flex-1 h-px bg-blue-300"></div>
                    <div className="mx-2 flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 h-px bg-blue-300"></div>
                </div>

                {/* Compact Two Column Layout */}
                <div className="grid lg:grid-cols-3 gap-4">
                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-2 relative">
                        {/* Simple Main Content Decorations */}
                        <div className="absolute -top-2 -left-4 w-6 h-6 bg-green-200 rounded-full opacity-30"></div>
                        <div className="absolute top-32 -right-2 w-8 h-8 bg-blue-200 rounded-full opacity-35"></div>
                        <div className="absolute top-64 -left-2 w-4 h-4 bg-yellow-200 rounded-full opacity-40"></div>
                        {/* Programs Offered Section */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                            {/* Simple Header */}
                            <div className="bg-blue-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white text-center flex items-center justify-center">
                                    <School className="h-5 w-5 mr-2" />
                                    PROGRAMS OFFERED
                                </h2>
                            </div>

                            {/* Program Cards with Plain White Background */}
                            <div className="p-4 space-y-3">
                                <Link
                                    to="/academics/junior-high"
                                    className="block group"
                                    onMouseEnter={() =>
                                        setHoveredCard("junior")
                                    }
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div
                                        className={`bg-white border-2 border-blue-500 text-gray-800 px-4 py-4 rounded-lg flex items-center justify-between transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg ${
                                            hoveredCard === "junior"
                                                ? "shadow-lg scale-105 border-blue-400"
                                                : "shadow-md"
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                                                <BookOpen className="h-4 w-4 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-800">
                                                    Junior High School
                                                </h3>
                                                <p className="text-gray-600 text-sm flex items-center">
                                                    <span className="mr-1">
                                                        📚
                                                    </span>
                                                    Grades 7-10 • Foundation
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center relative z-10">
                                            <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform text-blue-500" />
                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Plus className="h-3 w-3 text-blue-500" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link
                                    to="/academics/senior-high"
                                    className="block group"
                                    onMouseEnter={() =>
                                        setHoveredCard("senior")
                                    }
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div
                                        className={`bg-white border-2 border-green-500 text-gray-800 px-4 py-4 rounded-lg flex items-center justify-between transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg ${
                                            hoveredCard === "senior"
                                                ? "shadow-lg scale-105 border-green-400"
                                                : "shadow-md"
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                                                <GraduationCap className="h-4 w-4 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-800">
                                                    Senior High School
                                                </h3>
                                                <p className="text-gray-600 text-sm flex items-center">
                                                    <span className="mr-1">
                                                        🎓
                                                    </span>
                                                    Grades 11-12 • Specialized
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center relative z-10">
                                            <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform text-green-500" />
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                <Plus className="h-3 w-3 text-green-500" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link
                                    to="/academics/special-programs"
                                    className="block group"
                                    onMouseEnter={() =>
                                        setHoveredCard("special")
                                    }
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div
                                        className={`bg-white border-2 border-orange-500 text-gray-800 px-4 py-4 rounded-lg flex items-center justify-between transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg ${
                                            hoveredCard === "special"
                                                ? "shadow-lg scale-105 border-orange-400"
                                                : "shadow-md"
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                                                <Star className="h-4 w-4 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-800">
                                                    ALS Programs
                                                </h3>
                                                <p className="text-gray-600 text-sm flex items-center">
                                                    <span className="mr-1">
                                                        ⭐
                                                    </span>
                                                    Alternative Learning •
                                                    Enhanced
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center relative z-10">
                                            <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform text-orange-500" />
                                            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                                                <Plus className="h-3 w-3 text-orange-500" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 grid md:grid-cols-2 gap-3">
                            <Link
                                to="/admissions"
                                className="group bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center"
                            >
                                <UserCheck className="h-4 w-4 mr-2" />
                                <span className="font-semibold text-sm">
                                    📋 Admission Requirements
                                </span>
                                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                to="/contact"
                                className="group bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center"
                            >
                                <Info className="h-4 w-4 mr-2" />
                                <span className="font-semibold text-sm">
                                    💬 Get Information
                                </span>
                                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Enhanced Sidebar - Right Column */}
                    <div className="lg:col-span-1 relative">
                        {/* Simple Sidebar Decorations */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-200 rounded-full opacity-40"></div>
                        <div className="absolute top-20 -left-2 w-6 h-6 bg-green-200 rounded-full opacity-35"></div>
                        <div className="absolute top-40 -right-6 w-4 h-4 bg-yellow-200 rounded-full opacity-30"></div>
                        <div className="absolute top-60 -left-4 w-10 h-10 bg-blue-200 rounded-full opacity-25"></div>

                        {/* Enhanced Contact Information Section */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-blue-600 px-4 py-3">
                                <h3 className="text-lg font-bold text-white text-center flex items-center justify-center">
                                    <Mail className="h-5 w-5 mr-2" />
                                    FOR INQUIRIES
                                </h3>
                            </div>

                            <div className="p-3 space-y-3">
                                {/* General Inquiries */}
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                    <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                                        <Info className="h-3 w-3 mr-1" />
                                        General Inquiries
                                    </h4>
                                    <div className="space-y-1 text-xs">
                                        <div className="flex items-center">
                                            <Mail className="h-4 w-4 mr-2 text-blue-600" />
                                            <a
                                                href="mailto:info@tnhs.edu.ph"
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                info@tnhs.edu.ph
                                            </a>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-4 w-4 mr-2 text-blue-600" />
                                            <span className="font-semibold text-blue-800">
                                                (02) 123-4567
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Admissions */}
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                    <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                                        <UserCheck className="h-3 w-3 mr-1" />
                                        Admissions
                                    </h4>
                                    <div className="space-y-1 text-xs">
                                        <div className="flex items-center">
                                            <Mail className="h-3 w-3 mr-1 text-blue-600" />
                                            <a
                                                href="mailto:admissions@tnhs.edu.ph"
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                admissions@tnhs.edu.ph
                                            </a>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-3 w-3 mr-1 text-blue-600" />
                                            <span className="font-semibold text-blue-800">
                                                (02) 123-4568
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Academic Department */}
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                    <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                                        <School className="h-3 w-3 mr-1" />
                                        Academic Department
                                    </h4>
                                    <div className="space-y-1 text-xs">
                                        <div className="flex items-center">
                                            <Mail className="h-3 w-3 mr-1 text-blue-600" />
                                            <a
                                                href="mailto:academics@tnhs.edu.ph"
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                academics@tnhs.edu.ph
                                            </a>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-3 w-3 mr-1 text-blue-600" />
                                            <span className="font-semibold text-blue-800">
                                                (02) 123-4569
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compact Statistics Section */}
                <div className="mt-4 grid md:grid-cols-3 gap-3">
                    <div className="text-center bg-blue-50 p-3 rounded-lg border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-600 mb-1">
                            1,200+
                        </h3>
                        <p className="text-blue-700 font-semibold text-xs">
                            👥 Active Students
                        </p>
                        <div className="mt-1 text-xs text-blue-600 font-medium">
                            🌱 Growing Community
                        </div>
                    </div>

                    <div className="text-center bg-green-50 p-3 rounded-lg border border-green-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-green-600 mb-1">
                            95%
                        </h3>
                        <p className="text-green-700 font-semibold text-xs">
                            🎓 Graduation Rate
                        </p>
                        <div className="mt-1 text-xs text-green-600 font-medium">
                            ⭐ Excellence in Education
                        </div>
                    </div>

                    <div className="text-center bg-yellow-50 p-3 rounded-lg border border-yellow-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <Award className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-yellow-600 mb-1">
                            50+
                        </h3>
                        <p className="text-yellow-700 font-semibold text-xs">
                            🏆 Awards & Recognition
                        </p>
                        <div className="mt-1 text-xs text-yellow-600 font-medium">
                            🌟 Academic Excellence
                        </div>
                    </div>
                </div>

                {/* Simple Section Divider */}
                <div className="flex items-center justify-center my-6">
                    <div className="flex-1 h-px bg-blue-300"></div>
                    <div className="mx-4 flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 h-px bg-blue-300"></div>
                </div>

                {/* Compact Additional Features Section */}
                <div className="mt-4 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="bg-blue-600 px-3 py-2">
                        <h3 className="text-base font-bold text-white text-center flex items-center justify-center">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Additional Resources
                        </h3>
                    </div>
                    <div className="p-3 grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                        <Link
                            to="/academics/curriculum"
                            className="group bg-blue-50 p-2 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md hover:scale-105"
                        >
                            <div className="text-center">
                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1 shadow-sm">
                                    <FileText className="h-3 w-3 text-white" />
                                </div>
                                <h4 className="font-semibold text-blue-800 text-xs">
                                    📚 Curriculum Guide
                                </h4>
                            </div>
                        </Link>

                        <Link
                            to="/academics/syllabus"
                            className="group bg-green-50 p-2 rounded-lg border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-md hover:scale-105"
                        >
                            <div className="text-center">
                                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-1 shadow-sm">
                                    <Bookmark className="h-3 w-3 text-white" />
                                </div>
                                <h4 className="font-semibold text-green-800 text-xs">
                                    📖 Course Syllabus
                                </h4>
                            </div>
                        </Link>

                        <Link
                            to="/academics/calendar"
                            className="group bg-yellow-50 p-2 rounded-lg border border-yellow-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-md hover:scale-105"
                        >
                            <div className="text-center">
                                <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-1 shadow-sm">
                                    <Calendar className="h-3 w-3 text-white" />
                                </div>
                                <h4 className="font-semibold text-yellow-800 text-xs">
                                    📅 Academic Calendar
                                </h4>
                            </div>
                        </Link>

                        <Link
                            to="/academics/downloads"
                            className="group bg-blue-50 p-2 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md hover:scale-105"
                        >
                            <div className="text-center">
                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1 shadow-sm">
                                    <Download className="h-3 w-3 text-white" />
                                </div>
                                <h4 className="font-semibold text-blue-800 text-xs">
                                    💾 Downloads
                                </h4>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Compact Bottom Decorative Elements */}
                <div className="mt-4 flex items-center justify-center">
                    <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Academics;
