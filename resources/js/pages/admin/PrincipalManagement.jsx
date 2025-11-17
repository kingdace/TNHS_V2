import React, { useState, useEffect } from "react";
import {
    User,
    Trophy,
    Save,
    Loader2,
    AlertCircle,
    CheckCircle,
    Upload,
    X,
} from "lucide-react";

const PrincipalManagement = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Profile data
    const [profile, setProfile] = useState(null);
    const [awards, setAwards] = useState([]);
    const [biography, setBiography] = useState(null);
    const [pds, setPds] = useState(null);

    // Form data
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [formData, setFormData] = useState({
        full_name: "",
        position: "",
        email: "",
        phone: "",
        leadership_profile: "",
        biography_content: "",
        pds_content: "",
    });

    // Awards form
    const [awardsList, setAwardsList] = useState([
        {
            title: "",
            award_year: new Date().getFullYear(),
            level: "regional",
            issuing_organization: "",
            description: "",
        },
    ]);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);

            // Fetch profile
            const profileRes = await fetch("/api/principal-profiles");
            const profileData = await profileRes.json();

            if (profileData.success && profileData.data) {
                const prof = profileData.data;
                setProfile(prof);
                setFormData({
                    full_name: prof.full_name || "",
                    position: prof.position || "",
                    email: prof.email || "",
                    phone: prof.phone || "",
                    leadership_profile: prof.leadership_profile || "",
                    biography_content: "",
                    pds_content: "",
                });

                if (prof.profile_image) {
                    const imagePath = prof.profile_image.startsWith("http")
                        ? prof.profile_image
                        : `/storage/${prof.profile_image.replace(
                              /^\/?storage\//,
                              ""
                          )}`;
                    setImagePreview(imagePath);
                }
            }

            // Fetch awards
            const awardsRes = await fetch("/api/principal-awards");
            const awardsData = await awardsRes.json();
            if (
                awardsData.success &&
                awardsData.data &&
                awardsData.data.length > 0
            ) {
                setAwards(awardsData.data);
                setAwardsList(
                    awardsData.data.map((a) => ({
                        id: a.id,
                        principal_profile_id: a.principal_profile_id, // KEEP THIS!
                        title: a.title,
                        award_year: a.award_year,
                        level: a.level,
                        issuing_organization: a.issuing_organization || "",
                        description: a.description || "",
                    }))
                );
            }

            // Fetch biography
            const bioRes = await fetch("/api/principal-corner?type=biography");
            const bioData = await bioRes.json();
            if (bioData.success && bioData.data && bioData.data.length > 0) {
                setBiography(bioData.data[0]);
                setFormData((prev) => ({
                    ...prev,
                    biography_content: bioData.data[0].content,
                }));
            }

            // Fetch PDS
            const pdsRes = await fetch("/api/principal-corner?type=vision");
            const pdsData = await pdsRes.json();
            if (pdsData.success && pdsData.data && pdsData.data.length > 0) {
                setPds(pdsData.data[0]);
                setFormData((prev) => ({
                    ...prev,
                    pds_content: pdsData.data[0].content,
                }));
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        console.log("=== FORM SUBMISSION STARTED ===");
        console.log("Form Data:", formData);
        console.log("Awards List:", awardsList);

        try {
            // 1. Save/Update Profile
            const profileFormData = new FormData();
            if (profile) {
                profileFormData.append("_method", "PUT");
            }
            profileFormData.append("full_name", formData.full_name);
            profileFormData.append("position", formData.position);
            profileFormData.append("email", formData.email);
            profileFormData.append("phone", formData.phone || "");
            profileFormData.append(
                "leadership_profile",
                formData.leadership_profile || ""
            );
            profileFormData.append("is_active", "1");

            // Only append image if a new one was selected
            if (imageFile) {
                profileFormData.append("profile_image", imageFile);
            }

            const profileUrl = profile
                ? `/api/admin/principal-profiles/${profile.id}`
                : "/api/admin/principal-profiles";

            // Get CSRF token
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            if (!csrfToken) {
                throw new Error("CSRF token not found");
            }

            const profileResponse = await fetch(profileUrl, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    Accept: "application/json",
                },
                credentials: "include",
                body: profileFormData,
            });

            if (!profileResponse.ok) {
                const errorText = await profileResponse.text();
                console.error("Profile save error:", errorText);
                throw new Error(
                    `Failed to save profile: ${profileResponse.status}`
                );
            }

            const profileResult = await profileResponse.json();
            if (!profileResult.success) {
                throw new Error(
                    profileResult.message || "Failed to save profile"
                );
            }

            // 2. Save/Update Biography
            if (formData.biography_content.trim()) {
                const bioPayload = {
                    title: "About the Principal",
                    content: formData.biography_content,
                    content_type: "biography",
                    author: formData.full_name || "Principal",
                    is_active: true,
                    is_featured: false,
                    display_order: 0,
                };

                const bioUrl = biography
                    ? `/api/admin/principal-corner/${biography.id}`
                    : "/api/admin/principal-corner";

                const bioMethod = biography ? "PUT" : "POST";

                await fetch(bioUrl, {
                    method: bioMethod,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                        Accept: "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(bioPayload),
                });
            }

            // 3. Save/Update PDS
            if (formData.pds_content.trim()) {
                const pdsPayload = {
                    title: "Personal Data Sheet",
                    content: formData.pds_content,
                    content_type: "vision",
                    author: formData.full_name || "Principal",
                    is_active: true,
                    is_featured: false,
                    display_order: 0,
                };

                const pdsUrl = pds
                    ? `/api/admin/principal-corner/${pds.id}`
                    : "/api/admin/principal-corner";

                const pdsMethod = pds ? "PUT" : "POST";

                await fetch(pdsUrl, {
                    method: pdsMethod,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                        Accept: "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(pdsPayload),
                });
            }

            // 4. Save Awards
            console.log("=== SAVING AWARDS ===");
            console.log("Profile ID:", profileResult.data.id);
            console.log("Awards to save:", awardsList);

            for (const award of awardsList) {
                if (award.title && award.title.trim()) {
                    const awardPayload = {
                        principal_profile_id:
                            award.principal_profile_id || profileResult.data.id,
                        title: award.title.trim(),
                        award_year: award.award_year.toString(),
                        level: award.level,
                        issuing_organization:
                            award.issuing_organization?.trim() || "",
                        description: award.description?.trim() || "",
                        is_active: true,
                        display_order: award.display_order || 0,
                    };

                    console.log("Saving award:", awardPayload);

                    const awardUrl = award.id
                        ? `/api/admin/principal-awards/${award.id}`
                        : "/api/admin/principal-awards";

                    const awardMethod = award.id ? "PUT" : "POST";

                    try {
                        const awardResponse = await fetch(awardUrl, {
                            method: awardMethod,
                            headers: {
                                "Content-Type": "application/json",
                                "X-CSRF-TOKEN": csrfToken,
                                Accept: "application/json",
                            },
                            credentials: "include",
                            body: JSON.stringify(awardPayload),
                        });

                        const awardResult = await awardResponse.json();
                        console.log("Award save result:", awardResult);

                        if (!awardResponse.ok || !awardResult.success) {
                            console.error(
                                "Failed to save award:",
                                award.title,
                                awardResult
                            );
                            throw new Error(
                                awardResult.message || "Failed to save award"
                            );
                        }
                    } catch (awardError) {
                        console.error("Award save error:", awardError);
                        throw new Error(
                            `Failed to save award "${award.title}": ${awardError.message}`
                        );
                    }
                }
            }

            console.log("=== ALL AWARDS SAVED ===");

            setSuccess("Principal information saved successfully!");
            await fetchAllData();

            // Navigate to principal corner view page after 1 second
            setTimeout(() => {
                window.location.href = "/admin/principal-corner";
            }, 1000);
        } catch (err) {
            console.error("Error saving:", err);
            setError("Failed to save principal information");
        } finally {
            setSaving(false);
        }
    };

    const addAward = () => {
        setAwardsList([
            ...awardsList,
            {
                title: "",
                award_year: new Date().getFullYear(),
                level: "regional",
                issuing_organization: "",
                description: "",
            },
        ]);
    };

    const removeAward = (index) => {
        setAwardsList(awardsList.filter((_, i) => i !== index));
    };

    const updateAward = (index, field, value) => {
        const updated = [...awardsList];
        updated[index][field] = value;
        setAwardsList(updated);
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
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <User className="h-6 w-6" />
                    Principal Management
                </h1>
                <p className="text-blue-100 text-sm">
                    Manage all principal information in one place
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
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        Basic Information
                    </h2>

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

                    {/* Photo Upload */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Principal Photo
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
                                        if (file) {
                                            if (
                                                imagePreview &&
                                                imagePreview.startsWith("blob:")
                                            ) {
                                                URL.revokeObjectURL(
                                                    imagePreview
                                                );
                                            }
                                            setImagePreview(
                                                URL.createObjectURL(file)
                                            );
                                        }
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Upload principal's photo (JPG, PNG, max 2MB)
                                </p>
                            </div>

                            {imagePreview && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Leadership Profile */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        Leadership Profile
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Main biography text displayed on the principal page
                    </p>
                    <textarea
                        value={formData.leadership_profile}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                leadership_profile: e.target.value,
                            })
                        }
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter the main biography text that will be displayed on the principal page..."
                    />
                </div>

                {/* About the Principal (Modal Content) */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        About the Principal
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Content for the "About the Principal" modal button
                    </p>
                    <textarea
                        value={formData.biography_content}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                biography_content: e.target.value,
                            })
                        }
                        rows={8}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter detailed biography for the modal..."
                    />
                </div>

                {/* Personal Data Sheet (Modal Content) */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        Personal Data Sheet
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Content for the "Personal Data Sheet" modal button
                    </p>
                    <textarea
                        value={formData.pds_content}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                pds_content: e.target.value,
                            })
                        }
                        rows={8}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter PDS content for the modal..."
                    />
                </div>

                {/* Awards */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                Awards & Achievements
                            </h2>
                            <p className="text-sm text-gray-600">
                                Add awards that will be displayed in the awards
                                section
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={addAward}
                            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2"
                        >
                            <Trophy className="h-4 w-4" />
                            Add Award
                        </button>
                    </div>

                    <div className="space-y-4">
                        {awardsList.map((award, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 relative"
                            >
                                {awardsList.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeAward(index)}
                                        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Award Title *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={award.title}
                                            onChange={(e) =>
                                                updateAward(
                                                    index,
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Award Year *
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="1900"
                                            max="2100"
                                            value={award.award_year}
                                            onChange={(e) =>
                                                updateAward(
                                                    index,
                                                    "award_year",
                                                    parseInt(e.target.value) ||
                                                        new Date().getFullYear()
                                                )
                                            }
                                            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Award Level *
                                        </label>
                                        <select
                                            required
                                            value={award.level}
                                            onChange={(e) =>
                                                updateAward(
                                                    index,
                                                    "level",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                                        >
                                            <option value="international">
                                                🌍 International Level
                                            </option>
                                            <option value="national">
                                                🇵🇭 National Level
                                            </option>
                                            <option value="regional">
                                                📍 Regional Level
                                            </option>
                                            <option value="provincial">
                                                🏛️ Provincial Level
                                            </option>
                                            <option value="local">
                                                🏘️ Local Level
                                            </option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Issuing Organization
                                        </label>
                                        <input
                                            type="text"
                                            value={award.issuing_organization}
                                            onChange={(e) =>
                                                updateAward(
                                                    index,
                                                    "issuing_organization",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Description (Optional)
                                        </label>
                                        <textarea
                                            value={award.description}
                                            onChange={(e) =>
                                                updateAward(
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            rows={3}
                                            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-5 w-5" />
                                Save All Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PrincipalManagement;
