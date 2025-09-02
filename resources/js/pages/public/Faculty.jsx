import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Faculty = () => {
    const [activeTab, setActiveTab] = useState("principal");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Faculty & Staff
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Meet the dedicated professionals who make TNHS a center
                        of educational excellence
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg shadow-md p-2">
                    <button
                        onClick={() => setActiveTab("principal")}
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                            activeTab === "principal"
                                ? "bg-blue-600 text-white shadow-lg"
                                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                    >
                        Principal
                    </button>
                    <button
                        onClick={() => setActiveTab("assistantPrincipal")}
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                            activeTab === "assistantPrincipal"
                                ? "bg-green-600 text-white shadow-lg"
                                : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                        }`}
                    >
                        Assistant Principal
                    </button>
                    <button
                        onClick={() => setActiveTab("teachingStaff")}
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                            activeTab === "teachingStaff"
                                ? "bg-purple-600 text-white shadow-lg"
                                : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                        }`}
                    >
                        Teaching Staff
                    </button>
                    <button
                        onClick={() => setActiveTab("administrativeStaff")}
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                            activeTab === "administrativeStaff"
                                ? "bg-orange-600 text-white shadow-lg"
                                : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                        }`}
                    >
                        Administrative Staff
                    </button>
                    <button
                        onClick={() => setActiveTab("supportStaff")}
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                            activeTab === "supportStaff"
                                ? "bg-red-600 text-white shadow-lg"
                                : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                        }`}
                    >
                        Support Staff
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    {activeTab === "principal" && (
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                    Dr. Maria Santos
                                </h2>
                                <p className="text-xl text-blue-600 font-semibold">
                                    Principal
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        Education & Experience
                                    </h3>
                                    <p>
                                        <span className="font-medium">
                                            Education:
                                        </span>{" "}
                                        Doctor of Education, Educational
                                        Leadership
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Experience:
                                        </span>{" "}
                                        15+ years in educational administration
                                    </p>

                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-6">
                                        Achievements
                                    </h3>
                                    <ul className="space-y-2">
                                        <li>
                                            • Outstanding Principal Award 2023
                                        </li>
                                        <li>
                                            • Educational Leadership Excellence
                                        </li>
                                        <li>• Community Service Recognition</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        Contact Information
                                    </h3>
                                    <p>
                                        <span className="font-medium">
                                            Email:
                                        </span>{" "}
                                        principal@tnhs.edu.ph
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Phone:
                                        </span>{" "}
                                        +63 912 345 6789
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Office:
                                        </span>{" "}
                                        Principal's Office, Main Building
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "assistantPrincipal" && (
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                    Mr. Juan Dela Cruz
                                </h2>
                                <p className="text-xl text-green-600 font-semibold">
                                    Assistant Principal
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        Education & Experience
                                    </h3>
                                    <p>
                                        <span className="font-medium">
                                            Education:
                                        </span>{" "}
                                        Master of Arts in Education Management
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Experience:
                                        </span>{" "}
                                        12+ years in educational leadership
                                    </p>

                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-6">
                                        Key Responsibilities
                                    </h3>
                                    <ul className="space-y-2">
                                        <li>
                                            • Student Discipline and Welfare
                                        </li>
                                        <li>• Curriculum Development</li>
                                        <li>• Teacher Supervision</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        Contact Information
                                    </h3>
                                    <p>
                                        <span className="font-medium">
                                            Email:
                                        </span>{" "}
                                        assistant.principal@tnhs.edu.ph
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Phone:
                                        </span>{" "}
                                        +63 912 345 6790
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Office:
                                        </span>{" "}
                                        Assistant Principal's Office, Main
                                        Building
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "teachingStaff" && (
                        <div className="space-y-8">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    Grade 7 Teachers
                                </h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800">
                                            Ms. Ana Reyes
                                        </h4>
                                        <p className="text-blue-600">English</p>
                                        <p className="text-sm text-gray-600">
                                            8 years experience
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800">
                                            Mr. Carlos Mendoza
                                        </h4>
                                        <p className="text-blue-600">
                                            Mathematics
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            10 years experience
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800">
                                            Ms. Sofia Cruz
                                        </h4>
                                        <p className="text-blue-600">Science</p>
                                        <p className="text-sm text-gray-600">
                                            7 years experience
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "administrativeStaff" && (
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                Administrative Staff
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gray-50 rounded-lg p-6 text-center">
                                    <h4 className="font-semibold text-gray-800 mb-2">
                                        Ms. Rosa Santos
                                    </h4>
                                    <p className="text-gray-600 mb-3">
                                        Registrar
                                    </p>
                                    <p className="text-blue-600">
                                        registrar@tnhs.edu.ph
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6 text-center">
                                    <h4 className="font-semibold text-gray-800 mb-2">
                                        Mr. Pedro Cruz
                                    </h4>
                                    <p className="text-gray-600 mb-3">
                                        Guidance Counselor
                                    </p>
                                    <p className="text-blue-600">
                                        guidance@tnhs.edu.ph
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6 text-center">
                                    <h4 className="font-semibold text-gray-800 mb-2">
                                        Ms. Lourdes Reyes
                                    </h4>
                                    <p className="text-gray-600 mb-3">
                                        Librarian
                                    </p>
                                    <p className="text-blue-600">
                                        library@tnhs.edu.ph
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "supportStaff" && (
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                Support Staff
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gray-50 rounded-lg p-6 text-center">
                                    <h4 className="font-semibold text-gray-800 mb-2">
                                        Mr. Jose Santos
                                    </h4>
                                    <p className="text-gray-600 mb-3">
                                        Maintenance
                                    </p>
                                    <p className="text-blue-600">
                                        maintenance@tnhs.edu.ph
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6 text-center">
                                    <h4 className="font-semibold text-gray-800 mb-2">
                                        Ms. Teresa Cruz
                                    </h4>
                                    <p className="text-gray-600 mb-3">
                                        Security
                                    </p>
                                    <p className="text-blue-600">
                                        security@tnhs.edu.ph
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6 text-center">
                                    <h4 className="font-semibold text-gray-800 mb-2">
                                        Mr. Miguel Reyes
                                    </h4>
                                    <p className="text-gray-600 mb-3">
                                        IT Support
                                    </p>
                                    <p className="text-blue-600">
                                        it@tnhs.edu.ph
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Back to Home */}
                <div className="text-center mt-12">
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

export default Faculty;
