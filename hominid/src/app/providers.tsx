import { useMemo, type ReactNode } from 'react'

import { MediaProvider } from '@/app/media-context'
import { createMediaDocument } from '@/content/media'
import { site } from '@/content/site'

export function Providers({ children }: { children: ReactNode }) {
  const seed = useMemo(() => createMediaDocument(site), [])

  return (
    <MediaProvider baseSite={site} seed={seed}>
      {children}
    </MediaProvider>
  )
}
