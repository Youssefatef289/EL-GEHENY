/**
 * Supabase setup via Vite SSR (avoids vite-node import issues).
 * Run: npm run setup:supabase
 */
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'vite'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function loadEnv() {
  const text = readFileSync(resolve(root, '.env'), 'utf8')
  const env = {}
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
  }
  return env
}

const env = loadEnv()
const url = env.VITE_SUPABASE_URL
const key = env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env')
  process.exit(1)
}

const supabase = createClient(url, key)

async function checkTable(name) {
  const { error } = await supabase.from(name).select('id').limit(1)
  if (!error) return { ok: true }
  if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
    return { ok: false, missing: true }
  }
  return { ok: false, error: error.message }
}

async function main() {
  console.log('🔗 Supabase URL:', url)
  console.log('⏳ Checking connection...\n')

  const tables = ['site_settings', 'translations', 'projects', 'services', 'blog_posts', 'admin_users']
  for (const table of tables) {
    const result = await checkTable(table)
    if (result.missing) {
      console.error('❌ Table missing:', table)
      console.error('   Run supabase/schema.sql in SQL Editor:')
      console.error('   https://supabase.com/dashboard/project/ifablqbfbylctzaugsmm/sql/new')
      process.exit(1)
    }
    if (!result.ok) {
      console.error(`❌ ${table}:`, result.error)
      process.exit(1)
    }
  }
  console.log('✅ All tables exist\n')

  const { count: projectCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })

  if ((projectCount ?? 0) > 0) {
    console.log(`ℹ️  Database already has ${projectCount} projects — skipping seed.`)
    return
  }

  console.log('📦 Seeding initial data...\n')

  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
  })

  try {
    const mod = await vite.ssrLoadModule('/src/admin/seedData.js')
    await mod.seedDatabase()
  } finally {
    await vite.close()
  }

  const { count } = await supabase.from('projects').select('*', { count: 'exact', head: true })
  console.log(`✅ Seed complete — ${count} projects uploaded`)
  console.log('\n🎉 Setup done. Run: npm run dev')
}

main().catch((err) => {
  console.error('❌ Setup failed:', err.message || err)
  process.exit(1)
})
