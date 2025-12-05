import React from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Users,
    GraduationCap,
    Award,
    Briefcase,
    Heart,
} from "lucide-react";

/**
 * PersonalDataSheetDisplay Component
 * Displays Personal Data Sheet in organized, sectioned grid layout
 * Supports both structured and legacy plain text data
 */
const PersonalDataSheetDisplay = ({ content }) => {
    // Parse content
    const parseContent = (content) => {
        if (!content || content.trim() === "") {
            return { type: "empty", data: null };
        }

        try {
            const parsed = JSON.parse(content);
            if (parsed.type === "structured" && parsed.sections) {
                return {
                    type: "structured",
                    data: parsed.sections,
                };
            }
        } catch (e) {
            // Not JSON, treat as legacy plain text
        }

        return {
            type: "legacy",
            data: content,
        };
    };

    const parsedContent = parseContent(content);

    // Empty state
    if (parsedContent.type === "empty") {
        return (
            <div className="text-center py-8 text-gray-500">
                <User className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No personal data sheet available</p>
            </div>
        );
    }

    // Legacy plain text display
    if (parsedContent.type === "legacy") {
        return (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                    {parsedContent.data}
                </pre>
            </div>
        );
    }

    // Structured display
    const pds = parsedContent.data;

    return (
        <div className="space-y-6">
            {/* Personal Information Section */}
            {pds.personal_info && (
                <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border-2 border-blue-200">
                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {pds.personal_info.surname && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Surname
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.personal_info.surname}
                                </p>
                            </div>
                        )}
                        {pds.personal_info.first_name && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    First Name
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.personal_info.first_name}
                                </p>
                            </div>
                        )}
                        {pds.personal_info.middle_name && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Middle Name
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.personal_info.middle_name}
                                </p>
                            </div>
                        )}
                        {pds.personal_info.date_of_birth && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Date of Birth
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.personal_info.date_of_birth}
                                </p>
                            </div>
                        )}
                        {pds.personal_info.place_of_birth && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Place of Birth
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.personal_info.place_of_birth}
                                </p>
                            </div>
                        )}
                        {pds.personal_info.sex && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Sex
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.personal_info.sex}
                                </p>
                            </div>
                        )}
                        {pds.personal_info.civil_status && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Civil Status
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.personal_info.civil_status}
                                </p>
                            </div>
                        )}
                        {pds.personal_info.height && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Height (cm)
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.personal_info.height}
                                </p>
                            </div>
                        )}
                        {pds.personal_info.weight && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Weight (kg)
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.personal_info.weight}
                                </p>
                            </div>
                        )}
                        {pds.personal_info.blood_type && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Blood Type
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.personal_info.blood_type}
                                </p>
                            </div>
                        )}
                        {pds.personal_info.citizenship && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Citizenship
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.personal_info.citizenship}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Contact Information Section */}
            {pds.contact_info && (
                <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-lg border-2 border-green-200">
                    <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pds.contact_info.mobile && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    Mobile
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.contact_info.mobile}
                                </p>
                            </div>
                        )}
                        {pds.contact_info.email && (
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    Email
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.contact_info.email}
                                </p>
                            </div>
                        )}
                        {pds.contact_info.residential_address && (
                            <div className="bg-white p-3 rounded-lg shadow-sm md:col-span-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    Residential Address
                                </label>
                                <p className="text-sm font-bold text-gray-900">
                                    {pds.contact_info.residential_address}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Educational Background Section */}
            {pds.educational_background &&
                pds.educational_background.length > 0 && (
                    <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-lg border-2 border-purple-200">
                        <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            Educational Background
                        </h3>
                        <div className="space-y-3">
                            {pds.educational_background.map((edu, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase">
                                                Level
                                            </label>
                                            <p className="text-sm font-bold text-gray-900">
                                                {edu.level}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase">
                                                Year Graduated
                                            </label>
                                            <p className="text-sm font-bold text-gray-900">
                                                {edu.year_graduated}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase">
                                                School/University
                                            </label>
                                            <p className="text-sm font-bold text-gray-900">
                                                {edu.school_name}
                                            </p>
                                        </div>
                                        {edu.degree && (
                                            <div>
                                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                                    Degree/Course
                                                </label>
                                                <p className="text-sm font-bold text-gray-900">
                                                    {edu.degree}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            {/* No data message */}
            {!pds.personal_info &&
                !pds.contact_info &&
                !pds.educational_background && (
                    <div className="text-center py-8 text-gray-500">
                        <User className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                        <p>No personal data sheet information available</p>
                    </div>
                )}
        </div>
    );
};

export default PersonalDataSheetDisplay;
