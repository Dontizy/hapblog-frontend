import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
}

export default function Logo({
  className,
  href = "/",
}: LogoProps) {
  return (
    <Link
      to={href}
      className={cn("inline-flex items-center gap-2", className)}
      aria-label="Inkwell home"
    >
      <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      </span>

      <span className="font-serif text-lg font-semibold tracking-tight">
        Hapblog
      </span>
    </Link>
  );
}
