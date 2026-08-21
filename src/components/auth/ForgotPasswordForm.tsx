import { useState, type FormEvent } from "react";
import { Loader2, AlertCircle } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getErrorMessage } from "../../lib/getErrorMessage";
import { useForgottenPassword } from "../../hooks/user/useForgottenPassword";

export default function ForgotPasswordForm() {
  const [identifier, setIdentifier] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    mutate: sendEmail,
    isPending,
    isError,
    error,
  } = useForgottenPassword();

  const handleForgotPassword = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const normalizedIdentifier = identifier.trim().toLowerCase();

    if (!normalizedIdentifier) {
      return;
    }

    sendEmail(
      {
        identifier: normalizedIdentifier,
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
        },
      }
    );
  };

  if (isSubmitted) {
    return (
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-center">
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Check your inbox! If an account exists for{" "}
          <span className="font-medium">{identifier}</span>,
          password reset instructions have been sent.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleForgotPassword}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="identifier">
          Username or email
        </Label>

        <Input
          id="identifier"
          type="text"
          autoComplete="username"
          placeholder="Username or email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
      </div>

      {isError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />

          <p className="text-sm leading-snug text-red-400">
            {getErrorMessage(
              error,
              "Failed to send reset email. Please try again."
            )}
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-10 w-full"
      >
        {isPending && (
          <Loader2 className="mr-2 size-4 animate-spin" />
        )}

        {isPending
          ? "Sending..."
          : "Send reset instructions"}
      </Button>
    </form>
  );
}
