import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Calendar, Users, Award } from "lucide-react";

const AboutHistory = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-8">
                    <Link
                        to="/about"
                        className="flex items-center text-royal-blue hover:text-blue-700 transition-colors mr-4"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to About
                    </Link>
                </div>

                <div className="text-center">
                    <Calendar className="h-16 w-16 text-royal-blue mx-auto mb-6" />
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our History
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Discover the rich history and legacy of Taft National
                        High School.
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            School History
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Taft National High School has been serving the
                            community of Taft, Eastern Samar for decades,
                            providing quality education and shaping the future
                            of countless students.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <Calendar className="h-8 w-8 text-royal-blue mx-auto mb-2" />
                                <h3 className="font-semibold">Founded</h3>
                                <p className="text-sm text-gray-600">1960s</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <Users className="h-8 w-8 text-royal-blue mx-auto mb-2" />
                                <h3 className="font-semibold">Students</h3>
                                <p className="text-sm text-gray-600">1000+</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <Award className="h-8 w-8 text-royal-blue mx-auto mb-2" />
                                <h3 className="font-semibold">Graduates</h3>
                                <p className="text-sm text-gray-600">5000+</p>
                            </div>
                        </div>
                        <Button
                            asChild
                            className="bg-royal-blue hover:bg-blue-700"
                        >
                            <Link to="/about">Learn More About Us</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutHistory;
