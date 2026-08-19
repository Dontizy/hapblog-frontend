import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { Reply } from "../../lib/reply";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ConfirmDialog from "../dialog/ConfirmDialog";
import LikeReplyButton from "../likes/LikeReplyButton";
import { useAuthStore } from "../../store/useAuthStore";
import { useDeleteReply, useReplyEdit } from "../../hooks/comment/useComment";
import { useUserProfile } from "../../hooks/user/useUserProfile";
import { Spinner } from "../loading/Spinner";

interface ReplyCardProps {
  reply: Reply;
}

export default function ReplyCard({ reply }: ReplyCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(reply.body);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: currentUser } = useUserProfile();

  const currentUserId = currentUser?.user?.id;
  const isAuthor = currentUserId === reply.author?._id;
  const isAuthorOrAdmin = isAuthor || currentUser?.user?.role === "admin";

  const { mutate: deleteReply, isPending: isDeleting } = useDeleteReply();
  const { mutate: editReply, isPending: isEditingPending } = useReplyEdit();

  const handleDelete = () => {
    deleteReply(
      { commentId: reply.comment, replyId: reply._id },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
        },
      },
    );
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBody.trim() || editBody.trim() === reply.body) {
      setIsEditing(false);
      return;
    }

    editReply(
      {
        commentId: reply.comment,
        replyId: reply._id,
        body: editBody.trim(),
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleCancelEdit = () => {
    setEditBody(reply.body);
    setIsEditing(false);
  };

  return (
    <div className="relative flex gap-3">
      {/* Thread line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      <Avatar className="relative z-10 h-9 w-9 shrink-0 bg-background">
        <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
        <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-medium text-sm">{reply.author.name}</h4>

            <span className="text-xs text-muted-foreground">
              {new Date(reply.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Options Dropdown */}
          {isAuthorOrAdmin && (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAuthor && (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit reply
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete reply
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          title="Delete reply?"
          description="Are you sure you want to delete this reply? This action cannot be undone."
          confirmText="Delete"
          confirmVariant="destructive"
          isPending={isDeleting}
          onConfirm={handleDelete}
        />

        {/* Body or Inline Edit Form */}
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="mt-2 space-y-2">
            <textarea
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              rows={2}
              disabled={isEditingPending}
              className="w-full rounded-lg border border-input bg-background p-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              placeholder="Edit your reply..."
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={handleCancelEdit}
                disabled={isEditingPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="h-8 text-xs"
                disabled={isEditingPending}
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
          <p className="mt-2 wrap-break-word whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
            {reply.body}
          </p>
        )}

        <div className="mt-2">
          <LikeReplyButton
            commentId={reply.comment}
            replyId={reply._id}
            isLiked={reply.isLiked}
            likesCount={reply.likesCount}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </div>
  );
}
