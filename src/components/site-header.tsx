import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  // Bell,
  // Bookmark,
  // LogOut,
  // PenLine,
  Search,
  // Settings,
  // Shield,
 // User as UserIcon,
} from 'lucide-react'
// import  Logo  from './Logo'
import { ThemeToggle } from './theme-toggle'
import { Button,
  // buttonVariants
} from './ui/button'
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from './ui/avatar'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu'
//import { useAuth } from './auth-provider'
// import { notifications } from '../lib/mock-data'
import { cn } from '../lib/utils'

export function SiteHeader() {
  // const { user, logout } = useAuth()
  const location = useNavigate()
  // const unread = notifications.filter((n) => !n.read).length

  const nav = [
    { label: 'Home', to: '/feeds' },
    { label: 'Explore', to: '/explore' },
    { label: 'Bookmarks', to: '/bookmarks' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        {/* <Logo href={user ? '/feed' : '/'} /> */}

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground',
                location.name === item.to && 'text-foreground',
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
          <ThemeToggle />
          {/* {user ? (
            <>
              <Link
                to="/write"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'gap-1.5',
                )}
              >
                <PenLine className="size-4" />
                <span className="hidden sm:inline">Write</span>
              </Link>

              <Link
                to="/notifications"
                aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  'relative',
                )}
              >
                <Bell className="size-4" />
                {unread > 0 && (
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent ring-2 ring-background" />
                )}
              </Link>

              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      aria-label="Account menu"
                      className="ml-1 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    </button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      @{user.username}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => location('/profile')}>
                    <UserIcon className="size-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => location('/bookmarks')}>
                    <Bookmark className="size-4" /> Bookmarks
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => location('/settings')}>
                    <Settings className="size-4" /> Settings
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem onClick={() => location('/admin')}>
                      <Shield className="size-4" /> Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => {
                      logout()
                      location('/')
                    }}
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
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                Sign in
              </Link>
              <Link to="/register" className={buttonVariants({ size: 'sm' })}>
                Get started
              </Link>
            </>
          )} */}
        </div>
      </div>
    </header>
  )
}
