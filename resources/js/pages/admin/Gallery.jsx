import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
    Plus,
    Search,
    Filter,
    Image as ImageIcon,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Star,
    Upload,
    X,
    Save,
    AlertCircle,
    Calendar,
    Tag,
    User,
    Grid3X3,
    List,
    Heart,
    Download,
} from "lucide-react";
import { adminService } from "../../services/adminService";
import AdminCommentSection from "../../components/gallery/AdminCommentSection";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [viewMode, setViewMode] = useState("grid");
    const [showForm, setShowForm] = useState(false);
    const [showBulkUpload, setShowBulkUpload] = useState(false);
    const [editingImage, setEditingImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "events",
        image: null,
        alt_text: "",
        tags: "",
        event_date: "",
        photographer: "",
        is_featured: false,
        is_active: true,
        display_order: 0,
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const categories = [
        { value: "all", label: "All Categories" },
        { value: "events", label: "School Events" },
        { value: "academic", label: "Academic Life" },
        { value: "sports", label: "Sports & Recreation" },
        { value: "arts", label: "Arts & Culture" },
        { value: "facilities", label: "Facilities & Campus" },
        { value: "community", label: "Community Engagement" },
    ];

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const response = await adminService.gallery.getAll();
            if (response.success) {
                setImages(response.data);
            }
        } catch (error) {
            console.error("Error fetching gallery images:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        try {
            // Validate required fields
            if (!formData.title.trim()) {
                setErrors({ title: ["Title is required"] });
                setSubmitting(false);
                return;
            }

            // Validate file for new images
            if (!editingImage && !formData.image) {
                setErrors({ image: ["Image is required for new entries"] });
                setSubmitting(false);
                return;
            }

            // Validate file size if image is provided
            if (formData.image) {
                const maxSize = 10 * 1024 * 1024; // 10MB
                if (formData.image.size > maxSize) {
                    setErrors({
                        image: [
                            `File size must be less than 10MB. Current size: ${(
                                formData.image.size /
                                1024 /
                                1024
                            ).toFixed(2)}MB`,
                        ],
                    });
                    setSubmitting(false);
                    return;
                }

                // Validate file type
                const allowedTypes = [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                ];
                if (!allowedTypes.includes(formData.image.type)) {
                    setErrors({
                        image: [
                            "Please select a valid image file (JPEG, PNG, GIF, or WebP)",
                        ],
                    });
                    setSubmitting(false);
                    return;
                }
            }

            const form = new FormData();

            // Add all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    if (key === "image" && !value) {
                        // Skip empty image field for updates
                        return;
                    }
                    if (typeof value === "boolean") {
                        form.append(key, value ? "1" : "0");
                    } else if (value !== "") {
                        form.append(key, value);
                    }
                }
            });

            let response;
            if (editingImage) {
                console.log("Attempting to update image:", editingImage.id);
                console.log(
                    "Form data being sent:",
                    Array.from(form.entries())
                );
                response = await adminService.gallery.update(
                    editingImage.id,
                    form
                );
            } else {
                console.log("Attempting to create new image");
                console.log(
                    "Form data being sent:",
                    Array.from(form.entries())
                );
                response = await adminService.gallery.create(form);
            }

            console.log("Submit response:", response);

            if (response && response.success) {
                console.log("Operation successful, refreshing images...");
                await fetchImages();
                resetForm();
                setShowForm(false);
            } else {
                console.error("Operation failed:", response);
                if (response && response.errors) {
                    setErrors(response.errors);
                } else {
                    setErrors({
                        general:
                            response?.message ||
                            `Failed to ${
                                editingImage ? "update" : "create"
                            } image`,
                    });
                }
            }
        } catch (error) {
            console.error("Error saving image:", error);
            setErrors({
                general:
                    `Failed to ${editingImage ? "update" : "create"} image: ` +
                    error.message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (image) => {
        setEditingImage(image);

        // Format date for HTML date input (yyyy-MM-dd)
        let formattedDate = "";
        if (image.event_date) {
            try {
                // Handle both ISO format and simple date format
                const date = new Date(image.event_date);
                if (!isNaN(date.getTime())) {
                    formattedDate = date.toISOString().split("T")[0];
                }
            } catch (error) {
                console.warn("Error formatting date:", error);
                formattedDate = "";
            }
        }

        setFormData({
            title: image.title,
            description: image.description || "",
            category: image.category,
            image: null,
            alt_text: image.alt_text || "",
            tags: image.tags ? image.tags.join(", ") : "",
            event_date: formattedDate,
            photographer: image.photographer || "",
            is_featured: image.is_featured,
            is_active: image.is_active,
            display_order: image.display_order,
        });
        setShowForm(true);
    };

    const handleDelete = (image) => {
        setDeleteConfirm(image);
    };

    const confirmDelete = async () => {
        if (!deleteConfirm) return;

        setDeleting(true);
        try {
            console.log("Attempting to delete image:", deleteConfirm.id);
            const response = await adminService.gallery.delete(
                deleteConfirm.id
            );
            console.log("Delete response:", response);

            if (response && response.success) {
                console.log("Delete successful, refreshing images...");
                await fetchImages();
                setDeleteConfirm(null);
            } else {
                console.error("Delete failed:", response?.message);
                alert(`Delete failed: ${response?.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error deleting image:", error);
            alert(`Error deleting image: ${error.message}`);
        } finally {
            setDeleting(false);
        }
    };

    const handleToggleActive = async (image) => {
        try {
            await adminService.gallery.toggleActive(image.id);
            await fetchImages();
        } catch (error) {
            console.error("Error toggling image status:", error);
        }
    };

    const handleToggleFeatured = async (image) => {
        try {
            await adminService.gallery.toggleFeatured(image.id);
            await fetchImages();
        } catch (error) {
            console.error("Error toggling featured status:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            category: "events",
            image: null,
            alt_text: "",
            tags: "",
            event_date: "",
            photographer: "",
            is_featured: false,
            is_active: true,
            display_order: 0,
        });
        setEditingImage(null);
        setErrors({});
    };

    const filteredImages = images.filter((image) => {
        const matchesSearch =
            image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (image.description &&
                image.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()));
        const matchesCategory =
            selectedCategory === "all" || image.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Gallery Management
                    </h1>
                    <p className="text-gray-600">
                        Manage school photos and images
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={() => setShowBulkUpload(true)}
                        variant="outline"
                        className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Bulk Upload
                    </Button>
                    <Button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="bg-royal-blue hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Image
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search images..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="lg:w-48">
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                            >
                                {categories.map((category) => (
                                    <option
                                        key={category.value}
                                        value={category.value}
                                    >
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg transition-colors ${
                                    viewMode === "grid"
                                        ? "bg-royal-blue text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-lg transition-colors ${
                                    viewMode === "list"
                                        ? "bg-royal-blue text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Results Count */}
            <div className="flex justify-between items-center">
                <p className="text-gray-600">
                    Showing {filteredImages.length} of {images.length} images
                    {searchTerm && ` for "${searchTerm}"`}
                    {selectedCategory !== "all" &&
                        ` in ${
                            categories.find((c) => c.value === selectedCategory)
                                ?.label
                        }`}
                </p>
            </div>
            {/* Images Grid/List */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading images...</p>
                </div>
            ) : filteredImages.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No images found
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm || selectedCategory !== "all"
                                ? "Try adjusting your search or filter"
                                : "Get started by adding your first image"}
                        </p>
                        <Button
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                            className="bg-royal-blue hover:bg-blue-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add First Image
                        </Button>
                    </CardContent>
                </Card>
            ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredImages.map((image) => (
                        <Card
                            key={image.id}
                            className="overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="relative">
                                <img
                                    src={image.thumbnail_url || image.image_url}
                                    alt={image.alt_text || image.title}
                                    className="w-full h-48 object-cover cursor-pointer"
                                    onClick={() => setSelectedImage(image)}
                                />
                                <div className="absolute top-2 left-2 flex gap-1">
                                    {image.is_featured && (
                                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                            <Star className="w-3 h-3 inline mr-1" />
                                            Featured
                                        </span>
                                    )}
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            image.is_active
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-1000 text-white"
                                        }`}
                                    >
                                        {image.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                        {image.category_label}
                                    </span>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                                    {image.title}
                                </h3>
                                {image.description && (
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                        {image.description}
                                    </p>
                                )}
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {image.view_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Heart className="w-3 h-3" />
                                        {image.like_count}
                                    </span>
                                    {image.event_date && (
                                        <span>
                                            {new Date(
                                                image.event_date
                                            ).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleToggleFeatured(image)
                                        }
                                        className="flex-1"
                                    >
                                        <Star className="w-3 h-3" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleToggleActive(image)
                                        }
                                        className="flex-1"
                                    >
                                        {image.is_active ? (
                                            <EyeOff className="w-3 h-3" />
                                        ) : (
                                            <Eye className="w-3 h-3" />
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(image)}
                                        className="flex-1"
                                    >
                                        <Edit className="w-3 h-3" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(image)}
                                        className="flex-1 text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredImages.map((image) => (
                        <Card
                            key={image.id}
                            className="overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <CardContent className="p-0">
                                <div className="flex">
                                    <div className="w-32 h-32 flex-shrink-0">
                                        <img
                                            src={
                                                image.thumbnail_url ||
                                                image.image_url
                                            }
                                            alt={image.alt_text || image.title}
                                            className="w-full h-full object-cover cursor-pointer"
                                            onClick={() =>
                                                setSelectedImage(image)
                                            }
                                        />
                                    </div>
                                    <div className="flex-1 p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-gray-900">
                                                    {image.title}
                                                </h3>
                                                {image.is_featured && (
                                                    <Star className="w-4 h-4 text-yellow-500" />
                                                )}
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        image.is_active
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {image.is_active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                    {image.category_label}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleToggleFeatured(
                                                            image
                                                        )
                                                    }
                                                >
                                                    <Star className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleToggleActive(
                                                            image
                                                        )
                                                    }
                                                >
                                                    {image.is_active ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleEdit(image)
                                                    }
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(image)
                                                    }
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        {image.description && (
                                            <p className="text-gray-600 mb-2">
                                                {image.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                {image.view_count} views
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Heart className="w-4 h-4" />
                                                {image.like_count} likes
                                            </span>
                                            {image.event_date && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(
                                                        image.event_date
                                                    ).toLocaleDateString()}
                                                </span>
                                            )}
                                            {image.photographer && (
                                                <span className="flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    {image.photographer}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {/* Add/Edit Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">
                                    {editingImage
                                        ? "Edit Image"
                                        : "Add New Image"}
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowForm(false)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    title: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                            required
                                        />
                                        {errors.title && (
                                            <p className="text-red-600 text-sm mt-1">
                                                {errors.title[0]}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Category *
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    category: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                            required
                                        >
                                            {categories
                                                .filter(
                                                    (cat) => cat.value !== "all"
                                                )
                                                .map((category) => (
                                                    <option
                                                        key={category.value}
                                                        value={category.value}
                                                    >
                                                        {category.label}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Event Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.event_date}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    event_date: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Image {!editingImage && "*"}
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const maxSize =
                                                        10 * 1024 * 1024;
                                                    if (file.size > maxSize) {
                                                        setErrors({
                                                            ...errors,
                                                            image: [
                                                                `File size must be less than 10MB. Current size: ${(
                                                                    file.size /
                                                                    1024 /
                                                                    1024
                                                                ).toFixed(
                                                                    2
                                                                )}MB`,
                                                            ],
                                                        });
                                                        e.target.value = "";
                                                        return;
                                                    } else {
                                                        const newErrors = {
                                                            ...errors,
                                                        };
                                                        delete newErrors.image;
                                                        setErrors(newErrors);
                                                    }
                                                }
                                                setFormData({
                                                    ...formData,
                                                    image: file,
                                                });
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                            required={!editingImage}
                                        />
                                        {errors.image && (
                                            <p className="text-red-600 text-sm mt-1">
                                                {errors.image[0]}
                                            </p>
                                        )}
                                        <p className="text-gray-500 text-sm mt-1">
                                            Maximum file size: 10MB. Current
                                            file:{" "}
                                            {formData.image
                                                ? `${(
                                                      formData.image.size /
                                                      1024 /
                                                      1024
                                                  ).toFixed(2)}MB`
                                                : "None selected"}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Alt Text
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.alt_text}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    alt_text: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                            placeholder="Describe the image for accessibility"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Photographer
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.photographer}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    photographer:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tags (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.tags}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    tags: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                            placeholder="graduation, ceremony, students, achievement"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Display Order
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.display_order}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    display_order:
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                            min="0"
                                        />
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="is_featured"
                                                checked={formData.is_featured}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        is_featured:
                                                            e.target.checked,
                                                    })
                                                }
                                                className="h-4 w-4 text-royal-blue focus:ring-royal-blue border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor="is_featured"
                                                className="ml-2 block text-sm text-gray-900"
                                            >
                                                Featured
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="is_active"
                                                checked={formData.is_active}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        is_active:
                                                            e.target.checked,
                                                    })
                                                }
                                                className="h-4 w-4 text-royal-blue focus:ring-royal-blue border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor="is_active"
                                                className="ml-2 block text-sm text-gray-900"
                                            >
                                                Active
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {errors.general && (
                                    <div className="flex items-center gap-2 text-red-600 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.general}
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={submitting}
                                        className="bg-royal-blue hover:bg-blue-700"
                                    >
                                        {submitting ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        ) : (
                                            <Save className="w-4 h-4 mr-2" />
                                        )}
                                        {editingImage ? "Update" : "Create"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Delete Image
                                    </h3>
                                    <p className="text-gray-600">
                                        This action cannot be undone
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex gap-3">
                                    <img
                                        src={
                                            deleteConfirm.thumbnail_url ||
                                            deleteConfirm.image_url
                                        }
                                        alt={deleteConfirm.title}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {deleteConfirm.title}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {deleteConfirm.category_label}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this image? It
                                will be moved to trash and can be restored
                                later.
                            </p>

                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setDeleteConfirm(null)}
                                    disabled={deleting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={confirmDelete}
                                    disabled={deleting}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                    {deleting ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    ) : (
                                        <Trash2 className="w-4 h-4 mr-2" />
                                    )}
                                    Delete Image
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Preview Modal - Modern Design */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Modal Card */}
                    <div
                        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-4 border-transparent bg-gradient-to-br from-blue-50 via-white to-purple-50 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button - Inside Modal */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-20 p-2 bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transition-all hover:scale-110"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                            <style>{`
                                .custom-scrollbar::-webkit-scrollbar {
                                    width: 8px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-track {
                                    background: #E5E7EB;
                                    border-radius: 10px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb {
                                    background: #9CA3AF;
                                    border-radius: 10px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                    background: #6B7280;
                                }
                            `}</style>

                            {/* Image Container */}
                            <div className="bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                                <img
                                    src={selectedImage.image_url}
                                    alt={
                                        selectedImage.alt_text ||
                                        selectedImage.title
                                    }
                                    className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-xl relative z-10"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-bold uppercase shadow-md">
                                                {selectedImage.category_label}
                                            </span>
                                            {selectedImage.is_featured && (
                                                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                                                    <Star className="w-4 h-4 text-white fill-current" />
                                                    <span className="text-xs font-bold text-white">
                                                        Featured
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                                            {selectedImage.title}
                                        </h2>
                                        {selectedImage.description && (
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                {selectedImage.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div className="flex items-center gap-6 py-4 px-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 mb-4">
                                    {/* Views */}
                                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                                        <Eye className="w-5 h-5" />
                                        <span className="font-medium">
                                            {selectedImage.view_count}
                                        </span>
                                    </div>

                                    {/* Likes */}
                                    <div className="flex items-center gap-2 text-red-600 font-medium">
                                        <Heart className="w-5 h-5" />
                                        <span className="font-medium">
                                            {selectedImage.like_count}
                                        </span>
                                    </div>

                                    {/* Date */}
                                    {selectedImage.event_date && (
                                        <div className="flex items-center gap-2 text-purple-600 font-medium">
                                            <Calendar className="w-5 h-5" />
                                            <span className="text-sm">
                                                {new Date(
                                                    selectedImage.event_date
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}

                                    {/* Photographer */}
                                    {selectedImage.photographer && (
                                        <div className="flex items-center gap-2 text-green-600 font-medium ml-auto">
                                            <User className="w-5 h-5" />
                                            <span className="text-sm">
                                                {selectedImage.photographer}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Tags */}
                                {selectedImage.tags &&
                                    selectedImage.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {selectedImage.tags.map(
                                                (tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200"
                                                    >
                                                        #{tag}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>

                            {/* Comment Section */}
                            <div className="border-t border-gray-200">
                                <AdminCommentSection
                                    imageId={selectedImage.id}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Upload Modal */}
            {showBulkUpload && (
                <BulkUploadModal
                    onClose={() => setShowBulkUpload(false)}
                    onSuccess={() => {
                        setShowBulkUpload(false);
                        fetchImages();
                    }}
                    categories={categories.filter((cat) => cat.value !== "all")}
                />
            )}
        </div>
    );
};

// Bulk Upload Modal Component
const BulkUploadModal = ({ onClose, onSuccess, categories }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [formData, setFormData] = useState({
        title: "", // Will be used as prefix for auto-generated titles
        description: "",
        category: "events",
        alt_text: "", // Will be used as prefix for auto-generated alt text
        tags: "",
        event_date: "",
        photographer: "",
        is_featured: false,
        is_active: true,
        display_order: 0,
    });
    const [errors, setErrors] = useState({});

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = [];
        const newErrors = {};

        files.forEach((file, index) => {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                newErrors[`file_${index}`] = "Only image files are allowed";
                return;
            }

            // Validate file size (10MB max)
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                newErrors[
                    `file_${index}`
                ] = `File size must be less than 10MB. Current: ${(
                    file.size /
                    1024 /
                    1024
                ).toFixed(2)}MB`;
                return;
            }

            validFiles.push({
                file,
                id: Date.now() + index,
                name: file.name,
                size: file.size,
                preview: URL.createObjectURL(file),
                status: "pending",
            });
        });

        setSelectedFiles((prev) => [...prev, ...validFiles]);
        setErrors(newErrors);
    };

    const removeFile = (fileId) => {
        setSelectedFiles((prev) => {
            const updated = prev.filter((f) => f.id !== fileId);
            // Clean up object URL
            const fileToRemove = prev.find((f) => f.id === fileId);
            if (fileToRemove) {
                URL.revokeObjectURL(fileToRemove.preview);
            }
            return updated;
        });
    };

    const handleBulkUpload = async () => {
        if (selectedFiles.length === 0) {
            setErrors({ general: "Please select at least one image" });
            return;
        }

        setUploading(true);
        setErrors({});

        try {
            const form = new FormData();

            // Add files
            selectedFiles.forEach((fileObj) => {
                form.append("images[]", fileObj.file);
            });

            // Add metadata
            form.append("category", formData.category);
            if (formData.title) form.append("title", formData.title);
            if (formData.description)
                form.append("description", formData.description);
            if (formData.alt_text) form.append("alt_text", formData.alt_text);
            if (formData.tags) form.append("tags", formData.tags);
            if (formData.event_date)
                form.append("event_date", formData.event_date);
            if (formData.photographer)
                form.append("photographer", formData.photographer);
            form.append("is_featured", formData.is_featured ? "1" : "0");
            form.append("is_active", formData.is_active ? "1" : "0");
            form.append("display_order", formData.display_order.toString());

            const response = await adminService.gallery.bulkUpload(form);

            console.log("Bulk upload response:", response);

            if (response && response.success) {
                // Clean up object URLs
                selectedFiles.forEach((fileObj) => {
                    URL.revokeObjectURL(fileObj.preview);
                });

                // Show success message if there were any uploads
                if (response.data && response.data.length > 0) {
                    console.log(
                        `Successfully uploaded ${response.data.length} images`
                    );
                }

                // Show any errors for individual files
                if (response.errors && response.errors.length > 0) {
                    console.warn("Some files had errors:", response.errors);
                    setErrors({
                        general: `${response.data.length} images uploaded successfully. ${response.errors.length} files had errors.`,
                        details: response.errors,
                    });
                    // Still call onSuccess since some images were uploaded
                    setTimeout(() => onSuccess(), 2000);
                } else {
                    onSuccess();
                }
            } else {
                console.error("Bulk upload failed:", response);
                setErrors(
                    response?.errors || {
                        general: response?.message || "Upload failed",
                    }
                );
            }
        } catch (error) {
            console.error("Bulk upload error:", error);
            setErrors({ general: "Upload failed: " + error.message });
        } finally {
            setUploading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">
                            Bulk Upload Images
                        </h2>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* File Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Images
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-royal-blue transition-colors">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                                id="bulk-file-input"
                            />
                            <label
                                htmlFor="bulk-file-input"
                                className="cursor-pointer"
                            >
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-600">
                                    Click to select images or drag and drop
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Maximum 20 images, 10MB each
                                </p>
                            </label>
                        </div>
                    </div>

                    {/* Selected Files */}
                    {selectedFiles.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">
                                Selected Images ({selectedFiles.length})
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-60 overflow-y-auto">
                                {selectedFiles.map((fileObj) => (
                                    <div
                                        key={fileObj.id}
                                        className="relative group"
                                    >
                                        <img
                                            src={fileObj.preview}
                                            alt={fileObj.name}
                                            className="w-full h-24 object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() =>
                                                removeFile(fileObj.id)
                                            }
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
                                            <p className="truncate">
                                                {fileObj.name}
                                            </p>
                                            <p>
                                                {formatFileSize(fileObj.size)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Metadata Form */}
                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title Prefix
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                    placeholder="Optional prefix for all image titles (e.g., 'Graduation 2024')"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    If provided, will be used as: "Title Prefix
                                    - filename"
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                    placeholder="Description for all images (optional)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category *
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            category: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Event Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.event_date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            event_date: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Alt Text Prefix
                                </label>
                                <input
                                    type="text"
                                    value={formData.alt_text}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            alt_text: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                    placeholder="Alt text prefix for accessibility"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Photographer
                                </label>
                                <input
                                    type="text"
                                    value={formData.photographer}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            photographer: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                    placeholder="Photographer name"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tags (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            tags: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                    placeholder="graduation, ceremony, students, achievement"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Display Order Start
                                </label>
                                <input
                                    type="number"
                                    value={formData.display_order}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            display_order:
                                                parseInt(e.target.value) || 0,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                                    min="0"
                                />
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="bulk_is_featured"
                                        checked={formData.is_featured}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                is_featured: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 text-royal-blue focus:ring-royal-blue border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="bulk_is_featured"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Featured
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="bulk_is_active"
                                        checked={formData.is_active}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                is_active: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 text-royal-blue focus:ring-royal-blue border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="bulk_is_active"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Active
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            {Object.entries(errors).map(([key, error]) => (
                                <div key={key}>
                                    <p className="text-red-600 text-sm flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {Array.isArray(error)
                                            ? error[0]
                                            : error}
                                    </p>
                                    {key === "general" && errors.details && (
                                        <div className="mt-2 ml-6">
                                            {errors.details.map(
                                                (detail, index) => (
                                                    <p
                                                        key={index}
                                                        className="text-red-500 text-xs"
                                                    >
                                                        • {detail}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleBulkUpload}
                            disabled={uploading || selectedFiles.length === 0}
                            className="bg-royal-blue hover:bg-blue-700"
                        >
                            {uploading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            ) : (
                                <Upload className="w-4 h-4 mr-2" />
                            )}
                            Upload {selectedFiles.length} Images
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
