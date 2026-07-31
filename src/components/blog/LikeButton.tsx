import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useLikeBlog } from "../../hooks/blog/useBlog";

interface LikeButtonProps {
  blogId: string;
  isLiked: boolean;
  likesCount: number;
  isAuthenticated: boolean;
  size?: "sm" | "default";
}

export default function LikeButton({
  blogId,
  isLiked,
  likesCount,
  isAuthenticated,
  size = "default",
}: LikeButtonProps) {
  const { mutate: toggleLike, isPending } = useLikeBlog();

  // Bumped on every click to force the bounce animation to replay via `key`,
  // regardless of whether this is a like or an unlike.
  const [pulseKey, setPulseKey] = useState(0);

  // Tracks whether a burst is currently playing, so only one shows at a time
  // and it's removed from the DOM once its animation finishes.
  const [showBurst, setShowBurst] = useState(false);

  const handleLike = () => {
    setPulseKey((k) => k + 1);
    // Only burst on the like direction — mirrors Instagram/most apps, where
    // unliking is a quiet action and liking is the celebratory one.
    if (!isLiked) {
      setShowBurst(true);
    }
    toggleLike(blogId);
  };
  const toDisable = isPending || !isAuthenticated;

  return (
    <div className="relative inline-flex">
      <Button
        variant="ghost"
        size={size === "sm" ? "sm" : "default"}
        onClick={handleLike}
        disabled={toDisable}
        aria-label={isLiked ? "Unlike this post" : "Like this post"}
        aria-pressed={isLiked}
        className={cn("gap-2 text-muted-foreground", isLiked && "text-accent")}
      >
        <Heart
          key={pulseKey}
          className={cn(
            size === "sm" ? "h-4 w-4" : "h-5 w-5",
            isLiked && "fill-accent",
            "animate-heart-pop",
          )}
        />
        {likesCount}
      </Button>

      {showBurst && (
        <Heart
          onAnimationEnd={() => setShowBurst(false)}
          className={cn(
            "pointer-events-none absolute left-4 top-1/2 fill-accent text-accent animate-heart-burst",
            size === "sm" ? "h-5 w-5" : "h-6 w-6",
          )}
        />
      )}
    </div>
  );
}
