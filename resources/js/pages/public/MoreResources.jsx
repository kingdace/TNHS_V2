import React, { useEffect, useState } from "react";
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
    Search,
    Filter,
    GraduationCap,
    Shield,
    Phone,
    Mail,
    MapPin,
    Clock,
    Star,
    Eye,
    Archive,
    Music,
} from "lucide-react";
import { resourcesService } from "../../services/resourcesService";

const MoreResources = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [filteredResources, setFilteredResources] = useState([]);
    const [allResources, setAllResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await resourcesService.getAll();

            if (response.success) {
                const transformedResources = response.data.map((resource) =>
                    resourcesService.transformResource(resource)
                );
                setAllResources(transformedResources);
            } else {
                setError("Failed to load resources");
            }
        } catch (err) {
            console.error("Error fetching resources:", err);
            setError("Failed to load resources");
            // Fallback to empty array
            setAllResources([]);
        } finally {
            setLoading(false);
        }
    };

    // Get icon component from icon name
    const getIconComponent = (iconName) => {
        const icons = {
            FileText,
            BookOpen,
            GraduationCap,
            Shield,
            Award,
            Calendar,
            Video,
            Image,
            Globe,
            Phone,
            MapPin,
            Archive,
            Music,
        };
        return icons[iconName] || FileText;
    };

    const categories = [
        { value: "all", label: "All Resources", count: allResources.length },
        {
            value: "academic",
            label: "Academic",
            count: allResources.filter((r) => r.category === "academic").length,
        },
        {
            value: "forms",
            label: "Forms & Documents",
            count: allResources.filter((r) => r.category === "forms").length,
        },
        {
            value: "multimedia",
            label: "Multimedia",
            count: allResources.filter((r) => r.category === "multimedia")
                .length,
        },
        {
            value: "handbooks",
            label: "Handbooks",
            count: allResources.filter((r) => r.category === "handbooks")
                .length,
        },
        {
            value: "policies",
            label: "Policies",
            count: allResources.filter((r) => r.category === "policies").length,
        },
        {
            value: "links",
            label: "Useful Links",
            count: allResources.filter((r) => r.category === "links").length,
        },
    ];

    // Filter resources based on search term and category
    useEffect(() => {
        let filtered = allResources;

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(
                (resource) => resource.category === selectedCategory
            );
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(
                (resource) =>
                    resource.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    resource.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        setFilteredResources(filtered);
    }, [searchTerm, selectedCategory, allResources]);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "text-red-600 bg-red-50 border-red-200";
            case "medium":
                return "text-yellow-600 bg-yellow-50 border-yellow-200";
            case "low":
                return "text-green-600 bg-green-50 border-green-200";
            default:
                return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    const getPriorityLabel = (priority) => {
        switch (priority) {
            case "high":
                return "High Priority";
            case "medium":
                return "Medium Priority";
            case "low":
                return "Low Priority";
            default:
                return "Standard";
        }
    };

    const handleDownload = async (resource) => {
        try {
            // Optimistically update the download count immediately
            const updatedResources = allResources.map((r) =>
                r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r
            );
            setAllResources(updatedResources);

            const success = await resourcesService.downloadFile(resource);
            if (success) {
                // Refresh the resources to get the actual count from server
                setTimeout(() => {
                    fetchResources();
                }, 1000); // Small delay to ensure backend is updated
            } else {
                // Revert the optimistic update if download failed
                setAllResources(allResources);
            }
        } catch (error) {
            console.error("Download failed:", error);
            // Revert the optimistic update
            setAllResources(allResources);
        }
    };

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
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Simple Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        TNHS Resources
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Educational materials and documents for Taft National
                        High School of Surigao City
                    </p>
                </div>

                {/* Compact Search and Filter */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search resources..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="sm:w-48">
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label} ({category.count})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simple Results Count */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Showing {filteredResources.length} of{" "}
                        {allResources.length} resources
                        {searchTerm && ` for "${searchTerm}"`}
                        {selectedCategory !== "all" &&
                            ` in ${
                                categories.find(
                                    (c) => c.value === selectedCategory
                                )?.label
                            }`}
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading resources...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-red-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            Error Loading Resources
                        </h3>
                        <p className="text-gray-500 mb-4">{error}</p>
                        <button
                            onClick={fetchResources}
                            className="px-4 py-2 bg-royal-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Simple Resources Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {filteredResources.map((resource) => {
                                const IconComponent = getIconComponent(
                                    resource.icon
                                );
                                return (
                                    <div
                                        key={resource.id}
                                        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 p-4"
                                    >
                                        {/* Header with Icon and Priority */}
                                        <div className="flex items-start justify-between mb-3">
                                            <div
                                                className={`p-2 rounded-lg bg-gradient-to-r ${resource.color} text-white`}
                                            >
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <span
                                                className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                                                    resource.priority
                                                )}`}
                                            >
                                                {getPriorityLabel(
                                                    resource.priority
                                                )}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                                            {resource.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                                            {resource.description}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <FileText className="w-3 h-3" />
                                                {resource.type}
                                            </span>
                                            <span>{resource.size}</span>
                                        </div>

                                        {/* Downloads Count */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Download className="w-3 h-3" />
                                                {resource.downloads} downloads
                                            </span>
                                            <span>{resource.date}</span>
                                        </div>

                                        {/* Action Button */}
                                        {resource.type === "Link" ? (
                                            <a
                                                href={resource.url}
                                                target={
                                                    resource.url?.startsWith(
                                                        "http"
                                                    )
                                                        ? "_blank"
                                                        : "_self"
                                                }
                                                rel={
                                                    resource.url?.startsWith(
                                                        "http"
                                                    )
                                                        ? "noopener noreferrer"
                                                        : ""
                                                }
                                                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                Visit
                                            </a>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleDownload(resource)
                                                }
                                                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors"
                                            >
                                                <Download className="w-3 h-3" />
                                                Download
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* No Results */}
                {filteredResources.length === 0 && (
                    <div className="text-center py-12">
                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            No resources found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your search terms or category filter
                        </p>
                    </div>
                )}

                {/* Simple Quick Access */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Quick Access
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickLinks.map((link, index) => {
                            const IconComponent = link.icon;
                            return (
                                <Link
                                    key={index}
                                    to={link.link}
                                    className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
                                >
                                    <IconComponent className="w-6 h-6 text-blue-600 mb-2" />
                                    <span className="text-xs font-medium text-gray-700 text-center">
                                        {link.title}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Simple Navigation */}
                <div className="text-center">
                    <Link
                        to="/more"
                        className="inline-flex items-center px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        ← Back to More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MoreResources;
