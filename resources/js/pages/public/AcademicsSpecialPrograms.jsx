import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { academicProgramService } from "../../services/academicProgramService";
import { Loader2 } from "lucide-react";

const AcademicsSpecialPrograms = () => {
    const [loading, setLoading] = useState(true);
    const [alsData, setAlsData] = useState(null);
    const [error, setError] = useState(null);

    const breadcrumbItems = [
        { label: "Academics", href: "/academics" },
        { label: "Special Programs" },
    ];

    // Fallback data (current hardcoded content)
    const fallbackData = {
        page_content: {
            header_title: "TAFT NATIONAL HIGH SCHOOL ALS SHS",
            call_to_action: "Ready to Join Our Alternative Learning System?",
            cta_description:
                "Contact our academic department to learn more about the ALS program, enrollment process, and flexible learning schedules.",
        },
        program_benefits: [
            {
                title: "Age Requirement",
                description: "Must be 18 years old",
                icon: "👤",
                color: "blue",
            },
            {
                title: "Educational Background",
                description: "ALS JHS Passer / Grade 10 Completer",
                icon: "📚",
                color: "blue",
            },
            {
                title: "Alternative Path",
                description: "Old Curriculum Graduate (4th Year High School)",
                icon: "🎓",
                color: "blue",
            },
        ],
        admission_requirements: {
            documents: [
                { id: 1, text: "PSA Birth Certificate" },
                { id: 2, text: "Report Card / A & E Certificate" },
                { id: 3, text: "ALS Enrollment Form" },
            ],
            contact_info: [
                { id: 1, text: "+639505358285", type: "phone" },
                {
                    id: 2,
                    text: "Nueva Ext. Brgy. Taft, Surigao City",
                    type: "address",
                },
            ],
        },
    };

    useEffect(() => {
        fetchALSData();
    }, []);

    const fetchALSData = async () => {
        try {
            setLoading(true);
            const response = await academicProgramService.getALS();

            if (response.success && response.data) {
                setAlsData(response.data);
            } else {
                console.warn("Failed to fetch ALS data, using fallback");
                setAlsData(fallbackData);
            }
        } catch (error) {
            console.error("Error fetching ALS data:", error);
            setError("Failed to load ALS content");
            setAlsData(fallbackData);
        } finally {
            setLoading(false);
        }
    };

    // Use dynamic data or fallback
    const data = alsData || fallbackData;

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Breadcrumb items={breadcrumbItems} />
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">
                        Loading ALS program information...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {error && (
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-800">
                            {error}. Showing default content.
                        </p>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main Content - Same Design as Senior High School */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column - Readable Content */}
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl shadow-lg">
                        {/* Title Banner */}
                        <div className="text-center mb-8">
                            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl shadow-lg mb-4">
                                <h3 className="text-2xl font-black uppercase tracking-wide">
                                    {data.page_content?.header_title ||
                                        "TAFT NATIONAL HIGH SCHOOL ALS SHS"}
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
                                        {data.page_content?.section_titles
                                            ?.qualifications ||
                                            "QUALIFICATIONS"}
                                    </h4>
                                </div>
                                <div className="space-y-3">
                                    {data.program_benefits?.map(
                                        (qualification, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center space-x-3"
                                            >
                                                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-700 font-medium">
                                                    {qualification.description}
                                                </span>
                                            </div>
                                        )
                                    )}
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
                                        {data.page_content?.section_titles
                                            ?.requirements || "REQUIREMENTS"}
                                    </h4>
                                </div>
                                <div className="space-y-3">
                                    {data.admission_requirements?.documents?.map(
                                        (document, index) => (
                                            <div
                                                key={document.id || index}
                                                className="flex items-center space-x-3"
                                            >
                                                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-700 font-medium">
                                                    {document.text}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                            <p className="text-gray-700 text-base leading-relaxed font-medium">
                                <span className="text-blue-600 font-bold">
                                    📞{" "}
                                    {data.page_content?.section_titles
                                        ?.contact || "Contact Information"}
                                </span>
                            </p>
                            <div className="mt-3 space-y-2">
                                {data.admission_requirements?.contact_info?.map(
                                    (contact, index) => (
                                        <p
                                            key={contact.id || index}
                                            className="text-gray-700 font-medium"
                                        >
                                            <span
                                                className={`px-2 py-1 rounded font-bold ${
                                                    contact.type === "phone"
                                                        ? "bg-yellow-200"
                                                        : contact.type ===
                                                          "address"
                                                        ? "bg-green-200"
                                                        : "bg-blue-200"
                                                }`}
                                            >
                                                {contact.type === "phone"
                                                    ? "📱"
                                                    : contact.type === "address"
                                                    ? "📍"
                                                    : "📧"}
                                            </span>{" "}
                                            {contact.text}
                                        </p>
                                    )
                                )}
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

                {/* Contact Section */}
                <div className="text-center mt-8">
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            {data.page_content?.call_to_action ||
                                "Ready to Join Our Alternative Learning System?"}
                        </h2>
                        <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
                            {data.page_content?.cta_description ||
                                "Contact our academic department to learn more about the ALS program, enrollment process, and flexible learning schedules."}
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
