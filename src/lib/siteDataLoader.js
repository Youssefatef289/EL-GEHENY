import { isApiConfigured, fetchCmsTable } from './apiClient'
import { getSiteCache, setSiteCache, notifySiteDataUpdated } from './siteDataCache'
import {
  rowToProject,
  rowToService,
  rowToBlogPost,
  deserializeTeam,
} from '../admin/mappers'

export async function loadSiteData() {
  if (!isApiConfigured()) {
    setSiteCache({ loaded: true, loading: false })
    return getSiteCache()
  }

  setSiteCache({ loading: true })

  try {
    const [
      settings,
      translations,
      projects,
      services,
      blog,
    ] = await Promise.all([
      fetchCmsTable('site_settings'),
      fetchCmsTable('translations'),
      fetchCmsTable('projects'),
      fetchCmsTable('services'),
      fetchCmsTable('blog_posts'),
    ])

    const projectsList = Array.isArray(projects) ? projects : []
    const servicesList = Array.isArray(services) ? services : []
    const blogList = Array.isArray(blog) ? blog : []

    const partial = {
      loaded: true,
      loading: false,
      company: settings?.company ?? null,
      social: settings?.social ?? null,
      stats: settings?.stats ?? null,
      team: settings?.team ? deserializeTeam(settings.team) : null,
      translationOverrides: translations ?? null,
      projects: projectsList.length ? projectsList.map(rowToProject) : null,
      services: servicesList.length ? servicesList.map(rowToService) : null,
      blog: blogList.length ? blogList.map(rowToBlogPost) : null,
      sectionImages: settings?.section_images ?? null,
    }

    setSiteCache(partial)
    notifySiteDataUpdated('all')
    return partial
  } catch {
    setSiteCache({ loaded: true, loading: false })
    return getSiteCache()
  }
}

export async function refreshSiteData(key = 'all') {
  const data = await loadSiteData()
  notifySiteDataUpdated(key)
  return data
}

export const loadSiteDataFromSupabase = loadSiteData
