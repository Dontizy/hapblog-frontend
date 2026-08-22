import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

import type { Blog } from "../../lib/blog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import placeHolderImage from "../img/Hapblog-image.png";

interface BlogHeroProps {
  blog: Blog;
}

export default function BlogHero({ blog }: BlogHeroProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const image = blog.imageUrl || placeHolderImage;

  return (
    <>
      <section className="space-y-8">
        {/* Title */}
        <h1
          className="
            text-balance
            font-serif
            text-2xl
            font-bold
            leading-snug
            tracking-tight
            text-foreground
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
          "
        >
          {blog.title}
        </h1>

        {/* Byline */}
        <div className="flex items-center gap-3 border-b border-border pb-8">
          <Avatar className="h-11 w-11">
            <AvatarImage
              src={blog.author.avatar}
              alt={blog.author.name}
            />

            <AvatarFallback>
              {blog.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <Link
                to={`/author/${blog.author.username}/profile`}
                className="font-medium text-foreground hover:underline"
              >
                {blog.author.name}
              </Link>

              {blog.author.username && (
                <span className="text-xs text-muted-foreground">
                  @{blog.author.username.replace(/^@/, "")}
                </span>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              {new Date(blog.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                },
              )}

              <span className="mx-1.5">·</span>

              {blog.readingTime} min read
            </div>
          </div>
        </div>

        {/* Cover image */}
        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-border
          "
        >
          <img
            src={image}
            alt={blog.title}
            onClick={() => setIsPreviewOpen(true)}
            className="
              block
              h-64
              w-full
              cursor-zoom-in
              object-cover
              transition-transform
              duration-300
              hover:scale-[1.02]
              sm:h-80
              md:h-112
            "
          />
        </div>
      </section>

      {/* Preview */}
      {isPreviewOpen && (
        <div
          className="
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            bg-black/90
            p-4
            animate-in
            fade-in
            duration-200
          "
          onClick={() => setIsPreviewOpen(false)}
        >
          {/* Close */}
          <button
            type="button"
            aria-label="Close image preview"
            onClick={() => setIsPreviewOpen(false)}
            className="
              absolute
              right-4
              top-4
              z-[100000]
              flex
              size-10
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
              hover:bg-white/20
            "
          >
            <X className="size-5" />
          </button>

          {/* Full image */}
          <img
            src={image}
            alt={blog.title}
            onClick={(event) => event.stopPropagation()}
            className="
              max-h-[90vh]
              max-w-[95vw]
              object-contain
              animate-in
              zoom-in-95
              duration-200
            "
          />
        </div>
      )}
    </>
  );
}
