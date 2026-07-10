import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import express from 'express'
import cors from 'cors'
import { pathToFileURL } from 'url'
import path from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Prefer .env.local for local Docker MySQL
const envLocal = path.join(__dirname, '.env.local')
if (existsSync(envLocal)) {
  loadEnv({ path: envLocal, override: true })
}

const app = express()
const PORT = Number(process.env.API_PORT || 3001)

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }))
app.use(express.json({ limit: '10mb' }))

const apiFiles = ['auth', 'setup', 'inquiries', 'inquiry-status', 'cms', 'cms-write']

for (const name of apiFiles) {
  const filePath = path.join(__dirname, 'api', `${name}.js`)
  const mod = await import(pathToFileURL(filePath).href)
  const handler = mod.default

  app.all(`/api/${name}`, async (req, res) => {
    try {
      await handler(req, res)
    } catch (err) {
      console.error(`[${name}]`, err)
      if (!res.headersSent) {
        res.status(500).json({ error: err.message || 'Server error' })
      }
    }
  })
}

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    dialect: process.env.DATABASE_HOST === '127.0.0.1' || process.env.DATABASE_HOST === 'localhost'
      ? 'mysql'
      : (process.env.DATABASE_URL ? 'postgres' : 'none'),
  })
})

app.listen(PORT, () => {
  console.log(`Local API server: http://localhost:${PORT}`)
  console.log(`phpMyAdmin:       http://localhost:8080`)
  console.log(`Frontend:         http://localhost:5173`)
})
