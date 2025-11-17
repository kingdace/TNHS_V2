import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { publicService } from "../../services/publicService";
import {
    ChevronRight,
    Home,
    Users,
    GraduationCap,
    Shield,
    Briefcase,
    Wrench,
    Loader2,
    ArrowRight,
    Star,
} from "lucide-react";

const EnhancedFaculties = () => {
    const [staffStats, setStaffStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFacultyData();
    }, []);

    const fetchFacultyData = async () => {
        try {
            setLoading(true);
            const [stats] = await Promise.all([
                publicService.staffProfiles.getStatistics(),
            ]);

            setStaffStats(stats);
            setError(null);
        } catch (err) {
            console.error("Error fetching faculty data:", err);
            setError("Failed to load faculty information");
        } finally {
            setLoading(false);
        }
    };

    const facultyCategories = [
        {
            id: "assistant_principal",
            name: "Assistant Principals",
            description: "Supporting leadership and student welfare",
            icon: Shield,
            color: "blue",
            href: "/faculty/assistant-principal",
            count: staffStats.by_type?.assistant_principal || 0,
            features: [
                "Student Discipline",
                "Curriculum Development",
                "Teacher Supervision",
            ],
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "from-blue-50 to-indigo-50",
        },
        {
            id: "teacher",
            name: "Teaching Staff",
            description: "Our dedicated educators organized by grade levels",
            icon: GraduationCap,
            color: "green",
            href: "/faculty/teaching-staff",
            count: staffStats.by_type?.teacher || 0,
            features: [
                "Grade 7-12 Teachers",
                "Subject Specializations",
                "Department Heads",
            ],
            gradient: "from-green-500 to-emerald-600",
            bgGradient: "from-green-50 to-emerald-50",
        },
        {
            id: "admin",
            name: "Administrative Staff",
            description: "Supporting school operations and student services",
            icon: Briefcase,
            color: "purple",
            href: "/faculty/administrative-staff",
            count: staffStats.by_type?.admin || 0,
            features: [
                "Registrar",
                "Guidance Counselors",
                "Librarians",
                "School Nurse",
            ],
            gradient: "from-purple-500 to-violet-600",
            bgGradient: "from-purple-50 to-violet-50",
        },
        {
            id: "support",
            name: "Support Staff",
            description: "Essential services and maintenance",
            icon: Wrench,
            color: "orange",
            href: "/faculty/support-staff",
            count: staffStats.by_type?.support || 0,
            features: [
                "Maintenance",
                "Security",
                "Health Services",
                "Food Services",
            ],
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-50 to-red-50",
        },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">
                        Loading faculty information...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                    <button
                        onClick={fetchFacultyData}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const totalStaff = staffStats.total_staff || 0;
    const departmentHeads = staffStats.department_heads || 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-2 py-4 text-sm">
                        <Link
                            to="/"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                            <Home className="h-4 w-4 mr-1" />
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">Faculty</span>
                    </div>
                </div>
            </div>

            {/* Hero Section - Compact */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-white bg-opacity-20 rounded-full p-3">
                                <Users className="h-8 w-8" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Our Faculty</h1>
                        <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-6">
                            Meet our dedicated team of educators and staff who
                            make Taft NHS a place of excellence in education.
                        </p>

                        {/* Stats - Compact */}
                        <div className="flex justify-center gap-8 text-sm">
                            <div className="text-center">
                                <div className="text-2xl font-bold">
                                    {totalStaff}
                                </div>
                                <div className="text-blue-200">Total Staff</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">
                                    {staffStats.by_type?.teacher || 0}
                                </div>
                                <div className="text-blue-200">Teachers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">
                                    {departmentHeads}
                                </div>
                                <div className="text-blue-200">Dept. Heads</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Left Column - Mission Statement */}
                        <div className="relative bg-gradient-to-br from-purple-50 to-indigo-50 p-8 border-r border-gray-200">
                            <div className="absolute top-4 left-4 w-2 h-16 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
                            <div className="pl-6">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                                    DEDICATED TO EDUCATIONAL EXCELLENCE
                                </h2>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Our faculty represents the heart of Taft
                                    National High School. From experienced
                                    department heads to passionate new
                                    educators, each member of our team brings
                                    unique expertise and dedication to student
                                    success.
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Call to Action */}
                        <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 p-8">
                            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-20"></div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                                INTERESTED IN JOINING OUR TEAM?
                            </h3>
                            <p className="text-gray-700 mb-4">
                                We're always looking for passionate educators
                                and dedicated professionals to join our mission
                                of excellence in education.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
                            >
                                Learn More About Opportunities
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Faculty Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Faculty & Staff Directory
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our dedicated team organized by roles and
                        responsibilities
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {facultyCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={category.id}
                                to={category.href}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                            >
                                {/* Header with gradient */}
                                <div
                                    className={`bg-gradient-to-r ${category.gradient} p-6 text-white relative overflow-hidden`}
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <Icon className="h-8 w-8" />
                                            <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                                                <span className="text-sm font-bold">
                                                    {category.count}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm opacity-90">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="space-y-2 mb-4">
                                        {category.features.map(
                                            (feature, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center text-sm text-gray-600"
                                                >
                                                    <Star className="h-3 w-3 text-gray-400 mr-2 flex-shrink-0" />
                                                    {feature}
                                                </div>
                                            )
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500">
                                            View Details
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Quick Stats Section */}
            <div className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Faculty at a Glance
                        </h2>
                        <p className="text-gray-600">
                            Our diverse team of educational professionals
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                <GraduationCap className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                                {staffStats.by_type?.teacher || 0}
                            </div>
                            <div className="text-sm text-gray-600">
                                Teachers
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                <Shield className="h-8 w-8 text-purple-600" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                                {staffStats.by_type?.assistant_principal || 0}
                            </div>
                            <div className="text-sm text-gray-600">
                                Assistant Principals
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                <Briefcase className="h-8 w-8 text-orange-600" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                                {staffStats.by_type?.admin || 0}
                            </div>
                            <div className="text-sm text-gray-600">
                                Administrative
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                <Wrench className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                                {staffStats.by_type?.support || 0}
                            </div>
                            <div className="text-sm text-gray-600">
                                Support Staff
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnhancedFaculties;
