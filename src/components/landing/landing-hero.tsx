import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  PenLine,
  Sparkles,
} from "lucide-react";

import { buttonVariants } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-6 gap-1.5 rounded-full px-3 py-1 font-normal"
          >
            <Sparkles className="size-3.5 text-accent" />
            Now open to all writers
          </Badge>

          <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Writing worth reading,
            <br className="hidden sm:block" /> from people worth following.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Inkwell is a calm, modern home for stories and ideas. Discover great
            writing, follow your favorite authors, and publish work you are
            proud of.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 gap-1.5 px-5 text-sm"
              )}
            >
              Start writing
              <ArrowRight className="size-4" />
            </Link>

            <Link
              to="/feeds"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "h-11 gap-1.5 px-5 text-sm"
              )}
            >
              <BookOpen className="size-4" />
              Explore stories
            </Link>
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <PenLine className="size-4" />
            Join 50,000+ writers and readers
          </p>
        </div>
      </div>
    </section>
  );
}
