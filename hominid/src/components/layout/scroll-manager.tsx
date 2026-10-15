import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router'

import { smoothScrollTo } from '@/components/layout/smooth-scroll'

function portfolioFolder(path: string) {
  return path.match(/^\/portfolio\/[^/]+/)?.[0] ?? null
}

export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const previous = useRef(pathname)

  useLayoutEffect(() => {
    const prior = previous.current
    previous.current = pathname
    const sameFolder = portfolioFolder(prior) && portfolioFolder(prior) === portfolioFolder(pathname)
    if (sameFolder) return

    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80
        smoothScrollTo(top)
        return
      }
    }

    smoothScrollTo(0)
  }, [pathname, hash])

  return null
}
