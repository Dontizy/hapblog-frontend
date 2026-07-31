import { useState } from "react";
import { useParams } from "react-router-dom";
import { X, Mail } from "lucide-react";
import { usePublicProfile } from "../../hooks/user/useUserProfile";
import { useToggleFollowUser } from "../../hooks/user/useUserProfile";
import { Button } from "../ui/button";
import type { PublicUserResponse } from "../../lib/user";

const stats = (user: PublicUserResponse["user"], blogsCount: number) => [
  { label: "Posts", value: blogsCount },
  { label: "Followers", value: user.followersCount },
  { label: "Following", value: user.followingCount },
];

export default function PublicProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data, isError, isPending } = usePublicProfile(id!);
  const { mutate: toggleFollow, isPending: isTogglingFollow } =
    useToggleFollowUser();
  const [isImageOpen, setIsImageOpen] = useState(false);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading profile…</p>
      </div>
    );
  }

  if (isError || !data || !id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground">
          Couldn't load this profile. Try refreshing the page.
        </p>
      </div>
    );
  }

  const { user, isFollowing, blogsCount } = data;

  const handleToggleFollow = () => {
    toggleFollow(id);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto w-full max-w-lg">
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

          <h1 className="mt-5 text-balance font-serif text-2xl font-semibold tracking-tight text-foreground">
            {user.name}
          </h1>

          <a
            href={`mailto:${user.email}`}
            className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="h-3.5 w-3.5" />
            {user.email}
          </a>

          {user.bio && (
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              {user.bio}
            </p>
          )}

          <Button
            onClick={handleToggleFollow}
            disabled={isTogglingFollow}
            variant={isFollowing ? "outline" : "default"}
            className="mt-5 min-w-28"
          >
            {isTogglingFollow ? "…" : isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-card">
          {stats(user, blogsCount).map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 py-4"
            >
              <span className="font-serif text-lg font-semibold text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
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
