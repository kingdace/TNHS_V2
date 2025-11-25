import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Breadcrumb from "../../components/ui/Breadcrumb";
import {
    ArrowLeft,
    Star,
    Users,
    Award,
    BookOpen,
    Laptop,
    Wrench,
    Brain,
    Globe,
    Target,
    Lightbulb,
    Trophy,
    Heart,
    Shield,
    Clock,
    CheckCircle,
    ArrowRight,
    GraduationCap,
    Briefcase,
    MapPin,
    Phone,
    Mail,
} from "lucide-react";

const AcademicsSpecialProgramDetail = () => {
    const { programId } = useParams();
    const [program, setProgram] = useState(null);

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
        {
            id: "stem",
            name: "Science, Technology, Engineering & Mathematics (STEM)",
            icon: Brain,
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            description:
                "Advanced program focusing on science, technology, engineering, and mathematics",
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

    useEffect(() => {
        const foundProgram = specialPrograms.find((p) => p.id === programId);
        setProgram(foundProgram);
    }, [programId]);

    if (!program) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-24 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Program Not Found
                    </h1>
                    <p className="text-gray-600 mb-8">
                        The requested program could not be found.
                    </p>
                    <Link
                        to="/academics/special-programs"
                        className="inline-flex items-center px-6 py-3 bg-royal-blue text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to ALS Programs
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = program.icon;

    const breadcrumbItems = [
        { label: "Academics", href: "/academics" },
        { label: "Special Programs", href: "/academics/special-programs" },
        { label: program.name },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
                {/* Hero Section */}
                <div
                    className={`${program.bgColor} rounded-3xl shadow-2xl border ${program.borderColor} overflow-hidden mb-12`}
                >
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Left Side - Content */}
                        <div className="p-12 flex flex-col justify-center">
                            <div className="flex items-center mb-6">
                                <div
                                    className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-full flex items-center justify-center shadow-lg mr-4`}
                                >
                                    <Icon className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                        {program.name}
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        {program.description}
                                    </p>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                    <div className="flex items-center mb-2">
                                        <Clock className="h-5 w-5 text-royal-blue mr-2" />
                                        <span className="text-sm font-semibold text-gray-500 uppercase">
                                            Duration
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-gray-900">
                                        {program.details.duration}
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                    <div className="flex items-center mb-2">
                                        <Target className="h-5 w-5 text-royal-blue mr-2" />
                                        <span className="text-sm font-semibold text-gray-500 uppercase">
                                            Target
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-gray-900">
                                        {program.details.target}
                                    </p>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    asChild
                                    className={`bg-gradient-to-r ${program.color} hover:opacity-90 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 transform shadow-lg`}
                                >
                                    <Link to="/contact">Apply Now</Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white font-bold px-8 py-3 rounded-xl transition-all duration-300"
                                >
                                    <Link to="/admissions">
                                        Admission Requirements
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className="h-96 lg:h-auto relative">
                            <img
                                src={
                                    program.id === "stem"
                                        ? "/images/STEM.jpg"
                                        : `/images/BG${
                                              (specialPrograms.indexOf(
                                                  program
                                              ) %
                                                  3) +
                                              1
                                          }.jpg`
                                }
                                alt={program.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20"></div>
                        </div>
                    </div>
                </div>

                {/* Detailed Information */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Features */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <Award className="h-6 w-6 text-royal-blue mr-3" />
                            Key Features
                        </h2>
                        <ul className="space-y-4">
                            {program.details.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 leading-relaxed">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Benefits */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <Heart className="h-6 w-6 text-royal-blue mr-3" />
                            Benefits
                        </h2>
                        <ul className="space-y-4">
                            {program.details.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                    <Star className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 leading-relaxed">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Career Opportunities */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Briefcase className="h-6 w-6 text-royal-blue mr-3" />
                        Career Opportunities
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                            <GraduationCap className="h-12 w-12 text-royal-blue mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Higher Education
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Continue to college and university programs
                            </p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                            <Briefcase className="h-12 w-12 text-green-600 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Employment
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Enter the workforce with specialized skills
                            </p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                            <Trophy className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Entrepreneurship
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Start your own business or venture
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-br from-royal-blue to-blue-600 rounded-2xl shadow-xl p-8 text-white">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <Phone className="h-6 w-6 mr-3" />
                        Get More Information
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-3" />
                            <div>
                                <p className="font-semibold">Visit Us</p>
                                <p className="text-blue-100">
                                    Taft National High School
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-3" />
                            <div>
                                <p className="font-semibold">Call Us</p>
                                <p className="text-blue-100">(055) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-3" />
                            <div>
                                <p className="font-semibold">Email Us</p>
                                <p className="text-blue-100">
                                    info@tnhs.edu.ph
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicsSpecialProgramDetail;
