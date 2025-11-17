class NotificationService {
    constructor() {
        this.baseURL = "/api/notifications";
    }

    /**
     * Get CSRF token from meta tag
     */
    getCSRFToken() {
        return document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");
    }

    /**
     * Get notifications with optional filters
     */
    async getNotifications(params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const url = queryString
                ? `${this.baseURL}?${queryString}`
                : this.baseURL;

            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": this.getCSRFToken(),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching notifications:", error);
            throw error;
        }
    }

    /**
     * Get unread notifications count
     */
    async getUnreadCount() {
        try {
            const response = await fetch(`${this.baseURL}/unread-count`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": this.getCSRFToken(),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result.success ? result.data.count : 0;
        } catch (error) {
            console.error("Error fetching unread count:", error);
            return 0; // Return 0 on error to prevent UI issues
        }
    }

    /**
     * Mark notification as read
     */
    async markAsRead(id) {
        try {
            const response = await fetch(`${this.baseURL}/${id}/mark-read`, {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": this.getCSRFToken(),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error marking notification as read:", error);
            throw error;
        }
    }

    /**
     * Mark all notifications as read
     */
    async markAllAsRead() {
        try {
            const response = await fetch(`${this.baseURL}/mark-all-read`, {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": this.getCSRFToken(),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error marking all notifications as read:", error);
            throw error;
        }
    }

    /**
     * Delete notification
     */
    async deleteNotification(id) {
        try {
            const response = await fetch(`${this.baseURL}/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": this.getCSRFToken(),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error deleting notification:", error);
            throw error;
        }
    }

    /**
     * Cleanup old notifications
     */
    async cleanup() {
        try {
            const response = await fetch(`${this.baseURL}/cleanup`, {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": this.getCSRFToken(),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error cleaning up notifications:", error);
            throw error;
        }
    }
}

export default new NotificationService();
