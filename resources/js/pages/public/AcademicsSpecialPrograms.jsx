import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
    ArrowLeft,
    ArrowRight,
    Star,
    Users,
    Award,
    ChevronDown,
    ChevronUp,
    BookOpen,
    Laptop,
    Wrench,
    Palette,
    Brain,
    Globe,
    Target,
    GraduationCap,
    Briefcase,
    Lightbulb,
    Trophy,
    Heart,
    Shield,
    Zap,
    Clock,
    X,
    Eye,
} from "lucide-react";

const AcademicsSpecialPrograms = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const specialPrograms = [
        {
            id: "als",
            name: "Alternative Learning System (ALS)",
            icon: BookOpen,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            description:
                "Flexible learning program for out-of-school youth and adults",
            promotionalImage: "/images/als-promo.jpg",
            details: {
                duration: "Self-paced",
                target: "Out-of-school youth and adults",
                features: [
                    "Flexible learning schedule",
                    "Competency-based curriculum",
                    "Accreditation and Equivalency (A&E) Test",
                    "Life skills integration",
                    "Community-based learning",
                ],
                benefits: [
                    "Second chance education",
                    "Flexible time management",
                    "Practical life skills",
                    "Government recognition",
                ],
            },
        },
    ];

    const toggleDropdown = (programId) => {
        setOpenDropdown(openDropdown === programId ? null : programId);
    };

    const openImageModal = (program) => {
        setSelectedImage(program);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation */}
                <div className="flex items-center mb-8">
                    <Link
                        to="/academics"
                        className="flex items-center text-royal-blue hover:text-blue-700 transition-colors mr-4 group"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Academics
                    </Link>
                </div>

                {/* Enhanced Header */}
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <div className="w-20 h-20 bg-gradient-to-br from-royal-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                            <Star className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-white text-xs font-bold">
                                1
                            </span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-royal-blue to-blue-600 bg-clip-text text-transparent mb-3">
                        ⭐ ALS Programs
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
                        Alternative learning opportunities designed to provide
                        flexible education for out-of-school youth and adults
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-royal-blue to-blue-600 rounded-full mx-auto"></div>
                </div>

                {/* Single Program Layout */}
                <div className="flex justify-center mb-8">
                    <div className="max-w-4xl w-full">
                        {specialPrograms.map((program) => {
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
                                                        <Clock className="h-3 w-3 text-royal-blue" />
                                                        <span className="font-medium">
                                                            {
                                                                program.details
                                                                    .duration
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-start space-x-1 text-xs text-gray-600">
                                                        <Target className="h-3 w-3 text-royal-blue mt-0.5" />
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
                                                    <div className="flex items-center justify-center space-x-1 text-royal-blue group-hover:text-blue-700 transition-colors duration-200">
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
                            Ready to Join Our Alternative Learning System?
                        </h2>
                        <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
                            Contact our academic department to learn more about
                            the ALS program, enrollment process, and flexible
                            learning schedules.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                asChild
                                className="bg-gradient-to-r from-royal-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 transform shadow-lg text-sm"
                            >
                                <Link to="/contact">
                                    Contact Us for More Info
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white font-bold px-6 py-2 rounded-xl transition-all duration-300 text-sm"
                            >
                                <Link to="/admissions">
                                    View Admission Requirements
                                </Link>
                            </Button>
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
                                        <Clock className="h-4 w-4 text-royal-blue mr-2" />
                                        Duration
                                    </h3>
                                    <p className="text-gray-700">
                                        {selectedImage.details.duration}
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                                        <Target className="h-4 w-4 text-royal-blue mr-2" />
                                        Target Audience
                                    </h3>
                                    <p className="text-gray-700">
                                        {selectedImage.details.target}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    asChild
                                    className={`bg-gradient-to-r ${selectedImage.color} hover:opacity-90 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 transform shadow-lg`}
                                >
                                    <Link
                                        to={`/academics/special-programs/${selectedImage.id}`}
                                    >
                                        Learn More About This Program
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white font-bold px-8 py-3 rounded-xl transition-all duration-300"
                                >
                                    <Link to="/contact">Contact Us</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcademicsSpecialPrograms;
