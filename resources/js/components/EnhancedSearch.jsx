import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { router } from "@inertiajs/react";
import { searchService } from "../services/searchService";
import {
    Search,
    X,
    Filter,
    Clock,
    TrendingUp,
    ChevronRight,
    Loader2,
} from "lucide-react";

const EnhancedSearch = ({
    className = "",
    placeholder = "Search announcements, events, academics...",
}) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ categories: [], totalResults: 0 });
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    // Suggestions removed - search is now simpler
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [error, setError] = useState("");
    const [isInteracting, setIsInteracting] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({
        top: 0,
        left: 0,
        width: 0,
    });

    const searchRef = useRef(null);
    const inputRef = useRef(null);

    const categories = searchService.getSearchCategories();

    // Handle search with debouncing
    const handleSearch = useCallback((searchQuery) => {
        if (!searchQuery || searchQuery.trim().length < 2) {
            setResults({ categories: [], totalResults: 0 });
            setShowResults(false);
            setError("");
            return;
        }

        setLoading(true);
        setError("");

        searchService.debouncedSearch(
            searchQuery,
            (result) => {
                setLoading(false);

                if (result.success) {
                    const formattedResults =
                        searchService.formatResults(result);
                    setResults(formattedResults);
                    setShowResults(true);

                    // Track search
                    searchService.trackSearch(
                        searchQuery,
                        formattedResults.totalResults
                    );
                } else {
                    setError(
                        result.error || "Search failed. Please try again."
                    );
                    setResults({ categories: [], totalResults: 0 });
                    setShowResults(false);
                }
            },
            300
        );
    }, []);

    // Suggestions feature removed for simpler UX

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim().length >= 2) {
            handleSearch(value);
            setShowSuggestions(false);
        } else {
            handleSuggestions(value);
            setShowResults(false);
        }
    };

    // Handle input focus - just show results if query exists
    const handleInputFocus = () => {
        if (query.trim().length >= 1) {
            setShowResults(true);
        }
    };

    // Update dropdown position when search bar moves or window resizes
    useEffect(() => {
        const updatePosition = () => {
            if (searchRef.current) {
                const rect = searchRef.current.getBoundingClientRect();
                setDropdownPosition({
                    top: rect.bottom + window.scrollY,
                    left: rect.left + window.scrollX,
                    width: rect.width,
                });
            }
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition);

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition);
        };
    }, [showResults, showFilters]);

    // Suggestions removed - no longer needed

    // Handle result item click - Navigate to page
    const handleResultClick = (item) => {
        console.log("Result clicked:", item);

        if (item.url) {
            console.log("Navigating to:", item.url);

            // Navigate IMMEDIATELY - page will reload anyway
            if (item.is_external) {
                window.open(item.url, "_blank");
            } else {
                window.location.href = item.url;
            }
        } else {
            console.warn("No URL found for item:", item);
        }
    };

    // Handle category filter toggle
    const toggleCategoryFilter = (categoryType) => {
        const newCategories = selectedCategories.includes(categoryType)
            ? selectedCategories.filter((c) => c !== categoryType)
            : [...selectedCategories, categoryType];

        setSelectedCategories(newCategories);

        // Re-search with new filters if there's a query
        if (query.trim().length >= 2) {
            setLoading(true);
            searchService
                .globalSearch(query, { categories: newCategories })
                .then((result) => {
                    setLoading(false);
                    if (result.success) {
                        const formattedResults =
                            searchService.formatResults(result);
                        setResults(formattedResults);
                    }
                });
        }
    };

    // Handle clear search
    const clearSearch = () => {
        setQuery("");
        setResults({ categories: [], totalResults: 0 });
        setShowResults(false);
        setShowSuggestions(false);
        setSelectedCategories([]);
        setError("");
        inputRef.current?.focus();
    };

    // Handle click outside and scroll
    useEffect(() => {
        let scrollTimeout;
        let lastScrollY = window.scrollY;

        const handleClickOutside = (event) => {
            // CRITICAL: Don't close if clicking on a link (our search results)
            if (event.target.closest("a")) {
                console.log("Clicked on link, keeping dropdown open");
                return;
            }

            // Don't close if clicking on suggestion buttons
            if (event.target.closest("button")) {
                console.log("Clicked on button, keeping dropdown open");
                return;
            }

            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowResults(false);
                setShowFilters(false);
            }
        };

        const handleScroll = () => {
            // Don't close dropdowns on scroll - let user scroll while viewing results
            // Dropdowns will only close on click outside or manual close
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            searchService.cancelPendingRequests();
        };
    }, []);

    return (
        <div
            className={`relative max-w-2xl mx-auto ${className}`}
            ref={searchRef}
        >
            {/* Search Input Container */}
            <div className="relative">
                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Search className="w-5 h-5 text-royal-blue" />
                </div>

                {/* Search Input */}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onMouseEnter={() => setIsInteracting(true)}
                    onMouseLeave={() => setIsInteracting(false)}
                    className="w-full pl-12 pr-20 py-3 border-2 border-royal-blue rounded-2xl focus:border-blue-700 focus:outline-none text-gray-700 bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg"
                    autoComplete="off"
                />

                {/* Right Side Controls */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    {/* Loading Spinner */}
                    {loading && (
                        <div className="p-1">
                            <Loader2 className="w-4 h-4 text-royal-blue animate-spin" />
                        </div>
                    )}

                    {/* Filter Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-2 rounded-lg transition-colors relative ${
                            showFilters || selectedCategories.length > 0
                                ? "bg-royal-blue text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        title="Filter search results"
                    >
                        <Filter className="w-4 h-4" />
                        {selectedCategories.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {selectedCategories.length}
                            </span>
                        )}
                    </button>

                    {/* Clear Button */}
                    {query && (
                        <button
                            onClick={clearSearch}
                            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            title="Clear search"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Category Filters - Rendered via Portal */}
            {showFilters &&
                createPortal(
                    <div
                        className="p-4 bg-white rounded-xl shadow-2xl border-2 border-gray-300 z-[99999]"
                        style={{
                            position: "absolute",
                            top: `${dropdownPosition.top + 8}px`,
                            left: `${dropdownPosition.left}px`,
                            width: `${dropdownPosition.width}px`,
                        }}
                        onMouseEnter={() => setIsInteracting(true)}
                        onMouseLeave={() => setIsInteracting(false)}
                    >
                        <div className="text-sm font-medium text-gray-700 mb-3">
                            Filter by category:
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.type}
                                    onClick={() =>
                                        toggleCategoryFilter(category.type)
                                    }
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                                        selectedCategories.includes(
                                            category.type
                                        )
                                            ? `${category.color} text-white shadow-md`
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    <span>{category.icon}</span>
                                    <span>{category.label}</span>
                                </button>
                            ))}
                        </div>
                        {selectedCategories.length > 0 && (
                            <button
                                onClick={() => setSelectedCategories([])}
                                className="mt-3 text-sm text-royal-blue hover:underline"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>,
                    document.body
                )}

            {/* Suggestions removed for simpler UX */}

            {/* Search Results - Rendered via Portal at document root */}
            {showResults &&
                createPortal(
                    <div
                        className="bg-white rounded-xl shadow-2xl border-2 border-gray-300 overflow-y-auto z-[99999]"
                        style={{
                            position: "absolute",
                            top: `${dropdownPosition.top + 8}px`,
                            left: `${dropdownPosition.left}px`,
                            width: `${dropdownPosition.width}px`,
                            maxHeight: "500px",
                            minHeight: "200px",
                        }}
                        onMouseEnter={() => setIsInteracting(true)}
                        onMouseLeave={() => setIsInteracting(false)}
                    >
                        {error ? (
                            <div className="p-4 text-center text-red-600">
                                <div className="text-sm font-medium mb-1">
                                    Search Error
                                </div>
                                <div className="text-xs">{error}</div>
                            </div>
                        ) : results.totalResults > 0 ? (
                            <div className="p-4">
                                {/* Results Header */}
                                <div className="text-sm text-gray-600 mb-4">
                                    Found{" "}
                                    <strong>{results.totalResults}</strong>{" "}
                                    results for "<strong>{query}</strong>"
                                </div>

                                {/* Simple Results List */}
                                {results.categories &&
                                results.categories.length > 0 ? (
                                    results.categories.map((category) => (
                                        <div
                                            key={category.type}
                                            className="mb-4"
                                        >
                                            {/* Category Header */}
                                            <div className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                                                <span className="mr-2">
                                                    {category.icon}
                                                </span>
                                                {category.label} (
                                                {category.count})
                                            </div>

                                            {/* Results */}
                                            <div className="space-y-2">
                                                {category.results &&
                                                    category.results
                                                        .slice(0, 3)
                                                        .map((item, index) => (
                                                            <a
                                                                key={`${item.type}-${item.id}-${index}`}
                                                                href={
                                                                    item.url ||
                                                                    "#"
                                                                }
                                                                target={
                                                                    item.is_external
                                                                        ? "_blank"
                                                                        : "_self"
                                                                }
                                                                rel={
                                                                    item.is_external
                                                                        ? "noopener noreferrer"
                                                                        : ""
                                                                }
                                                                className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer no-underline"
                                                                style={{
                                                                    color: "inherit",
                                                                    textDecoration:
                                                                        "none",
                                                                }}
                                                            >
                                                                <div className="text-sm font-medium text-gray-900 mb-1">
                                                                    {item.title}
                                                                </div>
                                                                {item.excerpt && (
                                                                    <div className="text-xs text-gray-600 mb-2">
                                                                        {item
                                                                            .excerpt
                                                                            .length >
                                                                        100
                                                                            ? item.excerpt.substring(
                                                                                  0,
                                                                                  100
                                                                              ) +
                                                                              "..."
                                                                            : item.excerpt}
                                                                    </div>
                                                                )}
                                                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                                    <span>
                                                                        📢
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            item.category
                                                                        }
                                                                    </span>
                                                                    {item.date && (
                                                                        <span>
                                                                            •{" "}
                                                                            {
                                                                                item.date
                                                                            }
                                                                        </span>
                                                                    )}
                                                                    {item.is_external && (
                                                                        <span className="text-blue-600">
                                                                            •
                                                                            External
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </a>
                                                        ))}
                                            </div>

                                            {/* Show More */}
                                            {category.results &&
                                                category.results.length > 3 && (
                                                    <div className="text-xs text-royal-blue mt-2">
                                                        +{" "}
                                                        {category.results
                                                            .length - 3}{" "}
                                                        more results
                                                    </div>
                                                )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 text-sm">
                                        No categories found
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-gray-600">
                                <div className="text-sm font-medium mb-1">
                                    No results found
                                </div>
                                <div className="text-xs">
                                    Try different keywords or check your
                                    spelling
                                </div>
                            </div>
                        )}
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default EnhancedSearch;
