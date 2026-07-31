import { Link } from "react-router-dom";
import { Home, ArrowLeft, SearchX } from "lucide-react";
import { Button } from "./ui/button";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-12 w-12 text-muted-foreground" />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Error 404
        </p>

        <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
          Sorry, the page you're looking for doesn't exist, has been moved, or
          the link is incorrect.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/">
            <Button className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Go Home</span>
            </Button>
          </Link>
          
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
}
