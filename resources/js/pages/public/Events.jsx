import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
    Calendar,
    Clock,
    MapPin,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { publicService } from "../../services/publicService";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedType, setSelectedType] = useState("all");
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagination, setPagination] = useState({ total: 0, pages: 0 });
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const eventsPerPage = 12;

    // Get unique event types from events
    const eventTypes = [
        "all",
        ...new Set(events.map((event) => event.event_type).filter(Boolean)),
    ];

    // Initialize event type from URL parameters
    useEffect(() => {
        const typeFromUrl = searchParams.get("type");

        if (typeFromUrl) {
            setSelectedType(typeFromUrl);
        }
    }, [searchParams]);

    // Handle event type change and update URL
    const handleTypeChange = (type) => {
        setSelectedType(type);
        setCurrentPage(1); // Reset to first page when changing type

        // Update URL parameters
        const newSearchParams = new URLSearchParams(searchParams);
        if (type === "all") {
            newSearchParams.delete("type");
        } else {
            newSearchParams.set("type", type);
        }
        setSearchParams(newSearchParams);
    };

    // Fetch events on component mount and when filters change
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const type = selectedType === "all" ? null : selectedType;
                const result = await publicService.events.getPublicList({
                    type,
                    limit: eventsPerPage,
                    page: currentPage,
                });
                setEvents(result.data || []);
                setPagination(result.pagination || { total: 0, pages: 0 });
            } catch (error) {
                console.error("Error fetching events:", error);
                setEvents([]);
                setPagination({ total: 0, pages: 0 });
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
        window.scrollTo(0, 0);
    }, [selectedType, currentPage]);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    // Handle view details
    const handleViewDetails = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    // Format event date for display
    const formatEventDate = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : null;

        if (!end || start.toDateString() === end.toDateString()) {
            // Single day event
            return start.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } else {
            // Multi-day event
            return `${start.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            })} - ${end.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })}`;
        }
    };

    // Format event time for display
    const formatEventTime = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : null;

        const startTime = start.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

        if (!end || start.toDateString() === end.toDateString()) {
            // Single day event - show start time only, or start-end if different times
            const endTime = end
                ? end.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                  })
                : null;

            if (endTime && startTime !== endTime) {
                return `${startTime} - ${endTime}`;
            } else {
                return startTime;
            }
        } else {
            // Multi-day event - show start time only
            return startTime;
        }
    };

    // Get event type color
    const getEventTypeColor = (type) => {
        const colors = {
            academic: "bg-blue-100 text-blue-800",
            exam: "bg-red-100 text-red-800",
            sports: "bg-green-100 text-green-800",
            cultural: "bg-purple-100 text-purple-800",
            meeting: "bg-amber-100 text-amber-800",
        };
        return colors[type] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-royal-blue mb-2">
                            School Events
                        </h1>
                        {selectedType !== "all" && (
                            <div className="mt-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    Filtered by:{" "}
                                    {selectedType.charAt(0).toUpperCase() +
                                        selectedType.slice(1)}
                                    <button
                                        onClick={() => handleTypeChange("all")}
                                        className="ml-2 text-green-600 hover:text-green-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl border border-blue-100 shadow hover:shadow-md transition-all duration-200 overflow-hidden animate-pulse"
                                >
                                    <div className="h-48 bg-gray-200" />
                                    <div className="p-6 space-y-3">
                                        <div className="h-4 w-20 bg-gray-200 rounded" />
                                        <div className="h-6 w-3/4 bg-gray-200 rounded" />
                                        <div className="h-4 w-full bg-gray-200 rounded" />
                                        <div className="h-4 w-2/3 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : events.length === 0 ? (
                        /* Empty State */
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Calendar className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-600 mb-3">
                                No Events Found
                            </h3>
                            <p className="text-gray-500 text-lg max-w-md mx-auto">
                                There are no upcoming events at the moment.
                                Please check back later for updates.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Type Filter */}
                            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700">
                                        Filter by type:
                                    </span>
                                    <select
                                        value={selectedType}
                                        onChange={(e) =>
                                            handleTypeChange(e.target.value)
                                        }
                                        className="w-[140px] px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue text-sm"
                                    >
                                        {eventTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type === "all"
                                                    ? "All Types"
                                                    : type
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      type.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-sm text-gray-600">
                                    Showing {events.length} of{" "}
                                    {pagination.total} events
                                </div>
                            </div>

                            {/* Events Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                                {events.map((event) => {
                                    const isUpcoming =
                                        new Date(event.start_date) > new Date();
                                    const isFeatured = event.is_featured;
                                    const daysUntil = Math.ceil(
                                        (new Date(event.start_date) -
                                            new Date()) /
                                            (1000 * 60 * 60 * 24)
                                    );

                                    return (
                                        <div
                                            key={event.id}
                                            className="bg-white rounded-2xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col group"
                                        >
                                            {/* Event Image */}
                                            <div className="relative h-56 overflow-hidden">
                                                {event.image_path ? (
                                                    <img
                                                        src={
                                                            event.image_path.startsWith(
                                                                "http"
                                                            )
                                                                ? event.image_path
                                                                : `/storage/${event.image_path.replace(
                                                                      /^\/?storage\//,
                                                                      ""
                                                                  )}`
                                                        }
                                                        alt={event.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                                                        <img
                                                            src="/images/announcement.png"
                                                            alt="School Event"
                                                            className="max-w-full max-h-full object-contain opacity-80"
                                                            onError={(e) => {
                                                                // Fallback to SVG if image fails to load
                                                                e.currentTarget.style.display =
                                                                    "none";
                                                                e.currentTarget.nextElementSibling.style.display =
                                                                    "block";
                                                            }}
                                                        />
                                                        <div className="text-center hidden">
                                                            <svg
                                                                className="h-16 w-16 text-blue-500 mx-auto mb-2"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                            <div className="text-xs text-blue-600 font-medium">
                                                                School Event
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Overlay gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                {/* Featured Badge */}
                                                {isFeatured && (
                                                    <div className="absolute top-4 left-4 bg-gradient-to-r from-royal-blue to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                                        ⭐ Featured
                                                    </div>
                                                )}

                                                {/* Event Type Badge */}
                                                <div className="absolute top-4 right-4">
                                                    <div
                                                        className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${getEventTypeColor(
                                                            event.event_type
                                                        )}`}
                                                    >
                                                        {event.event_type
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            event.event_type.slice(
                                                                1
                                                            )}
                                                    </div>
                                                </div>

                                                {/* Days Until Badge */}
                                                {isUpcoming &&
                                                    daysUntil <= 30 && (
                                                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                                            {daysUntil === 0
                                                                ? "Today"
                                                                : daysUntil ===
                                                                  1
                                                                ? "Tomorrow"
                                                                : `${daysUntil} days`}
                                                        </div>
                                                    )}

                                                {/* Status Indicator */}
                                                <div className="absolute bottom-4 right-4">
                                                    {isUpcoming ? (
                                                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                                                            Upcoming
                                                        </div>
                                                    ) : (
                                                        <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                                                            Past
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Event Content */}
                                            <div className="p-6 flex flex-col flex-grow">
                                                {/* Date & Time */}
                                                <div className="text-sm text-gray-600 mb-3">
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <Clock className="h-4 w-4 text-blue-500" />
                                                        <span className="font-medium">
                                                            {formatEventDate(
                                                                event.start_date,
                                                                event.end_date
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="ml-5 text-xs text-gray-500">
                                                        Scheduled at{" "}
                                                        {formatEventTime(
                                                            event.start_date,
                                                            event.end_date
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-shrink-0 group-hover:text-royal-blue transition-colors">
                                                    {event.title}
                                                </h3>

                                                {/* Excerpt */}
                                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                                                    {event.excerpt}
                                                </p>

                                                {/* Location */}
                                                {event.location && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                                        <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
                                                        <span className="font-medium">
                                                            {event.location}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="mt-auto pt-4 border-t border-gray-100">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            onClick={() =>
                                                                handleViewDetails(
                                                                    event
                                                                )
                                                            }
                                                            className="flex-1 bg-royal-blue hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 hover:shadow-md"
                                                        >
                                                            View Details
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="px-3 border-blue-200 text-blue-600 hover:bg-blue-50"
                                                        >
                                                            <svg
                                                                className="h-4 w-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                                                />
                                                            </svg>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pagination Controls */}
                            {pagination.pages > 1 && (
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
                                            { length: pagination.pages },
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
                                        disabled={
                                            currentPage === pagination.pages
                                        }
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

            {/* Event Details Modal */}
            {isModalOpen && selectedEvent && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-start gap-4 p-6 border-b border-gray-100">
                            {/* Compact Event Image */}
                            <div className="flex-shrink-0">
                                <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                                    {selectedEvent.image_path ? (
                                        <img
                                            src={
                                                selectedEvent.image_path.startsWith(
                                                    "http"
                                                )
                                                    ? selectedEvent.image_path
                                                    : `/storage/${selectedEvent.image_path.replace(
                                                          /^\/?storage\//,
                                                          ""
                                                      )}`
                                            }
                                            alt={selectedEvent.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                                            <img
                                                src="/images/announcement.png"
                                                alt="School Event"
                                                className="max-w-full max-h-full object-contain opacity-80"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Event Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                    <h2 className="text-2xl font-bold text-gray-900 pr-8">
                                        {selectedEvent.title}
                                    </h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 p-1"
                                    >
                                        <svg
                                            className="h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    {selectedEvent.is_featured && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-royal-blue to-blue-600 text-white">
                                            ⭐ Featured
                                        </span>
                                    )}
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(
                                            selectedEvent.event_type
                                        )}`}
                                    >
                                        {selectedEvent.event_type
                                            .charAt(0)
                                            .toUpperCase() +
                                            selectedEvent.event_type.slice(1)}
                                    </span>
                                    {new Date(selectedEvent.start_date) >
                                    new Date() ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                                            Upcoming
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5"></div>
                                            Past Event
                                        </span>
                                    )}
                                </div>

                                {/* Date & Time */}
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium">
                                        {formatEventDate(
                                            selectedEvent.start_date,
                                            selectedEvent.end_date
                                        )}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500 mb-3">
                                    Scheduled at{" "}
                                    {formatEventTime(
                                        selectedEvent.start_date,
                                        selectedEvent.end_date
                                    )}
                                </div>

                                {/* Location */}
                                {selectedEvent.location && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 text-red-500" />
                                        <span className="font-medium">
                                            {selectedEvent.location}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-20rem)] space-y-5">
                            {/* Event Description */}
                            {selectedEvent.description && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        Event Description
                                    </h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                                            {selectedEvent.description}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Event Excerpt */}
                            {selectedEvent.excerpt && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        Event Summary
                                    </h3>
                                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                        <p className="text-gray-700 leading-relaxed italic text-sm">
                                            "{selectedEvent.excerpt}"
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Event Details Grid */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Event Details
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <span className="text-xs font-medium text-gray-500 block mb-1">
                                            Type
                                        </span>
                                        <p className="text-sm text-gray-900 font-medium capitalize">
                                            {selectedEvent.event_type}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-xs font-medium text-gray-500 block mb-1">
                                            Status
                                        </span>
                                        <p className="text-sm text-gray-900 font-medium">
                                            Active
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-xs font-medium text-gray-500 block mb-1">
                                            Visibility
                                        </span>
                                        <p className="text-sm text-gray-900 font-medium">
                                            Public
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-xs font-medium text-gray-500 block mb-1">
                                            Featured
                                        </span>
                                        <p className="text-sm text-gray-900 font-medium">
                                            {selectedEvent.is_featured
                                                ? "Yes"
                                                : "No"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                            <Button
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm"
                            >
                                Close
                            </Button>
                            <Button className="bg-royal-blue hover:bg-blue-700 text-white px-4 py-2 text-sm">
                                <svg
                                    className="h-4 w-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                    />
                                </svg>
                                Share Event
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
