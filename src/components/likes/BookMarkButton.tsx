import { useState } from "react";
import { Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useAddOrRemoveBookmark } from "../../hooks/user/useBookmarks";
import { useSound } from "../../hooks/useSound";
import { SOUND } from "../../lib/sound";
import { Spinner } from "../loading/Spinner";

interface BookmarkButtonProps {
  blogId: string;
  isBookmarked: boolean;
  isAuthenticated: boolean;
  size?: "sm" | "default";
}

export default function BookmarkButton({
  blogId,
  isBookmarked,
  isAuthenticated,
  size = "default",
}: BookmarkButtonProps) {
  const { mutate: toggleBookmark, isPending } = useAddOrRemoveBookmark();

  const playBookmark = useSound(SOUND.BOOKMARK);

  const [animateBookmark, setAnimateBookmark] = useState(false);

  const handleBookmark = () => {
    if (isPending || !isAuthenticated) return;

    if (!isBookmarked) {
      setAnimateBookmark(true);
      playBookmark();

      setTimeout(() => {
        setAnimateBookmark(false);
      }, 600);
    }

    toggleBookmark(blogId);
  };

  const disabled = isPending || !isAuthenticated;

  return (
    <div className="relative inline-flex">
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          variant="ghost"
          size={size === "sm" ? "sm" : "default"}
          disabled={disabled}
          onClick={handleBookmark}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this post"}
          aria-pressed={isBookmarked}
          className={cn(
            "relative overflow-visible text-muted-foreground",
            isBookmarked && "text-primary",
          )}
        >
          <motion.div
            animate={
              animateBookmark
                ? {
                    scale: [0.3, 1.5, 1.15, 1],
                    rotate: [0, -12, 10, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              times: [0, 0.35, 0.7, 1],
              ease: "easeOut",
            }}
          >
            {!isPending ? (
              <Bookmark
                className={cn(
                  size === "sm" ? "h-4 w-4" : "h-5 w-5",
                  "transition-colors",
                  isBookmarked && "fill-primary",
                )}
              />
            ) : (
              <Spinner />
            )}
          </motion.div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {animateBookmark && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2"
            initial={{
              scale: 0,
              opacity: 1,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: 2,
              opacity: 0,
              rotate: 180,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <div className="relative h-10 w-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-primary"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((i * Math.PI) / 3) * 18,
                    y: Math.sin((i * Math.PI) / 3) * 18,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
