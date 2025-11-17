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
            // Validate file size
            if (formData.image && !editingImage) {
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
            }

            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== "") {
                    if (typeof value === "boolean") {
                        form.append(key, value ? "1" : "0");
                    } else {
                        form.append(key, value);
                    }
                }
            });

            let response;
            if (editingImage) {
                response = await adminService.gallery.update(
                    editingImage.id,
                    form
                );
            } else {
                response = await adminService.gallery.create(form);
            }

            if (response && response.success) {
                await fetchImages();
                resetForm();
                setShowForm(false);
            } else {
                if (response && response.errors) {
                    setErrors(response.errors);
                } else {
                    setErrors({
                        general: response?.message || "Failed to save image",
                    });
                }
            }
        } catch (error) {
            console.error("Error saving image:", error);
            setErrors({ general: "Failed to save image: " + error.message });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (image) => {
        setEditingImage(image);
        setFormData({
            title: image.title,
            description: image.description || "",
            category: image.category,
            image: null,
            alt_text: image.alt_text || "",
            tags: image.tags ? image.tags.join(", ") : "",
            event_date: image.event_date || "",
            photographer: image.photographer || "",
            is_featured: image.is_featured,
            is_active: image.is_active,
            display_order: image.display_order,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            try {
                await adminService.gallery.delete(id);
                await fetchImages();
            } catch (error) {
                console.error("Error deleting image:", error);
            }
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
                                        onClick={() => handleDelete(image.id)}
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
                                                        handleDelete(image.id)
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

            {/* Image Preview Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden">
                        <div className="relative">
                            <img
                                src={selectedImage.image_url}
                                alt={
                                    selectedImage.alt_text ||
                                    selectedImage.title
                                }
                                className="w-full max-h-[60vh] object-cover"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                    {selectedImage.category_label}
                                </span>
                                {selectedImage.is_featured && (
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                        <Star className="w-4 h-4 inline mr-1" />
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {selectedImage.title}
                            </h2>
                            {selectedImage.description && (
                                <p className="text-gray-600 mb-4">
                                    {selectedImage.description}
                                </p>
                            )}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        {selectedImage.view_count} views
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Heart className="w-4 h-4" />
                                        {selectedImage.like_count} likes
                                    </span>
                                    {selectedImage.event_date && (
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(
                                                selectedImage.event_date
                                            ).toLocaleDateString()}
                                        </span>
                                    )}
                                    {selectedImage.photographer && (
                                        <span className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {selectedImage.photographer}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {selectedImage.tags &&
                                selectedImage.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedImage.tags.map(
                                            (tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                                                >
                                                    #{tag}
                                                </span>
                                            )
                                        )}
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
