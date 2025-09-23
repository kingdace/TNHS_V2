import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    Edit,
    Trash2,
    Eye,
    EyeOff,
    ArrowUp,
    ArrowDown,
} from "lucide-react";
import { adminService } from "../../services/adminService";

const HeroCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this slide?")) {
            try {
                await adminService.heroCarousel.delete(id);
                setSlides(slides.filter((slide) => slide.id !== id));
            } catch (error) {
                setError("Failed to delete slide");
                console.error("Error deleting slide:", error);
            }
        }
    };

    const handleToggleActive = async (slide) => {
        try {
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
        } catch (error) {
            setError("Failed to update slide");
            console.error("Error updating slide:", error);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading slides...</p>
                </div>
            </div>
        );
    }

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
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center text-xl text-royal-blue">
                                <Images className="mr-2 h-5 w-5 text-royal-blue" />
                                All Slides
                            </CardTitle>
                            <CardDescription className="text-base text-blue-700">
                                Create and manage hero carousel slides for your
                                homepage
                            </CardDescription>
                        </div>
                        <Button
                            asChild
                            className="bg-royal-blue hover:bg-blue-700 text-white"
                        >
                            <Link to="/admin/hero-carousel/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Slide
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
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
                        <div className="space-y-4">
                            {slides.map((slide, index) => (
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
                                                    index === slides.length - 1
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
                                                    Order: {slide.display_order}
                                                </span>
                                                {slide.cta_text && (
                                                    <span className="flex items-center">
                                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                                        CTA: {slide.cta_text}
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
                                            {slide.is_active ? (
                                                <EyeOff className="h-4 w-4 text-green-600" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-600" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                            className="h-10 w-10 p-0 hover:bg-blue-100"
                                            title="Edit"
                                        >
                                            <Link
                                                to={`/admin/hero-carousel/${slide.id}/edit`}
                                            >
                                                <Edit className="h-4 w-4 text-blue-600" />
                                            </Link>
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
        </div>
    );
};

export default HeroCarousel;
