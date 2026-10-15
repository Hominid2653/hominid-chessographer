import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'

import { useMedia, useSite } from '@/app/media-hooks'
import { assignImage, framesFor, slotKey, type ImageSlot } from '@/content/media'
import { GalleryPreview } from '@/features/admin/gallery-preview'
import { SiteStage, type StagePage } from '@/features/admin/site-stage'
import { UploadDesk } from '@/features/admin/upload-desk'

export function AdminPage({ tournamentsPage }: { tournamentsPage?: ReactNode }) {
  const site = useSite()
  const { media, status, upload, commit } = useMedia()
  const [page, setPage] = useState<StagePage>('home')
  const [selected, setSelected] = useState<ImageSlot | null>(null)
  const frames = selected ? framesFor(media, selected) : []
  const index = selected
    ? Math.max(0, frames.findIndex((frame) => slotKey(frame.slot) === slotKey(selected)))
    : 0

  function onIndex(next: number) {
    const frame = frames[next]
    if (frame) setSelected(frame.slot)
  }

  function onClose() {
    setSelected(null)
  }

  async function replace(file: File) {
    if (!selected) return
    const slot = selected
    try {
      const url = await upload(file)
      await commit((draft) => assignImage(draft, slot, url))
    } catch {
      // The library status stays on the last save. A failed upload leaves the picture in place.
    }
  }

  const saved = status === 'saving' ? 'Saving…' : status === 'error' ? 'Could not save' : ''

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground lg:h-svh">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-5">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Admin</p>
          <h1 className="font-serif text-2xl tracking-[-0.03em]">{site.shortName}</h1>
        </div>
        <div className="flex items-center gap-5">
          {saved ? (
            <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{saved}</p>
          ) : null}
          <Link
            to="/"
            className="text-[11px] tracking-[0.16em] uppercase underline underline-offset-4"
          >
            View site
          </Link>
        </div>
      </header>
      <div className="grid flex-1 lg:min-h-0 lg:grid-cols-[22rem_1fr]">
        <div className="border-b border-border lg:overflow-auto lg:border-r lg:border-b-0">
          <UploadDesk onOpen={(slot) => setSelected(slot)} />
        </div>
        <div className="h-svh min-w-0 lg:h-full lg:min-h-0">
          <SiteStage
            page={page}
            onPage={setPage}
            tournamentsPage={tournamentsPage}
            onSelect={setSelected}
          />
        </div>
      </div>
      {selected && frames.length ? (
        <GalleryPreview
          frames={frames}
          index={index}
          onIndex={onIndex}
          onClose={onClose}
          onReplace={(file) => {
            void replace(file)
          }}
        />
      ) : null}
    </div>
  )
}
