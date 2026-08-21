import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  Bell,
  Bookmark,
  LogOut,
  PenLine,
  Search,
  Settings,
  FilePen,
  Shield,
  User as UserIcon,
} from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./theme-toggle";
import { useUserProfile } from "../hooks/user/useUserProfile";
import { useNotification } from "../hooks/user/useActivity";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button-variants";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { cn } from "../lib/utils";

const NAV_ITEMS = [
  { label: "Home", to: "/feeds" },
  { label: "Explore", to: "/explore" },
];

function IconBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-none text-accent-foreground ring-2 ring-background">
      {count > 99 ? "99+" : count}
    </span>
  );
}

interface NavIconLinkProps {
  to: string;
  label: string;
  icon: typeof Bell;
  badgeCount?: number;
  hiddenOnMobile?: boolean;
  mobileOnly?: boolean;
}

// Reusable icon-button link — collapses the repeated buttonVariants/cn
// pattern that every header icon (Bell, Profile, Settings, Admin...) shared.
function NavIconLink({
  to,
  label,
  icon: Icon,
  badgeCount,
  hiddenOnMobile,
  mobileOnly,
}: NavIconLinkProps) {
  return (
    <Link
      to={to}
      aria-label={
        badgeCount !== undefined ? `${label} (${badgeCount} unread)` : label
      }
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "relative h-8 w-8 sm:h-9 sm:w-9",
        hiddenOnMobile && "hidden sm:inline-flex",
        mobileOnly && "sm:hidden",
      )}
    >
      <Icon className="size-4" />
      {badgeCount !== undefined && <IconBadge count={badgeCount} />}
    </Link>
  );
}

export function SiteHeader() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const { data: profileData } = useUserProfile();
  const user = profileData?.user;
  const isAdmin = user?.role === "admin";

  const { data: notificationsData } = useNotification();
  const unreadNotifications = notificationsData?.unReadCount ?? 0;

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2 sm:px-6 lg:px-8">
        {/* Left Section: Logo & Desktop Links */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-6 md:gap-8">
          <div className="flex shrink-0 items-center tracking-tight transition-transform duration-200 hover:scale-[1.02] active:scale-95">
            <Logo href={isAuthenticated ? "/feeds" : "/"} />
          </div>

          <nav className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  location.pathname === item.to &&
                    "font-semibold text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Actions, Icons & Profile Menu */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Explore, as a search icon, on small screens only — the text
              nav link above is hidden below sm with nothing replacing it */}
          <NavIconLink
            to="/explore"
            label="Explore"
            icon={Search}
            mobileOnly
          />

          {isAuthenticated ? (
            <>
              <Link
                to="/write"
                aria-label="Write"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "flex h-8 gap-1.5 px-2 shadow-sm sm:h-9 sm:px-3",
                )}
              >
                <PenLine className="size-4" />
                <span className="hidden sm:inline">Write</span>
              </Link>

              <NavIconLink
                to="/notifications"
                label="Notifications"
                icon={Bell}
                badgeCount={unreadNotifications}
              />

              <NavIconLink
                to="/profile/settings"
                label="Settings"
                icon={Settings}
                hiddenOnMobile
              />

              {isAdmin && (
                <NavIconLink
                  to="/admin/page"
                  label="Admin"
                  icon={Shield}
                  hiddenOnMobile
                />
              )}

              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative ml-0.5 size-8 rounded-full focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label="Account menu"
                      type="button"
                    />
                  }
                >
                  <Avatar className="size-8 transition-transform duration-200 hover:scale-105">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>

                  <span
                    aria-label="Online status"
                    className="absolute bottom-0 right-0 size-2.5 rounded-full bg-accent ring-2 ring-background"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="flex flex-col">
                      <span className="truncate font-medium">
                        {user?.name}
                      </span>
                      <span className="truncate text-xs font-normal text-muted-foreground">
                        @{user?.username}
                      </span>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigation("/profile")}>
                    <UserIcon className="mr-2 size-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleNavigation("/bookmarks")}
                  >
                    <Bookmark className="mr-2 size-4" /> Bookmarks
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleNavigation("/profile/settings")}
                  >
                    <Settings className="mr-2 size-4" /> Settings
                  </DropdownMenuItem>
                   <DropdownMenuItem
                    onClick={() => handleNavigation("/user/drafts")}
                  >
                    <FilePen className="mr-2 size-4" /> Draft
                  </DropdownMenuItem>

                  {isAdmin && (
                    <DropdownMenuItem onClick={() => handleNavigation("/admin/page")}>
                      <Shield className="mr-2 size-4" /> Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 size-4" /> Log out
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
                  "px-2 text-xs sm:px-3 sm:text-sm",
                )}
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "px-2.5 text-xs sm:px-3 sm:text-sm",
                )}
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
