import { AlertCircle, RefreshCw } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => Promise<unknown> | void;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
}: ErrorStateProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  async function handleRetry() {
    if (!onRetry) return;

    try {
      setIsRetrying(true);
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <div className="rounded-full bg-destructive/10 p-5">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        {message}
      </p>

      {onRetry && (
        <Button
          className="mt-8 gap-2"
          onClick={handleRetry}
          disabled={isRetrying}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              isRetrying ? "animate-spin" : ""
            }`}
          />

          {isRetrying ? "Retrying..." : "Try Again"}
        </Button>
      )}
    </div>
  );
}
