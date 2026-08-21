import { Link } from "react-router-dom";
import {
  Bell,
  BookOpen,
  Bookmark,
  Compass,
  PenLine,
  Users,
} from "lucide-react";

import { Logo } from "./Logo";

export function SiteFooter() {
  const discoverLinks = [
    {
      label: "Explore",
      href: "/explore",
      icon: Compass,
    },
    {
      label: "Categories",
      href: "/explore",
      icon: BookOpen,
    },
    {
      label: "Following",
      href: "/following",
      icon: Users,
    },
  ];

  const yourHapblogLinks = [
    {
      label: "Write a post",
      href: "/write",
      icon: PenLine,
    },
    {
      label: "Bookmarks",
      href: "/bookmarks",
      icon: Bookmark,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: Bell,
    },
  ];

  return (
    <footer className="border-t border-border bg-background">
      {/* Main footer */}
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.8fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-md space-y-5">
            <Logo />

            <p className="text-sm leading-7 text-muted-foreground">
              Hapblog is a modern space for stories, ideas, and thoughtful
              writing. Discover something worth reading, follow authors you
              enjoy, and share your own stories with the community.
            </p>

            <p className="text-sm font-medium text-foreground">
              Read. Write. Follow. Share.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Discover
            </h3>

            <ul className="space-y-3">
              {discoverLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="size-4 transition-transform group-hover:scale-105" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Your Hapblog */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Your Hapblog
            </h3>

            <ul className="space-y-3">
              {yourHapblogLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="size-4 transition-transform group-hover:scale-105" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p>
            © {new Date().getFullYear()} Hapblog. All rights reserved.
          </p>

          {/* Creator + contact */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Built with</span>

            <span
              className="text-foreground"
              aria-label="love"
            >
              ♥
            </span>

            <span>by</span>

            <a
              href="https://github.com/Dontizy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:underline"
            >
              Dontizy
            </a>

            <span aria-hidden="true">·</span>

            <a
              href="mailto:raphaeldonatus9@gmail.com"
              className="transition-colors hover:text-foreground hover:underline"
            >
              Email
            </a>

            <span aria-hidden="true">·</span>

            <a
              href="https://wa.me/234 7088251391"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground hover:underline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
