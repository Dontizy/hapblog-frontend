import { useState } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useLikeReply } from "../../hooks/comment/useComment";
import { useSound } from "../../hooks/useSound";
import { SOUND } from "../../lib/sound";

interface LikeReplyProps {
  commentId: string;
  replyId: string;
  isLiked: boolean;
  likesCount: number;
  isAuthenticated: boolean;
  size?: "sm" | "default";
}

export default function LikeReplyButton({
  commentId,
  replyId,
  isLiked,
  likesCount,
  isAuthenticated,
  size = "default",
}: LikeReplyProps) {
  const { mutate: toggleLike, isPending } = useLikeReply();
  const playLike = useSound(SOUND.LIKE);
  const [animateHeart, setAnimateHeart] = useState(false);

  const handleLike = () => {
    if (isPending || !isAuthenticated) return;

    if (!isLiked) {
      setAnimateHeart(true);
      playLike();
      setTimeout(() => {
        setAnimateHeart(false);
      }, 600);

      console.log(toggleLike);
    }

    toggleLike({ commentId, replyId });
  };

  const disabled = isPending || !isAuthenticated;

  return (
    <div className="relative inline-flex">
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          variant="ghost"
          size={size === "sm" ? "sm" : "default"}
          disabled={disabled}
          onClick={handleLike}
          aria-label={isLiked ? "Unlike this post" : "Like this post"}
          aria-pressed={isLiked}
          className={cn(
            "relative gap-2 overflow-visible text-muted-foreground",
            isLiked && "text-accent",
          )}
        >
          <motion.div
            animate={
              animateHeart
                ? {
                    scale: [0.3, 1.7, 1.25, 1],
                    rotate: [0, -18, 15, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.7,
              times: [0, 0.35, 0.65, 1],
              ease: "easeOut",
            }}
          >
            <Heart
              className={cn(
                size === "sm" ? "h-4 w-4" : "h-5 w-5",
                "transition-colors",
                isLiked && "fill-accent",
              )}
            />
          </motion.div>

          <motion.span
            key={likesCount}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {likesCount}
          </motion.span>
        </Button>
      </motion.div>

      <AnimatePresence>
        {animateHeart && (
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
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <div className="relative h-10 w-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-red-500"
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
                    duration: 0.5,
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
