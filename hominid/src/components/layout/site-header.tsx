import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

import { usePreviewNav } from '@/app/media-hooks'
import { SiteNav } from '@/components/layout/site-nav'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const { pathname, hash } = useLocation()
  const preview = usePreviewNav()
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const currentPath = preview?.path ?? pathname

  useLayoutEffect(() => {
    const scroller = headerRef.current?.parentElement?.querySelector<HTMLElement>(
      '[data-site-stage]',
    )
    const onScroll = () => {
      const top = scroller ? scroller.scrollTop : window.scrollY
      const threshold = currentPath === '/' ? 88 : 12
      setScrolled(top > threshold)
    }
    onScroll()
    const target: HTMLElement | Window = scroller ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    return () => target.removeEventListener('scroll', onScroll)
  }, [pathname, hash, preview?.path, currentPath])

  const homeTop = currentPath === '/' && !scrolled

  return (
    <header
      ref={headerRef}
      inert={homeTop}
      aria-hidden={homeTop}
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        homeTop && 'invisible',
        scrolled
          ? 'border-b border-border bg-background/95 text-foreground backdrop-blur-md'
          : 'bg-transparent text-white',
      )}
    >
      <div className="px-5 py-4 md:px-10 md:py-5">
        <SiteNav />
      </div>
    </header>
  )
}
