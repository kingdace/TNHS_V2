import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import JHSProgramSection from "../../components/JHSProgramSection";

const AcademicsJuniorHigh = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="mb-8">
                    <div className="flex items-center space-x-4 text-lg">
                        <Link
                            to="/"
                            className="hover:text-blue-600 transition-all duration-300 font-bold text-gray-800 hover:underline hover:scale-105 transform"
                        >
                            Home
                        </Link>
                        <ChevronRight className="h-6 w-6 text-gray-500" />
                        <Link
                            to="/academics"
                            className="hover:text-blue-600 transition-all duration-300 font-bold text-gray-800 hover:underline hover:scale-105 transform"
                        >
                            Academics
                        </Link>
                        <ChevronRight className="h-6 w-6 text-gray-500" />
                        <span className="text-blue-600 font-bold text-xl bg-blue-50 px-3 py-1 rounded-lg shadow-sm">
                            Junior High School
                        </span>
                    </div>
                </nav>

                {/* Back to Programs Overview */}
                <div className="mb-8">
                    <Link
                        to="/academics"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 font-bold text-lg hover:underline hover:scale-105 transform bg-blue-50 px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="h-5 w-5 mr-3" />
                        Back to Programs Overview
                    </Link>
                </div>

                {/* JHS Program Section */}
                <JHSProgramSection />
            </div>
        </div>
    );
};

export default AcademicsJuniorHigh;
