import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/ui/Breadcrumb";
import {
    StrandHeader,
    StrandOverview,
    CareerGuideIntro,
    CareerPaths,
} from "../../components/seniorHigh";
import { seniorHighStrandService } from "../../services/seniorHighStrandService";

const AcademicsSeniorHigh = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState("next");
    const [isAutoSwitching, setIsAutoSwitching] = useState(true);
    const [userInteracted, setUserInteracted] = useState(false);

    // API State Management
    const [strands, setStrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch strands from API
    useEffect(() => {
        const fetchStrands = async () => {
            try {
                setLoading(true);
                const response = await seniorHighStrandService.getAll();

                // Map API response to component format
                const mappedStrands = response.data.map((strand) => ({
                    id: strand.strand_id,
                    title: strand.title,
                    shortTitle: strand.short_title,
                    description: strand.description,
                    headerTitle: strand.header_title,
                    strandOverview: strand.strand_overview,
                    careerGuideIntro: strand.career_guide_intro,
                    careerPaths: strand.career_paths,
                    color: strand.color || "from-gray-500 to-gray-600",
                    bgColor: strand.bg_color || "bg-gray-50",
                    borderColor: strand.border_color || "border-gray-200",
                    icon: strand.icon || "📚",
                    gradient:
                        strand.gradient ||
                        "from-gray-400 via-gray-500 to-gray-600",
                    image: strand.image || "/images/default.jpg",
                }));

                setStrands(mappedStrands);
                setError(null);
            } catch (err) {
                console.error("Error fetching strands:", err);
                setError("Failed to load strand data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchStrands();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Auto-switch pages every 1 minute
        const interval = setInterval(() => {
            if (isAutoSwitching && !userInteracted && strands.length > 0) {
                setIsTransitioning(true);
                setDirection("next");

                setTimeout(() => {
                    setCurrentPage((prev) => (prev + 1) % strands.length);
                    setIsTransitioning(false);
                }, 300);
            }
        }, 60000); // 1 minute

        return () => clearInterval(interval);
    }, [isAutoSwitching, userInteracted, strands.length]);

    // Reset auto-switching when user interacts
    useEffect(() => {
        if (userInteracted) {
            const timeout = setTimeout(() => {
                setUserInteracted(false);
            }, 120000); // Resume after 2 minutes of inactivity

            return () => clearTimeout(timeout);
        }
    }, [userInteracted]);

    const handleStrandClick = (index) => {
        setUserInteracted(true);
        setIsTransitioning(true);
        setDirection(index > currentPage ? "next" : "prev");

        setTimeout(() => {
            setCurrentPage(index);
            setIsTransitioning(false);
        }, 300);
    };

    const handleNext = () => {
        setUserInteracted(true);
        setIsTransitioning(true);
        setDirection("next");

        setTimeout(() => {
            setCurrentPage((prev) => (prev + 1) % strands.length);
            setIsTransitioning(false);
        }, 300);
    };

    const handlePrev = () => {
        setUserInteracted(true);
        setIsTransitioning(true);
        setDirection("prev");

        setTimeout(() => {
            setCurrentPage(
                (prev) => (prev - 1 + strands.length) % strands.length
            );
            setIsTransitioning(false);
        }, 300);
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Academics", href: "/academics" },
                        {
                            label: "Senior High School",
                            href: "/academics/senior-high",
                        },
                    ]}
                />
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">
                            Loading Senior High Strands...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Academics", href: "/academics" },
                        {
                            label: "Senior High School",
                            href: "/academics/senior-high",
                        },
                    ]}
                />
                <div className="flex flex-col justify-center items-center min-h-[60vh]">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md">
                        <p className="font-semibold mb-2">⚠️ Error</p>
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // No strands available
    if (strands.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Academics", href: "/academics" },
                        {
                            label: "Senior High School",
                            href: "/academics/senior-high",
                        },
                    ]}
                />
                <div className="flex justify-center items-center min-h-[60vh]">
                    <p className="text-gray-600 font-medium">
                        No strands available at this time.
                    </p>
                </div>
            </div>
        );
    }

    const currentStrand = strands[currentPage];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pb-12">
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Academics", href: "/academics" },
                    {
                        label: "Senior High School",
                        href: "/academics/senior-high",
                    },
                ]}
            />

            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-gray-800 mb-3">
                        Senior High School Programs
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our specialized strands designed to prepare you
                        for college and career success
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {/* Left Column - Strand Information */}
                    <div
                        className={`transform transition-all duration-500 ${
                            isTransitioning
                                ? direction === "next"
                                    ? "-translate-x-6 opacity-0"
                                    : "translate-x-6 opacity-0"
                                : "translate-x-0 opacity-100"
                        }`}
                    >
                        <div className="bg-white p-6 rounded-xl shadow-lg h-full border border-gray-100">
                            {/* Dynamic Components */}
                            <div className="mt-6 space-y-4">
                                <StrandHeader strand={currentStrand} />
                                <StrandOverview strand={currentStrand} />
                                <CareerGuideIntro strand={currentStrand} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Career Paths */}
                    <div
                        className={`transform transition-all duration-500 ${
                            isTransitioning
                                ? direction === "next"
                                    ? "translate-x-6 opacity-0"
                                    : "-translate-x-6 opacity-0"
                                : "translate-x-0 opacity-100"
                        }`}
                    >
                        <div className="bg-white p-6 rounded-xl shadow-lg h-full border border-gray-100 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                                <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm">
                                    📋
                                </span>
                                Career Path Options
                            </h3>

                            {/* Scrollable Career Paths */}
                            <div
                                className="space-y-4 overflow-y-auto max-h-[700px] pr-2"
                                style={{
                                    scrollbarWidth: "thin",
                                    scrollbarColor: "#cbd5e0 #f7fafc",
                                }}
                                onClick={() => setUserInteracted(true)}
                            >
                                <CareerPaths strand={currentStrand} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Strand Image - HUGE Display */}
                <div className="mt-8 w-full flex justify-center">
                    <div className="w-auto max-w-5xl">
                        <img
                            src={
                                currentStrand.id === "stem"
                                    ? "/images/STEM.jpg"
                                    : currentStrand.id === "humss"
                                    ? "/images/HUMSS.jpg"
                                    : "/images/CSS.jpg"
                            }
                            alt={currentStrand.title}
                            className="w-auto h-auto max-h-[800px] object-contain rounded-xl shadow-2xl"
                        />
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-center items-center mt-6 space-x-4">
                    <button
                        onClick={handlePrev}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700 hover:text-gray-900"
                    >
                        <span className="text-lg">←</span>
                        <span className="font-medium">Previous</span>
                    </button>

                    {/* Strand Selector */}
                    <div className="flex space-x-2">
                        {strands.map((strand, index) => (
                            <button
                                key={index}
                                onClick={() => handleStrandClick(index)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    index === currentPage
                                        ? "bg-green-600 text-white shadow-lg"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                }`}
                            >
                                {strand.shortTitle}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700 hover:text-gray-900"
                    >
                        <span className="font-medium">Next</span>
                        <span className="text-lg">→</span>
                    </button>
                </div>

                {/* Auto-switching Indicator */}
                <div className="flex justify-center mt-4">
                    <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                            isAutoSwitching && !userInteracted
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        {isAutoSwitching && !userInteracted
                            ? "🔄 Auto-switching enabled"
                            : "⏸️ Auto-switching paused"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicsSeniorHigh;
