import { createContext, useContext } from 'react'

import type { ImageSlot, MediaDocument, MediaTournament } from '@/content/media'
import type { SiteContent } from '@/content/types'

export type PreviewNav = {
  path: string
  go: (href: string) => void
}

export type EditMode = {
  onSelect: (slot: ImageSlot) => void
}

export type MediaContextValue = {
  site: SiteContent
  media: MediaDocument
  tournaments: MediaTournament[] | null
  tournamentsHero: { image: string; alt: string; position?: string; summary: string } | null
  status: 'ready' | 'saving' | 'error'
  upload: (file: File) => Promise<string>
  commit: (recipe: (draft: MediaDocument) => void) => Promise<void>
}

export const MediaContext = createContext<MediaContextValue | null>(null)
export const EditContext = createContext<EditMode | null>(null)
export const PreviewContext = createContext<PreviewNav | null>(null)

export function useMedia() {
  const value = useContext(MediaContext)
  if (!value) throw new Error('useMedia must be used within MediaProvider')
  return value
}

export function useSite() {
  return useMedia().site
}

export function useEditMode() {
  return useContext(EditContext)
}

export function usePreviewNav() {
  return useContext(PreviewContext)
}
