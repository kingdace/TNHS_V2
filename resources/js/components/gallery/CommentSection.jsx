import React, { useState, useEffect } from "react";
import { MessageCircle, Send, AlertCircle, Clock, Timer } from "lucide-react";
import commentService from "../../services/commentService";
import {
    getGuestId,
    getGuestColor,
    getBrowserFingerprint,
    checkCommentLimits,
    updateCommentCounts,
    formatTimeAgo,
} from "../../utils/guestIdHelper";

const CommentSection = ({ imageId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState(null);
    const [limitInfo, setLimitInfo] = useState(null);
    const [guestId] = useState(getGuestId());
    const [cooldownSeconds, setCooldownSeconds] = useState(0);

    // Fetch comments on mount
    useEffect(() => {
        fetchComments();
    }, [imageId]);

    // Check comment limits and cooldown
    useEffect(() => {
        const limits = checkCommentLimits(imageId);
        setLimitInfo(limits);

        // Calculate cooldown if applicable
        if (limits.cooldown) {
            const lastCommentTime = localStorage.getItem(
                "tnhs_last_comment_time"
            );
            if (lastCommentTime) {
                const timeSinceLastComment =
                    Date.now() - new Date(lastCommentTime).getTime();
                const remaining = Math.ceil(
                    (60000 - timeSinceLastComment) / 1000
                );
                setCooldownSeconds(remaining > 0 ? remaining : 0);
            }
        } else {
            setCooldownSeconds(0);
        }
    }, [imageId, comments]);

    // Countdown timer
    useEffect(() => {
        if (cooldownSeconds > 0) {
            const timer = setInterval(() => {
                setCooldownSeconds((prev) => {
                    if (prev <= 1) {
                        // Refresh limits when cooldown ends
                        const limits = checkCommentLimits(imageId);
                        setLimitInfo(limits);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [cooldownSeconds, imageId]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await commentService.getComments(imageId);
            if (response.success) {
                setComments(response.data || []);
            }
        } catch (err) {
            console.error("Error fetching comments:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePostComment = async (e) => {
        e.preventDefault();

        if (!commentText.trim()) {
            setError("Please enter a comment");
            return;
        }

        if (commentText.length > 500) {
            setError("Comment is too long (500 characters max)");
            return;
        }

        // Check limits
        const limits = checkCommentLimits(imageId);
        if (!limits.canComment) {
            setError(limits.reason);
            return;
        }

        try {
            setPosting(true);
            setError(null);

            const browserFingerprint = getBrowserFingerprint();
            const response = await commentService.postComment(
                imageId,
                guestId,
                commentText,
                browserFingerprint
            );

            if (response.success) {
                // Add new comment to list
                setComments([response.data, ...comments]);
                setCommentText("");
                updateCommentCounts(imageId);

                // Set cooldown
                setCooldownSeconds(60);

                // Update limit info
                const newLimits = checkCommentLimits(imageId);
                setLimitInfo(newLimits);
            } else {
                setError(response.message || "Failed to post comment");
            }
        } catch (err) {
            console.error("Error posting comment:", err);
            setError("Failed to post comment");
        } finally {
            setPosting(false);
        }
    };

    // Organize comments into threads
    const organizeThreads = () => {
        const topLevel = comments.filter((c) => !c.parent_id);
        const replies = comments.filter((c) => c.parent_id);
        const repliesMap = {};

        replies.forEach((reply) => {
            if (!repliesMap[reply.parent_id]) {
                repliesMap[reply.parent_id] = [];
            }
            repliesMap[reply.parent_id].push(reply);
        });

        return topLevel.map((comment) => ({
            ...comment,
            replies: repliesMap[comment.id] || [],
        }));
    };

    // Render individual comment
    const renderComment = (comment, isReply = false) => {
        const color = comment.is_admin
            ? { bg: "bg-white" }
            : getGuestColor(comment.guest_id);

        return (
            <div
                key={comment.id}
                className={isReply ? "ml-6 mt-1.5 relative" : ""}
            >
                {/* Visual connector for replies */}
                {isReply && (
                    <div className="absolute left-0 top-0 w-0.5 h-full bg-gray-300"></div>
                )}

                <div
                    className={`bg-white rounded-lg ${
                        isReply ? "p-2.5 ml-4" : "p-3"
                    } shadow-sm border ${
                        comment.is_admin ? "border-blue-200" : "border-gray-100"
                    }`}
                >
                    <div className="flex items-start gap-2">
                        {/* Avatar */}
                        <div
                            className={`${
                                isReply ? "w-6 h-6" : "w-7 h-7"
                            } rounded-full ${
                                comment.is_admin
                                    ? "bg-white border-2 border-blue-500"
                                    : color.bg
                            } flex items-center justify-center overflow-hidden flex-shrink-0`}
                        >
                            {comment.is_admin ? (
                                <img
                                    src="/images/Logo.jpg"
                                    alt="School Logo"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white text-xs font-bold">
                                    {comment.guest_id.substring(0, 2)}
                                </span>
                            )}
                        </div>

                        {/* Comment Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                                <span
                                    className={`font-semibold text-gray-900 ${
                                        isReply ? "text-[11px]" : "text-xs"
                                    }`}
                                >
                                    {comment.is_admin
                                        ? "School Admin"
                                        : `Guest #${comment.guest_id}`}
                                </span>
                                {comment.is_admin && (
                                    <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[9px] rounded-full font-medium">
                                        ADMIN
                                    </span>
                                )}
                                <span
                                    className={`text-gray-500 ${
                                        isReply ? "text-[10px]" : "text-xs"
                                    }`}
                                >
                                    {formatTimeAgo(comment.created_at)}
                                </span>
                            </div>
                            <p
                                className={`text-gray-700 ${
                                    isReply ? "text-[11px]" : "text-xs"
                                } leading-relaxed break-words`}
                            >
                                {comment.comment_text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const characterCount = commentText.length;
    const characterLimit = 500;
    const threads = organizeThreads();

    return (
        <div className="border-t border-gray-200 bg-gray-50">
            {/* Header - More Compact */}
            <div className="bg-white px-4 py-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-royal-blue" />
                    <h3 className="text-base font-semibold text-gray-900">
                        Comments ({comments.length})
                    </h3>
                </div>
            </div>

            {/* Comment Form - More Compact */}
            <div className="bg-white px-4 py-3 border-b border-gray-200">
                <form onSubmit={handlePostComment}>
                    <div>
                        {/* Guest ID Display - Compact */}
                        <div className="flex items-center gap-2 mb-2">
                            <div
                                className={`w-6 h-6 rounded-full ${
                                    getGuestColor(guestId).bg
                                } flex items-center justify-center text-white text-xs font-bold`}
                            >
                                {guestId.substring(0, 2)}
                            </div>
                            <span className="text-xs font-medium text-gray-700">
                                Guest #{guestId}
                            </span>
                        </div>

                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent resize-none"
                            rows="2"
                            maxLength={characterLimit}
                            disabled={posting || cooldownSeconds > 0}
                        />

                        {/* Character Count & Submit - Compact */}
                        <div className="flex items-center justify-between mt-2">
                            <span
                                className={`text-xs ${
                                    characterCount > 450
                                        ? "text-red-500"
                                        : "text-gray-500"
                                }`}
                            >
                                {characterCount}/{characterLimit}
                            </span>
                            <button
                                type="submit"
                                disabled={
                                    posting ||
                                    !commentText.trim() ||
                                    cooldownSeconds > 0
                                }
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-royal-blue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {posting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                        <span className="text-xs">
                                            Posting...
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-3 h-3" />
                                        <span className="text-xs">Post</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Cooldown Timer - Visual Indicator */}
                        {cooldownSeconds > 0 && (
                            <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-2">
                                <Timer className="w-4 h-4 text-orange-500 animate-pulse" />
                                <div className="flex-1">
                                    <p className="text-xs text-orange-700 font-medium">
                                        Please wait {cooldownSeconds} second
                                        {cooldownSeconds !== 1 ? "s" : ""}{" "}
                                        before commenting again
                                    </p>
                                    <div className="mt-1 w-full bg-orange-200 rounded-full h-1.5">
                                        <div
                                            className="bg-orange-500 h-1.5 rounded-full transition-all duration-1000"
                                            style={{
                                                width: `${
                                                    ((60 - cooldownSeconds) /
                                                        60) *
                                                    100
                                                }%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-red-700">{error}</p>
                            </div>
                        )}

                        {/* Limit Info - More Compact */}
                        {limitInfo &&
                            limitInfo.canComment &&
                            cooldownSeconds === 0 && (
                                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    <p className="text-xs text-blue-700">
                                        {limitInfo.remainingForImage} more on
                                        this image • {limitInfo.remainingToday}{" "}
                                        today
                                    </p>
                                </div>
                            )}
                    </div>
                </form>
            </div>

            {/* Comments List - More Compact */}
            <div className="px-4 py-3 max-h-64 overflow-y-auto">
                {loading ? (
                    <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-royal-blue mx-auto mb-2"></div>
                        <p className="text-gray-500 text-xs">Loading...</p>
                    </div>
                ) : threads.length === 0 ? (
                    <div className="text-center py-4">
                        <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No comments yet</p>
                        <p className="text-gray-400 text-xs mt-1">
                            Be the first!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {threads.map((thread) => (
                            <div key={thread.id}>
                                {renderComment(thread)}
                                {/* Render replies */}
                                {thread.replies.map((reply) =>
                                    renderComment(reply, true)
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
