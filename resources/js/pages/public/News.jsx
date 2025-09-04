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

const News = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

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
        { name: "All", icon: Newspaper, count: 13 },
        { name: "Announcements", icon: GraduationCap, count: 6 },
        { name: "School Events", icon: Calendar, count: 5 },
        { name: "Sports", icon: Trophy, count: 2 },
    ];

    const newsItems = [
        // ANNOUNCEMENTS
        {
            id: 1,
            title: "Enrollment for School Year 2024-2025 Now Open",
            date: "January 20, 2024",
            excerpt:
                "We are pleased to announce that enrollment for the upcoming school year is now open. Early registration is encouraged to secure your spot. Required documents and procedures are available at the registrar's office.",
            category: "Announcements",
            author: "Registrar's Office",
            views: 2156,
            image: "/images/BG1.jpg",
            featured: true,
            tags: ["Enrollment", "Registration", "2024-2025"],
        },
        {
            id: 2,
            title: "New Computer Laboratory Opens at TNHS",
            date: "January 18, 2024",
            excerpt:
                "TNHS proudly announces the opening of our state-of-the-art computer laboratory, equipped with 50 new computers and high-speed internet to enhance student learning and digital skills development.",
            category: "Announcements",
            author: "IT Department",
            views: 1456,
            image: "/images/BG2.jpg",
            featured: false,
            tags: ["Technology", "Laboratory", "Innovation"],
        },
        {
            id: 3,
            title: "Academic Excellence Awards Ceremony",
            date: "January 15, 2024",
            excerpt:
                "Congratulations to all students who achieved academic excellence for the first semester. The awards ceremony will be held on February 10, 2024 at the school auditorium.",
            category: "Announcements",
            author: "Academic Department",
            views: 1287,
            image: "/images/BG3.jpg",
            featured: false,
            tags: ["Awards", "Excellence", "Ceremony"],
        },
        {
            id: 4,
            title: "Parent-Teacher Conference Schedule Announced",
            date: "January 12, 2024",
            excerpt:
                "Important dates for parent-teacher conferences have been announced. Please check the school calendar for your scheduled meeting time. Conferences will be held from February 15-20, 2024.",
            category: "Announcements",
            author: "Guidance Office",
            views: 956,
            image: "/images/BG1.jpg",
            featured: false,
            tags: ["Conference", "Parents", "Teachers"],
        },
        {
            id: 5,
            title: "TNHS Students Win Regional Science Fair Championship",
            date: "January 10, 2024",
            excerpt:
                "Our exceptional students demonstrated outstanding creativity and scientific thinking at the Eastern Samar Regional Science Fair, bringing home the championship trophy and making TNHS proud.",
            category: "Announcements",
            author: "Science Department",
            views: 2436,
            image: "/images/BG2.jpg",
            featured: false,
            tags: ["Science", "Competition", "Achievement"],
        },
        {
            id: 6,
            title: "Student Leadership Training Program",
            date: "January 8, 2024",
            excerpt:
                "TNHS launches a comprehensive student leadership training program to develop future leaders and enhance student engagement. Applications are now open for interested students.",
            category: "Announcements",
            author: "Student Affairs",
            views: 723,
            image: "/images/BG3.jpg",
            featured: false,
            tags: ["Leadership", "Training", "Students"],
        },

        // SCHOOL EVENTS
        {
            id: 7,
            title: "TNHS Christmas Party 2024",
            date: "December 20, 2024",
            excerpt:
                "Join us for our annual Christmas celebration! The event will feature performances, games, gift exchanges, and a special visit from Santa Claus. All students and staff are invited to participate in this festive occasion.",
            category: "School Events",
            author: "Student Council",
            views: 1890,
            image: "/images/BG1.jpg",
            featured: false,
            tags: ["Christmas", "Party", "Celebration"],
        },
        {
            id: 8,
            title: "Acquaintance Party - Welcome Freshmen!",
            date: "September 15, 2024",
            excerpt:
                "Welcome our new Grade 7 and Grade 11 students to the TNHS family! The Acquaintance Party will feature fun activities, games, and performances to help new students get to know their classmates and teachers.",
            category: "School Events",
            author: "Student Council",
            views: 1654,
            image: "/images/BG2.jpg",
            featured: false,
            tags: ["Acquaintance", "Freshmen", "Welcome"],
        },
        {
            id: 9,
            title: "Annual Sports Festival 2024",
            date: "March 15, 2024",
            excerpt:
                "Get ready for our annual sports festival featuring various athletic competitions, team sports, and individual events. Students will compete in basketball, volleyball, track and field, and many more exciting activities.",
            category: "School Events",
            author: "Physical Education Department",
            views: 1204,
            image: "/images/BG3.jpg",
            featured: false,
            tags: ["Sports", "Festival", "Competition"],
        },
        {
            id: 10,
            title: "TNHS Foundation Day Celebration",
            date: "June 15, 2024",
            excerpt:
                "Celebrate TNHS Foundation Day with us! The event will include a parade, cultural presentations, alumni homecoming, and various activities showcasing our school's rich history and achievements.",
            category: "School Events",
            author: "School Administration",
            views: 2100,
            image: "/images/BG1.jpg",
            featured: false,
            tags: ["Foundation Day", "Celebration", "Alumni"],
        },
        {
            id: 11,
            title: "Graduation Ceremony 2024",
            date: "April 30, 2024",
            excerpt:
                "Join us in celebrating the achievements of our graduating students. The graduation ceremony will be held at the school auditorium with special recognition for academic excellence and outstanding achievements.",
            category: "School Events",
            author: "Academic Department",
            views: 3200,
            image: "/images/BG2.jpg",
            featured: false,
            tags: ["Graduation", "Ceremony", "Achievement"],
        },

        // ENROLLMENT
        {
            id: 12,
            title: "Late Enrollment Period Extended",
            date: "January 25, 2024",
            excerpt:
                "Due to high demand, the late enrollment period has been extended until January 31, 2024. Please visit the registrar's office for assistance with enrollment procedures and requirements.",
            category: "Enrollment",
            author: "Registrar's Office",
            views: 856,
            image: "/images/BG3.jpg",
            featured: false,
            tags: ["Late Enrollment", "Extension", "Deadline"],
        },
        {
            id: 13,
            title: "Scholarship Program Applications Open",
            date: "January 22, 2024",
            excerpt:
                "TNHS is now accepting applications for various scholarship programs for deserving students. Interested students may submit their applications at the guidance office until February 15, 2024.",
            category: "Enrollment",
            author: "Guidance Office",
            views: 1123,
            image: "/images/BG1.jpg",
            featured: false,
            tags: ["Scholarship", "Financial Aid", "Application"],
        },

        // SPORTS
        {
            id: 14,
            title: "TNHS Basketball Team Wins Championship",
            date: "January 5, 2024",
            excerpt:
                "Congratulations to our TNHS basketball team for winning the regional championship! Their dedication and teamwork have brought pride to our school community. The team will represent the region in the national competition.",
            category: "Sports",
            author: "Physical Education Department",
            views: 3124,
            image: "/images/BG2.jpg",
            featured: false,
            tags: ["Basketball", "Championship", "Team"],
        },
        {
            id: 15,
            title: "Volleyball Team Tryouts Scheduled",
            date: "January 28, 2024",
            excerpt:
                "Interested students are invited to join the volleyball team tryouts. Tryouts will be held on February 5-7, 2024 at the school gymnasium. All grade levels are welcome to participate.",
            category: "Sports",
            author: "Physical Education Department",
            views: 678,
            image: "/images/BG3.jpg",
            featured: false,
            tags: ["Volleyball", "Tryouts", "Team"],
        },
    ];

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
                    /* Two-Section Layout: News & Events (Main Page) */
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Left Section - Enhanced Announcements */}
                        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all duration-500">
                            {/* Enhanced Header */}
                            <div className="text-center mb-8">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-gradient-to-br from-royal-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <Newspaper className="h-10 w-10 text-white" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">
                                            6
                                        </span>
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-royal-blue to-blue-600 bg-clip-text text-transparent mb-3">
                                    📢 Latest Announcements
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Important updates and news from TNHS
                                </p>
                                <div className="w-24 h-1 bg-gradient-to-r from-royal-blue to-blue-600 rounded-full mx-auto mt-4"></div>
                            </div>

                            {/* Category Tabs */}
                            <div className="mb-8">
                                <div className="flex flex-wrap gap-3 justify-center">
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
                                                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                                    selectedCategory ===
                                                    category.name
                                                        ? "bg-royal-blue text-white shadow-lg"
                                                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                                }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                                <span>{category.name}</span>
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

                            {/* Enhanced Announcements Grid */}
                            <div className="space-y-4">
                                {newsItems
                                    .filter((item) => {
                                        if (selectedCategory === "All")
                                            return true;
                                        return (
                                            item.category === selectedCategory
                                        );
                                    })
                                    .slice(0, 3)
                                    .map((item, index) => (
                                        <div
                                            key={item.id}
                                            className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative"
                                        >
                                            {/* Priority Indicator */}
                                            <div
                                                className={`absolute top-4 left-4 w-3 h-3 rounded-full ${
                                                    index === 0
                                                        ? "bg-red-500 animate-pulse"
                                                        : index === 1
                                                        ? "bg-yellow-500"
                                                        : "bg-green-500"
                                                }`}
                                            ></div>

                                            {/* Urgency Badge */}
                                            {index === 0 && (
                                                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                                                    URGENT
                                                </div>
                                            )}

                                            <div className="flex flex-col md:flex-row">
                                                {/* Enhanced Image Section */}
                                                <div className="md:w-2/5 h-40 md:h-auto relative">
                                                    <img
                                                        src={
                                                            item.image ||
                                                            "/images/BG1.jpg"
                                                        }
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                                    {/* Category Badge */}
                                                    <div className="absolute bottom-3 left-3">
                                                        <span className="bg-royal-blue text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Enhanced Content Section */}
                                                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                                                    {/* Enhanced Header */}
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                            <Calendar className="h-4 w-4 text-royal-blue" />
                                                            <span className="font-medium">
                                                                {item.date}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                            <Eye className="h-3 w-3" />
                                                            <span>
                                                                {item.views ||
                                                                    "1,234"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Enhanced Title */}
                                                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-royal-blue transition-colors duration-200">
                                                        {item.title}
                                                    </h3>

                                                    {/* Enhanced Description */}
                                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                                        {item.excerpt}
                                                    </p>

                                                    {/* Enhanced Footer */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                            <Users className="h-3 w-3 text-royal-blue" />
                                                            <span className="font-medium">
                                                                {item.author ||
                                                                    "TNHS Admin"}
                                                            </span>
                                                        </div>
                                                        <Button className="bg-gradient-to-r from-royal-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 transform shadow-lg">
                                                            Read More
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/* View All Button */}
                            <div className="text-center mt-6">
                                <Link to="/news/announcements">
                                    <Button className="bg-gradient-to-r from-royal-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 transform shadow-lg">
                                        View All Announcements
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="mt-6 text-center">
                                <Button
                                    asChild
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 transform"
                                >
                                    <Link to="/news/announcements">
                                        View All News
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right Section - Events */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="text-center mb-6">
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

                            {/* Event Items */}
                            <div className="space-y-6">
                                {newsItems
                                    .filter(
                                        (item) =>
                                            item.category === "School Events"
                                    )
                                    .slice(0, 3)
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

                            <div className="mt-6 text-center">
                                <Button
                                    asChild
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 transform"
                                >
                                    <Link to="/news/events">
                                        View All Events
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : location.pathname === "/news/announcements" ? (
                    /* Enhanced Announcements Only Section with Two-Column Layout */
                    <div className="max-w-7xl mx-auto">
                        {/* Enhanced Header */}
                        <div className="text-center mb-12">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 bg-gradient-to-br from-royal-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                                    <Newspaper className="h-12 w-12 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                                    <span className="text-white text-sm font-bold">
                                        6
                                    </span>
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-royal-blue to-blue-600 bg-clip-text text-transparent mb-4">
                                📢 TNHS Announcements
                            </h1>
                            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                                Stay informed with the latest announcements,
                                updates, and important information from Taft
                                National High School
                            </p>
                            <div className="w-32 h-1 bg-gradient-to-r from-royal-blue to-blue-600 rounded-full mx-auto mt-6"></div>
                        </div>

                        {/* Category Tabs */}
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-3 justify-center">
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
                                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                                selectedCategory ===
                                                category.name
                                                    ? "bg-royal-blue text-white shadow-lg"
                                                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                            }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span>{category.name}</span>
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

                        {/* Two-Column Layout */}
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Column - Priority Announcements */}
                            <div className="lg:col-span-2">
                                <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-8 border border-blue-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-white text-sm font-bold">
                                                    !
                                                </span>
                                            </div>
                                            {selectedCategory === "All"
                                                ? "All Announcements"
                                                : selectedCategory}
                                        </h2>
                                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold">
                                            {selectedCategory === "All"
                                                ? "ALL"
                                                : "FILTERED"}
                                        </div>
                                    </div>

                                    {/* Priority Announcements */}
                                    <div className="space-y-6">
                                        {newsItems
                                            .filter((item) => {
                                                if (selectedCategory === "All")
                                                    return true;
                                                return (
                                                    item.category ===
                                                    selectedCategory
                                                );
                                            })
                                            .slice(0, 6)
                                            .map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative"
                                                >
                                                    {/* Priority Indicator */}
                                                    <div
                                                        className={`absolute top-4 left-4 w-4 h-4 rounded-full ${
                                                            index === 0
                                                                ? "bg-red-500 animate-pulse"
                                                                : index === 1
                                                                ? "bg-yellow-500"
                                                                : "bg-green-500"
                                                        }`}
                                                    ></div>

                                                    {/* Urgency Badge */}
                                                    {index === 0 && (
                                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                                                            URGENT
                                                        </div>
                                                    )}

                                                    <div className="flex flex-col md:flex-row">
                                                        {/* Enhanced Image Section */}
                                                        <div className="md:w-2/5 h-48 md:h-auto relative">
                                                            <img
                                                                src={
                                                                    item.image ||
                                                                    "/images/BG1.jpg"
                                                                }
                                                                alt={item.title}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                                            {/* Category Badge */}
                                                            <div className="absolute bottom-3 left-3">
                                                                <span className="bg-royal-blue text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                                    {
                                                                        item.category
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Enhanced Content Section */}
                                                        <div className="md:w-3/5 p-6 flex flex-col justify-between">
                                                            {/* Enhanced Header */}
                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                                    <Calendar className="h-4 w-4 text-royal-blue" />
                                                                    <span className="font-medium">
                                                                        {
                                                                            item.date
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                                    <Eye className="h-3 w-3" />
                                                                    <span>
                                                                        {item.views ||
                                                                            "1,234"}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Enhanced Title */}
                                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-royal-blue transition-colors duration-200">
                                                                {item.title}
                                                            </h3>

                                                            {/* Enhanced Description */}
                                                            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                                                                {item.excerpt}
                                                            </p>

                                                            {/* Enhanced Footer */}
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                                    <Users className="h-3 w-3 text-royal-blue" />
                                                                    <span className="font-medium">
                                                                        {item.author ||
                                                                            "TNHS Admin"}
                                                                    </span>
                                                                </div>
                                                                <Button className="bg-gradient-to-r from-royal-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 transform shadow-lg">
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

                            {/* Right Column - Quick Info & All Announcements */}
                            <div className="space-y-6">
                                {/* Quick Info Panel */}
                                <div className="bg-gradient-to-br from-royal-blue to-blue-600 rounded-2xl shadow-xl p-6 text-white">
                                    <h3 className="text-xl font-bold mb-4 flex items-center">
                                        <Clock className="h-5 w-5 mr-2" />
                                        Quick Info
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-blue-100">
                                                Total Announcements
                                            </span>
                                            <span className="font-bold">6</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-blue-100">
                                                Urgent Items
                                            </span>
                                            <span className="font-bold text-red-300">
                                                1
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-blue-100">
                                                This Week
                                            </span>
                                            <span className="font-bold">3</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced All Announcements List */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <Newspaper className="h-5 w-5 mr-2 text-royal-blue" />
                                        All Announcements
                                    </h3>
                                    <div className="space-y-4">
                                        {newsItems
                                            .filter((item) => {
                                                if (selectedCategory === "All")
                                                    return true;
                                                return (
                                                    item.category ===
                                                    selectedCategory
                                                );
                                            })
                                            .map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="group p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-royal-blue hover:shadow-md relative"
                                                >
                                                    {/* Priority Indicator */}
                                                    <div
                                                        className={`absolute top-3 left-3 w-3 h-3 rounded-full ${
                                                            index === 0
                                                                ? "bg-red-500 animate-pulse"
                                                                : index === 1
                                                                ? "bg-yellow-500"
                                                                : "bg-green-500"
                                                        }`}
                                                    ></div>

                                                    {/* Category Badge */}
                                                    <div className="absolute top-3 right-3">
                                                        <span className="bg-royal-blue text-white px-2 py-1 rounded-full text-xs font-bold">
                                                            {item.category}
                                                        </span>
                                                    </div>

                                                    <div className="pt-6">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div className="flex-1 pr-2">
                                                                <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-royal-blue transition-colors duration-200">
                                                                    {item.title}
                                                                </h4>
                                                                <p className="text-xs text-gray-500 mb-2">
                                                                    {item.date}
                                                                </p>
                                                                <p className="text-xs text-gray-600 line-clamp-2">
                                                                    {
                                                                        item.excerpt
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Author and Views */}
                                                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                                                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                                <Users className="h-3 w-3 text-royal-blue" />
                                                                <span>
                                                                    {item.author ||
                                                                        "TNHS Admin"}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                                <Eye className="h-3 w-3" />
                                                                <span>
                                                                    {item.views ||
                                                                        "1,234"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
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

                {/* Category Tabs */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.name}
                                    onClick={() =>
                                        setSelectedCategory(category.name)
                                    }
                                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        selectedCategory === category.name
                                            ? "bg-royal-blue text-white shadow-lg"
                                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{category.name}</span>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            selectedCategory === category.name
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
