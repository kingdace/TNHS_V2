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
                {announcement.image && (
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
                )}

                {/* Gallery Images */}
                {announcement.images && announcement.images.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Gallery
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {announcement.images.map((image, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                                >
                                    <img
                                        src={(() => {
                                            const img = image || "";
                                            if (!img) return "";
                                            if (img.startsWith("http"))
                                                return img;
                                            if (img.startsWith("/storage/"))
                                                return img;
                                            const cleaned = img.replace(
                                                /^\/?storage\//,
                                                ""
                                            );
                                            return `/storage/${cleaned}`;
                                        })()}
                                        alt={`${announcement.title} - Image ${
                                            index + 1
                                        }`}
                                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                "none";
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* External Link */}
                {announcement.external_link && (
                    <div className="mb-8 text-center">
                        <a
                            href={announcement.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors text-lg font-medium"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                            View Additional Content
                        </a>
                    </div>
                )}

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 lg:p-12">
                    <div className="prose prose-lg max-w-none">
                        <div
                            className="text-gray-800 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html:
                                    announcement.content_html ||
                                    announcement.content,
                            }}
                        />
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
