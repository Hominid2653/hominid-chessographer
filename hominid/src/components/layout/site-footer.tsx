import { Link } from 'react-router'

import { usePreviewNav } from '@/app/media-hooks'
import { Container } from '@/components/layout/container'
import { SmartLink } from '@/components/layout/smart-link'
import { site } from '@/content/site'

const year = new Date().getFullYear()

export function SiteFooter() {
  const preview = usePreviewNav()

  return (
    <footer className="bg-foreground text-background">
      <Container className="flex flex-col gap-8 border-t border-background/15 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <SmartLink to="/" className="text-[13px] tracking-[0.22em] uppercase">
            {site.name}
          </SmartLink>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-background/65">
            {site.description}
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {site.nav.map((link) => (
            <SmartLink
              key={link.href}
              to={link.href}
              className="text-[11px] tracking-[0.16em] uppercase text-background/70 transition-opacity hover:opacity-60"
            >
              {link.label}
            </SmartLink>
          ))}
          {preview ? null : (
            <Link
              to="/admin"
              className="text-[11px] tracking-[0.16em] uppercase text-background/70 transition-opacity hover:opacity-60"
            >
              Admin
            </Link>
          )}
        </nav>
        <p className="text-[11px] tracking-[0.16em] text-background/45 uppercase">
          © {year} {site.name}
        </p>
      </Container>
    </footer>
  )
}
