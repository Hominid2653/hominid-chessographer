import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

import { usePreviewNav } from '@/app/media-hooks'
import { Container } from '@/components/layout/container'
import { SmartLink } from '@/components/layout/smart-link'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

function isCurrent(href: string, pathname: string) {
  return !href.includes('#') && href === pathname
}

export function SiteHeader() {
  const { pathname, hash } = useLocation()
  const preview = usePreviewNav()
  const headerRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const currentPath = preview?.path ?? pathname

  useLayoutEffect(() => {
    const scroller = headerRef.current?.parentElement?.querySelector<HTMLElement>(
      '[data-site-stage]',
    )
    const onScroll = () => {
      const top = scroller ? scroller.scrollTop : window.scrollY
      setScrolled(top > 12)
    }
    onScroll()
    const target: HTMLElement | Window = scroller ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    return () => target.removeEventListener('scroll', onScroll)
  }, [pathname, hash, preview?.path])

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        scrolled
          ? 'border-b border-border bg-background/90 text-foreground backdrop-blur-md'
          : 'border-b border-transparent bg-transparent text-white',
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <SmartLink to="/" className="text-[13px] tracking-[0.24em] uppercase">
          {site.shortName}
        </SmartLink>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {site.nav.map((link) => (
            <SmartLink
              key={link.href}
              to={link.href}
              current={isCurrent(link.href, currentPath)}
              className={cn(
                'text-[11px] tracking-[0.18em] uppercase transition-opacity hover:opacity-60',
                isCurrent(link.href, currentPath) &&
                  'underline decoration-1 underline-offset-8',
              )}
            >
              {link.label}
            </SmartLink>
          ))}
        </nav>
        <button
          type="button"
          className="cursor-pointer text-[11px] tracking-[0.18em] uppercase md:hidden"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </Container>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent variant="fullscreen" hideClose className="px-5 md:px-10">
          <div className="flex h-16 items-center justify-between">
            <DialogTitle className="text-[13px] font-normal tracking-[0.24em] uppercase">
              {site.shortName}
            </DialogTitle>
            <DialogClose className="cursor-pointer text-[11px] tracking-[0.18em] uppercase">
              Close
            </DialogClose>
          </div>
          <nav className="mt-8 flex flex-col" aria-label="Mobile">
            {site.nav.map((link) => (
              <SmartLink
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-5 text-left font-serif text-5xl leading-none tracking-[-0.03em]"
              >
                {link.label}
              </SmartLink>
            ))}
          </nav>
        </DialogContent>
      </Dialog>
    </header>
  )
}
