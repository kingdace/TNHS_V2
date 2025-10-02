import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Users,
    Award,
    GraduationCap,
    CheckCircle,
    ArrowRight,
    Calculator,
    Microscope,
    Globe,
    MapPin,
    Palette,
    Wrench,
    Heart,
    Sparkles,
    Zap,
    Star,
    Rocket,
    Target,
    Lightbulb,
    Shield,
    Crown,
    Flame,
    Brain,
    Gamepad2,
    Music,
    Camera,
    Code,
    Paintbrush,
    Beaker,
    Atom,
    Globe2,
    BookMarked,
    GraduationCap as Cap,
    Trophy,
    Gem,
    Calendar,
} from "lucide-react";

const AcademicsJuniorHigh = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Junior High School as ONE Curriculum
    const juniorHighInfo = {
        name: "Junior High School",
        grades: "Grades 7-10",
        duration: "4 Years",
        description: "Complete K-12 Foundation Program",
    };

    // Modern Core subjects with trendy descriptions
    const coreSubjects = [
        {
            name: "Mathematics",
            icon: Calculator,
            hours: 4,
            description: "Crunch numbers like a pro! Algebra, Geometry & Stats",
            emoji: "📊",
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
        },
        {
            name: "Science",
            icon: Microscope,
            hours: 4,
            description: "Explore the universe! Earth, Bio, Chem & Physics",
            emoji: "🔬",
            color: "from-green-500 to-teal-500",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
        },
        {
            name: "English",
            icon: Globe,
            hours: 4,
            description: "Master the language! Literature & Communication",
            emoji: "📚",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
        },
        {
            name: "Filipino",
            icon: BookOpen,
            hours: 4,
            description: "Proudly Filipino! Wika, Panitikan & Komunikasyon",
            emoji: "🇵🇭",
            color: "from-red-500 to-orange-500",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
        },
        {
            name: "Araling Panlipunan",
            icon: MapPin,
            hours: 3,
            description: "Know your world! History, Geography & Economics",
            emoji: "🌍",
            color: "from-indigo-500 to-purple-500",
            bgColor: "bg-indigo-50",
            borderColor: "border-indigo-200",
        },
        {
            name: "MAPEH",
            icon: Palette,
            hours: 4,
            description: "Express yourself! Music, Arts, PE & Health",
            emoji: "🎨",
            color: "from-pink-500 to-rose-500",
            bgColor: "bg-pink-50",
            borderColor: "border-pink-200",
        },
        {
            name: "TLE",
            icon: Wrench,
            hours: 4,
            description: "Build the future! Tech & Livelihood Skills",
            emoji: "⚙️",
            color: "from-yellow-500 to-orange-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
        },
        {
            name: "Values Education",
            icon: Heart,
            hours: 2,
            description: "Be the best you! Character & Values Formation",
            emoji: "💝",
            color: "from-emerald-500 to-green-500",
            bgColor: "bg-emerald-50",
            borderColor: "border-emerald-200",
        },
    ];

    // Modern features with trendy descriptions
    const features = [
        {
            icon: Rocket,
            title: "Future-Ready Learning",
            description:
                "Cutting-edge curriculum that prepares you for tomorrow's challenges",
            emoji: "🚀",
            color: "from-blue-500 to-purple-500",
        },
        {
            icon: Brain,
            title: "Smart Teaching",
            description: "Expert educators who make learning fun and engaging",
            emoji: "🧠",
            color: "from-green-500 to-teal-500",
        },
        {
            icon: Trophy,
            title: "Excellence Focus",
            description: "Achieve your best with our proven academic programs",
            emoji: "🏆",
            color: "from-yellow-500 to-orange-500",
        },
        {
            icon: Heart,
            title: "Character Building",
            description: "Develop values and skills that last a lifetime",
            emoji: "💖",
            color: "from-pink-500 to-rose-500",
        },
    ];

    return (
        <div className="min-h-screen bg-white relative">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 right-10 w-16 h-16 bg-blue-100 rounded-full opacity-30"></div>
            <div className="absolute top-40 left-10 w-12 h-12 bg-green-100 rounded-full opacity-40"></div>
            <div className="absolute bottom-40 right-20 w-20 h-20 bg-blue-50 rounded-full opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* School Badge */}
                <div className="text-center mb-8 pt-8">
                    <div className="inline-flex items-center gap-3 bg-blue-50 rounded-full px-6 py-3 mb-8 border border-blue-200 shadow-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-blue-800 font-semibold text-lg">
                            Taft National High School
                        </span>
                        <Sparkles className="w-5 h-5 text-blue-500" />
                    </div>
                </div>

                {/* Main Title Section */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent leading-tight">
                        Your Learning Journey
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover the amazing subjects that will shape your
                        future!
                        <span className="text-blue-600 font-semibold">
                            {" "}
                            Each one is designed to unlock your potential.
                        </span>
                    </p>
                </div>

                {/* Modern Core Subjects Section */}
                <div className="mb-16">
                    {/* Modern Subject Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {coreSubjects.map((subject, index) => {
                            const IconComponent = subject.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    {/* Subject Icon */}
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-r ${subject.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Subject Name */}
                                    <h4 className="text-sm font-bold text-gray-800 mb-2 text-center group-hover:text-blue-600 transition-colors">
                                        {subject.name}
                                    </h4>

                                    {/* Emoji */}
                                    <div className="text-2xl mb-2 text-center">
                                        {subject.emoji}
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-xs mb-3 text-center leading-relaxed group-hover:text-gray-800 transition-colors">
                                        {subject.description}
                                    </p>

                                    {/* Hours Badge */}
                                    <div className="flex items-center justify-center">
                                        <div
                                            className={`${subject.bgColor} ${subject.borderColor} border rounded-full px-2 py-1`}
                                        >
                                            <span className="text-xs font-semibold text-gray-700">
                                                {subject.hours}h/wk
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Visual Separator */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex items-center gap-4 w-full max-w-md">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
                    </div>
                </div>

                {/* Modern Features Section */}
                <div className="mb-12">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-4">
                            <Star className="w-4 h-4 text-green-600" />
                            <span className="text-green-800 font-semibold text-sm">
                                Why Choose Us
                            </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                            The Future Starts Here
                        </h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Experience education like never before with our
                            innovative approach
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white rounded-lg p-4 border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
                                >
                                    {/* Feature Icon */}
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Emoji */}
                                    <div className="text-2xl mb-2">
                                        {feature.emoji}
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-sm font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                                        {feature.title}
                                    </h4>

                                    {/* Description */}
                                    <p className="text-gray-600 text-xs leading-relaxed group-hover:text-gray-800 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Visual Separator */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex items-center gap-4 w-full max-w-md">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                    </div>
                </div>

                {/* Modern Call to Action */}
                <div className="text-center mb-12">
                    <div className="relative bg-blue-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
                        <div className="text-4xl mb-4">🚀</div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of students who are already building
                            their future with us.
                            <span className="text-blue-600 font-semibold">
                                {" "}
                                Your adventure starts here!
                            </span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/admissions/requirements"
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold text-base rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-md"
                            >
                                <GraduationCap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Enroll Now
                                <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                            </Link>

                            <Link
                                to="/academics/senior-high"
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold text-base rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-md"
                            >
                                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                Explore Senior High
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Modern Back to Home */}
                <div className="text-center">
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105"
                    >
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        </div>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AcademicsJuniorHigh;
