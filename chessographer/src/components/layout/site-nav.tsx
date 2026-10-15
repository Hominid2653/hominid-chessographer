import { useLocation } from 'react-router'

import { usePreviewNav } from '@/app/media-hooks'
import { SmartLink } from '@/components/layout/smart-link'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

function isCurrent(href: string, pathname: string) {
  if (href.includes('#')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Wordmark() {
  return (
    <SmartLink to="/" className="mx-auto block px-1 text-center leading-none md:px-2">
      <span className="block font-serif text-[1.2rem] tracking-[0.06em] whitespace-nowrap uppercase md:text-[1.4rem] md:tracking-[0.08em] lg:text-[1.7rem] lg:tracking-[0.1em]">
        {site.shortName}
      </span>
      <span className="mt-1 block text-[9px] tracking-[0.22em] whitespace-nowrap uppercase opacity-60 md:mt-1.5 md:text-[11px] md:tracking-[0.28em]">
        Photography
      </span>
    </SmartLink>
  )
}

function NavLink({
  href,
  label,
  currentPath,
  className,
}: {
  href: string
  label: string
  currentPath: string
  className?: string
}) {
  const current = isCurrent(href, currentPath)
  return (
    <SmartLink
      to={href}
      current={current}
      className={cn(
        'whitespace-nowrap uppercase transition-opacity hover:opacity-60',
        current && 'underline decoration-1 underline-offset-8',
        className,
      )}
    >
      {label}
    </SmartLink>
  )
}

export function SiteNav({ className }: { className?: string }) {
  const { pathname } = useLocation()
  const preview = usePreviewNav()
  const currentPath = preview?.path ?? pathname
  const left = site.nav.slice(0, 2)
  const right = site.nav.slice(2)

  return (
    <nav aria-label="Primary" className={className}>
      <div className="md:hidden">
        <Wordmark />
        <div className="mt-3 flex items-center justify-between gap-2">
          {site.nav.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              currentPath={currentPath}
              className="text-[10px] tracking-[0.04em]"
            />
          ))}
        </div>
      </div>
      <div className="hidden items-center gap-3 md:grid md:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <div className="flex items-center justify-start gap-3 lg:gap-8">
          {left.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              currentPath={currentPath}
              className="text-[12px] tracking-[0.1em] lg:text-[13px] lg:tracking-[0.16em]"
            />
          ))}
        </div>
        <Wordmark />
        <div className="flex items-center justify-end gap-3 lg:gap-8">
          {right.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              currentPath={currentPath}
              className="text-[12px] tracking-[0.1em] lg:text-[13px] lg:tracking-[0.16em]"
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
