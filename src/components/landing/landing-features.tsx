import {
  Bell,
  Bookmark,
  Heart,
  MessageCircle,
  PenLine,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Card } from "../ui/card";

const features: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: PenLine,
    title: "A distraction-free editor",
    body: "Write in a clean, focused space designed to keep you in flow. Your words take center stage.",
  },
  {
    icon: Heart,
    title: "Real engagement",
    body: "Likes, thoughtful comments, and threaded replies that turn readers into a community.",
  },
  {
    icon: Bookmark,
    title: "Save for later",
    body: "Bookmark the pieces that matter and build a personal library you can return to anytime.",
  },
  {
    icon: Users,
    title: "Follow great writers",
    body: "Build a feed around the voices you trust. Less noise, more of what you care about.",
  },
  {
    icon: Bell,
    title: "Stay in the loop",
    body: "Get notified when someone likes your work, replies to a comment, or starts following you.",
  },
  {
    icon: MessageCircle,
    title: "Conversations that matter",
    body: "Threaded comments and replies keep discussions organized and worth reading.",
  },
];

export function LandingFeatures() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to write and be read.
          </h2>

          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Inkwell brings together the tools writers actually want, without the
            clutter of everything they don't.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="gap-3 p-6 transition-colors hover:border-accent/40"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <feature.icon className="size-5" />
              </span>

              <h3 className="font-medium">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
