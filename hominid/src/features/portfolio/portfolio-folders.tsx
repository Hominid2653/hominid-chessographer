import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useEditMode, usePreviewNav, useSite } from '@/app/media-hooks'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
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

function themeSlug(theme: string) {
  return theme
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function partsFromPath(path: string | undefined) {
  const parts = path?.split('/').filter(Boolean) ?? []
  if (parts[0] !== 'portfolio') return { slug: null, photo: null }
  return { slug: parts[1] ?? null, photo: parts[2] ?? null }
}

export function PortfolioFolders() {
  const { work } = useSite()
  const editing = Boolean(useEditMode())
  const preview = usePreviewNav()
  const navigate = useNavigate()
  const params = useParams()
  const sectionRef = useRef<HTMLElement>(null)
  const route = preview ? partsFromPath(preview.path) : { slug: params.theme ?? null, photo: params.photo ?? null }
  const themes = work.filters.filter((item) => item !== 'All')
  const folders = themes
    .map((theme) => ({
      theme,
      items: work.items.filter((item) => item.category === theme),
    }))
    .filter((folder) => editing || folder.items.length > 0)
  const current = folders.find((folder) => themeSlug(folder.theme) === route.slug)

  function go(href: string, replace = false) {
    if (preview) preview.go(href)
    else navigate(href, { replace })
  }

  useEffect(() => {
    if (!route.slug) return
    sectionRef.current?.scrollIntoView({ block: 'start' })
  }, [route.slug])

  return (
    <section ref={sectionRef} className="scroll-mt-20 pt-16 pb-24 md:pt-24 md:pb-36">
      <Container>
        {current ? (
          <FolderGallery
            theme={current.theme}
            items={current.items}
            editing={editing}
            onOpen={(id) => go(`/portfolio/${themeSlug(current.theme)}/${id}`)}
            onClose={() => {
              if (!route.photo) return
              go(`/portfolio/${themeSlug(current.theme)}`, true)
            }}
            activeId={route.photo}
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
                      onClick={() => go(`/portfolio/${themeSlug(folder.theme)}`)}
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
  onOpen,
  onClose,
  activeId,
}: {
  theme: string
  items: WorkItem[]
  editing: boolean
  onOpen: (id: string) => void
  onClose: () => void
  activeId: string | null
}) {
  const active = items.find((item) => item.id === activeId) ?? null

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Portfolio', to: '/portfolio', replace: true },
          { label: theme },
        ]}
      />
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
                      onClick={() => onOpen(item.id)}
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
          if (!next) onClose()
        }}
      >
        {active ? (
          <DialogContent variant="viewer">
            <Breadcrumbs
              tone="light"
              className="mb-4"
              items={[
                { label: 'Portfolio', to: '/portfolio', replace: true },
                { label: theme, to: `/portfolio/${themeSlug(theme)}`, replace: true },
                { label: active.title },
              ]}
            />
            <img src={active.image} alt={active.alt} className="max-h-[86svh] w-full object-contain" />
            <DialogTitle className="sr-only">{active.title}</DialogTitle>
            <DialogDescription className="sr-only">{active.category}</DialogDescription>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  )
}
