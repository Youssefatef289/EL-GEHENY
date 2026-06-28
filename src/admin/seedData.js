import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { baseCompany, baseStats } from '../data/site'
import { baseProjects } from '../data/projects'
import { baseServices } from '../data/services'
import { baseBlogPosts } from '../data/blog'
import { baseFounder, baseTeamMembers } from '../data/team'
import {
  projectToRow,
  serviceToRow,
  blogToRow,
  serializeTeam,
} from './mappers'
import { refreshSiteData } from '../lib/siteDataLoader'

async function upsert(table, data, options) {
  const { error } = await supabase.from(table).upsert(data, options)
  if (error) throw new Error(`${table}: ${error.message}`)
}

export async function seedDatabase() {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase غير مُعد — أضف VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env')
  }

  await upsert('site_settings', {
    id: 'main',
    company: {
      name: baseCompany.name,
      slogan: baseCompany.slogan,
      phone: baseCompany.phone,
      whatsapp: baseCompany.whatsapp,
      email: baseCompany.email,
      address: baseCompany.address,
      mapUrl: baseCompany.mapUrl,
    },
    stats: baseStats,
    social: baseCompany.social,
    team: serializeTeam({ founder: baseFounder, members: baseTeamMembers }),
    updated_at: new Date().toISOString(),
  })

  await upsert('translations', {
    id: 'main',
    ar: {},
    en: {},
    updated_at: new Date().toISOString(),
  })

  const projectRows = baseProjects.map((project, index) => projectToRow(project, index))
  await upsert('projects', projectRows, { onConflict: 'id' })

  const serviceRows = baseServices.map((service, index) => serviceToRow(service, index))
  await upsert('services', serviceRows, { onConflict: 'id' })

  const blogRows = baseBlogPosts.map((post, index) => blogToRow(post, index))
  await upsert('blog_posts', blogRows, { onConflict: 'id' })

  if (typeof window !== 'undefined') {
    await refreshSiteData('seed')
  }
  return true
}

export async function isDatabaseEmpty() {
  if (!isSupabaseConfigured() || !supabase) return true
  const { count, error } = await supabase
    .from('projects')
    .select('id', { count: 'exact', head: true })
  if (error) return true
  return (count ?? 0) === 0
}
