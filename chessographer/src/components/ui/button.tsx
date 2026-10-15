import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import { type ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 px-7 py-3 text-[11px] font-medium tracking-[0.18em] uppercase transition-opacity outline-none hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default: 'bg-foreground text-background',
        inverse: 'bg-background text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  asChild = false,
  type = 'button',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant }), className)}
      type={type}
      {...props}
    />
  )
}

export { Button }
