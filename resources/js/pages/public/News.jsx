import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const News = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const newsItems = [
        {
            id: 1,
            title: "Enrollment for School Year 2024-2025 Now Open",
            date: "January 15, 2024",
            excerpt:
                "We are pleased to announce that enrollment for the upcoming school year is now open. Early registration is encouraged to secure your spot.",
            category: "Enrollment",
        },
        {
            id: 2,
            title: "Annual Sports Festival Scheduled for February",
            date: "January 10, 2024",
            excerpt:
                "Get ready for our annual sports festival featuring various athletic competitions, team sports, and individual events.",
            category: "Events",
        },
        {
            id: 3,
            title: "Academic Excellence Awards Ceremony",
            date: "January 5, 2024",
            excerpt:
                "Congratulations to all students who achieved academic excellence. The awards ceremony will be held next month.",
            category: "Academic",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Latest News & Announcements
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Stay updated with the latest happenings, events, and
                        important announcements from TNHS
                    </p>
                </div>

                {/* News Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {newsItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                        {item.category}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {item.date}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {item.excerpt}
                                </p>
                                <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))}
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

export default News;
