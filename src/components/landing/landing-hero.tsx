import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  PenLine,
  Sparkles,
} from "lucide-react";

import { buttonVariants } from "../ui/button-variants";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background glow - static */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.06),transparent_60%)]" />

      <div className="mx-auto max-w-6xl px-3 py-10 pt-6 sm:px-6 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-4 sm:mb-6">
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full px-2.5 py-1 text-xs font-normal sm:px-3 sm:text-sm"
            >
              <Sparkles className="size-3 text-accent sm:size-3.5" />
              Now open to all writers
            </Badge>
          </div>

          {/* Category eyebrow */}
          <div className="mb-3 flex flex-wrap items-center justify-center gap-1.5 font-serif text-sm font-medium text-accent sm:mb-4 sm:gap-2 sm:text-lg lg:text-xl">
            <span>Stories on</span>

            <span className="inline-block min-w-[8ch] text-left">
              Technology
            </span>
          </div>

          {/* Hero title */}
          <h1 className="text-balance font-serif text-2xl font-semibold leading-tight tracking-tight sm:text-5xl sm:leading-[1.08] lg:text-6xl lg:leading-[1.05]">
            Writing worth reading,
            <br className="hidden md:block" />{" "}
            <span className="bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
              from people worth following.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-md text-pretty text-xs leading-relaxed text-muted-foreground sm:mt-6 sm:max-w-xl sm:text-lg">
            Hapblog is a calm, modern home for stories and ideas.
            Discover great writing, follow your favorite authors,
            and publish work you are proud of.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:mt-9 sm:flex-row sm:gap-3">
            <div className="w-full sm:w-auto">
              <Link
                to="/register"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-10 w-full gap-2 px-4 text-xs sm:h-11 sm:w-auto sm:px-5 sm:text-sm",
                )}
              >
                Start writing
                <ArrowRight className="size-3.5 sm:size-4" />
              </Link>
            </div>

            <div className="w-full sm:w-auto">
              <Link
                to="/feeds"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "h-10 w-full gap-2 px-4 text-xs sm:h-11 sm:w-auto sm:px-5 sm:text-sm",
                )}
              >
                <BookOpen className="size-3.5 sm:size-4" />
                Explore stories
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground sm:mt-5 sm:gap-2 sm:text-sm">
            <PenLine className="size-3.5 sm:size-4" />
            Join 50,000+ writers and readers
          </p>
        </div>
      </div>
    </section>
  );
}