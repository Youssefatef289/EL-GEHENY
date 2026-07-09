import { isApiConfigured, cmsWrite, fetchCmsTable } from '../lib/apiClient'
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

export async function seedDatabase() {
  if (!isApiConfigured()) {
    throw new Error('الـ API غير مُفعّل — أضف VITE_API_ENABLED=true في Vercel')
  }

  await cmsWrite('site_settings', 'save', {
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
  })

  await cmsWrite('translations', 'save', { ar: {}, en: {} })

  const projectRows = baseProjects.map((project, index) => projectToRow(project, index))
  await cmsWrite('projects', 'upsert', projectRows)

  const serviceRows = baseServices.map((service, index) => serviceToRow(service, index))
  await cmsWrite('services', 'upsert', serviceRows)

  const blogRows = baseBlogPosts.map((post, index) => blogToRow(post, index))
  await cmsWrite('blog_posts', 'upsert', blogRows)

  if (typeof window !== 'undefined') {
    await refreshSiteData('seed')
  }
  return true
}

export async function isDatabaseEmpty() {
  if (!isApiConfigured()) return true
  try {
    const projects = await fetchCmsTable('projects')
    return !Array.isArray(projects) || projects.length === 0
  } catch {
    return true
  }
}
