import { Link } from "react-router-dom";
import { Heart, Loader2 } from "lucide-react";

import { useGetPublicBlogPost } from "../../hooks/user/useUserBlog";
import placeHolderImage from "../img/Hapblog-image.png";

interface PostsGridProps {
  userId: string;
}

export default function PostsGrid({ userId }: PostsGridProps) {
  const {
    data,
    isPending,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPublicBlogPost(userId);

  const posts =
  data?.pages.flatMap((page) => page.data.posts) ?? [];

  if (isPending) {
    return (
      <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-md bg-secondary"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Couldn't load posts. Try refreshing the page.
      </p>
    );
  }

  if (posts.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        No posts yet.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/feed/${post._id}`}
            className="group relative aspect-square overflow-hidden rounded-md bg-secondary"
          >
            <img
              src={placeHolderImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {post.status === "draft" && (
              <span className="absolute right-1.5 top-1.5 rounded-full bg-black/70 px-1.5 py-0.5 text-[9px] font-medium text-white">
                Draft
              </span>
            )}

            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/40 to-transparent px-2 pb-2 pt-6 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
              <p className="line-clamp-2 text-xs font-medium leading-snug text-white">
                {post.title}
              </p>

              <div className="mt-1 flex items-center gap-1 text-[10px] text-white/80">
                <Heart className="h-2.5 w-2.5 fill-white/80" />
                {post.likesCount}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasNextPage && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-50"
          >
            {isFetchingNextPage ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Loading...
              </span>
            ) : (
              "View more"
            )}
          </button>
        </div>
      )}
    </>
  );
}
