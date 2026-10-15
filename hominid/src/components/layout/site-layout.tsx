import { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router'

import { enableSmoothScroll } from '@/components/layout/smooth-scroll'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { Splash } from '@/components/layout/splash'

export function SiteLayout() {
  const [booting, setBooting] = useState(true)
  const finish = useCallback(() => setBooting(false), [])

  useEffect(() => enableSmoothScroll(), [])

  return (
    <div id="top">
      {booting ? <Splash onDone={finish} /> : null}
      <div inert={booting ? true : undefined}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-background focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
