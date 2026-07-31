import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useState } from "react";

import type { Comment } from "../../lib/comment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import ReplyCard from "./ReplyCard";
import ReplyForm from "./ReplyForm";
import ErrorState from "../ErrorState";

interface CommentCardProps {
  comment: Comment;
  onReply?: (commentId: string, body: string) => void;
  isCommentPending?: boolean;
  isReplyPending?: boolean;
  isCommentError?: boolean;
}

export default function CommentCard({
  comment,
  onReply,
  isCommentPending = false,
  // isReplyPending = false,
  isCommentError = false,
}: CommentCardProps) {
  const [liked, setLiked] = useState(false);
  const [likedCommentCount, setlikedCommentCount] = useState(comment.likedCommentCount);
  const [showReplyForm, setShowReplyForm] = useState(false);

  function handleLike() {
    setLiked((prev) => !prev);

    setlikedCommentCount((prev) =>
      liked ? prev - 1 : prev + 1
    );

    // TODO
    // likeCommentMutation.mutate(comment._id)
  }
 if(isCommentError){
  return <ErrorState title="Error" message="Failed to load comment." />
 }

 if(isCommentPending){
  return
 }

 const replies = comment.replies ?? [];
  console.log("Comments", comment);

  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md sm:p-6">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10 shrink-0 sm:h-11 sm:w-11">
          <AvatarImage
            src={comment.author.avatar}
            alt={comment.author.name}
          />

          <AvatarFallback>
            {comment.author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold">
                {comment.author.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Body */}
          <p className="mt-4 wrap-break-word whitespace-pre-wrap leading-7 text-foreground">
            {comment.body}
          </p>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
            >
              <Heart
                className={cn(
                  "mr-2 h-4 w-4",
                  liked &&
                    "fill-red-500 text-red-500"
                )}
              />

              {likedCommentCount}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setShowReplyForm((prev) => !prev)
              }
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Reply
            </Button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <ReplyForm
              // isPending={isReplyPending}
              onCancel={() =>
                setShowReplyForm(false)
              }
              onSubmit={(body) => {
                onReply?.(comment._id, body);
                setShowReplyForm(false);
              }}
            />
          )}

          {/* Replies */}
          {replies.length > 0 && (
            <div className="mt-6 space-y-6 pl-4 sm:pl-8">
              {replies.map((reply) => (
                <ReplyCard
                  key={reply._id}
                  reply={reply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
