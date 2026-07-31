import {
  Bookmark,
  MessageCircle,
  Share2,
  SquarePen,
  Trash2
} from "lucide-react";
import { useState } from "react";
import type { Blog } from "../../lib/blog";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserProfile } from "../../hooks/user/useUserProfile";
import { useDeleteBlog } from "../../hooks/blog/useDeleteBlog";
import { Spinner } from "../loading/Spinner";
import LikeButton from "./LikeButton";



interface BlogActionsProps {
  blog: Blog;
}

export default function BlogActions({ blog }: BlogActionsProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data } = useUserProfile();
  const { mutate: handleDelete, isPending: isDeletePending } = useDeleteBlog();


  const handleBookmark = () => {
    setBookmarked((prev) => !prev);
    // TODO: bookmarkMutation.mutate(blog._id)
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: blog.title,
        text: blog.title,
        url: window.location.href,
      });
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard.");
  };

  const user = data?.user;
  const isAuthor = isAuthenticated && user && user.id === blog.author._id;
  const isAdmin = isAuthenticated && user?.role === "admin";
  const canEdit = isAuthor;
  const canDelete = isAuthor || isAdmin;

  return (
    <div className="my-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
      <div className="flex items-center gap-1">

          <LikeButton
            blogId={blog._id}
            isLiked={blog.isLiked}
            likesCount={blog.likesCount}
            isAuthenticated={isAuthenticated}
          />


        <Button
          variant="ghost"
          disabled
          className="gap-2 text-muted-foreground"
        >
          <MessageCircle className="h-5 w-5" />
          {blog.commentsCount}
        </Button>
      </div>

      {isAuthenticated && (
        <div className="flex items-center gap-2">
          {canEdit && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              aria-label="Edit post"
              // onClick={() => handleEdit(blog._id)}
            >
              <SquarePen className="h-4 w-4" />
              <span>Edit</span>
            </Button>
          )}

          {canDelete && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-destructive/30 text-destructive hover:border-destructive/50 hover:bg-destructive/10"
              aria-label="Delete post"
              onClick={() => handleDelete(blog._id)}
            >
              {isDeletePending ? (
                <>
                  <Spinner />
                  <span>Deleting....</span>
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </>
              )}
            </Button>
          )}
        </div>
      )}

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark this post"}
          className={cn("text-muted-foreground", bookmarked && "text-accent")}
        >
          <Bookmark className={cn("h-5 w-5", bookmarked && "fill-accent")} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          aria-label="Share this post"
          className="text-muted-foreground"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
