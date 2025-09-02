import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { User, GraduationCap, Users, Shield, Wrench } from "lucide-react";

const FacultyIndex = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const facultyCategories = [
        {
            name: "Principal",
            description: "School leadership and administration",
            icon: User,
            color: "blue",
            href: "/faculty/principal",
            features: [
                "Educational Leadership",
                "Strategic Planning",
                "Academic Excellence",
            ],
        },
        {
            name: "Assistant Principal",
            description: "Supporting leadership and student welfare",
            icon: Shield,
            color: "green",
            href: "/faculty/assistant-principal",
            features: [
                "Student Discipline",
                "Curriculum Development",
                "Teacher Supervision",
            ],
        },
        {
            name: "Teaching Staff",
            description: "Our dedicated educators and mentors",
            icon: GraduationCap,
            color: "purple",
            href: "/faculty/teaching-staff",
            features: [
                "Subject Specialists",
                "Grade Level Teachers",
                "Academic Mentors",
            ],
        },
        {
            name: "Administrative Staff",
            description: "Supporting school operations",
            icon: Users,
            color: "orange",
            href: "/faculty/administrative-staff",
            features: ["Registrar", "Guidance Counselors", "Librarians"],
        },
        {
            name: "Support Staff",
            description: "Essential services and maintenance",
            icon: Wrench,
            color: "red",
            href: "/faculty/support-staff",
            features: ["Maintenance", "Security", "IT Support"],
        },
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100",
            green: "bg-green-50 border-green-200 text-green-800 hover:bg-green-100",
            purple: "bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100",
            orange: "bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100",
            red: "bg-red-50 border-red-200 text-red-800 hover:bg-red-100",
        };
        return colors[color] || colors.blue;
    };

    const getIconColor = (color) => {
        const colors = {
            blue: "text-blue-600",
            green: "text-green-600",
            purple: "text-purple-600",
            orange: "text-orange-600",
            red: "text-red-600",
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Faculty & Staff
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Meet the dedicated professionals who make TNHS a center
                        of educational excellence. Each team member plays a
                        vital role in our mission to provide quality education.
                    </p>
                </div>

                {/* Faculty Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {facultyCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <Link
                                key={category.name}
                                to={category.href}
                                className="group block"
                            >
                                <div
                                    className={`bg-white rounded-xl shadow-lg p-8 border-2 border-transparent hover:border-gray-200 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}
                                >
                                    {/* Icon */}
                                    <div className="text-center mb-6">
                                        <div
                                            className={`w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <IconComponent
                                                className={`w-10 h-10 ${getIconColor(
                                                    category.color
                                                )}`}
                                            />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            {category.description}
                                        </p>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-3">
                                        {category.features.map(
                                            (feature, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <div
                                                        className={`w-2 h-2 rounded-full bg-${category.color}-400`}
                                                    ></div>
                                                    <span className="text-gray-700 text-sm">
                                                        {feature}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {/* View Details Button */}
                                    <div className="mt-6 text-center">
                                        <span
                                            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${getColorClasses(
                                                category.color
                                            )}`}
                                        >
                                            View Details →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Faculty Overview
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                1
                            </div>
                            <div className="text-gray-600">Principal</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">
                                1
                            </div>
                            <div className="text-gray-600">
                                Assistant Principal
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-2">
                                25+
                            </div>
                            <div className="text-gray-600">Teaching Staff</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600 mb-2">
                                8
                            </div>
                            <div className="text-gray-600">Support Staff</div>
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

export default FacultyIndex;
