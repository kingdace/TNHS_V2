import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get in touch with us for any inquiries or information
                        about TNHS
                    </p>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Contact Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Address
                                </h3>
                                <p className="text-gray-600">
                                    Taft National High School
                                    <br />
                                    Taft, Eastern Samar
                                    <br />
                                    Philippines
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Phone
                                </h3>
                                <p className="text-gray-600">
                                    +63 912 345 6789
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Email
                                </h3>
                                <p className="text-gray-600">
                                    info@tnhs.edu.ph
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Office Hours
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="font-medium">
                                    Monday - Friday
                                </span>
                                <span className="text-gray-600">
                                    7:00 AM - 5:00 PM
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Saturday</span>
                                <span className="text-gray-600">
                                    8:00 AM - 12:00 PM
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Sunday</span>
                                <span className="text-gray-600">Closed</span>
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

export default Contact;
