import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useBroadcastAnnouncement } from "../../hooks/admin/useAdmin";

interface AnnouncementModalProps {
  onClose: () => void;
}

export default function AnnouncementModal({
  onClose,
}: AnnouncementModalProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { mutate: broadcast, isPending } = useBroadcastAnnouncement();

  const handleSend = () => {
    if (!title.trim() || !message.trim()) return;
    broadcast(
      { title: title.trim(), message: message.trim() },
      { onSuccess: onClose },
    );
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <h2 className="font-serif text-lg font-semibold text-foreground">
            New announcement
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          This will be sent to every user on the platform.
        </p>

        <div className="mt-4 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            rows={4}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={isPending || !title.trim() || !message.trim()}
          >
            {isPending ? "Sending…" : "Send to everyone"}
          </Button>
        </div>
      </div>
    </div>
  );
}
