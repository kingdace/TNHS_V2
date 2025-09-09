import React from "react";
import { Shield, Lock, Eye, Database, Users, FileText } from "lucide-react";

const AboutPrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-royal-blue to-blue-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Your privacy is important to us. This policy
                            explains how we collect, use, and protect your
                            personal information.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Introduction */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Introduction
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Taft National High School (TNHS) is committed to
                        protecting the privacy and personal information of our
                        students, parents, staff, and visitors. This Privacy
                        Policy outlines how we collect, use, disclose, and
                        safeguard your information in accordance with the Data
                        Privacy Act of 2012 (Republic Act No. 10173) and other
                        applicable laws.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        By using our services or providing personal information
                        to us, you consent to the collection and use of
                        information in accordance with this policy.
                    </p>
                </div>

                {/* Information We Collect */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Information We Collect
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="w-12 h-12 bg-royal-blue rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Student Information
                            </h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Full name and date of birth</li>
                                <li>• Student ID number</li>
                                <li>• Academic records and grades</li>
                                <li>• Attendance records</li>
                                <li>• Emergency contact information</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="w-12 h-12 bg-royal-blue rounded-lg flex items-center justify-center mb-4">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Parent/Guardian Information
                            </h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Full name and relationship</li>
                                <li>• Contact details (phone, email)</li>
                                <li>• Address information</li>
                                <li>• Employment information</li>
                                <li>• Emergency contact details</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="w-12 h-12 bg-royal-blue rounded-lg flex items-center justify-center mb-4">
                                <Database className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Staff Information
                            </h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Personal and professional details</li>
                                <li>• Employment records</li>
                                <li>• Performance evaluations</li>
                                <li>• Training records</li>
                                <li>• Contact information</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* How We Use Information */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        How We Use Your Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Educational Purposes
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3">
                                    <Lock className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Academic record keeping and reporting
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Lock className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Student progress monitoring
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Lock className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Curriculum planning and implementation
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Lock className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Assessment and evaluation
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Administrative Purposes
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3">
                                    <Lock className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Communication with parents and guardians
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Lock className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Emergency contact and safety measures
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Lock className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Compliance with DepEd requirements
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Lock className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        Statistical reporting and research
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Data Protection */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Data Protection Measures
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Secure Storage
                            </h3>
                            <p className="text-gray-600 text-sm">
                                All personal data is stored in secure, encrypted
                                databases with restricted access.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Access Control
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Only authorized personnel have access to
                                personal information on a need-to-know basis.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <Eye className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Monitoring
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Regular monitoring and auditing of data access
                                and usage to prevent unauthorized access.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <Database className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Data Retention
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Personal data is retained only for as long as
                                necessary for legitimate purposes.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Your Rights */}
                <div className="bg-gradient-to-r from-royal-blue to-blue-600 rounded-2xl shadow-xl p-8 text-white mb-12">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Your Rights
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">
                                Data Subject Rights
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3">
                                    <span className="text-blue-200">•</span>
                                    <span>
                                        Right to be informed about data
                                        collection
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className="text-blue-200">•</span>
                                    <span>
                                        Right to access your personal data
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className="text-blue-200">•</span>
                                    <span>
                                        Right to correct inaccurate information
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className="text-blue-200">•</span>
                                    <span>
                                        Right to object to data processing
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">
                                How to Exercise Your Rights
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3">
                                    <span className="text-blue-200">•</span>
                                    <span>
                                        Submit a written request to the school
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className="text-blue-200">•</span>
                                    <span>
                                        Contact the Data Protection Officer
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className="text-blue-200">•</span>
                                    <span>Provide valid identification</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className="text-blue-200">•</span>
                                    <span>
                                        Allow reasonable processing time
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Contact Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Data Protection Officer
                            </h3>
                            <div className="space-y-2 text-gray-700">
                                <p>
                                    <strong>Name:</strong> Mrs. Maria Santos
                                </p>
                                <p>
                                    <strong>Position:</strong> Data Protection
                                    Officer
                                </p>
                                <p>
                                    <strong>Email:</strong> dpo@taftnhs.edu.ph
                                </p>
                                <p>
                                    <strong>Phone:</strong> (086) 826-1234
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                School Administration
                            </h3>
                            <div className="space-y-2 text-gray-700">
                                <p>
                                    <strong>Address:</strong> Barangay Taft,
                                    Surigao City
                                </p>
                                <p>
                                    <strong>Email:</strong> info@taftnhs.edu.ph
                                </p>
                                <p>
                                    <strong>Phone:</strong> (086) 826-1234
                                </p>
                                <p>
                                    <strong>Website:</strong> www.taftnhs.edu.ph
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Policy Updates */}
                <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                        Policy Updates
                    </h3>
                    <p className="text-yellow-700">
                        This Privacy Policy may be updated from time to time. We
                        will notify you of any significant changes by posting
                        the updated policy on our website and through
                        appropriate communication channels. The last update was
                        made on January 1, 2024.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPrivacyPolicy;


