import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    Users,
    GraduationCap,
    Award,
    BookOpen,
    CheckCircle,
    AlertCircle,
    FileText,
    Star,
    Brain,
    Globe,
    Loader2,
} from "lucide-react";
import CompactPageHeader from "../../components/ui/CompactPageHeader";
import { enrollmentGuidelinesService } from "../../services/enrollmentGuidelinesService";

const Admissions = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [infoCards, setInfoCards] = useState([]);
    const [gradeCategories, setGradeCategories] = useState([]);
    const [specialPrograms, setSpecialPrograms] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchEnrollmentData();
    }, []);

    const fetchEnrollmentData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await enrollmentGuidelinesService.getAll();

            if (response.success && response.data) {
                // Ensure we always have arrays, even if empty
                setInfoCards(
                    Array.isArray(response.data.info_cards)
                        ? response.data.info_cards
                        : []
                );
                setGradeCategories(
                    Array.isArray(response.data.grade_categories)
                        ? response.data.grade_categories
                        : []
                );
                setSpecialPrograms(
                    Array.isArray(response.data.special_programs)
                        ? response.data.special_programs
                        : []
                );
            } else {
                console.warn(
                    "API response not successful or no data:",
                    response
                );
                setError(response.error || "No data available");
                // Use fallback data if API fails
                setFallbackData();
            }
        } catch (err) {
            console.error("Error fetching enrollment data:", err);
            setError("Failed to load enrollment information");
            // Use fallback data if API fails
            setFallbackData();
        } finally {
            setLoading(false);
        }
    };

    // Fallback data (original hardcoded data)
    const setFallbackData = () => {
        setInfoCards([
            {
                id: 1,
                title: "Enrollment Period",
                content: "Academic Year 2024-2025",
                details: "March 1 - May 31, 2024",
                icon: "Calendar",
                color: "text-blue-600",
            },
            {
                id: 2,
                title: "Grade Levels",
                content: "Junior & Senior High",
                details: "Grades 7-12 + ALS",
                icon: "Users",
                color: "text-green-600",
            },
            {
                id: 3,
                title: "Programs Offered",
                content: "Academic Tracks",
                details: "STEM, ABM, HUMSS, GAS, TVL",
                icon: "Award",
                color: "text-purple-600",
            },
            {
                id: 4,
                title: "Special Programs",
                content: "Alternative Learning",
                details: "ALS Program Available",
                icon: "Globe",
                color: "text-teal-600",
            },
        ]);

        setGradeCategories([
            {
                id: "junior-high",
                name: "Junior High School (Grades 7-10)",
                icon: "GraduationCap",
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                description:
                    "Four-year junior high school program with comprehensive curriculum",
                requirements: [
                    "PSA Birth Certificate (Original + 2 photocopies)",
                    "Report Card (SF9) from previous grade level (Original + 2 photocopies)",
                    "Certificate of Good Moral Character",
                    "2x2 ID Pictures (3 copies, white background)",
                    "Medical Certificate (from any licensed physician)",
                    "Parent/Guardian's Valid ID (2 photocopies)",
                    "Certificate of Completion (Elementary) - For Grade 7 only",
                    "Transfer Credential (Original + 2 photocopies) - For Grades 8-10 only",
                ],
                process: [
                    "Submit all required documents",
                    "Academic assessment and interview (No entrance exam for Grade 7)",
                    "Student and parent interview",
                    "Parent/Guardian orientation (Grade 7)",
                    "Enrollment completion and class assignment",
                ],
                notes: "Grade 7: Most popular entry point for new students. Grades 8-10: Transferee students only",
            },
            {
                id: "senior-high",
                name: "Senior High School (Grades 11-12)",
                icon: "Brain",
                color: "from-indigo-500 to-indigo-600",
                bgColor: "bg-indigo-50",
                borderColor: "border-indigo-200",
                description:
                    "Two-year senior high school with specialized tracks and career preparation",
                requirements: [
                    "PSA Birth Certificate (Original + 2 photocopies)",
                    "Report Card (SF9) from previous grade level (Original + 2 photocopies)",
                    "Certificate of Good Moral Character",
                    "2x2 ID Pictures (3 copies, white background)",
                    "Medical Certificate (from any licensed physician)",
                    "Parent/Guardian's Valid ID (2 photocopies)",
                    "Certificate of Completion (Junior High School) - For Grade 11 only",
                    "Track Preference Form (STEM, ABM, HUMSS, GAS, TVL) - For Grade 11 only",
                    "Transfer Credential (Original + 2 photocopies) - For Grade 12 only",
                ],
                process: [
                    "Submit all required documents",
                    "Track assessment and counseling (Grade 11)",
                    "Student and parent interview",
                    "Track selection and confirmation (Grade 11)",
                    "Enrollment completion and class assignment",
                ],
                notes: "Grade 11: Track selection required (STEM, ABM, HUMSS, GAS, TVL). Grade 12: Final year before graduation",
            },
        ]);

        setSpecialPrograms([
            {
                id: "als",
                name: "Alternative Learning System (ALS)",
                icon: "Globe",
                color: "from-teal-500 to-teal-600",
                bgColor: "bg-teal-50",
                borderColor: "border-teal-200",
                description:
                    "Flexible learning program for out-of-school youth and adults",
                requirements: [
                    "PSA Birth Certificate (Original + 2 photocopies)",
                    "Certificate of Good Moral Character",
                    "2x2 ID Pictures (3 copies, white background)",
                    "Medical Certificate (from any licensed physician)",
                    "Parent/Guardian's Valid ID (2 photocopies)",
                    "ALS Registration Form",
                    "Previous school records (if any)",
                ],
                process: [
                    "Submit all required documents",
                    "ALS assessment and interview",
                    "Learning plan development",
                    "Enrollment completion and schedule assignment",
                ],
                notes: "Self-paced learning with flexible schedule - perfect for working students",
                features: [
                    "Flexible learning schedule",
                    "Competency-based curriculum",
                    "Accreditation and Equivalency (A&E) Test preparation",
                    "Life skills integration",
                    "Community-based learning",
                ],
            },
        ]);
    };
    // Get icon component
    const getIconComponent = (iconName) => {
        const icons = {
            Calendar,
            Users,
            Award,
            Globe,
            GraduationCap,
            Brain,
            FileText,
            BookOpen,
            Star,
        };
        return icons[iconName] || FileText;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white pb-20">
                <CompactPageHeader
                    icon={GraduationCap}
                    title="Enrollment Guidelines"
                    subtitle="Loading enrollment information..."
                    gradient="from-blue-600 to-green-600"
                    bgPattern="from-blue-50 to-green-50"
                />
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Compact Header */}
            <CompactPageHeader
                icon={GraduationCap}
                title="Enrollment Guidelines"
                subtitle="Comprehensive enrollment information for Junior High School (Grades 7-10) and Senior High School (Grades 11-12) plus special programs."
                gradient="from-blue-600 to-green-600"
                bgPattern="from-blue-50 to-green-50"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        <div>
                            <p className="font-medium">
                                Using cached information
                            </p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                )}

                {/* School Information Cards - Dynamic */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    {Array.isArray(infoCards) &&
                        infoCards.map((card) => {
                            const IconComponent = getIconComponent(card.icon);
                            return (
                                <div
                                    key={card.id}
                                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <IconComponent
                                            className={`w-6 h-6 ${
                                                card.color || "text-blue-600"
                                            }`}
                                        />
                                        <h3 className="text-lg font-bold text-gray-800">
                                            {card.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-2">
                                        {card.content}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {card.details}
                                    </p>
                                </div>
                            );
                        })}
                </div>

                {/* Grade Categories Section - Dynamic */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Grade Level Requirements
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Detailed enrollment requirements and processes for
                            each grade category
                        </p>
                    </div>

                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                        {Array.isArray(gradeCategories) &&
                            gradeCategories.map((category) => {
                                const IconComponent = getIconComponent(
                                    category.icon
                                );
                                return (
                                    <div
                                        key={category.id}
                                        className={`${category.bgColor} rounded-xl border-2 ${category.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}
                                    >
                                        {/* Category Header */}
                                        <div className="p-4 border-b border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center shadow-md`}
                                                >
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-800">
                                                        {category.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {category.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Consolidated Requirements */}
                                        <div className="p-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {/* Requirements Card */}
                                                <div className="bg-white/60 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div
                                                            className={`w-6 h-6 bg-gradient-to-r ${category.color} rounded-md flex items-center justify-center`}
                                                        >
                                                            <FileText className="w-3 h-3 text-white" />
                                                        </div>
                                                        <h4 className="font-bold text-gray-800 text-sm">
                                                            Requirements
                                                        </h4>
                                                    </div>
                                                    <ul className="space-y-1">
                                                        {Array.isArray(
                                                            category.requirements
                                                        ) &&
                                                            category.requirements.map(
                                                                (
                                                                    req,
                                                                    reqIndex
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            reqIndex
                                                                        }
                                                                        className="flex items-start gap-2"
                                                                    >
                                                                        <div className="w-3 h-3 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                                            <CheckCircle className="w-2 h-2 text-green-600" />
                                                                        </div>
                                                                        <span className="text-xs text-gray-700">
                                                                            {
                                                                                req
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                    </ul>
                                                </div>

                                                {/* Process Card */}
                                                <div className="bg-white/60 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div
                                                            className={`w-6 h-6 bg-gradient-to-r ${category.color} rounded-md flex items-center justify-center`}
                                                        >
                                                            <BookOpen className="w-3 h-3 text-white" />
                                                        </div>
                                                        <h4 className="font-bold text-gray-800 text-sm">
                                                            Process
                                                        </h4>
                                                    </div>
                                                    <ul className="space-y-1">
                                                        {Array.isArray(
                                                            category.process
                                                        ) &&
                                                            category.process.map(
                                                                (
                                                                    step,
                                                                    stepIndex
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            stepIndex
                                                                        }
                                                                        className="flex items-start gap-2"
                                                                    >
                                                                        <div
                                                                            className={`w-4 h-4 bg-gradient-to-r ${category.color} text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`}
                                                                        >
                                                                            {stepIndex +
                                                                                1}
                                                                        </div>
                                                                        <span className="text-xs text-gray-700">
                                                                            {
                                                                                step
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Notes Section */}
                                            <div className="mt-4">
                                                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg p-3">
                                                    <div className="flex items-start gap-2">
                                                        <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <AlertCircle className="w-3 h-3 text-yellow-600" />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-bold text-yellow-800 mb-1 text-xs">
                                                                Important Notes
                                                            </h5>
                                                            <p className="text-xs text-yellow-700 leading-relaxed">
                                                                {category.notes}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                {/* Special Programs Section - Dynamic */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Special Programs
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Alternative learning opportunities for diverse
                            educational needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                        {Array.isArray(specialPrograms) &&
                            specialPrograms.map((program) => {
                                const IconComponent = getIconComponent(
                                    program.icon
                                );
                                return (
                                    <div
                                        key={program.id}
                                        className={`${program.bgColor} rounded-xl border-2 ${program.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}
                                    >
                                        {/* Program Header */}
                                        <div className="p-4 border-b border-gray-200 relative">
                                            {/* Compact Coming Soon Badge - Centered */}
                                            {program.id === "sped" && (
                                                <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                                                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm">
                                                        Coming Soon
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3 mt-6">
                                                <div
                                                    className={`w-12 h-12 bg-gradient-to-r ${
                                                        program.color_gradient ||
                                                        program.color
                                                    } rounded-lg flex items-center justify-center shadow-md ${
                                                        program.id === "sped"
                                                            ? "opacity-60"
                                                            : ""
                                                    }`}
                                                >
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3
                                                            className={`text-xl font-bold ${
                                                                program.id ===
                                                                "sped"
                                                                    ? "text-gray-500"
                                                                    : "text-gray-800"
                                                            }`}
                                                        >
                                                            {program.name}
                                                        </h3>
                                                        {program.id ===
                                                            "sped" && (
                                                            <span className="text-orange-600 text-sm font-medium">
                                                                (Future Program)
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p
                                                        className={`text-sm ${
                                                            program.id ===
                                                            "sped"
                                                                ? "text-gray-500"
                                                                : "text-gray-600"
                                                        }`}
                                                    >
                                                        {program.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Program Details */}
                                        <div className="p-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {/* Requirements Card */}
                                                <div className="bg-white/60 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div
                                                            className={`w-6 h-6 bg-gradient-to-r ${
                                                                program.color_gradient ||
                                                                program.color
                                                            } rounded-md flex items-center justify-center`}
                                                        >
                                                            <FileText className="w-3 h-3 text-white" />
                                                        </div>
                                                        <h4 className="font-bold text-gray-800 text-sm">
                                                            {program.id ===
                                                            "sped"
                                                                ? "Development Status"
                                                                : "Requirements"}
                                                        </h4>
                                                    </div>
                                                    <ul className="space-y-1">
                                                        {Array.isArray(
                                                            program.requirements
                                                        ) &&
                                                            program.requirements.map(
                                                                (
                                                                    req,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex items-start gap-2"
                                                                    >
                                                                        <div
                                                                            className={`w-3 h-3 ${
                                                                                program.id ===
                                                                                "sped"
                                                                                    ? "bg-orange-100"
                                                                                    : "bg-green-100"
                                                                            } rounded-full flex items-center justify-center flex-shrink-0 mt-1`}
                                                                        >
                                                                            {program.id ===
                                                                            "sped" ? (
                                                                                <AlertCircle className="w-2 h-2 text-orange-600" />
                                                                            ) : (
                                                                                <CheckCircle className="w-2 h-2 text-green-600" />
                                                                            )}
                                                                        </div>
                                                                        <span
                                                                            className={`text-xs ${
                                                                                program.id ===
                                                                                "sped"
                                                                                    ? "text-gray-600 italic"
                                                                                    : "text-gray-700"
                                                                            }`}
                                                                        >
                                                                            {
                                                                                req
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                    </ul>
                                                </div>

                                                {/* Process Card */}
                                                <div className="bg-white/60 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div
                                                            className={`w-6 h-6 bg-gradient-to-r ${
                                                                program.color_gradient ||
                                                                program.color
                                                            } rounded-md flex items-center justify-center`}
                                                        >
                                                            <BookOpen className="w-3 h-3 text-white" />
                                                        </div>
                                                        <h4 className="font-bold text-gray-800 text-sm">
                                                            {program.id ===
                                                            "sped"
                                                                ? "Development Timeline"
                                                                : "Process"}
                                                        </h4>
                                                    </div>
                                                    <ul className="space-y-1">
                                                        {Array.isArray(
                                                            program.process
                                                        ) &&
                                                            program.process.map(
                                                                (
                                                                    step,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex items-start gap-2"
                                                                    >
                                                                        <div
                                                                            className={`w-4 h-4 bg-gradient-to-r ${program.color} text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`}
                                                                        >
                                                                            {index +
                                                                                1}
                                                                        </div>
                                                                        <span className="text-xs text-gray-700">
                                                                            {
                                                                                step
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Features Section */}
                                            {program.features &&
                                                program.features.length > 0 && (
                                                    <div className="mt-4">
                                                        <div className="bg-white/60 rounded-lg p-3">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div
                                                                    className={`w-6 h-6 bg-gradient-to-r ${program.color} rounded-md flex items-center justify-center`}
                                                                >
                                                                    <Star className="w-3 h-3 text-white" />
                                                                </div>
                                                                <h4 className="font-bold text-gray-800 text-sm">
                                                                    Program
                                                                    Features
                                                                </h4>
                                                            </div>
                                                            <ul className="space-y-1">
                                                                {Array.isArray(
                                                                    program.features
                                                                ) &&
                                                                    program.features.map(
                                                                        (
                                                                            feature,
                                                                            index
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="flex items-start gap-2"
                                                                            >
                                                                                <div className="w-3 h-3 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                                                    <Star className="w-2 h-2 text-blue-600" />
                                                                                </div>
                                                                                <span className="text-xs text-gray-700">
                                                                                    {
                                                                                        feature
                                                                                    }
                                                                                </span>
                                                                            </li>
                                                                        )
                                                                    )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}

                                            {/* Notes Section */}
                                            <div className="mt-4">
                                                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg p-3">
                                                    <div className="flex items-start gap-2">
                                                        <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <AlertCircle className="w-3 h-3 text-yellow-600" />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-bold text-yellow-800 mb-1 text-xs">
                                                                Important Notes
                                                            </h5>
                                                            <p className="text-xs text-yellow-700 leading-relaxed">
                                                                {program.notes}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {/* Contact Information Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Need Help with Enrollment?
                        </h2>
                        <p className="text-gray-600">
                            Our admissions team is here to assist you with the
                            enrollment process
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-3">
                                Visit Our Office
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                                Nueva Extension, Taft, Surigao City
                            </p>
                            <p className="text-gray-600 text-sm">
                                Office Hours: Monday - Friday, 7:00 AM - 5:00 PM
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-3">
                                Get in Touch
                            </h3>
                            <div className="space-y-2">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Contact Information →
                                </Link>
                                <p className="text-gray-600 text-sm">
                                    For specific questions about enrollment
                                    requirements
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admissions;
