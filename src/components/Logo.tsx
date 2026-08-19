import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'


export function Logo({
  className,
  href = '/',
}: {
  className?: string
  href?: string
}) {
  return (
    <Link
      to={href}
      className={cn('inline-flex items-center gap-2', className)}
      aria-label="Inkwell home"
    >
      <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Left pillar of 'H' */}
      <path d="M6 4v16" />

      {/* Right pillar of 'H' styled as a blog quill/nib point */}
      <path d="M18 4v10l-3 3" />

      {/* Crossbar connecting into a modern editorial flow */}
      <path d="M6 12h12" />

      {/* Small dot representing community / post indicator */}
      <circle cx="18" cy="20" r="1" fill="currentColor" />
    </svg>
      </span>
      <span className="font-serif text-lg font-semibold tracking-tight">
        Hapblog
      </span>
    </Link>
  )
}
