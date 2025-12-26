import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    GraduationCap,
    Mail,
    FolderOpen,
    Image,
    ChevronRight,
    Sparkles,
} from "lucide-react";

const More = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const moreSections = [
        {
            title: "Enrollment Guidelines & Requirements",
            description:
                "Complete guide to enrollment process, requirements, and important dates",
            icon: GraduationCap,
            href: "/admissions/requirements",
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            title: "Contact Us",
            description:
                "Get in touch with us for inquiries, support, and assistance",
            icon: Mail,
            href: "/contact",
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            title: "Resources",
            description:
                "Access downloadable files, forms, and important documents",
            icon: FolderOpen,
            href: "/more/resources",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
        },
        {
            title: "Media Gallery",
            description:
                "Browse our collection of photos and memorable moments",
            icon: Image,
            href: "/gallery",
            color: "from-amber-500 to-orange-600",
            bgColor: "bg-amber-50",
            iconColor: "text-amber-600",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-800 text-white py-20 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        {/* Icon */}
                        <div className="mb-6 flex justify-center">
                            <div className="h-20 w-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border border-white/30">
                                <Sparkles className="h-10 w-10 text-yellow-300" />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                            More Resources
                        </h1>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6 rounded-full"></div>
                        <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
                            Additional Information & Services
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
                        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
                            Find everything you need in one place. From
                            enrollment information to downloadable resources,
                            we've organized all additional services and
                            information for your convenience.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="py-12 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Are You Looking For?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Select a category below to access the information
                            you need
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {moreSections.map((section, index) => {
                            const Icon = section.icon;
                            return (
                                <Link
                                    key={index}
                                    to={section.href}
                                    className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-teal-200 hover:-translate-y-1"
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
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                                            {section.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            {section.description}
                                        </p>

                                        {/* Arrow */}
                                        <div className="flex items-center text-teal-600 font-semibold text-sm">
                                            <span className="mr-2">
                                                Explore
                                            </span>
                                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>

                                    {/* Corner Accent */}
                                    <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10 bg-gradient-to-br from-teal-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Help Card */}
                    <div className="mt-12 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl shadow-xl p-8 md:p-12 text-white">
                        <div className="text-center">
                            <Mail className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                Need Assistance?
                            </h3>
                            <p className="text-teal-100 text-lg mb-6 max-w-2xl mx-auto">
                                Can't find what you're looking for? Our team is
                                ready to help you with any questions or
                                concerns.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-8 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Contact Support
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default More;
