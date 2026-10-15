import type { CSSProperties } from 'react'

import { useEditMode } from '@/app/media-hooks'
import type { ImageSlot } from '@/content/media'
import { cn } from '@/lib/utils'

export function EditableImage({
  slot,
  src,
  alt,
  className,
  style,
  loading,
  fetchPriority,
}: {
  slot: ImageSlot
  src: string
  alt: string
  className?: string
  style?: CSSProperties
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
}) {
  const edit = useEditMode()

  return (
    <span className="group/photo relative block h-full w-full">
      <img
        src={src}
        alt={alt}
        style={style}
        loading={loading}
        fetchPriority={fetchPriority}
        draggable={false}
        className={cn(className, edit && 'pointer-events-none')}
      />
      {edit ? (
        <button
          type="button"
          className="absolute inset-0 z-10 flex cursor-pointer items-start justify-end bg-black/0 p-3 transition hover:bg-black/40"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            edit.onSelect(slot)
          }}
        >
          <span className="bg-white px-2.5 py-1.5 text-[10px] tracking-[0.16em] text-black uppercase">
            Replace
          </span>
        </button>
      ) : null}
    </span>
  )
}
