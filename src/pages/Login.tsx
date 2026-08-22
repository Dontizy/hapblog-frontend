import { Link } from "react-router-dom";

import AuthShell from "../components/auth/AuthShell";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue reading and writing on Hapblog."
      footer={
        <>
          New to Hapblog?{" "}
          <Link
            to="/register"
            className="font-medium text-foreground transition-colors hover:text-accent hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}