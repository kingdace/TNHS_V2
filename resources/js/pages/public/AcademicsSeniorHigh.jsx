import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Users,
    Award,
    Calendar,
    MapPin,
    Clock,
    Briefcase,
    GraduationCap,
    Target,
    Star,
    Globe,
    Heart,
    Zap,
    CheckCircle,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Brain,
    Calculator,
    Microscope,
    Palette,
    Music,
    Dumbbell,
    Wrench,
    Home,
    TreePine,
    Building,
    Laptop,
    DollarSign,
    Scale,
    BookMarked,
    TrendingUp,
    Lightbulb,
    Shield,
    Compass,
    ArrowLeft,
    Trophy,
    Eye,
    X,
    ChevronRight,
} from "lucide-react";

const AcademicsSeniorHigh = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Senior High School Academic Tracks and Strands
    const academicTracks = [
        {
            id: "stem",
            name: "Science, Technology, Engineering & Mathematics (STEM)",
            icon: Brain,
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            track: "Academic Track",
            description:
                "Advanced program focusing on science, technology, engineering, and mathematics",
            promotionalImage: "/images/STEM.jpg",
            details: {
                duration: "2 years (Grade 11-12)",
                target: "Grade 10 completers with strong math and science background",
                features: [
                    "Advanced Mathematics and Science",
                    "Research and Development projects",
                    "Technology integration",
                    "Engineering design process",
                    "Data analysis and interpretation",
                ],
                benefits: [
                    "College preparation for STEM fields",
                    "Critical thinking development",
                    "Problem-solving skills",
                    "Innovation and creativity",
                ],
            },
        },
        {
            id: "humss",
            name: "Humanities and Social Sciences (HUMSS)",
            icon: Globe,
            color: "from-pink-500 to-pink-600",
            bgColor: "bg-pink-50",
            borderColor: "border-pink-200",
            track: "Academic Track",
            description:
                "Program focusing on human behavior, society, and cultural understanding",
            promotionalImage: "/images/humss-promo.jpg",
            details: {
                duration: "2 years (Grade 11-12)",
                target: "Students interested in social sciences and humanities",
                features: [
                    "Social and behavioral sciences",
                    "Communication skills",
                    "Research methodology",
                    "Cultural studies",
                    "Public speaking and debate",
                ],
                benefits: [
                    "Critical thinking development",
                    "Communication excellence",
                    "Social awareness",
                    "Leadership preparation",
                ],
            },
        },
        {
            id: "tvl",
            name: "Technical-Vocational-Livelihood (TVL)",
            icon: Wrench,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            track: "Academic Track",
            description:
                "Skills-based education with specialized strands for immediate employment and entrepreneurship",
            promotionalImage: "/images/tvl-promo.jpg",
            hasSubStrands: true,
            subStrands: [
                {
                    id: "ict",
                    name: "Information and Communications Technology (ICT)",
                    icon: Laptop,
                    color: "from-indigo-500 to-indigo-600",
                    description:
                        "Comprehensive program covering computer systems, programming, and digital technologies",
                    features: [
                        "Computer programming",
                        "Web development",
                        "Database management",
                        "Network administration",
                        "Digital graphics and animation",
                    ],
                },
                {
                    id: "css",
                    name: "Computer Systems Servicing (CSS)",
                    icon: Shield,
                    color: "from-orange-500 to-orange-600",
                    description:
                        "Specialized program for computer hardware and network maintenance",
                    features: [
                        "Computer hardware assembly",
                        "Network installation and configuration",
                        "System troubleshooting",
                        "Preventive maintenance",
                        "Customer service skills",
                    ],
                },
            ],
            details: {
                duration: "2 years (Grade 11-12)",
                target: "Students interested in technical and vocational skills",
                features: [
                    "Hands-on training",
                    "Industry-standard equipment",
                    "National Certification (NC) preparation",
                    "Work immersion program",
                    "Entrepreneurship training",
                ],
                benefits: [
                    "Immediate employment opportunities",
                    "Practical skills development",
                    "Industry certification",
                    "Entrepreneurship readiness",
                ],
            },
        },
    ];

    // Combine all programs for display
    const allPrograms = academicTracks;

    const openImageModal = (program) => {
        setSelectedImage(program);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-8 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link
                            to="/"
                            className="hover:text-blue-600 transition-colors duration-200 flex items-center"
                        >
                            <Home className="h-4 w-4 mr-1" />
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <Link
                            to="/academics"
                            className="hover:text-blue-600 transition-colors duration-200"
                        >
                            Academics
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <span className="text-blue-600 font-medium">
                            Senior High School
                        </span>
                    </div>
                </nav>

                {/* Back to Programs Overview */}
                <div className="mb-6">
                    <Link
                        to="/academics"
                        className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mr-4 group"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Programs Overview
                    </Link>
                </div>

                {/* Enhanced Header */}
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                            <GraduationCap className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-white text-xs font-bold">
                                3
                            </span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                        🎓 Senior High School Strands
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
                        Choose from our comprehensive academic and
                        technical-vocational tracks designed to prepare students
                        for college and career success in Grades 11-12
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto"></div>
                </div>

                {/* Strands Overview */}
                <div className="mb-16">
                    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-3xl p-10 border border-slate-200 shadow-2xl">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>

                        {/* Header Section */}
                        <div className="text-center mb-10 relative z-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                                <GraduationCap className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
                                Available Strands at TNHS
                            </h2>
                            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                                Choose your path to success with our
                                comprehensive academic tracks
                            </p>
                            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"></div>
                        </div>

                        {/* Academic Tracks Grid */}
                        <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                            {/* STEM Track */}
                            <div className="group relative">
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group-hover:border-purple-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <Brain className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-purple-700">
                                                    STEM
                                                </h3>
                                                <div className="flex items-center space-x-1">
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                    <span className="text-sm text-purple-600 font-medium">
                                                        Academic Track
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <CheckCircle className="h-6 w-6 text-purple-500" />
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                        Science, Technology, Engineering &
                                        Mathematics
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-xs text-slate-500">
                                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                                            <span>
                                                Advanced Mathematics & Science
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                                            <span>Research & Development</span>
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                                            <span>College Preparation</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TVL Track - CENTER POSITION */}
                            <div className="group relative">
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-300/60 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group-hover:border-green-400 relative overflow-hidden">
                                    {/* Special highlight for center card */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500"></div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-xl">
                                                <Wrench className="h-7 w-7 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-green-700">
                                                    TVL
                                                </h3>
                                                <div className="flex items-center space-x-1">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-sm text-green-600 font-medium">
                                                        Academic Track
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <CheckCircle className="h-6 w-6 text-green-500" />
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
                                        Technical-Vocational-Livelihood
                                    </p>

                                    {/* Enhanced Sub-strands */}
                                    <div className="space-y-3">
                                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200/60 shadow-md hover:shadow-lg transition-all duration-200">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                                                    <Laptop className="h-4 w-4 text-white" />
                                                </div>
                                                <span className="font-bold text-indigo-700 text-base">
                                                    ICT
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 font-medium">
                                                Information & Communications
                                                Technology
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200/60 shadow-md hover:shadow-lg transition-all duration-200">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                                                    <Shield className="h-4 w-4 text-white" />
                                                </div>
                                                <span className="font-bold text-orange-700 text-base">
                                                    CSS
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 font-medium">
                                                Computer Systems Servicing
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* HUMSS Track */}
                            <div className="group relative">
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group-hover:border-pink-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <Globe className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-pink-700">
                                                    HUMSS
                                                </h3>
                                                <div className="flex items-center space-x-1">
                                                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                                    <span className="text-sm text-pink-600 font-medium">
                                                        Academic Track
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <CheckCircle className="h-6 w-6 text-pink-500" />
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                        Humanities and Social Sciences
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-xs text-slate-500">
                                            <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2"></div>
                                            <span>
                                                Social & Behavioral Sciences
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2"></div>
                                            <span>
                                                Communication Excellence
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2"></div>
                                            <span>Leadership Preparation</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Note Section */}
                        <div className="mt-10 text-center relative z-10">
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
                                <div className="flex items-center justify-center space-x-2 mb-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <BookOpen className="h-4 w-4 text-white" />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-700">
                                        Program Overview
                                    </h4>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed max-w-3xl mx-auto">
                                    <span className="font-semibold text-slate-700">
                                        All tracks are part of our comprehensive
                                        Academic program.
                                    </span>
                                    TVL offers specialized technical strands
                                    (ICT & CSS) for immediate employment
                                    opportunities, while STEM and HUMSS prepare
                                    students for college and university
                                    education.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Tracks Section */}
                <div className="mb-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Academic Tracks
                        </h2>
                        <p className="text-gray-600">
                            Comprehensive programs including STEM, HUMSS, and
                            TVL with specialized strands
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-green-500 rounded-full mx-auto mt-2"></div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6">
                        {academicTracks.map((program) => {
                            const Icon = program.icon;

                            return (
                                <Link
                                    key={program.id}
                                    to={`/academics/special-programs/${program.id}`}
                                    className="block group"
                                >
                                    <div
                                        className={`${program.bgColor} rounded-2xl shadow-lg border ${program.borderColor} overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}
                                    >
                                        <div className="flex">
                                            {/* Image Section - More Prominent */}
                                            <div
                                                className="w-2/3 h-48 relative cursor-pointer"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    openImageModal(program);
                                                }}
                                            >
                                                <img
                                                    src={
                                                        program.promotionalImage ||
                                                        `/images/BG${
                                                            (allPrograms.indexOf(
                                                                program
                                                            ) %
                                                                3) +
                                                            1
                                                        }.jpg`
                                                    }
                                                    alt={program.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

                                                {/* Program Title Overlay */}
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <div className="mb-2">
                                                        <span
                                                            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                                                program.track ===
                                                                "Academic Track"
                                                                    ? "bg-purple-500/80 text-white"
                                                                    : "bg-indigo-500/80 text-white"
                                                            }`}
                                                        >
                                                            {program.track}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg">
                                                        {program.name}
                                                    </h3>
                                                    <p className="text-white/90 text-sm drop-shadow-md line-clamp-2">
                                                        {program.description}
                                                    </p>
                                                    {program.hasSubStrands && (
                                                        <div className="mt-2">
                                                            <div className="text-white/80 text-xs">
                                                                <span className="font-semibold">
                                                                    Strands:
                                                                </span>{" "}
                                                                ICT, CSS
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Program Icon */}
                                                <div className="absolute top-4 left-4">
                                                    <div
                                                        className={`w-12 h-12 bg-gradient-to-br ${program.color} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm bg-white/20`}
                                                    >
                                                        <Icon className="h-6 w-6 text-white" />
                                                    </div>
                                                </div>

                                                {/* Click to view overlay */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                                                        <Eye className="h-8 w-8 text-gray-700" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="w-1/3 p-3 flex flex-col justify-between bg-white/95 backdrop-blur-sm">
                                                {/* Quick Info */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-1 text-xs text-gray-600">
                                                        <Clock className="h-3 w-3 text-blue-600" />
                                                        <span className="font-medium">
                                                            {
                                                                program.details
                                                                    .duration
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-start space-x-1 text-xs text-gray-600">
                                                        <Target className="h-3 w-3 text-blue-600 mt-0.5" />
                                                        <span className="font-medium leading-tight">
                                                            {
                                                                program.details.target.split(
                                                                    ","
                                                                )[0]
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <div className="mt-3">
                                                    <div className="flex items-center justify-center space-x-1 text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                                                        <span className="text-xs font-semibold">
                                                            Learn More
                                                        </span>
                                                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="text-center">
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            Ready to Choose Your Senior High Strand?
                        </h2>
                        <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
                            Contact our academic department to learn more about
                            admission requirements, strand selection process,
                            and program schedules for Grades 11-12. Choose from
                            our Academic Tracks: STEM, HUMSS, or TVL (with ICT &
                            CSS strands).
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 transform shadow-lg text-sm"
                            >
                                Contact Us for More Info
                            </Link>
                            <Link
                                to="/admissions"
                                className="inline-flex items-center justify-center px-6 py-2 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold rounded-xl transition-all duration-300 text-sm"
                            >
                                View Admission Requirements
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-4xl max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                        {/* Modal Header - Fixed */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                            <div className="flex items-center">
                                <div
                                    className={`w-12 h-12 bg-gradient-to-br ${selectedImage.color} rounded-full flex items-center justify-center shadow-lg mr-4`}
                                >
                                    <selectedImage.icon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {selectedImage.name}
                                    </h2>
                                    <p className="text-gray-600">
                                        {selectedImage.description}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={closeImageModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            >
                                <X className="h-6 w-6 text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="relative mb-6">
                                <img
                                    src={selectedImage.promotionalImage}
                                    alt={selectedImage.name}
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                            </div>

                            {/* Program Info */}
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                                        <Clock className="h-4 w-4 text-blue-600 mr-2" />
                                        Duration
                                    </h3>
                                    <p className="text-gray-700">
                                        {selectedImage.details.duration}
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                                        <Target className="h-4 w-4 text-blue-600 mr-2" />
                                        Target Audience
                                    </h3>
                                    <p className="text-gray-700">
                                        {selectedImage.details.target}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to={`/academics/special-programs/${selectedImage.id}`}
                                    className={`inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r ${selectedImage.color} hover:opacity-90 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 transform shadow-lg`}
                                >
                                    Learn More About This Program
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold rounded-xl transition-all duration-300"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcademicsSeniorHigh;
