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
} from "lucide-react";

const AcademicsSeniorHigh = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Special Programs for Senior High School (moved from Special Programs page)
    const specialPrograms = [
        {
            id: "stem",
            name: "Science, Technology, Engineering & Mathematics (STEM)",
            icon: Brain,
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
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
            id: "tvl",
            name: "Technical-Vocational-Livelihood (TVL)",
            icon: Wrench,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            description:
                "Skills-based education for immediate employment and entrepreneurship",
            promotionalImage: "/images/tvl-promo.jpg",
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
        {
            id: "ict",
            name: "Information and Communications Technology (ICT)",
            icon: Laptop,
            color: "from-indigo-500 to-indigo-600",
            bgColor: "bg-indigo-50",
            borderColor: "border-indigo-200",
            description:
                "Comprehensive program covering computer systems, programming, and digital technologies",
            promotionalImage: "/images/ict-promo.jpg",
            details: {
                duration: "2 years (Grade 11-12)",
                target: "Students interested in computer technology and programming",
                features: [
                    "Computer programming",
                    "Web development",
                    "Database management",
                    "Network administration",
                    "Digital graphics and animation",
                ],
                benefits: [
                    "High-demand skills",
                    "Digital literacy",
                    "Programming expertise",
                    "IT career preparation",
                ],
            },
        },
        {
            id: "css",
            name: "Computer Systems Servicing (CSS)",
            icon: Shield,
            color: "from-orange-500 to-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
            description:
                "Specialized program for computer hardware and network maintenance",
            promotionalImage: "/images/css-promo.jpg",
            details: {
                duration: "2 years (Grade 11-12)",
                target: "Students interested in computer hardware and networking",
                features: [
                    "Computer hardware assembly",
                    "Network installation and configuration",
                    "System troubleshooting",
                    "Preventive maintenance",
                    "Customer service skills",
                ],
                benefits: [
                    "Technical expertise",
                    "Industry certification",
                    "Problem-solving skills",
                    "Service-oriented career",
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
            id: "leadership",
            name: "Leadership Development Program",
            icon: Trophy,
            color: "from-yellow-500 to-yellow-600",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
            description:
                "Comprehensive program to develop future leaders and change-makers",
            promotionalImage: "/images/leadership-promo.jpg",
            details: {
                duration: "1 year",
                target: "Selected students with leadership potential",
                features: [
                    "Leadership theory and practice",
                    "Public speaking and communication",
                    "Project management",
                    "Community service",
                    "Mentorship program",
                ],
                benefits: [
                    "Leadership skills development",
                    "Confidence building",
                    "Community impact",
                    "Personal growth",
                ],
            },
        },
        {
            id: "gifted",
            name: "Gifted and Talented Program",
            icon: Lightbulb,
            color: "from-teal-500 to-teal-600",
            bgColor: "bg-teal-50",
            borderColor: "border-teal-200",
            description:
                "Specialized program for academically gifted and talented students",
            promotionalImage: "/images/gifted-promo.jpg",
            details: {
                duration: "2 years",
                target: "Students with exceptional academic abilities",
                features: [
                    "Accelerated curriculum",
                    "Advanced research projects",
                    "Mentorship with experts",
                    "Competition participation",
                    "Independent study options",
                ],
                benefits: [
                    "Academic acceleration",
                    "Intellectual challenge",
                    "Research experience",
                    "Scholarship opportunities",
                ],
            },
        },
    ];

    const openImageModal = (program) => {
        setSelectedImage(program);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-8 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation */}
                <div className="flex items-center mb-8">
                    <Link
                        to="/academics"
                        className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mr-4 group"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Academics
                    </Link>
                </div>

                {/* Enhanced Header */}
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                            <Star className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-white text-xs font-bold">
                                7
                            </span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                        ⭐ Senior High School Programs
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
                        Specialized programs and initiatives designed to enhance
                        student learning, develop unique talents, and prepare
                        students for future success in Grades 11-12
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto"></div>
                </div>

                {/* Two-Sided Special Programs Layout */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    {/* Left Side - First 4 Programs */}
                    <div className="space-y-4">
                        {specialPrograms.slice(0, 4).map((program) => {
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
                                                            (specialPrograms.indexOf(
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
                                                    <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg">
                                                        {program.name}
                                                    </h3>
                                                    <p className="text-white/90 text-sm drop-shadow-md line-clamp-2">
                                                        {program.description}
                                                    </p>
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

                    {/* Right Side - Last 3 Programs */}
                    <div className="space-y-4">
                        {specialPrograms.slice(4, 7).map((program) => {
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
                                                            (specialPrograms.indexOf(
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
                                                    <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg">
                                                        {program.name}
                                                    </h3>
                                                    <p className="text-white/90 text-sm drop-shadow-md line-clamp-2">
                                                        {program.description}
                                                    </p>
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
                            Ready to Join Our Senior High Programs?
                        </h2>
                        <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
                            Contact our academic department to learn more about
                            admission requirements, application process, and
                            program schedules for Grades 11-12.
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
