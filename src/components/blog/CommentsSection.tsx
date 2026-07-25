import type { Comment } from "../../lib/comment";

import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

interface CommentsSectionProps {
  comments: Comment[];
  onCommentSubmit?: (body: string) => void;
  isCommentPending?: boolean;
  isCommentError?: boolean;
  totalComments?: number;
}

export default function CommentsSection({
  comments,
  onCommentSubmit,
  isCommentPending = false,
  isCommentError = false,
  isReplyPending = false,
  totalComments,
}: CommentsSectionProps) {
  // const createCommentMutation = useCreateComment(blogId);
  return (
    <section className="mt-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Comments ({totalComments})</h2>
      </div>

      <CommentForm
        onSubmit={onCommentSubmit}
        isCommentPending={isCommentPending}
      />

      <div className="mt-10 space-y-6">
        {comments.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border py-16 text-center">
            <p className="text-muted-foreground">No comments yet.</p>

            <p className="mt-2 text-sm text-muted-foreground">
              Be the first to start the discussion.
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              isCommentPending={isCommentPending}
              isCommentError={isCommentError}
              isReplyPending={isReplyPending}
            />
          ))
        )}
      </div>
    </section>
  );
}
