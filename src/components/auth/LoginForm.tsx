import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuthStore } from "../../store/useAuthStore";
import { useLoginUser } from "../../hooks/user/useLoginUser";
import { getErrorMessage } from "../../lib/getErrorMessage";

export default function LoginForm() {
  // const { login } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useLoginUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleLoginUser = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          login(data.token);
          navigate("/feeds");
        },
      },
    );
    console.log(mutate);
  };

  return (
    <form onSubmit={handleLoginUser} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>

          <Link
            to="/forgot-password"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <Input
            id="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-10"
          />

          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
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
      <Button type="submit" disabled={isPending} className="h-10 w-full">
        {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
        Sign in
      </Button>
    </form>
  );
}
