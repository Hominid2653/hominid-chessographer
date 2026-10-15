import { useLocation } from 'react-router'

import { usePreviewNav } from '@/app/media-hooks'
import { SmartLink } from '@/components/layout/smart-link'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

function isCurrent(href: string, pathname: string) {
  return !href.includes('#') && href === pathname
}

export function SiteNav({ className }: { className?: string }) {
  const { pathname } = useLocation()
  const preview = usePreviewNav()
  const currentPath = preview?.path ?? pathname
  const midpoint = Math.ceil(site.nav.length / 2)
  const left = site.nav.slice(0, midpoint)
  const right = site.nav.slice(midpoint)

  return (
    <nav
      aria-label="Primary"
      className={cn('grid grid-cols-[1fr_auto_1fr] items-center gap-3', className)}
    >
      <div className="flex items-center justify-start gap-3 md:gap-8">
        {left.map((link) => (
          <SmartLink
            key={link.href}
            to={link.href}
            current={isCurrent(link.href, currentPath)}
            className={cn(
              'text-[10px] tracking-[0.14em] uppercase transition-opacity hover:opacity-60 md:text-[11px] md:tracking-[0.2em]',
              isCurrent(link.href, currentPath) && 'underline decoration-1 underline-offset-8',
            )}
          >
            {link.label}
          </SmartLink>
        ))}
      </div>
      <SmartLink to="/" className="text-center">
        <span className="block font-serif text-[13px] tracking-[0.22em] uppercase md:text-[15px]">
          {site.shortName}
        </span>
        <span className="mt-1 block text-[8px] tracking-[0.28em] uppercase md:text-[9px] md:tracking-[0.32em]">
          Photography
        </span>
      </SmartLink>
      <div className="flex items-center justify-end gap-3 md:gap-8">
        {right.map((link) => (
          <SmartLink
            key={link.href}
            to={link.href}
            current={isCurrent(link.href, currentPath)}
            className={cn(
              'text-[10px] tracking-[0.14em] uppercase transition-opacity hover:opacity-60 md:text-[11px] md:tracking-[0.2em]',
              isCurrent(link.href, currentPath) && 'underline decoration-1 underline-offset-8',
            )}
          >
            {link.label}
          </SmartLink>
        ))}
      </div>
    </nav>
  )
}
