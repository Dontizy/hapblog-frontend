import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { X, Mail, FileText, Users, UserCheck } from "lucide-react";

import {
  usePublicProfile,
  useUserProfile,
  useToggleFollowUser,
} from "../../hooks/user/useUserProfile";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import type { PublicUserResponse } from "../../lib/user";

import { SOUND } from "../../lib/sound";
import { useSound } from "../../hooks/useSound";
import { useAuthStore } from "../../store/useAuthStore";

import FollowListModal from "./FollowListModal";
import PostsGrid from "./PostsGrid";
import { Spinner } from "../loading/Spinner";

type ListTab = "followers" | "following";

const stats = (user: PublicUserResponse["user"], blogsCount: number) => [
  {
    label: "Posts",
    value: blogsCount,
    icon: FileText,
    tab: null,
  },
  {
    label: "Followers",
    value: user.followersCount ?? 0,
    icon: Users,
    tab: "followers" as const,
  },
  {
    label: "Following",
    value: user.followingCount ?? 0,
    icon: UserCheck,
    tab: "following" as const,
  },
];

export default function PublicProfilePage() {
  const { username } = useParams<{ username: string }>();

  const { data, isError, isPending } = usePublicProfile(username!);

  const { mutate: toggleFollow, isPending: isTogglingFollow } =
    useToggleFollowUser();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data: currentUser } = useUserProfile();

  const followSound = useSound(SOUND.FOLLOW);

  const [isImageOpen, setIsImageOpen] = useState(false);
  const [activeListTab, setActiveListTab] = useState<ListTab | null>(null);

  const postsGridRef = useRef<HTMLDivElement>(null);

  /*
   * Close overlays with Escape.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

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
  if (isError || !data || !username) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground">
          Couldn't load this profile. Try refreshing the page.
        </p>
      </div>
    );
  }

  const { user, isFollowing, blogsCount } = data;

  const loggedUserId = currentUser?.user.id;
  const profileUserId = user._id;

  /*
   * A user cannot follow themselves.
   */
  const canFollow =
    isAuthenticated && !!loggedUserId && loggedUserId !== profileUserId;

  /*
   * Follow / unfollow.
   */
  const handleToggleFollow = () => {
    if (!profileUserId) {
      return;
    }

    if (!isFollowing) {
      followSound();
    }

    toggleFollow(profileUserId);
  };

  /*
   * Scroll to posts when clicking Posts statistic.
   */
  const handlePostsClick = () => {
    postsGridRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Top Banner Accent */}
      <div className="h-32 w-full border-b border-border/40 bg-linear-to-r from-accent/20 via-primary/10 to-transparent" />

      <div className="mx-auto w-full max-w-lg px-4">
        {/* Profile Identity */}
        <div className="-mt-14 flex flex-col items-center text-center sm:-mt-16">
          {/* Avatar */}
          <button
            type="button"
            onClick={() => setIsImageOpen(true)}
            className="group relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="View profile photo"
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
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            @{user.username}
          </p>

          {/* Contact Creator */}
          {user.email && (
            <a
              href={`mailto:${user.email}`}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground shadow-xs transition-colors hover:bg-secondary active:scale-[0.98]"
            >
              <Mail className="size-3.5" />
              Mail this creator
            </a>
          )}

          {/* Bio */}
          {user.bio && (
            <p className="mt-3.5 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              {user.bio}
            </p>
          )}

          {/* Follow */}
          {canFollow && (
            <Button
              onClick={handleToggleFollow}
              disabled={isTogglingFollow}
              variant={isFollowing ? "outline" : "default"}
              className="mt-5 min-w-28 rounded-full shadow-xs transition-all active:scale-95"
            >
              {isTogglingFollow ? "…" : isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card/60 shadow-xs">
          {stats(user, blogsCount).map((stat) => {
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

        {/* Posts */}
        <div ref={postsGridRef} className="mt-8 scroll-mt-20">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Posts
          </h2>

          {profileUserId && <PostsGrid userId={profileUserId} />}
        </div>
      </div>

      {/* Profile Image Lightbox */}
      {isImageOpen && (
        <div
          onClick={() => setIsImageOpen(false)}
          className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/80 p-4 backdrop-blur-xs fade-in duration-200"
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setIsImageOpen(false)}
            aria-label="Close profile photo"
            className="absolute right-4 top-4 rounded-full bg-background/20 p-2 text-white transition-colors hover:bg-background/40"
          >
            <X className="size-6" />
          </button>

          {/* Image */}
          <img
            src={user.avatar}
            alt={user.name}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[80vh] max-w-[90vw] animate-in rounded-2xl object-contain shadow-2xl zoom-in-95 duration-200"
          />
        </div>
      )}

      {/* Followers / Following */}
      {activeListTab && (
        <FollowListModal
          username={username}
          initialTab={activeListTab}
          onClose={() => setActiveListTab(null)}
        />
      )}
    </div>
  );
}
