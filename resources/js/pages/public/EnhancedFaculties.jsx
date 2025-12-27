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
    Heart,
    BookOpen,
    Award,
    TrendingUp,
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
            href: "/faculty/assistant-principal",
            count: staffStats.by_type?.assistant_principal || 0,
            features: [
                "Student Discipline",
                "Curriculum Development",
                "Teacher Supervision",
            ],
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            id: "teacher",
            name: "Teaching Staff",
            description: "Our dedicated educators organized by grade levels",
            icon: GraduationCap,
            href: "/faculty/teaching-staff",
            count: staffStats.by_type?.teacher || 0,
            features: [
                "Grade 7-12 Teachers",
                "Subject Specializations",
                "Department Heads",
            ],
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            id: "admin",
            name: "Administrative Staff",
            description: "Supporting school operations and student services",
            icon: Briefcase,
            href: "/faculty/administrative-staff",
            count: staffStats.by_type?.admin || 0,
            features: [
                "Registrar",
                "Guidance Counselors",
                "Librarians",
                "School Nurse",
            ],
            color: "from-amber-500 to-orange-600",
            bgColor: "bg-amber-50",
            iconColor: "text-amber-600",
        },
        {
            id: "support",
            name: "Support Staff",
            description: "Essential services and maintenance",
            icon: Wrench,
            href: "/faculty/support-staff",
            count: staffStats.by_type?.support || 0,
            features: [
                "Maintenance",
                "Security",
                "Health Services",
                "Food Services",
            ],
            color: "from-rose-500 to-rose-600",
            bgColor: "bg-rose-50",
            iconColor: "text-rose-600",
        },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section - Copied from About page */}
            <section className="relative bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white py-20 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        {/* School Logo */}
                        <div className="mb-6 flex justify-center">
                            <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                <img
                                    src="/images/Logo.jpg"
                                    alt="TNHS Logo"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                            Our Faculty
                        </h1>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6 rounded-full"></div>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Taft National High School
                        </p>
                        <p className="text-lg text-blue-200 mt-2">
                            Meet our dedicated team of educators and staff
                        </p>
                    </div>
                </div>

                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-12"
                    >
                        <path
                            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                            fill="rgb(249, 250, 251)"
                        />
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 -mt-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                        <div className="flex items-center justify-center mb-6">
                            <Users className="h-8 w-8 text-blue-600 mr-3" />
                            <h2 className="text-3xl font-bold text-gray-900">
                                Faculty at a Glance
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center p-4 bg-blue-50 rounded-xl">
                                <div className="text-4xl font-bold text-blue-600 mb-2">
                                    {totalStaff}
                                </div>
                                <div className="text-sm text-gray-600 font-semibold">
                                    Total Staff
                                </div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-xl">
                                <div className="text-4xl font-bold text-green-600 mb-2">
                                    {staffStats.by_type?.teacher || 0}
                                </div>
                                <div className="text-sm text-gray-600 font-semibold">
                                    Teachers
                                </div>
                            </div>
                            <div className="text-center p-4 bg-amber-50 rounded-xl">
                                <div className="text-4xl font-bold text-amber-600 mb-2">
                                    {departmentHeads}
                                </div>
                                <div className="text-sm text-gray-600 font-semibold">
                                    Dept. Heads
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
                            Our faculty represents the heart of Taft National
                            High School. From experienced department heads to
                            passionate educators, each member of our team brings
                            unique expertise and dedication to student success.
                        </p>
                    </div>
                </div>
            </section>

            {/* Faculty Categories Section */}
            <section className="py-12 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Faculty & Staff Directory
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Click on any section below to explore our dedicated
                            team
                        </p>
                    </div>

                    {/* Cards Grid - Using About page design */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
                        {facultyCategories.map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <Link
                                    key={index}
                                    to={category.href}
                                    className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
                                >
                                    {/* Gradient Background on Hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                                    ></div>

                                    <div className="relative p-6">
                                        {/* Icon and Count */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div
                                                className={`${category.bgColor} w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <Icon
                                                    className={`h-8 w-8 ${category.iconColor}`}
                                                />
                                            </div>
                                            <div
                                                className={`${category.bgColor} px-4 py-2 rounded-lg`}
                                            >
                                                <span
                                                    className={`text-2xl font-bold ${category.iconColor}`}
                                                >
                                                    {category.count}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-royal-blue transition-colors duration-300">
                                            {category.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            {category.description}
                                        </p>

                                        {/* Features */}
                                        <div className="space-y-2 mb-4">
                                            {category.features.map(
                                                (feature, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center text-sm text-gray-600"
                                                    >
                                                        <div
                                                            className={`w-1.5 h-1.5 rounded-full ${category.bgColor} mr-2`}
                                                        ></div>
                                                        {feature}
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        {/* Arrow */}
                                        <div className="flex items-center text-royal-blue font-semibold text-sm">
                                            <span className="mr-2">
                                                View Details
                                            </span>
                                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>

                                    {/* Corner Accent */}
                                    <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA Card - Similar to About page */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
                        <div className="text-center">
                            <Heart className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                Interested in Joining Our Team?
                            </h3>
                            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                                We're always looking for passionate educators
                                and dedicated professionals to join our mission
                                of excellence in education.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Contact Us
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Link>
                                <Link
                                    to="/admissions/requirements"
                                    className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EnhancedFaculties;
