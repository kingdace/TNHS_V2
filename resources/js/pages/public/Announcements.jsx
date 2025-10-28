import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Home, Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { announcementService } from "../../services/announcementService";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchParams, setSearchParams] = useSearchParams();
    const announcementsPerPage = 6;

    // Get unique categories from announcements
    const categories = [
        "all",
        ...new Set(announcements.map((ann) => ann.category).filter(Boolean)),
    ];

    // Initialize category from URL parameters
    useEffect(() => {
        const categoryFromUrl = searchParams.get("category");
        const typeFromUrl = searchParams.get("type");

        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        } else if (typeFromUrl) {
            // Map type to category if needed
            const typeToCategoryMap = {
                sports: "Sports",
                student: "Student Government",
                academic: "Academic",
                general: "General",
            };
            setSelectedCategory(typeToCategoryMap[typeFromUrl] || "all");
        }
    }, [searchParams]);

    // Fetch announcements on component mount
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                const data = await announcementService.getPublicAnnouncements();
                const transformedData = data.map((announcement) =>
                    announcementService.transformAnnouncement(announcement)
                );
                setAnnouncements(transformedData);
            } catch (error) {
                console.error("Error fetching announcements:", error);
                setAnnouncements([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
        window.scrollTo(0, 0);
    }, []);

    // Handle category change and update URL
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to first page when changing category

        // Update URL parameters
        const newSearchParams = new URLSearchParams(searchParams);
        if (category === "all") {
            newSearchParams.delete("category");
            newSearchParams.delete("type");
        } else {
            newSearchParams.set("category", category);
        }
        setSearchParams(newSearchParams);
    };

    // Filter announcements by category
    const filteredAnnouncements =
        selectedCategory === "all"
            ? announcements
            : announcements.filter((ann) => ann.category === selectedCategory);

    // Pagination calculations
    const totalPages = Math.ceil(
        filteredAnnouncements.length / announcementsPerPage
    );
    const startIndex = (currentPage - 1) * announcementsPerPage;
    const endIndex = startIndex + announcementsPerPage;
    const currentAnnouncements = filteredAnnouncements.slice(
        startIndex,
        endIndex
    );

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Clean School Announcements Page */}
                <div className="max-w-7xl mx-auto">
                    {/* Compact Header Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-royal-blue mb-2">
                            School Highlights
                        </h1>
                        {selectedCategory !== "all" && (
                            <div className="mt-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    Filtered by: {selectedCategory}
                                    <button
                                        onClick={() =>
                                            handleCategoryChange("all")
                                        }
                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            </div>
                        )}
                        {/* <div className="w-24 h-1 bg-gradient-to-r from-royal-blue to-blue-600 rounded-full mx-auto"></div> */}
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl border border-blue-100 shadow hover:shadow-md transition-all duration-200 overflow-hidden"
                                >
                                    <div className="flex flex-col md:flex-row animate-pulse">
                                        <div className="md:w-2/5 h-56 md:h-52 bg-gray-200" />
                                        <div className="md:w-3/5 p-6 space-y-3">
                                            <div className="h-3 w-32 bg-gray-200 rounded" />
                                            <div className="h-5 w-3/4 bg-gray-200 rounded" />
                                            <div className="h-4 w-full bg-gray-200 rounded" />
                                            <div className="h-4 w-2/3 bg-gray-200 rounded" />
                                            <div className="h-9 w-32 bg-gray-200 rounded ml-auto" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : announcements.length === 0 ? (
                        /* Empty State */
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Bell className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-600 mb-3">
                                No Announcements Yet
                            </h3>
                            <p className="text-gray-500 text-lg max-w-md mx-auto">
                                There are no announcements available at the
                                moment. Please check back later for updates from
                                the school.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Category Filter */}
                            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700">
                                        Filter by category:
                                    </span>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) =>
                                            handleCategoryChange(e.target.value)
                                        }
                                        className="w-[140px] px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue text-sm"
                                    >
                                        {categories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category === "all"
                                                    ? "All Categories"
                                                    : category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-sm text-gray-600">
                                    Showing {filteredAnnouncements.length} of{" "}
                                    {announcements.length} announcements
                                </div>
                            </div>

                            {/* Announcements Grid - Same style as Home page */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                                {currentAnnouncements.map(
                                    (announcement, index) => {
                                        const isFeatured =
                                            announcement.featured;

                                        return (
                                            <div
                                                key={announcement.id}
                                                className="bg-white rounded-xl border border-blue-100 shadow hover:shadow-md transition-all duration-200 overflow-hidden h-full flex flex-col"
                                            >
                                                <div className="flex flex-col md:flex-row flex-grow">
                                                    {/* Image */}
                                                    <div className="relative md:w-2/5 h-48 md:h-full md:min-h-[200px]">
                                                        <img
                                                            src={
                                                                announcement.image
                                                            }
                                                            alt={
                                                                announcement.title
                                                            }
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    {/* Content */}
                                                    <div className="md:w-3/5 p-6 flex flex-col flex-grow">
                                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                                            <div className="inline-flex items-center gap-2">
                                                                <span>📅</span>
                                                                <span>
                                                                    {announcement.published_at
                                                                        ? new Date(
                                                                              announcement.published_at
                                                                          ).toLocaleDateString(
                                                                              "en-US",
                                                                              {
                                                                                  year: "numeric",
                                                                                  month: "short",
                                                                                  day: "numeric",
                                                                                  hour: "2-digit",
                                                                                  minute: "2-digit",
                                                                              }
                                                                          )
                                                                        : announcement.scheduled_publish_at
                                                                        ? `Scheduled: ${new Date(
                                                                              announcement.scheduled_publish_at
                                                                          ).toLocaleDateString(
                                                                              "en-US",
                                                                              {
                                                                                  year: "numeric",
                                                                                  month: "short",
                                                                                  day: "numeric",
                                                                                  hour: "2-digit",
                                                                                  minute: "2-digit",
                                                                              }
                                                                          )}`
                                                                        : "No date"}
                                                                </span>
                                                            </div>
                                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-royal-blue">
                                                                {
                                                                    announcement.category
                                                                }
                                                            </span>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-shrink-0">
                                                            {announcement.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                                                            {
                                                                announcement.excerpt
                                                            }
                                                        </p>
                                                        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
                                                            <span className="inline-flex items-center gap-2">
                                                                <span>👤</span>
                                                                <span className="font-medium">
                                                                    {announcement.author ||
                                                                        "TNHS Administration"}
                                                                </span>
                                                            </span>
                                                            <Link
                                                                to={`/announcements/${announcement.id}`}
                                                            >
                                                                <Button className="bg-royal-blue hover:bg-blue-700 text-white px-3.5 py-2 h-9 rounded-lg">
                                                                    Read More
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center mt-12 space-x-2">
                                    <Button
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                        variant="outline"
                                        className="flex items-center space-x-2 px-4 py-2"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        <span>Previous</span>
                                    </Button>

                                    <div className="flex space-x-1">
                                        {Array.from(
                                            { length: totalPages },
                                            (_, i) => i + 1
                                        ).map((page) => (
                                            <Button
                                                key={page}
                                                onClick={() =>
                                                    handlePageChange(page)
                                                }
                                                className={`px-3 py-2 min-w-[40px] ${
                                                    currentPage === page
                                                        ? "bg-royal-blue text-white"
                                                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                                                }`}
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </div>

                                    <Button
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                        variant="outline"
                                        className="flex items-center space-x-2 px-4 py-2"
                                    >
                                        <span>Next</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Announcements;
