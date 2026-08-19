import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  useToggleFollowUser,
  useUserProfile,
  usePublicProfile,
} from "../../hooks/user/useUserProfile";
import { useAuthStore } from "../../store/useAuthStore";
import { Spinner } from "../loading/Spinner";
import { SOUND } from "../../lib/sound";
import { useSound } from "../../hooks/useSound";
import type { Author } from "../../lib/Author";

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { mutate: followAuthor, isPending } = useToggleFollowUser();
  const { data: currentUserData } = useUserProfile();
  const { data: publicUser } = usePublicProfile(author.username);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const playFollowSound = useSound(SOUND.FOLLOW);

  const currentUser = currentUserData?.user;
  const currentUserId = currentUser?.id || currentUser?.id;
  const canFollow = isAuthenticated && currentUserId !== author._id;
  const isFollowing = publicUser?.isFollowing;

  const handleFollow = () => {
    if (!currentUser) return;
    if (!isFollowing) {
      playFollowSound();
    }
    followAuthor(author._id);
  };

  return (
    <section className="my-10">
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-6 text-center shadow-xs transition-colors sm:p-8">
        <div className="flex flex-col items-center">

          {/* Avatar */}
          <Link
            to={`/author/${author.username}/profile`}
            className="group rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar className="size-20 border border-border/80 transition-transform duration-200 group-hover:scale-105">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="font-serif text-lg font-semibold">
                {author.name?.charAt(0)?.toUpperCase() ?? "A"}
              </AvatarFallback>
            </Avatar>
          </Link>

          {/* Written By Header */}
          <span className="mt-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80">
            Written by
          </span>

          {/* Author Name */}
          <Link
            to={`/author/${author.username}/profile`}
            className="mt-1 font-serif text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-accent"
          >
            {author.name}
          </Link>

          {/* Username space */}
          {author.username && (
            <span className="mt-0.5 text-xs font-medium text-muted-foreground/90">
              @{author.username.replace(/^@/, '')}
            </span>
          )}

          {/* Bio */}
          <p className="mt-2.5 max-w-md text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {author.bio ||
              "Writing about code, creativity, and the ideas shaping technology. One post at a time."}
          </p>

          {/* Follow Button */}
          {canFollow && (
            <Button
              size="sm"
              onClick={handleFollow}
              disabled={isPending}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              variant={isFollowing ? "outline" : "default"}
              className={`mt-6 w-full max-w-xs rounded-full text-xs transition-all active:scale-95 ${
                isFollowing && isHovered
                  ? "border-destructive/50 text-destructive hover:bg-destructive/10"
                  : ""
              }`}
            >
              {isPending ? (
                <Spinner />
              ) : isFollowing ? (
                isHovered ? "Unfollow" : "Following"
              ) : (
                "Follow"
              )}
            </Button>
          )}

        </div>
      </div>
    </section>
  );
}
