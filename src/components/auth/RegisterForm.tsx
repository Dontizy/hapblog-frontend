import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Eye, EyeOff, Loader2, AlertCircle, User, AtSign, Mail, Lock } from "lucide-react";
import { getErrorMessage } from "../../lib/getErrorMessage";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRegister } from "../../hooks/user/useRegister";

export function RegisterForm() {
  const navigate = useNavigate();
  const { mutateAsync: register, isPending: loading } = useRegister();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!name || !username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await register({ name, username, email, password });
      navigate("/feeds");
    } catch (err) {
      setError(
        getErrorMessage(err, "Something went wrong. Please try again."),
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>

        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Writer"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 transition-shadow focus-visible:ring-2 focus-visible:ring-accent/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>

        <div className="relative">
          <AtSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="username"
            type="text"
            autoComplete="username"
            placeholder="janewriter"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value.trim().toLowerCase())
            }
            className="pl-10 transition-shadow focus-visible:ring-2 focus-visible:ring-accent/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 transition-shadow focus-visible:ring-2 focus-visible:ring-accent/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 transition-shadow focus-visible:ring-2 focus-visible:ring-accent/50"
          />

          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            {show ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-red-400 leading-snug">{error}</p>
        </div>
      )}

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
        <Button type="submit" disabled={loading} className="h-10 w-full">
          {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
          Create account
        </Button>
      </motion.div>

      <p className="text-pretty text-center text-xs leading-relaxed text-muted-foreground">
        By creating an account you agree to our Terms of Service and Privacy
        Policy.
      </p>
    </form>
  );
}
