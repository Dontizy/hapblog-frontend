import { useState, useMemo } from "react";
import {
  Shield,
  ShieldOff,
  Trash2,
  Ban,
  Megaphone,
  Search,
  FolderPlus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  useAdminUsers,
  useDeleteUser,
  useToggleAdminRole,
} from "../../hooks/admin/useAdmin";
import { useUserProfile } from "../../hooks/user/useUserProfile";
import SuspendUserModal from "../dialog/SuspendUserModal";
import AnnouncementModal from "../dialog/AnnoucementModal";
import type { User } from "../../lib/user";
import { useCreateCategory } from "../../hooks/category/useCategory";


const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function yearOptions() {
  const current = new Date().getFullYear();
  return Array.from({ length: 6 }, (_, i) => current - i);
}

export default function AdminPage() {
  const { data: currentUser, isPending: isProfilePending } = useUserProfile();

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [page, setPage] = useState(1);

  const [suspendTarget, setSuspendTarget] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  // Category modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const params = useMemo(
    () => ({
      search: search || undefined,
      month: month || undefined,
      year: year || undefined,
      page,
    }),
    [search, month, year, page]
  );

  const { data, isLoading, isError } = useAdminUsers(params);
  const { mutate: toggleAdmin, isPending: isTogglingAdmin } = useToggleAdminRole();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: createCategory, isPending: isCreatingCategory } = useCreateCategory();

  const isAdmin = currentUser?.user.role === "admin";

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    createCategory(
      { name: categoryName.trim(), description: categoryDescription.trim() },
      {
        onSuccess: () => {
          setCategoryName("");
          setCategoryDescription("");
          setShowCategoryModal(false);
        },
      }
    );
  };

  if (!isProfilePending && !isAdmin) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          You don't have access to this page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Admin
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowCategoryModal(true)}
              className="gap-2"
            >
              <FolderPlus className="size-4" />
              New category
            </Button>
            <Button onClick={() => setShowAnnouncement(true)} className="gap-2">
              <Megaphone className="size-4" />
              New announcement
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <div className="relative min-w-55 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, username, or email"
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <select
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Any month</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Any year</option>
            {yearOptions().map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {(search || month || year) && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setMonth("");
                setYear("");
                setPage(1);
              }}
              className="text-sm text-muted-foreground underline-offset-2 hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          {isLoading && (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              Loading users…
            </p>
          )}

          {isError && (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              Couldn't load users. Try refreshing.
            </p>
          )}

          {data && data.users.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              No users match these filters.
            </p>
          )}

          {data && data.users.length > 0 && (
            <ul className="divide-y divide-border">
              {data.users.map((u) => {
                const isAdmin = u.role === "admin";

                const isSuspended =
                  u.suspendedUntil !== null &&
                  u.suspendedUntil !== undefined &&
                  new Date(u.suspendedUntil) > new Date();

                return (
                  <li
                    key={u._id}
                    className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="size-9 shrink-0">
                        <AvatarImage src={u.avatar} alt={u.name} />
                        <AvatarFallback>
                          {u.name?.[0]?.toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 truncate text-sm font-medium text-foreground">
                          {u.name}

                          {isAdmin && (
                            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                              Admin
                            </span>
                          )}

                          {isSuspended && (
                            <span className="rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-destructive">
                              Suspended
                            </span>
                          )}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          @{u.username} · {u.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        title={isAdmin ? "Remove admin" : "Make admin"}
                        disabled={isTogglingAdmin}
                        onClick={() => toggleAdmin(u._id)}
                      >
                        {isAdmin ? (
                          <ShieldOff className="size-4" />
                        ) : (
                          <Shield className="size-4" />
                        )}
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        title="Suspend user"
                        onClick={() => setSuspendTarget(u)}
                      >
                        <Ban className="size-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        title="Delete user"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setDeleteTarget(u)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {data.currentPage} of {data.totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= data.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Suspend User Modal */}
      {suspendTarget && (
        <SuspendUserModal
          userId={suspendTarget._id}
          userName={suspendTarget.name}
          onClose={() => setSuspendTarget(null)}
        />
      )}

      {/* Announcement Modal */}
      {showAnnouncement && (
        <AnnouncementModal onClose={() => setShowAnnouncement(false)} />
      )}

      {/* Create Category Modal */}
      {showCategoryModal && (
        <div
          onClick={() => setShowCategoryModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl"
          >
            <h2 className="font-serif text-lg font-semibold text-foreground">
              Add New Category
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Create a new category for blog posts.
            </p>

            <form onSubmit={handleCreateCategory} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="text-xs font-medium text-foreground">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Web Development"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief description of the category..."
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div className="mt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCategoryModal(false)}
                  disabled={isCreatingCategory}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreatingCategory}>
                  {isCreatingCategory ? "Creating…" : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          onClick={() => setDeleteTarget(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl"
          >
            <h2 className="font-serif text-lg font-semibold text-foreground">
              Delete {deleteTarget.name}?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              This permanently deletes the user and all their blogs. This can't
              be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={isDeleting}
                onClick={() =>
                  deleteUser(deleteTarget._id, {
                    onSuccess: () => setDeleteTarget(null),
                  })
                }
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
