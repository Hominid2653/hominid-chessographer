import type { ReactNode } from 'react'

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
      {children}
    </p>
  )
}
