import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { adminService } from "../../services/adminService";

const HeroCarouselForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        image_path: "",
        cta_text: "",
        cta_link: "",
        display_order: 0,
        is_active: true,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch slide data if editing
    useEffect(() => {
        if (isEdit) {
            fetchSlide();
        }
    }, [id, isEdit]);

    const fetchSlide = async () => {
        try {
            setLoading(true);
            const slide = await adminService.heroCarousel.getById(id);
            if (slide) {
                setFormData(slide);
            } else {
                setError("Slide not found");
            }
        } catch (error) {
            setError("Failed to fetch slide");
            console.error("Error fetching slide:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEdit) {
                await adminService.heroCarousel.update(id, formData);
            } else {
                await adminService.heroCarousel.create(formData);
            }
            navigate("/admin/hero-carousel");
        } catch (error) {
            setError(error.message || "Failed to save slide");
            console.error("Error saving slide:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEdit) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-gray-600">Loading slide...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/admin/hero-carousel")}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Slides
                    </Button>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                    {isEdit ? "Edit Slide" : "Create New Slide"}
                </h1>
                <p className="text-gray-600">
                    {isEdit
                        ? "Update the hero carousel slide information."
                        : "Add a new slide to the hero carousel on your homepage."}
                </p>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Slide Information</CardTitle>
                    <CardDescription>
                        Fill in the details for your hero carousel slide
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter slide title"
                                />
                            </div>

                            {/* Subtitle */}
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="subtitle"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Subtitle
                                </label>
                                <input
                                    type="text"
                                    name="subtitle"
                                    id="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter slide subtitle"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter slide description"
                                />
                            </div>

                            {/* Image Path */}
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="image_path"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Image Path
                                </label>
                                <input
                                    type="text"
                                    name="image_path"
                                    id="image_path"
                                    value={formData.image_path}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="/images/BG1.jpg"
                                />
                            </div>

                            {/* CTA Text */}
                            <div>
                                <label
                                    htmlFor="cta_text"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Call-to-Action Text
                                </label>
                                <input
                                    type="text"
                                    name="cta_text"
                                    id="cta_text"
                                    value={formData.cta_text}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Apply Now"
                                />
                            </div>

                            {/* CTA Link */}
                            <div>
                                <label
                                    htmlFor="cta_link"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Call-to-Action Link
                                </label>
                                <input
                                    type="text"
                                    name="cta_link"
                                    id="cta_link"
                                    value={formData.cta_link}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="/admissions"
                                />
                            </div>

                            {/* Display Order */}
                            <div>
                                <label
                                    htmlFor="display_order"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    name="display_order"
                                    id="display_order"
                                    value={formData.display_order}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Is Active */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="is_active"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    Active (show on website)
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/admin/hero-carousel")}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        {isEdit
                                            ? "Update Slide"
                                            : "Create Slide"}
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default HeroCarouselForm;
