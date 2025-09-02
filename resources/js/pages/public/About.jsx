import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        About TNHS
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Learn about our school's history, mission, and
                        commitment to educational excellence
                    </p>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Our History
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Taft National High School was established in 1965
                            and has been serving the community of Taft, Eastern
                            Samar for over 50 years. We have grown from a small
                            school to a comprehensive educational institution.
                        </p>
                        <p className="text-gray-600">
                            Throughout our history, we have maintained our
                            commitment to academic excellence and character
                            development, preparing thousands of students for
                            successful futures.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 mb-4">
                            To provide quality education that empowers students
                            to become responsible, productive, and successful
                            individuals who contribute positively to society.
                        </p>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Our Vision
                        </h3>
                        <p className="text-gray-600">
                            To be a leading educational institution that fosters
                            academic excellence, character development, and
                            innovation in learning.
                        </p>
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

export default About;
