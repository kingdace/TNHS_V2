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

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Hero Carousel Data - CSU Style with actual images
    const heroSlides = [
        {
            id: 1,
            title: "Enrollment for School Year 2024-2025",
            subtitle: "NOW OPEN",
            tagline: "Theme: Building Future Leaders Through Quality Education",
            guest: "DEPARTMENT OF EDUCATION",
            role: "Official Partner in Education",
            date: "June 1 - August 30, 2024",
            location: "Taft National High School, Eastern Samar",
            description:
                "Join our community of learners and start your journey towards academic excellence. We are now accepting applications for incoming Grade 7 students and transferees.",
            image: "/images/BG1.jpg",
            ctaText: "Apply Now",
            ctaLink: "/admissions",
        },
        {
            id: 2,
            title: "Academic Excellence Awards",
            subtitle: "RECOGNITION CEREMONY",
            tagline: "Theme: Celebrating Success, Inspiring Excellence",
            guest: "OUTSTANDING STUDENTS",
            role: "Academic Achievers 2024",
            date: "March 15, 2024",
            location: "TNHS Gymnasium, Taft, Eastern Samar",
            description:
                "Join us in celebrating the outstanding achievements of our students who have demonstrated exceptional academic performance and leadership qualities.",
            image: "/images/BG2.jpg",
            ctaText: "View Details",
            ctaLink: "/news",
        },
        {
            id: 3,
            title: "Campus Life at TNHS",
            subtitle: "EXPERIENCE EXCELLENCE",
            tagline: "Theme: Learning, Growing, and Thriving Together",
            guest: "OUR STUDENTS",
            role: "Future Leaders of Tomorrow",
            date: "Year Round",
            location: "Taft National High School Campus",
            description:
                "Experience the vibrant campus life at TNHS where students develop academically, socially, and personally in a supportive and nurturing environment.",
            image: "/images/BG3.jpg",
            ctaText: "Learn More",
            ctaLink: "/about",
        },
    ];

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
            {/* Hero Section - Full Screen Image Carousel */}
            <section className="relative h-screen overflow-hidden">
                {/* Image Carousel */}
                <div className="relative h-full w-full">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                index === currentSlide
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="h-full w-full object-cover"
                            />
                            {/* Lighter overlay for better text readability */}
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                    ))}
                </div>

                {/* Content Overlay */}
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

                        {/* Mission Statement */}
                        <div className="mb-10">
                            <p className="text-3d-shadow-mission text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
                                Empowering students with quality education,
                                fostering excellence, and building character for
                                a brighter future...
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
            </section>

            {/* TNHS Core Values Section */}
            <section className="py-10 bg-gray-100">
                <div className="max-w-5xl mx-auto px-3 sm:px-5S lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="text-3d-shadow font-extrabold tracking-wider">
                                MAKA DIOS MAKA TAO MAKALIKASA MAKABANSA.
                            </span>
                        </h2>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative max-w-2xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search news and announcements..."
                                className="w-full pl-12 pr-4 py-4 border-2 border-royal-blue rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none transition-all duration-300 text-lg"
                            />
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-royal-blue">
                                🔍
                            </span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-semibold text-royal-blue mb-6">
                            QUICK LINKS:
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                asChild
                                className="bg-royal-blue hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 transform flex items-center space-x-2"
                            >
                                <Link to="/admissions">
                                    <span>🎓</span>
                                    <span>ENROLLMENT</span>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-royal-blue hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 transform flex items-center space-x-2"
                            >
                                <Link to="/academics">
                                    <span>📚</span>
                                    <span>ACADEMIC PROGRAMS</span>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-royal-blue hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 transform flex items-center space-x-2"
                            >
                                <Link to="/about">
                                    <span>🏫</span>
                                    <span>ABOUT TNHS</span>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-royal-blue hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 transform flex items-center space-x-2"
                            >
                                <Link to="/contact">
                                    <span>📞</span>
                                    <span>CONTACT US</span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Featured News - First Card */}
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden max-w-4xl mx-auto w-full">
                            <div className="flex flex-col md:flex-row h-full">
                                {/* Left Section - Image */}
                                <div className="relative md:w-2/5 h-48 md:h-auto">
                                    <img
                                        src={newsItems[0].image}
                                        alt={newsItems[0].title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Featured Tag */}
                                    <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
                                        <span>★</span>
                                        <span>FEATURED</span>
                                    </div>
                                </div>

                                {/* Right Section - Content */}
                                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                                    {/* Top Metadata */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                        <div className="flex items-center space-x-1">
                                            <span>📅</span>
                                            <span>{newsItems[0].date}</span>
                                        </div>
                                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                            NEWS
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {newsItems[0].title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {newsItems[0].excerpt}
                                    </p>

                                    {/* Bottom Metadata */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center space-x-1">
                                            <span>👤</span>
                                            <span>{newsItems[0].author}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span>👁️</span>
                                            <span>2436 views</span>
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
                                            <span>Read More</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Additional News Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                            {newsItems.slice(1, 3).map((news, index) => (
                                <div
                                    key={index + 1}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        {/* Top Metadata */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                            <div className="flex items-center space-x-1">
                                                <span>📅</span>
                                                <span>{news.date}</span>
                                            </div>
                                            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                                NEWS
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                                            {news.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                            {news.excerpt}
                                        </p>

                                        {/* Bottom Metadata */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <div className="flex items-center space-x-1">
                                                <span>👤</span>
                                                <span>{news.author}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <span>👁️</span>
                                                <span>
                                                    {Math.floor(
                                                        Math.random() * 2000
                                                    ) + 500}{" "}
                                                    views
                                                </span>
                                            </div>
                                        </div>

                                        {/* Read More Button */}
                                        <Button
                                            asChild
                                            className="w-full bg-gradient-to-r from-royal-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 transform"
                                        >
                                            <Link
                                                to="/news"
                                                className="flex items-center justify-center space-x-1"
                                            >
                                                <span>Read More</span>
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

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
