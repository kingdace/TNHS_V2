import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    Clock,
    MapPin,
    Phone,
    Mail,
    Users,
    GraduationCap,
    Award,
    BookOpen,
    CheckCircle,
    AlertCircle,
    FileText,
    School,
    Star,
    Brain,
    Globe,
    Zap,
    Trophy,
} from "lucide-react";
import CompactPageHeader from "../../components/ui/CompactPageHeader";

const Admissions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Grade level categories
    const gradeCategories = [
        {
            id: "junior-high",
            name: "Junior High School (Grades 7-10)",
            icon: GraduationCap,
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
            icon: Brain,
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
    ];

    // Special Programs
    const specialPrograms = [
        {
            id: "als",
            name: "Alternative Learning System (ALS)",
            icon: Globe,
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
    ];

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
                {/* School Information Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="w-6 h-6 text-blue-600" />
                            <h3 className="text-lg font-bold text-gray-800">
                                Enrollment Period
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-2">
                            Academic Year 2024-2025
                        </p>
                        <p className="text-sm text-gray-500">
                            March 1 - May 31, 2024
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-6 h-6 text-green-600" />
                            <h3 className="text-lg font-bold text-gray-800">
                                Grade Levels
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-2">
                            Junior & Senior High
                        </p>
                        <p className="text-sm text-gray-500">
                            Grades 7-12 + ALS
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Award className="w-6 h-6 text-purple-600" />
                            <h3 className="text-lg font-bold text-gray-800">
                                Programs Offered
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-2">Academic Tracks</p>
                        <p className="text-sm text-gray-500">
                            STEM, ABM, HUMSS, GAS, TVL
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className="w-6 h-6 text-teal-600" />
                            <h3 className="text-lg font-bold text-gray-800">
                                Special Programs
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-2">
                            Alternative Learning
                        </p>
                        <p className="text-sm text-gray-500">
                            ALS Program Available
                        </p>
                    </div>
                </div>

                {/* Grade Categories Section */}
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
                        {gradeCategories &&
                            gradeCategories.map((category) => (
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
                                                <category.icon className="w-6 h-6 text-white" />
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

                                    {/* Consolidated Requirements - ALS Style Design */}
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
                                                    {category.requirements.map(
                                                        (req, reqIndex) => (
                                                            <li
                                                                key={reqIndex}
                                                                className="flex items-start gap-2"
                                                            >
                                                                <div className="w-3 h-3 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                                    <CheckCircle className="w-2 h-2 text-green-600" />
                                                                </div>
                                                                <span className="text-xs text-gray-700">
                                                                    {req}
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
                                                    {category.process.map(
                                                        (step, stepIndex) => (
                                                            <li
                                                                key={stepIndex}
                                                                className="flex items-start gap-2"
                                                            >
                                                                <div
                                                                    className={`w-4 h-4 bg-gradient-to-r ${category.color} text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`}
                                                                >
                                                                    {stepIndex +
                                                                        1}
                                                                </div>
                                                                <span className="text-xs text-gray-700">
                                                                    {step}
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
                            ))}
                    </div>
                </div>

                {/* Special Programs Section */}
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
                        {specialPrograms &&
                            specialPrograms.map((program) => (
                                <div
                                    key={program.id}
                                    className={`${program.bgColor} rounded-xl border-2 ${program.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}
                                >
                                    {/* Program Header */}
                                    <div className="p-4 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-12 h-12 bg-gradient-to-r ${program.color} rounded-lg flex items-center justify-center shadow-md`}
                                            >
                                                <program.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">
                                                    {program.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {program.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Program Details - Compact Design */}
                                    <div className="p-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {/* Requirements Card */}
                                            <div className="bg-white/60 rounded-lg p-3">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div
                                                        className={`w-6 h-6 bg-gradient-to-r ${program.color} rounded-md flex items-center justify-center`}
                                                    >
                                                        <FileText className="w-3 h-3 text-white" />
                                                    </div>
                                                    <h4 className="font-bold text-gray-800 text-sm">
                                                        Requirements
                                                    </h4>
                                                </div>
                                                <ul className="space-y-1">
                                                    {program.requirements.map(
                                                        (req, index) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-start gap-2"
                                                            >
                                                                <div className="w-3 h-3 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                                    <CheckCircle className="w-2 h-2 text-green-600" />
                                                                </div>
                                                                <span className="text-xs text-gray-700">
                                                                    {req}
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
                                                        className={`w-6 h-6 bg-gradient-to-r ${program.color} rounded-md flex items-center justify-center`}
                                                    >
                                                        <BookOpen className="w-3 h-3 text-white" />
                                                    </div>
                                                    <h4 className="font-bold text-gray-800 text-sm">
                                                        Process
                                                    </h4>
                                                </div>
                                                <ul className="space-y-1">
                                                    {program.process.map(
                                                        (step, index) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-start gap-2"
                                                            >
                                                                <div
                                                                    className={`w-4 h-4 bg-gradient-to-r ${program.color} text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`}
                                                                >
                                                                    {index + 1}
                                                                </div>
                                                                <span className="text-xs text-gray-700">
                                                                    {step}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Features Section */}
                                        {program.features && (
                                            <div className="mt-4">
                                                <div className="bg-white/60 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div
                                                            className={`w-6 h-6 bg-gradient-to-r ${program.color} rounded-md flex items-center justify-center`}
                                                        >
                                                            <Star className="w-3 h-3 text-white" />
                                                        </div>
                                                        <h4 className="font-bold text-gray-800 text-sm">
                                                            Program Features
                                                        </h4>
                                                    </div>
                                                    <ul className="space-y-1">
                                                        {program.features.map(
                                                            (
                                                                feature,
                                                                index
                                                            ) => (
                                                                <li
                                                                    key={index}
                                                                    className="flex items-start gap-2"
                                                                >
                                                                    <div className="w-3 h-3 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                                        <Zap className="w-2 h-2 text-yellow-600" />
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
                            ))}
                    </div>
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-8">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-yellow-800 mb-2">
                                Important Reminders
                            </h3>
                            <ul className="text-yellow-700 space-y-1 text-sm">
                                <li>
                                    • All documents must be original and
                                    photocopied (2 copies each)
                                </li>
                                <li>
                                    • Enrollment is on a first-come,
                                    first-served basis
                                </li>
                                <li>
                                    • Late enrollment may result in limited
                                    slots availability
                                </li>
                                <li>
                                    • For inquiries, visit our school or call
                                    the registrar's office
                                </li>
                                <li>
                                    • Bring valid ID of parent/guardian during
                                    enrollment
                                </li>
                                <li>
                                    • Grade 11 students must choose their track
                                    (STEM, ABM, HUMSS, GAS, TVL)
                                </li>
                                <li>
                                    • ALS program offers flexible schedules for
                                    working students
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="text-center space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <Mail className="w-5 h-5 mr-2" />
                            Contact Admissions Office
                        </Link>
                        <Link
                            to="/about"
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <School className="w-5 h-5 mr-2" />
                            Learn More About TNHS
                        </Link>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Admissions;
