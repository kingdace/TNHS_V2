import React, { useState, useEffect } from "react";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { academicProgramService } from "../services/academicProgramService";

const JHSProgramSection = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [programData, setProgramData] = useState(null);

    useEffect(() => {
        fetchJuniorHighData();
    }, []);

    const fetchJuniorHighData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await academicProgramService.getJuniorHigh();

            if (response.success) {
                setProgramData(response.data);
            } else {
                setError(response.error);
                // Use fallback data if API fails
                setFallbackData();
            }
        } catch (err) {
            console.error("Error fetching Junior High data:", err);
            setError("Failed to load program information");
            // Use fallback data if API fails
            setFallbackData();
        } finally {
            setLoading(false);
        }
    };

    // Fallback data (current hardcoded content)
    const setFallbackData = () => {
        setProgramData({
            program_name: "Junior High School Program",
            description:
                "Taft NHS Junior High School offers a comprehensive academic program that covers the four years of Junior High School (Grades 7-10). The curriculum features the interaction of nine subject areas designed to meet the goals of integrative and transformative education.",
            page_content: {
                header_title: "WHY CHOOSE TAFT NHS JUNIOR HIGH SCHOOL?",
                main_description:
                    "Taft NHS Junior High School offers a comprehensive academic program that covers the four years of Junior High School (Grades 7-10). The curriculum features the interaction of nine subject areas designed to meet the goals of integrative and transformative education.",
                section_titles: {
                    benefits: "PROGRAM BENEFITS",
                    features: "Why Choose Our Junior High School?",
                    requirements: "Admission Requirements",
                },
            },
            program_benefits: [
                {
                    id: 1,
                    title: "Excel in Core Subjects",
                    description:
                        "Master essential subjects including Mathematics, English, Filipino, Science, and Social Studies to build a strong foundation for Senior High School.",
                    icon: "📚",
                    color: "blue",
                },
                {
                    id: 2,
                    title: "Develop Life Skills",
                    description:
                        "Participate in MAPEH, TLE, and Values Education programs that promote physical health, creativity, technical skills, and moral development.",
                    icon: "👤",
                    color: "green",
                },
            ],
            why_choose_features: [
                {
                    id: 1,
                    text: "Comprehensive curriculum aligned with DepEd standards",
                    color: "green",
                },
                {
                    id: 2,
                    text: "Well-rounded education covering all subject areas",
                    color: "green",
                },
                {
                    id: 3,
                    text: "Holistic student development programs",
                    color: "green",
                },
                {
                    id: 4,
                    text: "Experienced and dedicated teaching staff",
                    color: "green",
                },
                {
                    id: 5,
                    text: "Modern facilities and learning resources",
                    color: "blue",
                },
                {
                    id: 6,
                    text: "Strong foundation for Senior High School",
                    color: "blue",
                },
                {
                    id: 7,
                    text: "Character formation and values education",
                    color: "blue",
                },
                {
                    id: 8,
                    text: "Safe and nurturing learning environment",
                    color: "blue",
                },
            ],
            admission_requirements: {
                documents: [
                    { text: "Report Card (Form 138)" },
                    { text: "Birth Certificate (PSA)" },
                    { text: "Certificate of Good Moral Character" },
                    { text: "2x2 ID Photos (3 copies)" },
                ],
                schedule: [
                    { text: "April - May: Early Enrollment" },
                    { text: "June: Regular Enrollment" },
                    { text: "Monday - Friday: 8:00 AM - 4:00 PM" },
                    { text: "School Registrar Office" },
                ],
            },
            images: {
                logo: "/images/JLOGO.jpg",
                academic_excellence: "/images/ACAD.jpg",
                student_life: "/images/J1.jpg",
            },
        });
    };

    if (loading) {
        return (
            <div className="bg-white py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <span className="ml-2 text-gray-600">
                            Loading program information...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (!programData) {
        return (
            <div className="bg-white py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center h-64">
                        <AlertCircle className="h-8 w-8 text-red-600" />
                        <span className="ml-2 text-gray-600">
                            Failed to load program information
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Error Message */}
                {error && (
                    <div className="mb-8 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        <div>
                            <p className="font-medium">
                                Using cached information
                            </p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                )}

                {/* Dynamic Header Banner */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-4 px-8 rounded-t-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold uppercase">
                            {programData.page_content?.header_title ||
                                "WHY CHOOSE TAFT NHS JUNIOR HIGH SCHOOL?"}
                        </h2>
                    </div>
                </div>

                {/* Main Content - Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Column - Dynamic Logo Image */}
                    <div className="flex justify-center">
                        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 shadow-lg">
                            <img
                                src={
                                    programData.images?.logo ||
                                    "/images/JLOGO.jpg"
                                }
                                alt="Junior High School Logo"
                                className="w-80 h-80 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                    {/* Right Column - Program Information */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {programData.program_name ||
                                    "Taft NHS Junior High School Program"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {programData.page_content?.main_description ||
                                    programData.description ||
                                    "Taft NHS Junior High School offers a comprehensive academic program that covers the four years of Junior High School (Grades 7-10). The curriculum features the interaction of nine subject areas designed to meet the goals of integrative and transformative education."}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    to="/academics/senior-high"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-200"
                                >
                                    Explore Senior High{" "}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-200">
                                    Inquire Now{" "}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Program Benefits Section - FINAL LAYOUT WITH CORRECT ORDER */}
                <div className="mt-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column - Images + Why Choose JHS */}
                        <div className="space-y-8">
                            <div className="flex justify-center">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="text-center">
                                        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-4">
                                            <img
                                                src={
                                                    programData.images
                                                        ?.academic_excellence ||
                                                    "/images/ACAD.jpg"
                                                }
                                                alt="Academic Excellence"
                                                className="w-full h-80 object-cover"
                                            />
                                        </div>
                                        <div className="bg-gray-200 rounded-lg px-6 py-3">
                                            <span className="text-gray-800 font-bold text-lg">
                                                Academic Excellence
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-4">
                                            <img
                                                src={
                                                    programData.images
                                                        ?.student_life ||
                                                    "/images/J1.jpg"
                                                }
                                                alt="Student Life & Activities"
                                                className="w-full h-80 object-cover"
                                            />
                                        </div>
                                        <div className="bg-gray-200 rounded-lg px-6 py-3">
                                            <span className="text-gray-800 font-bold text-lg">
                                                Student Life & Activities
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Why Choose Our Junior High School - Moved to Left */}
                            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
                                <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                    {programData.page_content?.section_titles
                                        ?.features ||
                                        "Why Choose Our Junior High School?"}
                                </h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        {programData.why_choose_features
                                            ?.slice(0, 4)
                                            .map((feature) => (
                                                <div
                                                    key={feature.id}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <span
                                                        className={`text-${feature.color}-500 text-xl font-bold`}
                                                    >
                                                        ✓
                                                    </span>
                                                    <span className="text-gray-800 text-base font-medium">
                                                        {feature.text}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                    <div className="space-y-4">
                                        {programData.why_choose_features
                                            ?.slice(4, 8)
                                            .map((feature) => (
                                                <div
                                                    key={feature.id}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <span
                                                        className={`text-${feature.color}-500 text-xl font-bold`}
                                                    >
                                                        ✓
                                                    </span>
                                                    <span className="text-gray-800 text-base font-medium">
                                                        {feature.text}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - PROGRAM BENEFITS FIRST, Then Admission Requirements */}
                        <div className="space-y-8">
                            {/* Single Unified Table with Banner and Content - FIRST */}
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                {/* Dynamic PROGRAM BENEFITS Banner */}
                                <div className="bg-blue-600 text-white py-4 px-8 text-center">
                                    <h3 className="text-2xl font-bold uppercase tracking-wide">
                                        {programData.page_content
                                            ?.section_titles?.benefits ||
                                            "PROGRAM BENEFITS"}
                                    </h3>
                                </div>

                                {/* Dynamic Content Section */}
                                <div className="p-8">
                                    <div className="space-y-8">
                                        {programData.program_benefits?.map(
                                            (benefit) => (
                                                <div
                                                    key={benefit.id}
                                                    className="flex items-start space-x-6"
                                                >
                                                    <div
                                                        className={`w-16 h-16 bg-${benefit.color}-500 rounded-full flex items-center justify-center flex-shrink-0`}
                                                    >
                                                        <span className="text-white text-2xl">
                                                            {benefit.icon}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                                                            {benefit.title}
                                                        </h4>
                                                        <div className="flex items-start space-x-3">
                                                            <span className="text-green-500 text-xl font-bold">
                                                                ✓
                                                            </span>
                                                            <p className="text-gray-700 leading-relaxed text-base">
                                                                {
                                                                    benefit.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Admission Requirements Section */}
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
                                <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                    📋{" "}
                                    {programData.page_content?.section_titles
                                        ?.requirements ||
                                        "Admission Requirements"}
                                </h4>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h5 className="text-lg font-semibold text-purple-700 mb-4">
                                            📄 Required Documents
                                        </h5>
                                        <div className="space-y-3">
                                            {programData.admission_requirements?.documents?.map(
                                                (doc, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start space-x-3"
                                                    >
                                                        <span className="text-purple-500 text-lg font-bold">
                                                            •
                                                        </span>
                                                        <span className="text-gray-700 text-sm">
                                                            {doc.text}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-semibold text-pink-700 mb-4">
                                            📅 Enrollment Schedule
                                        </h5>
                                        <div className="space-y-3">
                                            {programData.admission_requirements?.schedule?.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start space-x-3"
                                                    >
                                                        <span className="text-pink-500 text-lg font-bold">
                                                            •
                                                        </span>
                                                        <span className="text-gray-700 text-sm">
                                                            {item.text}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JHSProgramSection;
