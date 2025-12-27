import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    User,
    GraduationCap,
    Users,
    Shield,
    Wrench,
    ArrowRight,
    Sparkles,
    Award,
    BookOpen,
} from "lucide-react";

const FacultyIndex = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const facultyCategories = [
        {
            name: "Assistant Principal",
            description: "Supporting leadership and student welfare",
            icon: Shield,
            gradient: "from-emerald-500 via-green-500 to-teal-600",
            bgGradient: "from-emerald-50 to-green-50",
            href: "/faculty/assistant-principal",
            features: [
                "Student Discipline",
                "Curriculum Development",
                "Teacher Supervision",
            ],
            iconBg: "bg-gradient-to-br from-emerald-100 to-green-100",
            accentColor: "emerald",
        },
        {
            name: "Teaching Staff",
            description: "Our dedicated educators organized by grade levels",
            icon: GraduationCap,
            gradient: "from-purple-500 via-violet-500 to-indigo-600",
            bgGradient: "from-purple-50 to-violet-50",
            href: "/faculty/teaching-staff",
            features: [
                "Grade 7-12 Teachers",
                "Subject Specializations",
                "Department Heads",
                "ALS Program",
            ],
            iconBg: "bg-gradient-to-br from-purple-100 to-violet-100",
            accentColor: "purple",
        },
        {
            name: "Administrative Staff",
            description: "Supporting school operations",
            icon: Users,
            gradient: "from-orange-500 via-amber-500 to-yellow-600",
            bgGradient: "from-orange-50 to-amber-50",
            href: "/faculty/administrative-staff",
            features: ["Registrar", "Guidance Counselors", "Librarians"],
            iconBg: "bg-gradient-to-br from-orange-100 to-amber-100",
            accentColor: "orange",
        },
        {
            name: "Support Staff",
            description: "Essential services and maintenance",
            icon: Wrench,
            gradient: "from-rose-500 via-pink-500 to-red-600",
            bgGradient: "from-rose-50 to-pink-50",
            href: "/faculty/support-staff",
            features: ["Maintenance", "Security", "IT Support"],
            iconBg: "bg-gradient-to-br from-rose-100 to-pink-100",
            accentColor: "rose",
        },
    ];

    const getAccentClasses = (color) => {
        const classes = {
            emerald: "text-emerald-600 bg-emerald-500",
            purple: "text-purple-600 bg-purple-500",
            orange: "text-orange-600 bg-orange-500",
            rose: "text-rose-600 bg-rose-500",
        };
        return classes[color] || classes.purple;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Header */}
                <div className="mb-12 text-center relative">
                    {/* Animated glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/30 via-purple-300/20 to-pink-300/30 blur-3xl rounded-full animate-pulse"></div>

                    <div className="relative">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-4 border border-blue-100">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-600">
                                Meet Our Team
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 tracking-tight">
                            Faculty & Staff Directory
                        </h1>

                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 rounded-full"></div>
                            <User className="w-7 h-7 text-purple-500" />
                            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 via-blue-500 to-transparent rounded-full"></div>
                        </div>

                        <p className="text-xl font-semibold text-gray-700 mb-2">
                            Taft National High School
                        </p>
                        <p className="text-base text-purple-600 font-medium">
                            Meet our dedicated professionals committed to
                            excellence
                        </p>
                    </div>
                </div>

                {/* Faculty Categories Grid - Enhanced */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {facultyCategories.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                            <Link
                                key={category.name}
                                to={category.href}
                                className="group block"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                <div
                                    className={`relative bg-gradient-to-br ${category.bgGradient} rounded-2xl shadow-xl p-8 border-2 border-white/50 hover:border-white transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden`}
                                >
                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>

                                    <div className="relative z-10">
                                        {/* Icon and Title */}
                                        <div className="flex items-start gap-6 mb-6">
                                            <div
                                                className={`${category.iconBg} p-4 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                                            >
                                                <IconComponent
                                                    className={`w-12 h-12 bg-gradient-to-br ${category.gradient} bg-clip-text text-transparent`}
                                                    style={{
                                                        WebkitTextFillColor:
                                                            "transparent",
                                                        WebkitBackgroundClip:
                                                            "text",
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3
                                                    className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text"
                                                    style={{
                                                        backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                                                    }}
                                                >
                                                    {category.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {category.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-3 mb-6">
                                            {category.features.map(
                                                (feature, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-3 group/item"
                                                    >
                                                        <div
                                                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} group-hover/item:scale-150 transition-transform`}
                                                        ></div>
                                                        <span className="text-gray-700 text-sm font-medium group-hover/item:text-gray-900 transition-colors">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        {/* View Details Button */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                                            <span
                                                className={`text-sm font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                                            >
                                                Explore Team
                                            </span>
                                            <div
                                                className={`p-2 rounded-full bg-gradient-to-r ${category.gradient} text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                                            >
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Enhanced Stats Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-12 border border-blue-100">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <Award className="w-6 h-6 text-blue-600" />
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Faculty Overview
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            {
                                count: "1",
                                label: "Principal",
                                gradient: "from-blue-500 to-cyan-500",
                                icon: Shield,
                            },
                            {
                                count: "1",
                                label: "Assistant Principal",
                                gradient: "from-emerald-500 to-green-500",
                                icon: Shield,
                            },
                            {
                                count: "25+",
                                label: "Teaching Staff",
                                gradient: "from-purple-500 to-violet-500",
                                icon: GraduationCap,
                            },
                            {
                                count: "8",
                                label: "Support Staff",
                                gradient: "from-orange-500 to-amber-500",
                                icon: Users,
                            },
                        ].map((stat, index) => {
                            const StatIcon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div
                                        className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
                                    >
                                        <StatIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div
                                        className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                                    >
                                        {stat.count}
                                    </div>
                                    <div className="text-gray-600 text-sm font-semibold">
                                        {stat.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Back to Home Button */}
                <div className="text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <BookOpen className="w-5 h-5" />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FacultyIndex;
