export default function BlogDetailsSkeleton() {
  return (
    <main className="mx-auto max-w-5xl animate-pulse px-4 py-10">
      {/* Hero Image */}
      <div className="h-75 w-full rounded-3xl bg-muted md:h-105" />

      {/* Title */}
      <div className="mt-8 h-12 w-3/4 rounded bg-muted" />

      {/* Author */}
      <div className="mt-8 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-muted" />

        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-muted" />
          <div className="h-3 w-28 rounded bg-muted" />
        </div>
      </div>

      {/* Content */}
      <div className="mt-12 space-y-5">
        <div className="h-5 w-full rounded bg-muted" />
        <div className="h-5 w-full rounded bg-muted" />
        <div className="h-5 w-11/12 rounded bg-muted" />
        <div className="h-5 w-full rounded bg-muted" />
        <div className="h-5 w-4/5 rounded bg-muted" />
        <div className="h-5 w-full rounded bg-muted" />
        <div className="h-5 w-10/12 rounded bg-muted" />
      </div>

      {/* Actions */}
      <div className="mt-10 flex gap-4">
        <div className="h-10 w-24 rounded-xl bg-muted" />
        <div className="h-10 w-24 rounded-xl bg-muted" />
        <div className="h-10 w-24 rounded-xl bg-muted" />
      </div>

      {/* Author Card */}
      <div className="mt-12 flex items-center gap-5 rounded-3xl border border-border p-6">
        <div className="h-20 w-20 rounded-full bg-muted" />

        <div className="flex-1 space-y-3">
          <div className="h-5 w-48 rounded bg-muted" />
          <div className="h-4 w-64 rounded bg-muted" />
          <div className="h-4 w-40 rounded bg-muted" />
        </div>

        <div className="h-10 w-28 rounded-xl bg-muted" />
      </div>

      {/* Comment Form */}
      <div className="mt-12 rounded-3xl border border-border p-6">
        <div className="mb-5 h-5 w-40 rounded bg-muted" />

        <div className="h-32 rounded-xl bg-muted" />

        <div className="mt-5 ml-auto h-10 w-36 rounded-xl bg-muted" />
      </div>

      {/* Comments */}
      <div className="mt-12 space-y-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-border p-6"
          >
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-muted" />

              <div className="flex-1">
                <div className="h-5 w-36 rounded bg-muted" />
                <div className="mt-2 h-4 w-28 rounded bg-muted" />

                <div className="mt-6 space-y-3">
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-4/5 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
