import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Admissions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Admissions
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join our school community and start your educational
                        journey with TNHS
                    </p>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Enrollment Requirements
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    For New Students
                                </h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Birth Certificate (NSO/PSA)</li>
                                    <li>• Report Card from previous school</li>
                                    <li>
                                        • Certificate of Good Moral Character
                                    </li>
                                    <li>• 2x2 ID Picture (3 copies)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    For Transferees
                                </h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Transfer Credential</li>
                                    <li>• Report Card</li>
                                    <li>
                                        • Certificate of Good Moral Character
                                    </li>
                                    <li>• 2x2 ID Picture (3 copies)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Enrollment Process
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    1
                                </span>
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        Submit Requirements
                                    </h3>
                                    <p className="text-gray-600">
                                        Complete all required documents
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    2
                                </span>
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        Assessment
                                    </h3>
                                    <p className="text-gray-600">
                                        Academic evaluation and placement
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    3
                                </span>
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        Registration
                                    </h3>
                                    <p className="text-gray-600">
                                        Complete enrollment forms
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Admissions;
