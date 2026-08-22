import { useState, type FormEvent } from "react";
import { AlertCircle, Loader2, Mail } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { getErrorMessage } from "../../lib/getErrorMessage";
import { useForgottenPassword } from "../../hooks/user/useForgottenPassword";

export default function ForgotPasswordForm() {
  const [identifier, setIdentifier] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    mutate: sendEmail,
    isPending,
    isError,
    error,
  } = useForgottenPassword();

  const handleForgotPassword = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const normalizedIdentifier = identifier.trim().toLowerCase();

    if (!normalizedIdentifier) return;

    sendEmail(
      {
        identifier: normalizedIdentifier,
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
        },
      },
    );
  };

  if (isSubmitted) {
    return (
      <div className="space-y-5">
        <div className="flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
          <Mail className="mt-0.5 size-4 shrink-0 text-emerald-500" />

          <p className="text-sm leading-relaxed text-emerald-600 dark:text-emerald-400">
            Check your inbox! If an account exists for{" "}
            <span className="font-medium">
              {identifier}
            </span>
            , password reset instructions have been sent.
          </p>
        </div>

        <Button
          type="button"
          className="h-10 w-full"
          onClick={() => setIsSubmitted(false)}
        >
          Send again
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleForgotPassword}
      className="space-y-5"
    >
      {/* Identifier */}
      <div className="space-y-2">
        <Label htmlFor="identifier">
          Username or email
        </Label>

        <div className="relative">
          <Mail
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              size-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            id="identifier"
            type="text"
            autoComplete="username"
            placeholder="Username or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            disabled={isPending}
            required
            className="
              h-11
              pl-10
              transition-shadow
              focus-visible:ring-2
              focus-visible:ring-accent/50
            "
          />
        </div>
      </div>

      {/* Error */}
      {isError && (
        <div
          className="
            flex
            items-start
            gap-3
            rounded-lg
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            animate-in
            fade-in
            slide-in-from-top-1
            duration-200
          "
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />

          <p className="text-sm leading-snug text-red-400">
            {getErrorMessage(
              error,
              "Failed to send reset email. Please try again.",
            )}
          </p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending || !identifier.trim()}
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