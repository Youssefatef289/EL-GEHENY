import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const env = Object.fromEntries(
  readFileSync(resolve(root, '.env'), 'utf8')
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    }),
)

const url = env.VITE_SUPABASE_URL
const key = env.VITE_SUPABASE_ANON_KEY
console.log('URL:', url)
console.log('Key prefix:', key?.slice(0, 20))

const supabase = createClient(url, key)

const { data: projects, error: pErr } = await supabase.from('projects').select('id').limit(5)
console.log('projects:', projects, pErr)

const { data: admin, error: aErr } = await supabase.from('admin_users').select('username').limit(1)
console.log('admin_users:', admin, aErr)

const testInsert = await supabase.from('site_settings').upsert({
  id: 'main',
  company: { test: true },
  updated_at: new Date().toISOString(),
})
console.log('upsert site_settings:', testInsert.error || 'OK')

const { data: settings } = await supabase.from('site_settings').select('id, company').eq('id', 'main')
console.log('site_settings read:', settings)
