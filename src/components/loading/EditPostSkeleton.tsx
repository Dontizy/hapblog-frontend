import { Skeleton } from "../ui/Skeleton";

export default function EditPostSkeleton() {
  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-2xl animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-40 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        {/* Error placeholder (optional) */}
        <Skeleton className="mt-4 h-0 w-full" />

        {/* Title */}
        <div className="mt-8 space-y-3">
          <Skeleton className="h-10 w-3/4 rounded-md" />
        </div>

        {/* Category */}
        <div className="mt-6">
          <Skeleton className="h-10 w-48 rounded-lg" />
        </div>

        {/* Cover Image */}
        <div className="mt-6">
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>

        {/* Editor Toolbar */}
        <div className="mt-6 rounded-xl border border-border">
          <div className="flex items-center gap-2 border-b border-border p-3">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="ml-4 h-8 w-20 rounded-md" />
          </div>

          {/* Editor Content */}
          <div className="space-y-4 p-6">
            <Skeleton className="h-6 w-11/12" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-10/12" />
            <Skeleton className="h-6 w-9/12" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-8/12" />
            <Skeleton className="h-6 w-10/12" />
            <Skeleton className="h-6 w-7/12" />
            <Skeleton className="h-6 w-11/12" />
            <Skeleton className="h-6 w-9/12" />
          </div>
        </div>
      </div>
    </div>
  );
}
