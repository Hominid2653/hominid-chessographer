import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { slotKey, type GalleryFrame } from '@/content/media'
import { cn } from '@/lib/utils'

export function GalleryPreview({
  frames,
  index,
  onIndex,
  onClose,
  onReplace,
}: {
  frames: GalleryFrame[]
  index: number
  onIndex: (index: number) => void
  onClose: () => void
  onReplace: (file: File) => void
}) {
  const frame = frames[index]
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onIndex(Math.min(frames.length - 1, index + 1))
      if (event.key === 'ArrowLeft') onIndex(Math.max(0, index - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [frames.length, index, onClose, onIndex])

  if (!frame) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={frame.label}
      className="fixed inset-0 z-[80] flex flex-col bg-black text-white"
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        <p className="text-[11px] tracking-[0.18em] uppercase">
          {index + 1} of {frames.length}
        </p>
        <div className="flex items-center gap-3">
          <Button
            variant="inverse"
            className="px-4 py-2"
            onClick={() => input.current?.click()}
          >
            Replace
          </Button>
          <button
            type="button"
            aria-label="Close preview"
            className="cursor-pointer p-2"
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-16">
        {index > 0 ? (
          <button
            type="button"
            aria-label="Previous photograph"
            className="absolute left-3 cursor-pointer p-2 md:left-5"
            onClick={() => onIndex(index - 1)}
          >
            <ChevronLeft className="size-7" />
          </button>
        ) : null}
        <img
          src={frame.src}
          alt={frame.alt}
          className="max-h-full max-w-full object-contain"
        />
        {index < frames.length - 1 ? (
          <button
            type="button"
            aria-label="Next photograph"
            className="absolute right-3 cursor-pointer p-2 md:right-5"
            onClick={() => onIndex(index + 1)}
          >
            <ChevronRight className="size-7" />
          </button>
        ) : null}
      </div>
      <p className="px-4 py-3 text-center font-serif text-2xl tracking-[-0.03em]">
        {frame.label}
      </p>
      <div className="flex gap-2 overflow-x-auto px-4 pb-4">
        {frames.map((item, itemIndex) => (
          <button
            key={slotKey(item.slot)}
            type="button"
            aria-label={item.label}
            aria-current={itemIndex === index ? 'true' : undefined}
            onClick={() => onIndex(itemIndex)}
            className={cn(
              'h-16 w-16 shrink-0 overflow-hidden opacity-55',
              itemIndex === index && 'opacity-100 ring-2 ring-white',
            )}
          >
            <img src={item.src} alt="" className="size-full object-cover" />
          </button>
        ))}
      </div>
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0]
          event.target.value = ''
          if (file) onReplace(file)
        }}
      />
    </div>
  )
}
