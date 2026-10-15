import { useEffect, useRef, type PointerEvent } from 'react'

import { useEditMode } from '@/app/media-hooks'
import { EditableImage } from '@/components/media/editable-image'
import type { WorkItem } from '@/content/types'
import { cn } from '@/lib/utils'

const stripWidths = [
  'w-[42vw] md:w-[24vw]',
  'w-[48vw] md:w-[28vw]',
  'w-[54vw] md:w-[32vw]',
  'w-[36vw] md:w-[26vw]',
]

const speed = 42

type Motion = {
  x: number
  width: number
  dragging: boolean
  pointerX: number
  lastTime: number
  velocity: number
  paused: boolean
  visible: boolean
}

export function HeroCarousel({ items }: { items: WorkItem[] }) {
  const editing = Boolean(useEditMode())
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const motion = useRef<Motion>({
    x: 0,
    width: 0,
    dragging: false,
    pointerX: 0,
    lastTime: 0,
    velocity: 0,
    paused: false,
    visible: true,
  })

  const sets = !editing && items.length > 1 ? [items, items] : [items]

  useEffect(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    const state = motion.current
    if (!track || !viewport) return
    if (editing || items.length < 2 || !document.documentElement.classList.contains('motion')) {
      track.style.transform = ''
      return
    }

    const measure = () => {
      const first = track.firstElementChild
      state.width = first instanceof HTMLElement ? first.offsetWidth : 0
    }
    measure()
    const resize = new ResizeObserver(measure)
    const first = track.firstElementChild
    if (first instanceof HTMLElement) resize.observe(first)

    const apply = () => {
      const width = state.width
      if (width > 0) {
        while (state.x <= -width) state.x += width
        while (state.x > 0) state.x -= width
      }
      track.style.transform = `translate3d(${state.x}px,0,0)`
    }

    let last = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const dt = Math.min(34, now - last)
      last = now
      if (!state.dragging) {
        if (!state.paused && state.visible) state.x -= (speed * dt) / 1000
        if (Math.abs(state.velocity) > 0.01) {
          state.x += state.velocity * dt
          state.velocity *= Math.pow(0.9, dt / 16)
        } else {
          state.velocity = 0
        }
      }
      apply()
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)

    let inView = true
    const syncVisible = () => {
      state.visible = inView && document.visibilityState === 'visible'
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting)
      syncVisible()
    })
    observer.observe(viewport)
    document.addEventListener('visibilitychange', syncVisible)

    return () => {
      window.cancelAnimationFrame(frame)
      resize.disconnect()
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncVisible)
    }
  }, [editing, items])

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (editing || items.length < 2 || !document.documentElement.classList.contains('motion')) return
    const state = motion.current
    state.dragging = true
    state.pointerX = event.clientX
    state.lastTime = performance.now()
    state.velocity = 0
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = motion.current
    if (!state.dragging) return
    const now = performance.now()
    const dx = event.clientX - state.pointerX
    const dt = now - state.lastTime
    state.velocity = dt > 0 ? dx / dt : 0
    state.x += dx
    state.pointerX = event.clientX
    state.lastTime = now
  }

  function endDrag() {
    motion.current.dragging = false
  }

  return (
    <div
      ref={viewportRef}
      className={cn(
        'relative mt-[clamp(1.25rem,2.6vh,1.75rem)] min-h-0 flex-1 overflow-hidden',
        !editing && items.length > 1 && 'cursor-grab touch-pan-y active:cursor-grabbing',
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onMouseEnter={() => {
        motion.current.paused = true
      }}
      onMouseLeave={() => {
        motion.current.paused = false
        endDrag()
      }}
    >
      <ul
        ref={trackRef}
        aria-label="Photographs"
        className="absolute inset-y-0 left-0 flex h-full will-change-transform"
      >
        {sets.map((sequence, copy) => (
          <li
            key={copy}
            aria-hidden={copy > 0 ? true : undefined}
            className="flex h-full shrink-0 gap-2.5 pr-2.5 md:gap-3 md:pr-3"
          >
            {sequence.map((item, index) => (
              <div key={`${item.id}-${copy}`} className={cn('h-full shrink-0', stripWidths[index % stripWidths.length])}>
                <EditableImage
                  slot={{ kind: 'work', id: item.id }}
                  src={item.image}
                  alt={copy > 0 ? '' : item.alt}
                  fetchPriority={copy === 0 && index < 2 ? 'high' : 'auto'}
                  style={{ objectPosition: item.position ?? 'center' }}
                  className="size-full object-cover select-none"
                />
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}
