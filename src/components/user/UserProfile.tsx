import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Mail,
  Settings,
  Edit3,
  FileText,
  Users,
  UserCheck,
} from "lucide-react";

import { useUserProfile } from "../../hooks/user/useUserProfile";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import FollowListModal from "./FollowListModal";
import UserPostsGrid from "./UserPostsGrid";
import { Spinner } from "../loading/Spinner";
import { useGetUserBlogPost } from "../../hooks/user/useUserBlog";

type ListTab = "followers" | "following";

const stats = (blogsCount: number, followersCount: number, followingCount: number) => [
  {
    label: "Posts",
    value: blogsCount,
    icon: FileText,
    tab: null,
  },
  {
    label: "Followers",
    value: followersCount,
    icon: Users,
    tab: "followers" as const,
  },
  {
    label: "Following",
    value: followingCount,
    icon: UserCheck,
    tab: "following" as const,
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data: profileData, isPending, isError } = useUserProfile();
  const {data:postsData} = useGetUserBlogPost()

  const [isImageOpen, setIsImageOpen] = useState(false);
  const [activeListTab, setActiveListTab] = useState<ListTab | null>(null);

  const postsGridRef = useRef<HTMLDivElement>(null);

  /*
   * Close overlays on Escape key press.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsImageOpen(false);
      setActiveListTab(null);
    };

    if (isImageOpen || activeListTab) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageOpen, activeListTab]);

  /*
   * Loading state.
   */
  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-background">
        <div className="flex animate-pulse items-center gap-1 text-sm text-muted-foreground">
          Profile
          <Spinner />
        </div>
      </div>
    );
  }

  /*
   * Error state.
   */
  if (isError || !profileData?.user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 bg-background px-4">
        <p className="text-sm text-muted-foreground">
          Couldn't load your profile details.
        </p>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  const { user } = profileData;

  const postsCount =
  postsData?.pages[0]?.data.pagination.totalPosts ?? 0;
  const followersCount = user.followersCount ?? 0;
  const followingCount = user.followingCount ?? 0;

  /*
   * Scroll smoothly down to the posts grid section.
   */
  const handlePostsClick = () => {
    postsGridRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header Banner */}
      <div className="h-32 w-full border-b border-border/40 bg-linear-to-r from-accent/20 via-primary/10 to-transparent" />

      <div className="mx-auto w-full max-w-lg px-4">
        {/* Profile Identity */}
        <div className="-mt-14 flex flex-col items-center text-center sm:-mt-16">
          {/* Avatar Button */}
          <button
            type="button"
            onClick={() => setIsImageOpen(true)}
            className="group relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Enlarge profile photo"
          >
            <Avatar className="size-24 rounded-full border-4 border-background shadow-md ring-1 ring-border/80 transition-transform duration-200 group-hover:scale-105 group-active:scale-95 sm:size-28">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xl font-medium">
                {user.name?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
          </button>

          {/* Name */}
          <h1 className="mt-4 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {user.name}
          </h1>

          {/* Username */}
          {user.username && (
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              @{user.username}
            </p>
          )}

          {/* Email */}
          {user.email && (
            <a
              href={`mailto:${user.email}`}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Mail className="size-3" />
              {user.email}
            </a>
          )}

          {/* Bio */}
          {user.bio && (
            <p className="mt-3.5 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              {user.bio}
            </p>
          )}

          {/* Profile Actions */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/profile/settings")}
              className="rounded-full px-4 text-xs"
            >
              <Edit3 className="mr-1.5 size-3.5" />
              Edit Profile
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile/settings")}
              className="size-8 rounded-full text-muted-foreground hover:text-foreground"
              aria-label="Settings"
            >
              <Settings className="size-4" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card/60 shadow-xs">
          {stats(postsCount, followersCount, followingCount).map((stat) => {
            const Icon = stat.icon;

            const handleClick = () => {
              if (stat.tab) {
                setActiveListTab(stat.tab);
                return;
              }
              handlePostsClick();
            };

            return (
              <button
                type="button"
                key={stat.label}
                onClick={handleClick}
                className="flex cursor-pointer flex-col items-center justify-center gap-1 p-4 text-foreground transition-colors first:rounded-l-2xl last:rounded-r-2xl hover:bg-secondary/80"
              >
                <Icon className="size-4 text-muted-foreground/70" />
                <span className="font-serif text-lg font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* User Posts Section with Infinite Scroll */}
        <div ref={postsGridRef} className="mt-8 scroll-mt-20">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Your Posts
          </h2>

          <UserPostsGrid />
        </div>
      </div>

      {/* Avatar Lightbox */}
      {isImageOpen && (
        <div
          onClick={() => setIsImageOpen(false)}
          className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/80 p-4 backdrop-blur-xs fade-in duration-200"
        >
          <button
            type="button"
            onClick={() => setIsImageOpen(false)}
            aria-label="Close profile photo"
            className="absolute right-4 top-4 rounded-full bg-background/20 p-2 text-white transition-colors hover:bg-background/40"
          >
            <X className="size-6" />
          </button>

          <img
            src={user.avatar}
            alt={user.name}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[80vh] max-w-[90vw] animate-in rounded-2xl object-contain shadow-2xl zoom-in-95 duration-200"
          />
        </div>
      )}

      {/* Followers / Following Modal Overlay */}
      {activeListTab && (
        <FollowListModal
          username={user.username}
          initialTab={activeListTab}
          onClose={() => setActiveListTab(null)}
        />
      )}
    </div>
  );
}
