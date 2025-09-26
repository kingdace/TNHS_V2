import React, { useState, useEffect } from "react";
import {
    Shield,
    AlertCircle,
    CheckCircle,
    Lock,
    Eye,
    Database,
    Users,
    FileText,
} from "lucide-react";
import { privacyPolicyService } from "../../services/privacyPolicyService";

const AboutPrivacyPolicy = () => {
    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                setLoading(true);
                const data = await privacyPolicyService.getPublic();
                setPolicy(data);
            } catch (err) {
                console.error("Error fetching privacy policy:", err);
                setError("Failed to load privacy policy");
            } finally {
                setLoading(false);
            }
        };

        fetchPolicy();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading Privacy Policy...</p>
                </div>
            </div>
        );
    }

    if (error || !policy) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Privacy Policy Not Available
                    </h2>
                    <p className="text-gray-600">
                        The privacy policy content is currently being updated.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-royal-blue text-white py-8">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-2">
                            {policy.title}
                        </h1>
                        <p className="text-blue-100">
                            Your privacy is important to us
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content - Single Structured Document */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Document Header */}
                    <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-royal-blue rounded-full flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Privacy Policy Document
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Taft National High School
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Document Content */}
                    <div className="p-8 space-y-8">
                        {/* Introduction */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white text-xs font-bold">
                                        1
                                    </span>
                                </div>
                                Introduction
                            </h3>
                            <div className="bg-blue-50 border-l-4 border-royal-blue p-6 rounded-r-lg">
                                <p className="text-gray-800 leading-relaxed">
                                    {policy.introduction}
                                </p>
                            </div>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white text-xs font-bold">
                                        2
                                    </span>
                                </div>
                                Information We Collect
                            </h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {policy.information_collected.map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                                        >
                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className="w-8 h-8 bg-royal-blue rounded-lg flex items-center justify-center">
                                                    {index === 0 && (
                                                        <Users className="w-4 h-4 text-white" />
                                                    )}
                                                    {index === 1 && (
                                                        <FileText className="w-4 h-4 text-white" />
                                                    )}
                                                    {index === 2 && (
                                                        <Database className="w-4 h-4 text-white" />
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {index === 0 &&
                                                        "Student Info"}
                                                    {index === 1 &&
                                                        "Parent Info"}
                                                    {index === 2 &&
                                                        "Staff Info"}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {item}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* How We Use Information */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white text-xs font-bold">
                                        3
                                    </span>
                                </div>
                                How We Use Your Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {policy.how_we_use.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                                    >
                                        <Lock className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm leading-relaxed">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Data Protection Measures */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white text-xs font-bold">
                                        4
                                    </span>
                                </div>
                                Data Protection Measures
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {policy.data_protection.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center"
                                    >
                                        <div className="w-12 h-12 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-3">
                                            {index === 0 && (
                                                <Shield className="w-6 h-6 text-white" />
                                            )}
                                            {index === 1 && (
                                                <Lock className="w-6 h-6 text-white" />
                                            )}
                                            {index === 2 && (
                                                <Eye className="w-6 h-6 text-white" />
                                            )}
                                            {index === 3 && (
                                                <Database className="w-6 h-6 text-white" />
                                            )}
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Your Rights */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white text-xs font-bold">
                                        5
                                    </span>
                                </div>
                                Your Rights
                            </h3>
                            <div className="bg-royal-blue text-white p-6 rounded-lg">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-semibold mb-4">
                                            Data Subject Rights
                                        </h4>
                                        <ul className="space-y-2">
                                            {policy.your_rights.map(
                                                (right, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start space-x-2"
                                                    >
                                                        <span className="text-blue-200">
                                                            •
                                                        </span>
                                                        <span className="text-blue-100 text-sm">
                                                            {right}
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-4">
                                            How to Exercise Your Rights
                                        </h4>
                                        <ul className="space-y-2 text-blue-100 text-sm">
                                            <li>
                                                • Submit a written request to
                                                the school
                                            </li>
                                            <li>
                                                • Contact the Data Protection
                                                Officer
                                            </li>
                                            <li>
                                                • Provide valid identification
                                            </li>
                                            <li>
                                                • Allow reasonable processing
                                                time
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Policy Updates */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white text-xs font-bold">
                                        6
                                    </span>
                                </div>
                                Policy Updates
                            </h3>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                <p className="text-yellow-800 leading-relaxed">
                                    {policy.policy_updates}
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Document Footer */}
                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>Active Policy</span>
                            </div>
                            <div className="text-right">
                                <p>Department of Education</p>
                                <p>Taft National High School</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPrivacyPolicy;
