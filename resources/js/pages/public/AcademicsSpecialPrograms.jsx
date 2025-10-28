import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";

const AcademicsSpecialPrograms = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="mb-8">
                    <div className="flex items-center space-x-4 text-lg">
                        <Link
                            to="/"
                            className="hover:text-blue-600 transition-all duration-300 font-bold text-gray-800 hover:underline hover:scale-105 transform"
                        >
                            Home
                        </Link>
                        <ChevronRight className="h-6 w-6 text-gray-500" />
                        <Link
                            to="/academics"
                            className="hover:text-blue-600 transition-all duration-300 font-bold text-gray-800 hover:underline hover:scale-105 transform"
                        >
                            Academics
                        </Link>
                        <ChevronRight className="h-6 w-6 text-gray-500" />
                        <span className="text-blue-600 font-bold text-xl bg-blue-50 px-3 py-1 rounded-lg shadow-sm">
                            Special Programs
                        </span>
                    </div>
                </nav>

                {/* Back to Programs Overview */}
                <div className="mb-8">
                    <Link
                        to="/academics"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 font-bold text-lg hover:underline hover:scale-105 transform bg-blue-50 px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="h-5 w-5 mr-3" />
                        Back to Programs Overview
                    </Link>
                </div>

                {/* Main Content - Same Design as Senior High School */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column - Readable Content */}
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl shadow-lg">
                        {/* Title Banner */}
                        <div className="text-center mb-8">
                            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl shadow-lg mb-4">
                                <h3 className="text-2xl font-black uppercase tracking-wide">
                                    TAFT NATIONAL HIGH SCHOOL ALS SHS
                                </h3>
                            </div>
                        </div>

                        {/* Qualifications Section */}
                        <div className="mb-6">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg border border-blue-200 max-w-md mx-auto">
                                <div className="text-center mb-4">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-xl">📋</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-blue-800">
                                        QUALIFICATIONS
                                    </h4>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            1
                                        </span>
                                        <span className="text-gray-700 font-medium">
                                            Must be 18 years old
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            2
                                        </span>
                                        <span className="text-gray-700 font-medium">
                                            ALS JHS Passer / Grade 10 Completer
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            3
                                        </span>
                                        <span className="text-gray-700 font-medium">
                                            Old Curriculum Graduate (4th Year
                                            High School)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Requirements Section */}
                        <div className="mb-6">
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-lg border border-green-200 max-w-md mx-auto">
                                <div className="text-center mb-4">
                                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-xl">📄</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-green-800">
                                        REQUIREMENTS
                                    </h4>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            1
                                        </span>
                                        <span className="text-gray-700 font-medium">
                                            PSA Birth Certificate
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            2
                                        </span>
                                        <span className="text-gray-700 font-medium">
                                            Report Card / A & E Certificate
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            3
                                        </span>
                                        <span className="text-gray-700 font-medium">
                                            ALS Enrollment Form
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                            <p className="text-gray-700 text-base leading-relaxed font-medium">
                                <span className="text-blue-600 font-bold">
                                    📞 Contact Information
                                </span>
                            </p>
                            <div className="mt-3 space-y-2">
                                <p className="text-gray-700 font-medium">
                                    <span className="bg-yellow-200 px-2 py-1 rounded font-bold">
                                        📱
                                    </span>{" "}
                                    +639505358285
                                </p>
                                <p className="text-gray-700 font-medium">
                                    <span className="bg-green-200 px-2 py-1 rounded font-bold">
                                        📍
                                    </span>{" "}
                                    Nueva Ext. Brgy. Taft, Surigao City
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - ALS Image */}
                    <div className="relative">
                        <div className="text-center">
                            <div className="w-full h-full mx-auto rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-blue-100 to-green-100 border-2 border-blue-300">
                                <img
                                    src="/images/ALS.jpg"
                                    alt="ALS Program"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Theme Color Overlay */}
                            <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-br from-blue-400/20 to-green-400/20"></div>

                            {/* Strand Color Accent */}
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-green-500">
                                <div className="flex items-center justify-center h-full text-white font-bold text-sm">
                                    📚
                                </div>
                            </div>

                            {/* Additional Color Accents */}
                            <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-blue-300"></div>
                            <div className="absolute top-1/2 left-4 w-4 h-4 rounded-full bg-green-300"></div>
                        </div>
                    </div>
                </div>

                {/* ENROLL NOW Button */}
                <div className="text-center mt-8">
                    <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 transform shadow-lg text-lg">
                        ENROLL NOW!
                    </Button>
                </div>

                {/* Contact Section */}
                <div className="text-center mt-8">
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            Ready to Join Our Alternative Learning System?
                        </h2>
                        <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
                            Contact our academic department to learn more about
                            the ALS program, enrollment process, and flexible
                            learning schedules.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                asChild
                                className="bg-gradient-to-r from-royal-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 transform shadow-lg text-sm"
                            >
                                <Link to="/contact">
                                    Contact Us for More Info
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white font-bold px-6 py-2 rounded-xl transition-all duration-300 text-sm"
                            >
                                <Link to="/admissions">
                                    View Admission Requirements
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicsSpecialPrograms;
