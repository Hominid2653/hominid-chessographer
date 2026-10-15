import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import { Providers } from '@/app/providers'
import { ScrollManager } from '@/components/layout/scroll-manager'
import { SiteLayout } from '@/components/layout/site-layout'
import { AdminPage } from '@/features/admin/admin-page'
import { HomePage } from '@/features/home/home-page'
import { PortfolioPage } from '@/features/portfolio/portfolio-page'

export function App() {
  useEffect(() => {
    document.getElementById('boot')?.remove()
  }, [])

  return (
    <Providers>
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:theme" element={<PortfolioPage />} />
            <Route path="/portfolio/:theme/:photo" element={<PortfolioPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}
