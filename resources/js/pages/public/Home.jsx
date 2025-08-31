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

    // Auto-advance slides every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 10000);

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
                            {/* Dark overlay for better text readability */}
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>
                    ))}
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                        {/* Welcome Text */}
                        <div className="mb-5">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-shadow-lg">
                                Welcome to TNHS
                            </h1>
                        </div>

                        {/* Mission Statement */}
                        <div className="mb-8">
                            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto text-shadow-md">
                                Empowering students with quality education,
                                fostering academic excellence, and building
                                character for a brighter future in Eastern
                                Samar.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div>
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-bold px-10 py-5 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform border-0 relative overflow-hidden group"
                            >
                                <Link to="/about">
                                    <span className="relative z-10">
                                        Learn More
                                    </span>
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
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

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose TNHS?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We provide a comprehensive educational experience
                            that prepares students for success in life.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="text-center hover:shadow-lg transition-shadow duration-300"
                            >
                                <CardContent className="pt-6">
                                    <div className="flex justify-center mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Upcoming Events
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Stay updated with important dates and events at
                            TNHS.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {upcomingEvents.map((event, index) => (
                            <Card
                                key={index}
                                className="hover:shadow-lg transition-shadow duration-300"
                            >
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-royal-blue rounded-lg text-white">
                                            {event.icon}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">
                                                {event.title}
                                            </CardTitle>
                                            <CardDescription className="text-royal-blue font-medium">
                                                {event.date}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        {event.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest News Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Latest News & Updates
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Stay informed about the latest happenings and
                            achievements at TNHS.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {newsItems.map((news, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-lg line-clamp-2">
                                        {news.title}
                                    </CardTitle>
                                    <CardDescription>
                                        <div className="flex items-center justify-between text-sm">
                                            <span>{news.author}</span>
                                            <span>{news.date}</span>
                                        </div>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 line-clamp-3">
                                        {news.excerpt}
                                    </p>
                                    <Button
                                        asChild
                                        variant="link"
                                        className="p-0 h-auto text-royal-blue hover:text-royal-blue-dark mt-2 font-semibold hover:underline transition-all duration-300 group"
                                    >
                                        <Link
                                            to="/news"
                                            className="flex items-center"
                                        >
                                            Read More{" "}
                                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
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
