import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Logo } from "../Logo";
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
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <ThemeToggle />
      </header>

      {/* Auth content */}
      <main className="flex flex-1 flex-col px-4 pb-8 pt-10 sm:items-center sm:justify-center sm:py-10">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="mb-8 space-y-2 text-center">
            <h1 className="text-balance font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>

            <p className="mx-auto max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {subtitle}
            </p>
          </div>

          {/* Form */}
          {children}

          {/* Secondary action */}
          {footer && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {footer}
            </p>
          )}

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}