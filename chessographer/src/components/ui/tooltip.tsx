import { Tooltip } from 'radix-ui'
import { type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

function TooltipProvider({
  delayDuration = 300,
  ...props
}: ComponentProps<typeof Tooltip.Provider>) {
  return <Tooltip.Provider delayDuration={delayDuration} {...props} />
}

function TooltipRoot(props: ComponentProps<typeof Tooltip.Root>) {
  return <Tooltip.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger(props: ComponentProps<typeof Tooltip.Trigger>) {
  return <Tooltip.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 6,
  ...props
}: ComponentProps<typeof Tooltip.Content>) {
  return (
    <Tooltip.Portal>
      <Tooltip.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'z-50 rounded-md bg-foreground px-2 py-1 text-xs text-background',
          className,
        )}
        {...props}
      />
    </Tooltip.Portal>
  )
}

export {
  TooltipRoot as Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
}
