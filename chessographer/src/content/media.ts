import type { SiteContent } from '@/content/types'

export type MediaPhoto = {
  id: string
  image: string
  alt: string
  position?: string
}

export type MediaWork = MediaPhoto & {
  title: string
  category: string
}

export type MediaTournament = {
  id: string
  title: string
  date: string
  place: string
  summary: string
  albumUrl: string
  photos: MediaPhoto[]
}

export type MediaSlot = {
  image: string
  alt: string
  position?: string
}

export type MediaDocument = {
  slots: {
    hero: MediaSlot
    about: MediaSlot
    feature?: MediaSlot
    tournamentsHero?: MediaSlot
  }
  portfolio: MediaWork[]
  themes?: string[]
  tournaments?: MediaTournament[]
}

export type ImageSlot =
  | { kind: 'hero' | 'about' | 'feature' | 'tournaments-hero' }
  | { kind: 'work'; id: string }
  | { kind: 'tournament-photo'; tournamentId: string; photoId: string }

export type GalleryFrame = {
  slot: ImageSlot
  src: string
  alt: string
  label: string
}

export function createMediaDocument(
  site: SiteContent,
  tournaments?: { hero: MediaSlot; events: MediaTournament[] },
): MediaDocument {
  return {
    slots: {
      hero: {
        image: site.hero.image,
        alt: site.hero.alt,
        position: site.hero.position,
      },
      about: {
        image: site.about.image,
        alt: site.about.alt,
        position: site.about.position,
      },
      ...(site.feature
        ? {
            feature: {
              image: site.feature.image,
              alt: site.feature.alt,
              position: site.feature.position,
            },
          }
        : {}),
      ...(tournaments ? { tournamentsHero: tournaments.hero } : {}),
    },
    themes: site.work.filters.filter((item) => item !== 'All'),
    portfolio: site.work.items.map((item) => ({ ...item })),
    ...(tournaments ? { tournaments: tournaments.events.map((event) => ({ ...event, photos: event.photos.map((photo) => ({ ...photo })) })) } : {}),
  }
}

export function themeNames(fallback: string[], media: Pick<MediaDocument, 'themes' | 'portfolio'>) {
  const seeded = fallback.filter((item) => item !== 'All')
  const named = media.themes?.map((item) => item.trim()).filter(Boolean)
  const base = named?.length ? named : seeded
  const extras = media.portfolio
    .map((item) => item.category.trim())
    .filter((item) => item && !base.includes(item))
  return [...new Set([...base, ...extras])]
}

export function applyMedia(site: SiteContent, media: MediaDocument): SiteContent {
  return {
    ...site,
    hero: { ...site.hero, ...media.slots.hero },
    about: { ...site.about, ...media.slots.about },
    feature:
      site.feature && media.slots.feature
        ? { ...site.feature, ...media.slots.feature }
        : site.feature,
    work: {
      ...site.work,
      filters: ['All', ...themeNames(site.work.filters, media)],
      items: media.portfolio,
    },
  }
}

export function assignImage(media: MediaDocument, slot: ImageSlot, image: string) {
  if (slot.kind === 'hero') media.slots.hero.image = image
  else if (slot.kind === 'about') media.slots.about.image = image
  else if (slot.kind === 'feature' && media.slots.feature) media.slots.feature.image = image
  else if (slot.kind === 'tournaments-hero' && media.slots.tournamentsHero) {
    media.slots.tournamentsHero.image = image
  } else if (slot.kind === 'work') {
    const item = media.portfolio.find((photo) => photo.id === slot.id)
    if (item) item.image = image
  } else if (slot.kind === 'tournament-photo') {
    const photo = media.tournaments
      ?.find((event) => event.id === slot.tournamentId)
      ?.photos.find((item) => item.id === slot.photoId)
    if (photo) photo.image = image
  }
}

export function moveItem<T>(items: T[], from: number, to: number) {
  if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) {
    return items
  }
  const next = [...items]
  const [item] = next.splice(from, 1)
  if (!item) return items
  next.splice(to, 0, item)
  return next
}

export function framesFor(media: MediaDocument, slot: ImageSlot): GalleryFrame[] {
  if (slot.kind === 'work') {
    return media.portfolio.map((item) => ({
      slot: { kind: 'work', id: item.id },
      src: item.image,
      alt: item.alt,
      label: item.title,
    }))
  }

  if (slot.kind === 'tournament-photo') {
    const tournament = media.tournaments?.find((item) => item.id === slot.tournamentId)
    return (tournament?.photos ?? []).map((photo) => ({
      slot: {
        kind: 'tournament-photo',
        tournamentId: slot.tournamentId,
        photoId: photo.id,
      },
      src: photo.image,
      alt: photo.alt,
      label: tournament?.title ?? 'Tournament',
    }))
  }

  const placed: Record<ImageSlot['kind'], MediaSlot | undefined> = {
    hero: media.slots.hero,
    about: media.slots.about,
    feature: media.slots.feature,
    'tournaments-hero': media.slots.tournamentsHero,
    work: undefined,
    'tournament-photo': undefined,
  }
  const current = placed[slot.kind]
  if (!current) return []
  const labels = {
    hero: 'Home hero',
    about: 'About',
    feature: 'Feature',
    'tournaments-hero': 'Tournaments hero',
  } as const
  return [
    {
      slot,
      src: current.image,
      alt: current.alt,
      label: labels[slot.kind as 'hero' | 'about' | 'feature' | 'tournaments-hero'],
    },
  ]
}

export function slotKey(slot: ImageSlot) {
  if (slot.kind === 'work') return `work:${slot.id}`
  if (slot.kind === 'tournament-photo') return `tournament:${slot.tournamentId}:${slot.photoId}`
  return slot.kind
}
