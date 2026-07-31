import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import LogoImage from "../public/img/hablog-logo.png";

interface LogoProps {
  className?: string;
  href?: string;
}

export default function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link
      to={href}
      className={cn("inline-flex items-center gap-2", className)}
      aria-label="Hablog home"
    >
   <span className="relative flex size-7 items-center justify-center overflow-hidden rounded-lg bg-primary">
  <img
    src={LogoImage}
    alt="Logo"
    className="w-full h-full scale-150 object-contain"
  />
</span>

      <span className="font-serif text-lg font-semibold tracking-tight">
        Hapblog
      </span>
    </Link>
  );
}
