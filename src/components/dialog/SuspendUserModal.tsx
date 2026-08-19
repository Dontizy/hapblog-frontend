import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useSuspendUser } from "../../hooks/admin/useAdmin";

interface SuspendUserModalProps {
  userId: string;
  userName: string;
  onClose: () => void;
}

export default function SuspendUserModal({
  userId,
  userName,
  onClose,
}: SuspendUserModalProps) {
  const [days, setDays] = useState(1);
  const { mutate: suspend, isPending } = useSuspendUser();

  const handleConfirm = () => {
    suspend(
      { id: userId, days },
      {
        onSuccess: onClose,
      },
    );
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <h2 className="font-serif text-lg font-semibold text-foreground">
            Suspend {userName}
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
          Choose how many days to suspend this account for.
        </p>

        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDays(d)}
              className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                days === d
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/70"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending
              ? "Suspending…"
              : `Suspend for ${days} day${days === 1 ? "" : "s"}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
