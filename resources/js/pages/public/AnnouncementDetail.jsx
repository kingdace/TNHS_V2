import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { announcementService } from "../../services/announcementService";

const AnnouncementDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                setLoading(true);
                const data = await announcementService.getPublicAnnouncements();
                const transformedData = data.map((announcement) =>
                    announcementService.transformAnnouncement(announcement)
                );

                const foundAnnouncement = transformedData.find(
                    (ann) => ann.id === parseInt(id)
                );

                if (foundAnnouncement) {
                    setAnnouncement(foundAnnouncement);
                } else {
                    setError("Announcement not found");
                }
            } catch (error) {
                console.error("Error fetching announcement:", error);
                setError("Failed to load announcement");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAnnouncement();
        }
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                        <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !announcement) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">❌</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-3">
                            {error || "Announcement Not Found"}
                        </h3>
                        <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
                            The announcement you're looking for doesn't exist or
                            has been removed.
                        </p>
                        <Link to="/announcements">
                            <Button className="bg-royal-blue hover:bg-blue-700 text-white px-6 py-3">
                                Back to Announcements
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="flex items-center space-x-2 text-gray-700 hover:text-royal-blue mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Previous Page</span>
                    </Button>

                    {/* Category Badge */}
                    <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-royal-blue text-white text-sm font-medium rounded-full">
                            {announcement.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                        {announcement.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
                        <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-royal-blue" />
                            <span className="font-medium">
                                {announcement.author || "TNHS Administration"}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-royal-blue" />
                            <span>{announcement.date}</span>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <img
                            src={announcement.image}
                            alt={announcement.title}
                            className="w-full h-auto object-contain"
                            style={{
                                maxHeight: "500px",
                                minHeight: "200px",
                            }}
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 lg:p-12">
                    <div className="prose prose-lg max-w-none">
                        <div className="text-gray-800 leading-relaxed">
                            <div className="text-lg leading-relaxed whitespace-pre-wrap">
                                {announcement.content}
                            </div>
                        </div>
                    </div>

                    {/* Tags Section */}
                    {announcement.tags && announcement.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex flex-wrap gap-2">
                                {announcement.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementDetail;
