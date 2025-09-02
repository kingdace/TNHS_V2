import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const TeachingStaff = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Teaching Staff
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our dedicated educators inspire and guide students
                        towards academic excellence
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                            Grade 7 Teachers
                        </h3>
                        <div className="space-y-3">
                            <div className="text-center">
                                <h4 className="font-semibold text-gray-800">
                                    Ms. Ana Reyes
                                </h4>
                                <p className="text-blue-600">English</p>
                                <p className="text-sm text-gray-600">
                                    8 years experience
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                            Grade 8 Teachers
                        </h3>
                        <div className="space-y-3">
                            <div className="text-center">
                                <h4 className="font-semibold text-gray-800">
                                    Mr. Carlos Mendoza
                                </h4>
                                <p className="text-blue-600">Mathematics</p>
                                <p className="text-sm text-gray-600">
                                    10 years experience
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                            Senior High
                        </h3>
                        <div className="space-y-3">
                            <div className="text-center">
                                <h4 className="font-semibold text-gray-800">
                                    Dr. Isabel Santos
                                </h4>
                                <p className="text-blue-600">Research</p>
                                <p className="text-sm text-gray-600">
                                    15 years experience
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/faculty"
                        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                        ← Back to Faculty Overview
                    </Link>
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

export default TeachingStaff;
