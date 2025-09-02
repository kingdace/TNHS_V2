import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const AssistantPrincipal = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Mr. Juan Dela Cruz
                    </h1>
                    <p className="text-2xl text-green-600 font-semibold mb-4">
                        Assistant Principal
                    </p>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Supporting school leadership and ensuring student
                        success through dedicated service
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Education & Experience
                        </h3>
                        <p>
                            <span className="font-medium">Education:</span>{" "}
                            Master of Arts in Education Management
                        </p>
                        <p>
                            <span className="font-medium">Experience:</span> 12+
                            years in educational leadership
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-6">
                            Key Responsibilities
                        </h3>
                        <ul className="space-y-2">
                            <li>• Student Discipline and Welfare</li>
                            <li>• Curriculum Development</li>
                            <li>• Teacher Supervision</li>
                            <li>• Academic Performance Monitoring</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Contact Information
                        </h3>
                        <p>
                            <span className="font-medium">Email:</span>{" "}
                            assistant.principal@tnhs.edu.ph
                        </p>
                        <p>
                            <span className="font-medium">Phone:</span> +63 912
                            345 6790
                        </p>
                        <p>
                            <span className="font-medium">Office:</span>{" "}
                            Assistant Principal's Office, Main Building
                        </p>
                    </div>
                </div>

                {/* Navigation */}
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

export default AssistantPrincipal;
