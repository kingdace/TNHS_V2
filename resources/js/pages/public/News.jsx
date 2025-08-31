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
import { Calendar, User } from "lucide-react";

const News = () => {
    const newsItems = [
        {
            title: "Academic Excellence Awards Ceremony 2024",
            date: "August 25, 2024",
            author: "School Administration",
            excerpt:
                "Celebrating the outstanding achievements of our students in various academic fields...",
        },
        {
            title: "New Science Laboratory Facility Opening",
            date: "August 20, 2024",
            author: "Facilities Management",
            excerpt:
                "State-of-the-art science laboratory to enhance hands-on learning experience...",
        },
        {
            title: "Sports Festival 2024 Schedule Announced",
            date: "August 15, 2024",
            author: "Physical Education Department",
            excerpt:
                "Annual sports festival featuring various athletic competitions and activities...",
        },
    ];

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        News & Events
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Stay updated with the latest news, announcements, and
                        events from Taft National High School.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.map((item, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-lg transition-shadow"
                        >
                            <CardHeader>
                                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{item.date}</span>
                                </div>
                                <CardTitle className="text-xl">
                                    {item.title}
                                </CardTitle>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <User className="h-4 w-4" />
                                    <span>{item.author}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    {item.excerpt}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
