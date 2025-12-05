import React from "react";
import { Briefcase, Calendar, Award } from "lucide-react";

/**
 * WorkExperienceDisplay Component
 * Displays work experience in a card-based timeline format
 * Supports both structured and legacy plain text data
 */
const WorkExperienceDisplay = ({ content }) => {
    // Parse content
    const parseContent = (content) => {
        if (!content || content.trim() === "") {
            return { type: "empty", data: null };
        }

        try {
            const parsed = JSON.parse(content);
            if (
                parsed.type === "structured" &&
                parsed.sections?.work_experience
            ) {
                return {
                    type: "structured",
                    data: parsed.sections.work_experience,
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
                <Briefcase className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No work experience information available</p>
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
    const workExperience = parsedContent.data;

    if (!Array.isArray(workExperience) || workExperience.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <Briefcase className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No work experience entries</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-green-500 pb-2 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-green-600" />
                Work Experience
            </h3>

            {/* Timeline/Card Layout */}
            <div className="space-y-3">
                {workExperience.map((exp, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Period */}
                            <div>
                                <span className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Period
                                </span>
                                <p className="text-sm font-bold text-gray-900 mt-1">
                                    {exp.from_date} - {exp.to_date}
                                </p>
                            </div>

                            {/* Status */}
                            <div>
                                <span className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                                    <Award className="h-3 w-3" />
                                    Status
                                </span>
                                <p className="text-sm font-bold text-green-700 mt-1">
                                    {exp.status}
                                </p>
                            </div>

                            {/* Position */}
                            <div className="md:col-span-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Position
                                </span>
                                <p className="text-base font-bold text-gray-900 mt-1">
                                    {exp.position}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkExperienceDisplay;
