import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import placeHolderImage from "../img/Hapblog-image.png";
import { formatDate } from "../../lib/date-data";
import { useBlogs } from "../../hooks/blog/UseBlogs";

// Helper to strip HTML tags for card excerpt preview
function stripHtml(htmlString: string) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = htmlString;
  return tmp.textContent || tmp.innerText || "";
}

export function LandingFeatured() {
  const { data } = useBlogs({ limit: 3 });
  const featured = data?.blogs.slice(0, 3);

  return (
    <section className="border-b border-border">
      {/* Container padding adjusted for small viewports */}
      <div className="mx-auto max-w-6xl px-3 py-10 sm:px-6 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-balance font-serif text-2xl font-semibold tracking-tight sm:text-4xl">
              Fresh from the community.
            </h2>

            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
              A small taste of what people are publishing right now.
            </p>
          </div>

          {/* Corrected route link to /feeds */}
          <Link
            to="/feeds"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-accent hover:underline sm:inline-flex"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:mt-10 md:grid-cols-3">
          {featured?.map((blog) => {
            const cleanExcerpt = stripHtml(blog.content);

            return (
              <Link
                key={blog._id}
                /* Corrected detail route link to /feed/:id */
                to={`/feed/${blog.slug}`}
                className="group flex flex-col gap-3 sm:gap-4"
              >
                <div className="relative aspect-16/10 overflow-hidden rounded-xl border border-border">
                  <img
                    src={blog.imageUrl || placeHolderImage}
                    alt={blog.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-wide text-accent sm:text-xs">
                    {blog.category?.name}
                  </span>

                  <h3 className="text-balance font-serif text-base font-semibold leading-snug tracking-tight sm:text-lg">
                    {blog.title}
                  </h3>

                  <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {cleanExcerpt}
                  </p>

                  <p className="pt-0.5 text-xs text-muted-foreground sm:pt-1 sm:text-sm">
                    {blog?.author?.name} · {formatDate(blog.createdAt)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All CTA button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/feeds"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
          >
            View all stories
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
