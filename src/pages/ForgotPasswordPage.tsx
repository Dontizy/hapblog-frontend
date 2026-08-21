import { Link } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";


export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot password?"
      subtitle="Enter your email address and we'll send you a recovery link."
      footer={
        <>
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-medium text-foreground hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
