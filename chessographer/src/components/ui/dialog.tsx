import { X } from 'lucide-react'
import { Dialog } from 'radix-ui'
import { type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

function DialogRoot(props: ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root data-slot="dialog" {...props} />
}

function DialogTrigger(props: ComponentProps<typeof Dialog.Trigger>) {
  return <Dialog.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal(props: ComponentProps<typeof Dialog.Portal>) {
  return <Dialog.Portal data-slot="dialog-portal" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: ComponentProps<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      data-slot="dialog-overlay"
      className={cn('fixed inset-0 z-50 bg-black/80', className)}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  hideClose = false,
  variant = 'center',
  ...props
}: ComponentProps<typeof Dialog.Content> & {
  hideClose?: boolean
  variant?: 'center' | 'fullscreen' | 'viewer'
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <Dialog.Content
        data-slot="dialog-content"
        className={cn(
          'z-[60] outline-none',
          variant === 'center' &&
            'fixed top-1/2 left-1/2 w-[min(100%-2rem,32rem)] -translate-x-1/2 -translate-y-1/2 border border-border bg-background p-6 text-foreground',
          variant === 'fullscreen' &&
            'fixed inset-0 h-svh w-full overflow-y-auto bg-background text-foreground',
          variant === 'viewer' &&
            'fixed top-1/2 left-1/2 w-[min(100%-1.5rem,76rem)] -translate-x-1/2 -translate-y-1/2 bg-transparent',
          className,
        )}
        {...props}
      >
        {children}
        {hideClose ? null : (
          <Dialog.Close
            aria-label="Close"
            className={cn(
              'inline-flex size-11 cursor-pointer items-center justify-center',
              variant === 'viewer'
                ? 'fixed top-4 right-4 text-white'
                : 'absolute top-3 right-3 text-foreground',
            )}
          >
            <X className="size-5" />
          </Dialog.Close>
        )}
      </Dialog.Content>
    </DialogPortal>
  )
}

function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      data-slot="dialog-title"
      className={cn('text-lg font-medium', className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      data-slot="dialog-description"
      className={cn('mt-2 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function DialogClose(props: ComponentProps<typeof Dialog.Close>) {
  return <Dialog.Close data-slot="dialog-close" {...props} />
}

export {
  DialogRoot as Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
}
