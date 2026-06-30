import { supabase, isSupabaseConfigured } from './supabase'
import { getSiteCache, setSiteCache, notifySiteDataUpdated } from './siteDataCache'
import {
  rowToProject,
  rowToService,
  rowToBlogPost,
  deserializeTeam,
} from '../admin/mappers'

export async function loadSiteDataFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    setSiteCache({ loaded: true, loading: false })
    return getSiteCache()
  }

  setSiteCache({ loading: true })

  const [
    settingsRes,
    translationsRes,
    projectsRes,
    servicesRes,
    blogRes,
  ] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', 'main').maybeSingle(),
    supabase.from('translations').select('ar,en').eq('id', 'main').maybeSingle(),
    supabase.from('projects').select('*').order('sort_order'),
    supabase.from('services').select('*').order('sort_order'),
    supabase.from('blog_posts').select('*').order('sort_order'),
  ])

  const settings = settingsRes.data
  const projects = projectsRes.data?.length
    ? projectsRes.data.map(rowToProject)
    : null
  const services = servicesRes.data?.length
    ? servicesRes.data.map(rowToService)
    : null
  const blog = blogRes.data?.length
    ? blogRes.data.map(rowToBlogPost)
    : null

  const partial = {
    loaded: true,
    loading: false,
    company: settings?.company ?? null,
    social: settings?.social ?? null,
    stats: settings?.stats ?? null,
    team: settings?.team ? deserializeTeam(settings.team) : null,
    translationOverrides: translationsRes.data ?? null,
    projects,
    services,
    blog,
    sectionImages: settings?.section_images ?? null,
  }

  setSiteCache(partial)
  notifySiteDataUpdated('all')
  return partial
}

export async function refreshSiteData(key = 'all') {
  const data = await loadSiteDataFromSupabase()
  notifySiteDataUpdated(key)
  return data
}
