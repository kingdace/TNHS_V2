import React, { useEffect, useState } from "react";
import {
    Image,
    Search,
    Filter,
    Calendar,
    Users,
    GraduationCap,
    Heart,
    Star,
    Eye,
    Download,
    Share2,
    X,
    Grid3X3,
    List,
    Camera,
    Trophy,
    Palette,
    Building,
} from "lucide-react";
import { galleryService } from "../../services/galleryService";

const Gallery = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedImage, setSelectedImage] = useState(null);
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [filteredImages, setFilteredImages] = useState([]);
    const [allImages, setAllImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchGalleryData();
    }, []);

    const fetchGalleryData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch images and categories in parallel
            const [imagesResponse, categoriesResponse] = await Promise.all([
                galleryService.getAll(),
                galleryService.getCategories(),
            ]);

            if (imagesResponse.success) {
                const transformedImages = imagesResponse.data.map((image) =>
                    galleryService.transformImage(image)
                );
                setAllImages(transformedImages);
            } else {
                setError("Failed to load gallery images");
            }

            if (categoriesResponse.success) {
                const allCategory = {
                    value: "all",
                    label: "All Photos",
                    count: imagesResponse.data?.length || 0,
                };
                setCategories([allCategory, ...categoriesResponse.data]);
            }
        } catch (err) {
            console.error("Error fetching gallery data:", err);
            setError("Failed to load gallery");
            setAllImages([]);
            setCategories([{ value: "all", label: "All Photos", count: 0 }]);
        } finally {
            setLoading(false);
        }
    };

    const [likedImages, setLikedImages] = useState(new Set());
    const [likingImages, setLikingImages] = useState(new Set());

    const handleLike = async (image) => {
        // Prevent double-clicking
        if (likingImages.has(image.id)) return;

        try {
            setLikingImages((prev) => new Set([...prev, image.id]));

            // Optimistic update
            const updatedImages = allImages.map((img) =>
                img.id === image.id
                    ? { ...img, like_count: img.like_count + 1 }
                    : img
            );
            setAllImages(updatedImages);
            setLikedImages((prev) => new Set([...prev, image.id]));

            const response = await galleryService.incrementLike(image.id);

            if (response && response.success) {
                // Update with actual count from server
                const serverUpdatedImages = allImages.map((img) =>
                    img.id === image.id
                        ? { ...img, like_count: response.data.like_count }
                        : img
                );
                setAllImages(serverUpdatedImages);
            } else {
                // Revert optimistic update if failed
                const revertedImages = allImages.map((img) =>
                    img.id === image.id
                        ? { ...img, like_count: img.like_count - 1 }
                        : img
                );
                setAllImages(revertedImages);
                setLikedImages((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(image.id);
                    return newSet;
                });
            }
        } catch (error) {
            console.error("Failed to like image:", error);
            // Revert optimistic update
            const revertedImages = allImages.map((img) =>
                img.id === image.id
                    ? { ...img, like_count: img.like_count - 1 }
                    : img
            );
            setAllImages(revertedImages);
            setLikedImages((prev) => {
                const newSet = new Set(prev);
                newSet.delete(image.id);
                return newSet;
            });
        } finally {
            setLikingImages((prev) => {
                const newSet = new Set(prev);
                newSet.delete(image.id);
                return newSet;
            });
        }
    };

    const handleImageView = async (image) => {
        try {
            // Increment view count when image is opened
            await galleryService.getById(image.id);

            // Update local state
            const updatedImages = allImages.map((img) =>
                img.id === image.id
                    ? { ...img, view_count: img.view_count + 1 }
                    : img
            );
            setAllImages(updatedImages);
            setSelectedImage({ ...image, view_count: image.view_count + 1 });
        } catch (error) {
            console.error("Failed to track view:", error);
            setSelectedImage(image);
        }
    };

    const handleDownload = async (image) => {
        try {
            // Create download link
            const link = document.createElement("a");
            link.href = image.image_url;
            link.download = `${image.title}.${image.image_url
                .split(".")
                .pop()}`;
            link.target = "_blank";

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success message (optional)
            console.log(`Downloaded: ${image.title}`);
        } catch (error) {
            console.error("Download failed:", error);
            // Fallback: open in new tab
            window.open(image.image_url, "_blank");
        }
    };

    // Filter images based on search term and category
    useEffect(() => {
        let filtered = allImages;

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(
                (image) => image.category === selectedCategory
            );
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(
                (image) =>
                    image.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    (image.description &&
                        image.description
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())) ||
                    (image.tags &&
                        image.tags.some((tag) =>
                            tag.toLowerCase().includes(searchTerm.toLowerCase())
                        ))
            );
        }

        setFilteredImages(filtered);
    }, [searchTerm, selectedCategory, allImages]);

    const getCategoryIcon = (category) => {
        switch (category) {
            case "events":
                return Calendar;
            case "facilities":
                return Building;
            case "academic":
                return GraduationCap;
            case "sports":
                return Trophy;
            case "arts":
                return Palette;
            case "community":
                return Users;
            default:
                return Image;
        }
    };

    const getCategoryColor = (category) => {
        return galleryService.getCategoryColor(category);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        TNHS Gallery
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore moments, achievements, and memories from Taft
                        National High School of Surigao City
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search photos..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="lg:w-64">
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label} ({category.count})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-3 rounded-lg transition-colors ${
                                    viewMode === "grid"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                <Grid3X3 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-3 rounded-lg transition-colors ${
                                    viewMode === "list"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                {!loading && (
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Showing {filteredImages.length} of{" "}
                            {allImages.length} photos
                            {searchTerm && ` for "${searchTerm}"`}
                            {selectedCategory !== "all" &&
                                ` in ${
                                    categories.find(
                                        (c) => c.value === selectedCategory
                                    )?.label
                                }`}
                        </p>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading gallery...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Camera className="w-8 h-8 text-red-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            Error Loading Gallery
                        </h3>
                        <p className="text-gray-500 mb-4">{error}</p>
                        <button
                            onClick={fetchGalleryData}
                            className="px-4 py-2 bg-royal-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Gallery Grid/List */}
                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                                {filteredImages.map((image) => {
                                    const CategoryIcon = getCategoryIcon(
                                        image.category
                                    );
                                    return (
                                        <div
                                            key={image.id}
                                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                                            onClick={() =>
                                                handleImageView(image)
                                            }
                                        >
                                            <div className="relative">
                                                <img
                                                    src={
                                                        image.thumbnail_url ||
                                                        image.image_url
                                                    }
                                                    alt={
                                                        image.alt_text ||
                                                        image.title
                                                    }
                                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {image.is_featured && (
                                                    <div className="absolute top-2 right-2">
                                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                                    <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div
                                                        className={`p-1 rounded bg-gradient-to-r ${getCategoryColor(
                                                            image.category
                                                        )}`}
                                                    >
                                                        <CategoryIcon className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-500 uppercase">
                                                        {image.category.replace(
                                                            "-",
                                                            " "
                                                        )}
                                                    </span>
                                                </div>

                                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                                                    {image.title}
                                                </h3>

                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {image.description}
                                                </p>

                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <span>
                                                        {image.formatted_date}
                                                    </span>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleLike(
                                                                    image
                                                                );
                                                            }}
                                                            disabled={likingImages.has(
                                                                image.id
                                                            )}
                                                            className={`flex items-center gap-1 transition-all duration-200 ${
                                                                likedImages.has(
                                                                    image.id
                                                                )
                                                                    ? "text-red-500 scale-110"
                                                                    : "text-gray-500 hover:text-red-500 hover:scale-105"
                                                            } ${
                                                                likingImages.has(
                                                                    image.id
                                                                )
                                                                    ? "animate-pulse"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <Heart
                                                                className={`w-4 h-4 ${
                                                                    likedImages.has(
                                                                        image.id
                                                                    )
                                                                        ? "fill-current"
                                                                        : ""
                                                                }`}
                                                            />
                                                            {image.like_count}
                                                        </button>
                                                        <span className="flex items-center gap-1">
                                                            <Eye className="w-4 h-4" />
                                                            {image.view_count}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="space-y-4 mb-12">
                                {filteredImages.map((image) => {
                                    const CategoryIcon = getCategoryIcon(
                                        image.category
                                    );
                                    return (
                                        <div
                                            key={image.id}
                                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                                            onClick={() =>
                                                handleImageView(image)
                                            }
                                        >
                                            <div className="flex">
                                                <div className="relative w-32 h-32 flex-shrink-0">
                                                    <img
                                                        src={
                                                            image.thumbnail_url ||
                                                            image.image_url
                                                        }
                                                        alt={
                                                            image.alt_text ||
                                                            image.title
                                                        }
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    {image.is_featured && (
                                                        <div className="absolute top-2 right-2">
                                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1 p-6">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className={`p-1 rounded bg-gradient-to-r ${getCategoryColor(
                                                                    image.category
                                                                )}`}
                                                            >
                                                                <CategoryIcon className="w-4 h-4 text-white" />
                                                            </div>
                                                            <span className="text-xs font-medium text-gray-500 uppercase">
                                                                {image.category.replace(
                                                                    "-",
                                                                    " "
                                                                )}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-gray-400">
                                                            {new Date(
                                                                image.date
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {image.title}
                                                    </h3>

                                                    <p className="text-gray-600 mb-4">
                                                        {image.description}
                                                    </p>

                                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleLike(
                                                                    image
                                                                );
                                                            }}
                                                            disabled={likingImages.has(
                                                                image.id
                                                            )}
                                                            className={`flex items-center gap-1 transition-all duration-200 ${
                                                                likedImages.has(
                                                                    image.id
                                                                )
                                                                    ? "text-red-500 scale-110"
                                                                    : "text-gray-500 hover:text-red-500 hover:scale-105"
                                                            } ${
                                                                likingImages.has(
                                                                    image.id
                                                                )
                                                                    ? "animate-pulse"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <Heart
                                                                className={`w-4 h-4 ${
                                                                    likedImages.has(
                                                                        image.id
                                                                    )
                                                                        ? "fill-current"
                                                                        : ""
                                                                }`}
                                                            />
                                                            {image.like_count}{" "}
                                                            likes
                                                        </button>
                                                        <span className="flex items-center gap-1">
                                                            <Eye className="w-4 h-4" />
                                                            {image.view_count}{" "}
                                                            views
                                                        </span>
                                                        <div className="flex gap-1">
                                                            {image.tags &&
                                                                image.tags
                                                                    .slice(0, 3)
                                                                    .map(
                                                                        (
                                                                            tag,
                                                                            index
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                                                            >
                                                                                #
                                                                                {
                                                                                    tag
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* No Results */}
                        {filteredImages.length === 0 && (
                            <div className="text-center py-12">
                                <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                    No photos found
                                </h3>
                                <p className="text-gray-500">
                                    Try adjusting your search terms or category
                                    filter
                                </p>
                            </div>
                        )}

                        {/* Image Modal */}
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
                                            onClick={() =>
                                                setSelectedImage(null)
                                            }
                                            className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div
                                                className={`p-2 rounded bg-gradient-to-r ${getCategoryColor(
                                                    selectedImage.category
                                                )}`}
                                            >
                                                {React.createElement(
                                                    getCategoryIcon(
                                                        selectedImage.category
                                                    ),
                                                    {
                                                        className:
                                                            "w-5 h-5 text-white",
                                                    }
                                                )}
                                            </div>
                                            <span className="text-sm font-medium text-gray-500 uppercase">
                                                {selectedImage.category.replace(
                                                    "-",
                                                    " "
                                                )}
                                            </span>
                                            {selectedImage.featured && (
                                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                            )}
                                        </div>

                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            {selectedImage.title}
                                        </h2>

                                        <p className="text-gray-600 mb-4">
                                            {selectedImage.description}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                                <button
                                                    onClick={() =>
                                                        handleLike(
                                                            selectedImage
                                                        )
                                                    }
                                                    disabled={likingImages.has(
                                                        selectedImage.id
                                                    )}
                                                    className={`flex items-center gap-1 transition-all duration-200 ${
                                                        likedImages.has(
                                                            selectedImage.id
                                                        )
                                                            ? "text-red-500 scale-110"
                                                            : "text-gray-500 hover:text-red-500 hover:scale-105"
                                                    } ${
                                                        likingImages.has(
                                                            selectedImage.id
                                                        )
                                                            ? "animate-pulse"
                                                            : ""
                                                    }`}
                                                >
                                                    <Heart
                                                        className={`w-4 h-4 ${
                                                            likedImages.has(
                                                                selectedImage.id
                                                            )
                                                                ? "fill-current"
                                                                : ""
                                                        }`}
                                                    />
                                                    {selectedImage.like_count}{" "}
                                                    likes
                                                </button>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-4 h-4" />
                                                    {
                                                        selectedImage.view_count
                                                    }{" "}
                                                    views
                                                </span>
                                                <span>
                                                    {
                                                        selectedImage.formatted_date
                                                    }
                                                </span>
                                            </div>

                                            <div className="flex gap-2">
                                                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                                                    <Share2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDownload(
                                                            selectedImage
                                                        )
                                                    }
                                                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                                    title="Download Image"
                                                >
                                                    <Download className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {selectedImage.tags &&
                                            selectedImage.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedImage.tags.map(
                                                        (tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
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
                    </>
                )}
            </div>
        </div>
    );
};

export default Gallery;
