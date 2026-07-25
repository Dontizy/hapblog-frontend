import { Skeleton } from "../ui/Skeleton";

interface CommentSkeletonProps {
  count?: number;
}

export default function CommentSkeleton({
  count = 3,
}: CommentSkeletonProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <article
          key={index}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Comment */}
          <div className="mt-5 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[70%]" />
          </div>

          {/* Actions */}
          <div className="mt-5 flex items-center gap-4">
            <Skeleton className="h-8 w-16 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>

          {/* Reply */}
          <div className="mt-6 border-l border-border pl-5">
            <div className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />

                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
