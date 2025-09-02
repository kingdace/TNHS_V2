import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    MapPin,
    Users,
    Award,
    BookOpen,
    Building,
} from "lucide-react";

const AboutHistory = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const milestones = [
        {
            year: "1965",
            title: "School Establishment",
            description:
                "Taft National High School was established as a public secondary school serving the municipality of Taft, Eastern Samar.",
            icon: Building,
        },
        {
            year: "1970",
            title: "First Graduation",
            description:
                "The school celebrated its first batch of graduates, marking a significant milestone in local education.",
            icon: Award,
        },
        {
            year: "1985",
            title: "Expansion Program",
            description:
                "Major infrastructure development including new classrooms and facilities to accommodate growing student population.",
            icon: Building,
        },
        {
            year: "2000",
            title: "Technology Integration",
            description:
                "Introduction of computer laboratories and modern educational technology to enhance learning experiences.",
            icon: BookOpen,
        },
        {
            year: "2012",
            title: "K-12 Implementation",
            description:
                "Successful transition to the K-12 curriculum, becoming one of the first schools in the region to implement the new system.",
            icon: Award,
        },
        {
            year: "2020",
            title: "Digital Transformation",
            description:
                "Adaptation to online learning during the pandemic, showcasing resilience and innovation in education delivery.",
            icon: BookOpen,
        },
    ];

    const achievements = [
        {
            title: "Regional Recognition",
            description:
                "Consistently recognized as one of the top-performing schools in Eastern Samar Division",
        },
        {
            title: "Academic Excellence",
            description:
                "High passing rates in national examinations and college entrance tests",
        },
        {
            title: "Community Impact",
            description:
                "Producing graduates who contribute significantly to local and national development",
        },
        {
            title: "Innovation Leadership",
            description:
                "Pioneering educational programs and teaching methodologies in the region",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Our History
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        A journey of excellence, growth, and commitment to
                        quality education spanning over five decades
                    </p>
                </div>

                {/* School Overview */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Foundation & Growth
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Taft National High School was established in
                                1965 with a vision to provide quality secondary
                                education to the youth of Taft, Eastern Samar.
                                What started as a small institution has grown
                                into a comprehensive educational facility
                                serving hundreds of students annually.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Over the decades, our school has evolved to meet
                                the changing needs of education while
                                maintaining our core values of excellence,
                                integrity, and service to the community.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-700">
                                        Est. 1965
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-700">
                                        Taft, Eastern Samar
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Quick Facts
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Over 50 years of service
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Thousands of graduates
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        K-12 compliant
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Community-centered
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Milestones & Achievements
                    </h2>
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-green-500"></div>

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => {
                                const IconComponent = milestone.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`relative flex items-center ${
                                            index % 2 === 0
                                                ? "justify-start"
                                                : "justify-end"
                                        }`}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full border-4 border-white shadow-lg"></div>

                                        {/* Content */}
                                        <div
                                            className={`w-5/12 ${
                                                index % 2 === 0
                                                    ? "pr-8 text-right"
                                                    : "pl-8 text-left"
                                            }`}
                                        >
                                            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                                <div className="flex items-center space-x-3 mb-3">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                                        <IconComponent className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="text-2xl font-bold text-blue-600">
                                                        {milestone.year}
                                                    </div>
                                                </div>
                                                <h4 className="font-semibold text-gray-800 mb-2">
                                                    {milestone.title}
                                                </h4>
                                                <p className="text-gray-600 text-sm">
                                                    {milestone.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {achievements.map((achievement, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {achievement.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {achievement.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Legacy Section */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Our Legacy
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Community Impact
                            </h3>
                            <p className="text-blue-100">
                                Shaping the future of Taft through quality
                                education and character formation
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Educational Excellence
                            </h3>
                            <p className="text-blue-100">
                                Maintaining high standards while adapting to
                                modern educational needs
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Future Vision
                            </h3>
                            <p className="text-blue-100">
                                Continuing to innovate and serve as a beacon of
                                educational excellence
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/about"
                        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                        ← Back to About
                    </Link>
                    <Link
                        to="/about/mission"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Mission & Vision →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutHistory;
