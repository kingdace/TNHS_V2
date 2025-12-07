import React, { useEffect, useMemo, useState } from "react";
import { adminService } from "../../services/adminService";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import {
    Calendar,
    Plus,
    X,
    Loader2,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Search,
    Filter,
    Star,
    MapPin,
    Clock,
    Image as ImageIcon,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const EVENT_TYPES = [
    { value: "academic", label: "Academic" },
    { value: "exam", label: "Exam" },
    { value: "sports", label: "Sports" },
    { value: "cultural", label: "Cultural" },
    { value: "meeting", label: "Meeting" },
];

function formatYearMonth(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
    )}`;
}

export default function AdminEvents() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [activeTab, setActiveTab] = useState("all"); // all|active|inactive|featured

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(null); // event object or null
    const [form, setForm] = useState({
        title: "",
        event_type: "exam",
        start_date: "",
        end_date: "",
        location: "",
        description: "",
        excerpt: "",
        is_featured: false,
        is_public: true,
        slug: "",
        is_active: true,
        image: null,
    });

    const monthLabel = useMemo(
        () =>
            currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
            }),
        [currentMonth]
    );

    async function load() {
        try {
            setLoading(true);
            const filters = {
                month: formatYearMonth(currentMonth),
            };
            if (type) filters.types = type;
            if (search) filters.search = search;
            // Load all events, we'll filter client-side by tab
            const res = await adminService.events.getAll(filters);
            setRows(res.data || []);
        } catch (e) {
            console.error("Failed to load events", e);
            setRows([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMonth, type]);

    function prevMonth() {
        const d = new Date(currentMonth);
        d.setMonth(d.getMonth() - 1);
        setCurrentMonth(d);
    }

    function nextMonth() {
        const d = new Date(currentMonth);
        d.setMonth(d.getMonth() + 1);
        setCurrentMonth(d);
    }

    function openCreate() {
        setEditing(null);
        setForm({
            title: "",
            event_type: "exam",
            start_date: "",
            end_date: "",
            location: "",
            description: "",
            excerpt: "",
            is_featured: false,
            is_public: true,
            slug: "",
            is_active: true,
        });
        setIsModalOpen(true);
    }

    function openEdit(row) {
        setEditing(row);
        setForm({
            title: row.title || "",
            event_type: row.event_type || "exam",
            start_date: row.start_date_for_form || "",
            end_date: row.end_date_for_form || "",
            location: row.location || "",
            description: row.description || "",
            excerpt: row.excerpt || "",
            is_featured: !!row.is_featured,
            is_public: row.is_public !== undefined ? !!row.is_public : true,
            slug: row.slug || "",
            is_active: !!row.is_active,
            image: null, // For file uploads
        });
        setIsModalOpen(true);
    }

    async function onSave(e) {
        e.preventDefault();
        try {
            setSaving(true);
            const payload = { ...form };
            // Ensure booleans
            payload.is_active = !!payload.is_active;

            // Auto-generate slug if empty
            if (!payload.slug && payload.title) {
                payload.slug = payload.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "");
            }

            if (editing) await adminService.events.update(editing.id, payload);
            else await adminService.events.create(payload);
            setIsModalOpen(false);
            await load();
        } catch (err) {
            console.error("Save failed", err);
        } finally {
            setSaving(false);
        }
    }

    async function onDelete(row) {
        if (!confirm("Delete this event?")) return;
        try {
            await adminService.events.delete(row.id);
            await load();
        } catch (e) {
            console.error("Delete failed", e);
        }
    }

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

    // Format event date for display
    const formatEventDate = (startDate, endDate) => {
        // Handle timezone properly - assume dates are in app timezone (Asia/Ulaanbaatar UTC+8)
        const startStr = startDate.replace(" ", "T"); // Convert to ISO format if needed
        const endStr = endDate ? endDate.replace(" ", "T") : null;

        const start = new Date(
            startStr +
                (startStr.includes("T") && !startStr.includes("+")
                    ? "+08:00"
                    : "")
        );
        const end = endStr
            ? new Date(
                  endStr +
                      (endStr.includes("T") && !endStr.includes("+")
                          ? "+08:00"
                          : "")
              )
            : null;

        if (!end || start.toDateString() === end.toDateString()) {
            // Single day event
            return start.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
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

    // Calculate status counts
    const activeCount = rows.filter((e) => e.is_active).length;
    const inactiveCount = rows.filter((e) => !e.is_active).length;
    const featuredCount = rows.filter((e) => e.is_featured).length;

    // Filter events by active tab
    const filteredRows = rows.filter((event) => {
        if (activeTab === "active") return event.is_active;
        if (activeTab === "inactive") return !event.is_active;
        if (activeTab === "featured") return event.is_featured;
        return true; // 'all' tab
    });

    // Smart sorting: active events first when viewing "all"
    const sortedRows = [...filteredRows].sort((a, b) => {
        if (activeTab === "all") {
            // Prioritize active events
            if (a.is_active !== b.is_active) {
                return a.is_active ? -1 : 1;
            }
        }
        // Then sort by start date (newest first)
        return new Date(b.start_date) - new Date(a.start_date);
    });

    return (
        <div className="space-y-6">
            <Card className="border-none shadow-xl">
                <CardHeader className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white pb-4">
                    <div className="space-y-3">
                        {/* Title and Create Button */}
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-white text-2xl font-bold drop-shadow-sm">
                                    📅 School Events & Activities
                                </CardTitle>
                                <CardDescription className="text-blue-100 mt-1 text-sm">
                                    Manage school events and calendar activities
                                </CardDescription>
                            </div>
                            <Button
                                className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all font-semibold"
                                onClick={openCreate}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create Event
                            </Button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-1">
                            {[
                                {
                                    id: "all",
                                    label: "All",
                                    count: rows.length,
                                    color: "blue",
                                },
                                {
                                    id: "active",
                                    label: "Active",
                                    count: activeCount,
                                    color: "green",
                                },
                                {
                                    id: "inactive",
                                    label: "Inactive",
                                    count: inactiveCount,
                                    color: "gray",
                                },
                                {
                                    id: "featured",
                                    label: "Featured",
                                    count: featuredCount,
                                    color: "yellow",
                                },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
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
                                                : tab.color === "green"
                                                ? activeTab === tab.id
                                                    ? "#059669"
                                                    : "#10b981"
                                                : tab.color === "gray"
                                                ? activeTab === tab.id
                                                    ? "#4b5563"
                                                    : "#6b7280"
                                                : activeTab === tab.id
                                                ? "#d97706"
                                                : "#f59e0b",
                                    }}
                                >
                                    {tab.label}
                                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-white/30 text-white">
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Filters */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                            {/* Search */}
                            <div className="lg:col-span-5">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search events..."
                                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                                    />
                                </div>
                            </div>
                            {/* Event Type Filter */}
                            <div className="lg:col-span-4 flex items-center gap-2">
                                <Filter className="h-4 w-4 text-gray-400" />
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="flex-1 rounded-lg border border-blue-100 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                                >
                                    <option value="">All types</option>
                                    {EVENT_TYPES.map((t) => (
                                        <option key={t.value} value={t.value}>
                                            {t.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Month Navigation */}
                            <div className="lg:col-span-3 flex items-center gap-1">
                                <Button
                                    variant="outline"
                                    className="text-gray-700 px-2 py-2"
                                    onClick={prevMonth}
                                    title="Previous month"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-medium text-gray-700 px-2 min-w-[100px] text-center">
                                    {monthLabel}
                                </span>
                                <Button
                                    variant="outline"
                                    className="text-gray-700 px-2 py-2"
                                    onClick={nextMonth}
                                    title="Next month"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
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
                                    <div className="w-48 flex items-center gap-2">
                                        <div className="h-8 w-16 bg-gray-100 rounded animate-pulse" />
                                        <div className="h-8 w-16 bg-gray-100 rounded animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : sortedRows.length === 0 ? (
                        <div className="text-center py-12 text-blue-700">
                            <Calendar className="h-12 w-12 mx-auto mb-4 text-royal-blue/40" />
                            <p className="text-lg font-medium mb-2">
                                {activeTab === "all" &&
                                    `No events found for ${monthLabel.toLowerCase()}`}
                                {activeTab === "active" && "No active events"}
                                {activeTab === "inactive" &&
                                    "No inactive events"}
                                {activeTab === "featured" &&
                                    "No featured events"}
                            </p>
                            <p className="text-sm text-gray-600">
                                {search || type
                                    ? "Try adjusting your filters"
                                    : "Create a new event to get started"}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-blue-100">
                            {sortedRows.map((event) => (
                                <div key={event.id} className="py-4">
                                    <div className="group flex items-start gap-4 p-3 rounded-lg transition-colors hover:bg-blue-50/50 hover:shadow-sm">
                                        {/* Thumbnail */}
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-blue-100">
                                            {event.image_path ? (
                                                <img
                                                    src={(() => {
                                                        const p =
                                                            event.image_path ||
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
                                                        const cleaned =
                                                            p.replace(
                                                                /^\/?storage\//,
                                                                ""
                                                            );
                                                        return `/storage/${cleaned}`;
                                                    })()}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) =>
                                                        (e.currentTarget.style.display =
                                                            "none")
                                                    }
                                                />
                                            ) : (
                                                <>
                                                    <img
                                                        src="/images/announcement.png"
                                                        alt="Event"
                                                        className="w-full h-full object-cover opacity-80"
                                                        onError={(e) => {
                                                            // Fallback to icon if image fails
                                                            e.currentTarget.style.display =
                                                                "none";
                                                            e.currentTarget.nextElementSibling.style.display =
                                                                "block";
                                                        }}
                                                    />
                                                    <Calendar className="h-5 w-5 text-gray-400 hidden" />
                                                </>
                                            )}
                                        </div>
                                        {/* Main content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                {event.is_featured && (
                                                    <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-royal-blue/10 text-royal-blue border border-royal-blue/20">
                                                        <Star className="h-3 w-3 mr-1" />{" "}
                                                        Featured
                                                    </span>
                                                )}
                                                {event.is_public && (
                                                    <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                                                        <Eye className="h-3 w-3 mr-1" />{" "}
                                                        Public
                                                    </span>
                                                )}
                                                <span
                                                    className={`text-[11px] px-2 py-0.5 rounded-full border ${getEventTypeColor(
                                                        event.event_type
                                                    )}`}
                                                >
                                                    {event.event_type
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        event.event_type.slice(
                                                            1
                                                        )}
                                                </span>
                                                <span
                                                    className={`text-[11px] px-2 py-0.5 rounded-full border ${
                                                        event.is_active
                                                            ? "bg-green-50 text-green-700 border-green-200"
                                                            : "bg-gray-100 text-gray-700 border-gray-200"
                                                    }`}
                                                >
                                                    {event.is_active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-semibold text-gray-900 truncate">
                                                {event.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    <span>
                                                        {formatEventDate(
                                                            event.start_date,
                                                            event.end_date
                                                        )}
                                                    </span>
                                                </div>
                                                {event.location && (
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        <span>
                                                            {event.location}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            {event.excerpt && (
                                                <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                                                    {event.excerpt}
                                                </p>
                                            )}
                                        </div>
                                        {/* Actions */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <Button
                                                variant="outline"
                                                className="text-gray-700"
                                                onClick={() => openEdit(event)}
                                            >
                                                <Edit className="h-4 w-4 mr-2" />
                                                Edit
                                            </Button>
                                            <Button
                                                className="bg-red-600 hover:bg-red-700"
                                                onClick={() => onDelete(event)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Pagination footer */}
                    <div className="flex items-center justify-between mt-6">
                        <div className="text-sm text-gray-600">
                            Showing {sortedRows.length} events for{" "}
                            {monthLabel.toLowerCase()}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-xl mx-4 max-h-[90vh] flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b">
                            <h3 className="font-semibold text-lg">
                                {editing ? "Edit Event" : "Create Event"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5">
                            <form onSubmit={onSave} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
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
                                        className="w-full border rounded-md px-3 py-2"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Type
                                        </label>
                                        <select
                                            value={form.event_type}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    event_type: e.target.value,
                                                })
                                            }
                                            className="w-full border rounded-md px-3 py-2"
                                        >
                                            {EVENT_TYPES.map((t) => (
                                                <option
                                                    key={t.value}
                                                    value={t.value}
                                                >
                                                    {t.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2 mt-6 md:mt-0">
                                        <input
                                            id="active"
                                            type="checkbox"
                                            checked={form.is_active}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    is_active: e.target.checked,
                                                })
                                            }
                                        />
                                        <label
                                            htmlFor="active"
                                            className="text-sm"
                                        >
                                            Active
                                        </label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Start (date & time)
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={form.start_date}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    start_date: e.target.value,
                                                })
                                            }
                                            className="w-full border rounded-md px-3 py-2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            End (optional)
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={form.end_date}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    end_date: e.target.value,
                                                })
                                            }
                                            className="w-full border rounded-md px-3 py-2"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Location (optional)
                                    </label>
                                    <input
                                        value={form.location}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                location: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded-md px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Description (optional)
                                    </label>
                                    <textarea
                                        value={form.description}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded-md px-3 py-2"
                                        rows={4}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Excerpt (short preview for public page)
                                    </label>
                                    <textarea
                                        value={form.excerpt}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                excerpt: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded-md px-3 py-2"
                                        rows={2}
                                        placeholder="Brief summary for public display..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Slug (URL-friendly identifier)
                                    </label>
                                    <input
                                        value={form.slug}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                slug: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded-md px-3 py-2"
                                        placeholder="event-slug-name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Event Image (optional)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                image:
                                                    e.target.files[0] || null,
                                            })
                                        }
                                        className="w-full border rounded-md px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-royal-blue file:text-white hover:file:bg-blue-700"
                                    />
                                    {editing && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Leave empty to keep current image
                                        </p>
                                    )}
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
                                        />
                                        <span className="text-sm">
                                            Featured Event
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.is_public}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    is_public: e.target.checked,
                                                })
                                            }
                                        />
                                        <span className="text-sm">
                                            Show on Public Page
                                        </span>
                                    </label>
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 rounded-md border"
                                    >
                                        Cancel
                                    </button>
                                    <Button
                                        type="submit"
                                        className="bg-royal-blue text-white h-10 rounded-lg"
                                        disabled={saving}
                                    >
                                        {saving ? (
                                            <span className="inline-flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />{" "}
                                                Saving...
                                            </span>
                                        ) : (
                                            "Save"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
