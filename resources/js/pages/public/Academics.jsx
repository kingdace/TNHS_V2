import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    GraduationCap,
    Star,
    Users,
    Brain,
    Clock,
    Award,
    Heart,
    ArrowRight,
    CheckCircle,
    Trophy,
    Mail,
    Phone,
    Info,
    UserCheck,
    School,
    ChevronRight,
    Compass,
} from "lucide-react";

const Academics = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-xl mr-4">
                            <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                                Academic Programs
                            </h1>
                            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                        </div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        Discover our comprehensive academic curriculum designed
                        to prepare students for success in their chosen fields
                        and future endeavors.
                    </p>

                    {/* Stats Bar */}
                    <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="font-semibold">
                                2,150+ Students
                            </span>
                        </div>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <div className="flex items-center">
                            <Award className="h-4 w-4 mr-2 text-green-600" />
                            <span className="font-semibold">3 Programs</span>
                        </div>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-2 text-yellow-600" />
                            <span className="font-semibold">
                                95% Success Rate
                            </span>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-2">
                        {/* Programs Offered Section */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
                                <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center">
                                    <School className="h-6 w-6 mr-3" />
                                    Academic Programs Offered
                                </h2>
                                <p className="text-blue-100 text-center mt-2 text-sm">
                                    Choose the program that best fits your
                                    educational goals
                                </p>
                            </div>

                            {/* Program Cards */}
                            <div className="p-8 space-y-6">
                                <Link
                                    to="/academics/junior-high"
                                    className="block group"
                                    onMouseEnter={() =>
                                        setHoveredCard("junior")
                                    }
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div
                                        className={`bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 text-gray-800 px-8 py-6 rounded-2xl flex items-center justify-between transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-xl ${
                                            hoveredCard === "junior"
                                                ? "shadow-xl scale-[1.02] border-blue-300 bg-gradient-to-r from-blue-100 to-blue-200"
                                                : "shadow-lg"
                                        }`}
                                    >
                                        <div className="flex items-center flex-1">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                                                <BookOpen className="h-8 w-8 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-2xl text-gray-800 mb-2">
                                                    Junior High School
                                                </h3>
                                                <p className="text-gray-600 text-base mb-3">
                                                    Grades 7-10 • Foundation
                                                    Program
                                                </p>
                                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                    <span className="flex items-center">
                                                        <Users className="h-4 w-4 mr-2 text-blue-600" />
                                                        1,200+ Students
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Clock className="h-4 w-4 mr-2 text-blue-600" />
                                                        4 Years Duration
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Award className="h-4 w-4 mr-2 text-blue-600" />
                                                        K-12 Compliant
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="text-blue-600 font-semibold text-base">
                                                Explore Program
                                            </div>
                                            <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform text-blue-500" />
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
                                        className={`bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 text-gray-800 px-8 py-6 rounded-2xl flex items-center justify-between transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-xl ${
                                            hoveredCard === "senior"
                                                ? "shadow-xl scale-[1.02] border-green-300 bg-gradient-to-r from-green-100 to-green-200"
                                                : "shadow-lg"
                                        }`}
                                    >
                                        <div className="flex items-center flex-1">
                                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                                                <GraduationCap className="h-8 w-8 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-2xl text-gray-800 mb-2">
                                                    Senior High School
                                                </h3>
                                                <p className="text-gray-600 text-base mb-3">
                                                    Grades 11-12 • Specialized
                                                    Tracks
                                                </p>
                                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                    <span className="flex items-center">
                                                        <Users className="h-4 w-4 mr-2 text-green-600" />
                                                        800+ Students
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Clock className="h-4 w-4 mr-2 text-green-600" />
                                                        2 Years Duration
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Brain className="h-4 w-4 mr-2 text-green-600" />
                                                        4 Tracks Available
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="text-green-600 font-semibold text-base">
                                                Explore Program
                                            </div>
                                            <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform text-green-500" />
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
                                        className={`bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 text-gray-800 px-8 py-6 rounded-2xl flex items-center justify-between transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-xl ${
                                            hoveredCard === "special"
                                                ? "shadow-xl scale-[1.02] border-orange-300 bg-gradient-to-r from-orange-100 to-orange-200"
                                                : "shadow-lg"
                                        }`}
                                    >
                                        <div className="flex items-center flex-1">
                                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                                                <Star className="h-8 w-8 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-2xl text-gray-800 mb-2">
                                                    ALS Programs
                                                </h3>
                                                <p className="text-gray-600 text-base mb-3">
                                                    Alternative Learning System
                                                    • Enhanced
                                                </p>
                                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                    <span className="flex items-center">
                                                        <Users className="h-4 w-4 mr-2 text-orange-600" />
                                                        150+ Learners
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Clock className="h-4 w-4 mr-2 text-orange-600" />
                                                        Self-Paced Learning
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Heart className="h-4 w-4 mr-2 text-orange-600" />
                                                        Community-Based
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="text-orange-600 font-semibold text-base">
                                                Explore Program
                                            </div>
                                            <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform text-orange-500" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-10 grid md:grid-cols-2 gap-6">
                            <Link
                                to="/admissions"
                                className="group bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-6 rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center"
                            >
                                <div className="flex items-center">
                                    <UserCheck className="h-6 w-6 mr-4" />
                                    <div className="text-left">
                                        <div className="font-bold text-lg">
                                            Admission Requirements
                                        </div>
                                        <div className="text-sm opacity-90">
                                            View enrollment process
                                        </div>
                                    </div>
                                </div>
                                <ArrowRight className="h-6 w-6 ml-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                to="/contact"
                                className="group bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-6 rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center"
                            >
                                <div className="flex items-center">
                                    <Info className="h-6 w-6 mr-4" />
                                    <div className="text-left">
                                        <div className="font-bold text-lg">
                                            Get Information
                                        </div>
                                        <div className="text-sm opacity-90">
                                            Contact our team
                                        </div>
                                    </div>
                                </div>
                                <ArrowRight className="h-6 w-6 ml-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Features Section */}
                        <div className="mt-10 bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                            <h4 className="font-bold text-xl text-gray-800 mb-6 flex items-center">
                                <CheckCircle className="h-6 w-6 mr-3 text-blue-600" />
                                Why Choose TNHS Academics?
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                                <div className="flex items-center text-gray-600">
                                    <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                                    <span className="font-medium">
                                        K-12 Compliant
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                                    <span className="font-medium">
                                        Expert Teachers
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                                    <span className="font-medium">
                                        Modern Facilities
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                                    <span className="font-medium">
                                        Holistic Development
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Right Column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Contact Information Section */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5">
                                <h3 className="text-xl font-bold text-white text-center flex items-center justify-center">
                                    <Mail className="h-6 w-6 mr-3" />
                                    Contact Information
                                </h3>
                                <p className="text-blue-100 text-center mt-2 text-sm">
                                    Get in touch with our academic team
                                </p>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* General Inquiries */}
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-200">
                                    <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                                        <Info className="h-5 w-5 mr-2" />
                                        General Inquiries
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                            <Mail className="h-4 w-4 mr-3 text-blue-600" />
                                            <a
                                                href="mailto:info@tnhs.edu.ph"
                                                className="text-blue-600 hover:text-blue-800 underline font-medium"
                                            >
                                                info@tnhs.edu.ph
                                            </a>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-4 w-4 mr-3 text-blue-600" />
                                            <span className="font-semibold text-blue-800">
                                                (02) 123-4567
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Admissions */}
                                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-md transition-all duration-200">
                                    <h4 className="font-bold text-green-900 mb-3 flex items-center">
                                        <UserCheck className="h-5 w-5 mr-2" />
                                        Admissions
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                            <Mail className="h-4 w-4 mr-3 text-green-600" />
                                            <a
                                                href="mailto:admissions@tnhs.edu.ph"
                                                className="text-green-600 hover:text-green-800 underline font-medium"
                                            >
                                                admissions@tnhs.edu.ph
                                            </a>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-4 w-4 mr-3 text-green-600" />
                                            <span className="font-semibold text-green-800">
                                                (02) 123-4568
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links Section */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-5">
                                <h3 className="text-xl font-bold text-white text-center flex items-center justify-center">
                                    <Compass className="h-6 w-6 mr-3" />
                                    Quick Links
                                </h3>
                                <p className="text-green-100 text-center mt-2 text-sm">
                                    Navigate to program details
                                </p>
                            </div>
                            <div className="p-6 space-y-3">
                                <Link
                                    to="/academics/junior-high"
                                    className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200"
                                >
                                    <div className="flex items-center text-base">
                                        <BookOpen className="h-5 w-5 mr-3 text-blue-600" />
                                        <span className="font-medium text-blue-800">
                                            Junior High Details
                                        </span>
                                    </div>
                                </Link>
                                <Link
                                    to="/academics/senior-high"
                                    className="block p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-200"
                                >
                                    <div className="flex items-center text-base">
                                        <GraduationCap className="h-5 w-5 mr-3 text-green-600" />
                                        <span className="font-medium text-green-800">
                                            Senior High Tracks
                                        </span>
                                    </div>
                                </Link>
                                <Link
                                    to="/academics/special-programs"
                                    className="block p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-200"
                                >
                                    <div className="flex items-center text-base">
                                        <Star className="h-5 w-5 mr-3 text-orange-600" />
                                        <span className="font-medium text-orange-800">
                                            ALS Programs
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Academics;
