/**
 * Principal Data Helper Functions
 * Handles parsing and formatting of principal corner data
 * Supports both structured JSON and legacy plain text formats
 */

/**
 * Parse content from database
 * @param {string} content - Raw content from database
 * @returns {Object} Parsed data with type indicator
 */
export function parseContent(content) {
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
}

/**
 * Convert structured data to JSON string for storage
 * @param {Object} sections - Structured data sections
 * @returns {string} JSON string
 */
export function stringifyContent(sections) {
    return JSON.stringify({
        type: "structured",
        sections: sections,
    });
}

/**
 * Format work experience for display
 * @param {Array} workExperience - Array of work experience objects
 * @returns {Array} Formatted work experience
 */
export function formatWorkExperience(workExperience) {
    if (!Array.isArray(workExperience)) {
        return [];
    }

    return workExperience.map((exp) => ({
        from_date: exp.from_date || "",
        to_date: exp.to_date || "",
        position: exp.position || "",
        status: exp.status || "",
    }));
}

/**
 * Create empty work experience entry
 * @returns {Object} Empty work experience object
 */
export function createEmptyWorkExperience() {
    return {
        from_date: "",
        to_date: "Present",
        position: "",
        status: "Permanent",
    };
}

/**
 * Validate work experience entry
 * @param {Object} experience - Work experience object
 * @returns {Object} Validation result
 */
export function validateWorkExperience(experience) {
    const errors = {};

    if (!experience.from_date || experience.from_date.trim() === "") {
        errors.from_date = "From date is required";
    }

    if (!experience.position || experience.position.trim() === "") {
        errors.position = "Position is required";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}
