import { Link } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Set new password"
      subtitle="Please enter your new password below."
      footer={
        <>
          Remembered your password?{" "}
          <Link
            to="/login"
            className="font-medium text-foreground hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <ResetPasswordForm />
    </AuthShell>
  );
}
