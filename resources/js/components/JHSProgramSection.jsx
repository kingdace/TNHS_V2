import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const JHSProgramSection = () => {
    return (
        <div className="bg-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* WHY CHOOSE TAFT NHS JUNIOR HIGH SCHOOL Banner */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-4 px-8 rounded-t-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold uppercase">
                            WHY CHOOSE TAFT NHS JUNIOR HIGH SCHOOL?
                        </h2>
                    </div>
                </div>

                {/* Main Content - Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Column - JLOGO Image */}
                    <div className="flex justify-center">
                        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 shadow-lg">
                            <img
                                src="/images/JLOGO.jpg"
                                alt="Junior High School Logo"
                                className="w-80 h-80 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                    {/* Right Column - Program Information */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Taft NHS Junior High School Program
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Taft NHS Junior High School offers a
                                comprehensive academic program that covers the
                                four years of Junior High School (Grades 7-10).
                                The curriculum features the interaction of nine
                                subject areas designed to meet the goals of
                                integrative and transformative education.
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
                                                src="/images/ACAD.jpg"
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
                                                src="/images/J1.jpg"
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
                                    Why Choose Our Junior High School?
                                </h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-green-500 text-xl font-bold">
                                                ✓
                                            </span>
                                            <span className="text-gray-800 text-base font-medium">
                                                Comprehensive curriculum aligned
                                                with DepEd standards
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-green-500 text-xl font-bold">
                                                ✓
                                            </span>
                                            <span className="text-gray-800 text-base font-medium">
                                                Well-rounded education covering
                                                all subject areas
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-green-500 text-xl font-bold">
                                                ✓
                                            </span>
                                            <span className="text-gray-800 text-base font-medium">
                                                Holistic student development
                                                programs
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-green-500 text-xl font-bold">
                                                ✓
                                            </span>
                                            <span className="text-gray-800 text-base font-medium">
                                                Experienced and dedicated
                                                teaching staff
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-blue-500 text-xl font-bold">
                                                ✓
                                            </span>
                                            <span className="text-gray-800 text-base font-medium">
                                                Modern facilities and learning
                                                resources
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-blue-500 text-xl font-bold">
                                                ✓
                                            </span>
                                            <span className="text-gray-800 text-base font-medium">
                                                Strong foundation for Senior
                                                High School
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-blue-500 text-xl font-bold">
                                                ✓
                                            </span>
                                            <span className="text-gray-800 text-base font-medium">
                                                Character formation and values
                                                education
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-blue-500 text-xl font-bold">
                                                ✓
                                            </span>
                                            <span className="text-gray-800 text-base font-medium">
                                                Safe and nurturing learning
                                                environment
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - PROGRAM BENEFITS FIRST, Then Admission Requirements */}
                        <div className="space-y-8">
                            {/* Single Unified Table with Banner and Content - FIRST */}
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                {/* PROGRAM BENEFITS Banner - Integrated into the table */}
                                <div className="bg-blue-600 text-white py-4 px-8 text-center">
                                    <h3 className="text-2xl font-bold uppercase tracking-wide">
                                        PROGRAM BENEFITS
                                    </h3>
                                </div>

                                {/* Content Section */}
                                <div className="p-8">
                                    <div className="space-y-8">
                                        {/* Excel in Core Subjects */}
                                        <div className="flex items-start space-x-6">
                                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-2xl">
                                                    📚
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900 mb-3">
                                                    Excel in Core Subjects
                                                </h4>
                                                <div className="flex items-start space-x-3">
                                                    <span className="text-green-500 text-xl font-bold">
                                                        ✓
                                                    </span>
                                                    <p className="text-gray-700 leading-relaxed text-base">
                                                        Master essential
                                                        subjects including
                                                        Mathematics, English,
                                                        Filipino, Science, and
                                                        Social Studies to build
                                                        a strong foundation for
                                                        Senior High School.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Develop Life Skills */}
                                        <div className="flex items-start space-x-6">
                                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-2xl">
                                                    👤
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900 mb-3">
                                                    Develop Life Skills
                                                </h4>
                                                <div className="flex items-start space-x-3">
                                                    <span className="text-green-500 text-xl font-bold">
                                                        ✓
                                                    </span>
                                                    <p className="text-gray-700 leading-relaxed text-base">
                                                        Participate in MAPEH,
                                                        TLE, and Values
                                                        Education programs that
                                                        promote physical health,
                                                        creativity, technical
                                                        skills, and moral
                                                        development.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Admission Requirements Section - SECOND */}
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
                                <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                    📋 Admission Requirements
                                </h4>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h5 className="text-lg font-semibold text-purple-700 mb-4">
                                            📄 Required Documents
                                        </h5>
                                        <div className="space-y-3">
                                            <div className="flex items-start space-x-3">
                                                <span className="text-purple-500 text-lg font-bold">
                                                    •
                                                </span>
                                                <span className="text-gray-700 text-sm">
                                                    Report Card (Form 138)
                                                </span>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <span className="text-purple-500 text-lg font-bold">
                                                    •
                                                </span>
                                                <span className="text-gray-700 text-sm">
                                                    Birth Certificate (PSA)
                                                </span>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <span className="text-purple-500 text-lg font-bold">
                                                    •
                                                </span>
                                                <span className="text-gray-700 text-sm">
                                                    Certificate of Good Moral
                                                    Character
                                                </span>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <span className="text-purple-500 text-lg font-bold">
                                                    •
                                                </span>
                                                <span className="text-gray-700 text-sm">
                                                    2x2 ID Photos (3 copies)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-semibold text-pink-700 mb-4">
                                            📅 Enrollment Schedule
                                        </h5>
                                        <div className="space-y-3">
                                            <div className="flex items-start space-x-3">
                                                <span className="text-pink-500 text-lg font-bold">
                                                    •
                                                </span>
                                                <span className="text-gray-700 text-sm">
                                                    April - May: Early
                                                    Enrollment
                                                </span>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <span className="text-pink-500 text-lg font-bold">
                                                    •
                                                </span>
                                                <span className="text-gray-700 text-sm">
                                                    June: Regular Enrollment
                                                </span>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <span className="text-pink-500 text-lg font-bold">
                                                    •
                                                </span>
                                                <span className="text-gray-700 text-sm">
                                                    Monday - Friday: 8:00 AM -
                                                    4:00 PM
                                                </span>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <span className="text-pink-500 text-lg font-bold">
                                                    •
                                                </span>
                                                <span className="text-gray-700 text-sm">
                                                    School Registrar Office
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
        </div>
    );
};

export default JHSProgramSection;
