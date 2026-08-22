import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { getErrorMessage } from "../../lib/getErrorMessage";
import { useResetPassword } from "../../hooks/user/useForgottenPassword";

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const { token } = useParams<{ token: string }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [validationError, setValidationError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    mutate: resetPassword,
    isPending,
    isError,
    error,
  } = useResetPassword();

  const handleResetPassword = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setValidationError("");

    if (!token) {
      setValidationError(
        "This password reset link is invalid or has expired.",
      );
      return;
    }

    if (password.length < 8) {
      setValidationError(
        "Password must be at least 8 characters long.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    resetPassword(
      {
        token,
        password,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      },
    );
  };

  // ------------------------------------------
  // Success state
  // ------------------------------------------

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="size-6 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-semibold tracking-tight">
            Password reset successful
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground">
            Your password has been changed successfully.
            You can now sign in with your new password.
          </p>
        </div>

        <Button
          type="button"
          className="h-10 w-full"
          onClick={() => navigate("/login")}
        >
          Continue to login
        </Button>
      </div>
    );
  }

  // ------------------------------------------
  // Reset form
  // ------------------------------------------

  return (
    <form
      onSubmit={handleResetPassword}
      className="space-y-5"
    >
      {/* New password */}
      <div className="space-y-2">
        <Label htmlFor="password">
          New password
        </Label>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValidationError("");
            }}
            disabled={isPending}
            required
            className="
              h-11
              pr-10
              transition-shadow
              focus-visible:ring-2
              focus-visible:ring-accent/50
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            className="
              absolute
              inset-y-0
              right-0
              flex
              w-10
              items-center
              justify-center
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          Use at least 8 characters.
        </p>
      </div>

      {/* Confirm password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm password
        </Label>

        <div className="relative">
          <Input
            id="confirmPassword"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setValidationError("");
            }}
            disabled={isPending}
            required
            className="
              h-11
              pr-10
              transition-shadow
              focus-visible:ring-2
              focus-visible:ring-accent/50
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                (prev) => !prev,
              )
            }
            aria-label={
              showConfirmPassword
                ? "Hide confirmation password"
                : "Show confirmation password"
            }
            className="
              absolute
              inset-y-0
              right-0
              flex
              w-10
              items-center
              justify-center
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            {showConfirmPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {(validationError || isError) && (
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
            {validationError ||
              getErrorMessage(
                error,
                "Failed to reset password. Please try again.",
              )}
          </p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        className="h-10 w-full"
      >
        {isPending && (
          <Loader2 className="mr-2 size-4 animate-spin" />
        )}

        {isPending
          ? "Resetting password..."
          : "Reset password"}
      </Button>
    </form>
  );
}