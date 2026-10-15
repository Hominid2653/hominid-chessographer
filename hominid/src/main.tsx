import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import '@fontsource/inter-tight/latin-400.css'
import '@fontsource/inter-tight/latin-500.css'

import { App } from '@/app/App'
import '@/styles/globals.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element #root was not found.')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
