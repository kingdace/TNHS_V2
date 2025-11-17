import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
    User,
    Mail,
    Phone,
    Save,
    Loader2,
    AlertCircle,
    CheckCircle,
    Image as ImageIcon,
} from "lucide-react";

const PrincipalProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [formData, setFormData] = useState({
        full_name: "",
        position: "",
        email: "",
        phone: "",
        bio: "",
        leadership_profile: "",
        profile_image: "",
        office_hours: "",
        is_active: true,
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/principal-profiles");
            const data = await response.json();

            if (data.success && data.data) {
                setProfile(data.data);
                setFormData({
                    full_name: data.data.full_name || "",
                    position: data.data.position || "",
                    email: data.data.email || "",
                    phone: data.data.phone || "",
                    bio: data.data.bio || "",
                    leadership_profile: data.data.leadership_profile || "",
                    profile_image: data.data.profile_image || "",
                    office_hours: data.data.office_hours || "",
                    is_active: data.data.is_active ?? true,
                });

                // Set image preview if exists
                if (data.data.profile_image) {
                    const imagePath = data.data.profile_image.startsWith("http")
                        ? data.data.profile_image
                        : `/storage/${data.data.profile_image.replace(
                              /^\/?storage\//,
                              ""
                          )}`;
                    setImagePreviewUrl(imagePath);
                }
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const url = profile
                ? `/api/admin/principal-profiles/${profile.id}`
                : "/api/admin/principal-profiles";

            // Create FormData
            const formDataToSend = new FormData();

            // Add _method for Laravel PUT requests when editing
            if (profile) {
                formDataToSend.append("_method", "PUT");
            }

            // Add all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (
                    value !== null &&
                    value !== undefined &&
                    key !== "profile_image"
                ) {
                    if (typeof value === "boolean") {
                        formDataToSend.append(key, value ? "1" : "0");
                    } else {
                        formDataToSend.append(key, value);
                    }
                }
            });

            // Add image file if selected
            if (imageFile) {
                formDataToSend.append("profile_image", imageFile);
            }

            // Get CSRF token
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            if (!csrfToken) {
                throw new Error("CSRF token not found");
            }

            const response = await fetch(url, {
                method: "POST", // Always POST for FormData with _method
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    Accept: "application/json",
                },
                credentials: "include",
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccess(
                    profile
                        ? "Profile updated successfully!"
                        : "Profile created successfully!"
                );
                setProfile(data.data);
                setImageFile(null); // Clear the file input

                // Update form data with new values
                setFormData({
                    full_name: data.data.full_name || "",
                    position: data.data.position || "",
                    email: data.data.email || "",
                    phone: data.data.phone || "",
                    bio: data.data.bio || "",
                    leadership_profile: data.data.leadership_profile || "",
                    profile_image: data.data.profile_image || "",
                    office_hours: data.data.office_hours || "",
                    is_active: data.data.is_active ?? true,
                });

                // Update image preview
                if (data.data.profile_image) {
                    const imagePath = data.data.profile_image.startsWith("http")
                        ? data.data.profile_image
                        : `/storage/${data.data.profile_image.replace(
                              /^\/?storage\//,
                              ""
                          )}`;
                    setImagePreviewUrl(imagePath);
                }

                // Navigate to principal corner view page after 1 second
                setTimeout(() => {
                    navigate("/admin/principal-corner");
                }, 1000);
            } else {
                setError(data.message || "Failed to save profile");
            }
        } catch (err) {
            console.error("Error saving profile:", err);
            setError(
                err.message || "Failed to save profile. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl px-6 py-4 text-white shadow-lg">
                <h1 className="text-2xl font-bold">Principal Profile</h1>
                <p className="text-blue-100 text-sm">
                    Manage principal information displayed on the public page
                </p>
            </div>

            {/* Messages */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {success}
                </div>
            )}

            {/* Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Principal Information</CardTitle>
                    <CardDescription>
                        This information will be displayed on the public
                        Principal page
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.full_name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            full_name: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Dr. Juan Dela Cruz"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Position/Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.position}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            position: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="School Principal IV"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="principal@tnhs.edu.ph"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="(055) 555-0123"
                                />
                            </div>
                        </div>

                        {/* Profile Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Image
                            </label>
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] || null;
                                            setImageFile(file);

                                            // Clean up old preview URL
                                            if (
                                                imagePreviewUrl &&
                                                imagePreviewUrl.startsWith(
                                                    "blob:"
                                                )
                                            ) {
                                                URL.revokeObjectURL(
                                                    imagePreviewUrl
                                                );
                                            }

                                            // Create new preview URL
                                            if (file) {
                                                setImagePreviewUrl(
                                                    URL.createObjectURL(file)
                                                );
                                            } else if (profile?.profile_image) {
                                                // If no new file and editing, keep existing preview
                                                const imagePath =
                                                    profile.profile_image.startsWith(
                                                        "http"
                                                    )
                                                        ? profile.profile_image
                                                        : `/storage/${profile.profile_image.replace(
                                                              /^\/?storage\//,
                                                              ""
                                                          )}`;
                                                setImagePreviewUrl(imagePath);
                                            } else {
                                                setImagePreviewUrl("");
                                            }
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Upload principal's photo (JPG, PNG, max
                                        2MB)
                                    </p>
                                    {profile && !imageFile && (
                                        <p className="text-xs text-blue-600 mt-1">
                                            Leave empty to keep current image
                                        </p>
                                    )}
                                </div>

                                {/* Image Preview */}
                                {imagePreviewUrl && (
                                    <div className="flex-shrink-0">
                                        <div className="relative w-32 h-32">
                                            <img
                                                src={imagePreviewUrl}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "/images/default-avatar.png";
                                                }}
                                            />
                                            {imageFile && (
                                                <div className="absolute -top-2 -right-2">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        New
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Short Bio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Short Bio
                            </label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        bio: e.target.value,
                                    })
                                }
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="A brief introduction..."
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Short bio for quick display (optional)
                            </p>
                        </div>

                        {/* Leadership Profile */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Leadership Profile (Full Bio)
                            </label>
                            <textarea
                                value={formData.leadership_profile}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        leadership_profile: e.target.value,
                                    })
                                }
                                rows={8}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Full leadership profile and career history..."
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Full biography displayed on the public page. You
                                can use HTML tags for formatting.
                            </p>
                        </div>

                        {/* Office Hours */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Office Hours
                            </label>
                            <textarea
                                value={formData.office_hours}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        office_hours: e.target.value,
                                    })
                                }
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Monday-Friday: 7:00 AM - 5:00 PM"
                            />
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        is_active: e.target.checked,
                                    })
                                }
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="is_active"
                                className="ml-2 text-sm text-gray-700"
                            >
                                Active (Display on public page)
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-3 pt-4 border-t">
                            <Button
                                type="submit"
                                disabled={saving}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        {profile
                                            ? "Update Profile"
                                            : "Create Profile"}
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

export default PrincipalProfile;
