import { Link } from "react-router-dom";
import {
  Bookmark,
  CalendarDays,
  Clock3,
  Trash2,
} from "lucide-react";

import { useBookmarks, useAddOrRemoveBookmark} from "../../hooks/user/useBookmarks";
import ErrorState from "../../components/ErrorState";
import { Spinner } from "../loading/Spinner";
import { Button } from "../ui/button";
import { formatDate } from "../../lib/date-data";


// Utility to safely strip HTML tags for preview text
function stripHtml(htmlString: string) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = htmlString;
  return tmp.textContent || tmp.innerText || "";
}

export default function BookmarksPage() {
  const { data, isLoading, isError } = useBookmarks();
  const { mutate: toggleBookmark } = useAddOrRemoveBookmark();

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Couldn't load bookmarks"
        message="Please try again later."
      />
    );
  }

  const bookmarks = data?.bookmarks ?? [];

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-3 py-6 sm:px-6 sm:py-10">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3 border-b border-border pb-4 sm:mb-8 sm:gap-4 sm:pb-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 sm:size-12">
          <Bookmark className="size-5 text-primary sm:size-6" />
        </div>

        <div>
          <h1 className="font-serif text-xl font-bold tracking-tight text-foreground sm:text-3xl">
            Saved Posts
          </h1>

          <p className="text-xs text-muted-foreground sm:text-sm">
            {bookmarks.length} {bookmarks.length === 1 ? "post" : "posts"} saved
          </p>
        </div>
      </div>

      {/* Empty State */}
      {bookmarks.length === 0 && (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-4 py-12 text-center">
          <Bookmark className="mb-4 size-10 text-muted-foreground/60 sm:size-12" />

          <h2 className="font-serif text-lg font-semibold sm:text-xl">
            No bookmarks yet
          </h2>

          <p className="mt-1.5 max-w-sm text-xs text-muted-foreground sm:text-sm">
            Save articles you enjoy and they'll appear here for quick reading later.
          </p>

          <Link
            to="/feeds"
            className="mt-5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Explore stories
          </Link>
        </div>
      )}

      {/* Minimalist Editorial List */}
      {bookmarks.length > 0 && (
        <div className="divide-y divide-border/60">
          {bookmarks.map((blog) => (
            <article
              key={blog._id}
              className="group flex items-start justify-between gap-3 py-4 sm:py-5"
            >
              <div className="flex-1 space-y-1.5 min-w-0">
                <Link to={`/feed/${blog._id}`} className="block">
                  <h2 className="font-serif text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
                    {blog.title}
                  </h2>
                </Link>

                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {stripHtml(blog.content)}
                </p>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] text-muted-foreground sm:text-xs">
                  <span className="font-medium text-foreground">
                    {blog.author?.name}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="size-3 sm:size-3.5" />
                    {formatDate(blog.createdAt)}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock3 className="size-3 sm:size-3.5" />
                    5 min read
                  </span>
                </div>
              </div>

              {/* Quick Remove Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleBookmark(blog._id)}
                className="size-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                aria-label="Remove bookmark"
              >
                <Trash2 className="size-4" />
              </Button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
