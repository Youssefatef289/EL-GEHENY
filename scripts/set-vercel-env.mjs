/**
 * Sets Neon/API env vars on Vercel from .env.vercel
 * Prerequisites:
 *   1. npm i -g vercel  (or use npx)
 *   2. vercel login
 *   3. Fill DATABASE_URL in .env.vercel from https://console.neon.tech
 *   4. node scripts/set-vercel-env.mjs
 *   5. vercel --prod  (or Redeploy in dashboard)
 *   6. node scripts/run-setup.mjs
 */
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const envPath = resolve(root, '.env.vercel')

if (!existsSync(envPath)) {
  console.error('Missing .env.vercel — create it first')
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

const required = [
  'DATABASE_URL',
  'JWT_SECRET',
  'SETUP_SECRET',
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD',
  'VITE_API_ENABLED',
]

for (const key of required) {
  if (!env[key]) {
    console.error(`Missing ${key} in .env.vercel`)
    process.exit(1)
  }
}

console.log('Setting Vercel environment variables...')

for (const key of required) {
  const value = env[key]
  try {
    execSync(`npx vercel env rm ${key} production -y`, { stdio: 'ignore', cwd: root })
  } catch {}
  try {
    execSync(`npx vercel env rm ${key} preview -y`, { stdio: 'ignore', cwd: root })
  } catch {}
  try {
    execSync(`npx vercel env rm ${key} development -y`, { stdio: 'ignore', cwd: root })
  } catch {}

  for (const target of ['production', 'preview', 'development']) {
    execSync(`npx vercel env add ${key} ${target}`, {
      input: `${value}\n`,
      cwd: root,
      stdio: ['pipe', 'inherit', 'inherit'],
    })
  }
  console.log(`✓ ${key}`)
}

console.log('\nDone. Next:')
console.log('  1) npx vercel --prod')
console.log('  2) node scripts/run-setup.mjs')
