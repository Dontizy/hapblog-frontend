import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Settings, Mail, ShieldCheck, FileText, Users, UserPlus, Bookmark } from "lucide-react";
import { useUserProfile } from "../../hooks/user/useUserProfile";

export default function UserProfile() {
  const { data, isError, isPending } = useUserProfile();
  const [isImageOpen, setIsImageOpen] = useState(false);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading profile…</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground">
          Couldn't load this profile. Try refreshing the page.
        </p>
      </div>
    );
  }

  const { user } = data;

  const stats = [
    { label: "Posts", value: user.blogsCount, icon: FileText },
    { label: "Followers", value: user.followersCount, icon: Users },
    { label: "Following", value: user.followingCount, icon: UserPlus },
    { label: "Bookmarks", value: user.bookmarksCount, icon: Bookmark },
  ];

  return (
    <div className="min-h-screen bg-background px-4 py-2">
      <div className="mx-auto w-full max-w-lg">
        {/* Settings entry point */}
        <div className="mb-6 flex justify-end">
         <Link
  to="/profile/settings"
  aria-label="Settings"
  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary active:scale-[0.98]"
>
  <Settings className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
  <span>Settings</span>
</Link>
        </div>

        {/* Identity */}
        <div className="flex flex-col items-center text-center">
          <button
            type="button"
            onClick={() => setIsImageOpen(true)}
            className="rounded-full transition-transform active:scale-95"
            aria-label="View profile photo"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full object-cover ring-1 ring-border cursor-pointer"
            />
          </button>

          <div className="mt-5 flex items-center gap-2">
            <h1 className="text-balance font-serif text-2xl font-semibold tracking-tight text-foreground">
              {user.name}
            </h1>
            {user.role === "admin" && (
              <span className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                <ShieldCheck className="h-3 w-3" />
                Admin
              </span>
            )}
          </div>

          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            {user.email}
          </div>

          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
            {user.bio}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-4 divide-x divide-border rounded-xl border border-border bg-card">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5 py-4">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <span className="font-serif text-lg font-semibold text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded profile photo overlay */}
      {isImageOpen && (
        <div
          onClick={() => setIsImageOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
        >
          <button
            type="button"
            onClick={() => setIsImageOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <img
            src={user.avatar}
            alt={user.name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain animate-in zoom-in-95 duration-200"
          />
        </div>
      )}
    </div>
  );
}
