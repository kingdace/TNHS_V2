import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    History,
    Shield,
    FileText,
    Award,
    Target,
    Heart,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const aboutSections = [
        {
            title: "Mission & Vision",
            description:
                "Discover our purpose, goals, and aspirations for educational excellence",
            icon: Target,
            href: "/about/mission",
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            title: "Our History",
            description: "Learn about our rich heritage and journey since 1965",
            icon: History,
            href: "/about/history",
            color: "from-amber-500 to-orange-600",
            bgColor: "bg-amber-50",
            iconColor: "text-amber-600",
        },
        {
            title: "School Seal",
            description:
                "Explore the symbolism and meaning behind our school emblem",
            icon: Shield,
            href: "/about/school-seal",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
        },
        {
            title: "Privacy Policy",
            description:
                "Understand how we protect and handle your personal information",
            icon: FileText,
            href: "/about/privacy-policy",
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            title: "Quality Policy",
            description:
                "Our commitment to maintaining high standards in education",
            icon: Award,
            href: "/about/quality-policy",
            color: "from-rose-500 to-rose-600",
            bgColor: "bg-rose-50",
            iconColor: "text-rose-600",
        },
        {
            title: "More",
            description:
                "Explore enrollment guidelines, resources, gallery, and contact information",
            icon: MoreHorizontal,
            href: "/more",
            color: "from-teal-500 to-teal-600",
            bgColor: "bg-teal-50",
            iconColor: "text-teal-600",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-royal-blue via-blue-700 to-blue-900 text-white py-20 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        {/* School Logo */}
                        <div className="mb-6 flex justify-center">
                            <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                <img
                                    src="/images/Logo.jpg"
                                    alt="TNHS Logo"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                            About Us
                        </h1>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6 rounded-full"></div>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Taft National High School
                        </p>
                        <p className="text-lg text-blue-200 mt-2">
                            Excellence in Education Since 1965
                        </p>
                    </div>
                </div>

                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-12"
                    >
                        <path
                            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                            fill="rgb(249, 250, 251)"
                        />
                    </svg>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-12 -mt-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                        <div className="flex items-center justify-center mb-6">
                            <Heart className="h-8 w-8 text-rose-500 mr-3" />
                            <h2 className="text-3xl font-bold text-gray-900">
                                Welcome to TNHS
                            </h2>
                        </div>
                        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
                            Taft National High School is committed to providing
                            quality education that empowers students to become
                            responsible, productive, and successful individuals.
                            Explore the sections below to learn more about our
                            school's foundation, values, and commitment to
                            excellence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="py-12 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Explore Our School
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Click on any section below to learn more about our
                            school's identity and values
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {aboutSections.map((section, index) => {
                            const Icon = section.icon;
                            return (
                                <Link
                                    key={index}
                                    to={section.href}
                                    className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
                                >
                                    {/* Gradient Background on Hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                                    ></div>

                                    <div className="relative p-6">
                                        {/* Icon */}
                                        <div
                                            className={`${section.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <Icon
                                                className={`h-8 w-8 ${section.iconColor}`}
                                            />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-royal-blue transition-colors duration-300">
                                            {section.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            {section.description}
                                        </p>

                                        {/* Arrow */}
                                        <div className="flex items-center text-royal-blue font-semibold text-sm">
                                            <span className="mr-2">
                                                Learn More
                                            </span>
                                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>

                                    {/* Corner Accent */}
                                    <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Additional Info Card */}
                    <div className="mt-12 bg-gradient-to-r from-royal-blue to-blue-700 rounded-2xl shadow-xl p-8 md:p-12 text-white">
                        <div className="text-center">
                            <BookOpen className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                Have Questions?
                            </h3>
                            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                                We're here to help! Contact us for more
                                information about our school, programs, or
                                enrollment process.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-royal-blue font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Contact Us
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Link>
                                <Link
                                    to="/admissions/requirements"
                                    className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-royal-blue transition-all duration-300"
                                >
                                    Enrollment Info
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
