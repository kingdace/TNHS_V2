import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";

const AcademicsSeniorHigh = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState("next");
    const [isAutoSwitching, setIsAutoSwitching] = useState(true);
    const [userInteracted, setUserInteracted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Auto-switch pages every 5 seconds with enhanced effects
        const interval = setInterval(() => {
            if (isAutoSwitching && !userInteracted) {
                setIsTransitioning(true);
                setDirection("next");

                setTimeout(() => {
                    setCurrentPage((prev) => (prev + 1) % strands.length);
                    setIsTransitioning(false);
                }, 300);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoSwitching, userInteracted]);

    // Handle manual navigation
    const handleStrandClick = (index) => {
        setUserInteracted(true);
        setIsAutoSwitching(false);
        setIsTransitioning(true);
        setDirection(index > currentPage ? "next" : "prev");

        setTimeout(() => {
            setCurrentPage(index);
            setIsTransitioning(false);
        }, 300);
    };

    // Reset auto-switching after 10 seconds of no interaction
    useEffect(() => {
        if (userInteracted) {
            const resetTimer = setTimeout(() => {
                setUserInteracted(false);
                setIsAutoSwitching(true);
            }, 10000);

            return () => clearTimeout(resetTimer);
        }
    }, [userInteracted]);

    // Senior High School Strands Data
    const strands = [
        {
            id: "stem",
            title: "Science, Technology, Engineering & Mathematics",
            shortTitle: "STEM",
            description:
                "Advanced program focusing on science, technology, engineering, and mathematics. Prepare for college and university education in STEM fields.",
                features: [
                "Advanced Mathematics & Science",
                "Research & Development Projects",
                "Technology Integration",
                "Engineering Design Process",
                "College Preparation",
            ],
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            icon: "🧬",
            gradient: "from-purple-400 via-purple-500 to-purple-600",
            image: "/images/STEM.jpg",
        },
        {
            id: "humss",
            title: "Humanities and Social Sciences",
            shortTitle: "HUMSS",
            description:
                "Program focusing on human behavior, society, and cultural understanding. Develop critical thinking and communication skills.",
                features: [
                "Social & Behavioral Sciences",
                "Communication Excellence",
                "Research Methodology",
                "Cultural Studies",
                "Leadership Preparation",
            ],
            color: "from-pink-500 to-pink-600",
            bgColor: "bg-pink-50",
            borderColor: "border-pink-200",
            icon: "🌍",
            gradient: "from-pink-400 via-pink-500 to-pink-600",
            image: "/images/HUMSS.jpg",
        },
        {
            id: "tvl",
            title: "Technical-Vocational-Livelihood",
            shortTitle: "TVL",
            description:
                "Skills-based education with specialized strands for immediate employment and entrepreneurship opportunities.",
                    features: [
                "ICT Strand",
                "Computer Systems Servicing",
                "Hands-on Training",
                "Industry Certification",
                "Employment Ready",
            ],
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            icon: "🔧",
            gradient: "from-green-400 via-green-500 to-green-600",
            image: "/images/CSS.jpg",
        },
    ];

    const currentStrand = strands[currentPage];

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="mb-8">
                    <div className="flex items-center space-x-4 text-lg">
                        <Link
                            to="/"
                            className="hover:text-blue-600 transition-all duration-300 font-bold text-gray-800 hover:underline hover:scale-105 transform"
                        >
                            Home
                        </Link>
                        <ChevronRight className="h-6 w-6 text-gray-500" />
                        <Link
                            to="/academics"
                            className="hover:text-blue-600 transition-all duration-300 font-bold text-gray-800 hover:underline hover:scale-105 transform"
                        >
                            Academics
                        </Link>
                        <ChevronRight className="h-6 w-6 text-gray-500" />
                        <span className="text-blue-600 font-bold text-xl bg-blue-50 px-3 py-1 rounded-lg shadow-sm">
                            Senior High School
                        </span>
                    </div>
                </nav>

                {/* Back to Programs Overview */}
                <div className="mb-8">
                    <Link
                        to="/academics"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 font-bold text-lg hover:underline hover:scale-105 transform bg-blue-50 px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="h-5 w-5 mr-3" />
                        Back to Programs Overview
                    </Link>
                </div>

                {/* Header Section - Same Size as JHS */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-green-800 mb-4">
                        Senior High School Strands
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Stay informed with the latest information about our{" "}
                        <strong>Senior High School programs</strong>. Explore
                        our three main strands designed to prepare students for
                        college and career success!
                    </p>
                </div>

                {/* Navigation Section - Same Size as JHS */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-800 text-white px-3 py-1.5 rounded-md font-semibold text-sm">
                            Available Strands
                        </div>
                        <div className="text-gray-500 italic text-sm">
                            "Choose your path to success!"
                        </div>
                    </div>
                    <div className="w-full h-px bg-gray-200 mb-6"></div>
                </div>

                {/* Main Content - Bigger Image + Readable Text */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column - Content with Readable Text */}
                    <div
                        className={`transform transition-all duration-500 ${
                            isTransitioning
                                ? direction === "next"
                                    ? "translate-x-6 opacity-0"
                                    : "-translate-x-6 opacity-0"
                                : "translate-x-0 opacity-100"
                        }`}
                    >
                        <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl shadow-lg">
                            {/* Dynamic Career Matching Guide */}
                <div className="text-center mb-8">
                                {currentStrand.id === "tvl" && (
                                    <>
                                        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-4 px-6 rounded-xl shadow-lg mb-4">
                                            <h3 className="text-2xl font-black uppercase tracking-wide">
                                                🔧 From Circuits to Careers -
                                                CSS Begins at Taft NHS
                                            </h3>
                        </div>

                                        {/* CSS Strands Information */}
                                        <div className="mb-6">
                                            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl shadow-lg border border-yellow-200 max-w-md mx-auto">
                                                <div className="text-center mb-4">
                                                    <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                                                        <span className="text-xl">
                                                            💻
                                                        </span>
                                                    </div>
                                                    <h4 className="text-lg font-bold text-yellow-800">
                                                        CSS Strand Overview
                                                    </h4>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            1
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Computer Hardware
                                                            Servicing
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            2
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Network
                                                            Administration
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                3
                            </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Software Development
                            </span>
                        </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            4
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            ICT Teaching
                                                        </span>
                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            5
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Business IT
                                                            Integration
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
                                            <p className="text-gray-700 text-base leading-relaxed font-medium">
                                                <span className="text-yellow-600 font-bold">
                                                    📋 Career Matching Guide
                                                </span>{" "}
                                                for Computer System Servicing
                                                (CSS) graduates, based on your{" "}
                                                <span className="bg-yellow-200 px-2 py-1 rounded font-bold">
                                                    specific interests
                                                </span>{" "}
                                                or{" "}
                                                <span className="bg-green-200 px-2 py-1 rounded font-bold">
                                                    technical skills
                                                </span>
                                                . This can help you choose a
                                                college course or career path
                                                that aligns with what you're
                                                good at and passionate about:
                                            </p>
                </div>
                                    </>
                                )}

                                {currentStrand.id === "humss" && (
                                    <>
                                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl shadow-lg mb-4">
                                            <h3 className="text-2xl font-black uppercase tracking-wide">
                                                🌍 HUMSS at Taft NHS: Shaping
                                                Minds. Shaping Society.
                                            </h3>
                                        </div>

                                        {/* HUMSS Strands Information */}
                                        <div className="mb-6">
                                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg border border-blue-200 max-w-md mx-auto">
                                                <div className="text-center mb-4">
                                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                                                        <span className="text-xl">
                                                            🌍
                                                        </span>
                            </div>
                                                    <h4 className="text-lg font-bold text-blue-800">
                                                        HUMSS Strand Overview
                                                    </h4>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            1
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Political Science &
                                                            Leadership
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            2
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Communication &
                                                            Media Studies
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            3
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Psychology & Social
                                                            Work
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            4
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Education & Teaching
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            5
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Arts & Creative
                                                            Expression
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                                            <p className="text-gray-700 text-base leading-relaxed font-medium">
                                                <span className="text-blue-600 font-bold">
                                                    📋 Career Matching Guide
                                                </span>{" "}
                                                for HUMSS students, based on
                                                your{" "}
                                                <span className="bg-yellow-200 px-2 py-1 rounded font-bold">
                                                    specific interests
                                                </span>{" "}
                                                or{" "}
                                                <span className="bg-purple-200 px-2 py-1 rounded font-bold">
                                                    strengths
                                                </span>
                                                . Each interest category
                                                includes recommended college
                                                courses and possible career
                                                paths:
                                            </p>
                        </div>
                                    </>
                                )}

                                {currentStrand.id === "stem" && (
                                    <>
                                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl shadow-lg mb-4">
                                            <h3 className="text-2xl font-black uppercase tracking-wide">
                                                🧬 From Taft NHS to Tomorrow -
                                                Choose STEM Today!
                                            </h3>
                                        </div>

                                        {/* STEM Strands Information */}
                                        <div className="mb-6">
                                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-lg border border-green-200 max-w-md mx-auto">
                                                <div className="text-center mb-4">
                                                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                                                        <span className="text-xl">
                                                            🧬
                                                        </span>
                                                    </div>
                                                    <h4 className="text-lg font-bold text-green-800">
                                                        STEM Strand Overview
                                                    </h4>
                                                </div>
                                                <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            1
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Biology & Life
                                                            Sciences
                                                        </span>
                                            </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            2
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Mathematics &
                                                            Statistics
                                                    </span>
                                                </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            3
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Computer Science &
                                                            Technology
                                                        </span>
                                            </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            4
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Engineering &
                                                            Architecture
                                                        </span>
                                        </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            5
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Environmental &
                                                            Earth Sciences
                                                        </span>
                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            6
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            STEM Education &
                                                            Teaching
                                            </span>
                                        </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            7
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            Design & Innovation
                                                        </span>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                                            <p className="text-gray-700 text-base leading-relaxed font-medium">
                                                <span className="text-green-600 font-bold">
                                                    📋 Career Matching Guide
                                                </span>{" "}
                                                based on your{" "}
                                                <span className="bg-yellow-200 px-2 py-1 rounded font-bold">
                                                    specific interests
                                                </span>{" "}
                                                or{" "}
                                                <span className="bg-blue-200 px-2 py-1 rounded font-bold">
                                                    skills within STEM
                                                </span>
                                                . You can scan the categories
                                                below to find the ones that best
                                                describe you, then see the
                                                recommended college courses and
                                                careers that align with them:
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Dynamic Collapsible Sections */}
                            <div
                                className="space-y-4"
                                onClick={() => setUserInteracted(true)}
                            >
                                {/* CSS Sections */}
                                {currentStrand.id === "tvl" && (
                                    <>
                                        {/* CSS Section 1 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                        <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        1
                                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        You Enjoy Fixing
                                                        Computers and Hardware
                                                    </span>
                                                </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-blue-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            ⚡
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Azonbing PCs,
                                                            troubleshooting
                                                            hardware, replacing
                                                            pans
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Tidest College Courses
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Information
                                                                Technology
                                                                (Handware macky)
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                DS Industrial
                                                                Tochanlogy
                                                                Computer et
                                                                Electronics
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BTVTEA Computer
                                                                Hardware
                                                                Servicing
                                                            </li>
                                                        </ul>
                                                    </div>
                                            </div>
                                            <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                    </span>
                                                        Career Matches
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Computer Techn
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                IT Suppon
                                                                Speciali
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Handware
                                                                Fingineer
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Technical
                                                                Trainer (TESDA
                                                                SHS)
                                                            </li>
                                                        </ul>
                                                </div>
                                            </div>
                                        </div>
                                        </details>

                                        {/* CSS Section 2 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        2
                                        </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        You're Interested in
                                                        Networking and Internet
                                                        Systems
                                                    </span>
                                    </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-green-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🌐
                                                        </span>
                                                        Skills Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Setting up LAN WAN,
                                                            configuring rounzes,
                                                            understanding IP
                                                            addresses
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Ideal College Courses
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Infocuation
                                                                Technology (with
                                                                Netwinking or
                                                                Cybaneerity
                                                                major)
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Electronics
                                                                and Commanctions
                                                                Enger CE
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                85 Computer
                                                                Engineering
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                DS formation Sy
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Career Matches
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Network Administ
                                                                Network Technic
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Systems Support
                                                                Specialist
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Cybersecurity
                                                                Associate
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                H
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>

                                        {/* CSS Section 3 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        3
                                                </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        You're Curious About
                                                        Software and Coding
                                                </span>
                                            </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-purple-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💻
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Programming basics,
                                                            configuring apps,
                                                            karming new software
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Ideal College Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Computer
                                                                Science
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Infirmation
                                                Technology
                                                                (Software or Web
                                                                Dev track)
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS laformation
                                                                Systems
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Career Matches
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Software
                                                                Developer
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Web Developer
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                App Sapport
                                                                Specialist
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                QA Tester
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>

                                        {/* CSS Section 4 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        4
                                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        You Like Explaining or
                                                        Teaching Tech to Others
                                                    </span>
                                                </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-orange-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            👨‍🏫
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Helping classmates
                                                            understand toch,
                                                            guiding odors,
                                                            patience in teaching
                                            </p>
                                        </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Ideal College Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                HTVTF-Information
                                                                and
                                                                Communication
                                                                Technology (ICT)
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Infirmation
                                                                Technology (with
                                                                alacation or
                                                                training
                                                                clectives)
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Career Matches
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                TVI. Senior High
                                                                School Teacher
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                TESDA Trainer
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Computer Lab
                                                                Instructor
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Community Tech
                                                                Trainer
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>

                                        {/* CSS Section 5 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        5
                                                </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        You're Organized and
                                                        Want to Mix IT with
                                                        Business
                                                </span>
                                            </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-red-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            📊
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Office tools,
                                                            troubleshooting lech
                                                            in offices, managing
                                                            witems
                                            </p>
                                        </div>
                                    </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Ideal College Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Office
                                                                Admitistration
                                                                (with IT focus)
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                HS laformation
                                                                Systems
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Business
                                                                Administration
                                                                (MIS or toch
                                                                track)
                                                            </li>
                                                        </ul>
                                </div>
                            </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Career Matches
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                IT Office
                                                                Support
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                IT Coordinator
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Rusiness IT
                                                                Comaltant
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Systems Analyst
                                                                (with
                                                                experience)
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>
                                    </>
                                )}

                                {/* HUMSS Sections */}
                                {currentStrand.id === "humss" && (
                                    <>
                                        {/* HUMSS Section 1 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                        <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        1
                                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        You Love Debating,
                                                        Public Speaking, or
                                                        Leading
                                                    </span>
                                                </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-pink-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎤
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Arming a pent,
                                                            lucership, critical
                                                            thinking, organ.cing
                                                            people
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Recommended Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BA Political
                                                                Science
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BA
                                                                Communication/Public
                                                                Administration
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BA Legal
                                                                Manageret
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                International
                                                                Studies
                                                            </li>
                                                        </ul>
                                                    </div>
                                            </div>
                                            <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                    </span>
                                                        Potential Careers:
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Lawyer,
                                                                diplomat, public
                                                                servant,
                                                                politician,
                                                                political
                                                                analyst,
                                                                debotertunanet
                                                            </li>
                                                        </ul>
                                                </div>
                                            </div>
                                        </div>
                                        </details>

                                        {/* HUMSS Section 2 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        2
                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        You're Into Writing,
                                                        Storytelling, or Media
                                                    </span>
                                                </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-purple-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            ✍️
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Writing articles,
                                                            aorytelling, wicial
                                                            media, creative
                                                            expression
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                            </span>
                                                        Recommended Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BA Journalism
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                AB
                                                                Communication/Broadcasting
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BA Creative
                                                                Writing/Literature
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BA Multimedia
                                                                Arts
                                                                (Communication
                                                                Track)
                                                            </li>
                                                        </ul>
                                        </div>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                            </span>
                                                        Potential Careers:
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Jumalist, write,
                                                                screenwriter,
                                                                editor, content
                                                                creator, pebbe
                                                                relations
                                                                officer
                                                            </li>
                                                        </ul>
                                        </div>
                                        </div>
                                    </div>
                                        </details>

                                        {/* HUMSS Section 3 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        3
                                </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        You're Curious About
                                                        Human Behavior or Mental
                                                        Health
                                                    </span>
                            </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-blue-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🧠
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Observing people,
                                                            empathy, giving
                                                            advice, anclyriig
                                                            zmotions
                                                        </p>
                        </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Recommended Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Psychology
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Social Work
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BA Sociology
                                                                Anthropology
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Potential Careers:
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Psychologist
                                                                (with graduane
                                                                study), guidance
                                                                counselor,
                                                                social worker,
                                                                therapist, human
                                                                resource officer
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>

                                        {/* HUMSS Section 4 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        4
                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        You Enjoy Teaching,
                                                        Explaining Ideas, or
                                                        Mentoring
                                                    </span>
                                </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                    </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-green-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            👨‍🏫
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Shering knowledge,
                                                            classroom setap,
                                                            lesson planning,
                                                            helping others leam
                                </p>
                            </div>
                        </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Recommended Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                Bachelor of
                                                                Secondary
                                                                Education major
                                                                in English,
                                                                Filipino, Social
                                                                Studies
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                Bachelor of
                                                                Elementary
                                                                Education
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                Bachelor of
                                                                Sperial Needs
                                                                Education
                                                            </li>
                                                        </ul>
                    </div>
                </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Potential Careers:
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Teacher, school
                                                                principal, SPFD
                                                                specialist,
                                                                curriculum
                                                                developer, tulec
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>

                                        {/* HUMSS Section 5 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        5
                                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        You're Artistic,
                                                        Expressive, or Love
                                                        Performing
                                                    </span>
                                                </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-orange-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎨
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Acting, painting,
                                                            music, cesign,
                                                            creativity
                                                        </p>
                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Recommended Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BA Theater
                                                                Arts/Fine Arts
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BA
                                                                Literature/Creative
                                                                Wriling
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BA Music
                                                                Film/Visual
                                                                Communication
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Potential Careers:
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Artist,
                                                                performat,
                                                                director,
                                                                scriptwriter,
                                                                creative
                                                                director, noveli
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>
                                    </>
                                )}

                                {/* STEM Sections */}
                                {currentStrand.id === "stem" && (
                                    <>
                                        {/* STEM Section 1 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        1
                                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        Love for Biology, Life
                                                        Sciences, or Helping
                                                        People
                                                        </span>
                                                    </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-purple-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🧬
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Anatomy, lab work,
                                                            mecheme,
                                                            planesanumas,
                                                            henithcare,
                                                            community service
                                                        </p>
                                                            </div>
                                                        </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Recommended Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Biology
                                                                Molecular
                                                                Biology
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Nutsatt BS
                                                                Medicsi
                                                                Tachecology
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Pharmacy
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                B5 Psychology
                                                                (Pre-Med or
                                                                Clinccal)
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Public Health
                                                                Nutricion
                                                            </li>
                                                        </ul>
                                                </div>
                                                    </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Potential Careers:
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Doctor, mine,
                                                                pharmacist, lab
                                                                technologist,
                                                                geneticist,
                                                                scalh researcher
                                                            </li>
                                                        </ul>
                                                </div>
                                                </div>
                                            </div>
                                        </details>

                                        {/* STEM Section 2 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        2
                                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        Strong in Math, Logic,
                                                        or Problem-Solving
                                                    </span>
                                                </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-blue-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🧮
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Crealstom,
                                                            analytics, patterns,
                                                            theoretical thinking
                                                        </p>
                                            </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Recommended Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Mathematics
                                                                Applied Math
                                                                Statistics
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Dua Scienc
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Acturrial
                                                                Scimec
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS-Physics
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Potential Careers:
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Data analyst,
                                                                actuary,
                                                                statistician,
                                                                Cumatal malyst,
                                                                Alinmachine
                                                                leating exрел
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>

                                        {/* STEM Section 3 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        3
                                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        Passionate About
                                                        Computers, Tech, or
                                                        Coding
                                                        </span>
                                                    </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                        </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-green-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💻
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Prognarining,
                                                            gameapp developeren,
                                                            digital systems,
                                                            cybersesarily
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Recommended Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Computer
                                                                Science
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                85 done
                                                                onchnologs
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Compuer
                                                                Engneering
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Informacion
                                                                Systems
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Potential Careers:
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Software
                                                                emircet,
                                                                cybersecurity
                                                                spooin sr. IT
                                                                analyst, wale
                                                                mobile devolopar
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>

                                        {/* STEM Section 4 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        4
                                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        Interested in Building,
                                                        Designing, or
                                                        Engineering Systems
                                                        </span>
                                                    </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-orange-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🏗️
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Mechanics,
                                                            electronics,
                                                            hectare, ictures,
                                                            problem-solving
                                                        </p>
                                                </div>
                                            </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Recommended Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS
                                                                Civil/Mechanical
                                                                Electrical
                                                                Engineering
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                85 Archiccm
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                B5 Electronics
                                                                und
                                                                Communications
                                                                Engineering
                                                                (ECE)
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Industrial
                                                                Engineering
                                                            </li>
                                                        </ul>
                                        </div>
                                    </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Potential Careers:
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Engincer
                                                                rvarious fields,
                                                                architect,
                                                                conatction
                                                                manage, synzes
                                                                designer
                                                            </li>
                                                        </ul>
                    </div>
                </div>
                                            </div>
                                        </details>

                                        {/* STEM Section 5 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        5
                                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        Environmental or Earth
                                                        Science Enthusiast
                                                    </span>
                                                </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-red-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🌍
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Natize, climate
                                                            change
                                                            sustenability,
                                                            fieldwors
                                                        </p>
                        </div>
                    </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Recommended Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                15.
                                                                Pavirenotontal
                                                                Science
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Goolog
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS
                                                                Agriculture/Forestry
                                                                85 Marin,
                                                                Biology
                                                            </li>
                                                        </ul>
                </div>
            </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Potential Careers:
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Envirostens,
                                                                conservscorist,
                                                                manne biologiat,
                                                                clirane
                                                                sesesecher
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>

                                        {/* STEM Section 6 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        6
                                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        Want to Inspire Others
                                                        Through Teaching
                                                    </span>
                                                </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-pink-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            👨‍🏫
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Explaining conecpes,
                                                            mencoring, public
                                                            speaking, ocucation
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Recommended Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS
                                                                Mathensducacion
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Scene Human
                                                                (Plys, Badugy
                                                                Chemistry) BS
                                                                Tochanlogy and
                                                                Livelihood uzat
                                                                on (TL)
                                                            </li>
                                                        </ul>
                                                    </div>
                                </div>
                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Potential Careers:
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                STEM eschat
                                                                education
                                                                consula,
                                                                scadenie sch
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>

                                        {/* STEM Section 7 */}
                                        <details className="group">
                                            <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                        7
                                                    </div>
                                                    <span className="font-semibold text-gray-800 text-lg">
                                                        Creative Thinker with a
                                                        Technical Edge
                                                    </span>
                                                </div>
                                                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                                                    ▼
                                                </span>
                                            </summary>
                                            <div className="p-6 bg-white border-l-4 border-indigo-400 rounded-r-lg mt-2 shadow-sm">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-blue-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💡
                                                        </span>
                                                        Skills/Interests:
                                                    </h5>
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-gray-700 font-medium">
                                                            Dowology, mesation,
                                                            UIN, vants with logi
                                    </p>
                                </div>
                            </div>
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            🎓
                                                        </span>
                                                        Recommended Courses:
                                                    </h5>
                                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Indeurial
                                                                Design
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                85 Game
                                                                Deve.cpen/Animation
                                                                BS Architecture
                                                            </li>
                                                            <li className="flex items-center">
                                                                <span className="text-green-500 mr-2 font-bold">
                                                                    ✓
                                                                </span>
                                                                BS Multimedia
                                                                Ans (Tedi Track)
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                                            💼
                                                        </span>
                                                        Potential Careers:
                                                    </h5>
                                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                        <ul className="text-gray-700 space-y-2">
                                                            <li className="flex items-center">
                                                                <span className="text-purple-500 mr-2 font-bold">
                                                                    🚀
                                                                </span>
                                                                Pares del X
                                                                designer, probat
                                                                designer CAD dis
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>
                                    </>
                                )}
                            </div>
                        </div>
                        </div>

                    {/* Right Column - Original Size Image */}
                    <div className="relative">
                        <div
                            className={`transform transition-all duration-500 ${
                                isTransitioning
                                    ? direction === "next"
                                        ? "translate-x-6 scale-95 opacity-0"
                                        : "-translate-x-6 scale-95 opacity-0"
                                    : "translate-x-0 scale-100 opacity-100"
                            }`}
                        >
                            {/* Original Size Image - Matches Content Height with Theme Colors */}
                            <div className="text-center">
                                <div
                                    className={`w-full h-full mx-auto rounded-lg overflow-hidden shadow-xl ${
                                        currentStrand.id === "stem"
                                            ? "bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300"
                                            : currentStrand.id === "humss"
                                            ? "bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-blue-300"
                                            : "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300"
                                    }`}
                                >
                                    <img
                                        src={currentStrand.image}
                                        alt={currentStrand.shortTitle}
                                        className="w-full h-full object-contain"
                                    />
                            </div>

                                {/* Theme Color Overlay */}
                                <div
                                    className={`absolute inset-0 rounded-lg pointer-events-none ${
                                        currentStrand.id === "stem"
                                            ? "bg-gradient-to-br from-green-400/20 to-emerald-400/20"
                                            : currentStrand.id === "humss"
                                            ? "bg-gradient-to-br from-blue-400/20 to-indigo-400/20"
                                            : "bg-gradient-to-br from-yellow-400/20 to-orange-400/20"
                                    }`}
                                ></div>

                                {/* Strand Color Accent */}
                                <div
                                    className={`absolute top-4 right-4 w-8 h-8 rounded-full shadow-lg ${
                                        currentStrand.id === "stem"
                                            ? "bg-gradient-to-br from-green-500 to-emerald-500"
                                            : currentStrand.id === "humss"
                                            ? "bg-gradient-to-br from-blue-500 to-indigo-500"
                                            : "bg-gradient-to-br from-yellow-500 to-orange-500"
                                    }`}
                                >
                                    <div className="flex items-center justify-center h-full text-white font-bold text-sm">
                                        {currentStrand.id === "stem"
                                            ? "🧬"
                                            : currentStrand.id === "humss"
                                            ? "🌍"
                                            : "💻"}
                                </div>
                                </div>

                                {/* Additional Color Accents */}
                                <div
                                    className={`absolute bottom-4 left-4 w-6 h-6 rounded-full ${
                                        currentStrand.id === "stem"
                                            ? "bg-green-300"
                                            : currentStrand.id === "humss"
                                            ? "bg-blue-300"
                                            : "bg-yellow-300"
                                    }`}
                                ></div>

                                <div
                                    className={`absolute top-1/2 left-4 w-4 h-4 rounded-full ${
                                        currentStrand.id === "stem"
                                            ? "bg-emerald-300"
                                            : currentStrand.id === "humss"
                                            ? "bg-indigo-300"
                                            : "bg-orange-300"
                                    }`}
                                ></div>
                            </div>
                        </div>
                                </div>
                            </div>

                {/* Page Indicators - Same Size as JHS */}
                {/* Manual Navigation Controls */}
                <div className="flex justify-center items-center mt-6 space-x-4">
                    {/* Previous Button */}
                    <button
                        onClick={() =>
                            handleStrandClick(
                                (currentPage - 1 + strands.length) %
                                    strands.length
                            )
                        }
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

                    {/* Next Button */}
                    <button
                        onClick={() =>
                            handleStrandClick(
                                (currentPage + 1) % strands.length
                            )
                        }
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700 hover:text-gray-900"
                    >
                        <span className="font-medium">Next</span>
                        <span className="text-lg">→</span>
                    </button>
                        </div>

                {/* Auto-switch Status Indicator */}
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
