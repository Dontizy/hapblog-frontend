import { Link} from "react-router-dom";
import  AuthShell  from "../components/auth/AuthShell";
import  LoginForm  from "../components/auth/LoginForm";


export default function LoginPage() {

//   <Button disabled={isPending}>
//   {isPending ? <Spinner /> : "Publish"}
// </Button>

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue reading and writing on Hapblog."
      footer={
        <>
          New to Hapblog?{" "}
          <Link
            to="/register"
            className="font-medium text-foreground hover:underline"
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
