import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Search,
    Filter,
    MoreVertical,
    ArrowUpDown,
    FileText,
    Image,
    Link,
    Star,
    StarOff,
} from "lucide-react";

const PageContent = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPage, setSelectedPage] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [pages, setPages] = useState([]);
    const [sections, setSections] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingContent, setEditingContent] = useState(null);

    // Fetch content data
    useEffect(() => {
        fetchContent();
        fetchPages();
    }, [selectedPage, selectedSection, searchTerm]);

    // Fetch sections when page changes
    useEffect(() => {
        if (selectedPage) {
            fetchSections(selectedPage);
        } else {
            setSections([]);
        }
    }, [selectedPage]);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (selectedPage) params.append("page", selectedPage);
            if (selectedSection) params.append("section", selectedSection);
            if (searchTerm) params.append("search", searchTerm);

            const response = await fetch(`/admin/page-content?${params}`, {
                headers: {
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setContent(data.data);
            }
        } catch (error) {
            console.error("Error fetching content:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPages = async () => {
        try {
            const response = await fetch("/admin/page-content/pages", {
                headers: {
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPages(data.data);
            }
        } catch (error) {
            console.error("Error fetching pages:", error);
        }
    };

    const fetchSections = async (page) => {
        try {
            const response = await fetch(
                `/admin/page-content/pages/${page}/sections`,
                {
                    headers: {
                        "X-CSRF-TOKEN":
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content") || "",
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setSections(data.data);
            }
        } catch (error) {
            console.error("Error fetching sections:", error);
        }
    };

    const toggleActive = async (contentId) => {
        try {
            const response = await fetch(
                `/admin/page-content/${contentId}/toggle-active`,
                {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN":
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content") || "",
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                fetchContent();
            }
        } catch (error) {
            console.error("Error toggling content:", error);
        }
    };

    const deleteContent = async (contentId) => {
        if (window.confirm("Are you sure you want to delete this content?")) {
            try {
                const response = await fetch(
                    `/admin/page-content/${contentId}`,
                    {
                        method: "DELETE",
                        headers: {
                            "X-CSRF-TOKEN":
                                document
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.getAttribute("content") || "",
                        },
                    }
                );

                if (response.ok) {
                    fetchContent();
                }
            } catch (error) {
                console.error("Error deleting content:", error);
            }
        }
    };

    const getContentTypeIcon = (type) => {
        switch (type) {
            case "text_content":
                return <FileText className="h-4 w-4" />;
            case "hero_section":
                return <Image className="h-4 w-4" />;
            case "feature_list":
                return <Star className="h-4 w-4" />;
            case "statistics":
                return <ArrowUpDown className="h-4 w-4" />;
            case "form_list":
                return <Link className="h-4 w-4" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    const getContentTypeColor = (type) => {
        switch (type) {
            case "text_content":
                return "bg-blue-100 text-blue-800";
            case "hero_section":
                return "bg-purple-100 text-purple-800";
            case "feature_list":
                return "bg-green-100 text-green-800";
            case "statistics":
                return "bg-orange-100 text-orange-800";
            case "form_list":
                return "bg-pink-100 text-pink-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl px-6 py-4 text-white shadow-lg flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        Page Content Management
                    </h1>
                    <p className="text-blue-100 text-sm mt-0.5">
                        Manage dynamic content for your website pages
                    </p>
                </div>
                <Button
                    onClick={() => setShowForm(true)}
                    className="bg-royal-blue hover:bg-blue-700 text-white"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Content
                </Button>
            </div>

            {/* Filters */}
            <Card className="border-blue-100">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <CardTitle className="text-lg text-royal-blue">
                        Filters & Search
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Search
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search content..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Page
                            </label>
                            <select
                                value={selectedPage}
                                onChange={(e) =>
                                    setSelectedPage(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                            >
                                <option value="">All Pages</option>
                                {pages.map((page) => (
                                    <option key={page} value={page}>
                                        {page.charAt(0).toUpperCase() +
                                            page.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Section
                            </label>
                            <select
                                value={selectedSection}
                                onChange={(e) =>
                                    setSelectedSection(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                disabled={!selectedPage}
                            >
                                <option value="">All Sections</option>
                                {sections.map((section) => (
                                    <option key={section} value={section}>
                                        {section.charAt(0).toUpperCase() +
                                            section.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end">
                            <Button
                                onClick={fetchContent}
                                variant="outline"
                                className="w-full"
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Content List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue"></div>
                    </div>
                ) : Object.keys(content).length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No content found
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm || selectedPage || selectedSection
                                    ? "Try adjusting your filters or search terms."
                                    : "Get started by adding your first piece of content."}
                            </p>
                            <Button
                                onClick={() => setShowForm(true)}
                                className="bg-royal-blue hover:bg-blue-700 text-white"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Content
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    Object.entries(content).map(([pageName, pageContent]) => (
                        <Card key={pageName} className="border-blue-100">
                            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                                <CardTitle className="text-xl capitalize text-royal-blue">
                                    {pageName} Page
                                </CardTitle>
                                <CardDescription className="text-blue-700">
                                    {pageContent.length} content item
                                    {pageContent.length !== 1 ? "s" : ""}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {pageContent.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div
                                                    className={`p-2 rounded-lg ${getContentTypeColor(
                                                        item.content_type
                                                    )}`}
                                                >
                                                    {getContentTypeIcon(
                                                        item.content_type
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <h4 className="font-medium text-gray-900">
                                                            {item.title ||
                                                                `${item.content_type} Content`}
                                                        </h4>
                                                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                                            {item.section_name}
                                                        </span>
                                                        {item.is_featured && (
                                                            <Star className="h-4 w-4 text-yellow-500" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        {item.description ||
                                                            "No description"}
                                                    </p>
                                                    <div className="flex items-center space-x-4 mt-1">
                                                        <span className="text-xs text-gray-500">
                                                            Order:{" "}
                                                            {item.display_order}
                                                        </span>
                                                        <span
                                                            className={`text-xs px-2 py-1 rounded-full ${
                                                                item.is_active
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-red-100 text-red-800"
                                                            }`}
                                                        >
                                                            {item.is_active
                                                                ? "Active"
                                                                : "Inactive"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        toggleActive(item.id)
                                                    }
                                                    className="text-gray-600 hover:text-gray-900"
                                                >
                                                    {item.is_active ? (
                                                        <Eye className="h-4 w-4" />
                                                    ) : (
                                                        <EyeOff className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        setEditingContent(item)
                                                    }
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        deleteContent(item.id)
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default PageContent;
