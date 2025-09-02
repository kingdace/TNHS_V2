import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Star, Users, Award } from "lucide-react";

const AcademicsSpecialPrograms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-8">
                    <Link
                        to="/academics"
                        className="flex items-center text-royal-blue hover:text-blue-700 transition-colors mr-4"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Academics
                    </Link>
                </div>

                <div className="text-center">
                    <Star className="h-16 w-16 text-royal-blue mx-auto mb-6" />
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Special Programs
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Specialized programs and initiatives designed to enhance
                        student learning and development.
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Coming Soon
                        </h2>
                        <p className="text-gray-600 mb-6">
                            We're developing exciting special programs
                            including:
                        </p>
                        <ul className="text-left space-y-2 text-gray-600 mb-8">
                            <li className="flex items-center">
                                <Award className="h-5 w-5 text-royal-blue mr-2" />
                                Advanced Placement Programs
                            </li>
                            <li className="flex items-center">
                                <Users className="h-5 w-5 text-royal-blue mr-2" />
                                Leadership Development Program
                            </li>
                            <li className="flex items-center">
                                <Star className="h-5 w-5 text-royal-blue mr-2" />
                                Gifted and Talented Program
                            </li>
                        </ul>
                        <Button
                            asChild
                            className="bg-royal-blue hover:bg-blue-700"
                        >
                            <Link to="/contact">Contact Us for More Info</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicsSpecialPrograms;
