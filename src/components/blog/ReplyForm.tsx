import { useState } from "react";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface ReplyFormProps {
  isPending?: boolean;
  onSubmit: (body: string) => void;
  onCancel: () => void;
}

export default function ReplyForm({
  onSubmit,
  onCancel,
  isPending = false,
}: ReplyFormProps) {
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
      className="mt-5 rounded-2xl border border-border bg-muted/30 p-4"
    >
      <Textarea
        rows={3}
        placeholder="Write your reply..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="mt-4 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Replying..." : "Reply"}
        </Button>
      </div>
    </form>
  );
}
