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
import { BookOpen, Users, Award, Calendar } from "lucide-react";

const Academics = () => {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Academic Programs
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive curriculum designed to prepare students
                        for higher education and future careers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Junior High School (Grades 7-10)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Core subjects including Mathematics, Science,
                                English, Filipino, Social Studies, and Values
                                Education.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Senior High School (Grades 11-12)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Academic, Technical-Vocational, and Sports
                                tracks with specialized subjects and career
                                guidance.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Special Programs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Advanced Mathematics, Science and Technology,
                                Arts and Culture, and Sports Development
                                programs.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Academics;
