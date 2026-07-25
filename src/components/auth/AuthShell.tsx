import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo";
import { ThemeToggle } from "../theme-toggle";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}


export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 space-y-2 text-center">
            <h1 className="text-balance font-serif text-2xl font-semibold tracking-tight">
              {title}
            </h1>

            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {children}

          {footer && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {footer}
            </p>
          )}
        </div>
      </main>

      <footer className="px-4 py-6 text-center text-xs text-muted-foreground">
        <Link
          to="/"
          className="hover:text-foreground transition-colors"
        >
          Back to home
        </Link>
      </footer>
    </div>
  );
}
