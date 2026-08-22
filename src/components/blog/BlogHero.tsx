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
  const [previewOpen, setPreviewOpen] = useState(false);

  const imageSrc = blog.imageUrl || placeHolderImage;

  const closePreview = () => {
    setPreviewOpen(false);
  };

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
        <div
          role="button"
          tabIndex={0}
          aria-label="Open image preview"
          onClick={() => setPreviewOpen(true)}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();
              setPreviewOpen(true);
            }
          }}
          className="
            group
            relative
            cursor-zoom-in
            overflow-hidden
            rounded-2xl
            border
            border-border
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
          "
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

          {/* Click hint */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-black/0
              opacity-0
              transition-all
              duration-200
              group-hover:bg-black/20
              group-hover:opacity-100
            "
          >
            <span
              className="
                rounded-full
                bg-black/70
                px-4
                py-2
                text-sm
                font-medium
                text-white
                backdrop-blur-sm
              "
            >
              Click to preview
            </span>
          </div>
        </div>
      </section>

      {/* Image preview */}
      {previewOpen && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/90
            p-4
          "
          onClick={closePreview}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closePreview}
            aria-label="Close image preview"
            className="
              absolute
              right-4
              top-4
              z-[10000]
              flex
              size-11
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
            "
          >
            <X className="size-5" />
          </button>

          {/* Preview image */}
          <img
            src={imageSrc}
            alt={blog.title}
            onClick={(event) => event.stopPropagation()}
            className="
              max-h-[90vh]
              max-w-[95vw]
              rounded-lg
              object-contain
              shadow-2xl
              select-none
            "
          />
        </div>
      )}
    </>
  );
}