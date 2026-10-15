import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

import {
  EditContext,
  MediaContext,
  PreviewContext,
  type MediaContextValue,
} from '@/app/media-hooks'
import { applyMedia, type ImageSlot, type MediaDocument } from '@/content/media'
import type { SiteContent } from '@/content/types'

const bundledMedia = Object.values(
  import.meta.glob<MediaDocument>('../content/media.json', {
    eager: true,
    import: 'default',
  }),
)[0]

async function loadMedia(seed: MediaDocument) {
  try {
    const response = await fetch('/api/media')
    if (response.ok) return (await response.json()) as MediaDocument
  } catch {
    // The dev API is unavailable in a static build.
  }
  return bundledMedia?.portfolio?.length ? bundledMedia : seed
}

export function MediaProvider({
  children,
  baseSite,
  seed,
  tournamentSummary = '',
}: {
  children: ReactNode
  baseSite: SiteContent
  seed: MediaDocument
  tournamentSummary?: string
}) {
  const [media, setMedia] = useState<MediaDocument>(
    bundledMedia?.portfolio?.length ? bundledMedia : seed,
  )
  const mediaRef = useRef(media)
  const edited = useRef(false)
  const saveQueue = useRef(Promise.resolve())
  const [status, setStatus] = useState<MediaContextValue['status']>('ready')

  useEffect(() => {
    mediaRef.current = media
  }, [media])

  useEffect(() => {
    let active = true
    loadMedia(seed).then((next) => {
      if (active && !edited.current) {
        mediaRef.current = next
        setMedia(next)
      }
    })
    return () => {
      active = false
    }
  }, [seed])

  const site = useMemo(() => applyMedia(baseSite, media), [baseSite, media])

  function commit(recipe: (draft: MediaDocument) => void) {
    const next = structuredClone(mediaRef.current)
    recipe(next)
    mediaRef.current = next
    edited.current = true
    setMedia(next)
    setStatus('saving')
    const pending = saveQueue.current.catch(() => undefined).then(async () => {
      try {
        const response = await fetch('/api/media', {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(mediaRef.current, null, 2),
        })
        setStatus(response.ok ? 'ready' : 'error')
      } catch {
        setStatus('error')
      }
    })
    saveQueue.current = pending
    return pending
  }

  async function upload(file: File) {
    const response = await fetch(`/api/media/upload?name=${encodeURIComponent(file.name)}`, {
      method: 'POST',
      headers: { 'content-type': file.type || 'application/octet-stream' },
      body: file,
    })
    if (!response.ok) throw new Error('Upload failed')
    const payload = (await response.json()) as { url: string }
    return payload.url
  }

  const tournaments = media.tournaments ?? null
  const tournamentsHero = media.slots.tournamentsHero
    ? { ...media.slots.tournamentsHero, summary: tournamentSummary }
    : null

  return (
    <MediaContext.Provider
      value={{ site, media, tournaments, tournamentsHero, status, upload, commit }}
    >
      {children}
    </MediaContext.Provider>
  )
}

export function EditModeProvider({
  children,
  onSelect,
}: {
  children: ReactNode
  onSelect: (slot: ImageSlot) => void
}) {
  const value = useMemo(() => ({ onSelect }), [onSelect])
  return <EditContext.Provider value={value}>{children}</EditContext.Provider>
}

export function PreviewNavProvider({
  children,
  path,
  go,
}: {
  children: ReactNode
  path: string
  go: (href: string) => void
}) {
  const value = useMemo(() => ({ path, go }), [path, go])
  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
}
