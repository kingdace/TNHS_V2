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

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About the Principal */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                About the Principal
                            </h2>

                            {/* Principal Photo and Info */}
                            <div className="flex flex-col md:flex-row gap-6 mb-6">
                                <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                                    <User className="w-24 h-24 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Dr. Maria Santos
                                    </h3>
                                    <p className="text-xl text-blue-600 font-semibold mb-4">
                                        Principal
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        Leading TNHS with vision, dedication,
                                        and an unwavering commitment to
                                        educational excellence. Transforming
                                        lives through innovative leadership and
                                        compassionate guidance.
                                    </p>
                                </div>
                            </div>

                            {/* Principal's Message */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                                    Principal's Message
                                </h4>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-4">
                                        <em>
                                            Dear TNHS Students, Parents, and
                                            Community,
                                        </em>
                                    </p>
                                    <p className="mb-4">
                                        As we continue our journey toward
                                        educational excellence and student
                                        success, I am honored to lead Taft
                                        National High School with a renewed
                                        commitment to providing quality
                                        education that nurtures both academic
                                        achievement and character development.
                                    </p>
                                    <p className="mb-4">
                                        Our vision for TNHS is to create a
                                        learning environment where every student
                                        can thrive, discover their potential,
                                        and develop the skills necessary to
                                        become responsible citizens and future
                                        leaders. We believe in fostering a
                                        culture of excellence, integrity, and
                                        service to others.
                                    </p>
                                    <p className="mb-4">
                                        Together with our dedicated faculty and
                                        staff, we will continue to implement
                                        innovative programs, maintain high
                                        academic standards, and provide
                                        comprehensive support for our students'
                                        holistic development.
                                    </p>
                                    <p>
                                        Thank you for your trust and support.
                                        Let us work together to make TNHS a
                                        beacon of educational excellence in our
                                        community.
                                    </p>
                                    <p className="mt-6 font-semibold">
                                        <strong>Dr. Maria Santos, Ph.D.</strong>
                                        <br />
                                        Principal
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* School Leadership */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                School Leadership
                            </h2>
                            <div className="space-y-4">
                                {leadershipTeam.map((member, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div>
                                            <h4 className="font-semibold text-gray-900">
                                                {member.name}
                                            </h4>
                                            <p className="text-gray-600">
                                                {member.position}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {member.department}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-blue-600">
                                                {member.email}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Principal's Updates */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Principal's Updates
                            </h2>
                            <div className="space-y-6">
                                {newsUpdates.map((update, index) => (
                                    <div
                                        key={index}
                                        className="border-b border-gray-200 pb-6 last:border-b-0"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                                                {update.title}
                                            </h4>
                                            <span className="text-sm text-gray-500">
                                                {update.date}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-2">
                                            {update.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                {update.category}
                                            </span>
                                            <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center">
                                                Read More
                                                <ExternalLink className="w-3 h-3 ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Contact Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-3 text-blue-600" />
                                    <span className="text-sm text-gray-700">
                                        principal@tnhs.edu.ph
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-3 text-blue-600" />
                                    <span className="text-sm text-gray-700">
                                        09123456789
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-3 text-blue-600" />
                                    <span className="text-sm text-gray-700">
                                        Principal's Office, Main Building
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-3 text-blue-600" />
                                    <span className="text-sm text-gray-700">
                                        Office Hours: 7:00 AM - 5:00 PM
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Directories */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Directories
                            </h3>
                            <div className="space-y-3">
                                {directories.map((dir, index) => (
                                    <div
                                        key={index}
                                        className="border-b border-gray-100 pb-3 last:border-b-0"
                                    >
                                        <h4 className="font-medium text-gray-900 text-sm">
                                            {dir.title}
                                        </h4>
                                        <p className="text-xs text-blue-600">
                                            {dir.email}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {dir.phone} (Ext. {dir.extension})
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Quick Links
                            </h3>
                            <div className="space-y-2">
                                <Link
                                    to="/academics"
                                    className="block text-sm text-blue-600 hover:text-blue-800 py-1"
                                >
                                    Academic Programs
                                </Link>
                                <Link
                                    to="/admissions"
                                    className="block text-sm text-blue-600 hover:text-blue-800 py-1"
                                >
                                    Admission Requirements
                                </Link>
                                <Link
                                    to="/news"
                                    className="block text-sm text-blue-600 hover:text-blue-800 py-1"
                                >
                                    School News & Updates
                                </Link>
                                <Link
                                    to="/contact"
                                    className="block text-sm text-blue-600 hover:text-blue-800 py-1"
                                >
                                    Contact Information
                                </Link>
                            </div>
                        </div>
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
