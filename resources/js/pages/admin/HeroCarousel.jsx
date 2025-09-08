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
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Hero Carousel Management
                </h1>
                <p className="text-gray-600">
                    Manage the hero carousel slides on your homepage
                </p>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>All Slides</CardTitle>
                            <CardDescription>
                                Create and manage hero carousel slides
                            </CardDescription>
                        </div>
                        <Button asChild>
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
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex flex-col space-y-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    moveSlide(slide, "up")
                                                }
                                                disabled={index === 0}
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
                                            >
                                                <ArrowDown className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                                            {slide.image_path ? (
                                                <img
                                                    src={slide.image_path}
                                                    alt={slide.title}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            ) : (
                                                <div className="text-gray-400 text-xs">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">
                                                {slide.title}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {slide.subtitle}
                                            </p>
                                            <div className="flex items-center space-x-4 mt-1">
                                                <span className="text-xs text-gray-400">
                                                    Order: {slide.display_order}
                                                </span>
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${
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
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleToggleActive(slide)
                                            }
                                        >
                                            {slide.is_active ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                to={`/admin/hero-carousel/${slide.id}/edit`}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(slide.id)
                                            }
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
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
