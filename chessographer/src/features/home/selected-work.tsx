import { useState } from 'react'

import { useEditMode, useSite } from '@/app/media-hooks'
import { Container } from '@/components/layout/container'
import { EditableImage } from '@/components/media/editable-image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { SectionLabel } from '@/components/type/section-label'
import type { WorkItem } from '@/content/types'
import { cn } from '@/lib/utils'

export function SelectedWork({ showHeading = true }: { showHeading?: boolean }) {
  const { work } = useSite()
  const editing = Boolean(useEditMode())
  const [filter, setFilter] = useState(work.filters[0] ?? 'All')
  const [active, setActive] = useState<WorkItem | null>(null)
  const items =
    filter === 'All' ? work.items : work.items.filter((item) => item.category === filter)

  return (
    <section id="work" className="scroll-mt-20 pt-16 pb-24 md:pt-24 md:pb-36">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          {showHeading ? (
            <div>
              <SectionLabel>{work.kicker}</SectionLabel>
              <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
                {work.title}
              </h2>
            </div>
          ) : (
            <SectionLabel>{work.kicker}</SectionLabel>
          )}
          <div
            role="group"
            aria-label="Filter work"
            className="-mx-5 flex gap-x-5 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-end sm:overflow-visible sm:px-0"
          >
            {work.filters.map((item) => {
              const selected = item === filter
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(item)}
                  className={cn(
                    'min-h-11 shrink-0 cursor-pointer text-[11px] tracking-[0.16em] uppercase',
                    selected
                      ? 'border-b border-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const lead = index === 0 && (filter === 'All' || items.length === 1)
            const image = (
              <EditableImage
                slot={{ kind: 'work', id: item.id }}
                src={item.image}
                alt={item.alt}
                loading="lazy"
                style={{ objectPosition: item.position ?? 'center' }}
                className={cn(
                  'w-full object-cover motion-safe:transition motion-safe:duration-700 motion-safe:group-hover/photo:scale-[1.03]',
                  lead ? 'aspect-[3/2] md:aspect-[16/9]' : 'aspect-[4/5]',
                )}
              />
            )
            return (
              <li key={item.id} className={cn(lead && 'sm:col-span-2 lg:col-span-3')}>
                <figure>
                  {editing ? (
                    <div className="overflow-hidden bg-muted">{image}</div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActive(item)}
                      className="group block w-full cursor-pointer overflow-hidden bg-muted text-left outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                      aria-label={`View ${item.title}`}
                    >
                      {image}
                    </button>
                  )}
                  <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="font-serif text-2xl tracking-[-0.02em]">{item.title}</span>
                    <span className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                      {item.category}
                    </span>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </Container>
      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
      >
        {active ? (
          <DialogContent variant="viewer">
            <img
              src={active.image}
              alt={active.alt}
              className="max-h-[74svh] w-full object-contain"
            />
            <DialogTitle className="mt-4 text-center font-serif text-3xl font-normal tracking-[-0.03em] text-white">
              {active.title}
            </DialogTitle>
            <DialogDescription className="text-center text-[11px] tracking-[0.16em] text-white/70 uppercase">
              {active.category}
            </DialogDescription>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  )
}
