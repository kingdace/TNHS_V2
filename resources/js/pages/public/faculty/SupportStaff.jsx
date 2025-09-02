import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const SupportStaff = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Support Staff
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our support team maintains the school infrastructure and
                        ensures a safe learning environment
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <h4 className="font-semibold text-gray-800 mb-2">
                            Mr. Jose Santos
                        </h4>
                        <p className="text-gray-600 mb-3">Maintenance</p>
                        <p className="text-blue-600">maintenance@tnhs.edu.ph</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <h4 className="font-semibold text-gray-800 mb-2">
                            Ms. Teresa Cruz
                        </h4>
                        <p className="text-gray-600 mb-3">Security</p>
                        <p className="text-blue-600">security@tnhs.edu.ph</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <h4 className="font-semibold text-gray-800 mb-2">
                            Mr. Miguel Reyes
                        </h4>
                        <p className="text-gray-600 mb-3">IT Support</p>
                        <p className="text-blue-600">it@tnhs.edu.ph</p>
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

export default SupportStaff;
