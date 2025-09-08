import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import {
    Newspaper,
    Calendar,
    Users,
    Award,
    GraduationCap,
    BookOpen,
    Trophy,
    Clock,
    Eye,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Search,
    Filter,
    Home,
    Star,
    TrendingUp,
    Globe,
    Phone,
    Mail,
    MapPin,
} from "lucide-react";
import { announcementService } from "../../services/announcementService";

const News = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch announcements on component mount
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                console.log("Fetching announcements...");
                const data = await announcementService.getPublicAnnouncements();
                console.log("Raw API data:", data);
                const transformedData = data.map((announcement) =>
                    announcementService.transformAnnouncement(announcement)
                );
                console.log("Transformed data:", transformedData);
                setAnnouncements(transformedData);
            } catch (error) {
                console.error("Error fetching announcements:", error);
                setAnnouncements([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // Auto-set category based on URL path
    useEffect(() => {
        window.scrollTo(0, 0);

        // Set category based on current URL path
        const path = location.pathname;
        if (path === "/news/announcements") {
            setSelectedCategory("Announcements");
        } else if (path === "/news/events") {
            setSelectedCategory("School Events");
        } else {
            setSelectedCategory("All");
        }
    }, [location.pathname]);

    const categories = [
        { name: "All", icon: Newspaper, count: announcements.length },
        {
            name: "Announcements",
            icon: GraduationCap,
            count: announcements.length,
        },
        { name: "School Events", icon: Calendar, count: 0 },
        { name: "Sports", icon: Trophy, count: 0 },
    ];

    // Use dynamic announcements data
    const newsItems = announcements;

    const filteredNews = newsItems.filter((item) => {
        const matchesCategory =
            selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch =
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNews = filteredNews.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const featuredNews = newsItems.find((item) => item.featured);

    // Get page title based on current path
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === "/news/announcements") return "Announcements";
        if (path === "/news/events") return "Events";
        if (path === "/news/updates") return "School Updates";
        return "News & Events";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumb Navigation */}
                <div className="mb-8">
                    <nav className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link
                            to="/"
                            className="hover:text-royal-blue transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <span>/</span>
                        <Link
                            to="/news"
                            className="hover:text-royal-blue transition-colors duration-200"
                        >
                            News & Events
                        </Link>
                        {location.pathname !== "/news" && (
                            <>
                                <span>/</span>
                                <span className="text-royal-blue font-medium">
                                    {getPageTitle()}
                                </span>
                            </>
                        )}
                    </nav>
                </div>

                {/* Conditional Layout Based on URL */}
                {location.pathname === "/news" ? (
                    /* Empty News & Events Page */
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Newspaper className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-3">
                            No Content Available
                        </h3>
                        <p className="text-gray-500 text-lg max-w-md mx-auto">
                            Check back later for the latest news and
                            announcements from TNHS.
                        </p>
                    </div>
                ) : location.pathname === "/news/announcements" ? (
                    /* Enhanced Announcements Only Section with Empty State */
                    <div className="max-w-4xl mx-auto">
                        {/* Enhanced Header */}
                        <div className="text-center mb-8">
                            <div className="relative inline-block">
                                <div className="w-16 h-16 bg-gradient-to-br from-royal-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <Newspaper className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-royal-blue mb-3">
                                📢 TNHS Announcements
                            </h1>
                            <p className="text-gray-700 text-lg max-w-2xl mx-auto font-medium">
                                Stay informed with the latest announcements,
                                updates, and important information from Taft
                                National High School
                            </p>
                            <div className="w-24 h-1 bg-gradient-to-r from-royal-blue to-blue-600 rounded-full mx-auto mt-4"></div>
                        </div>

                        {/* Category Tabs */}
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-1 justify-center">
                                {categories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <button
                                            key={category.name}
                                            onClick={() =>
                                                setSelectedCategory(
                                                    category.name
                                                )
                                            }
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                                                selectedCategory ===
                                                category.name
                                                    ? "bg-royal-blue text-white shadow-lg"
                                                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                            }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span className="text-sm">
                                                {category.name}
                                            </span>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    selectedCategory ===
                                                    category.name
                                                        ? "bg-white/20 text-white"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {category.count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Empty State */}
                        <div className="text-center py-16"></div>
                    </div>
                ) : location.pathname === "/news/events" ? (
                    /* Events Only Section */
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="h-8 w-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                    Upcoming Events
                                </h2>
                                <p className="text-gray-600">
                                    Discover exciting events and activities
                                    happening at TNHS
                                </p>
                            </div>

                            {/* All Event Items */}
                            <div className="space-y-6">
                                {newsItems
                                    .filter(
                                        (item) =>
                                            item.category === "School Events"
                                    )
                                    .map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                                        >
                                            <div className="flex flex-col md:flex-row">
                                                {/* Image Section */}
                                                <div className="md:w-1/3 h-48 md:h-auto">
                                                    <img
                                                        src={
                                                            item.image ||
                                                            "/images/BG2.jpg"
                                                        }
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Content Section */}
                                                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                                                    {/* Header with Date and Category */}
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                            <Calendar className="h-4 w-4" />
                                                            <span>
                                                                {item.date}
                                                            </span>
                                                        </div>
                                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                                            {item.category}
                                                        </span>
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                                                        {item.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                                        {item.excerpt}
                                                    </p>

                                                    {/* Footer with Author and Views */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                            <div className="flex items-center space-x-1">
                                                                <Users className="h-3 w-3" />
                                                                <span>
                                                                    {item.author ||
                                                                        "TNHS Admin"}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <Eye className="h-3 w-3" />
                                                                <span>
                                                                    {item.views ||
                                                                        "856"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 transform">
                                                            Read More
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* News Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {paginatedNews.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                                <div className="absolute top-3 left-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            item.category === "Academic"
                                                ? "bg-purple-500 text-white"
                                                : item.category === "Events"
                                                ? "bg-blue-500 text-white"
                                                : item.category === "Enrollment"
                                                ? "bg-green-500 text-white"
                                                : item.category === "Sports"
                                                ? "bg-red-500 text-white"
                                                : item.category ===
                                                  "Achievements"
                                                ? "bg-yellow-500 text-white"
                                                : "bg-gray-500 text-white"
                                        }`}
                                    >
                                        {item.category}
                                    </span>
                                </div>

                                <div className="absolute top-3 right-3">
                                    <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded text-xs font-medium">
                                        {item.date}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-royal-blue transition-colors duration-300 line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {item.excerpt}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                    <div className="flex items-center space-x-1">
                                        <Users className="h-3 w-3" />
                                        <span>{item.author}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Eye className="h-3 w-3" />
                                        <span>{item.views}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {item.tags.slice(0, 2).map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <Button className="w-full bg-gradient-to-r from-royal-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all duration-300 hover:scale-105 transform">
                                    Read More
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mb-12">
                        <Button
                            onClick={() =>
                                setCurrentPage(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                            variant="outline"
                            className="flex items-center space-x-2"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span>Previous</span>
                        </Button>

                        <div className="flex space-x-2">
                            {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1
                            ).map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 ${
                                        currentPage === page
                                            ? "bg-royal-blue text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>

                        <Button
                            onClick={() =>
                                setCurrentPage(
                                    Math.min(totalPages, currentPage + 1)
                                )
                            }
                            disabled={currentPage === totalPages}
                            variant="outline"
                            className="flex items-center space-x-2"
                        >
                            <span>Next</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* Quick Stats */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        News & Events Statistics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Newspaper className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                                12
                            </div>
                            <div className="text-sm text-gray-600">
                                Total Articles
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <TrendingUp className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                                15.2K
                            </div>
                            <div className="text-sm text-gray-600">
                                Total Views
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Calendar className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                                5
                            </div>
                            <div className="text-sm text-gray-600">
                                Upcoming Events
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Award className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                                8
                            </div>
                            <div className="text-sm text-gray-600">
                                Achievements
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-royal-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
                    >
                        <Home className="h-5 w-5 mr-2" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default News;
