import { MessageCircle, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import type { Comment } from "../../lib/comment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
import { useReplies, useDeleteComment, useEditComment } from "../../hooks/comment/useComment";
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
  const { data: currentUser } = useUserProfile();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);

  const { data, isLoading: isRepliesLoading } = useReplies(
    comment._id,
    showReplies && comment.repliesCount > 0
  );

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
  const { mutate: editComment, isPending: isEditingPending } = useEditComment();

  const replies = data?.replies || [];

  const currentUserId = currentUser?.user?.id;
  const isAuthor = currentUserId === comment.author?._id;
  const isAuthorOrAdmin = isAuthor || currentUser?.user?.role === "admin";

  const handleDelete = () => {
    deleteComment(
      { postId: comment.blog, commentId: comment._id },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
        },
      }
    );
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBody.trim() || editBody.trim() === comment.body) {
      setIsEditing(false);
      return;
    }

    editComment(
      {
        postId: comment.blog,
        commentId: comment._id,
        body: editBody.trim(),
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setEditBody(comment.body);
    setIsEditing(false);
  };

  if (isCommentError) {
    return <ErrorState title="Error" message="Failed to load comment." />;
  }

  if (isCommentPending) {
    return null;
  }

  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md sm:p-6">
      <div className="flex gap-4">
        <Link to={`/author/${comment?.author._id}/profile`}>
          <Avatar className="h-10 w-10 shrink-0 sm:h-11 sm:w-11">
            <AvatarImage
              src={comment.author.avatar}
              alt={comment.author.name}
            />
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link to={`/author/${comment?.author._id}/profile`}>
                <h3 className="font-semibold">{comment.author.name}</h3>
              </Link>
              <p className="text-sm text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Menu Options */}
            {/* Menu Options */}
{isAuthorOrAdmin && (
  <DropdownMenu>
    <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none">
      <MoreHorizontal className="h-5 w-5" />
      <span className="sr-only">More options</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {/* Only allow editing if the user is the original author */}
      {isAuthor && (
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit comment
        </DropdownMenuItem>
      )}
      <DropdownMenuItem
        className="text-destructive focus:text-destructive cursor-pointer"
        onClick={() => setIsDeleteDialogOpen(true)}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete comment
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)}
          </div>

          {/* Delete Confirmation Modal */}
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

          {/* Body or Edit Form */}
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="mt-4 space-y-3">
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
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
                <Button type="submit" size="sm" disabled={isEditingPending}>
                  {isEditingPending ? (
                    <>
                      <Spinner/>
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
            <LikeCommentButton
              blogId={comment.blog}
              commentId={comment._id}
              isLiked={comment.isLiked}
              likesCount={comment.likedCommentCount}
              isAuthenticated={isAuthenticated}
            />

            {comment.repliesCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="px-0 text-primary hover:bg-transparent"
                onClick={() => setShowReplies((prev) => !prev)}
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
                    comment.repliesCount === 1 ? "reply" : "replies"
                  }`
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm((prev) => !prev)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Reply
            </Button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <ReplyForm
              onCancel={() => setShowReplyForm(false)}
              blogId={comment.blog}
              commentId={comment._id}
            />
          )}

          {/* Replies */}
          {showReplies && replies.length > 0 && (
            <div className="mt-6 space-y-6 pl-4 sm:pl-8">
              {replies.map((reply) => (
                <ReplyCard key={reply._id} reply={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
