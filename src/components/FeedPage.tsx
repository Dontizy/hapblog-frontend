import { Link, Search, TrendingUp, SearchX } from "lucide-react";
// import type { Blog } from "../lib/blog";
import { Input } from "../components/ui/input";
import { PostCard } from "../components/PostCard";
import { useBlogs } from "../hooks/blog/UseBlogs";
import { FeedSkeleton } from "./loading/FeedSkeleton";
import ErrorState from "./ErrorState";
import { Button } from "./ui/button";
import { useState, useRef } from "react";

export default function FeedPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { refetch, data, isPending, isError } = useBlogs({
    page,
    limit: 10,
    search,
  });
  const feedRef = useRef<HTMLDivElement>(null);

  if (isPending) {
    return <FeedSkeleton />;
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to the first page when search changes
  };
  const handlePrev = () => {
    setPage((p) => p - 1);
    feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNext = () => {
    setPage((p) => p + 1);
    feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  console.log(data);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Hero */}
        <section className="mb-10" ref={feedRef}>
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Discover Stories
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Read articles, tutorials and ideas shared by the Hapblog community.
          </p>

          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search articles..."
              value={search}
              onChange={onChangeSearch}
              className="pl-10"
            />
          </div>
        </section>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Posts */}
          <section className="space-y-4">
            {data?.blogs.length ? (
              data.blogs.map((blog) => <PostCard key={blog._id} blog={blog} />)
            ) : (
              <div className="flex min-h-[55vh] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 px-6 py-12 text-center shadow-sm sm:px-10 sm:py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted sm:h-20 sm:w-20">
                  <SearchX className="h-8 w-8 text-muted-foreground sm:h-10 sm:w-10" />
                </div>

                {search ? (
                  <>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                      No results found
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                      We couldn't find any blogs matching{" "}
                      <span className="font-semibold text-foreground">
                        "{search}"
                      </span>
                      . Try another keyword.
                    </p>

                    <Button
                      variant="outline"
                      className="mt-8 w-full max-w-xs sm:w-auto"
                      onClick={() => {
                        setSearch("");
                        setPage(1);
                      }}
                    >
                      Clear Search
                    </Button>
                  </>
                ) : (
                  <>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                      No blogs yet
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                      There aren't any published blogs yet. Be the first to
                      share your ideas, tutorials, or experiences with the
                      community.
                    </p>

                    <Link
                      to="/create-blog"
                      className="mt-8 w-full max-w-xs sm:w-auto"
                    >
                      <Button className="w-full">Write your first blog</Button>
                    </Link>
                  </>
                )}
              </div>
            )}
          </section>
          <div className="mt-2 flex items-center justify-center gap-6 pt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={handlePrev}
            >
              Previous
            </Button>

            <span className="text-sm font-medium text-muted-foreground">
              Page {data?.currentPage} of {data?.totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={page === data?.totalPages}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <TrendingUp className="size-5 text-accent" />

                  <h2 className="font-semibold">Trending Topics</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "TypeScript",
                    "JavaScript",
                    "Node.js",
                    "AI",
                    "Linux",
                    "MongoDB",
                    "CSS",
                  ].map((tag) => (
                    <button
                      key={tag}
                      className="rounded-full border px-3 py-1 text-sm transition hover:bg-accent hover:text-accent-foreground"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border bg-card p-6">
                <h2 className="mb-3 font-semibold">About Hapblog</h2>

                <p className="text-sm leading-6 text-muted-foreground">
                  Hapblog is a place where developers and creators share
                  knowledge through thoughtful articles and discussions.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
