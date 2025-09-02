import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Download,
    ExternalLink,
    FileText,
    Video,
    Image,
    Globe,
    Users,
    Calendar,
    Award,
} from "lucide-react";

const MoreResources = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const resourceCategories = [
        {
            icon: BookOpen,
            title: "Academic Resources",
            description:
                "Study materials, curriculum guides, and educational resources",
            color: "from-blue-500 to-blue-600",
            resources: [
                { name: "K-12 Curriculum Guide", type: "PDF", size: "2.3 MB" },
                { name: "Subject Syllabi", type: "PDF", size: "1.8 MB" },
                { name: "Learning Modules", type: "ZIP", size: "15.2 MB" },
                { name: "Assessment Tools", type: "PDF", size: "3.1 MB" },
            ],
        },
        {
            icon: FileText,
            title: "Forms & Documents",
            description:
                "Official forms, certificates, and administrative documents",
            color: "from-green-500 to-green-600",
            resources: [
                { name: "Enrollment Form", type: "PDF", size: "245 KB" },
                { name: "Transfer Credential", type: "PDF", size: "189 KB" },
                { name: "Good Moral Certificate", type: "PDF", size: "156 KB" },
                { name: "Parent Consent Form", type: "PDF", size: "198 KB" },
            ],
        },
        {
            icon: Video,
            title: "Multimedia Resources",
            description:
                "Videos, presentations, and interactive learning materials",
            color: "from-purple-500 to-purple-600",
            resources: [
                {
                    name: "School Orientation Video",
                    type: "MP4",
                    size: "45.2 MB",
                },
                { name: "Virtual Tour", type: "MP4", size: "78.5 MB" },
                {
                    name: "Academic Presentations",
                    type: "PPTX",
                    size: "12.3 MB",
                },
                { name: "Student Handbook", type: "PDF", size: "4.7 MB" },
            ],
        },
        {
            icon: Globe,
            title: "External Links",
            description:
                "Useful websites and online resources for students and parents",
            color: "from-orange-500 to-orange-600",
            resources: [
                {
                    name: "DepEd Official Website",
                    type: "Link",
                    size: "External",
                },
                {
                    name: "K-12 Learning Portal",
                    type: "Link",
                    size: "External",
                },
                {
                    name: "Online Learning Platforms",
                    type: "Link",
                    size: "External",
                },
                {
                    name: "Educational Resources",
                    type: "Link",
                    size: "External",
                },
            ],
        },
    ];

    const quickLinks = [
        {
            icon: Calendar,
            title: "Academic Calendar",
            description: "View important dates and school events",
            link: "/calendar",
        },
        {
            icon: Users,
            title: "Student Portal",
            description: "Access student information and services",
            link: "/student-portal",
        },
        {
            icon: Award,
            title: "Achievements",
            description: "View school achievements and recognitions",
            link: "/achievements",
        },
        {
            icon: BookOpen,
            title: "Library",
            description: "Access digital library resources",
            link: "/library",
        },
    ];

    const recentDownloads = [
        {
            name: "Enrollment Requirements 2024",
            date: "2024-01-15",
            downloads: 245,
        },
        {
            name: "Academic Calendar 2024-2025",
            date: "2024-01-10",
            downloads: 189,
        },
        { name: "Student Handbook", date: "2024-01-05", downloads: 156 },
        {
            name: "Parent Orientation Guide",
            date: "2024-01-01",
            downloads: 134,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Resources
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Access educational materials, forms, documents, and
                        useful links for students and parents
                    </p>
                </div>

                {/* Resource Categories */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {resourceCategories.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="flex items-center space-x-4 mb-6">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center`}
                                    >
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {category.title}
                                        </h2>
                                        <p className="text-gray-600">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {category.resources.map(
                                        (resource, resIndex) => (
                                            <div
                                                key={resIndex}
                                                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                                        {resource.type ===
                                                        "Link" ? (
                                                            <ExternalLink className="w-4 h-4 text-white" />
                                                        ) : (
                                                            <Download className="w-4 h-4 text-white" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">
                                                            {resource.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            {resource.type} •{" "}
                                                            {resource.size}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300">
                                                    {resource.type === "Link"
                                                        ? "Visit"
                                                        : "Download"}
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Quick Access Links
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickLinks.map((link, index) => {
                            const IconComponent = link.icon;
                            return (
                                <Link
                                    key={index}
                                    to={link.link}
                                    className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2 text-center">
                                        {link.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm text-center">
                                        {link.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Downloads */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Popular Downloads
                    </h2>
                    <div className="space-y-4">
                        {recentDownloads.map((download, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                        <Download className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {download.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Updated: {download.date} •{" "}
                                            {download.downloads} downloads
                                        </p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300">
                                    Download
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resource Guidelines */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Resource Guidelines
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Usage Rights
                            </h3>
                            <p className="text-blue-100">
                                All resources are for educational purposes only.
                                Please respect copyright and usage guidelines.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Download className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Download Policy
                            </h3>
                            <p className="text-blue-100">
                                Downloads are free for students and parents.
                                Some resources may require login credentials.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                External Links
                            </h3>
                            <p className="text-blue-100">
                                External links are provided for convenience. We
                                are not responsible for external content.
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
                        to="/more/downloads"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Downloads →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MoreResources;
