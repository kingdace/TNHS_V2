import React, { useEffect, useState } from "react";
import {
    Image,
    Search,
    Filter,
    Calendar,
    MapPin,
    Users,
    Award,
    GraduationCap,
    BookOpen,
    Heart,
    Star,
    Eye,
    Download,
    Share2,
    ChevronLeft,
    ChevronRight,
    X,
    Grid3X3,
    List,
    Camera,
    Video,
    FileImage,
} from "lucide-react";

const Gallery = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedImage, setSelectedImage] = useState(null);
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [filteredImages, setFilteredImages] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Gallery images data for Taft National High School of Surigao City
    const galleryImages = [
        // School Events
        {
            id: 1,
            title: "Graduation Ceremony 2024",
            category: "events",
            date: "2024-03-15",
            description:
                "Annual graduation ceremony celebrating our 2024 graduates",
            image: "/images/graduation.jpg",
            type: "image",
            likes: 156,
            views: 1240,
            tags: ["graduation", "ceremony", "achievement", "celebration"],
            featured: true,
        },
        {
            id: 2,
            title: "Science Fair 2024",
            category: "events",
            date: "2024-02-20",
            description:
                "Students showcasing their innovative science projects",
            image: "/images/science-fair.jpg",
            type: "image",
            likes: 89,
            views: 567,
            tags: ["science", "innovation", "students", "projects"],
            featured: true,
        },
        {
            id: 3,
            title: "Sports Day 2024",
            category: "events",
            date: "2024-01-25",
            description: "Annual sports competition and athletic events",
            image: "/images/sports.jpg",
            type: "image",
            likes: 134,
            views: 892,
            tags: ["sports", "athletics", "competition", "teamwork"],
            featured: false,
        },
        {
            id: 4,
            title: "Cultural Festival",
            category: "events",
            date: "2024-01-10",
            description: "Celebrating Filipino culture and traditions",
            image: "/images/cultural-festival.jpg",
            type: "image",
            likes: 98,
            views: 634,
            tags: ["culture", "festival", "traditions", "celebration"],
            featured: false,
        },

        // School Facilities
        {
            id: 5,
            title: "Main Building",
            category: "facilities",
            date: "2024-01-01",
            description: "The main administrative and classroom building",
            image: "/images/main-building.jpg",
            type: "image",
            likes: 67,
            views: 445,
            tags: ["building", "administration", "classrooms"],
            featured: true,
        },
        {
            id: 6,
            title: "Library",
            category: "facilities",
            date: "2024-01-01",
            description: "Modern library with extensive book collection",
            image: "/images/library.jpg",
            type: "image",
            likes: 45,
            views: 312,
            tags: ["library", "books", "learning", "study"],
            featured: false,
        },
        {
            id: 7,
            title: "Computer Laboratory",
            category: "facilities",
            date: "2024-01-01",
            description: "State-of-the-art computer lab for digital learning",
            image: "/images/computer-lab.jpg",
            type: "image",
            likes: 78,
            views: 523,
            tags: ["technology", "computers", "digital", "learning"],
            featured: true,
        },
        {
            id: 8,
            title: "Science Laboratory",
            category: "facilities",
            date: "2024-01-01",
            description: "Well-equipped laboratory for science experiments",
            image: "/images/science-lab.jpg",
            type: "image",
            likes: 56,
            views: 389,
            tags: ["science", "laboratory", "experiments", "research"],
            featured: false,
        },

        // Student Life
        {
            id: 9,
            title: "Student Council Meeting",
            category: "student-life",
            date: "2024-02-05",
            description: "Student leaders discussing school improvements",
            image: "/images/student-council.jpg",
            type: "image",
            likes: 34,
            views: 234,
            tags: ["leadership", "students", "meeting", "governance"],
            featured: false,
        },
        {
            id: 10,
            title: "Study Group Session",
            category: "student-life",
            date: "2024-02-10",
            description: "Students collaborating in group study sessions",
            image: "/images/study-group.jpg",
            type: "image",
            likes: 42,
            views: 278,
            tags: ["study", "collaboration", "learning", "students"],
            featured: false,
        },
        {
            id: 11,
            title: "Art Class",
            category: "student-life",
            date: "2024-02-15",
            description: "Students expressing creativity in art classes",
            image: "/images/art-class.jpg",
            type: "image",
            likes: 67,
            views: 456,
            tags: ["art", "creativity", "students", "expression"],
            featured: true,
        },
        {
            id: 12,
            title: "Music Performance",
            category: "student-life",
            date: "2024-02-20",
            description: "Students showcasing their musical talents",
            image: "/images/music-performance.jpg",
            type: "image",
            likes: 89,
            views: 567,
            tags: ["music", "performance", "talent", "entertainment"],
            featured: false,
        },

        // Achievements
        {
            id: 13,
            title: "Academic Excellence Award",
            category: "achievements",
            date: "2024-03-01",
            description:
                "Students receiving recognition for academic excellence",
            image: "/images/academic-award.jpg",
            type: "image",
            likes: 123,
            views: 789,
            tags: ["award", "excellence", "achievement", "recognition"],
            featured: true,
        },
        {
            id: 14,
            title: "Sports Championship",
            category: "achievements",
            date: "2024-02-28",
            description: "School team winning regional sports championship",
            image: "/images/sports-championship.jpg",
            type: "image",
            likes: 156,
            views: 945,
            tags: ["championship", "sports", "victory", "team"],
            featured: true,
        },
        {
            id: 15,
            title: "Science Olympiad Winners",
            category: "achievements",
            date: "2024-02-25",
            description: "Students winning science olympiad competition",
            image: "/images/science-olympiad.jpg",
            type: "image",
            likes: 98,
            views: 623,
            tags: ["olympiad", "science", "competition", "winners"],
            featured: false,
        },

        // Community
        {
            id: 16,
            title: "Community Outreach",
            category: "community",
            date: "2024-01-30",
            description:
                "Students participating in community service activities",
            image: "/images/community-outreach.jpg",
            type: "image",
            likes: 76,
            views: 512,
            tags: ["community", "service", "outreach", "volunteer"],
            featured: false,
        },
        {
            id: 17,
            title: "Environmental Cleanup",
            category: "community",
            date: "2024-01-20",
            description: "Students leading environmental cleanup initiatives",
            image: "/images/environmental-cleanup.jpg",
            type: "image",
            likes: 89,
            views: 634,
            tags: ["environment", "cleanup", "sustainability", "care"],
            featured: true,
        },
        {
            id: 18,
            title: "Parent-Teacher Conference",
            category: "community",
            date: "2024-02-01",
            description:
                "Parents and teachers collaborating for student success",
            image: "/images/ptc.jpg",
            type: "image",
            likes: 45,
            views: 298,
            tags: ["parents", "teachers", "conference", "collaboration"],
            featured: false,
        },
    ];

    const categories = [
        { value: "all", label: "All Photos", count: galleryImages.length },
        {
            value: "events",
            label: "School Events",
            count: galleryImages.filter((img) => img.category === "events")
                .length,
        },
        {
            value: "facilities",
            label: "Facilities",
            count: galleryImages.filter((img) => img.category === "facilities")
                .length,
        },
        {
            value: "student-life",
            label: "Student Life",
            count: galleryImages.filter(
                (img) => img.category === "student-life"
            ).length,
        },
        {
            value: "achievements",
            label: "Achievements",
            count: galleryImages.filter(
                (img) => img.category === "achievements"
            ).length,
        },
        {
            value: "community",
            label: "Community",
            count: galleryImages.filter((img) => img.category === "community")
                .length,
        },
    ];

    // Filter images based on search term and category
    useEffect(() => {
        let filtered = galleryImages;

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
                    image.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    image.tags.some((tag) =>
                        tag.toLowerCase().includes(searchTerm.toLowerCase())
                    )
            );
        }

        setFilteredImages(filtered);
    }, [searchTerm, selectedCategory]);

    const getCategoryIcon = (category) => {
        switch (category) {
            case "events":
                return Calendar;
            case "facilities":
                return MapPin;
            case "student-life":
                return Users;
            case "achievements":
                return Award;
            case "community":
                return Heart;
            default:
                return Image;
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case "events":
                return "from-blue-500 to-blue-600";
            case "facilities":
                return "from-green-500 to-green-600";
            case "student-life":
                return "from-purple-500 to-purple-600";
            case "achievements":
                return "from-yellow-500 to-yellow-600";
            case "community":
                return "from-red-500 to-red-600";
            default:
                return "from-gray-500 to-gray-600";
        }
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
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {filteredImages.length} of{" "}
                        {galleryImages.length} photos
                        {searchTerm && ` for "${searchTerm}"`}
                        {selectedCategory !== "all" &&
                            ` in ${
                                categories.find(
                                    (c) => c.value === selectedCategory
                                )?.label
                            }`}
                    </p>
                </div>

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
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <div className="relative">
                                        <img
                                            src={image.image}
                                            alt={image.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {image.featured && (
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
                                                {new Date(
                                                    image.date
                                                ).toLocaleDateString()}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center gap-1">
                                                    <Heart className="w-4 h-4" />
                                                    {image.likes}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-4 h-4" />
                                                    {image.views}
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
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <div className="flex">
                                        <div className="relative w-32 h-32 flex-shrink-0">
                                            <img
                                                src={image.image}
                                                alt={image.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {image.featured && (
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
                                                <span className="flex items-center gap-1">
                                                    <Heart className="w-4 h-4" />
                                                    {image.likes} likes
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-4 h-4" />
                                                    {image.views} views
                                                </span>
                                                <div className="flex gap-1">
                                                    {image.tags
                                                        .slice(0, 3)
                                                        .map((tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                                            >
                                                                #{tag}
                                                            </span>
                                                        ))}
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
                            Try adjusting your search terms or category filter
                        </p>
                    </div>
                )}

                {/* Image Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden">
                            <div className="relative">
                                <img
                                    src={selectedImage.image}
                                    alt={selectedImage.title}
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
                                    <div
                                        className={`p-2 rounded bg-gradient-to-r ${getCategoryColor(
                                            selectedImage.category
                                        )}`}
                                    >
                                        {React.createElement(
                                            getCategoryIcon(
                                                selectedImage.category
                                            ),
                                            { className: "w-5 h-5 text-white" }
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
                                        <span className="flex items-center gap-1">
                                            <Heart className="w-4 h-4" />
                                            {selectedImage.likes} likes
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {selectedImage.views} views
                                        </span>
                                        <span>
                                            {new Date(
                                                selectedImage.date
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {selectedImage.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
