import { mkdir, readFile, writeFile } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'
import type { Plugin } from 'vite'

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])

function readBody(req: IncomingMessage) {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer | string) => {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('content-type', 'application/json')
  res.end(JSON.stringify(body))
}

export function mediaPlugin(root: string): Plugin {
  const mediaFile = path.join(root, 'src', 'content', 'media.json')
  const uploadDir = path.join(root, 'public', 'uploads')

  return {
    name: 'media-admin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost')
        if (!url.pathname.startsWith('/api/media')) {
          next()
          return
        }

        try {
          if (req.method === 'GET' && url.pathname === '/api/media') {
            const file = await readFile(mediaFile, 'utf8').catch(() => '')
            if (!file) {
              sendJson(res, 404, { error: 'No saved media yet.' })
              return
            }
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(file)
            return
          }

          if (req.method === 'PUT' && url.pathname === '/api/media') {
            const body = (await readBody(req)).toString('utf8')
            const document = JSON.parse(body) as unknown
            await mkdir(path.dirname(mediaFile), { recursive: true })
            await writeFile(mediaFile, JSON.stringify(document, null, 2))
            sendJson(res, 200, { ok: true })
            return
          }

          if (req.method === 'POST' && url.pathname === '/api/media/upload') {
            const original = path.basename(url.searchParams.get('name') || 'photo.jpg')
            const safeName = original.replace(/[^a-zA-Z0-9._-]/g, '')
            const extension = path.extname(safeName).toLowerCase()
            if (!imageExtensions.has(extension)) {
              sendJson(res, 400, { error: 'Use a JPG, PNG, WEBP, GIF, or AVIF image.' })
              return
            }
            const bytes = await readBody(req)
            if (bytes.length === 0 || bytes.length > 20 * 1024 * 1024) {
              sendJson(res, 400, { error: 'Image must be under 20MB.' })
              return
            }
            await mkdir(uploadDir, { recursive: true })
            const filename = `${Date.now()}-${safeName}`
            await writeFile(path.join(uploadDir, filename), bytes)
            sendJson(res, 200, { url: `/uploads/${filename}` })
            return
          }

          sendJson(res, 404, { error: 'Not found.' })
        } catch {
          sendJson(res, 500, { error: 'The media library could not be saved.' })
        }
      })
    },
  }
}
