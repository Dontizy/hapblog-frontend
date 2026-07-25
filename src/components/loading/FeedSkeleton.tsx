import { PostCardSkeleton } from "./PostCardSkeleton";

export function FeedSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  );
}
