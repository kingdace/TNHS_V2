import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Users,
    Award,
    Calendar,
    MapPin,
    Clock,
    Briefcase,
    GraduationCap,
} from "lucide-react";

const AcademicsSeniorHigh = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const tracks = [
        {
            name: "Academic Track",
            description: "Preparatory for college education",
            strands: [
                {
                    name: "STEM",
                    description:
                        "Science, Technology, Engineering, Mathematics",
                },
                {
                    name: "ABM",
                    description: "Accountancy, Business, Management",
                },
                {
                    name: "HUMSS",
                    description: "Humanities and Social Sciences",
                },
                { name: "GAS", description: "General Academic Strand" },
            ],
        },
        {
            name: "Technical-Vocational-Livelihood (TVL) Track",
            description: "Skills-based education for immediate employment",
            strands: [
                {
                    name: "ICT",
                    description: "Information and Communications Technology",
                },
                { name: "HE", description: "Home Economics" },
                { name: "IA", description: "Industrial Arts" },
                { name: "AFA", description: "Agriculture and Fisheries Arts" },
            ],
        },
    ];

    const features = [
        {
            icon: GraduationCap,
            title: "College Preparation",
            description:
                "Rigorous academic preparation for university admission",
        },
        {
            icon: Briefcase,
            title: "Career Readiness",
            description:
                "Practical skills development for immediate employment",
        },
        {
            icon: Users,
            title: "Small Class Sizes",
            description: "Maximum 35 students per class for focused learning",
        },
        {
            icon: Award,
            title: "Industry Partnerships",
            description: "Collaboration with local businesses and industries",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Senior High School
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Preparing students for college and career success
                        through specialized tracks and strands
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
                                Our Senior High School program offers
                                specialized tracks and strands designed to
                                prepare students for their chosen career paths.
                                Whether pursuing higher education or entering
                                the workforce, our comprehensive program ensures
                                students are well-equipped for their future.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-700">
                                        Grades 11-12
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
                                        Track and Strand Specialization
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Work Immersion Program
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Career Guidance
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Industry Partnerships
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

                {/* Tracks and Strands */}
                <div className="space-y-12 mb-12">
                    {tracks.map((track, trackIndex) => (
                        <div
                            key={trackIndex}
                            className="bg-white rounded-2xl shadow-xl p-8"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    {track.name}
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    {track.description}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {track.strands.map((strand, strandIndex) => (
                                    <div
                                        key={strandIndex}
                                        className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {strand.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {strand.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Work Immersion Program */}
                <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Work Immersion Program
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Industry Exposure
                            </h3>
                            <p className="text-blue-100">
                                80 hours of hands-on experience in relevant
                                industries
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Mentorship
                            </h3>
                            <p className="text-blue-100">
                                Guidance from industry professionals and experts
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Certification
                            </h3>
                            <p className="text-blue-100">
                                Industry-recognized certificates upon completion
                            </p>
                        </div>
                    </div>
                </div>

                {/* Admission Requirements */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Admission Requirements
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                For Grade 11
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Junior High School Report Card
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Birth Certificate (PSA)
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        2x2 ID Picture (2 copies)
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Good Moral Certificate
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Track and Strand Preference Form
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                For Transferees
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Transfer Credential
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Latest Report Card
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Birth Certificate (PSA)
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Parent/Guardian ID
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Track and Strand Assessment
                                    </span>
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

export default AcademicsSeniorHigh;
