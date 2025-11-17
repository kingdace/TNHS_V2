import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ExternalLink,
    Globe,
    BookOpen,
    GraduationCap,
    Users,
    Award,
    Calendar,
    Mail,
    Phone,
    MapPin,
    Search,
    Filter,
} from "lucide-react";

const MoreLinks = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const linkCategories = [
        { value: "all", label: "All Links" },
        { value: "government", label: "Government" },
        { value: "education", label: "Education" },
        { value: "resources", label: "Resources" },
        { value: "services", label: "Services" },
    ];

    const usefulLinks = [
        {
            id: 1,
            title: "Department of Education (DepEd)",
            url: "https://www.deped.gov.ph",
            description:
                "Official website of the Department of Education Philippines",
            category: "government",
            icon: Globe,
            color: "from-blue-500 to-blue-600",
        },
        {
            id: 2,
            title: "DepEd Learning Resources Portal",
            url: "https://lrmds.deped.gov.ph",
            description: "Access to learning materials and resources",
            category: "education",
            icon: BookOpen,
            color: "from-green-500 to-green-600",
        },
        {
            id: 3,
            title: "K-12 Learning Portal",
            url: "https://www.k12philippines.com",
            description:
                "Comprehensive K-12 education resources and information",
            category: "education",
            icon: GraduationCap,
            color: "from-purple-500 to-purple-600",
        },
        {
            id: 4,
            title: "Philippine Educational Placement Test (PEPT)",
            url: "https://www.deped.gov.ph/pept",
            description:
                "Information about the Philippine Educational Placement Test",
            category: "education",
            icon: Award,
            color: "from-orange-500 to-orange-600",
        },
        {
            id: 5,
            title: "Surigao City Division Office",
            url: "https://www.deped.gov.ph/region13",
            description: "Regional office of DepEd in Surigao City",
            category: "government",
            icon: Users,
            color: "from-red-500 to-red-600",
        },
        {
            id: 6,
            title: "National Achievement Test (NAT)",
            url: "https://www.deped.gov.ph/nat",
            description: "Information about the National Achievement Test",
            category: "education",
            icon: Award,
            color: "from-indigo-500 to-indigo-600",
        },
        {
            id: 7,
            title: "Online Learning Platforms",
            url: "https://www.edukasyon.ph",
            description: "Free online learning resources for Filipino students",
            category: "resources",
            icon: BookOpen,
            color: "from-teal-500 to-teal-600",
        },
        {
            id: 8,
            title: "Scholarship Programs",
            url: "https://www.deped.gov.ph/scholarships",
            description: "Information about available scholarship programs",
            category: "services",
            icon: Award,
            color: "from-pink-500 to-pink-600",
        },
        {
            id: 9,
            title: "Student Financial Assistance",
            url: "https://www.deped.gov.ph/sfa",
            description: "Financial assistance programs for students",
            category: "services",
            icon: Users,
            color: "from-cyan-500 to-cyan-600",
        },
        {
            id: 10,
            title: "School Calendar 2024-2025",
            url: "https://www.deped.gov.ph/calendar",
            description: "Official school calendar and important dates",
            category: "education",
            icon: Calendar,
            color: "from-yellow-500 to-yellow-600",
        },
        {
            id: 11,
            title: "Teacher's Guide Resources",
            url: "https://www.deped.gov.ph/teachers-guide",
            description: "Teaching guides and instructional materials",
            category: "resources",
            icon: BookOpen,
            color: "from-emerald-500 to-emerald-600",
        },
        {
            id: 12,
            title: "Parent-Teacher Association (PTA)",
            url: "https://www.deped.gov.ph/pta",
            description: "Information about PTA programs and activities",
            category: "services",
            icon: Users,
            color: "from-violet-500 to-violet-600",
        },
    ];

    const filteredLinks = usefulLinks.filter((link) => {
        const matchesSearch =
            link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            link.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" || link.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleLinkClick = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const getCategoryStats = () => {
        const stats = {};
        usefulLinks.forEach((link) => {
            stats[link.category] = (stats[link.category] || 0) + 1;
        });
        return stats;
    };

    const categoryStats = getCategoryStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Useful Links
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Access important government websites, educational
                        resources, and online services
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Search */}
                        <div>
                            <label
                                htmlFor="search"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Search Links
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="search"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Search by title or description..."
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Filter by Category
                            </label>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                    id="category"
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                >
                                    {linkCategories.map((category) => (
                                        <option
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label} (
                                            {category.value === "all"
                                                ? usefulLinks.length
                                                : categoryStats[
                                                      category.value
                                                  ] || 0}
                                            )
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredLinks.map((link) => {
                        const IconComponent = link.icon;

                        return (
                            <div
                                key={link.id}
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="flex items-start space-x-4 mb-4">
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-r ${link.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                                            {link.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 capitalize">
                                            {link.category}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                    {link.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <Globe className="w-4 h-4" />
                                        <span className="truncate max-w-32">
                                            {new URL(link.url).hostname}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleLinkClick(link.url)
                                        }
                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 flex items-center space-x-2"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>Visit</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* No Results */}
                {filteredLinks.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No links found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search terms or filter criteria
                        </p>
                    </div>
                )}

                {/* Category Statistics */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Link Categories
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {Object.entries(categoryStats).map(
                            ([category, count]) => (
                                <div key={category} className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Globe className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                        {count}
                                    </h3>
                                    <p className="text-gray-600 capitalize">
                                        {category} Links
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Quick Access */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Quick Access
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <button
                            onClick={() =>
                                handleLinkClick("https://www.deped.gov.ph")
                            }
                            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 text-center">
                                DepEd Official
                            </h3>
                            <p className="text-gray-600 text-sm text-center">
                                Department of Education
                            </p>
                        </button>

                        <button
                            onClick={() =>
                                handleLinkClick("https://lrmds.deped.gov.ph")
                            }
                            className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 text-center">
                                Learning Resources
                            </h3>
                            <p className="text-gray-600 text-sm text-center">
                                Educational Materials
                            </p>
                        </button>

                        <button
                            onClick={() =>
                                handleLinkClick(
                                    "https://www.k12philippines.com"
                                )
                            }
                            className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 text-center">
                                K-12 Portal
                            </h3>
                            <p className="text-gray-600 text-sm text-center">
                                K-12 Information
                            </p>
                        </button>

                        <button
                            onClick={() =>
                                handleLinkClick(
                                    "https://www.deped.gov.ph/scholarships"
                                )
                            }
                            className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 text-center">
                                Scholarships
                            </h3>
                            <p className="text-gray-600 text-sm text-center">
                                Financial Assistance
                            </p>
                        </button>
                    </div>
                </div>

                {/* Important Notice */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Important Notice
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ExternalLink className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                External Links
                            </h3>
                            <p className="text-blue-100">
                                These links will open in a new tab. We are not
                                responsible for external content.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Official Sources
                            </h3>
                            <p className="text-blue-100">
                                All government links are official and verified
                                sources of information.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Educational Use
                            </h3>
                            <p className="text-blue-100">
                                These resources are provided for educational and
                                informational purposes only.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/more"
                        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                        ← Back to More
                    </Link>
                    <Link
                        to="/more/resources"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Resources →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MoreLinks;
