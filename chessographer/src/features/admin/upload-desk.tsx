import { GripVertical, Trash2 } from 'lucide-react'
import { useRef, useState, type ReactNode } from 'react'

import { useMedia, useSite } from '@/app/media-hooks'
import { moveItem, themeNames, type ImageSlot, type MediaDocument, type MediaWork } from '@/content/media'
import { cn } from '@/lib/utils'

function titleFromFile(name: string) {
  const bare = name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim()
  return bare || 'Untitled'
}

function TextCommit({
  value,
  onCommit,
  ariaLabel,
  className,
}: {
  value: string
  onCommit: (value: string) => void
  ariaLabel: string
  className?: string
}) {
  const [text, setText] = useState(value)
  const [source, setSource] = useState(value)
  if (value !== source) {
    setSource(value)
    setText(value)
  }

  return (
    <input
      aria-label={ariaLabel}
      value={text}
      onChange={(event) => setText(event.target.value)}
      onBlur={() => {
        const next = text.trim()
        if (next && next !== value) onCommit(next)
        else setText(value)
      }}
      className={cn(
        'w-full border border-border bg-background px-2 py-1.5 text-sm outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-foreground',
        className,
      )}
    />
  )
}

function DropZone({
  label,
  busy,
  onFiles,
}: {
  label: string
  busy: boolean
  onFiles: (files: File[]) => void
}) {
  const [over, setOver] = useState(false)
  const input = useRef<HTMLInputElement>(null)

  function take(list: FileList | File[] | null) {
    const files = [...(list ?? [])].filter((file) => file.type.startsWith('image/'))
    if (files.length) onFiles(files)
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(event) => {
        event.preventDefault()
        setOver(false)
        take(event.dataTransfer.files)
      }}
      className={cn(
        'flex flex-col items-center justify-center gap-3 border border-dashed px-4 py-8 text-center',
        over ? 'border-foreground bg-muted' : 'border-border',
      )}
    >
      <p className="text-sm text-muted-foreground">{busy ? 'Uploading…' : label}</p>
      <button
        type="button"
        className="cursor-pointer text-[11px] tracking-[0.16em] uppercase underline underline-offset-4"
        onClick={() => input.current?.click()}
      >
        Browse
      </button>
      <input
        ref={input}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(event) => {
          take(event.target.files)
          event.target.value = ''
        }}
      />
    </div>
  )
}

function Thumb({
  image,
  label,
  index,
  onOpen,
  onRemove,
  onDragStart,
  onDrop,
  children,
}: {
  image: string
  label: string
  index: number
  onOpen: () => void
  onRemove: () => void
  onDragStart: () => void
  onDrop: () => void
  children?: ReactNode
}) {
  return (
    <li
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault()
        if ([...event.dataTransfer.types].includes('Files')) return
        onDrop()
      }}
      className="border border-border bg-background"
    >
      <button type="button" onClick={onOpen} className="block w-full cursor-pointer">
        <img src={image} alt={label} className="aspect-square w-full object-cover" />
      </button>
      <div className="flex items-center justify-between gap-2 px-2 py-1.5">
        <button
          type="button"
          draggable
          aria-label={`Drag ${label}`}
          onDragStart={onDragStart}
          className="inline-flex cursor-grab items-center gap-1 text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
        >
          <GripVertical className="size-3.5" />
          {index + 1}
        </button>
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          className="cursor-pointer p-1 text-muted-foreground hover:text-foreground"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
      {children ? <div className="space-y-2 px-2 pb-2">{children}</div> : null}
    </li>
  )
}

export function UploadDesk({
  onOpen,
}: {
  onOpen: (slot: ImageSlot) => void
}) {
  const { media, commit, upload } = useMedia()
  const filters = useSite().work.filters.filter((item) => item !== 'All')
  const dragIndex = useRef<number | null>(null)
  const dragAlbum = useRef<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [themeName, setThemeName] = useState('')
  const themes = filters

  async function store(files: File[]) {
    setBusy(true)
    setError('')
    try {
      const uploaded: { url: string; name: string }[] = []
      for (const file of files) {
        uploaded.push({ url: await upload(file), name: file.name })
      }
      return uploaded
    } catch {
      setError('Upload failed. Keep the dev server running, and use an image under 20MB.')
      return []
    } finally {
      setBusy(false)
    }
  }

  async function addPortfolio(files: File[], category: string) {
    const uploaded = await store(files)
    if (!uploaded.length) return
    await commit((draft) => {
      for (const file of uploaded) {
        const title = titleFromFile(file.name)
        draft.portfolio.push({
          id: crypto.randomUUID(),
          title,
          category,
          image: file.url,
          alt: title,
        })
      }
    })
  }

  function rememberThemes(draft: MediaDocument, next: string[]) {
    draft.themes = next
  }

  async function addAlbum(tournamentId: string, files: File[]) {
    const uploaded = await store(files)
    if (!uploaded.length) return
    await commit((draft) => {
      const tournament = draft.tournaments?.find((item) => item.id === tournamentId)
      if (!tournament) return
      for (const file of uploaded) {
        const title = titleFromFile(file.name)
        tournament.photos.push({
          id: crypto.randomUUID(),
          image: file.url,
          alt: title,
        })
      }
    })
  }

  return (
    <div className="space-y-10 p-4 md:p-5">
      <section>
        <div className="mb-4">
          <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Library</p>
          <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em]">Portfolio</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Each theme is a folder on the portfolio page. Drop photographs into a folder, then drag
            to rearrange. The first image is the cover.
          </p>
        </div>
        <form
          className="mb-8 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            const name = themeName.trim()
            if (!name || themes.some((item) => item.toLowerCase() === name.toLowerCase())) {
              setThemeName('')
              return
            }
            void commit((draft) => {
              rememberThemes(draft, [...themeNames(themes, draft), name])
            })
            setThemeName('')
          }}
        >
          <input
            aria-label="New folder name"
            value={themeName}
            onChange={(event) => setThemeName(event.target.value)}
            placeholder="New theme"
            className="min-w-0 flex-1 border border-border bg-background px-2 py-1.5 text-sm outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          />
          <button
            type="submit"
            className="cursor-pointer px-3 text-[11px] tracking-[0.16em] uppercase underline underline-offset-4"
          >
            Add folder
          </button>
        </form>
        <div className="space-y-10">
          {themes.map((theme) => {
            const items = media.portfolio.filter((item) => item.category === theme)
            return (
              <section key={theme}>
                <div className="mb-3 flex items-end justify-between gap-3">
                  <h3 className="font-serif text-2xl tracking-[-0.03em]">{theme}</h3>
                  {items.length === 0 ? (
                    <button
                      type="button"
                      className="cursor-pointer text-[11px] tracking-[0.14em] text-muted-foreground uppercase"
                      onClick={() => {
                        void commit((draft) => {
                          rememberThemes(
                            draft,
                            themeNames(themes, draft).filter((item) => item !== theme),
                          )
                        })
                      }}
                    >
                      Remove folder
                    </button>
                  ) : (
                    <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                      {items.length} {items.length === 1 ? 'photograph' : 'photographs'}
                    </p>
                  )}
                </div>
                <DropZone
                  label={`Drop photographs into ${theme}`}
                  busy={busy}
                  onFiles={(files) => addPortfolio(files, theme)}
                />
                <ul className="mt-4 grid grid-cols-2 gap-3">
                  {items.map((item, index) => (
                    <WorkThumb
                      key={item.id}
                      item={item}
                      index={index}
                      filters={themes}
                      onOpen={() => onOpen({ kind: 'work', id: item.id })}
                      onDragStart={() => {
                        dragAlbum.current = theme
                        dragIndex.current = index
                      }}
                      onDrop={() => {
                        if (dragAlbum.current !== theme || dragIndex.current === null) return
                        const from = dragIndex.current
                        dragIndex.current = null
                        void commit((draft) => {
                          const indexes = draft.portfolio.flatMap((photo, photoIndex) =>
                            photo.category === theme ? [photoIndex] : [],
                          )
                          const fromIndex = indexes[from]
                          const toIndex = indexes[index]
                          if (fromIndex === undefined || toIndex === undefined) return
                          draft.portfolio = moveItem(draft.portfolio, fromIndex, toIndex)
                        })
                      }}
                      onRemove={() => {
                        void commit((draft) => {
                          draft.portfolio = draft.portfolio.filter((photo) => photo.id !== item.id)
                        })
                      }}
                      onTitle={(title) => {
                        void commit((draft) => {
                          const photo = draft.portfolio.find((entry) => entry.id === item.id)
                          if (!photo) return
                          photo.title = title
                          photo.alt = title
                        })
                      }}
                      onCategory={(category) => {
                        void commit((draft) => {
                          const photo = draft.portfolio.find((entry) => entry.id === item.id)
                          if (photo) photo.category = category
                        })
                      }}
                    />
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </section>
      {media.tournaments?.map((tournament) => (
        <section key={tournament.id}>
          <div className="mb-4">
            <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              {tournament.date}
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em]">{tournament.title}</h2>
          </div>
          <label className="mb-4 block text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            Google Photos link
            <TextCommit
              ariaLabel={`${tournament.title} Google Photos link`}
              value={tournament.albumUrl}
              onCommit={(albumUrl) => {
                void commit((draft) => {
                  const event = draft.tournaments?.find((item) => item.id === tournament.id)
                  if (event) event.albumUrl = albumUrl
                })
              }}
              className="mt-2 text-[13px] tracking-normal normal-case"
            />
          </label>
          <DropZone
            label={`Drop photographs for ${tournament.title}`}
            busy={busy}
            onFiles={(files) => addAlbum(tournament.id, files)}
          />
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {tournament.photos.map((photo, index) => (
              <Thumb
                key={photo.id}
                image={photo.image}
                label={photo.alt}
                index={index}
                onOpen={() =>
                  onOpen({
                    kind: 'tournament-photo',
                    tournamentId: tournament.id,
                    photoId: photo.id,
                  })
                }
                onDragStart={() => {
                  dragAlbum.current = tournament.id
                  dragIndex.current = index
                }}
                onDrop={() => {
                  if (dragAlbum.current !== tournament.id || dragIndex.current === null) return
                  const from = dragIndex.current
                  dragIndex.current = null
                  void commit((draft) => {
                    const event = draft.tournaments?.find((item) => item.id === tournament.id)
                    if (event) event.photos = moveItem(event.photos, from, index)
                  })
                }}
                onRemove={() => {
                  void commit((draft) => {
                    const event = draft.tournaments?.find((item) => item.id === tournament.id)
                    if (event) event.photos = event.photos.filter((item) => item.id !== photo.id)
                  })
                }}
              />
            ))}
          </ul>
        </section>
      ))}
      {error ? <p className="text-sm text-muted-foreground">{error}</p> : null}
    </div>
  )
}

function WorkThumb({
  item,
  index,
  filters,
  onOpen,
  onDragStart,
  onDrop,
  onRemove,
  onTitle,
  onCategory,
}: {
  item: MediaWork
  index: number
  filters: string[]
  onOpen: () => void
  onDragStart: () => void
  onDrop: () => void
  onRemove: () => void
  onTitle: (title: string) => void
  onCategory: (category: string) => void
}) {
  return (
    <Thumb
      image={item.image}
      label={item.title}
      index={index}
      onOpen={onOpen}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onRemove={onRemove}
    >
      <TextCommit ariaLabel={`${item.title} title`} value={item.title} onCommit={onTitle} />
      <select
        aria-label={`${item.title} category`}
        value={item.category}
        onChange={(event) => onCategory(event.target.value)}
        className="w-full border border-border bg-background px-2 py-1.5 text-[11px] tracking-[0.14em] uppercase outline-none"
      >
        {filters.map((filter) => (
          <option key={filter}>{filter}</option>
        ))}
      </select>
    </Thumb>
  )
}
