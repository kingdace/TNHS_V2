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
    Megaphone,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    RotateCcw,
    Search,
    Filter,
    ChevronDown,
    Star,
    Image as ImageIcon,
} from "lucide-react";
import { announcementService } from "../../services/announcementService";
import RichTextEditor from "../../components/RichTextEditor";

const AdminAnnouncements = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        title: "",
        content: "",
        content_html: "",
        author: "",
        status: "draft",
        category: "General",
        image: null,
        images: [],
        image_url: "",
        is_featured: false,
        scheduled_publish_at: "",
        scheduled_unpublish_at: "",
    });
    const [trashed, setTrashed] = useState([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");

    // UI-only controls
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all"); // all|draft|published|archived|trash
    const [categoryFilter, setCategoryFilter] = useState("all"); // all|General|Academic|Events|Sports|Arts|Announcements|News|Important
    const [featuredOnly, setFeaturedOnly] = useState(false);
    const [sortKey, setSortKey] = useState("newest"); // newest|oldest|title|status
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [publishingId, setPublishingId] = useState(null);
    const [featuringId, setFeaturingId] = useState(null);
    const [toast, setToast] = useState("");

    const load = async () => {
        try {
            setLoading(true);
            const data = await announcementService.list();
            setItems(data);
            setError("");
        } catch (e) {
            setError("Failed to load announcements.");
        } finally {
            setLoading(false);
        }
    };

    const loadTrashed = async () => {
        try {
            const data = await announcementService.listTrashed();
            setTrashed(data);
        } catch (e) {
            // no-op
        }
    };

    useEffect(() => {
        load();
        loadTrashed();
    }, []);

    // Derived list with search/filter/sort (client-side only)
    const normalized = (text) => (text || "").toString().toLowerCase();

    // Calculate status counts
    const draftCount = items.filter((it) => it.status === "draft").length;
    const publishedCount = items.filter(
        (it) => it.status === "published"
    ).length;
    const archivedCount = items.filter((it) => it.status === "archived").length;

    const filteredSorted = (items || [])
        .filter((it) => {
            // Filter by active tab
            if (activeTab !== "all" && it.status !== activeTab) return false;

            // Filter by category
            if (categoryFilter !== "all" && it.category !== categoryFilter)
                return false;

            // Filter by featured
            if (featuredOnly && !it.is_featured) return false;

            // Filter by search query
            if (!query.trim()) return true;
            const q = normalized(query);
            return (
                normalized(it.title).includes(q) ||
                normalized(it.content).includes(q) ||
                normalized(it.author).includes(q)
            );
        })
        .sort((a, b) => {
            // When viewing "All", prioritize by status first: published > draft > archived
            if (activeTab === "all") {
                const statusPriority = { published: 0, draft: 1, archived: 2 };
                const aPriority = statusPriority[a.status] ?? 3;
                const bPriority = statusPriority[b.status] ?? 3;

                if (aPriority !== bPriority) {
                    return aPriority - bPriority;
                }
            }

            // Then sort by selected sort key
            if (sortKey === "title")
                return (a.title || "").localeCompare(b.title || "");
            if (sortKey === "status")
                return (a.status || "").localeCompare(b.status || "");

            // Default: sort by date (newest or oldest)
            const aTime = a.published_at
                ? new Date(a.published_at).getTime()
                : 0;
            const bTime = b.published_at
                ? new Date(b.published_at).getTime()
                : 0;
            return sortKey === "oldest" ? aTime - bTime : bTime - aTime;
        });

    const totalItems = filteredSorted.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const currentPage = Math.min(page, totalPages);
    const startIdx = (currentPage - 1) * pageSize;
    const displayedItems = filteredSorted.slice(startIdx, startIdx + pageSize);

    const openCreate = () => {
        setEditing(null);
        setForm({
            title: "",
            content: "",
            content_html: "",
            author: "",
            status: "draft",
            category: "General",
            image: null,
            images: [],
            image_url: "",
            is_featured: false,
            scheduled_publish_at: "",
            scheduled_unpublish_at: "",
        });
        setShowForm(true);
        setImagePreviewUrl("");
        setError(""); // Clear any previous errors
    };

    const openEdit = (item) => {
        setEditing(item);
        setForm({
            title: item.title,
            content: item.content,
            content_html: item.content_html || "",
            author: item.author,
            status: item.status,
            category: item.category || "General",
            image: null,
            images: [],
            image_url: item.external_link || "",
            is_featured: !!item.is_featured,
            scheduled_publish_at: item.publish_date_for_form || "",
            scheduled_unpublish_at: item.unpublish_date_for_form || "",
        });
        setShowForm(true);
        setError(""); // Clear any previous errors
        // Set proper image preview URL
        const imageUrl = item.image_path
            ? item.image_path.startsWith("http")
                ? item.image_path
                : `/storage/${item.image_path.replace(/^\/?storage\//, "")}`
            : "";
        setImagePreviewUrl(imageUrl);
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            setError(""); // Clear any previous errors

            // Basic validation
            if (!form.title.trim()) {
                setError("Title is required.");
                return;
            }
            if (!form.content.trim()) {
                setError("Content is required.");
                return;
            }
            if (!form.author.trim()) {
                setError("Author is required.");
                return;
            }

            // Scheduling validation
            const now = new Date();
            if (form.scheduled_publish_at) {
                const publishDate = new Date(form.scheduled_publish_at);
                // Allow scheduling up to 5 minutes in the past to account for processing delays
                const minTime = new Date(now.getTime() - 300000); // 5 minutes ago
                if (publishDate < minTime) {
                    setError(
                        "Scheduled publish date cannot be more than 5 minutes in the past."
                    );
                    return;
                }
            }

            if (form.scheduled_unpublish_at) {
                const unpublishDate = new Date(form.scheduled_unpublish_at);
                const publishDate = form.scheduled_publish_at
                    ? new Date(form.scheduled_publish_at)
                    : now;

                if (unpublishDate <= publishDate) {
                    setError("Unpublish date must be after the publish date.");
                    return;
                }
            }

            // Image size validation (frontend check)
            if (form.image && form.image.size) {
                const maxSize = 5 * 1024 * 1024; // 5MB
                if (form.image.size > maxSize) {
                    setError(
                        `Image is too large. Maximum size is 5MB, but selected image is ${(
                            form.image.size /
                            1024 /
                            1024
                        ).toFixed(2)}MB.`
                    );
                    return;
                }
            }

            // Debug: Log the form data being sent
            console.log("Submitting form data:", form);

            if (editing) {
                await announcementService.update(editing.id, form);
            } else {
                await announcementService.create(form);
            }
            setShowForm(false);
            await load();
        } catch (error) {
            console.error("Submit error:", error);
            setError(error.message || "Save failed. Check required fields.");
        }
    };

    const remove = async (id) => {
        if (!confirm("Move this announcement to Trash?")) return;
        try {
            await announcementService.remove(id);
            await load();
            await loadTrashed();
        } catch (e) {
            setError("Delete failed.");
        }
    };

    const toggleStatus = async (item) => {
        const next = item.status === "published" ? "draft" : "published";
        try {
            setPublishingId(item.id);
            await announcementService.update(item.id, { status: next });
            await load();
            setToast(
                next === "published"
                    ? "Announcement published"
                    : "Announcement unpublished"
            );
            setTimeout(() => setToast(""), 2500);
        } catch (e) {
            setError("Status update failed.");
        } finally {
            setPublishingId(null);
        }
    };

    // Convert Google Drive sharing link to direct view link for preview
    const convertGDriveLink = (url) => {
        if (!url) return "";
        console.log("Converting URL:", url);

        // If it's already a direct link, return as is
        if (url.includes("drive.google.com/uc?")) {
            console.log("Already a direct link:", url);
            return url;
        }

        // Extract file ID from sharing link - try multiple patterns
        let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)\//);
        if (!match) {
            // Try alternative pattern for different URL formats
            match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
        }
        if (!match) {
            // Try open?id= format
            match = url.match(/open\?id=([a-zA-Z0-9_-]+)/);
        }

        if (match) {
            const fileId = match[1];
            // Try the standard direct view URL
            const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
            console.log("Converted to:", directUrl);

            // For drive_link URLs, also try the thumbnail URL as fallback
            if (url.includes("usp=drive_link")) {
                console.log(
                    "Detected drive_link URL, this might have restrictions"
                );
            }

            return directUrl;
        }

        // Return as is if not a GDrive link
        console.log("Not a GDrive link, returning as is:", url);
        return url;
    };

    return (
        <div className="space-y-6">
            <Card className="border-none shadow-xl">
                <CardHeader className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white pb-4">
                    <div className="space-y-3">
                        {/* Title and Create Button */}
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-white text-2xl font-bold drop-shadow-sm">
                                    📢 School Highlights & Announcements
                                </CardTitle>
                                <CardDescription className="text-blue-100 mt-1 text-sm">
                                    Manage campus highlights, events, and
                                    updates
                                </CardDescription>
                            </div>
                            {activeTab !== "trash" && (
                                <Button
                                    className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all font-semibold"
                                    onClick={openCreate}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Announcement
                                </Button>
                            )}
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-1">
                            {[
                                {
                                    id: "all",
                                    label: "All",
                                    count: items.length,
                                    color: "blue",
                                },
                                {
                                    id: "draft",
                                    label: "Draft",
                                    count: draftCount,
                                    color: "yellow",
                                },
                                {
                                    id: "published",
                                    label: "Published",
                                    count: publishedCount,
                                    color: "green",
                                },
                                {
                                    id: "archived",
                                    label: "Archived",
                                    count: archivedCount,
                                    color: "gray",
                                },
                                {
                                    id: "trash",
                                    label: "Trash",
                                    count: trashed.length,
                                    color: "red",
                                },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setPage(1);
                                        if (tab.id === "trash") {
                                            loadTrashed();
                                        }
                                    }}
                                    className={`
                                        px-4 py-2 font-bold text-sm transition-all rounded-lg relative
                                        ${
                                            activeTab === tab.id
                                                ? "text-white shadow-lg scale-105"
                                                : "text-white/90 hover:text-white hover:scale-102"
                                        }
                                    `}
                                    style={{
                                        backgroundColor:
                                            tab.color === "blue"
                                                ? activeTab === tab.id
                                                    ? "#1e40af"
                                                    : "#3b82f6"
                                                : tab.color === "yellow"
                                                ? activeTab === tab.id
                                                    ? "#d97706"
                                                    : "#f59e0b"
                                                : tab.color === "green"
                                                ? activeTab === tab.id
                                                    ? "#059669"
                                                    : "#10b981"
                                                : tab.color === "gray"
                                                ? activeTab === tab.id
                                                    ? "#4b5563"
                                                    : "#6b7280"
                                                : activeTab === tab.id
                                                ? "#dc2626"
                                                : "#ef4444",
                                    }}
                                >
                                    {tab.label}
                                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-white/30 text-white">
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Filters - Only show for non-trash tabs */}
                        {activeTab !== "trash" && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                                {/* Search */}
                                <div className="lg:col-span-6">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            value={query}
                                            onChange={(e) =>
                                                setQuery(e.target.value)
                                            }
                                            placeholder="Search title, content, author..."
                                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                                        />
                                    </div>
                                </div>
                                {/* Filters */}
                                <div className="lg:col-span-6 flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-gray-400" />
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) =>
                                            setCategoryFilter(e.target.value)
                                        }
                                        className="flex-1 rounded-lg border border-blue-100 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                                    >
                                        <option value="all">
                                            All categories
                                        </option>
                                        <option value="General">General</option>
                                        <option value="Academic">
                                            Academic
                                        </option>
                                        <option value="Events">Events</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Arts">Arts</option>
                                        <option value="Announcements">
                                            Announcements
                                        </option>
                                        <option value="News">News</option>
                                        <option value="Important">
                                            Important
                                        </option>
                                    </select>
                                    <label className="flex items-center gap-2 text-sm text-gray-700 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={featuredOnly}
                                            onChange={(e) =>
                                                setFeaturedOnly(
                                                    e.target.checked
                                                )
                                            }
                                            className="h-4 w-4 text-royal-blue border-gray-300 rounded"
                                        />
                                        <Star
                                            className={`h-4 w-4 ${
                                                featuredOnly
                                                    ? "text-royal-blue"
                                                    : "text-gray-400"
                                            }`}
                                        />
                                        Featured only
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {toast && (
                        <div className="mb-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-2">
                            {toast}
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                            {error}
                        </div>
                    )}

                    {/* Main Content - Toggle between tabs */}
                    {activeTab === "trash" ? (
                        // Trash View
                        trashed.length === 0 ? (
                            <div className="text-center py-12 text-red-700">
                                <Trash2 className="h-12 w-12 mx-auto mb-4 text-red-400" />
                                <p className="text-lg font-medium mb-2">
                                    No items in Trash
                                </p>
                                <p className="text-sm text-red-600">
                                    Deleted announcements will appear here
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-red-100">
                                {trashed.map((item) => (
                                    <div key={item.id} className="py-4">
                                        <div className="group flex items-start gap-4 p-3 rounded-lg transition-colors hover:bg-red-50/50 hover:shadow-sm">
                                            {/* Thumbnail */}
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-red-200">
                                                {item.image_path ? (
                                                    <img
                                                        src={(() => {
                                                            const p =
                                                                item.image_path ||
                                                                "";
                                                            if (!p) return "";
                                                            if (
                                                                p.startsWith(
                                                                    "http"
                                                                )
                                                            )
                                                                return p;
                                                            if (
                                                                p.startsWith(
                                                                    "/storage/"
                                                                )
                                                            )
                                                                return p;
                                                            const cleaned =
                                                                p.replace(
                                                                    /^\/?storage\//,
                                                                    ""
                                                                );
                                                            return `/storage/${cleaned}`;
                                                        })()}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) =>
                                                            (e.currentTarget.style.display =
                                                                "none")
                                                        }
                                                    />
                                                ) : (
                                                    <ImageIcon className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>

                                            {/* Main content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                                    {item.content}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                    <span>
                                                        By {item.author}
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        Deleted{" "}
                                                        {new Date(
                                                            item.deleted_at
                                                        ).toLocaleString()}
                                                    </span>
                                                    {item.category && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                                                                {item.category}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                    onClick={async () => {
                                                        await announcementService.restore(
                                                            item.id
                                                        );
                                                        await load();
                                                        await loadTrashed();
                                                    }}
                                                >
                                                    <RotateCcw className="h-4 w-4 mr-1" />
                                                    Restore
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                    onClick={async () => {
                                                        if (
                                                            confirm(
                                                                "Permanently delete this announcement? This action cannot be undone."
                                                            )
                                                        ) {
                                                            await announcementService.forceDelete(
                                                                item.id
                                                            );
                                                            await loadTrashed();
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Delete Forever
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (
                        // Regular View (All, Draft, Published, Archived)
                        <>
                            {loading ? (
                                <div className="space-y-3">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-4 py-2"
                                        >
                                            <div className="w-12 h-12 rounded-lg bg-gray-100 animate-pulse" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                                                <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                                                <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                                            </div>
                                            <div className="w-64 flex items-center gap-2">
                                                <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
                                                <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : displayedItems.length === 0 ? (
                                <div className="text-center py-12 text-blue-700">
                                    <Megaphone className="h-12 w-12 mx-auto mb-4 text-royal-blue/40" />
                                    <p className="text-lg font-medium mb-2">
                                        {activeTab === "all" &&
                                            "No announcements found"}
                                        {activeTab === "draft" &&
                                            "No draft announcements"}
                                        {activeTab === "published" &&
                                            "No published announcements"}
                                        {activeTab === "archived" &&
                                            "No archived announcements"}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {query ||
                                        categoryFilter !== "all" ||
                                        featuredOnly
                                            ? "Try adjusting your filters"
                                            : "Create your first announcement to get started"}
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {displayedItems.map((item) => (
                                        <div key={item.id} className="py-3">
                                            <div className="group flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5">
                                                {/* Thumbnail */}
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border border-gray-200 shadow-sm flex-shrink-0">
                                                    {item.image_path ? (
                                                        <img
                                                            src={(() => {
                                                                const p =
                                                                    item.image_path ||
                                                                    "";
                                                                if (!p)
                                                                    return "";
                                                                if (
                                                                    p.startsWith(
                                                                        "http"
                                                                    )
                                                                )
                                                                    return p;
                                                                if (
                                                                    p.startsWith(
                                                                        "/storage/"
                                                                    )
                                                                )
                                                                    return p;
                                                                // ensure single /storage prefix
                                                                const cleaned =
                                                                    p.replace(
                                                                        /^\/?storage\//,
                                                                        ""
                                                                    );
                                                                return `/storage/${cleaned}`;
                                                            })()}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) =>
                                                                (e.currentTarget.style.display =
                                                                    "none")
                                                            }
                                                        />
                                                    ) : (
                                                        <ImageIcon className="h-6 w-6 text-gray-400" />
                                                    )}
                                                </div>
                                                {/* Main content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                        {item.is_featured && (
                                                            <span className="inline-flex items-center text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none font-bold shadow-md">
                                                                <Star className="h-3.5 w-3.5 mr-1 fill-current" />{" "}
                                                                Featured
                                                            </span>
                                                        )}
                                                        {item.external_link && (
                                                            <span className="inline-flex items-center text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-none font-bold shadow-md">
                                                                <svg
                                                                    className="h-3.5 w-3.5 mr-1"
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
                                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                                    />
                                                                </svg>
                                                                Link
                                                            </span>
                                                        )}
                                                        <span
                                                            className={`text-xs px-3 py-1.5 rounded-lg border-none font-bold shadow-md ${
                                                                item.status ===
                                                                "published"
                                                                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                                                                    : item.status ===
                                                                      "archived"
                                                                    ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
                                                                    : "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                                                            }`}
                                                        >
                                                            {item.status.toUpperCase()}
                                                        </span>
                                                        <span className="text-xs text-gray-600 font-semibold bg-gray-100 px-3 py-1.5 rounded-lg">
                                                            {item.published_at
                                                                ? `📅 ${new Date(
                                                                      item.published_at
                                                                  ).toLocaleDateString()}`
                                                                : item.scheduled_publish_at
                                                                ? `⏰ ${new Date(
                                                                      item.scheduled_publish_at
                                                                  ).toLocaleDateString()}`
                                                                : `📝 ${new Date(
                                                                      item.created_at
                                                                  ).toLocaleDateString()}`}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 group-hover:text-blue-700 transition-colors">
                                                        {item.title}
                                                    </h3>

                                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                                                        {item.content}
                                                    </p>

                                                    <div className="flex items-center gap-3 text-xs text-gray-600">
                                                        <span className="flex items-center gap-1.5 font-medium">
                                                            <svg
                                                                className="h-4 w-4 text-blue-500"
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
                                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                />
                                                            </svg>
                                                            {item.author}
                                                        </span>
                                                        <span className="text-gray-300">
                                                            •
                                                        </span>
                                                        <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-bold shadow-md">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0">
                                                    <label className="flex items-center gap-2 text-sm">
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                item.status ===
                                                                "published"
                                                            }
                                                            onChange={() =>
                                                                toggleStatus(
                                                                    item
                                                                )
                                                            }
                                                            disabled={
                                                                publishingId ===
                                                                item.id
                                                            }
                                                            className="h-4 w-4 text-royal-blue border-gray-300 rounded"
                                                        />
                                                        {publishingId ===
                                                        item.id ? (
                                                            <span className="text-gray-500">
                                                                Updating...
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                {item.status ===
                                                                "published"
                                                                    ? "Published"
                                                                    : "Draft"}
                                                            </span>
                                                        )}
                                                    </label>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className={`text-gray-700 ${
                                                            item.is_featured
                                                                ? "border-royal-blue text-royal-blue"
                                                                : ""
                                                        }`}
                                                        onClick={async () => {
                                                            try {
                                                                setFeaturingId(
                                                                    item.id
                                                                );
                                                                await announcementService.update(
                                                                    item.id,
                                                                    {
                                                                        is_featured:
                                                                            !item.is_featured,
                                                                    }
                                                                );
                                                                await load();
                                                            } catch (e) {
                                                                setError(
                                                                    "Feature update failed."
                                                                );
                                                            } finally {
                                                                setFeaturingId(
                                                                    null
                                                                );
                                                            }
                                                        }}
                                                        disabled={
                                                            featuringId ===
                                                            item.id
                                                        }
                                                    >
                                                        <Star className="h-4 w-4 mr-1" />
                                                        {featuringId === item.id
                                                            ? "..."
                                                            : item.is_featured
                                                            ? "Featured"
                                                            : "Feature"}
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-gray-700"
                                                        onClick={() =>
                                                            openEdit(item)
                                                        }
                                                    >
                                                        <Edit className="h-4 w-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700"
                                                        onClick={() =>
                                                            remove(item.id)
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pagination footer - Only show for highlights view */}
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-gray-600">
                                    Showing {displayedItems.length} of{" "}
                                    {totalItems} items
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                        Rows:
                                    </span>
                                    <select
                                        value={pageSize}
                                        onChange={(e) => {
                                            setPageSize(
                                                parseInt(e.target.value, 10)
                                            );
                                            setPage(1);
                                        }}
                                        className="rounded-lg border border-blue-100 py-1.5 px-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="outline"
                                            className="text-gray-700 px-3 py-1"
                                            onClick={() =>
                                                setPage((p) =>
                                                    Math.max(1, p - 1)
                                                )
                                            }
                                            disabled={page <= 1}
                                            title="Previous page"
                                        >
                                            Prev
                                        </Button>
                                        <span className="text-sm text-gray-600 px-2">
                                            {page} /{" "}
                                            {Math.max(
                                                1,
                                                Math.ceil(totalItems / pageSize)
                                            )}
                                        </span>
                                        <Button
                                            variant="outline"
                                            className="text-gray-700 px-3 py-1"
                                            onClick={() =>
                                                setPage((p) =>
                                                    Math.min(
                                                        Math.max(
                                                            1,
                                                            Math.ceil(
                                                                totalItems /
                                                                    pageSize
                                                            )
                                                        ),
                                                        p + 1
                                                    )
                                                )
                                            }
                                            disabled={
                                                page >=
                                                Math.max(
                                                    1,
                                                    Math.ceil(
                                                        totalItems / pageSize
                                                    )
                                                )
                                            }
                                            title="Next page"
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg border border-blue-100 max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-xl flex-shrink-0">
                            <h3 className="text-lg font-semibold text-royal-blue">
                                {editing
                                    ? "Edit Announcement"
                                    : "Create Announcement"}
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <form onSubmit={submit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                title: e.target.value,
                                            })
                                        }
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Category
                                        </label>
                                        <select
                                            value={form.category}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    category: e.target.value,
                                                })
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        >
                                            <option value="General">
                                                General
                                            </option>
                                            <option value="Academic">
                                                Academic
                                            </option>
                                            <option value="Events">
                                                Events
                                            </option>
                                            <option value="Sports">
                                                Sports
                                            </option>
                                            <option value="Arts">Arts</option>
                                            <option value="Announcements">
                                                Announcements
                                            </option>
                                            <option value="News">News</option>
                                            <option value="Important">
                                                Important
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status
                                        </label>
                                        <select
                                            value={form.status}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    status: e.target.value,
                                                })
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">
                                                Published
                                            </option>
                                            <option value="archived">
                                                Archived
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Content (Rich Text)
                                    </label>
                                    <RichTextEditor
                                        value={form.content_html}
                                        onChange={(html, text) => {
                                            setForm((prevForm) => ({
                                                ...prevForm,
                                                content_html: html,
                                                content: text,
                                            }));
                                        }}
                                        placeholder="Write your announcement content here..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Author
                                    </label>
                                    <input
                                        value={form.author}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                author: e.target.value,
                                            })
                                        }
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setForm({
                                                    ...form,
                                                    image: file,
                                                });
                                                const reader = new FileReader();
                                                reader.onload = (e) =>
                                                    setImagePreviewUrl(
                                                        e.target?.result
                                                    );
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                    {imagePreviewUrl && (
                                        <div className="mt-2">
                                            <img
                                                src={imagePreviewUrl}
                                                alt="Preview"
                                                className="w-full h-32 object-cover rounded-lg border"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        External Link (Optional)
                                    </label>
                                    <input
                                        value={form.image_url}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                image_url: e.target.value,
                                            })
                                        }
                                        placeholder="https://example.com"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.is_featured}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    is_featured:
                                                        e.target.checked,
                                                })
                                            }
                                            className="h-4 w-4 text-royal-blue border-gray-300 rounded"
                                        />
                                        <Star className="h-4 w-4 text-royal-blue" />
                                        Featured
                                    </label>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Scheduled Publish (Optional)
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={form.scheduled_publish_at}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    scheduled_publish_at:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Scheduled Unpublish (Optional)
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={form.scheduled_unpublish_at}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    scheduled_unpublish_at:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-royal-blue hover:bg-blue-700"
                                    >
                                        {editing ? "Update" : "Create"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAnnouncements;
