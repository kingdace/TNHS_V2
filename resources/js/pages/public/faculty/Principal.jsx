import React, { useEffect } from "react";
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
    Home,
    MessageSquare,
    FileText,
    Image,
    ExternalLink,
} from "lucide-react";

const Principal = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const newsUpdates = [
        {
            title: "TNHS launches new digital learning platform for enhanced education",
            date: "August 20, 2024",
            excerpt:
                "The school administration led by Principal Dr. Maria Santos announced the implementation of a comprehensive digital learning platform...",
            category: "Academic Innovation",
        },
        {
            title: "Principal leads community outreach program for student welfare",
            date: "August 12, 2024",
            excerpt:
                "Dr. Maria Santos spearheaded a community outreach initiative focusing on student welfare and family support programs...",
            category: "Community Service",
        },
        {
            title: "TNHS receives recognition for academic excellence under new leadership",
            date: "August 11, 2024",
            excerpt:
                "The Department of Education recognized TNHS for outstanding academic performance and innovative educational programs...",
            category: "Achievement",
        },
    ];

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
        <div className="min-h-screen bg-white">
            {/* Header with Breadcrumb */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link
                            to="/"
                            className="flex items-center hover:text-blue-200"
                        >
                            <Home className="w-4 h-4 mr-1" />
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/faculty" className="hover:text-blue-200">
                            Faculty
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span>Office of the Principal</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Office of the Principal
                    </h1>
                    <p className="text-gray-600">
                        Taft National High School — Competence, Service, and
                        Uprightness
                    </p>
                </div>

                {/* Main Content - Enhanced Professional Section */}
                <div className="bg-gradient-to-br from-white via-gray-50 to-white border-2 border-gray-100 rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Left Column - Enhanced Principal Profile */}
                        <div className="space-y-8">
                            {/* Enhanced Principal Photo */}
                            <div className="flex justify-center">
                                <div className="relative w-80 h-96">
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-green-600 rounded-2xl transform rotate-3 shadow-2xl"></div>
                                    <div className="relative w-full h-full bg-white rounded-2xl flex items-center justify-center border-4 border-white overflow-hidden shadow-xl">
                                        <img
                                            src="/images/Principal.jpg"
                                            alt="Dr. Manuel B. Dayondon - Principal"
                                            className="w-full h-full object-cover rounded-2xl"
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                                e.target.nextSibling.style.display =
                                                    "flex";
                                            }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl hidden">
                                            <div className="text-center">
                                                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                                    <User className="w-20 h-20 text-white" />
                                                </div>
                                                <p className="text-gray-600 text-sm font-medium mb-2">
                                                    Principal Photo
                                                </p>
                                                <p className="text-gray-500 text-xs px-4 bg-white/80 rounded-full py-1">
                                                    Photo will be updated soon
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Principal Name & Title */}
                            <div className="text-center space-y-3">
                                <div className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                    <h2 className="text-4xl font-black tracking-tight mb-2">
                                        Dr. Manuel B. Dayondon
                                    </h2>
                                </div>
                                <div className="inline-block">
                                    <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg">
                                        School Principal IV
                                    </span>
                                </div>
                                <div className="flex items-center justify-center space-x-2 text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium">
                                        Currently Active
                                    </span>
                                </div>
                            </div>

                            {/* Enhanced Action Buttons */}
                            <div className="space-y-4">
                                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                                    <User className="w-5 h-5" />
                                    <span>About the Principal</span>
                                </button>
                                <Link
                                    to="/faculty"
                                    className="w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                                >
                                    <Users className="w-5 h-5" />
                                    <span>View All Faculty</span>
                                </Link>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-xl text-center border border-blue-200">
                                    <div className="text-2xl font-bold text-blue-600">
                                        15+
                                    </div>
                                    <div className="text-xs text-gray-600 font-medium">
                                        Years Experience
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-xl text-center border border-green-200">
                                    <div className="text-2xl font-bold text-green-600">
                                        5+
                                    </div>
                                    <div className="text-xs text-gray-600 font-medium">
                                        Schools Led
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Enhanced Bio */}
                        <div className="flex items-center">
                            <div className="space-y-6">
                                {/* Bio Header */}
                                <div className="text-center lg:text-left">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                                        <Award className="w-6 h-6 text-green-600 mr-2" />
                                        Leadership Profile
                                    </h3>
                                    <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto lg:mx-0"></div>
                                </div>

                                {/* Enhanced Bio Content */}
                                <div className="text-gray-800 leading-relaxed space-y-5">
                                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-l-4 border-green-500">
                                        <p className="text-base font-medium">
                                            A seasoned leader and true academic
                                            at heart,{" "}
                                            <span className="font-bold text-green-700">
                                                Dr. Manuel B. Dayondon
                                            </span>{" "}
                                            now serves as the School Principal
                                            IV of Taft National High
                                            School—bringing with him decades of
                                            experience, wisdom, and a deep
                                            understanding of the school he once
                                            called home.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">
                                                Before assuming the
                                                principalship, he served as
                                                Assistant Principal of Taft NHS,
                                                and previously led several
                                                schools with excellence:{" "}
                                                <span className="font-semibold text-green-700">
                                                    San Jose National High
                                                    School
                                                </span>
                                                ,{" "}
                                                <span className="font-semibold text-green-700">
                                                    Cabrera-Altres National High
                                                    School
                                                </span>
                                                ,{" "}
                                                <span className="font-semibold text-green-700">
                                                    Anomar National High School
                                                </span>
                                                , and{" "}
                                                <span className="font-semibold text-green-700">
                                                    Mat-i National High School
                                                </span>
                                                .
                                            </p>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">
                                                A former teacher of both Taft
                                                NHS and Surigao City National
                                                High School, he remains rooted
                                                in the classroom as a graduate
                                                school instructor at{" "}
                                                <span className="font-semibold text-blue-700">
                                                    St. Paul University Surigao
                                                </span>
                                                .
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
                                            <p className="text-gray-800 font-medium text-center">
                                                <span className="text-green-700 font-bold">
                                                    Dr. Dayondon
                                                </span>{" "}
                                                is not just an administrator—he
                                                is a{" "}
                                                <span className="text-blue-700 font-semibold">
                                                    mentor
                                                </span>
                                                ,{" "}
                                                <span className="text-green-700 font-semibold">
                                                    scholar
                                                </span>
                                                , and{" "}
                                                <span className="text-blue-700 font-semibold">
                                                    steady hand
                                                </span>{" "}
                                                guiding the entire Taft NHS
                                                community forward.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Quick Access */}
                                <div className="bg-white border border-gray-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <Mail className="w-4 h-4 text-green-600 mr-2" />
                                        Quick Contact
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center text-gray-600">
                                            <Mail className="w-4 h-4 mr-2 text-green-600" />
                                            <span>principal@tnhs.edu.ph</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Phone className="w-4 h-4 mr-2 text-green-600" />
                                            <span>09123456789</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Principal's Corner - Enhanced Design */}
                <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
                    {/* Header with "See All" Button */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Principal's Corner
                        </h2>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium border border-green-600 hover:border-green-700 transition-colors duration-300 flex items-center">
                            See All Press Releases
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>

                    {/* Three-Column Card Layout */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {newsUpdates.map((update, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Image Placeholder */}
                                <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                                    <div className="text-center">
                                        <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-xs text-gray-500">
                                            News Image
                                        </p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    {/* Category Badge */}
                                    <div className="mb-3">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                            Principal's Corner
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h4 className="font-semibold text-gray-900 mb-2 text-sm leading-tight hover:text-green-600 cursor-pointer">
                                        {update.title}
                                    </h4>

                                    {/* Metadata */}
                                    <div className="flex items-center text-xs text-gray-500 mb-3">
                                        <span>by TNHS Admin</span>
                                        <span className="mx-1">•</span>
                                        <span>{update.date}</span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-xs mb-4 leading-relaxed">
                                        {update.excerpt}
                                    </p>

                                    {/* Read More Button */}
                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center">
                                        Read More
                                        <ArrowRight className="w-3 h-3 ml-1" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    <Link
                        to="/faculty"
                        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                        ← Back to Faculty Overview
                    </Link>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Principal;
