import { useState } from "react";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface CommentFormProps {
  onSubmit: (body: string) => void;
  isCommentPending?: boolean;
}

export default function CommentForm({
  onSubmit,
  isCommentPending = false,
}: CommentFormProps) {
  const [body, setBody] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!body.trim()) return;

    onSubmit(body);

    setBody("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-6"
    >
      <h3 className="mb-4 text-lg font-semibold">
        Leave a Comment
      </h3>

      <Textarea
        rows={5}
        placeholder="Share your thoughts..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          disabled={isCommentPending}
        >
          {isCommentPending ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </form>
  );
}
