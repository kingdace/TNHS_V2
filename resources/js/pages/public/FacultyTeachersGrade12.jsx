import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { ArrowLeft, Users, BookOpen, Award, Mail } from "lucide-react";

const FacultyTeachersGrade12 = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const grade12Teachers = [
        {
            name: "Ms. Victoria White",
            subject: "English",
            education: "Bachelor of Secondary Education - English",
            experience: "13 years",
            email: "victoria.white@taftnhs.edu.ph",
            image: "/images/BG3.jpg",
        },
        {
            name: "Mr. Alexander Taylor",
            subject: "Mathematics",
            education: "Bachelor of Secondary Education - Mathematics",
            experience: "11 years",
            email: "alexander.taylor@taftnhs.edu.ph",
            image: "/images/BG1.jpg",
        },
        {
            name: "Ms. Gabriela Flores",
            subject: "Science",
            education: "Bachelor of Secondary Education - General Science",
            experience: "12 years",
            email: "gabriela.flores@taftnhs.edu.ph",
            image: "/images/BG2.jpg",
        },
        {
            name: "Mr. Fernando Ramos",
            subject: "Filipino",
            education: "Bachelor of Secondary Education - Filipino",
            experience: "10 years",
            email: "fernando.ramos@taftnhs.edu.ph",
            image: "/images/BG3.jpg",
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center mb-8">
                    <Link
                        to="/faculty"
                        className="flex items-center text-royal-blue hover:text-blue-700 transition-colors mr-4"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Faculty
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <Users className="h-12 w-12 text-royal-blue mr-4" />
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Grade 12 Teaching Staff
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Meet our experienced Grade 12 teachers who prepare
                        students for graduation and future success.
                    </p>
                </div>

                {/* Teachers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {grade12Teachers.map((teacher, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/3 h-48 lg:h-auto">
                                    <img
                                        src={teacher.image}
                                        alt={teacher.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="lg:w-2/3 p-6">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-xl">
                                            {teacher.name}
                                        </CardTitle>
                                        <CardDescription className="text-royal-blue font-semibold">
                                            {teacher.subject} Teacher
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <BookOpen className="h-4 w-4 mr-2 text-royal-blue" />
                                            <span>{teacher.education}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Award className="h-4 w-4 mr-2 text-royal-blue" />
                                            <span>
                                                {teacher.experience} experience
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Mail className="h-4 w-4 mr-2 text-royal-blue" />
                                            <span>{teacher.email}</span>
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FacultyTeachersGrade12;
