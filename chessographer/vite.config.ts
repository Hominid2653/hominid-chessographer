import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import { mediaPlugin } from './src/server/media-plugin.ts'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mediaPlugin(fileURLToPath(new URL('.', import.meta.url))),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
