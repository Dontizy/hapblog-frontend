import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { posts, getUser, formatDate } from "../../lib/mock-data";

export function LandingFeatured() {
  const featured = posts.slice(0, 3);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Fresh from the community.
            </h2>

            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              A small taste of what people are publishing right now.
            </p>
          </div>

          <Link
            to="/feed"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-accent hover:underline sm:inline-flex"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((post) => {
            const author = getUser(post.authorId);

            return (
              <Link
                key={post.id}
                to={`/post/${post.slug}`}
                className="group flex flex-col gap-4"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
                  <img
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-accent">
                    {post.tags[0]}
                  </span>

                  <h3 className="text-balance font-serif text-lg font-semibold leading-snug tracking-tight">
                    {post.title}
                  </h3>

                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <p className="pt-1 text-sm text-muted-foreground">
                    {author?.name} · {formatDate(post.publishedAt)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
