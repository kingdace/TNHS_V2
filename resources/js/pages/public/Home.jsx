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
    Newspaper,
    Play,
    Facebook,
    Globe,
    MapPin,
    Phone,
    Mail,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { announcementService } from "../../services/announcementService";
import { publicService } from "../../services/publicService";
import { useDynamicContent } from "../../hooks/useDynamicContent";
import EventCalendar from "../../components/calendar/EventCalendar";

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [announcements, setAnnouncements] = useState([]);
    const [heroSlides, setHeroSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    // Dynamic content hooks
    const { content: featuresContent } = useDynamicContent("home", "features");
    const { content: statsContent } = useDynamicContent("home", "statistics");

    // Fetch announcements and hero slides on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch announcements
                const announcementsData =
                    await announcementService.getFeaturedAnnouncements();
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

    // Auto-advance slides every 10 seconds
    useEffect(() => {
        if (heroSlides.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [heroSlides.length]);

    // Get features data - use dynamic content if available, otherwise fallback to hardcoded
    const getFeatures = () => {
        if (featuresContent && featuresContent.length > 0) {
            const featureData = JSON.parse(featuresContent[0].content_data);
            return featureData.features.map((feature, index) => ({
                icon: getFeatureIcon(feature.icon),
                title: feature.title,
                description: feature.description,
            }));
        }

        // Fallback to hardcoded features
        return [
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
    };

    // Helper function to get feature icons
    const getFeatureIcon = (iconName) => {
        const icons = {
            "graduation-cap": (
                <GraduationCap className="h-8 w-8 text-royal-blue" />
            ),
            "book-open": <BookOpen className="h-8 w-8 text-royal-blue" />,
            users: <Users className="h-8 w-8 text-royal-blue" />,
            award: <Award className="h-8 w-8 text-royal-blue" />,
        };
        return (
            icons[iconName] || (
                <GraduationCap className="h-8 w-8 text-royal-blue" />
            )
        );
    };

    const features = getFeatures();

    return (
        <div className="min-h-screen">
            {/* Hero Section - Full Screen Image Carousel */}
            <section className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] overflow-hidden">
                {/* Image Carousel */}
                <div className="relative h-full w-full">
                    {loading ? (
                        // Skeleton loading state
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
                            {/* Skeleton content overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                                    {/* Skeleton Logo */}
                                    <div className="mb-6 flex justify-center">
                                        <div className="h-28 w-28 bg-gray-400 rounded-full animate-pulse"></div>
                                    </div>

                                    {/* Skeleton Title */}
                                    <div className="mb-6 space-y-2">
                                        <div className="h-12 bg-gray-400 rounded-lg w-80 mx-auto animate-pulse"></div>
                                        <div className="h-12 bg-gray-400 rounded-lg w-96 mx-auto animate-pulse"></div>
                                    </div>

                                    {/* Skeleton Subtitle */}
                                    <div className="mb-8">
                                        <div className="h-6 bg-gray-400 rounded w-64 mx-auto animate-pulse"></div>
                                    </div>

                                    {/* Skeleton Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                        <div className="h-12 bg-gray-400 rounded-lg w-48 animate-pulse"></div>
                                        <div className="h-12 bg-gray-400 rounded-lg w-32 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Skeleton Navigation Dots */}
                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-3 w-3 bg-gray-400 rounded-full animate-pulse"
                                    ></div>
                                ))}
                            </div>
                        </div>
                    ) : heroSlides.length === 0 ? (
                        // No slides state
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                            <div className="text-center text-white">
                                {/* <h1 className="text-4xl font-bold mb-4">
                                    Welcome to TNHS
                                </h1> */}
                                {/* <p className="text-xl">
                                    Content coming soon...
                                </p> */}
                            </div>
                        </div>
                    ) : (
                        // Slides carousel
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
                                    className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[3000ms] ease-out ${
                                        index === currentSlide
                                            ? "scale-[1.01]"
                                            : "scale-100"
                                    }`}
                                />
                                {/* Readability overlays: gradient + vignette + subtle grid */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/40"></div>
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%)",
                                    }}
                                ></div>
                                <div
                                    className="absolute inset-0 opacity-[0.06]"
                                    style={{
                                        backgroundImage:
                                            "repeating-linear-gradient(45deg, #fff, #fff 2px, transparent 2px, transparent 12px)",
                                    }}
                                ></div>
                            </div>
                        ))
                    )}
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                        {/* School Logo */}
                        <div className="mb-6 flex justify-center">
                            <div className="h-28 w-28 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 backdrop-blur-sm">
                                <img
                                    src="/images/Logo.jpg"
                                    alt="TNHS Logo"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="mb-6">
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                                Welcome to
                            </h1>
                            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wider mt-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                                TAFT NATIONAL HIGH SCHOOL
                            </h2>
                        </div>

                        {/* School Identity */}
                        <div className="mb-8">
                            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto font-semibold text-blue-100 drop-shadow">
                                "Moving forward with strength, growth, and
                                resilience"
                            </p>
                        </div>

                        {false && (
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                {/* Enrollment Requirements Button */}
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold px-8 h-12 text-lg rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform border-0 relative overflow-hidden group"
                                >
                                    <Link to="/admissions">
                                        <span className="relative z-10">
                                            Enrollment Requirements
                                        </span>
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </Link>
                                </Button>

                                {/* Learn More Button */}
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 h-12 text-lg rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform border-0 relative overflow-hidden group"
                                >
                                    <Link to="/about">
                                        <span className="relative z-10">
                                            Learn More
                                        </span>
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

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

                {/* Removed duplicate controls (kept single arrows and dots above) */}
            </section>

            {/* Core Values & Quick Access Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Core Values Section */}
                    <div className="mb-8">
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
                                className="bg-royal-blue hover:bg-blue-700 text-white font-semibold h-12 px-5 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <Link to="/admissions">ADMISSION</Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-royal-blue hover:bg-blue-700 text-white font-semibold h-12 px-5 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <Link to="/students">STUDENTS</Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-royal-blue hover:bg-blue-700 text-white font-semibold h-12 px-5 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <Link to="/faculty">FACULTY & STAFF</Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-royal-blue hover:bg-blue-700 text-white font-semibold h-12 px-5 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <Link to="/donate">
                                    <span>DONATE TO TNHS</span>
                                    <span></span>
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
            <section className="py-16 bg-[#F7F7F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Two-Column Layout */}
                    <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* Left Column - Announcements (Wider) */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                                {/* Dynamic Announcements */}
                                {loading ? (
                                    <div className="space-y-5">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                                            >
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="md:w-2/5 h-44 bg-gray-200 animate-pulse" />
                                                    <div className="md:w-3/5 p-5 space-y-3">
                                                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                                                        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                                                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                                                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                                                        <div className="h-9 w-32 bg-gray-200 rounded animate-pulse ml-auto" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : announcements.length > 0 ? (
                                    <div className="space-y-5">
                                        {announcements.slice(0, 5).map((a) => (
                                            <div
                                                key={a.id}
                                                className="bg-white rounded-xl border border-blue-100 shadow hover:shadow-md transition-all duration-200 overflow-hidden"
                                            >
                                                <div className="flex flex-col md:flex-row">
                                                    {/* Image */}
                                                    <div className="relative md:w-2/5 h-48 md:h-44">
                                                        <img
                                                            src={a.image}
                                                            alt={a.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute top-3 left-3">
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow">
                                                                <span>★</span>{" "}
                                                                FEATURED
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {/* Content */}
                                                    <div className="md:w-3/5 p-5 flex flex-col">
                                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2.5">
                                                            <div className="inline-flex items-center gap-2">
                                                                <span>📅</span>
                                                                <span>
                                                                    {a.date}
                                                                </span>
                                                            </div>
                                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-royal-blue">
                                                                {a.category}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-1.5 line-clamp-2">
                                                            {a.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                                                            {a.excerpt}
                                                        </p>
                                                        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                                                            <span className="inline-flex items-center gap-2">
                                                                <span>👤</span>
                                                                <span className="font-medium">
                                                                    {a.author}
                                                                </span>
                                                            </span>
                                                            <Button
                                                                asChild
                                                                className="bg-royal-blue hover:bg-blue-700 text-white px-3.5 py-2 h-9 rounded-lg"
                                                            >
                                                                <Link
                                                                    to={`/announcements/${a.id}`}
                                                                    className="inline-flex items-center"
                                                                >
                                                                    Read More
                                                                </Link>
                                                            </Button>
                                                        </div>
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

                        {/* Right Column - School Information & Calendar */}
                        <div className="lg:col-span-1 space-y-4">
                            {/* School Information Hub */}
                            <div className="bg-royal-blue rounded-xl shadow-lg p-5 border-2 border-white">
                                <h4 className="text-lg font-bold text-white mb-4 text-center">
                                    School Information Hub
                                </h4>

                                {/* Information Cards */}
                                <div className="space-y-3">
                                    {/* Sports Programs */}
                                    <div className="bg-white rounded-lg p-3">
                                        <div className="mb-3 overflow-hidden rounded-md border border-gray-200 shadow-sm">
                                            <img
                                                src="/images/sports.jpg"
                                                alt="Sports Programs"
                                                className="w-full h-30 object-cover"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h5 className="font-bold text-gray-800 mb-1 text-sm">
                                                Sports Programs
                                            </h5>
                                            <p className="text-gray-600 text-xs mb-2">
                                                Teams, tryouts, schedules,
                                                achievements
                                            </p>
                                            <Button
                                                asChild
                                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 text-xs rounded-lg transition-all duration-300"
                                            >
                                                <Link to="/sports">
                                                    Explore Sports
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Clubs & Organizations */}
                                    <div className="bg-white rounded-lg p-3">
                                        <div className="mb-3 overflow-hidden rounded-md border border-gray-200 shadow-sm">
                                            <img
                                                src="/images/student.png"
                                                alt="Clubs and Organizations"
                                                className="w-full h-30 object-cover"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h5 className="font-bold text-gray-800 mb-1 text-sm">
                                                Supreme Student Government
                                            </h5>
                                            <p className="text-gray-600 text-xs mb-2">
                                                Student leadership, governance,
                                                and school initiatives
                                            </p>
                                            <Button
                                                asChild
                                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-3 py-1.5 text-xs rounded-lg transition-all duration-300"
                                            >
                                                <Link to="/clubs-organizations">
                                                    Get Involved
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Event Calendar Component */}
                            <EventCalendar />
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-royal-blue/5 to-blue-50 rounded-2xl p-8 border border-royal-blue/10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-royal-blue mb-4">
                            Ready to Join TNHS?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Start your journey towards academic excellence and
                            personal growth at Taft National High School.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                asChild
                                size="lg"
                                className="bg-royal-blue hover:bg-blue-800 text-white font-bold px-8 h-12 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                            >
                                <Link to="/admissions">Enroll Now</Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-2 border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white font-bold px-8 h-12 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                            >
                                <Link to="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
