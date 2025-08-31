import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { GraduationCap, Users, Award, MapPin } from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About Taft National High School
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        A beacon of educational excellence in Eastern Samar,
                        committed to nurturing the minds and character of future
                        leaders.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl text-blue-600">
                                Our Mission
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                To provide quality education that empowers
                                students with knowledge, skills, and values
                                necessary for lifelong learning and responsible
                                citizenship.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl text-green-600">
                                Our Vision
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                To be a leading educational institution that
                                produces competent, ethical, and globally
                                competitive graduates.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* School Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="text-center">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <GraduationCap className="h-12 w-12 text-blue-600" />
                            </div>
                            <CardTitle>Established</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-2xl font-bold text-blue-600">
                                1960
                            </CardDescription>
                            <p className="text-sm text-gray-600 mt-2">
                                Over 60 years of educational excellence
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <Users className="h-12 w-12 text-green-600" />
                            </div>
                            <CardTitle>Student Population</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-2xl font-bold text-green-600">
                                1,200+
                            </CardDescription>
                            <p className="text-sm text-gray-600 mt-2">
                                Students from Grades 7-12
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <Award className="h-12 w-12 text-purple-600" />
                            </div>
                            <CardTitle>Accreditation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-2xl font-bold text-purple-600">
                                Level II
                            </CardDescription>
                            <p className="text-sm text-gray-600 mt-2">
                                DepEd Accredited Institution
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Location */}
                <div className="mt-16 text-center">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                                <MapPin className="h-6 w-6 text-red-600" />
                                <span>Our Location</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-gray-700 mb-4">
                                Taft National High School is located in the
                                heart of Taft, Eastern Samar, Philippines.
                            </p>
                            <p className="text-gray-600">
                                Address: Taft, Eastern Samar, Philippines
                                <br />
                                Contact: +63 XXX XXX XXXX
                                <br />
                                Email: info@taftnhs.edu.ph
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default About;
