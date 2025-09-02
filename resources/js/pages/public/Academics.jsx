import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Academics = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Academic Programs
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover our comprehensive academic curriculum designed
                        to prepare students for success
                    </p>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Junior High School
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Our Junior High School program (Grades 7-10)
                            provides a strong foundation in core subjects
                            including Mathematics, Science, English, Filipino,
                            Social Studies, and Technology.
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Comprehensive core curriculum</li>
                            <li>• Technology integration</li>
                            <li>• Character education</li>
                            <li>• Extracurricular activities</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Senior High School
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Our Senior High School program (Grades 11-12) offers
                            specialized tracks to prepare students for college
                            and career success.
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Academic Track</li>
                            <li>• Technical-Vocational Track</li>
                            <li>• College preparation</li>
                            <li>• Career guidance</li>
                        </ul>
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

export default Academics;
