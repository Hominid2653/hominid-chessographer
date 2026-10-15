import { useEffect, useRef, useState } from 'react'

import { useEditMode, useSite } from '@/app/media-hooks'
import { Container } from '@/components/layout/container'
import { EditableImage } from '@/components/media/editable-image'
import { SectionLabel } from '@/components/type/section-label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import type { WorkItem } from '@/content/types'

function countLabel(count: number) {
  return `${count} ${count === 1 ? 'photograph' : 'photographs'}`
}

export function PortfolioFolders() {
  const { work } = useSite()
  const editing = Boolean(useEditMode())
  const [open, setOpen] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const themes = work.filters.filter((item) => item !== 'All')
  const folders = themes
    .map((theme) => ({
      theme,
      items: work.items.filter((item) => item.category === theme),
    }))
    .filter((folder) => editing || folder.items.length > 0)
  const current = folders.find((folder) => folder.theme === open)

  useEffect(() => {
    if (!open) return
    sectionRef.current?.scrollIntoView({ block: 'start' })
  }, [open])

  return (
    <section ref={sectionRef} className="scroll-mt-20 pt-16 pb-24 md:pt-24 md:pb-36">
      <Container>
        {current ? (
          <FolderGallery
            theme={current.theme}
            items={current.items}
            editing={editing}
            onBack={() => setOpen(null)}
          />
        ) : (
          <>
            <SectionLabel>Folders</SectionLabel>
            <h2 className="mt-4 max-w-xl font-serif text-4xl tracking-[-0.03em] md:text-5xl">
              Choose a theme.
            </h2>
            <ul className="mt-12 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {folders.map((folder) => {
                const cover = folder.items[0]
                return (
                  <li key={folder.theme}>
                    <button
                      type="button"
                      onClick={() => setOpen(folder.theme)}
                      className="group block w-full cursor-pointer text-left"
                    >
                      <div className="relative pt-3">
                        <div className="absolute inset-x-4 top-0 border border-border bg-muted px-3 py-1" />
                        <div className="relative overflow-hidden bg-muted">
                          {cover ? (
                            <img
                              src={cover.image}
                              alt=""
                              style={{ objectPosition: cover.position ?? 'center' }}
                              className="aspect-[4/5] w-full object-cover motion-safe:transition motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="aspect-[4/5] w-full bg-muted" />
                          )}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5 text-white">
                            <p className="font-serif text-3xl tracking-[-0.03em]">{folder.theme}</p>
                            <p className="mt-2 text-[11px] tracking-[0.16em] uppercase">
                              {folder.items.length ? countLabel(folder.items.length) : 'Empty folder'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </Container>
    </section>
  )
}

function FolderGallery({
  theme,
  items,
  editing,
  onBack,
}: {
  theme: string
  items: WorkItem[]
  editing: boolean
  onBack: () => void
}) {
  const [active, setActive] = useState<WorkItem | null>(null)

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="cursor-pointer text-[11px] tracking-[0.16em] uppercase hover:opacity-60"
      >
        All folders
      </button>
      <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">{theme}</h2>
      <p className="mt-4 text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
        {items.length ? countLabel(items.length) : 'Empty folder'}
      </p>
      {items.length ? (
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const image = (
              <EditableImage
                slot={{ kind: 'work', id: item.id }}
                src={item.image}
                alt={item.alt}
                loading="lazy"
                style={{ objectPosition: item.position ?? 'center' }}
                className="aspect-[4/5] w-full object-cover motion-safe:transition motion-safe:duration-700 motion-safe:group-hover/photo:scale-[1.03]"
              />
            )
            return (
              <li key={item.id}>
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
              </li>
            )
          })}
        </ul>
      ) : null}
      <Dialog
        open={active !== null}
        onOpenChange={(next) => {
          if (!next) setActive(null)
        }}
      >
        {active ? (
          <DialogContent variant="viewer">
            <img src={active.image} alt={active.alt} className="max-h-[86svh] w-full object-contain" />
            <DialogTitle className="sr-only">{active.title}</DialogTitle>
            <DialogDescription className="sr-only">{active.category}</DialogDescription>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  )
}
