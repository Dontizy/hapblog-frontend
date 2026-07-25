import {
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useState } from "react";

import type { Blog } from "../../lib/blog";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface BlogActionsProps {
  blog: Blog;
}

export default function BlogActions({
  blog,
}: BlogActionsProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const [likesCount, setLikesCount] = useState(blog.likesCount);

  const handleLike = () => {
    setLiked((prev) => !prev);

    setLikesCount((prev) =>
      liked ? prev - 1 : prev + 1
    );

    // TODO:
    // likeBlogMutation.mutate(blog._id)
  };

  const handleBookmark = () => {
    setBookmarked((prev) => !prev);

    // TODO:
    // bookmarkMutation.mutate(blog._id)
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

  return (
    <div className="my-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={handleLike}
          className="gap-2"
        >
          <Heart
            className={cn(
              "h-5 w-5",
              liked && "fill-red-500 text-red-500"
            )}
          />

          {likesCount}
        </Button>

        <Button
          variant="ghost"
          disabled
          className="gap-2"
        >
          <MessageCircle className="h-5 w-5" />

          {blog.commentsCount}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={handleBookmark}
        >
          <Bookmark
            className={cn(
              "h-5 w-5",
              bookmarked &&
                "fill-foreground text-foreground"
            )}
          />
        </Button>

        <Button
          variant="ghost"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
