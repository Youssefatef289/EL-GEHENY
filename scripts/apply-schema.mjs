/**
 * Apply schema via Postgres (optional automation).
 * Add to .env: SUPABASE_DB_PASSWORD=your-database-password
 * From: Supabase → Project Settings → Database → Database password
 * Run: npm run db:schema
 */
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'

const { Client } = pg
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function loadEnv() {
  const env = {}
  for (const line of readFileSync(resolve(root, '.env'), 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
  }
  return env
}

const env = loadEnv()
const ref = env.VITE_SUPABASE_URL?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1]
const password = env.SUPABASE_DB_PASSWORD

if (!ref || !password) {
  console.error('❌ أضف SUPABASE_DB_PASSWORD في ملف .env')
  console.error('   من: Supabase → Project Settings → Database → Database password')
  console.error(`   أو الصق schema.sql يدوياً: https://supabase.com/dashboard/project/${ref || 'YOUR_PROJECT'}/sql/new`)
  process.exit(1)
}

const hosts = [
  `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
  `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
  `postgresql://postgres:${encodeURIComponent(password)}@db.${ref}.supabase.co:5432/postgres`,
]

const sql = readFileSync(resolve(root, 'supabase/schema.sql'), 'utf8')
let applied = false

for (const connectionString of hosts) {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } })
  try {
    await client.connect()
    await client.query(sql)
    console.log('✅ تم إنشاء الجداول بنجاح')
    applied = true
    await client.end()
    break
  } catch (err) {
    await client.end().catch(() => {})
    if (hosts.indexOf(connectionString) === hosts.length - 1) {
      console.error('❌ فشل الاتصال:', err.message)
      process.exit(1)
    }
  }
}

if (applied) process.exit(0)
