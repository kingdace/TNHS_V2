import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Trophy,
    Edit,
    Mail,
    Phone,
    FileText,
    Award,
    Loader2,
    Plus,
    AlertCircle,
} from "lucide-react";
import WorkExperienceDisplay from "../../components/principal/WorkExperienceDisplay";
import PersonalDataSheetDisplay from "../../components/principal/PersonalDataSheetDisplay";

const PrincipalCorner = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [profile, setProfile] = useState(null);
    const [awards, setAwards] = useState([]);
    const [biography, setBiography] = useState(null);
    const [pds, setPds] = useState(null);

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
                setProfile(profileData.data);
            }

            // Fetch awards
            const awardsRes = await fetch("/api/principal-awards");
            const awardsData = await awardsRes.json();
            if (awardsData.success && awardsData.data) {
                setAwards(awardsData.data);
            }

            // Fetch biography
            const bioRes = await fetch("/api/principal-corner?type=biography");
            const bioData = await bioRes.json();
            if (bioData.success && bioData.data && bioData.data.length > 0) {
                setBiography(bioData.data[0]);
            }

            // Fetch PDS
            const pdsRes = await fetch("/api/principal-corner?type=vision");
            const pdsData = await pdsRes.json();
            if (pdsData.success && pdsData.data && pdsData.data.length > 0) {
                setPds(pdsData.data[0]);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const hasData = profile || awards.length > 0 || biography || pds;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl px-6 py-4 text-white shadow-lg flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <User className="h-6 w-6" />
                        Principal Information
                    </h1>
                    <p className="text-blue-100 text-sm">
                        View and manage principal information
                    </p>
                </div>
                <button
                    onClick={() => navigate("/admin/principal")}
                    className="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2 font-medium"
                >
                    {hasData ? (
                        <>
                            <Edit className="h-4 w-4" />
                            Edit Information
                        </>
                    ) : (
                        <>
                            <Plus className="h-4 w-4" />
                            Add Information
                        </>
                    )}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error}
                </div>
            )}

            {/* Empty State */}
            {!hasData && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        No Principal Information Yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Click the button above to add principal information
                    </p>
                    <button
                        onClick={() => navigate("/admin/principal")}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        Add Principal Information
                    </button>
                </div>
            )}

            {/* Profile Information */}
            {profile && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" />
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Photo */}
                        {profile.profile_image && (
                            <div className="md:col-span-2 flex justify-center">
                                <img
                                    src={
                                        profile.profile_image.startsWith("http")
                                            ? profile.profile_image
                                            : `/storage/${profile.profile_image.replace(
                                                  /^\/?storage\//,
                                                  ""
                                              )}`
                                    }
                                    alt={profile.full_name}
                                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Full Name
                            </label>
                            <p className="text-base font-semibold text-gray-900">
                                {profile.full_name}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Position/Title
                            </label>
                            <p className="text-base font-semibold text-gray-900">
                                {profile.position}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                Email
                            </label>
                            <p className="text-base text-gray-900">
                                {profile.email}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                Phone
                            </label>
                            <p className="text-base text-gray-900">
                                {profile.phone || "Not set"}
                            </p>
                        </div>

                        {profile.leadership_profile && (
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Leadership Profile
                                </label>
                                <div className="text-base text-gray-900 bg-gray-100 p-4 rounded-lg border border-gray-200">
                                    {profile.leadership_profile}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Biography (About the Principal) */}
            {biography && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-teal-600" />
                        About the Principal
                    </h2>
                    <WorkExperienceDisplay content={biography.content} />
                </div>
            )}

            {/* Personal Data Sheet */}
            {pds && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-purple-600" />
                        Personal Data Sheet
                    </h2>
                    <PersonalDataSheetDisplay content={pds.content} />
                </div>
            )}

            {/* Awards */}
            {awards.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-600" />
                        Awards & Achievements ({awards.length})
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {awards.map((award) => (
                            <div
                                key={award.id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Award className="h-5 w-5 text-yellow-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 text-sm">
                                            {award.title}
                                        </h3>
                                        <p className="text-lg font-bold text-yellow-600">
                                            {award.award_year}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                        {award.level.charAt(0).toUpperCase() +
                                            award.level.slice(1)}{" "}
                                        Level
                                    </span>

                                    {award.issuing_organization && (
                                        <p className="text-xs text-gray-600">
                                            <strong>Issued by:</strong>{" "}
                                            {award.issuing_organization}
                                        </p>
                                    )}

                                    {award.description && (
                                        <p className="text-xs text-gray-700">
                                            {award.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Edit Button at Bottom */}
            {hasData && (
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate("/admin/principal")}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                    >
                        <Edit className="h-5 w-5" />
                        Edit Principal Information
                    </button>
                </div>
            )}
        </div>
    );
};

export default PrincipalCorner;
