import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileEdit,
  Trash2,
  Send,
  Plus,
  Search,
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../loading/Spinner";
import { useGetDraft, usePublishDraft } from "../../hooks/user/useUserBlog";
import { useDeleteBlog } from "../../hooks/blog/useDeleteBlog";


export default function DraftsListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetDraft({limit:10, page, search});
  const { mutate: publishDraft, isPending: isPublishing, variables: publishingId } = usePublishDraft();
  const { mutate: deleteDraft, isPending: isDeleting } = useDeleteBlog();

  const drafts = data?.drafts ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalDrafts = data?.totalDrafts ?? 0;

  const handleDelete = (id: string) => {
    deleteDraft(id, {
      onSuccess: () => setDeletingId(null),
    });
  };

  const stripHtml = (htmlString: string = "") => {
    return htmlString.replace(/<[^>]*>/g, "").trim();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Top Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Drafts</h1>
            {!isLoading && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                {totalDrafts}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage, edit, and publish your saved work in progress.
          </p>
        </div>

        <Button
          onClick={() => navigate("/write")}
          className="gap-2 rounded-full font-medium"
        >
          <Plus className="size-4" />
          Create New Post
        </Button>
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search drafts by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reset to page 1 on search
          }}
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <Spinner />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-8 text-center">
          <AlertCircle className="size-8 text-destructive" />
          <p className="text-sm font-medium text-destructive">
            Failed to load drafts. Please try again.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && drafts.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-secondary">
            <FileText className="size-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            {search ? "No drafts match your search" : "No drafts saved"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {search
              ? "Try searching with a different keyword."
              : "Anything you write and don't publish immediately will show up here."}
          </p>
          {!search && (
            <Button
              variant="outline"
              onClick={() => navigate("/write")}
              className="mt-6 gap-2 rounded-full"
            >
              <Plus className="size-4" />
              Write a Story
            </Button>
          )}
        </div>
      )}

      {/* Draft List Cards */}
      {!isLoading && !isError && drafts.length > 0 && (
        <div className="space-y-3">
          {drafts.map((draft) => {
            const isDeletingThis = isDeleting && deletingId === draft._id;
            const isPublishingThis = isPublishing && publishingId.id === draft._id;

            return (
              <div
                key={draft._id}
                className="group flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80 hover:shadow-xs sm:flex-row sm:items-center"
              >
                {/* Information Area */}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                      {draft.category || "General"}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      Updated{" "}
                      {new Date(draft.updatedAt || draft.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </span>
                  </div>

                  <Link
                    to={`/edit/${draft._id}`}
                    className="block group-hover:text-primary transition-colors"
                  >
                    <h2 className="line-clamp-1 text-base font-semibold text-foreground">
                      {draft.title?.trim() ? draft.title : "Untitled Draft"}
                    </h2>
                  </Link>

                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {stripHtml(draft.content) || "No preview content..."}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 border-t border-border/60 pt-3 sm:border-t-0 sm:pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/update/${draft._id}/post`)}
                    className="gap-1.5 rounded-full text-xs"
                  >
                    <FileEdit className="size-3.5" />
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    disabled={isPublishingThis}
                    onClick={() => publishDraft({id:draft._id})}
                    className="gap-1.5 rounded-full text-xs"
                  >
                    {isPublishingThis ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Send className="size-3.5" />
                    )}
                    Publish
                  </Button>

                  {/* Inline Confirm Delete */}
                  {deletingId === draft._id ? (
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={isDeletingThis}
                        onClick={() => handleDelete(draft._id)}
                        className="rounded-full text-xs"
                      >
                        {isDeletingThis ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeletingId(null)}
                        className="rounded-full text-xs"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingId(draft._id)}
                      className="size-8 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Delete draft"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
{!isLoading && !isError && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            Page <span className="font-medium text-foreground">{page}</span> of{" "}
            <span className="font-medium text-foreground">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="gap-1 rounded-full text-xs"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="gap-1 rounded-full text-xs"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

