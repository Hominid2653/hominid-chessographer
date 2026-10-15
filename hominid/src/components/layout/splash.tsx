import { useEffect, useState } from 'react'

import { site } from '@/content/site'
import { cn } from '@/lib/utils'

const holdMs = 1650
const fadeMs = 700

export function Splash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const hold = reduce ? 280 : holdMs
    const fade = reduce ? 0 : fadeMs
    const outTimer = window.setTimeout(() => setLeaving(true), hold)
    const doneTimer = window.setTimeout(onDone, hold + fade)
    return () => {
      document.body.style.overflow = previous
      window.clearTimeout(outTimer)
      window.clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading ${site.name}`}
      className={cn(
        'fixed inset-0 z-[70] bg-background transition-opacity duration-700 ease-out',
        leaving && 'pointer-events-none opacity-0',
      )}
    >
      <div className="flex h-full items-center justify-center text-foreground">
        <div className="splash-mark text-center">
          <p className="font-serif text-[15px] tracking-[0.28em] uppercase md:text-[17px]">
            {site.shortName}
          </p>
          <p className="mt-2 text-[9px] tracking-[0.32em] uppercase">Photography</p>
          <span className="splash-rule mx-auto mt-6 block h-px bg-frame" />
        </div>
      </div>
    </div>
  )
}
