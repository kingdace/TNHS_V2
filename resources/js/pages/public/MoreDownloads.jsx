import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Download,
    FileText,
    Image,
    Video,
    Archive,
    Search,
    Filter,
    Calendar,
    User,
    Eye,
} from "lucide-react";

const MoreDownloads = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const downloadCategories = [
        { value: "all", label: "All Files" },
        { value: "academic", label: "Academic" },
        { value: "forms", label: "Forms" },
        { value: "multimedia", label: "Multimedia" },
        { value: "handbooks", label: "Handbooks" },
    ];

    const downloads = [
        {
            id: 1,
            name: "Enrollment Requirements 2024-2025",
            category: "forms",
            type: "PDF",
            size: "2.3 MB",
            date: "2024-01-15",
            downloads: 245,
            description: "Complete list of requirements for enrollment",
            icon: FileText,
        },
        {
            id: 2,
            name: "Academic Calendar 2024-2025",
            category: "academic",
            type: "PDF",
            size: "1.8 MB",
            date: "2024-01-10",
            downloads: 189,
            description: "Official academic calendar with important dates",
            icon: Calendar,
        },
        {
            id: 3,
            name: "Student Handbook",
            category: "handbooks",
            type: "PDF",
            size: "4.7 MB",
            date: "2024-01-05",
            downloads: 156,
            description: "Comprehensive guide for students",
            icon: FileText,
        },
        {
            id: 4,
            name: "Parent Orientation Guide",
            category: "handbooks",
            type: "PDF",
            size: "3.2 MB",
            date: "2024-01-01",
            downloads: 134,
            description: "Information guide for parents",
            icon: User,
        },
        {
            id: 5,
            name: "School Orientation Video",
            category: "multimedia",
            type: "MP4",
            size: "45.2 MB",
            date: "2023-12-28",
            downloads: 98,
            description: "Virtual tour of the school facilities",
            icon: Video,
        },
        {
            id: 6,
            name: "K-12 Curriculum Guide",
            category: "academic",
            type: "PDF",
            size: "2.3 MB",
            date: "2023-12-25",
            downloads: 87,
            description: "Official K-12 curriculum framework",
            icon: FileText,
        },
        {
            id: 7,
            name: "Transfer Credential Form",
            category: "forms",
            type: "PDF",
            size: "189 KB",
            date: "2023-12-20",
            downloads: 76,
            description: "Form for transferring students",
            icon: FileText,
        },
        {
            id: 8,
            name: "School Photos Gallery",
            category: "multimedia",
            type: "ZIP",
            size: "78.5 MB",
            date: "2023-12-15",
            downloads: 65,
            description: "Collection of school photos and events",
            icon: Image,
        },
        {
            id: 9,
            name: "Good Moral Certificate",
            category: "forms",
            type: "PDF",
            size: "156 KB",
            date: "2023-12-10",
            downloads: 54,
            description: "Certificate of good moral character",
            icon: FileText,
        },
        {
            id: 10,
            name: "Learning Modules Package",
            category: "academic",
            type: "ZIP",
            size: "15.2 MB",
            date: "2023-12-05",
            downloads: 43,
            description: "Complete set of learning modules",
            icon: Archive,
        },
    ];

    const filteredDownloads = downloads.filter((download) => {
        const matchesSearch =
            download.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            download.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" ||
            download.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getFileIcon = (type) => {
        switch (type) {
            case "PDF":
                return FileText;
            case "MP4":
                return Video;
            case "ZIP":
                return Archive;
            case "JPG":
            case "PNG":
                return Image;
            default:
                return FileText;
        }
    };

    const getFileColor = (type) => {
        switch (type) {
            case "PDF":
                return "from-red-500 to-red-600";
            case "MP4":
                return "from-blue-500 to-blue-600";
            case "ZIP":
                return "from-green-500 to-green-600";
            case "JPG":
            case "PNG":
                return "from-purple-500 to-purple-600";
            default:
                return "from-gray-500 to-gray-600";
        }
    };

    const handleDownload = (download) => {
        // Simulate download
        alert(`Downloading: ${download.name}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Downloads
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Access and download important documents, forms, and
                        resources
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
                                Search Files
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
                                    placeholder="Search by name or description..."
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
                                    {downloadCategories.map((category) => (
                                        <option
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Downloads Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredDownloads.map((download) => {
                        const IconComponent = getFileIcon(download.type);
                        const colorClass = getFileColor(download.type);

                        return (
                            <div
                                key={download.id}
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex items-start space-x-4 mb-4">
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}
                                    >
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                                            {download.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {download.type} • {download.size}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {download.date} •{" "}
                                            {download.downloads} downloads
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    {download.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <Eye className="w-4 h-4" />
                                        <span>{download.downloads}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDownload(download)}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 flex items-center space-x-2"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Download</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* No Results */}
                {filteredDownloads.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No files found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search terms or filter criteria
                        </p>
                    </div>
                )}

                {/* Download Statistics */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Download Statistics
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Download className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                {downloads.reduce(
                                    (sum, download) => sum + download.downloads,
                                    0
                                )}
                            </h3>
                            <p className="text-gray-600">Total Downloads</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                {downloads.length}
                            </h3>
                            <p className="text-gray-600">Available Files</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Archive className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                {
                                    downloads.filter((d) => d.type === "PDF")
                                        .length
                                }
                            </h3>
                            <p className="text-gray-600">PDF Documents</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Video className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                {
                                    downloads.filter((d) => d.type === "MP4")
                                        .length
                                }
                            </h3>
                            <p className="text-gray-600">Video Files</p>
                        </div>
                    </div>
                </div>

                {/* Download Guidelines */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Download Guidelines
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                File Formats
                            </h3>
                            <p className="text-blue-100">
                                Most files are in PDF format. Videos are in MP4
                                format. Archives are in ZIP format.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Download className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Download Process
                            </h3>
                            <p className="text-blue-100">
                                Click the download button to start downloading.
                                Large files may take longer to download.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Eye className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Usage Rights
                            </h3>
                            <p className="text-blue-100">
                                All downloads are for educational purposes only.
                                Please respect copyright and usage guidelines.
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

export default MoreDownloads;
