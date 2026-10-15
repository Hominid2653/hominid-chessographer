import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router'

import { smoothScrollTo } from '@/components/layout/smooth-scroll'

export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
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
