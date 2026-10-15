import { Separator } from 'radix-ui'
import { type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

function SeparatorRoot({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: ComponentProps<typeof Separator.Root>) {
  return (
    <Separator.Root
      data-slot="separator"
      orientation={orientation}
      decorative={decorative}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  )
}

export { SeparatorRoot as Separator }
