import { Link } from "react-router-dom";
import { Logo}  from './Logo'

export function SiteFooter() {
  const groups = [
    {
      title: 'Product',
      links: [
        { label: 'Explore', href: '/explore' },
        { label: 'Write', href: '/write' },
        { label: 'Bookmarks', href: '/bookmarks' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Cookies', href: '#' },
      ],
    },
  ]

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Writing worth reading. A modern home for stories, essays, and the
            people who write them.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title} className="space-y-3">
            <h3 className="text-sm font-medium">{group.title}</h3>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Hapblog. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
