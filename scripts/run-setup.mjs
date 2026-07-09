/**
 * Calls POST /api/setup once after deploy.
 * Reads SETUP_SECRET + optional SITE_URL from .env.vercel
 */
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const envPath = resolve(root, '.env.vercel')

if (!existsSync(envPath)) {
  console.error('Missing .env.vercel')
  process.exit(1)
}

const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    }),
)

const siteUrl = (env.SITE_URL || 'https://el-geheny.vercel.app').replace(/\/$/, '')
const secret = env.SETUP_SECRET

if (!secret) {
  console.error('Missing SETUP_SECRET')
  process.exit(1)
}

console.log(`Calling ${siteUrl}/api/setup ...`)

const res = await fetch(`${siteUrl}/api/setup`, {
  method: 'POST',
  headers: { 'x-setup-secret': secret },
})

const text = await res.text()
console.log(res.status, text)

if (!res.ok) process.exit(1)
console.log('Setup OK — now open /admin and seed initial data.')
