import { SmartLink } from '@/components/layout/smart-link'
import { cn } from '@/lib/utils'

type Crumb = {
  label: string
  to?: string
  replace?: boolean
}

export function Breadcrumbs({
  items,
  tone = 'ink',
  className,
}: {
  items: Crumb[]
  tone?: 'ink' | 'light'
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          'flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] tracking-[0.16em] uppercase',
          tone === 'light' ? 'text-white/70' : 'text-muted-foreground',
        )}
      >
        {items.map((item, index) => {
          const current = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2.5">
              {index > 0 ? (
                <span aria-hidden="true" className="opacity-50">
                  /
                </span>
              ) : null}
              {current || !item.to ? (
                <span
                  aria-current={current ? 'page' : undefined}
                  className={tone === 'light' ? 'text-white' : 'text-foreground'}
                >
                  {item.label}
                </span>
              ) : (
                <SmartLink
                  to={item.to}
                  replace={item.replace}
                  className="transition-opacity hover:opacity-60"
                >
                  {item.label}
                </SmartLink>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
