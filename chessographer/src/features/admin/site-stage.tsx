import { useCallback, useEffect, useRef, type ReactNode } from 'react'

import { EditModeProvider, PreviewNavProvider } from '@/app/media-context'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import type { ImageSlot } from '@/content/media'
import { HomePage } from '@/features/home/home-page'
import { PortfolioPage } from '@/features/portfolio/portfolio-page'
import { cn } from '@/lib/utils'

export type StagePage = 'home' | 'portfolio' | 'tournaments'

export function SiteStage({
  page,
  onPage,
  tournamentsPage,
  onSelect,
}: {
  page: StagePage
  onPage: (page: StagePage) => void
  tournamentsPage?: ReactNode
  onSelect: (slot: ImageSlot) => void
}) {
  const scroller = useRef<HTMLDivElement>(null)

  const go = useCallback(
    (href: string) => {
      if (href.startsWith('/#')) {
        const id = href.slice(2)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (href === '/portfolio') onPage('portfolio')
      else if (href === '/tournaments') onPage('tournaments')
      else onPage('home')
      scroller.current?.scrollTo({ top: 0 })
    },
    [onPage],
  )

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
  }, [page])

  const tabs: { id: StagePage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    ...(tournamentsPage ? [{ id: 'tournaments' as const, label: 'Tournaments' }] : []),
  ]
  const path = page === 'home' ? '/' : `/${page}`

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#d7d4cf]">
      <div className="flex items-center justify-between gap-4 border-b border-black/10 px-4 py-3">
        <p className="text-[11px] tracking-[0.18em] uppercase">Website</p>
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={page === tab.id}
              onClick={() => onPage(tab.id)}
              className={cn(
                'cursor-pointer text-[11px] tracking-[0.16em] uppercase',
                page === tab.id ? 'underline underline-offset-4' : 'opacity-50',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <p className="px-4 py-2 text-[11px] tracking-[0.14em] text-black/55 uppercase">
        Hover a photograph and choose Replace
      </p>
      <div className="relative min-h-0 flex-1 overflow-hidden [transform:translateZ(0)]">
        <PreviewNavProvider path={path} go={go}>
          <EditModeProvider onSelect={onSelect}>
            <div ref={scroller} data-site-stage className="h-full overflow-auto bg-background">
              {page === 'home' ? <HomePage /> : null}
              {page === 'portfolio' ? <PortfolioPage /> : null}
              {page === 'tournaments' ? tournamentsPage : null}
              <SiteFooter />
            </div>
            <SiteHeader />
          </EditModeProvider>
        </PreviewNavProvider>
      </div>
    </div>
  )
}
