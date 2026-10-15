let target = 0
let current = 0
let frame = 0
let active = false
let fromLoop = false

function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
}

function clamp(value: number) {
  return Math.min(maxScroll(), Math.max(0, value))
}

function onScroll() {
  if (fromLoop || Math.abs(window.scrollY - current) < 2) return
  current = window.scrollY
  target = window.scrollY
}

function onWheel(event: WheelEvent) {
  if (!active || event.ctrlKey || event.metaKey || document.body.style.overflow === 'hidden') return
  if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
  const node = event.target
  if (node instanceof Element && node.closest('textarea, input, select, [role="dialog"]')) return
  event.preventDefault()
  const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
  target = clamp(target + event.deltaY * scale)
  if (!frame) frame = window.requestAnimationFrame(loop)
}

function loop() {
  current += (target - current) * 0.12
  if (Math.abs(target - current) < 0.4) current = target
  fromLoop = true
  window.scrollTo(0, current)
  fromLoop = false
  frame = current === target ? 0 : window.requestAnimationFrame(loop)
}

export function smoothScrollTo(top: number) {
  target = clamp(top)
  if (!active) {
    current = target
    window.scrollTo(0, target)
    return
  }
  if (!frame) frame = window.requestAnimationFrame(loop)
}

export function enableSmoothScroll() {
  if (!document.documentElement.classList.contains('motion')) return () => {}
  active = true
  current = window.scrollY
  target = window.scrollY
  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => {
    active = false
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('scroll', onScroll)
    if (frame) window.cancelAnimationFrame(frame)
    frame = 0
  }
}
