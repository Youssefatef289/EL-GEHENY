import { readFileSync, writeFileSync } from 'fs'
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
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY)

const tinyPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAD0lEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

const path = `test/upload-test-${Date.now()}.png`
const { data, error } = await supabase.storage.from('project-images').upload(path, tinyPng, {
  contentType: 'image/png',
  upsert: true,
})

console.log('upload error:', error)
console.log('upload data:', data)

if (!error) {
  const { data: pub } = supabase.storage.from('project-images').getPublicUrl(path)
  console.log('public url:', pub.publicUrl)
}

const { data: buckets, error: bErr } = await supabase.storage.listBuckets()
console.log('listBuckets:', bErr?.message || buckets?.map((b) => b.id))
