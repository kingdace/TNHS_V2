// Guest ID Helper Functions for Gallery Comments

/**
 * Generate a unique 6-character guest ID
 * @returns {string} Guest ID (e.g., "A7B2F1")
 */
export const generateGuestId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

/**
 * Get or create guest ID from localStorage
 * @returns {string} Guest ID
 */
export const getGuestId = () => {
    let guestId = localStorage.getItem("tnhs_guest_id");

    if (!guestId) {
        guestId = generateGuestId();
        localStorage.setItem("tnhs_guest_id", guestId);
    }

    return guestId;
};

/**
 * Get color for guest ID (8 colors)
 * @param {string} guestId
 * @returns {object} Color object with bg and text classes
 */
export const getGuestColor = (guestId) => {
    const colors = [
        { bg: "bg-blue-500", text: "text-blue-500", light: "bg-blue-100" },
        { bg: "bg-green-500", text: "text-green-500", light: "bg-green-100" },
        {
            bg: "bg-purple-500",
            text: "text-purple-500",
            light: "bg-purple-100",
        },
        { bg: "bg-pink-500", text: "text-pink-500", light: "bg-pink-100" },
        {
            bg: "bg-orange-500",
            text: "text-orange-500",
            light: "bg-orange-100",
        },
        { bg: "bg-teal-500", text: "text-teal-500", light: "bg-teal-100" },
        { bg: "bg-red-500", text: "text-red-500", light: "bg-red-100" },
        {
            bg: "bg-indigo-500",
            text: "text-indigo-500",
            light: "bg-indigo-100",
        },
    ];

    // Convert guest ID to number for consistent color assignment
    const colorIndex = parseInt(guestId, 36) % colors.length;
    return colors[colorIndex];
};

/**
 * Generate browser fingerprint for rate limiting
 * @returns {string} Browser fingerprint
 */
export const getBrowserFingerprint = () => {
    const fingerprint = `${navigator.userAgent}_${screen.width}x${screen.height}_${navigator.language}`;
    return btoa(fingerprint).substring(0, 64); // Base64 encode and limit length
};

/**
 * Check if user can comment on an image
 * @param {number} imageId
 * @returns {object} { canComment, reason, remaining }
 */
export const checkCommentLimits = (imageId) => {
    try {
        // Check cooldown (60 seconds)
        const lastCommentTime = localStorage.getItem("tnhs_last_comment_time");
        if (lastCommentTime) {
            const timeSinceLastComment =
                Date.now() - new Date(lastCommentTime).getTime();
            if (timeSinceLastComment < 60000) {
                // 60 seconds
                const remainingSeconds = Math.ceil(
                    (60000 - timeSinceLastComment) / 1000
                );
                return {
                    canComment: false,
                    reason: `Please wait ${remainingSeconds} seconds before commenting again`,
                    cooldown: true,
                };
            }
        }

        // Check per-image limit (5 comments)
        const commentsPerImage = JSON.parse(
            localStorage.getItem("tnhs_comments_per_image") || "{}"
        );
        const imageCommentCount = commentsPerImage[imageId] || 0;
        if (imageCommentCount >= 5) {
            return {
                canComment: false,
                reason: "You have reached the comment limit for this image (5 max)",
                imageLimit: true,
            };
        }

        // Check daily limit (20 comments)
        const commentDate = localStorage.getItem("tnhs_comment_date");
        const today = new Date().toDateString();

        let dailyCount = 0;
        if (commentDate === today) {
            dailyCount = parseInt(
                localStorage.getItem("tnhs_comment_count_today") || "0"
            );
        } else {
            // Reset daily count if it's a new day
            localStorage.setItem("tnhs_comment_date", today);
            localStorage.setItem("tnhs_comment_count_today", "0");
        }

        if (dailyCount >= 20) {
            return {
                canComment: false,
                reason: "You have reached your daily comment limit (20 max). Try again tomorrow!",
                dailyLimit: true,
            };
        }

        // Calculate remaining comments
        const remainingForImage = 5 - imageCommentCount;
        const remainingToday = 20 - dailyCount;

        return {
            canComment: true,
            remainingForImage,
            remainingToday,
        };
    } catch (error) {
        console.error("Error checking comment limits:", error);
        return { canComment: true };
    }
};

/**
 * Update comment counts after posting
 * @param {number} imageId
 */
export const updateCommentCounts = (imageId) => {
    try {
        // Update last comment time
        localStorage.setItem(
            "tnhs_last_comment_time",
            new Date().toISOString()
        );

        // Update per-image count
        const commentsPerImage = JSON.parse(
            localStorage.getItem("tnhs_comments_per_image") || "{}"
        );
        commentsPerImage[imageId] = (commentsPerImage[imageId] || 0) + 1;
        localStorage.setItem(
            "tnhs_comments_per_image",
            JSON.stringify(commentsPerImage)
        );

        // Update daily count
        const today = new Date().toDateString();
        const commentDate = localStorage.getItem("tnhs_comment_date");

        if (commentDate === today) {
            const dailyCount = parseInt(
                localStorage.getItem("tnhs_comment_count_today") || "0"
            );
            localStorage.setItem(
                "tnhs_comment_count_today",
                (dailyCount + 1).toString()
            );
        } else {
            localStorage.setItem("tnhs_comment_date", today);
            localStorage.setItem("tnhs_comment_count_today", "1");
        }
    } catch (error) {
        console.error("Error updating comment counts:", error);
    }
};

/**
 * Format time ago (e.g., "2 hours ago", "1 day ago")
 * @param {string} dateString
 * @returns {string} Formatted time
 */
export const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;

    return date.toLocaleDateString();
};
