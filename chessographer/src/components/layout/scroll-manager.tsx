import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router'

function portfolioFolder(path: string) {
  return path.match(/^\/portfolio\/[^/]+/)?.[0] ?? null
}

function keepScroll(prior: string, next: string) {
  const folder = portfolioFolder(prior)
  if (folder && folder === portfolioFolder(next)) return true
  const tournament = (path: string) => path === '/tournaments' || path.startsWith('/tournaments/')
  return tournament(prior) && tournament(next)
}

export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const previous = useRef(pathname)

  useLayoutEffect(() => {
    const prior = previous.current
    previous.current = pathname
    if (keepScroll(prior, pathname)) return

    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView()
        return
      }
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
