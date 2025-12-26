import React, { useState, useEffect } from "react";
import { MessageCircle, Trash2, Send, AlertCircle, Reply } from "lucide-react";
import {
    getComments,
    deleteComment,
    postAdminReply,
} from "../../services/commentService";
import { getGuestColor, formatTimeAgo } from "../../utils/guestIdHelper";

const AdminCommentSection = ({ imageId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [posting, setPosting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyTexts, setReplyTexts] = useState({});

    useEffect(() => {
        if (imageId) {
            fetchComments();
        }
    }, [imageId]);

    const fetchComments = async () => {
        setLoading(true);
        const response = await getComments(imageId);
        if (response.success) {
            setComments(response.data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (commentId) => {
        const response = await deleteComment(commentId);
        if (response.success) {
            setComments(
                comments.filter(
                    (c) => c.id !== commentId && c.parent_id !== commentId
                )
            );
            setDeleteConfirm(null);
        } else {
            alert("Failed to delete comment");
        }
    };

    const handlePostComment = async (e, parentId = null) => {
        e.preventDefault();
        const text = parentId ? replyTexts[parentId] : commentText;
        if (!text?.trim() || posting) return;

        setPosting(true);
        const response = await postAdminReply(imageId, text.trim(), parentId);

        if (response.success) {
            await fetchComments();
            if (parentId) {
                setReplyTexts({ ...replyTexts, [parentId]: "" });
                setReplyingTo(null);
            } else {
                setCommentText("");
            }
        } else {
            alert(response.message || "Failed to post comment");
        }
        setPosting(false);
    };

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

    const renderComment = (comment, isReply = false) => {
        const color = comment.is_admin
            ? { bg: "bg-white" }
            : getGuestColor(comment.guest_id);

        return (
            <div
                key={comment.id}
                className={isReply ? "ml-6 mt-1.5 relative" : ""}
            >
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

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                                <div className="flex items-center gap-1.5 flex-wrap">
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
                                    {comment.is_flagged && (
                                        <span className="flex items-center gap-0.5 text-red-600 text-[9px]">
                                            <AlertCircle className="w-2.5 h-2.5" />
                                            Flagged
                                        </span>
                                    )}
                                </div>

                                {deleteConfirm === comment.id ? (
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() =>
                                                handleDelete(comment.id)
                                            }
                                            className={`px-1.5 py-0.5 bg-red-600 text-white ${
                                                isReply
                                                    ? "text-[9px]"
                                                    : "text-[10px]"
                                            } rounded hover:bg-red-700`}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            onClick={() =>
                                                setDeleteConfirm(null)
                                            }
                                            className={`px-1.5 py-0.5 bg-gray-300 text-gray-700 ${
                                                isReply
                                                    ? "text-[9px]"
                                                    : "text-[10px]"
                                            } rounded hover:bg-gray-400`}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setDeleteConfirm(comment.id)
                                        }
                                        className="p-0.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                        title="Delete comment"
                                    >
                                        <Trash2
                                            className={
                                                isReply
                                                    ? "w-2.5 h-2.5"
                                                    : "w-3 h-3"
                                            }
                                        />
                                    </button>
                                )}
                            </div>

                            <p
                                className={`text-gray-700 ${
                                    isReply ? "text-[11px]" : "text-xs"
                                } leading-relaxed break-words`}
                            >
                                {comment.comment_text}
                            </p>

                            {!isReply && (
                                <button
                                    onClick={() =>
                                        setReplyingTo(
                                            replyingTo === comment.id
                                                ? null
                                                : comment.id
                                        )
                                    }
                                    className="mt-1 flex items-center gap-0.5 text-[11px] text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    <Reply className="w-2.5 h-2.5" />
                                    Reply
                                </button>
                            )}

                            {replyingTo === comment.id && (
                                <form
                                    onSubmit={(e) =>
                                        handlePostComment(e, comment.id)
                                    }
                                    className="mt-2"
                                >
                                    <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <div className="w-4 h-4 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src="/images/Logo.jpg"
                                                    alt="School Logo"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-[10px] font-medium text-blue-900">
                                                Replying to{" "}
                                                {comment.is_admin
                                                    ? "School Admin"
                                                    : `Guest #${comment.guest_id}`}
                                            </span>
                                        </div>
                                        <textarea
                                            value={replyTexts[comment.id] || ""}
                                            onChange={(e) =>
                                                setReplyTexts({
                                                    ...replyTexts,
                                                    [comment.id]:
                                                        e.target.value,
                                                })
                                            }
                                            placeholder="Write your reply..."
                                            className="w-full px-2 py-1.5 text-[11px] border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            rows="2"
                                            maxLength={500}
                                            disabled={posting}
                                        />
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-[9px] text-gray-500">
                                                {
                                                    (
                                                        replyTexts[
                                                            comment.id
                                                        ] || ""
                                                    ).length
                                                }
                                                /500
                                            </span>
                                            <div className="flex gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setReplyingTo(null);
                                                        setReplyTexts({
                                                            ...replyTexts,
                                                            [comment.id]: "",
                                                        });
                                                    }}
                                                    className="px-2 py-0.5 text-[9px] text-gray-600 hover:text-gray-800"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={
                                                        !replyTexts[
                                                            comment.id
                                                        ]?.trim() || posting
                                                    }
                                                    className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[9px] bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                >
                                                    <Send className="w-2 h-2" />
                                                    {posting
                                                        ? "Posting..."
                                                        : "Reply"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const threads = organizeThreads();

    return (
        <div className="border-t border-gray-200 bg-gray-50">
            <div className="bg-white px-4 py-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-royal-blue" />
                    <h3 className="text-base font-semibold text-gray-900">
                        Comments ({comments.length})
                    </h3>
                </div>
            </div>

            <div className="bg-white px-4 py-3 border-b border-gray-200">
                <form onSubmit={handlePostComment}>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center overflow-hidden">
                                <img
                                    src="/images/Logo.jpg"
                                    alt="School Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xs font-medium text-gray-700">
                                School Admin
                            </span>
                        </div>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment as admin..."
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent resize-none"
                            rows="2"
                            maxLength={500}
                            disabled={posting}
                        />
                        <div className="flex items-center justify-between mt-2">
                            <span
                                className={`text-xs ${
                                    commentText.length > 450
                                        ? "text-red-500"
                                        : "text-gray-500"
                                }`}
                            >
                                {commentText.length}/500
                            </span>
                            <button
                                type="submit"
                                disabled={posting || !commentText.trim()}
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
                    </div>
                </form>
            </div>

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

export default AdminCommentSection;
