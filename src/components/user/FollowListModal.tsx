import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import { useAuthStore } from "../../store/useAuthStore";
import {
  useGetPublicFollowers,
  useGetPublicFollowing,
} from "../../hooks/user/useUserInfo";
import { useToggleFollowUser } from "../../hooks/user/useUserProfile";
import { Spinner } from "../loading/Spinner";

export interface FollowListUser {
  _id: string;
  username: string;
  name: string;
  avatar?: string;
  bio?: string;
  isFollowing?: boolean;
  isFollowingBack?: boolean;
}

type ListTab = "followers" | "following";

interface FollowListModalProps {
  username: string;
  initialTab: ListTab;
  onClose: () => void;
}

export default function FollowListModal({
  username,
  initialTab,
  onClose,
}: FollowListModalProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [tab, setTab] = useState<ListTab>(initialTab);

  const followers = useGetPublicFollowers(username, tab === "followers");
  const following = useGetPublicFollowing(username, tab === "following");

  const {
    mutate: toggleFollow,
    isPending: isToggling,
    variables: togglingUserId,
  } = useToggleFollowUser();

  const list = tab === "followers" ? followers : following;
  const users: FollowListUser[] =
    tab === "followers"
      ? (followers.data?.followers ?? [])
      : (following.data?.following ?? []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[80vh] w-full max-w-md flex-col rounded-t-2xl border border-border bg-card shadow-2xl animate-in slide-in-from-bottom-4 duration-200 sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 pt-4">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setTab("followers")}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === "followers"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Followers
            </button>
            <button
              type="button"
              onClick={() => setTab("following")}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === "following"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Following
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="mb-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2">
          {list.isPending && (
            <p className="flex justify-center px-3 py-6 text-center align-center text-sm text-muted-foreground">
              <Spinner />
            </p>
          )}

          {list.isError && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Couldn't load this list. Try again.
            </p>
          )}

          {list.isSuccess && users.length === 0 && (
            <p className="px-3 py-10 text-center text-sm text-muted-foreground">
              {tab === "followers"
                ? "No followers yet."
                : "Not following anyone yet."}
            </p>
          )}

          {users.map((u) => {
            const isFollowingUser =
              tab === "followers" ? u.isFollowing : u.isFollowingBack;
            const isThisUserToggling = isToggling && togglingUserId === u._id;

            return (
              <div
                key={u._id}
                className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-secondary/60"
              >
                <Link
                  to={`/author/${u.username}/profile`}
                  onClick={onClose}
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <Avatar className="size-10 shrink-0">
                    <AvatarImage src={u.avatar} alt={u.name} />
                    <AvatarFallback>
                      {u.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {u.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      @{u.username}
                    </p>
                  </div>
                </Link>

                {isAuthenticated && (
                  <Button
                    size="sm"
                    variant={isFollowingUser ? "outline" : "default"}
                    disabled={isThisUserToggling}
                    onClick={() => toggleFollow(u._id)}
                    className="shrink-0 rounded-full min-w-21.25"
                  >
                    {isThisUserToggling ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : isFollowingUser ? (
                      "Following"
                    ) : (
                      "Follow"
                    )}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
