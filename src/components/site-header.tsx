import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  Bell,
  Bookmark,
  LogOut,
  Menu,
  PenLine,
  Search,
  Settings,
  Shield,
  User as UserIcon,
  X,
} from "lucide-react";
import Logo from "./Logo";
import { ThemeToggle } from "./theme-toggle";
import { useUserProfile } from "../hooks/user/useUserProfile";
import { useNotification } from "../hooks/user/useActivity";
import { Button, buttonVariants } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "../lib/utils";


const nav = [
  { label: "Home", to: "/feeds" },
  { label: "Explore", to: "/explore" },
  { label: "Bookmarks", to: "/bookmarks" },
];

// Small unread-style count badge, shared by the notification and bookmark icons.
function IconCountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium leading-none text-accent-foreground ring-2 ring-background">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function SiteHeader() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);



  // Single source of truth for auth state — everything below reads from the store,
  // nothing infers "logged in" from whether the profile fetch happened to succeed.
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  // Gated internally on isAuthenticated, so it only fires once there's a token.
  const { data: profileData } = useUserProfile();
  const user = profileData?.user;

  const { data: notificationsData } = useNotification();
  const unreadNotifications = notificationsData?.unReadCount ?? 0;
  const bookmarksCount = user?.bookmarksCount ?? 0;

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMobileNavOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
          
          {/* Mobile menu toggle sits on the left, opening a left-swipe drawer */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="md:hidden"
            onClick={() => setIsMobileNavOpen(true)}
          >
            <Menu className="size-5" />
          </Button>

          <Logo href={isAuthenticated ? "/feeds" : "/"} />

          <nav className="ml-4 hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  location.pathname === item.to && "text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="hidden sm:inline-flex"
            >
              <Search className="size-4" />
            </Button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/write"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "hidden gap-1.5 sm:inline-flex",
                  )}
                >
                  <PenLine className="size-4" />
                  <span className="hidden sm:inline">Write</span>
                </Link>

                <Link
                  to="/bookmarks"
                  aria-label={`Bookmarks${bookmarksCount ? `, ${bookmarksCount}` : ""}`}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "relative",
                  )}
                >
                  <Bookmark className="size-4" />
                  {/* <IconCountBadge count={bookmarksCount} /> */}
                </Link>

                <Link
                  to="/notifications"
                  aria-label={`Notifications${unreadNotifications ? `, ${unreadNotifications} unread` : ""}`}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "relative",
                  )}
                >
                  <Bell className="size-4" />
                  <IconCountBadge count={unreadNotifications} />
                </Link>

                {/* Direct-access profile + logout, large screens only.
                    Same actions remain in the avatar dropdown for md screens. */}
                <Link
                  to="/profile"
                  aria-label="Profile"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "hidden lg:inline-flex",
                  )}
                >
                  <UserIcon className="size-4" />
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Log out"
                  onClick={handleLogout}
                  className="hidden text-muted-foreground hover:text-destructive lg:inline-flex"
                >
                  <LogOut className="size-4" />
                </Button>

                <ThemeToggle />

                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <button
                        type="button"
                        aria-label="Account menu"
                        className="relative ml-1 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        <Link to="/profile">
                          <Avatar>
                            <AvatarImage src={user?.avatar} alt={user?.name} />
                            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                          </Avatar>
                        </Link>
                        <span
                          aria-label="Logged in"
                          className="absolute bottom-0 right-0 size-2.5 rounded-full bg-accent ring-2 ring-background"
                        />
                      </button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                      <span className="font-medium">{user?.name}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        @{user?.name}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <UserIcon className="size-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/bookmarks")}>
                      <Bookmark className="size-4" /> Bookmarks
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                      <Settings className="size-4" /> Settings
                    </DropdownMenuItem>
                    {user?.role === "admin" && (
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        <Shield className="size-4" /> Admin
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="size-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <ThemeToggle />
                <Link
                  to="/login"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "hidden sm:inline-flex",
                  )}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "hidden sm:inline-flex",
                  )}
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Backdrop — rendered as a sibling of <header>, not inside it. backdrop-blur on
          the header creates a containing block that would otherwise trap these
          fixed-position elements inside the header's own box. */}
      {isMobileNavOpen && (
        <div
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 animate-in fade-in duration-200 md:hidden"
        />
      )}

      {/* Left-swipe drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] transform border-r border-border bg-background shadow-xl transition-transform duration-300 ease-out md:hidden",
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <Logo href={isAuthenticated ? "/feed" : "/"} />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close menu"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {isAuthenticated ? (
            <>
              {user && (
                <div className="mb-2 flex items-center gap-3 px-2 py-2">
                  <div className="relative">
                    <Link to="/profile">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <span
                      aria-label="Logged in"
                      className="absolute bottom-0 right-0 size-2.5 rounded-full bg-accent ring-2 ring-background"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      @{user.name}
                    </span>
                  </div>
                </div>
              )}

              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                    location.pathname === item.to &&
                      "bg-secondary text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <div className="my-1 border-t border-border" />

              <Link
                to="/write"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <PenLine className="size-4" /> Write
              </Link>
              <Link
                to="/notifications"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <span className="flex items-center gap-2">
                  <Bell className="size-4" /> Notifications
                </span>
                {unreadNotifications > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-medium text-accent-foreground">
                    {unreadNotifications > 99 ? "99+" : unreadNotifications}
                  </span>
                )}
              </Link>
              <Link
                to="/bookmarks"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <span className="flex items-center gap-2">
                  <Bookmark className="size-4" /> Bookmarks
                </span>
                {bookmarksCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1.5 text-xs font-medium text-foreground">
                    {bookmarksCount > 99 ? "99+" : bookmarksCount}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <UserIcon className="size-4" /> Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Settings className="size-4" /> Settings
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Shield className="size-4" /> Admin
                </Link>
              )}

              <div className="my-1 border-t border-border" />

              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="size-4" /> Log out
              </button>
            </>
          ) : (
            <>
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-1 border-t border-border" />
              <Link
                to="/login"
                onClick={() => setIsMobileNavOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileNavOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Get started
              </Link>

              <div className="my-1 border-t border-border" />
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
