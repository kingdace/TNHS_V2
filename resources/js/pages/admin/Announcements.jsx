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
    });
    const [showTrash, setShowTrash] = useState(false);
    const [trashed, setTrashed] = useState([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");

    // UI-only controls
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // all|draft|published|archived
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
    const filteredSorted = (items || [])
        .filter((it) => {
            if (statusFilter !== "all" && it.status !== statusFilter)
                return false;
            if (categoryFilter !== "all" && it.category !== categoryFilter)
                return false;
            if (featuredOnly && !it.is_featured) return false;
            if (!query.trim()) return true;
            const q = normalized(query);
            return (
                normalized(it.title).includes(q) ||
                normalized(it.content).includes(q) ||
                normalized(it.author).includes(q)
            );
        })
        .sort((a, b) => {
            if (sortKey === "title")
                return (a.title || "").localeCompare(b.title || "");
            if (sortKey === "status")
                return (a.status || "").localeCompare(b.status || "");
            const aTime = a.published_at
                ? new Date(a.published_at).getTime()
                : 0;
            const bTime = b.published_at
                ? new Date(b.published_at).getTime()
                : 0;
            return sortKey === "oldest" ? aTime - bTime : bTime - aTime; // default newest
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
        });
        setShowForm(true);
        setImagePreviewUrl("");
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
        });
        setShowForm(true);
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
            if (editing) {
                await announcementService.update(editing.id, form);
            } else {
                await announcementService.create(form);
            }
            setShowForm(false);
            await load();
        } catch (e) {
            setError("Save failed. Check required fields.");
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
        <div className="space-y-8">
            {/* Header
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl px-6 py-4 text-white shadow-lg">
                <div className="flex items-center justify-between">
        <div>
                        <h1 className="text-2xl font-bold">School Highlights</h1>
                        <p className="text-blue-100 text-sm">
                    Manage school announcements and updates
                </p>
            </div>
                </div>
            </div> */}

            <Card className="border-blue-100">
                <CardHeader className="bg-gray-75">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-royal-blue">
                                    All Highlights
                                </CardTitle>
                                <CardDescription className="text-blue-700">
                                    Create and manage campus highlights and
                                    updates
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    className="text-gray-700"
                                    onClick={() => setShowTrash((v) => !v)}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    {showTrash ? "Hide Trash" : "View Trash"}
                                </Button>
                                <Button
                                    className="bg-royal-blue hover:bg-blue-700 text-white"
                                    onClick={openCreate}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Announcement
                                </Button>
                            </div>
                        </div>
                        {/* Toolbar */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sticky top-0">
                            {/* Search */}
                            <div className="lg:col-span-5">
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
                            {/* Sort
                            <div className="lg:col-span-4">
                                <div className="flex items-center gap-2 justify-end">
                                    <span className="text-sm text-gray-600">
                                        Sort by:
                                    </span>
                                    <select
                                        value={sortKey}
                                        onChange={(e) =>
                                            setSortKey(e.target.value)
                                        }
                                        className="w-40 rounded-lg border border-blue-100 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="oldest">Oldest</option>
                                        <option value="title">Title A–Z</option>
                                        <option value="status">Status</option>
                                    </select>
                                    {(query ||
                                        statusFilter !== "all" ||
                                        categoryFilter !== "all" ||
                                        featuredOnly ||
                                        sortKey !== "newest") && (
                                        <Button
                                            variant="outline"
                                            className="text-gray-700"
                                            onClick={() => {
                                                setQuery("");
                                                setStatusFilter("all");
                                                setCategoryFilter("all");
                                                setFeaturedOnly(false);
                                                setSortKey("newest");
                                                setPage(1);
                                            }}
                                        >
                                            Clear filters
                                        </Button>
                                    )}
                                </div>
                            </div> */}
                            {/* Filters */}
                            <div className="lg:col-span-7 flex items-center gap-2">
                                <div className="flex items-center gap-2 w-full">
                                    <Filter className="h-4 w-4 text-gray-400" />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(e.target.value)
                                        }
                                        className="w-32 rounded-lg border border-blue-100 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                                    >
                                        <option value="all">
                                            All statuses
                                        </option>
                                        <option value="draft">Draft</option>
                                        <option value="published">
                                            Published
                                        </option>
                                        <option value="archived">
                                            Archived
                                        </option>
                                    </select>
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) =>
                                            setCategoryFilter(e.target.value)
                                        }
                                        className="w-32 rounded-lg border border-blue-100 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
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
                                </div>
                                <label className="flex items-center gap-2 text-sm text-gray-700 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={featuredOnly}
                                        onChange={(e) =>
                                            setFeaturedOnly(e.target.checked)
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
                            <p>No announcements match your filters.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-blue-100">
                            {displayedItems.map((item) => (
                                <div key={item.id} className="py-4">
                                    <div className="group flex items-start gap-4 p-3 rounded-lg transition-colors hover:bg-blue-50/50 hover:shadow-sm">
                                        {/* Thumbnail */}
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-blue-100">
                                            {item.image_path ? (
                                                <img
                                                    src={(() => {
                                                        const p =
                                                            item.image_path ||
                                                            "";
                                                        if (!p) return "";
                                                        if (
                                                            p.startsWith("http")
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
                                                <ImageIcon className="h-5 w-5 text-gray-400" />
                                            )}
                                        </div>
                                        {/* Main content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                {item.is_featured && (
                                                    <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-royal-blue/10 text-royal-blue border border-royal-blue/20">
                                                        <Star className="h-3 w-3 mr-1" />{" "}
                                                        Featured
                                                    </span>
                                                )}
                                                {item.external_link && (
                                                    <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                                        <svg
                                                            className="h-3 w-3 mr-1"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                            />
                                                        </svg>
                                                        Link
                                                    </span>
                                                )}
                                                <span
                                                    className={`text-[11px] px-2 py-0.5 rounded-full border ${
                                                        item.status ===
                                                        "published"
                                                            ? "bg-green-50 text-green-700 border-green-200"
                                                            : item.status ===
                                                              "archived"
                                                            ? "bg-gray-50 text-gray-700 border-gray-200"
                                                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {item.published_at
                                                        ? new Date(
                                                              item.published_at
                                                          ).toLocaleString()
                                                        : "—"}
                                                </span>
                                                <span className="text-xs text-gray-400 truncate">
                                                    • By {item.author}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-semibold text-gray-900 mt-1 truncate">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                                                {item.content}
                                            </p>
                                        </div>
                                        {/* Actions */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        item.status ===
                                                        "published"
                                                    }
                                                    onChange={() =>
                                                        toggleStatus(item)
                                                    }
                                                    disabled={
                                                        publishingId === item.id
                                                    }
                                                    className="h-4 w-4 text-royal-blue border-gray-300 rounded"
                                                />
                                                {publishingId === item.id ? (
                                                    <span className="text-gray-400">
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
                                                className={`text-gray-700 ${
                                                    item.is_featured
                                                        ? "border-royal-blue text-royal-blue"
                                                        : ""
                                                }`}
                                                onClick={async () => {
                                                    try {
                                                        setFeaturingId(item.id);
                                                        await announcementService.update(
                                                            item.id,
                                                            {
                                                                is_featured:
                                                                    !item.is_featured,
                                                            }
                                                        );
                                                        await load();
                                                        setToast(
                                                            !item.is_featured
                                                                ? "Marked as featured"
                                                                : "Removed from featured"
                                                        );
                                                        setTimeout(
                                                            () => setToast(""),
                                                            2500
                                                        );
                                                    } catch (e) {
                                                        setError(
                                                            "Feature toggle failed."
                                                        );
                                                    } finally {
                                                        setFeaturingId(null);
                                                    }
                                                }}
                                            >
                                                {featuringId === item.id
                                                    ? "Updating..."
                                                    : item.is_featured
                                                    ? "Unfeature"
                                                    : "Feature"}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="text-gray-700"
                                                onClick={() => openEdit(item)}
                                            >
                                                <Edit className="h-4 w-4 mr-2" />{" "}
                                                Edit
                                            </Button>
                                            <Button
                                                className="bg-red-600 hover:bg-red-700"
                                                onClick={() => remove(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />{" "}
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Pagination footer (moved to bottom) */}
                    <div className="flex items-center justify-between mt-6">
                        <div className="text-sm text-gray-600">
                            Showing {displayedItems.length} of {totalItems}{" "}
                            items
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Rows:</span>
                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(parseInt(e.target.value, 10));
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
                                        setPage((p) => Math.max(1, p - 1))
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
                                                        totalItems / pageSize
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
                                            Math.ceil(totalItems / pageSize)
                                        )
                                    }
                                    title="Next page"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {showTrash && (
                <Card className="border-red-200">
                    <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-red-700">
                                    Trash
                                </CardTitle>
                                <CardDescription className="text-red-600">
                                    Soft-deleted announcements. Restore or
                                    delete permanently.
                                </CardDescription>
                            </div>
                            <Button
                                variant="outline"
                                className="text-gray-700"
                                onClick={loadTrashed}
                            >
                                Refresh
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {trashed.length === 0 ? (
                            <div className="text-center py-8 text-red-700">
                                No items in Trash.
                            </div>
                        ) : (
                            <div className="divide-y divide-red-100">
                                {trashed.map((item) => (
                                    <div
                                        key={item.id}
                                        className="py-4 flex items-start justify-between gap-4"
                                    >
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {item.content}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Deleted at{" "}
                                                {new Date(
                                                    item.deleted_at
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                className="text-gray-700"
                                                onClick={async () => {
                                                    await announcementService.restore(
                                                        item.id
                                                    );
                                                    await load();
                                                    await loadTrashed();
                                                }}
                                            >
                                                <RotateCcw className="h-4 w-4 mr-2" />{" "}
                                                Restore
                                            </Button>
                                            <Button
                                                className="bg-red-600 hover:bg-red-700"
                                                onClick={async () => {
                                                    if (
                                                        confirm(
                                                            "Permanently delete this announcement?"
                                                        )
                                                    ) {
                                                        await announcementService.forceDelete(
                                                            item.id
                                                        );
                                                        await loadTrashed();
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />{" "}
                                                Delete Permanently
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

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
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Featured Image (optional)
                                    </label>
                                    <div className="mb-3">
                                        <label className="block text-xs text-gray-600 mb-1">
                                            Upload main image (max 1 image, 2MB)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0] || null;
                                                setForm({
                                                    ...form,
                                                    image: file,
                                                });
                                                if (imagePreviewUrl) {
                                                    URL.revokeObjectURL(
                                                        imagePreviewUrl
                                                    );
                                                }
                                                if (file) {
                                                    setImagePreviewUrl(
                                                        URL.createObjectURL(
                                                            file
                                                        )
                                                    );
                                                } else if (editing) {
                                                    // If editing and no new file selected, keep existing preview
                                                    setImagePreviewUrl(
                                                        editing.image_path
                                                            ? editing.image_path.startsWith(
                                                                  "http"
                                                              )
                                                                ? editing.image_path
                                                                : `/storage/${editing.image_path.replace(
                                                                      /^\/?storage\//,
                                                                      ""
                                                                  )}`
                                                            : ""
                                                    );
                                                } else {
                                                    setImagePreviewUrl("");
                                                }
                                            }}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        />
                                        {editing && !form.image && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Leave empty to keep current
                                                image
                                            </p>
                                        )}
                                    </div>

                                    {imagePreviewUrl && (
                                        <div className="mt-3 flex items-center gap-3">
                                            <img
                                                src={imagePreviewUrl}
                                                alt="Preview"
                                                className="w-16 h-16 rounded-lg object-cover border border-blue-100"
                                                onError={(e) => {
                                                    e.currentTarget.style.display =
                                                        "none";
                                                }}
                                            />
                                            <span className="text-xs text-blue-600">
                                                {form.image
                                                    ? "New image preview"
                                                    : "Current featured image"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Gallery Images (optional)
                                    </label>
                                    <div className="mb-3">
                                        <label className="block text-xs text-gray-600 mb-1">
                                            Upload multiple images (max 5
                                            images, 2MB each)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => {
                                                const files = Array.from(
                                                    e.target.files || []
                                                );
                                                setForm({
                                                    ...form,
                                                    images: files,
                                                });
                                            }}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>

                                    {form.images && form.images.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-xs text-blue-600 mb-2">
                                                {form.images.length} gallery
                                                image(s) selected
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {form.images.map(
                                                    (file, index) => (
                                                        <img
                                                            key={index}
                                                            src={URL.createObjectURL(
                                                                file
                                                            )}
                                                            alt={`Gallery ${
                                                                index + 1
                                                            }`}
                                                            className="w-12 h-12 rounded-lg object-cover border border-blue-100"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display =
                                                                    "none";
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        External Link (optional)
                                    </label>
                                    <input
                                        type="url"
                                        value={form.image_url}
                                        onChange={(e) => {
                                            const url = e.target.value;
                                            setForm({
                                                ...form,
                                                image_url: url,
                                            });
                                        }}
                                        placeholder="https://drive.google.com/... or any external link"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Link will be displayed below the image
                                        for users to view additional content
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
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
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="is_featured"
                                            type="checkbox"
                                            checked={!!form.is_featured}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    is_featured:
                                                        e.target.checked,
                                                })
                                            }
                                            className="h-4 w-4 text-royal-blue border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor="is_featured"
                                            className="text-sm text-gray-700"
                                        >
                                            Feature on Home page
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-royal-blue hover:bg-blue-700 text-white"
                                    >
                                        {editing ? "Save Changes" : "Create"}
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
