import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useBookmarks } from "../../hooks/user/useBookmarks";

export default function BookmarksPage() {
  const { data, isLoading, isError } = useBookmarks();

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
          Bookmarks
        </h1>

        {isLoading && (
          <p className="mt-8 text-sm text-muted-foreground">Loading bookmarks…</p>
        )}

        {isError && (
          <p className="mt-8 text-sm text-muted-foreground">
            Couldn't load your bookmarks. Try refreshing the page.
          </p>
        )}

        {data && data.bookmarks.length === 0 && (
          <div className="mt-16 flex flex-col items-center text-center">
            <p className="text-sm text-muted-foreground">
              Posts you bookmark will show up here for easy access later.
            </p>
          </div>
        )}

        {data && data.bookmarks.length > 0 && (
          <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
            {data.bookmarks.map((bookmark) => (
              <li key={bookmark._id}>
                <Link
                  to={`/feed/${bookmark._id}`}
                  className="flex items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-secondary"
                >
                  <span className="text-balance font-serif text-base font-medium tracking-tight text-foreground">
                    {bookmark.title}
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
