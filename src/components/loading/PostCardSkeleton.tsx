export function PostCardSkeleton() {
  return (
    <article className="grid m-2 p-2 gap-5 border-b border-border py-8 sm:grid-cols-[1fr_auto] animate-pulse">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted" />

          <div className="space-y-2">
            <div className="h-4 w-28 rounded bg-muted" />
            <div className="h-3 w-20 rounded bg-muted" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-6 w-3/4 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
        </div>

        <div className="flex gap-4">
          <div className="h-4 w-16 rounded bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
        </div>
      </div>

      <div className="aspect-16/10 h-32 w-48 rounded-xl bg-muted" />
    </article>
  );
}
