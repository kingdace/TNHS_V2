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
    Loader2,
} from "lucide-react";
import { academicProgramService } from "../../services/academicProgramService";

const Academics = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [academicPrograms, setAcademicPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAcademicPrograms();
    }, []);

    const fetchAcademicPrograms = async () => {
        try {
            setLoading(true);
            const response = await academicProgramService.getActive();
            setAcademicPrograms(response.data || []);
            setError("");
        } catch (err) {
            console.error("Error fetching academic programs:", err);
            setError("Failed to load academic programs");
            // Fallback to empty array if API fails
            setAcademicPrograms([]);
        } finally {
            setLoading(false);
        }
    };

    // Format academic programs for display
    const formatAcademicPrograms = (programs) => {
        return programs.map((program) => ({
            id: program.id,
            name: program.program_name,
            description: program.description,
            gradeLevel: program.grade_level,
            programType: program.program_type,
            duration: program.duration || "N/A",
            studentCount: program.student_count || "N/A",
            features: program.features || [],
            requirements: program.requirements || [],
            curriculum: program.curriculum || [],
            isActive: program.is_active,
            displayOrder: program.display_order,
            // Map to frontend structure
            href:
                program.program_type === "junior_high"
                    ? "/academics/junior-high"
                    : program.program_type === "senior_high"
                    ? "/academics/senior-high"
                    : "/academics/special-programs",
            icon:
                program.program_type === "junior_high"
                    ? BookOpen
                    : program.program_type === "senior_high"
                    ? GraduationCap
                    : Star,
            color:
                program.program_type === "junior_high"
                    ? "blue"
                    : program.program_type === "senior_high"
                    ? "green"
                    : "orange",
        }));
    };

    const formattedPrograms = formatAcademicPrograms(academicPrograms);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-4 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Academic Programs Overview - Enhanced with Visual Gestures */}
                <div className="mb-4 pt-12">
                    <div className="flex flex-col lg:flex-row items-center min-h-[400px] gap-8">
                        {/* Left Section - Text Content */}
                        <div className="lg:w-1/2 flex items-center">
                            <div className="max-w-lg">
                                {/* Decorative Element */}
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                                    <div className="mx-4 w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <div className="w-8 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                                </div>

                                {/* Main Headline */}
                                <h2 className="text-4xl lg:text-5xl font-bold text-blue-800 mb-8 leading-tight relative">
                                    ACADEMIC PROGRAM OFFERED
                                    <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"></div>
                                </h2>

                                {/* Academic Program Descriptions - Small Modern Table Style */}
                                <div className="space-y-4 mb-4">
                                    {/* Junior High School Description - Small Modern Table */}
                                    <div className="relative group">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] hover:-translate-y-0.5">
                                            <div className="flex items-start">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-2">
                                                    <BookOpen className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-2">
                                                        <h4 className="text-xl font-bold text-blue-800 mr-3 group-hover:text-blue-900 transition-colors duration-300">
                                                            Junior High School
                                                        </h4>
                                                        <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full group-hover:w-full transition-all duration-300"></div>
                                                        <div className="ml-3 w-2 h-2 bg-blue-400 rounded-full group-hover:animate-pulse"></div>
                                                    </div>
                                                    <p className="text-gray-700 text-sm leading-relaxed mb-3 group-hover:text-gray-800 transition-colors duration-300">
                                                        Building strong academic
                                                        foundations for students
                                                        in Grades 7-10. Our
                                                        comprehensive curriculum
                                                        focuses on developing
                                                        critical thinking
                                                        skills, study habits,
                                                        and character formation.
                                                    </p>
                                                    {/* Small Feature Indicators */}
                                                    <div className="flex flex-wrap gap-2">
                                                        <div className="flex items-center bg-white/70 rounded-full px-3 py-1 shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 group-hover:animate-pulse"></div>
                                                            <span className="text-xs font-medium text-blue-700">
                                                                Grades 7-10
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center bg-white/70 rounded-full px-3 py-1 shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 group-hover:animate-pulse"></div>
                                                            <span className="text-xs font-medium text-blue-700">
                                                                Foundation
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center bg-white/70 rounded-full px-3 py-1 shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 group-hover:animate-pulse"></div>
                                                            <span className="text-xs font-medium text-blue-700">
                                                                Critical
                                                                Thinking
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Senior High School Description - Small Modern Table */}
                                    <div className="relative group">
                                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] hover:-translate-y-0.5">
                                            <div className="flex items-start">
                                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-2">
                                                    <GraduationCap className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-2">
                                                        <h4 className="text-xl font-bold text-green-800 mr-3 group-hover:text-green-900 transition-colors duration-300">
                                                            Senior High School
                                                        </h4>
                                                        <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full group-hover:w-full transition-all duration-300"></div>
                                                        <div className="ml-3 w-2 h-2 bg-green-400 rounded-full group-hover:animate-pulse"></div>
                                                    </div>
                                                    <p className="text-gray-700 text-sm leading-relaxed mb-3 group-hover:text-gray-800 transition-colors duration-300">
                                                        Specialized tracks for
                                                        Grades 11-12 including
                                                        STEM, HUMSS, and TVL
                                                        programs. Students
                                                        receive career-focused
                                                        education with hands-on
                                                        learning experiences.
                                                    </p>
                                                    {/* Small Feature Indicators */}
                                                    <div className="flex flex-wrap gap-2">
                                                        <div className="flex items-center bg-white/70 rounded-full px-3 py-1 shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:animate-pulse"></div>
                                                            <span className="text-xs font-medium text-green-700">
                                                                STEM Track
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center bg-white/70 rounded-full px-3 py-1 shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:animate-pulse"></div>
                                                            <span className="text-xs font-medium text-green-700">
                                                                HUMSS Track
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center bg-white/70 rounded-full px-3 py-1 shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:animate-pulse"></div>
                                                            <span className="text-xs font-medium text-green-700">
                                                                TVL Track
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Your TAFT Image with School Signage */}
                        <div className="lg:w-1/2 flex justify-center">
                            {/* Your TAFT Image - Full Image Display */}
                            <div className="relative w-full max-w-[500px]">
                                <img
                                    src="/images/TAFT.jpg"
                                    alt="Taft NHS School Scene"
                                    className="w-full h-auto object-contain rounded-xl shadow-xl cursor-pointer hover:opacity-90 transition-opacity duration-300"
                                    onClick={() => {
                                        // Add click functionality here
                                        console.log("School scene clicked");
                                    }}
                                />

                                {/* School ID - Small Box */}
                                <div className="absolute bottom-3 right-3 z-10">
                                    <div className="bg-blue-700/90 backdrop-blur-sm rounded px-2 py-1 shadow-lg">
                                        <span className="text-white font-semibold text-xs">
                                            SCHOOL ID: 317701
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Programs Offered - Small Boxes with Different Color */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <div className="inline-block">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 relative">
                                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 rounded-full"></div>
                            </h2>
                        </div>
                    </div>

                    {/* Simple Divider Line */}
                    <div className="flex justify-center mb-4">
                        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 rounded-full"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Junior High School Program - Enhanced Image Design */}
                        <div
                            id="junior-high-section"
                            className="relative rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 group"
                        >
                            {/* Background Image */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src="/images/JHS.jpg"
                                    alt="Junior High School Students"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Gradient Overlay for Better Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Content Below Image - Enhanced */}
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 text-center relative overflow-hidden">
                                {/* Decorative Background Elements */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-300/30 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-500"></div>

                                {/* Title */}
                                <div className="mb-4 relative z-10">
                                    <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto mb-3 group-hover:w-24 transition-all duration-300"></div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-800 transition-colors duration-300">
                                        Welcome to Junior High School
                                    </h3>
                                </div>

                                {/* Button - Enhanced */}
                                <button
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group/btn"
                                    onClick={() => {
                                        // Open Junior High dropdown in navigation
                                        const academicDropdown =
                                            document.querySelector(
                                                '[data-dropdown="academic"]'
                                            );
                                        const juniorHighLink =
                                            document.querySelector(
                                                'a[href*="junior-high"]'
                                            );

                                        if (academicDropdown) {
                                            // Trigger dropdown open
                                            academicDropdown.click();

                                            // Wait a moment for dropdown to open, then click Junior High
                                            setTimeout(() => {
                                                if (juniorHighLink) {
                                                    juniorHighLink.click();
                                                }
                                            }, 100);
                                        } else if (juniorHighLink) {
                                            // Fallback: directly navigate to Junior High
                                            juniorHighLink.click();
                                        }
                                    }}
                                >
                                    <span className="relative z-10">
                                        LEARN MORE
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </div>
                        </div>

                        {/* Senior High School Program - Enhanced Image Design */}
                        <div
                            id="senior-high-section"
                            className="relative rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 group"
                        >
                            {/* Background Image */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src="/images/SHS.jpg"
                                    alt="Senior High School Students"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Gradient Overlay for Better Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Content Below Image - Enhanced */}
                            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 text-center relative overflow-hidden">
                                {/* Decorative Background Elements */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-300/30 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-500"></div>

                                {/* Title */}
                                <div className="mb-4 relative z-10">
                                    <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto mb-3 group-hover:w-24 transition-all duration-300"></div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-800 transition-colors duration-300">
                                        Welcome to Senior High School
                                    </h3>
                                </div>

                                {/* Button - Enhanced */}
                                <button
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group/btn"
                                    onClick={() => {
                                        // Open Senior High dropdown in navigation
                                        const academicDropdown =
                                            document.querySelector(
                                                '[data-dropdown="academic"]'
                                            );
                                        const seniorHighLink =
                                            document.querySelector(
                                                'a[href*="senior-high"]'
                                            );

                                        if (academicDropdown) {
                                            // Trigger dropdown open
                                            academicDropdown.click();

                                            // Wait a moment for dropdown to open, then click Senior High
                                            setTimeout(() => {
                                                if (seniorHighLink) {
                                                    seniorHighLink.click();
                                                }
                                            }, 100);
                                        } else if (seniorHighLink) {
                                            // Fallback: directly navigate to Senior High
                                            seniorHighLink.click();
                                        }
                                    }}
                                >
                                    <span className="relative z-10">
                                        LEARN MORE
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Academics;
