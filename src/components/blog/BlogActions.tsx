import { MessageCircle, Share2, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import type { Blog } from "../../lib/blog";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserProfile } from "../../hooks/user/useUserProfile";
import { useDeleteBlog } from "../../hooks/blog/useDeleteBlog";

import { Button } from "../ui/button";
import LikeButton from "../likes/LikeButton";
import BookmarkButton from "../likes/BookMarkButton";
import ConfirmDialog from "../dialog/ConfirmDialog";

interface BlogActionsProps {
  blog: Blog;
}

export default function BlogActions({ blog }: BlogActionsProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [open, setOpen] = useState(false);

  const { data } = useUserProfile();

  const {
    mutate: handleDelete,
    isPending: isDeletePending,
  } = useDeleteBlog();

  const user = data?.user;

  /*
   * Check whether the currently logged-in user
   * is the author of this blog.
   */
  const isAuthor =
    isAuthenticated &&
    !!user &&
    user.id.toString() === blog.author._id.toString();

  /*
   * Admins can delete posts but cannot edit
   * another user's post.
   */
  const isAdmin =
    isAuthenticated &&
    user?.role === "admin";

  const canEdit = isAuthor;
  const canDelete = isAuthor || isAdmin;

  /*
   * Share the current blog.
   *
   * Uses the native Web Share API when available.
   * Falls back to copying the URL to the clipboard.
   */
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.title,
          text: blog.title,
          url: window.location.href,
        });

        return;
      }

      await navigator.clipboard.writeText(
        window.location.href
      );

      alert("Link copied to clipboard.");
    } catch {
      // User cancelled the native share dialog
      // or the clipboard operation failed.
    }
  };

  return (
    <div className="my-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
      {/* --------------------------------
          Left: Engagement
      -------------------------------- */}
      <div className="flex items-center gap-1">
        <LikeButton
          blogId={blog._id}
          isLiked={blog.isLiked}
          likesCount={blog.likesCount}
          isAuthenticated={isAuthenticated}
        />

        <Button
          type="button"
          variant="ghost"
          disabled
          className="gap-2 text-muted-foreground"
          aria-label={`${blog.commentsCount} comments`}
        >
          <MessageCircle className="size-4" />
          {blog.commentsCount}
        </Button>
      </div>

      {/* --------------------------------
          Center: Author/Admin Actions
      -------------------------------- */}
      {isAuthenticated && (canEdit || canDelete) && (
        <div className="flex items-center gap-2">
          {/* Edit */}
          {canEdit && (
            <Link to={`/update/${blog._id}/post`}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                aria-label="Edit post"
              >
                <SquarePen className="size-3.5" />
                <span>Edit</span>
              </Button>
            </Link>
          )}

          {/* Delete */}
          {canDelete && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="
                gap-2
                border-destructive/30
                text-destructive
                hover:border-destructive/50
                hover:bg-destructive/10
                hover:text-destructive
              "
              aria-label="Delete post"
              onClick={() => setOpen(true)}
            >
              <Trash2 className="size-3.5" />
              <span>Delete</span>
            </Button>
          )}

          {/* Delete Confirmation */}
          <ConfirmDialog
            open={open}
            onOpenChange={setOpen}
            title="Delete post?"
            description="This post and all of its comments will be permanently deleted."
            confirmText="Delete Post"
            confirmVariant="destructive"
            isPending={isDeletePending}
            onConfirm={() => {
              handleDelete(blog._id);
            }}
          />
        </div>
      )}

      {/* --------------------------------
          Right: Save / Share
      -------------------------------- */}
      <div className="flex items-center gap-1">
        <BookmarkButton
          isAuthenticated={isAuthenticated}
          blogId={blog._id}
          isBookmarked={blog.isBookmarked}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleShare}
          aria-label="Share this post"
          className="text-muted-foreground hover:text-foreground"
        >
          <Share2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
