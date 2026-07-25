import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "../ui/button";
import { cn } from "../../lib/utils";

export function LandingCta() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-2xl border border-border bg-card px-6 py-14 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Your first story is one click away.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Create a free account and publish to a community that actually
            reads. No algorithms shouting over you.
          </p>

          <Link
            to="/register"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-11 gap-1.5 px-5 text-sm"
            )}
          >
            Create your account
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
