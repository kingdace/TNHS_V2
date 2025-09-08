import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    User,
    GraduationCap,
    Award,
    Mail,
    Phone,
    MapPin,
    BookOpen,
    Users,
    Calendar,
    Star,
    Target,
    Lightbulb,
    Trophy,
    Clock,
    Building,
    Globe,
    Heart,
    Shield,
    ArrowRight,
    CheckCircle,
    ChevronRight,
    Home,
    MessageSquare,
    FileText,
    Image,
    ExternalLink,
} from "lucide-react";

const AssistantPrincipal = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Assistant Principals
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Dedicated leaders supporting academic excellence and
                        student success
                    </p>
                </div>

                {/* Two-Column Layout for Assistant Principals */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Junior High School Assistant Principal */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="relative">
                            {/* Photo Section */}
                            <div className="relative h-80 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <img
                                    src="/images/ASSISTANT1.jpg"
                                    alt="Mrs. Mary Ann E. Gubaton"
                                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-2xl"
                                />
                                {/* Position Badge */}
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                                    <span className="text-sm font-semibold text-gray-800">
                                        Junior High School
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Mrs. Mary Ann E. Gubaton
                                </h2>
                                <p className="text-lg text-royal-blue font-semibold mb-4">
                                    Assistant Principal - Junior High School
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <GraduationCap className="h-5 w-5 text-royal-blue mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                Education
                                            </h4>
                                            <p className="text-gray-600">
                                                Master of Arts in Education
                                                Management
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <Award className="h-5 w-5 text-royal-blue mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                Experience
                                            </h4>
                                            <p className="text-gray-600">
                                                15+ years in educational
                                                leadership
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">
                                            Leadership Style
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            As the Assistant School Principal of
                                            Taft National High School, Mrs. Mary
                                            Ann E. Gubaton is known not only for
                                            her firm leadership but also for her
                                            motherly presence that brings
                                            comfort and calm to both students
                                            and teachers alike. Her nurturing
                                            approach to administration fosters a
                                            culture of support, discipline, and
                                            mutual respect within the school.
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            <Mail className="h-4 w-4" />
                                            <span>m.gubaton@tnhs.edu.ph</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Phone className="h-4 w-4" />
                                            <span>+63 912 345 6789</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Senior High School Assistant Principal */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="relative">
                            {/* Photo Section */}
                            <div className="relative h-80 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                                <img
                                    src="/images/ASSISTANT2.jpg"
                                    alt="Senior High School Assistant Principal"
                                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-2xl"
                                />
                                {/* Position Badge */}
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                                    <span className="text-sm font-semibold text-gray-800">
                                        Senior High School
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Dr. Maria Santos
                                </h2>
                                <p className="text-lg text-royal-blue font-semibold mb-4">
                                    Assistant Principal - Senior High School
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <GraduationCap className="h-5 w-5 text-royal-blue mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                Education
                                            </h4>
                                            <p className="text-gray-600">
                                                Doctor of Philosophy in
                                                Educational Leadership
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <Award className="h-5 w-5 text-royal-blue mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                Experience
                                            </h4>
                                            <p className="text-gray-600">
                                                18+ years in educational
                                                administration
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">
                                            Leadership Philosophy
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Dr. Santos brings innovative
                                            leadership and strategic vision to
                                            our Senior High School program. She
                                            is committed to preparing students
                                            for college and career readiness
                                            through comprehensive academic and
                                            extracurricular programs.
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            <Mail className="h-4 w-4" />
                                            <span>m.santos@tnhs.edu.ph</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Phone className="h-4 w-4" />
                                            <span>+63 912 345 6790</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/faculty"
                        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                        ← Back to Faculty Overview
                    </Link>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AssistantPrincipal;
