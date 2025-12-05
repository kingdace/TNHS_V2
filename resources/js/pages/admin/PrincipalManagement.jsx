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
    Plus,
    Briefcase,
    Phone,
    Mail,
    GraduationCap,
} from "lucide-react";
import {
    parseContent,
    stringifyContent,
    createEmptyWorkExperience,
} from "../../utils/principalDataHelpers";

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

    // Work Experience form (structured)
    const [workExperienceList, setWorkExperienceList] = useState([
        createEmptyWorkExperience(),
    ]);

    // Personal Data Sheet form (structured)
    const [pdsData, setPdsData] = useState({
        personal_info: {
            surname: "",
            first_name: "",
            middle_name: "",
            date_of_birth: "",
            place_of_birth: "",
            sex: "Male",
            civil_status: "Single",
            height: "",
            weight: "",
            blood_type: "",
            citizenship: "Filipino",
        },
        contact_info: {
            residential_address: "",
            mobile: "",
            email: "",
        },
        educational_background: [],
    });

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

                // Parse work experience from content
                const parsed = parseContent(bioData.data[0].content);
                if (
                    parsed.type === "structured" &&
                    parsed.data.work_experience
                ) {
                    setWorkExperienceList(parsed.data.work_experience);
                } else {
                    // Legacy plain text - keep in formData for backward compatibility
                    setFormData((prev) => ({
                        ...prev,
                        biography_content: bioData.data[0].content,
                    }));
                }
            }

            // Fetch PDS
            const pdsRes = await fetch("/api/principal-corner?type=vision");
            const pdsData = await pdsRes.json();
            if (pdsData.success && pdsData.data && pdsData.data.length > 0) {
                setPds(pdsData.data[0]);

                // Parse PDS from content
                const parsed = parseContent(pdsData.data[0].content);
                if (parsed.type === "structured") {
                    setPdsData(parsed.data);
                } else {
                    // Legacy plain text - keep in formData for backward compatibility
                    setFormData((prev) => ({
                        ...prev,
                        pds_content: pdsData.data[0].content,
                    }));
                }
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

            // 2. Save/Update Biography (Work Experience)
            // Check if we have structured work experience or legacy content
            const hasStructuredData = workExperienceList.some(
                (exp) => exp.from_date || exp.position
            );

            let biographyContent;
            if (hasStructuredData) {
                // Save as structured JSON
                biographyContent = stringifyContent({
                    work_experience: workExperienceList,
                });
            } else if (formData.biography_content.trim()) {
                // Save legacy plain text
                biographyContent = formData.biography_content;
            }

            if (biographyContent) {
                const bioPayload = {
                    title: "About the Principal",
                    content: biographyContent,
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
            // Check if we have structured PDS data or legacy content
            const hasStructuredPDS =
                pdsData.personal_info.surname || pdsData.contact_info.mobile;

            let pdsContent;
            if (hasStructuredPDS) {
                // Save as structured JSON
                pdsContent = stringifyContent(pdsData);
            } else if (formData.pds_content.trim()) {
                // Save legacy plain text
                pdsContent = formData.pds_content;
            }

            if (pdsContent) {
                const pdsPayload = {
                    title: "Personal Data Sheet",
                    content: pdsContent,
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

    // Work Experience management functions
    const addWorkExperience = () => {
        setWorkExperienceList([
            ...workExperienceList,
            createEmptyWorkExperience(),
        ]);
    };

    const removeWorkExperience = (index) => {
        setWorkExperienceList(workExperienceList.filter((_, i) => i !== index));
    };

    const updateWorkExperience = (index, field, value) => {
        const updated = [...workExperienceList];
        updated[index][field] = value;
        setWorkExperienceList(updated);
    };

    // PDS management functions
    const updatePDSPersonalInfo = (field, value) => {
        setPdsData((prev) => ({
            ...prev,
            personal_info: {
                ...prev.personal_info,
                [field]: value,
            },
        }));
    };

    const updatePDSContactInfo = (field, value) => {
        setPdsData((prev) => ({
            ...prev,
            contact_info: {
                ...prev.contact_info,
                [field]: value,
            },
        }));
    };

    const addEducation = () => {
        setPdsData((prev) => ({
            ...prev,
            educational_background: [
                ...prev.educational_background,
                { level: "", school_name: "", degree: "", year_graduated: "" },
            ],
        }));
    };

    const removeEducation = (index) => {
        setPdsData((prev) => ({
            ...prev,
            educational_background: prev.educational_background.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const updateEducation = (index, field, value) => {
        setPdsData((prev) => ({
            ...prev,
            educational_background: prev.educational_background.map((edu, i) =>
                i === index ? { ...edu, [field]: value } : edu
            ),
        }));
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

                {/* About the Principal (Work Experience) - Structured Form */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-green-600" />
                                About the Principal - Work Experience
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Add work experience entries that will be
                                displayed in the "About the Principal" modal
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={addWorkExperience}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Experience
                        </button>
                    </div>

                    <div className="space-y-4">
                        {workExperienceList.map((exp, index) => (
                            <div
                                key={index}
                                className="border-2 border-gray-200 rounded-lg p-4 relative bg-gray-50 hover:border-green-300 transition-colors"
                            >
                                {workExperienceList.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeWorkExperience(index)
                                        }
                                        className="absolute top-2 right-2 text-red-600 hover:text-red-800 bg-white rounded-full p-1 shadow-sm"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* From Date */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            From Date *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={exp.from_date}
                                            onChange={(e) =>
                                                updateWorkExperience(
                                                    index,
                                                    "from_date",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            placeholder="MM/DD/YYYY"
                                        />
                                    </div>

                                    {/* To Date */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            To Date *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={exp.to_date}
                                            onChange={(e) =>
                                                updateWorkExperience(
                                                    index,
                                                    "to_date",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            placeholder="Present or MM/DD/YYYY"
                                        />
                                    </div>

                                    {/* Position */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Position Title *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={exp.position}
                                            onChange={(e) =>
                                                updateWorkExperience(
                                                    index,
                                                    "position",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            placeholder="e.g., Secondary School Principal IV"
                                        />
                                    </div>

                                    {/* Status */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Status *
                                        </label>
                                        <select
                                            required
                                            value={exp.status}
                                            onChange={(e) =>
                                                updateWorkExperience(
                                                    index,
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                        >
                                            <option value="Permanent">
                                                Permanent
                                            </option>
                                            <option value="Temporary">
                                                Temporary
                                            </option>
                                            <option value="Contract">
                                                Contract
                                            </option>
                                            <option value="Probationary">
                                                Probationary
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Personal Data Sheet - Structured Form */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" />
                        Personal Data Sheet
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Enter personal information that will be displayed in the
                        "Personal Data Sheet" modal
                    </p>

                    {/* Personal Information Section */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Surname
                                </label>
                                <input
                                    type="text"
                                    value={pdsData.personal_info.surname}
                                    onChange={(e) =>
                                        updatePDSPersonalInfo(
                                            "surname",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="DAYONDON"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={pdsData.personal_info.first_name}
                                    onChange={(e) =>
                                        updatePDSPersonalInfo(
                                            "first_name",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="MANUEL"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    value={pdsData.personal_info.middle_name}
                                    onChange={(e) =>
                                        updatePDSPersonalInfo(
                                            "middle_name",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="BALLORI"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Date of Birth
                                </label>
                                <input
                                    type="text"
                                    value={pdsData.personal_info.date_of_birth}
                                    onChange={(e) =>
                                        updatePDSPersonalInfo(
                                            "date_of_birth",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="7/9/1980"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Place of Birth
                                </label>
                                <input
                                    type="text"
                                    value={pdsData.personal_info.place_of_birth}
                                    onChange={(e) =>
                                        updatePDSPersonalInfo(
                                            "place_of_birth",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="SURIGAO"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Sex
                                </label>
                                <select
                                    value={pdsData.personal_info.sex}
                                    onChange={(e) =>
                                        updatePDSPersonalInfo(
                                            "sex",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Civil Status
                                </label>
                                <select
                                    value={pdsData.personal_info.civil_status}
                                    onChange={(e) =>
                                        updatePDSPersonalInfo(
                                            "civil_status",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Widowed">Widowed</option>
                                    <option value="Separated">Separated</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Height (cm)
                                </label>
                                <input
                                    type="text"
                                    value={pdsData.personal_info.height}
                                    onChange={(e) =>
                                        updatePDSPersonalInfo(
                                            "height",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="165"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Weight (kg)
                                </label>
                                <input
                                    type="text"
                                    value={pdsData.personal_info.weight}
                                    onChange={(e) =>
                                        updatePDSPersonalInfo(
                                            "weight",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="65"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Blood Type
                                </label>
                                <input
                                    type="text"
                                    value={pdsData.personal_info.blood_type}
                                    onChange={(e) =>
                                        updatePDSPersonalInfo(
                                            "blood_type",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="O+"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Citizenship
                                </label>
                                <input
                                    type="text"
                                    value={pdsData.personal_info.citizenship}
                                    onChange={(e) =>
                                        updatePDSPersonalInfo(
                                            "citizenship",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Filipino"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="mb-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Mobile
                                </label>
                                <input
                                    type="text"
                                    value={pdsData.contact_info.mobile}
                                    onChange={(e) =>
                                        updatePDSContactInfo(
                                            "mobile",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="09123456789"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={pdsData.contact_info.email}
                                    onChange={(e) =>
                                        updatePDSContactInfo(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="principal@tnhs.edu.ph"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Residential Address
                                </label>
                                <textarea
                                    value={
                                        pdsData.contact_info.residential_address
                                    }
                                    onChange={(e) =>
                                        updatePDSContactInfo(
                                            "residential_address",
                                            e.target.value
                                        )
                                    }
                                    rows={2}
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Complete address"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Educational Background Section */}
                    <div className="mb-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-purple-900 flex items-center gap-2">
                                <GraduationCap className="h-4 w-4" />
                                Educational Background
                            </h3>
                            <button
                                type="button"
                                onClick={addEducation}
                                className="bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm"
                            >
                                <Plus className="h-3 w-3" />
                                Add Education
                            </button>
                        </div>
                        <div className="space-y-3">
                            {pdsData.educational_background.map(
                                (edu, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-3 rounded-lg border-2 border-gray-200 relative"
                                    >
                                        {pdsData.educational_background.length >
                                            0 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeEducation(index)
                                                }
                                                className="absolute top-2 right-2 text-red-600 hover:text-red-800 bg-white rounded-full p-1 shadow-sm"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                    Level
                                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.level}
                                                    onChange={(e) =>
                                                        updateEducation(
                                                            index,
                                                            "level",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                                                    placeholder="e.g., Elementary, High School, College"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                    Year Graduated
                                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.year_graduated}
                                                    onChange={(e) =>
                                                        updateEducation(
                                                            index,
                                                            "year_graduated",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                                                    placeholder="YYYY"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                    School/University
                                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.school_name}
                                                    onChange={(e) =>
                                                        updateEducation(
                                                            index,
                                                            "school_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                                                    placeholder="Name of school"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                    Degree/Course
                                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.degree}
                                                    onChange={(e) =>
                                                        updateEducation(
                                                            index,
                                                            "degree",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                                                    placeholder="e.g., Bachelor of Science in Education"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                            {pdsData.educational_background.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    No educational background added yet. Click
                                    "Add Education" to start.
                                </p>
                            )}
                        </div>
                    </div>
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
