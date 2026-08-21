import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

import placeHolderImage from "./img/Hapblog-image.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import type { Blog } from "../lib/blog";
import LikeButton from "./likes/LikeButton";
import BookmarkButton from "./likes/BookMarkButton";
import { useAuthStore } from "../store/useAuthStore";

interface PostCardProps {
  blog: Blog;
}

export function PostCard({ blog }: PostCardProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <article className="group grid gap-5 border-b border-border py-8 sm:grid-cols-[1fr_auto]">
      <div className="flex flex-col gap-3">
        {/* Author */}
        <div className="flex items-center gap-2 text-sm">
          <Avatar size="sm">
            <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
            <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <Link
            to={`/author/${blog.author.username}/profile`}
            className="font-medium hover:underline"
          >
            {blog.author.name}
          </Link>

          <span className="text-muted-foreground">·</span>

          <span className="text-muted-foreground">
            {formatDate(blog.createdAt)}
          </span>
        </div>

        {/* Blog */}
        <Link to={`/feed/${blog.slug}`} className="space-y-2">
          <h2 className="text-balance font-serif text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-foreground sm:text-2xl">
            {blog.title}
          </h2>

          <p className="line-clamp-2 text-pretty leading-relaxed text-muted-foreground">
            {blog.content
              .replace(/<[^>]*>/g, " ")
              .replace(/\s+/g, " ")
              .trim()}
          </p>
        </Link>

        {/* Footer */}
        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="secondary" className="rounded-full font-normal">
            {blog.category?.name}
          </Badge>

          <span>{blog.readingTime}</span>

          <div className="ml-auto flex items-center gap-1">
            {/* Like */}
            <LikeButton
              blogId={blog._id}
              isLiked={blog.isLiked}
              likesCount={blog.likesCount}
              isAuthenticated={isAuthenticated}
            />

            {/* Comments */}
            <span className="inline-flex items-center gap-1 px-2 py-1">
              <MessageCircle className="size-4" />
              {blog.commentsCount}
            </span>

            {/* Bookmark */}
            <BookmarkButton
              isAuthenticated={isAuthenticated}
              blogId={blog._id}
              isBookmarked={blog.isBookmarked}
            />
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <Link to={`/feed/${blog.slug}`} className="order-first sm:order-0">
        <div className="aspect-16/10 w-full overflow-hidden rounded-xl border border-border sm:h-32 sm:w-48">
          <img
            src={blog.imageUrl || placeHolderImage}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
    </article>
  );
}
