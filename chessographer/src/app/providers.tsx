import { useMemo, type ReactNode } from 'react'

import { MediaProvider } from '@/app/media-context'
import { createMediaDocument } from '@/content/media'
import { site } from '@/content/site'
import { tournaments, tournamentsPage } from '@/content/tournaments'

export function Providers({ children }: { children: ReactNode }) {
  const seed = useMemo(
    () =>
      createMediaDocument(site, {
        hero: {
          image: tournamentsPage.image,
          alt: tournamentsPage.alt,
          position: tournamentsPage.position,
        },
        events: tournaments,
      }),
    [],
  )

  return (
    <MediaProvider baseSite={site} seed={seed} tournamentSummary={tournamentsPage.summary}>
      {children}
    </MediaProvider>
  )
}
