import { Heart } from "lucide-react";
import { useState } from "react";

import type { Reply } from "../../lib/reply";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface ReplyCardProps {
  reply: Reply;
}

export default function ReplyCard({ reply }: ReplyCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reply.likesCount);

  return (
    <div className="relative flex gap-3">
      {/* Thread line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      <Avatar className="relative z-10 h-9 w-9 shrink-0 bg-background">
        
        <AvatarImage src={reply.author.avatar} />
        <AvatarFallback>
          {reply.author.name.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-medium text-sm">
            {reply.author.name}
          </h4>

          <span className="text-xs text-muted-foreground">
            {new Date(reply.createdAt).toLocaleDateString()}
          </span>
        </div>

        <p className="mt-2 wrap-break-word text-sm leading-7 text-muted-foreground">
          {reply.body}
        </p>

        <Button
          variant="ghost"
          size="sm"
          className="mt-2 px-0"
          onClick={() => {
            setLiked((prev) => !prev);

            setLikesCount((prev) =>
              liked ? prev - 1 : prev + 1
            );
          }}
        >
          <Heart
            className={cn(
              "mr-2 h-4 w-4",
              liked && "fill-red-500 text-red-500"
            )}
          />

          {likesCount}
        </Button>
      </div>
    </div>
  );
}
