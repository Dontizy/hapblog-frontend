import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useAuthStore } from "../../store/useAuthStore";
import { useLoginUser } from "../../hooks/user/useLoginUser";
import { getErrorMessage } from "../../lib/getErrorMessage";

interface LocationState {
  from?: {
    pathname?: string;
    search?: string;
    hash?: string;
  };
}

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate, isPending, isError, error } = useLoginUser();

  const login = useAuthStore((state) => state.login);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const state = location.state as LocationState | null;

  const from = state?.from;

  const redirectTo = from?.pathname
    ? `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
    : "/feeds";

  const isFormValid =
    identifier.trim().length > 0 &&
    password.length > 0;

  const handleLoginUser = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!isFormValid || isPending) {
      return;
    }

    mutate(
      {
        identifier: identifier.trim(),
        password,
      },
      {
        onSuccess: (data) => {
          /*
           * Save authentication token.
           */
          login(data.token);

          /*
           * Return to the page the user originally wanted.
           * If they came directly to /login, go to /feeds.
           */
          navigate(redirectTo, {
            replace: true,
          });
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleLoginUser}
      className="space-y-5"
    >
      {/* Email / Username */}
      <div className="space-y-2">
        <Label htmlFor="identifier">
          Email or Username
        </Label>

        <div className="relative">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            placeholder="Email or username"
            value={identifier}
            onChange={(e) =>
              setIdentifier(e.target.value)
            }
            disabled={isPending}
            className="h-11 pl-10 transition-shadow focus-visible:ring-2 focus-visible:ring-accent/50"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">
            Password
          </Label>

          <Link
            to="/forgot-password"
            className="text-xs text-muted-foreground transition-colors hover:text-accent"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <Lock
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            disabled={isPending}
            className="h-11 pl-10 pr-10 transition-shadow focus-visible:ring-2 focus-visible:ring-accent/50"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((previous) => !previous)
            }
            disabled={isPending}
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {isError && (
        <motion.div
          initial={{
            opacity: 0,
            y: -6,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3"
          role="alert"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />

          <p className="text-sm leading-snug text-destructive">
            {getErrorMessage(
              error,
              "Login failed. Check your credentials and try again.",
            )}
          </p>
        </motion.div>
      )}

      {/* Sign in */}
      <motion.div
        whileHover={
          !isPending && isFormValid
            ? { scale: 1.01 }
            : undefined
        }
        whileTap={
          !isPending && isFormValid
            ? { scale: 0.98 }
            : undefined
        }
      >
        <Button
          type="submit"
          disabled={!isFormValid || isPending}
          className="h-11 w-full"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </motion.div>
    </form>
  );
}