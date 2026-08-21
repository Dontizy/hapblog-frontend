import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Eye, EyeOff, Loader2, AlertCircle, Mail, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuthStore } from "../../store/useAuthStore";
import { useLoginUser } from "../../hooks/user/useLoginUser";
import { getErrorMessage } from "../../lib/getErrorMessage";

export default function LoginForm() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useLoginUser();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleLoginUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { identifier, password },
      {
        onSuccess: (data) => {
          login(data.token);
          navigate("/feeds");
        },
      },
    );
  };

  return (
    <form onSubmit={handleLoginUser} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="identifier">Email or Username</Label>

        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="identifier"
            type="text"
            autoComplete="username"
            placeholder="Email or username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="pl-10 transition-shadow focus-visible:ring-2 focus-visible:ring-accent/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>

          <Link
            to="/forgot-password"
            className="text-xs text-muted-foreground transition-colors hover:text-accent"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Password"
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
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {isError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-red-400 leading-snug">
            {getErrorMessage(error, "Login failed. Check your credentials.")}
          </p>
        </div>
      )}

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
        <Button type="submit" disabled={isPending} className="h-10 w-full">
          {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          Sign in
        </Button>
      </motion.div>
    </form>
  );
}
