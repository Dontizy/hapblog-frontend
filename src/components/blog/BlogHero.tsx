import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

import type { Blog } from "../../lib/blog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import placeHolderImage from "../img/Hapblog-image.png";

interface BlogHeroProps {
  blog: Blog;
}

export default function BlogHero({ blog }: BlogHeroProps) {
  const [isImagePreviewOpen, setIsImagePreviewOpen] =
    useState(false);

  const imageSrc = blog.imageUrl || placeHolderImage;

  // Close preview with Escape
  useEffect(() => {
    if (!isImagePreviewOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsImagePreviewOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent the page from scrolling while preview is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow = "";
    };
  }, [isImagePreviewOpen]);

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

              {blog.readingTime}
            </div>
          </div>
        </div>

        {/* Cover image */}
        <button
          type="button"
          onClick={() => setIsImagePreviewOpen(true)}
          className="
            group
            block
            w-full
            cursor-zoom-in
            overflow-hidden
            rounded-2xl
            border
            border-border
            text-left
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-2
          "
          aria-label="Open image preview"
        >
          <img
            src={imageSrc}
            alt={blog.title}
            className="
              h-64
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-[1.02]
              sm:h-80
              md:h-112
            "
          />
        </button>
      </section>

      {/* Image preview */}
      {isImagePreviewOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/90
            p-4
            sm:p-8
          "
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsImagePreviewOpen(false);
            }
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsImagePreviewOpen(false)}
            className="
              absolute
              right-4
              top-4
              z-10
              flex
              size-10
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
              backdrop-blur-sm
              transition-colors
              hover:bg-white/20
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              sm:right-6
              sm:top-6
            "
            aria-label="Close image preview"
          >
            <X className="size-5" />
          </button>

          {/* Preview image */}
          <img
            src={imageSrc}
            alt={blog.title}
            className="
              max-h-[90vh]
              max-w-full
              rounded-lg
              object-contain
              shadow-2xl
              sm:max-h-[92vh]
            "
          />
        </div>
      )}
    </>
  );
}