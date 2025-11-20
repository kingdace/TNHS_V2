import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { searchService } from "../services/searchService";
import {
    Search,
    X,
    Filter,
    Clock,
    TrendingUp,
    ExternalLink,
    ChevronRight,
    Loader2,
} from "lucide-react";

const EnhancedSearch = ({
    className = "",
    placeholder = "Search announcements, events, staff, programs...",
}) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ categories: [], totalResults: 0 });
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [error, setError] = useState("");

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

    // Handle suggestions
    const handleSuggestions = useCallback((searchQuery) => {
        if (searchQuery.trim().length === 0) {
            setSuggestions(searchService.getPopularSearches().slice(0, 8));
            setShowSuggestions(true);
            return;
        }

        searchService.debouncedSuggestions(
            searchQuery,
            (suggestionResults) => {
                setSuggestions(suggestionResults.slice(0, 8));
                setShowSuggestions(suggestionResults.length > 0);
            },
            200
        );
    }, []);

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

    // Handle input focus
    const handleInputFocus = () => {
        if (query.trim().length >= 2) {
            setShowResults(true);
        } else {
            handleSuggestions(query);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        handleSearch(suggestion);
        inputRef.current?.focus();
    };

    // Handle result item click
    const handleResultClick = (item) => {
        if (item.url) {
            if (item.is_external) {
                window.open(item.url, "_blank");
            } else {
                // Use React Router navigation for internal links
                navigate(item.url);
            }
        }
        setShowResults(false);
        setQuery("");
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

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowResults(false);
                setShowSuggestions(false);
                setShowFilters(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
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
            style={{ zIndex: 999999, position: "relative" }}
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

            {/* Category Filters */}
            {showFilters && (
                <div
                    className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-xl shadow-lg border border-gray-200"
                    style={{
                        zIndex: 999998,
                        position: "absolute",
                        backgroundColor: "white",
                    }}
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
                                    selectedCategories.includes(category.type)
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
                </div>
            )}

            {/* Search Suggestions Portal */}
            {showSuggestions &&
                suggestions.length > 0 &&
                createPortal(
                    <div
                        className="bg-white rounded-xl shadow-xl border border-gray-200"
                        style={{
                            position: "fixed",
                            zIndex: 9999997,
                            backgroundColor: "white",
                            top: searchRef.current
                                ? searchRef.current.getBoundingClientRect()
                                      .bottom + 8
                                : "100px",
                            left: searchRef.current
                                ? searchRef.current.getBoundingClientRect().left
                                : "50%",
                            width: searchRef.current
                                ? searchRef.current.getBoundingClientRect()
                                      .width
                                : "600px",
                            transform: searchRef.current
                                ? "none"
                                : "translateX(-50%)",
                        }}
                    >
                        <div className="p-4">
                            <div className="flex items-center text-sm text-gray-600 mb-3">
                                {query.trim().length === 0 ? (
                                    <>
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Popular searches
                                    </>
                                ) : (
                                    <>
                                        <Clock className="w-4 h-4 mr-2" />
                                        Suggestions
                                    </>
                                )}
                            </div>
                            <div className="space-y-1">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            handleSuggestionClick(suggestion)
                                        }
                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 flex items-center justify-between group"
                                    >
                                        <span>{suggestion}</span>
                                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

            {/* Search Results Portal - RENDERS TO BODY */}
            {showResults &&
                createPortal(
                    <>
                        {/* Invisible backdrop for click outside */}
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                zIndex: 9999998,
                                pointerEvents: "none",
                            }}
                        />

                        {/* Results Dropdown */}
                        <div
                            className="bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto"
                            style={{
                                position: "fixed",
                                zIndex: 9999999,
                                backgroundColor: "white",
                                boxShadow:
                                    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                top: searchRef.current
                                    ? searchRef.current.getBoundingClientRect()
                                          .bottom + 8
                                    : "100px",
                                left: searchRef.current
                                    ? searchRef.current.getBoundingClientRect()
                                          .left
                                    : "50%",
                                width: searchRef.current
                                    ? searchRef.current.getBoundingClientRect()
                                          .width
                                    : "600px",
                                transform: searchRef.current
                                    ? "none"
                                    : "translateX(-50%)",
                                minHeight: "200px",
                            }}
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
                                                            .map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={`${item.type}-${item.id}-${index}`}
                                                                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                                                        onClick={() =>
                                                                            handleResultClick(
                                                                                item
                                                                            )
                                                                        }
                                                                    >
                                                                        <div className="text-sm font-medium text-gray-900 mb-1">
                                                                            {
                                                                                item.title
                                                                            }
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
                                                                    </div>
                                                                )
                                                            )}
                                                </div>

                                                {/* Show More */}
                                                {category.results &&
                                                    category.results.length >
                                                        3 && (
                                                        <div className="text-xs text-royal-blue mt-2">
                                                            +{" "}
                                                            {category.results
                                                                .length -
                                                                3}{" "}
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
                        </div>
                    </>,
                    document.body
                )}
        </div>
    );
};

export default EnhancedSearch;
