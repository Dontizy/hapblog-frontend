import { SearchX } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = "No blogs found",
  message = "We couldn't find any blogs matching your search.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center px-6 text-center">
      <div className="rounded-full bg-muted p-5">
        <SearchX className="h-10 w-10 text-muted-foreground" />
      </div>

      <h2 className="mt-6 text-2xl font-bold">{title}</h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        {message}
      </p>

      {actionLabel && onAction && (
        <Button className="mt-8" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
