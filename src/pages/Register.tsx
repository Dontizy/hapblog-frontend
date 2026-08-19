import { Link } from "react-router-dom";

import  AuthShell  from "../components/auth/AuthShell";
import { RegisterForm } from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Hapblog to share your ideas and follow writers you love."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-foreground hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
