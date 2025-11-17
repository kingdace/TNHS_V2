import React, { useState, useEffect, useRef } from "react";
import {
    Bell,
    X,
    Check,
    CheckCheck,
    Trash2,
    Clock,
    AlertCircle,
    Calendar,
    FileText,
} from "lucide-react";
import notificationService from "../services/notificationService";

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dropdownRef = useRef(null);

    // Load notifications and unread count
    useEffect(() => {
        loadUnreadCount();
        if (isOpen) {
            loadNotifications();
        }
    }, [isOpen]);

    // Auto-refresh unread count every 30 seconds
    useEffect(() => {
        const interval = setInterval(loadUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const loadUnreadCount = async () => {
        try {
            const count = await notificationService.getUnreadCount();
            setUnreadCount(count);
        } catch (error) {
            console.error("Failed to load unread count:", error);
            // Don't show error for background refresh
        }
    };

    const loadNotifications = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await notificationService.getNotifications({
                recent_only: true,
                per_page: 10,
            });

            if (response.success) {
                setNotifications(response.data.data || []);
            } else {
                setError("Failed to load notifications");
            }
        } catch (error) {
            console.error("Failed to load notifications:", error);
            setError("Failed to load notifications");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await notificationService.markAsRead(id);
            setNotifications((prev) =>
                prev.map((notif) =>
                    notif.id === id
                        ? {
                              ...notif,
                              is_read: true,
                              read_at: new Date().toISOString(),
                          }
                        : notif
                )
            );
            loadUnreadCount();
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications((prev) =>
                prev.map((notif) => ({
                    ...notif,
                    is_read: true,
                    read_at: new Date().toISOString(),
                }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error("Failed to mark all as read:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await notificationService.deleteNotification(id);
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
            loadUnreadCount();
        } catch (error) {
            console.error("Failed to delete notification:", error);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case "announcement_published":
                return <Bell className="h-4 w-4 text-green-500" />;
            case "announcement_scheduled":
                return <Clock className="h-4 w-4 text-blue-500" />;
            case "announcement_archived":
                return <FileText className="h-4 w-4 text-gray-500" />;
            case "announcement_expired":
            case "announcement_expiring_soon":
                return <Clock className="h-4 w-4 text-orange-500" />;
            case "event_published":
            case "event_starting_soon":
                return <Calendar className="h-4 w-4 text-blue-500" />;
            case "event_expired":
            case "event_ending_soon":
                return <Clock className="h-4 w-4 text-red-500" />;
            default:
                return <AlertCircle className="h-4 w-4 text-gray-500" />;
        }
    };

    const getNotificationColor = (type) => {
        if (type.includes("expired") || type.includes("ending")) {
            return "border-l-red-400";
        }
        if (type.includes("expiring") || type.includes("starting")) {
            return "border-l-orange-400";
        }
        if (type.includes("published")) {
            return "border-l-green-400";
        }
        if (type.includes("scheduled")) {
            return "border-l-blue-400";
        }
        if (type.includes("archived")) {
            return "border-l-gray-400";
        }
        return "border-l-blue-400";
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Notification Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-blue-100 hover:bg-white/10 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                title={`${unreadCount} unread notifications`}
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-blue-800 font-medium">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>

            {/* Notification Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                    {unreadCount} new
                                </span>
                            )}
                        </h3>
                        <div className="flex items-center space-x-2">
                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllAsRead}
                                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1 px-2 py-1 rounded hover:bg-blue-50"
                                    title="Mark all as read"
                                >
                                    <CheckCheck className="h-3 w-3" />
                                    <span>Mark all read</span>
                                </button>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                                title="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-center text-gray-500">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                Loading notifications...
                            </div>
                        ) : error ? (
                            <div className="p-4 text-center text-red-500">
                                <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                                {error}
                                <button
                                    onClick={loadNotifications}
                                    className="block mx-auto mt-2 text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Try again
                                </button>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm">No notifications yet</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    You'll see updates about scheduled content
                                    here
                                </p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors border-l-4 ${getNotificationColor(
                                        notification.type
                                    )} ${
                                        !notification.is_read
                                            ? "bg-blue-50/50"
                                            : ""
                                    }`}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 mt-1">
                                            {getNotificationIcon(
                                                notification.type
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p
                                                        className={`text-sm ${
                                                            !notification.is_read
                                                                ? "font-semibold text-gray-900"
                                                                : "font-medium text-gray-700"
                                                        }`}
                                                    >
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-2 flex items-center">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {notification.time_ago}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-1 ml-2">
                                                    {!notification.is_read && (
                                                        <button
                                                            onClick={() =>
                                                                handleMarkAsRead(
                                                                    notification.id
                                                                )
                                                            }
                                                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100"
                                                            title="Mark as read"
                                                        >
                                                            <Check className="h-3 w-3" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                notification.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-center">
                            <p className="text-xs text-gray-500">
                                Showing recent notifications • Auto-refreshes
                                every 30s
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
