import React from "react";
import {
    Award,
    Target,
    Users,
    BookOpen,
    CheckCircle,
    Star,
} from "lucide-react";

const AboutQualityPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-royal-blue to-blue-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">
                            Quality Policy
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Our commitment to delivering excellence in education
                            through continuous improvement and adherence to the
                            highest standards.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Quality Policy Statement */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Quality Policy Statement
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-royal-blue to-blue-600 rounded-full mx-auto"></div>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-gray-700 leading-relaxed text-center italic">
                            "Taft National High School is committed to providing
                            quality education that meets and exceeds the
                            standards set by the Department of Education. We are
                            dedicated to continuous improvement in all aspects
                            of our educational services, ensuring that every
                            student receives the best possible learning
                            experience."
                        </p>
                    </div>
                </div>

                {/* Quality Objectives */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Quality Objectives
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Academic Excellence
                            </h3>
                            <p className="text-gray-600">
                                Achieve 95% passing rate in all subjects and
                                maintain high academic standards across all
                                grade levels.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Student Development
                            </h3>
                            <p className="text-gray-600">
                                Foster holistic development through
                                comprehensive programs that address academic,
                                social, and emotional needs.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Curriculum Enhancement
                            </h3>
                            <p className="text-gray-600">
                                Continuously improve curriculum delivery and
                                teaching methodologies to meet evolving
                                educational needs.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Compliance
                            </h3>
                            <p className="text-gray-600">
                                Maintain 100% compliance with DepEd standards
                                and regulations while exceeding minimum
                                requirements.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Stakeholder Satisfaction
                            </h3>
                            <p className="text-gray-600">
                                Achieve 90% satisfaction rate among students,
                                parents, and community stakeholders through
                                quality service delivery.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Continuous Improvement
                            </h3>
                            <p className="text-gray-600">
                                Implement regular assessment and improvement
                                processes to enhance educational outcomes and
                                operational efficiency.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quality Standards */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Quality Standards
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Academic Standards
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        K-12 Curriculum Implementation
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Competency-Based Assessment
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Differentiated Instruction
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Technology Integration
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Operational Standards
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Safe Learning Environment
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Qualified Teaching Staff
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Adequate Learning Resources
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Community Engagement
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Quality Assurance Process */}
                <div className="bg-gradient-to-r from-royal-blue to-blue-600 rounded-2xl shadow-xl p-8 text-white">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Quality Assurance Process
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Plan</h3>
                            <p className="text-blue-100 text-sm">
                                Develop quality objectives and action plans
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Do</h3>
                            <p className="text-blue-100 text-sm">
                                Implement planned activities and processes
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                                Check
                            </h3>
                            <p className="text-blue-100 text-sm">
                                Monitor and evaluate outcomes and performance
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold">4</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Act</h3>
                            <p className="text-blue-100 text-sm">
                                Take corrective actions and continuous
                                improvement
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutQualityPolicy;


