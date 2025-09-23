import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Modal from "../../components/Modal";
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
    ArrowUp,
    ArrowDown,
    Images,
    Trash,
    RotateCcw,
} from "lucide-react";
import { adminService } from "../../services/adminService";

const HeroCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [trashedSlides, setTrashedSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTrash, setShowTrash] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [creating, setCreating] = useState(false);
    const [createForm, setCreateForm] = useState({
        image: null,
        title: "",
        subtitle: "",
        description: "",
        cta_text: "",
        cta_link: "",
        is_active: true,
    });
    const [showEdit, setShowEdit] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [editingSlide, setEditingSlide] = useState(null);
    const [editForm, setEditForm] = useState({
        image: null,
        title: "",
        subtitle: "",
        description: "",
        cta_text: "",
        cta_link: "",
        is_active: true,
    });

    // UI/UX additions
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all"); // all|active|inactive
    const [sortKey, setSortKey] = useState("order"); // order|title|status
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [toast, setToast] = useState("");
    const [togglingId, setTogglingId] = useState(null);

    // Fetch slides on component mount
    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            setLoading(true);
            const data = await adminService.heroCarousel.getAll();
            setSlides(data);
        } catch (error) {
            setError("Failed to fetch slides");
            console.error("Error fetching slides:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTrashedSlides = async () => {
        try {
            const data = await adminService.heroCarousel.getTrashed();
            setTrashedSlides(data);
        } catch (error) {
            setError("Failed to fetch trashed slides");
            console.error("Error fetching trashed slides:", error);
        }
    };

    const handleDelete = async (id) => {
        if (
            window.confirm("Are you sure you want to move this slide to trash?")
        ) {
            try {
                await adminService.heroCarousel.delete(id);
                setSlides(slides.filter((slide) => slide.id !== id));
                if (!showTrash) setShowTrash(true);
                await fetchTrashedSlides();
                setError(null);
            } catch (error) {
                setError("Failed to delete slide");
                console.error("Error deleting slide:", error);
            }
        }
    };

    const handleRestore = async (id) => {
        try {
            await adminService.heroCarousel.restore(id);
            setTrashedSlides(trashedSlides.filter((slide) => slide.id !== id));
            fetchSlides(); // Refresh the main list
            setError(null);
        } catch (error) {
            setError("Failed to restore slide");
            console.error("Error restoring slide:", error);
        }
    };

    const handleForceDelete = async (id) => {
        if (
            window.confirm(
                "Are you sure you want to permanently delete this slide? This action cannot be undone."
            )
        ) {
            try {
                await adminService.heroCarousel.forceDelete(id);
                setTrashedSlides(
                    trashedSlides.filter((slide) => slide.id !== id)
                );
                setError(null);
            } catch (error) {
                setError("Failed to permanently delete slide");
                console.error("Error permanently deleting slide:", error);
            }
        }
    };

    const handleToggleActive = async (slide) => {
        try {
            setTogglingId(slide.id);
            const updatedSlide = await adminService.heroCarousel.update(
                slide.id,
                {
                    ...slide,
                    is_active: !slide.is_active,
                }
            );
            setSlides(
                slides.map((s) => (s.id === slide.id ? updatedSlide.data : s))
            );
            setToast(
                !slide.is_active ? "Slide activated" : "Slide deactivated"
            );
            setTimeout(() => setToast(""), 2500);
        } catch (error) {
            setError("Failed to update slide");
            console.error("Error updating slide:", error);
        } finally {
            setTogglingId(null);
        }
    };

    const moveSlide = async (slide, direction) => {
        const currentIndex = slides.findIndex((s) => s.id === slide.id);
        const newIndex =
            direction === "up" ? currentIndex - 1 : currentIndex + 1;

        if (newIndex < 0 || newIndex >= slides.length) return;

        const newOrder = [...slides];
        [newOrder[currentIndex], newOrder[newIndex]] = [
            newOrder[newIndex],
            newOrder[currentIndex],
        ];

        // Update display orders
        newOrder.forEach((s, index) => {
            s.display_order = index + 1;
        });

        setSlides(newOrder);

        // Update in database
        try {
            await adminService.heroCarousel.update(slide.id, {
                ...slide,
                display_order: newOrder[currentIndex].display_order,
            });
        } catch (error) {
            console.error("Error updating slide order:", error);
            fetchSlides(); // Revert on error
        }
    };

    const openEdit = (slide) => {
        setEditingSlide(slide);
        setEditForm({
            image: null,
            title: slide.title || "",
            subtitle: slide.subtitle || "",
            description: slide.description || "",
            cta_text: slide.cta_text || "",
            cta_link: slide.cta_link || "",
            is_active: !!slide.is_active,
        });
        setShowEdit(true);
    };

    const submitEdit = async () => {
        if (!editingSlide) return;
        try {
            setUpdating(true);
            const res = await adminService.heroCarousel.update(
                editingSlide.id,
                editForm
            );
            if (res?.data) {
                setSlides(
                    slides.map((s) => (s.id === editingSlide.id ? res.data : s))
                );
            } else {
                await fetchSlides();
            }
            setShowEdit(false);
            setEditingSlide(null);
            setEditForm({
                image: null,
                title: "",
                subtitle: "",
                description: "",
                cta_text: "",
                cta_link: "",
                is_active: true,
            });
            setError(null);
        } catch (error) {
            console.error("Error updating slide:", error);
            setError("Failed to update slide");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-6 border rounded-2xl"
                    >
                        <div className="flex items-center space-x-6">
                            {/* Reorder buttons placeholder */}
                            <div className="flex flex-col space-y-2">
                                <div className="h-8 w-8 rounded bg-gray-100 animate-pulse" />
                                <div className="h-8 w-8 rounded bg-gray-100 animate-pulse" />
                            </div>
                            {/* Thumbnail placeholder */}
                            <div className="w-20 h-16 rounded-xl bg-gray-100 animate-pulse" />
                            {/* Text placeholder */}
                            <div className="space-y-2">
                                <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
                                <div className="h-3 w-64 bg-gray-100 rounded animate-pulse" />
                                <div className="h-3 w-40 bg-gray-100 rounded animate-pulse" />
                            </div>
                        </div>
                        {/* Actions placeholder */}
                        <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 rounded bg-gray-100 animate-pulse" />
                            <div className="h-10 w-10 rounded bg-gray-100 animate-pulse" />
                            <div className="h-10 w-10 rounded bg-gray-100 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const submitCreate = async () => {
        try {
            setCreating(true);
            const res = await adminService.heroCarousel.create(createForm);
            if (res?.data) {
                setSlides(
                    [...slides, res.data].sort(
                        (a, b) =>
                            (a.display_order || 0) - (b.display_order || 0)
                    )
                );
            } else {
                // fallback: refetch
                fetchSlides();
            }
            setShowCreate(false);
            setCreateForm({
                image: null,
                title: "",
                subtitle: "",
                description: "",
                cta_text: "",
                cta_link: "",
                is_active: true,
            });
        } catch (e) {
            console.error("Error creating slide:", e);
            setError("Failed to create slide");
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Enhanced Header (aligned with public royal-blue) */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl px-6 py-4 text-white shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center">
                            <Images className="mr-3 h-6 w-6" />
                            Hero Carousel Management
                        </h1>
                        <p className="text-blue-100 text-sm">
                            Manage the hero carousel slides on your homepage
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="text-right">
                            <div className="text-xl font-semibold">
                                {slides.length}{" "}
                                {slides.length === 1 ? "Slide" : "Slides"}
                            </div>
                            <div className="text-blue-100 text-sm">
                                {
                                    slides.filter((slide) => slide.is_active)
                                        .length
                                }{" "}
                                Active
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center text-xl text-royal-blue">
                                    <Images className="mr-2 h-5 w-5 text-royal-blue" />
                                    All Slides
                                </CardTitle>
                                <CardDescription className="text-base text-blue-700">
                                    Create and manage hero carousel slides for
                                    your homepage
                                </CardDescription>
                            </div>
                            <div className="flex space-x-3">
                                <Button
                                    onClick={() => {
                                        setShowTrash(!showTrash);
                                        if (!showTrash) {
                                            fetchTrashedSlides();
                                        }
                                    }}
                                    variant="outline"
                                    className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white"
                                >
                                    <Trash className="mr-2 h-4 w-4" />
                                    {showTrash ? "Hide Trash" : "View Trash"}
                                </Button>
                                <Button
                                    onClick={() => setShowCreate(true)}
                                    className="bg-royal-blue hover:bg-blue-700 text-white"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add New Slide
                                </Button>
                            </div>
                        </div>
                        {/* Toolbar: search, filters, sort */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                            <div className="lg:col-span-5">
                                <div className="relative">
                                    <input
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder="Search title, subtitle or CTA..."
                                        className="w-full pl-3 pr-3 py-2 rounded-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-3 flex items-center gap-2">
                                <select
                                    value={activeFilter}
                                    onChange={(e) => {
                                        setActiveFilter(e.target.value);
                                        setPage(1);
                                    }}
                                    className="w-40 rounded-lg border border-blue-100 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                                >
                                    <option value="all">All</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="lg:col-span-4 flex items-center gap-2 justify-end">
                                <span className="text-sm text-gray-600">
                                    Sort by:
                                </span>
                                <select
                                    value={sortKey}
                                    onChange={(e) => {
                                        setSortKey(e.target.value);
                                        setPage(1);
                                    }}
                                    className="w-40 rounded-lg border border-blue-100 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                                >
                                    <option value="order">Display order</option>
                                    <option value="title">Title A–Z</option>
                                    <option value="status">Status</option>
                                </select>
                                {(query ||
                                    activeFilter !== "all" ||
                                    sortKey !== "order") && (
                                    <Button
                                        variant="outline"
                                        className="text-gray-700"
                                        onClick={() => {
                                            setQuery("");
                                            setActiveFilter("all");
                                            setSortKey("order");
                                            setPage(1);
                                        }}
                                    >
                                        Clear filters
                                    </Button>
                                )}
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
                    {slides.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <div className="text-6xl mb-4">🖼️</div>
                            <p className="text-lg font-medium mb-2">
                                No slides found
                            </p>
                            <p className="mb-4">
                                Create your first hero carousel slide to get
                                started.
                            </p>
                            <Button asChild>
                                <Link to="/admin/hero-carousel/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create First Slide
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {slides
                                .filter((s) => {
                                    if (
                                        activeFilter === "active" &&
                                        !s.is_active
                                    )
                                        return false;
                                    if (
                                        activeFilter === "inactive" &&
                                        s.is_active
                                    )
                                        return false;
                                    if (!query.trim()) return true;
                                    const q = query.toLowerCase();
                                    return (
                                        (s.title || "")
                                            .toLowerCase()
                                            .includes(q) ||
                                        (s.subtitle || "")
                                            .toLowerCase()
                                            .includes(q) ||
                                        (s.cta_text || "")
                                            .toLowerCase()
                                            .includes(q)
                                    );
                                })
                                .sort((a, b) => {
                                    if (sortKey === "title")
                                        return (a.title || "").localeCompare(
                                            b.title || ""
                                        );
                                    if (sortKey === "status")
                                        return String(
                                            a.is_active
                                        ).localeCompare(String(b.is_active));
                                    return (
                                        (a.display_order || 0) -
                                        (b.display_order || 0)
                                    );
                                })
                                .slice(
                                    (page - 1) * pageSize,
                                    (page - 1) * pageSize + pageSize
                                )
                                .map((slide, index) => (
                                    <div
                                        key={slide.id}
                                        className="group flex items-center justify-between p-6 border rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 hover:shadow-md"
                                    >
                                        <div className="flex items-center space-x-6">
                                            {/* Reorder Controls */}
                                            <div className="flex flex-col space-y-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        moveSlide(slide, "up")
                                                    }
                                                    disabled={index === 0}
                                                    className="h-8 w-8 p-0 hover:bg-blue-100"
                                                >
                                                    <ArrowUp className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        moveSlide(slide, "down")
                                                    }
                                                    disabled={
                                                        index ===
                                                        slides.length - 1
                                                    }
                                                    className="h-8 w-8 p-0 hover:bg-blue-100"
                                                >
                                                    <ArrowDown className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            {/* Image Preview */}
                                            <div className="w-20 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
                                                {slide.image_path ? (
                                                    <img
                                                        src={slide.image_path}
                                                        alt={slide.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-gray-400 text-xs text-center">
                                                        <Images className="h-6 w-6 mx-auto mb-1" />
                                                        No Image
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h4 className="font-semibold text-gray-900 text-lg">
                                                        {slide.title}
                                                    </h4>
                                                    <span
                                                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                                                            slide.is_active
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {slide.is_active
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-2">
                                                    {slide.subtitle}
                                                </p>
                                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                    <span className="flex items-center">
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                        Order:{" "}
                                                        {slide.display_order}
                                                    </span>
                                                    {slide.cta_text && (
                                                        <span className="flex items-center">
                                                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                                            CTA:{" "}
                                                            {slide.cta_text}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleToggleActive(slide)
                                                }
                                                className="h-10 w-10 p-0 hover:bg-green-100"
                                                title={
                                                    slide.is_active
                                                        ? "Deactivate"
                                                        : "Activate"
                                                }
                                            >
                                                {togglingId === slide.id ? (
                                                    <span className="text-xs text-gray-400">
                                                        ...
                                                    </span>
                                                ) : slide.is_active ? (
                                                    <EyeOff className="h-4 w-4 text-green-600" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-gray-600" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEdit(slide)}
                                                className="h-10 w-10 p-0 hover:bg-blue-100"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4 text-blue-600" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(slide.id)
                                                }
                                                className="h-10 w-10 p-0 hover:bg-red-100"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Trash Section */}
            {showTrash && (
                <Card className="shadow-lg border-red-200">
                    <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                        <CardTitle className="flex items-center text-xl text-red-700">
                            <Trash className="mr-2 h-5 w-5 text-red-700" />
                            Trashed Slides
                        </CardTitle>
                        <CardDescription className="text-base text-red-600">
                            Slides that have been moved to trash. You can
                            restore them or permanently delete them.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {trashedSlides.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <div className="text-4xl mb-2">🗑️</div>
                                <p className="text-lg font-medium mb-2">
                                    No trashed slides
                                </p>
                                <p>Deleted slides will appear here.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {trashedSlides.map((slide) => (
                                    <div
                                        key={slide.id}
                                        className="group flex items-center justify-between p-6 border border-red-200 rounded-2xl bg-red-50 hover:bg-red-100 transition-all duration-200"
                                    >
                                        <div className="flex items-center space-x-6">
                                            {/* Image Preview */}
                                            <div className="w-20 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
                                                {slide.image_path ? (
                                                    <img
                                                        src={slide.image_path}
                                                        alt={slide.title}
                                                        className="w-full h-full object-cover opacity-50"
                                                    />
                                                ) : (
                                                    <div className="text-gray-400 text-xs text-center">
                                                        <Images className="h-6 w-6 mx-auto mb-1" />
                                                        No Image
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h4 className="font-semibold text-gray-700 text-lg line-through">
                                                        {slide.title}
                                                    </h4>
                                                    <span className="px-3 py-1 text-xs rounded-full font-medium bg-red-100 text-red-800">
                                                        Trashed
                                                    </span>
                                                </div>
                                                <p className="text-gray-500 mb-2 line-through">
                                                    {slide.subtitle}
                                                </p>
                                                <div className="flex items-center space-x-6 text-sm text-gray-400">
                                                    <span className="flex items-center">
                                                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                                        Order:{" "}
                                                        {slide.display_order}
                                                    </span>
                                                    {slide.cta_text && (
                                                        <span className="flex items-center">
                                                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                                            CTA:{" "}
                                                            {slide.cta_text}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleRestore(slide.id)
                                                }
                                                className="h-10 w-10 p-0 hover:bg-green-100"
                                                title="Restore"
                                            >
                                                <RotateCcw className="h-4 w-4 text-green-600" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleForceDelete(slide.id)
                                                }
                                                className="h-10 w-10 p-0 hover:bg-red-100"
                                                title="Delete Permanently"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Create Slide Modal */}
            <CreateSlideModal
                open={showCreate}
                onOpenChange={setShowCreate}
                onSubmit={submitCreate}
                creating={creating}
                form={createForm}
                setForm={setCreateForm}
            />

            {/* Edit Slide Modal */}
            <EditSlideModal
                open={showEdit}
                onOpenChange={setShowEdit}
                onSubmit={submitEdit}
                updating={updating}
                form={editForm}
                setForm={setEditForm}
                slide={editingSlide}
            />
        </div>
    );
};

// Create Slide Modal UI
const CreateSlideModal = ({
    open,
    onOpenChange,
    onSubmit,
    creating,
    form,
    setForm,
}) => {
    return (
        <Modal show={open} onClose={() => onOpenChange(false)} maxWidth="lg">
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Create New Slide</h3>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Upload Image
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full text-sm text-gray-700"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    image: e.target.files?.[0] || null,
                                })
                            }
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Title (optional)
                            </label>
                            <input
                                id="title"
                                className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="subtitle"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Subtitle (optional)
                            </label>
                            <input
                                id="subtitle"
                                className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                value={form.subtitle}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        subtitle: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="cta_text"
                                className="block text-sm font-medium text-gray-700"
                            >
                                CTA Text (optional)
                            </label>
                            <input
                                id="cta_text"
                                className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                value={form.cta_text}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        cta_text: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="cta_link"
                                className="block text-sm font-medium text-gray-700"
                            >
                                CTA Link (optional)
                            </label>
                            <input
                                id="cta_link"
                                className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                value={form.cta_link}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        cta_link: e.target.value,
                                    })
                                }
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        disabled={creating || !form.image}
                        className="bg-royal-blue hover:bg-blue-700 text-white"
                    >
                        {creating ? "Creating..." : "Create"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

// Edit Slide Modal UI
const EditSlideModal = ({
    open,
    onOpenChange,
    onSubmit,
    updating,
    form,
    setForm,
}) => {
    return (
        <Modal show={open} onClose={() => onOpenChange(false)} maxWidth="lg">
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Edit Slide</h3>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Replace Image (optional)
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full text-sm text-gray-700"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    image: e.target.files?.[0] || null,
                                })
                            }
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Title
                            </label>
                            <input
                                id="title"
                                className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="subtitle"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Subtitle
                            </label>
                            <input
                                id="subtitle"
                                className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                value={form.subtitle}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        subtitle: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="cta_text"
                                className="block text-sm font-medium text-gray-700"
                            >
                                CTA Text
                            </label>
                            <input
                                id="cta_text"
                                className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                value={form.cta_text}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        cta_text: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="cta_link"
                                className="block text-sm font-medium text-gray-700"
                            >
                                CTA Link
                            </label>
                            <input
                                id="cta_link"
                                className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                value={form.cta_link}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        cta_link: e.target.value,
                                    })
                                }
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        disabled={updating}
                        className="bg-royal-blue hover:bg-blue-700 text-white"
                    >
                        {updating ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default HeroCarousel;
