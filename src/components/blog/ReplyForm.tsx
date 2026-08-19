import { useState } from "react";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useCreateReply } from "../../hooks/comment/useComment";
import { Spinner } from "../loading/Spinner";


interface ReplyFormProps {
  commentId: string;
  blogId: string;
  onCancel: () => void;
}

export default function ReplyForm({ commentId, blogId, onCancel }: ReplyFormProps) {
  const [body, setBody] = useState("");
  const { mutate, isPending } = useCreateReply();


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;

    mutate(
      {
         blogId,
        commentId,
        reply: {
          body,
        },
      },
      {
        onSuccess: () => {

          setBody("");
          onCancel();
        },
      },
    );
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
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={isPending}>
          {isPending ? <><Spinner />Replying...</> : "Reply"}
        </Button>
      </div>
    </form>
  );
}
