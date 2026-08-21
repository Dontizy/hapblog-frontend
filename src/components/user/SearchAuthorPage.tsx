import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, UserRound } from "lucide-react";
import { cn } from "../../lib/utils";
import { useSearchAuthors } from "../../hooks/user/useAuthorSearch";

export default function SearchAuthorsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [page, setPage] = useState(1);

  // Debounce typed input before it triggers a request
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveSearch(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, isPending, isError, isPlaceholderData } = useSearchAuthors({
    search: activeSearch,
    page,
    limit: 20,
  });

  const hasSearched = activeSearch.length > 0;

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
          Find writers
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Search for authors by name or username.
        </p>

        {/* Search */}
        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name or username…"
            autoFocus
            className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Results */}
        <div className="mt-6">
          {!hasSearched && (
            <div className="flex flex-col items-center py-16 text-center">
              <UserRound className="h-8 w-8 text-muted-foreground/50" />
              <p className="mt-3 text-sm text-muted-foreground">
                Start typing to find writers.
              </p>
            </div>
          )}

          {hasSearched && isPending && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Searching…
            </p>
          )}

          {hasSearched && isError && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Couldn't load results. Try again.
            </p>
          )}

          {hasSearched && data && data.authors.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No writers found for "{activeSearch}".
            </p>
          )}

          {hasSearched && data && data.authors.length > 0 && (
            <ul
              className={cn(
                "divide-y divide-border rounded-xl border border-border bg-card transition-opacity",
                isPlaceholderData && "opacity-60",
              )}
            >
              {data.authors.map((author) => (
                <li key={author.username}>
                  <Link
                    to={`/author/${author.username}/profile`}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary"
                  >
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {author.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        @{author.username}
                      </p>
                      {author.bio && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                          {author.bio}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          {hasSearched && data && data.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>

              <span className="text-sm text-muted-foreground">
                Page {data.currentPage} of {data.totalPages}
              </span>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
