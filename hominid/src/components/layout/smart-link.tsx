import type { ReactNode } from 'react'
import { Link } from 'react-router'

import { usePreviewNav } from '@/app/media-hooks'
import { cn } from '@/lib/utils'

export function SmartLink({
  to,
  className,
  children,
  ariaLabel,
  current,
  onClick,
}: {
  to: string
  className?: string
  children: ReactNode
  ariaLabel?: string
  current?: boolean
  onClick?: () => void
}) {
  const preview = usePreviewNav()

  if (preview) {
    return (
      <button
        type="button"
        className={cn('cursor-pointer border-0 bg-transparent p-0 text-inherit', className)}
        aria-label={ariaLabel}
        aria-current={current ? 'page' : undefined}
        onClick={() => {
          onClick?.()
          preview.go(to)
        }}
      >
        {children}
      </button>
    )
  }

  return (
    <Link
      to={to}
      className={className}
      aria-label={ariaLabel}
      aria-current={current ? 'page' : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
