import React, { useState, useEffect } from "react";
import { Award, CheckCircle, AlertCircle } from "lucide-react";
import { qualityPolicyService } from "../../services/qualityPolicyService";

const AboutQualityPolicy = () => {
    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                setLoading(true);
                const data = await qualityPolicyService.getPublic();
                setPolicy(data);
            } catch (err) {
                console.error("Error fetching quality policy:", err);
                setError("Failed to load quality policy");
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
                    <p className="text-gray-600">Loading Quality Policy...</p>
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
                        Quality Policy Not Available
                    </h2>
                    <p className="text-gray-600">
                        The quality policy content is currently being updated.
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
                            Department of Education Quality Standards
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
                                <Award className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Quality Policy Document
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Taft National High School
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Document Content */}
                    <div className="p-8 space-y-8">
                        {/* Policy Statement */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white text-xs font-bold">
                                        1
                                    </span>
                                </div>
                                Policy Statement
                            </h3>
                            <div className="bg-blue-50 border-l-4 border-royal-blue p-6 rounded-r-lg">
                                <p className="text-gray-800 leading-relaxed italic">
                                    "{policy.intro_statement}"
                                </p>
                            </div>
                        </section>

                        {/* Key Principles */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white text-xs font-bold">
                                        2
                                    </span>
                                </div>
                                Key Principles
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {policy.key_points.map((point, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                                    >
                                        <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-white text-xs font-bold">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {point}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Our Commitment */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white text-xs font-bold">
                                        3
                                    </span>
                                </div>
                                Our Commitment
                            </h3>
                            <div className="bg-royal-blue text-white p-6 rounded-lg">
                                <p className="text-blue-100 leading-relaxed">
                                    {policy.concluding_statement}
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

export default AboutQualityPolicy;
