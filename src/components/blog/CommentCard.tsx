import {
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Comment } from "../../lib/comment";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ConfirmDialog from "../dialog/ConfirmDialog";

import ReplyCard from "./ReplyCard";
import ReplyForm from "./ReplyForm";
import ErrorState from "../ErrorState";

import {
  useReplies,
  useDeleteComment,
  useEditComment,
} from "../../hooks/comment/useComment";

import { Spinner } from "../loading/Spinner";
import LikeCommentButton from "../likes/LikeCommentButton";

import { useAuthStore } from "../../store/useAuthStore";
import { useUserProfile } from "../../hooks/user/useUserProfile";

interface CommentCardProps {
  comment: Comment;
  isCommentPending?: boolean;
  isReplyPending?: boolean;
  isCommentError?: boolean;
}

export default function CommentCard({
  comment,
  isCommentPending = false,
  isCommentError = false,
}: CommentCardProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  const { data: currentUser } = useUserProfile();

  /*
   * Close the reply form automatically if the user
   * becomes unauthenticated while viewing the page.
   */
  useEffect(() => {
    if (!isAuthenticated) {
      setShowReplyForm(false);
    }
  }, [isAuthenticated]);

  const { data, isLoading: isRepliesLoading } = useReplies(
    comment._id,
    showReplies && comment.repliesCount > 0,
  );

  const {
    mutate: deleteComment,
    isPending: isDeleting,
  } = useDeleteComment();

  const {
    mutate: editComment,
    isPending: isEditingPending,
  } = useEditComment();

  const replies = data?.replies ?? [];

  const currentUserId = currentUser?.user?.id;

  const isAuthor =
    currentUserId === comment.author?._id;

  const isAdmin =
    currentUser?.user?.role === "admin";

  const isAuthorOrAdmin = isAuthor || isAdmin;

  // ------------------------------------------
  // Delete comment
  // ------------------------------------------

  const handleDelete = () => {
    deleteComment(
      {
        postId: comment.blog,
        commentId: comment._id,
      },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
        },
      },
    );
  };

  // ------------------------------------------
  // Edit comment
  // ------------------------------------------

  const handleEditSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const trimmedBody = editBody.trim();

    if (!trimmedBody) {
      return;
    }

    if (trimmedBody === comment.body) {
      setIsEditing(false);
      return;
    }

    editComment(
      {
        postId: comment.blog,
        commentId: comment._id,
        body: trimmedBody,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleCancelEdit = () => {
    setEditBody(comment.body);
    setIsEditing(false);
  };

  // ------------------------------------------
  // Error / loading
  // ------------------------------------------

  if (isCommentError) {
    return (
      <ErrorState
        title="Error"
        message="Failed to load comment."
      />
    );
  }

  if (isCommentPending) {
    return null;
  }

  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md sm:p-6">
      <div className="flex gap-4">
        {/* Avatar */}
        <Link
          to={`/author/${comment.author._id}/profile`}
          className="shrink-0"
        >
          <Avatar className="h-10 w-10 sm:h-11 sm:w-11">
            <AvatarImage
              src={comment.author.avatar}
              alt={comment.author.name}
            />

            <AvatarFallback>
              {comment.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link
                to={`/author/${comment.author._id}/profile`}
              >
                <h3 className="font-semibold">
                  {comment.author.name}
                </h3>
              </Link>

              <p className="text-sm text-muted-foreground">
                {new Date(
                  comment.createdAt,
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Comment menu */}
            {isAuthenticated && isAuthorOrAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none">
                  <MoreHorizontal className="h-5 w-5" />

                  <span className="sr-only">
                    More options
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {/* Only the author can edit */}
                  {isAuthor && (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        setIsEditing(true)
                      }
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit comment
                    </DropdownMenuItem>
                  )}

                  {/* Author or admin can delete */}
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() =>
                      setIsDeleteDialogOpen(true)
                    }
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete comment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Delete confirmation */}
          <ConfirmDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            title="Delete comment?"
            description="Are you sure you want to delete this comment? This action cannot be undone."
            confirmText="Delete"
            confirmVariant="destructive"
            isPending={isDeleting}
            onConfirm={handleDelete}
          />

          {/* Comment body / edit form */}
          {isEditing ? (
            <form
              onSubmit={handleEditSubmit}
              className="mt-4 space-y-3"
            >
              <textarea
                value={editBody}
                onChange={(e) =>
                  setEditBody(e.target.value)
                }
                rows={3}
                disabled={isEditingPending}
                className="w-full rounded-xl border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                placeholder="Edit your comment..."
              />

              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelEdit}
                  disabled={isEditingPending}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  size="sm"
                  disabled={
                    isEditingPending ||
                    !editBody.trim()
                  }
                >
                  {isEditingPending ? (
                    <>
                      <Spinner />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <p className="mt-4 wrap-break-word whitespace-pre-wrap leading-7 text-foreground">
              {comment.body}
            </p>
          )}

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-1 sm:gap-2">
            {/* Like */}
            <LikeCommentButton
              blogId={comment.blog}
              commentId={comment._id}
              isLiked={comment.isLiked}
              likesCount={comment.likedCommentCount}
              isAuthenticated={isAuthenticated}
            />

            {/* View replies */}
            {comment.repliesCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="px-0 text-primary hover:bg-transparent"
                onClick={() =>
                  setShowReplies((prev) => !prev)
                }
              >
                {showReplies ? (
                  isRepliesLoading ? (
                    <>
                      <Spinner />
                      Loading...
                    </>
                  ) : (
                    "Hide replies"
                  )
                ) : (
                  `View ${comment.repliesCount} ${
                    comment.repliesCount === 1
                      ? "reply"
                      : "replies"
                  }`
                )}
              </Button>
            )}

            {/* Reply button — authenticated users only */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setShowReplyForm((prev) => !prev)
                }
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Reply
              </Button>
            )}
          </div>

          {/* Reply form — authenticated users only */}
          {isAuthenticated && showReplyForm && (
            <ReplyForm
              onCancel={() =>
                setShowReplyForm(false)
              }
              blogId={comment.blog}
              commentId={comment._id}
            />
          )}

          {/* Replies */}
          {showReplies && replies.length > 0 && (
            <div className="mt-6 space-y-6 pl-4 sm:pl-8">
              {replies.map((reply) => (
                <ReplyCard
                  key={reply._id}
                  reply={reply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

The important behavior is now:

- Unauthenticated: comments/replies are readable, but "Reply" is not shown.
- Authenticated: "Reply" appears and opens "ReplyForm".
- Logout while replying: the reply form closes automatically.
- Author/admin: comment management menu remains available only when authenticated.
- Backend protection should still remain in place for the create-reply endpoint; hiding the button alone is not security.