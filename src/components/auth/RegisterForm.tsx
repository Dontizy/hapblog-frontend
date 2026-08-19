import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>

        <Input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Writer"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>

        <Input
          id="username"
          type="text"
          autoComplete="username"
          placeholder="janewriter"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value.trim().toLowerCase())
          }
        />
      </div>

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
        <Label htmlFor="password">Password</Label>

        <div className="relative">
          <Input
            id="password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 6 characters"
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
            {show ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={loading} className="h-10 w-full">
        {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
        Create account
      </Button>

      <p className="text-pretty text-center text-xs leading-relaxed text-muted-foreground">
        By creating an account you agree to our Terms of Service and Privacy
        Policy.
      </p>
    </form>
  );
}
