import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import {
    GraduationCap,
    BookOpen,
    Users,
    Award,
    Calendar,
    Newspaper,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Play,
    Facebook,
    Globe,
    MapPin,
    Phone,
    Mail,
} from "lucide-react";
import { announcementService } from "../../services/announcementService";
import { publicService } from "../../services/publicService";
import { useDynamicContent } from "../../hooks/useDynamicContent";
import DynamicContentRenderer from "../../components/dynamic/DynamicContentRenderer";

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [announcements, setAnnouncements] = useState([]);
    const [heroSlides, setHeroSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    // Dynamic content hooks
    const { content: dynamicContent, loading: contentLoading } = useDynamicContent('home');
    const { content: heroContent } = useDynamicContent('home', 'hero');
    const { content: missionContent } = useDynamicContent('home', 'mission');
    const { content: featuresContent } = useDynamicContent('home', 'features');
    const { content: statsContent } = useDynamicContent('home', 'statistics');
    const { content: formsContent } = useDynamicContent('home', 'application_forms');

    // Calendar and Exam Schedule States
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState("");
    const [academicYear, setAcademicYear] = useState("2025-2026");
    const [semester, setSemester] = useState("1st");
    const [showExamModal, setShowExamModal] = useState(false);
    const [examSchedules, setExamSchedules] = useState({});

    // Fetch announcements and hero slides on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch announcements
                const announcementsData =
                    await announcementService.getPublicAnnouncements();
                const transformedAnnouncements = announcementsData.map(
                    (announcement) =>
                        announcementService.transformAnnouncement(announcement)
                );
                setAnnouncements(transformedAnnouncements);

                // Fetch hero carousel slides
                const heroData = await publicService.heroCarousel.getActive();
                setHeroSlides(heroData);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Keep empty arrays as fallback
                setAnnouncements([]);
                setHeroSlides([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        if (heroSlides.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [heroSlides.length]);

    // Calendar Functions
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
    };

    const prevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
        setShowExamModal(true);
    };

    const handleApplicationSubmit = (program) => {
        setSelectedProgram(program);
        // Here you would typically redirect to the actual application form
        alert(`Redirecting to ${program} application form...`);
    };

    const handleExamVerification = () => {
        alert("Verifying exam appointment...");
    };

    const handleExamBooking = () => {
        alert("Redirecting to exam booking...");
    };

    const features = [
        {
            icon: <GraduationCap className="h-8 w-8 text-royal-blue" />,
            title: "Academic Excellence",
            description:
                "Comprehensive curriculum designed to prepare students for higher education and future careers.",
        },
        {
            icon: <BookOpen className="h-8 w-8 text-royal-blue" />,
            title: "Quality Education",
            description:
                "Experienced teachers and modern facilities to ensure the best learning experience.",
        },
        {
            icon: <Users className="h-8 w-8 text-royal-blue" />,
            title: "Student Development",
            description:
                "Focus on character building, leadership skills, and personal growth.",
        },
        {
            icon: <Award className="h-8 w-8 text-royal-blue" />,
            title: "Recognition & Awards",
            description:
                "Celebrating student achievements and fostering a culture of excellence.",
        },
    ];

    const upcomingEvents = [
        {
            title: "Enrollment Period",
            date: "June 1 - August 30, 2024",
            description:
                "Open enrollment for incoming Grade 7 students and transferees.",
            icon: <Calendar className="h-5 w-5" />,
        },
        {
            title: "Academic Awards Ceremony",
            date: "March 15, 2024",
            description:
                "Celebrating outstanding student achievements and academic excellence.",
            icon: <Award className="h-5 w-5" />,
        },
        {
            title: "Parent-Teacher Conference",
            date: "February 28, 2024",
            description:
                "Open communication between parents and teachers for student success.",
            icon: <Users className="h-5 w-5" />,
        },
    ];

    const newsItems = [
        {
            title: "TNHS Students Win Regional Science Fair",
            excerpt:
                "Our students demonstrated exceptional creativity and scientific thinking at the Eastern Samar Regional Science Fair.",
            date: "January 15, 2024",
            author: "Science Department",
            image: "/images/BG1.jpg",
        },
        {
            title: "New Computer Laboratory Opens",
            excerpt:
                "State-of-the-art computer facilities to enhance digital literacy and 21st-century skills.",
            date: "January 10, 2024",
            author: "IT Department",
            image: "/images/BG2.jpg",
        },
        {
            title: "Sports Team Championship Victory",
            excerpt:
                "TNHS athletes bring home the championship trophy in the district sports competition.",
            date: "January 5, 2024",
            author: "Physical Education Department",
            image: "/images/BG3.jpg",
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Dynamic Hero Section */}
            {contentLoading ? (
                <section className="relative h-screen overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                            <p className="text-xl">Loading...</p>
                        </div>
                    </div>
                </section>
            ) : (
                <>
                    {/* Dynamic Content Sections */}
                    <DynamicContentRenderer content={heroContent} />
                    
                    {/* Fallback Hero Section if no dynamic content */}
                    {heroContent.length === 0 && (
                        <section className="relative h-screen overflow-hidden">
                            <div className="relative h-full w-full">
                                {loading ? (
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                                            <p className="text-xl">Loading...</p>
                                        </div>
                                    </div>
                                ) : heroSlides.length === 0 ? (
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <h1 className="text-4xl font-bold mb-4">
                                                Welcome to TNHS
                                            </h1>
                                            <p className="text-xl">
                                                Content coming soon...
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    heroSlides.map((slide, index) => (
                                        <div
                                            key={slide.id}
                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                                index === currentSlide
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                        >
                                            <img
                                                src={slide.image_path || "/images/BG1.jpg"}
                                                alt={slide.title}
                                                className="h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/20"></div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    )}
                </>
            )}

            {/* Content Overlay - Only show for fallback hero */}
            {heroContent.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                        {/* School Logo */}
                        <div className="mb-8 flex justify-center">
                            <div className="h-36 w-36 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 backdrop-blur-sm">
                                <img
                                    src="/images/Logo.jpg"
                                    alt="TNHS Logo"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="mb-6">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3">
                                <span className="text-3d-shadow-welcome font-extrabold tracking-wider">
                                    Welcome to{" "}
                                </span>
                            </h1>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                                <span className="text-3d-shadow font-extrabold tracking-wider">
                                    TAFT NATIONAL HIGH SCHOOL
                                </span>
                            </h1>
                        </div>

                        {/* School Identity */}
                        <div className="mb-10">
                            <p className="text-3d-shadow-mission text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto font-medium text-yellow-300">
                                "Moving forward with strength, growth, and
                                resilience"
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            {/* Enrollment Requirements Button */}
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold px-10 py-5 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform border-0 relative overflow-hidden group"
                            >
                                <Link to="/admissions">
                                    <span className="relative z-10 flex items-center">
                                        Enrollment Requirements
                                        <ArrowRight className="ml-3 h-6 w-6" />
                                    </span>
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </Link>
                            </Button>

                            {/* Learn More Button */}
                            <Button
                                asChild
                                size="lg"
                                className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-10 py-5 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform border-0 relative overflow-hidden group"
                            >
                                <Link to="/about">
                                    <span className="relative z-10 flex items-center">
                                        Learn More
                                        <ArrowRight className="ml-3 h-6 w-6" />
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Arrows - Only show for fallback hero */}
            {heroContent.length === 0 && heroSlides.length > 1 && (
                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                    onClick={() =>
                        setCurrentSlide(
                            (prev) =>
                                (prev - 1 + heroSlides.length) %
                                heroSlides.length
                        )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
                >
                    <ChevronLeft className="h-6 w-6 group-hover:translate-x-[-2px] transition-transform duration-300" />
                </button>
                <button
                    onClick={() =>
                        setCurrentSlide(
                            (prev) => (prev + 1) % heroSlides.length
                        )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
                >
                    <ChevronRight className="h-6 w-6 group-hover:translate-x-[3px] transition-transform duration-300" />
                </button>

                {/* Pagination Dots - Compact */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                    ? "bg-white scale-125 shadow-lg"
                                    : "bg-white/50 hover:bg-white/75 hover:scale-110"
                            }`}
                        />
                    ))}
                </div>

                {/* Visual Enhancements - Simple */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {/* Corner Accents */}
                    <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30 rounded-tl-lg"></div>
                    <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/30 rounded-tr-lg"></div>
                    <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/30 rounded-bl-lg"></div>
                    <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30 rounded-br-lg"></div>

                    {/* Simple Floating Elements */}
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
                    <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse opacity-60"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
                </div>

                {/* Navigation Controls */}
                {heroSlides.length > 1 && (
                    <>
                        {/* Previous Button */}
                        <button
                            onClick={() =>
                                setCurrentSlide(
                                    (prev) =>
                                        (prev - 1 + heroSlides.length) %
                                        heroSlides.length
                                )
                            }
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={() =>
                                setCurrentSlide(
                                    (prev) => (prev + 1) % heroSlides.length
                                )
                            }
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>

                        {/* Slide Indicators */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {heroSlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentSlide
                                            ? "bg-white"
                                            : "bg-white/50 hover:bg-white/75"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                </div>
            )}
            </section>

            {/* Dynamic Content Sections */}
            <div>
                <DynamicContentRenderer content={missionContent} />
                <DynamicContentRenderer content={featuresContent} />
                <DynamicContentRenderer content={statsContent} />
                <DynamicContentRenderer content={formsContent} />
            </div>

            {/* Core Values & Quick Access Section */}
            <section className="py-1 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Core Values Section */}
                    <div className="mb-1">
                        <h1 className="text-4xl md:text-5xl font-bold text-royal-blue mb-6 tracking-wide leading-tight">
                            <div>
                                <span className="text-5xl md:text-6xl">P</span>
                                ASEO.{" "}
                                <span className="text-5xl md:text-6xl">V</span>
                                ERDE.
                            </div>
                            <div>
                                <span className="text-5xl md:text-6xl">S</span>
                                TORM.
                            </div>
                        </h1>
                    </div>

                    {/* Information For Section */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-royal-blue mb-6 tracking-wide">
                            INFORMATION FOR:
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button
                                asChild
                                className="bg-royal-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-2xl transition-colors flex items-center justify-center space-x-2"
                            >
                                <Link to="/admissions">
                                    <span>ADMISSION</span>
                                    <span>→</span>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-royal-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-2xl transition-colors flex items-center justify-center space-x-2"
                            >
                                <Link to="/students">
                                    <span>STUDENTS</span>
                                    <span>→</span>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-royal-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-2xl transition-colors flex items-center justify-center space-x-2"
                            >
                                <Link to="/faculty">
                                    <span>FACULTY & STAFF</span>
                                    <span>→</span>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-royal-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-2xl transition-colors flex items-center justify-center space-x-2"
                            >
                                <Link to="/donate">
                                    <span>GIVE TO TNHS</span>
                                    <span>↑</span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Explore Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-royal-blue mb-4 tracking-wide">
                            EXPLORE
                        </h2>
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <svg
                                        className="w-5 h-5 text-royal-blue"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-12 pr-4 py-3 border-2 border-royal-blue rounded-2xl focus:border-blue-700 focus:outline-none text-gray-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Combined Search & News Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Two-Column Layout */}
                    <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* Left Column - Announcements (Wider) */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                                {/* Dynamic Announcements */}
                                {loading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue mx-auto mb-4"></div>
                                        <p className="text-gray-600">
                                            Loading announcements...
                                        </p>
                                    </div>
                                ) : announcements.length > 0 ? (
                                    <div className="space-y-6">
                                        {/* Featured Announcement (First one) */}
                                        {announcements[0] && (
                                            <div className="mb-8">
                                                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                                                    <div className="flex flex-col md:flex-row h-full">
                                                        {/* Left Section - Image */}
                                                        <div className="relative md:w-2/5 h-48 md:h-auto">
                                                            <img
                                                                src={
                                                                    announcements[0]
                                                                        .image
                                                                }
                                                                alt={
                                                                    announcements[0]
                                                                        .title
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                            {/* Featured Tag */}
                                                            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
                                                                <span>★</span>
                                                                <span>
                                                                    FEATURED
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Right Section - Content */}
                                                        <div className="md:w-3/5 p-6 flex flex-col justify-between">
                                                            {/* Top Metadata */}
                                                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                                                <div className="flex items-center space-x-1">
                                                                    <span>
                                                                        📅
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            announcements[0]
                                                                                .date
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                                                    {
                                                                        announcements[0]
                                                                            .category
                                                                    }
                                                                </div>
                                                            </div>

                                                            {/* Title */}
                                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                                                {
                                                                    announcements[0]
                                                                        .title
                                                                }
                                                            </h3>

                                                            {/* Description */}
                                                            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                                                {
                                                                    announcements[0]
                                                                        .excerpt
                                                                }
                                                            </p>

                                                            {/* Bottom Metadata */}
                                                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                                                <div className="flex items-center space-x-1">
                                                                    <span>
                                                                        👤
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            announcements[0]
                                                                                .author
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center space-x-1">
                                                                    <span>
                                                                        👁️
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            announcements[0]
                                                                                .views
                                                                        }{" "}
                                                                        views
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Read More Button */}
                                                            <Button
                                                                asChild
                                                                className="bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 transform self-end"
                                                            >
                                                                <Link
                                                                    to="/news"
                                                                    className="flex items-center space-x-1"
                                                                >
                                                                    <span>
                                                                        Read
                                                                        More
                                                                    </span>
                                                                    <span>
                                                                        →
                                                                    </span>
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Additional Announcements */}
                                        {announcements
                                            .slice(1, 3)
                                            .map((announcement, index) => (
                                                <div
                                                    key={announcement.id}
                                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                                                >
                                                    <div className="flex flex-col md:flex-row h-full">
                                                        {/* Left Section - Image */}
                                                        <div className="relative md:w-2/5 h-48 md:h-auto">
                                                            <img
                                                                src={
                                                                    announcement.image
                                                                }
                                                                alt={
                                                                    announcement.title
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                            {/* News Tag */}
                                                            <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
                                                                <span>📰</span>
                                                                <span>
                                                                    NEWS
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Right Section - Content */}
                                                        <div className="md:w-3/5 p-6 flex flex-col justify-between">
                                                            {/* Top Metadata */}
                                                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                                                <div className="flex items-center space-x-1">
                                                                    <span>
                                                                        📅
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            announcement.date
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                                                    {
                                                                        announcement.category
                                                                    }
                                                                </div>
                                                            </div>

                                                            {/* Title */}
                                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                                                {
                                                                    announcement.title
                                                                }
                                                            </h3>

                                                            {/* Description */}
                                                            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                                                {
                                                                    announcement.excerpt
                                                                }
                                                            </p>

                                                            {/* Bottom Metadata */}
                                                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                                                <div className="flex items-center space-x-1">
                                                                    <span>
                                                                        👤
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            announcement.author
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center space-x-1">
                                                                    <span>
                                                                        👁️
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            announcement.views
                                                                        }{" "}
                                                                        views
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Read More Button */}
                                                            <Button
                                                                asChild
                                                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 transform self-end"
                                                            >
                                                                <Link
                                                                    to="/news"
                                                                    className="flex items-center space-x-1"
                                                                >
                                                                    <span>
                                                                        Read
                                                                        More
                                                                    </span>
                                                                    <span>
                                                                        →
                                                                    </span>
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Newspaper className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-600">
                                            No announcements available at the
                                            moment.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Application Forms and Exam Schedules */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Online Application Forms */}
                            <div className="bg-blue-800 rounded-xl shadow-lg p-6 border-2 border-white">
                                <h4 className="text-xl font-bold text-white mb-6 text-center">
                                    Online Application Forms
                                </h4>

                                {/* Application Cards */}
                                <div className="space-y-4">
                                    {/* College Program */}
                                    <div className="bg-white rounded-lg p-4 text-center">
                                        <h5 className="font-bold text-gray-800 mb-2">
                                            College Program
                                        </h5>
                                        <p className="text-gray-600 text-sm mb-3">
                                            Applying for Bachelor's Degree or
                                            Teacher's Certification Program
                                            (TCP)
                                        </p>
                                        <Button
                                            onClick={() =>
                                                handleApplicationSubmit(
                                                    "College Program"
                                                )
                                            }
                                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300"
                                        >
                                            Apply Now!
                                        </Button>
                                    </div>

                                    {/* Graduate School Program */}
                                    <div className="bg-white rounded-lg p-4 text-center">
                                        <h5 className="font-bold text-gray-800 mb-2">
                                            Graduate School Program
                                        </h5>
                                        <p className="text-gray-600 text-sm mb-3">
                                            Applying for Masters and Doctoral
                                            Degree
                                        </p>
                                        <Button
                                            onClick={() =>
                                                handleApplicationSubmit(
                                                    "Graduate School Program"
                                                )
                                            }
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300"
                                        >
                                            Apply Now!
                                        </Button>
                                    </div>

                                    {/* School of Medicine Program */}
                                    <div className="bg-white rounded-lg p-4 text-center">
                                        <h5 className="font-bold text-gray-800 mb-2">
                                            School of Medicine Program
                                        </h5>
                                        <p className="text-gray-600 text-sm mb-3">
                                            Applying for Doctor of Medicine
                                        </p>
                                        <Button
                                            onClick={() =>
                                                handleApplicationSubmit(
                                                    "School of Medicine Program"
                                                )
                                            }
                                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300"
                                        >
                                            Apply Now!
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Exam Schedules - Enhanced Design */}
                            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                                {/* Header with Image and Tag */}
                                <div className="relative h-32 bg-gradient-to-r from-royal-blue to-blue-600">
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <div className="absolute top-3 left-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
                                        <Calendar className="h-3 w-3" />
                                        <span>EXAM SCHEDULE</span>
                                    </div>
                                    <div className="absolute bottom-3 left-3 text-white">
                                        <h4 className="text-lg font-bold">
                                            Exam Calendar
                                        </h4>
                                        <p className="text-sm opacity-90">
                                            View exam schedules
                                        </p>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    {/* Top Metadata */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center space-x-1">
                                            <span>📅</span>
                                            <span>
                                                Academic Year {academicYear}
                                            </span>
                                        </div>
                                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                            EXAM PERIOD
                                        </div>
                                    </div>

                                    {/* Exam Schedule Info */}
                                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
                                        <h5 className="text-sm font-semibold text-royal-blue mb-3 flex items-center">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Upcoming Exams
                                        </h5>
                                        <div className="space-y-2 text-xs text-gray-700">
                                            <div className="flex items-center justify-between">
                                                <span>
                                                    📚 Midterm Examinations
                                                </span>
                                                <span className="text-royal-blue font-medium">
                                                    March 15-19
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>
                                                    📝 Final Examinations
                                                </span>
                                                <span className="text-royal-blue font-medium">
                                                    May 20-24
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>🔬 Science Fair</span>
                                                <span className="text-royal-blue font-medium">
                                                    April 10
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Interactive Calendar - Enhanced */}
                                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                        {/* Calendar Header with Navigation */}
                                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                            <button
                                                onClick={prevMonth}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                                            >
                                                <ChevronLeft className="h-4 w-4 text-royal-blue group-hover:text-blue-700" />
                                            </button>
                                            <h5 className="text-sm font-semibold text-royal-blue">
                                                {
                                                    monthNames[
                                                        currentDate.getMonth()
                                                    ]
                                                }{" "}
                                                {currentDate.getFullYear()}
                                            </h5>
                                            <button
                                                onClick={nextMonth}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                                            >
                                                <ChevronRight className="h-4 w-4 text-royal-blue group-hover:text-blue-700" />
                                            </button>
                                        </div>

                                        <div className="p-4">
                                            <div className="grid grid-cols-7 gap-1 text-center">
                                                {/* Days of the week */}
                                                <div className="p-2 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                                    S
                                                </div>
                                                <div className="p-2 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                                    M
                                                </div>
                                                <div className="p-2 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                                    T
                                                </div>
                                                <div className="p-2 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                                    W
                                                </div>
                                                <div className="p-2 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                                    T
                                                </div>
                                                <div className="p-2 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                                    F
                                                </div>
                                                <div className="p-2 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                                    S
                                                </div>

                                                {/* Empty cells for days before the first day of the month */}
                                                {Array.from(
                                                    {
                                                        length: getFirstDayOfMonth(
                                                            currentDate
                                                        ),
                                                    },
                                                    (_, i) => (
                                                        <div
                                                            key={`empty-${i}`}
                                                            className="p-2 text-gray-400 text-xs"
                                                        ></div>
                                                    )
                                                )}

                                                {/* Calendar dates */}
                                                {Array.from(
                                                    {
                                                        length: getDaysInMonth(
                                                            currentDate
                                                        ),
                                                    },
                                                    (_, i) => {
                                                        const day = i + 1;
                                                        const hasExam =
                                                            Math.random() > 0.7; // Random exam indicator
                                                        const isSelected =
                                                            selectedDate ===
                                                            day;

                                                        return (
                                                            <div
                                                                key={day}
                                                                onClick={() =>
                                                                    handleDateClick(
                                                                        day
                                                                    )
                                                                }
                                                                className={`p-2 text-xs cursor-pointer rounded-lg transition-all duration-300 relative hover:scale-105 ${
                                                                    isSelected
                                                                        ? "bg-royal-blue text-white shadow-lg"
                                                                        : hasExam
                                                                        ? "text-red-600 hover:bg-red-50 border border-red-200"
                                                                        : "text-gray-700 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                                                                }`}
                                                            >
                                                                {day}
                                                                {hasExam &&
                                                                    !isSelected && (
                                                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                                                                    )}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Instructions - Enhanced */}
                                    <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                                        <h5 className="text-sm font-semibold text-royal-blue mb-3 flex items-center">
                                            <span className="mr-2">💡</span>
                                            Exam Guidelines
                                        </h5>
                                        <ul className="space-y-2 text-xs text-gray-700">
                                            <li className="flex items-start">
                                                <span className="text-red-500 mr-2 mt-0.5">
                                                    ●
                                                </span>
                                                <span>
                                                    Red dots indicate scheduled
                                                    exam dates
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-royal-blue mr-2 mt-0.5">
                                                    ●
                                                </span>
                                                <span>
                                                    Click any date to view
                                                    detailed exam schedule
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-green-500 mr-2 mt-0.5">
                                                    ●
                                                </span>
                                                <span>
                                                    Bring valid ID and required
                                                    materials
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exam Schedule Modal */}
            {showExamModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-royal-blue">
                                Exam Schedule -{" "}
                                {monthNames[currentDate.getMonth()]}{" "}
                                {selectedDate}, {currentDate.getFullYear()}
                            </h3>
                            <button
                                onClick={() => setShowExamModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <h4 className="font-semibold text-sm text-gray-800 mb-2">
                                    Available Exams:
                                </h4>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span>Mathematics</span>
                                        <span className="text-royal-blue">
                                            9:00 AM
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>English</span>
                                        <span className="text-royal-blue">
                                            1:00 PM
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Science</span>
                                        <span className="text-royal-blue">
                                            3:00 PM
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <Button
                                    onClick={() => {
                                        alert(
                                            `Booking exam for ${
                                                monthNames[
                                                    currentDate.getMonth()
                                                ]
                                            } ${selectedDate}`
                                        );
                                        setShowExamModal(false);
                                    }}
                                    className="flex-1 bg-royal-blue hover:bg-blue-700 text-white text-xs py-2"
                                >
                                    Book Exam
                                </Button>
                                <Button
                                    onClick={() => setShowExamModal(false)}
                                    variant="outline"
                                    className="flex-1 text-xs py-2"
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Call to Action Section */}
            <section className="py-20 bg-royal-blue">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Ready to Join TNHS?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Start your journey towards academic excellence and
                        personal growth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-royal-blue font-bold px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform border-0"
                        >
                            <Link to="/admissions">Enroll Now</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-white text-white hover:bg-white hover:text-royal-blue font-bold px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform bg-transparent hover:bg-white"
                        >
                            <Link to="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
