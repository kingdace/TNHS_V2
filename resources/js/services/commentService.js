// Gallery Comment Service

const API_BASE_URL = "/api/gallery";

/**
 * Get all comments for a specific image
 * @param {number} imageId
 * @returns {Promise}
 */
export const getComments = async (imageId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${imageId}/comments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return { success: false, message: "Failed to load comments" };
    }
};

/**
 * Post a new comment
 * @param {number} imageId
 * @param {string} guestId
 * @param {string} commentText
 * @param {string} browserFingerprint
 * @returns {Promise}
 */
export const postComment = async (
    imageId,
    guestId,
    commentText,
    browserFingerprint
) => {
    try {
        // Get CSRF token
        const csrfResponse = await fetch("/api/csrf-token");
        const { csrf_token } = await csrfResponse.json();

        const response = await fetch(`${API_BASE_URL}/${imageId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
            body: JSON.stringify({
                guest_id: guestId,
                comment_text: commentText,
                browser_fingerprint: browserFingerprint,
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error posting comment:", error);
        return { success: false, message: "Failed to post comment" };
    }
};

/**
 * Delete a comment (Admin only)
 * @param {number} commentId
 * @returns {Promise}
 */
export const deleteComment = async (commentId) => {
    try {
        // Get CSRF token
        const csrfResponse = await fetch("/api/csrf-token");
        const { csrf_token } = await csrfResponse.json();

        const response = await fetch(
            `/api/admin/gallery/comments/${commentId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrf_token,
                },
            }
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        return { success: false, message: "Failed to delete comment" };
    }
};

/**
 * Get all comments for admin panel
 * @param {object} filters - { image_id, flagged }
 * @returns {Promise}
 */
export const getAdminComments = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const url = `/api/admin/gallery/comments${
            queryParams ? `?${queryParams}` : ""
        }`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching admin comments:", error);
        return { success: false, message: "Failed to load comments" };
    }
};

/**
 * Toggle flag status of a comment (Admin only)
 * @param {number} commentId
 * @returns {Promise}
 */
export const toggleCommentFlag = async (commentId) => {
    try {
        // Get CSRF token
        const csrfResponse = await fetch("/api/csrf-token");
        const { csrf_token } = await csrfResponse.json();

        const response = await fetch(
            `/api/admin/gallery/comments/${commentId}/toggle-flag`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrf_token,
                },
            }
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error toggling comment flag:", error);
        return { success: false, message: "Failed to update comment" };
    }
};

/**
 * Post an admin reply to a comment
 * @param {number} imageId
 * @param {string} commentText
 * @param {number|null} parentId - Optional parent comment ID for threaded replies
 * @returns {Promise}
 */
export const postAdminReply = async (imageId, commentText, parentId = null) => {
    try {
        // Get CSRF token
        const csrfResponse = await fetch("/api/csrf-token");
        const { csrf_token } = await csrfResponse.json();

        const response = await fetch(
            `/api/admin/gallery/${imageId}/comments/reply`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrf_token,
                },
                body: JSON.stringify({
                    comment_text: commentText,
                    parent_id: parentId,
                }),
            }
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error posting admin reply:", error);
        return { success: false, message: "Failed to post reply" };
    }
};

export default {
    getComments,
    postComment,
    deleteComment,
    getAdminComments,
    toggleCommentFlag,
    postAdminReply,
};
