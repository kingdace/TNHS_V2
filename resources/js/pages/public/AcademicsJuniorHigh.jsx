import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, Award, Calendar, MapPin, Clock } from "lucide-react";

const AcademicsJuniorHigh = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const subjects = [
        { name: "Mathematics", description: "Algebra, Geometry, Statistics" },
        { name: "Science", description: "Biology, Chemistry, Physics" },
        { name: "English", description: "Literature, Grammar, Communication" },
        { name: "Filipino", description: "Panitikan, Gramatika, Komunikasyon" },
        {
            name: "Araling Panlipunan",
            description: "History, Geography, Economics",
        },
        { name: "MAPEH", description: "Music, Arts, PE, Health" },
        { name: "TLE", description: "Technology and Livelihood Education" },
        {
            name: "Values Education",
            description: "Character and Values Formation",
        },
    ];

    const features = [
        {
            icon: BookOpen,
            title: "Comprehensive Curriculum",
            description:
                "K-12 aligned curriculum designed for holistic development",
        },
        {
            icon: Users,
            title: "Small Class Sizes",
            description:
                "Maximum 40 students per class for personalized attention",
        },
        {
            icon: Award,
            title: "Academic Excellence",
            description:
                "Consistent high performance in regional and national assessments",
        },
        {
            icon: Calendar,
            title: "Structured Schedule",
            description:
                "Well-organized daily schedule with proper time allocation",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Junior High School
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Building strong foundations for academic success and
                        character development in Grades 7-10
                    </p>
                </div>

                {/* Overview Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Program Overview
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Our Junior High School program provides a
                                comprehensive education that prepares students
                                for Senior High School and beyond. We focus on
                                developing critical thinking, creativity, and
                                character while maintaining high academic
                                standards.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-700">
                                        Grades 7-10
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Clock className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-700">
                                        Full Day Program
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Key Features
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        K-12 Curriculum Compliance
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        STEM Integration
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Values Formation
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Extracurricular Activities
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <IconComponent className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Subjects Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Core Subjects
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {subjects.map((subject, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {subject.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {subject.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Admission Requirements */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Admission Requirements
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">
                                For Grade 7
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span>Elementary School Report Card</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span>Birth Certificate (PSA)</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span>2x2 ID Picture (2 copies)</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span>Good Moral Certificate</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">
                                For Transferees
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span>Transfer Credential</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span>Latest Report Card</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span>Birth Certificate (PSA)</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span>Parent/Guardian ID</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/academics"
                        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                        ← Back to Academics
                    </Link>
                    <Link
                        to="/admissions"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Apply Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AcademicsJuniorHigh;
