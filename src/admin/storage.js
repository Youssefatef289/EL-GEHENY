import {
  isApiConfigured,
  fetchCmsTable,
  cmsWrite,
  submitInquiryApi,
  fetchInquiriesApi,
  updateInquiryStatusApi,
  deleteInquiryApi,
} from '../lib/apiClient'
import { notifySiteDataUpdated } from '../lib/siteDataCache'
import { refreshSiteData } from '../lib/siteDataLoader'
import {
  projectToRow,
  rowToProject,
  serviceToRow,
  blogToRow,
  serializeTeam,
} from './mappers'

export { deepMerge } from '../lib/deepMerge'
export { refreshSiteData }

export const STORAGE_KEYS = {
  projects: 'admin_projects',
  translations: 'admin_translations',
  services: 'admin_services',
  stats: 'admin_stats',
  team: 'admin_team',
  blog: 'admin_blog',
  company: 'admin_company',
  social: 'admin_social',
  credentials: 'admin_credentials',
  session: 'admin_session',
  section_images: 'admin_section_images',
  inquiries: 'admin_inquiries',
}

function useLocalFallback() {
  return !isApiConfigured()
}

export function saveData(key, data) {
  if (typeof window === 'undefined') return
  if (useLocalFallback()) {
    window.localStorage.setItem(key, JSON.stringify(data))
  }
  notifySiteDataUpdated(key)
}

export function getData(key, defaultData = null) {
  if (typeof window === 'undefined') return defaultData
  if (useLocalFallback()) {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw == null) return defaultData
      return JSON.parse(raw)
    } catch {
      return defaultData
    }
  }
  return defaultData
}

export function resetData(key) {
  if (typeof window === 'undefined') return
  if (useLocalFallback()) {
    window.localStorage.removeItem(key)
  }
  notifySiteDataUpdated(key)
}

async function afterWrite(key) {
  if (isApiConfigured()) {
    await refreshSiteData(key)
  } else {
    notifySiteDataUpdated(key)
  }
}

export const projectsDB = {
  async getAll() {
    if (isApiConfigured()) {
      try {
        const rows = await fetchCmsTable('projects')
        return Array.isArray(rows) ? rows.map(rowToProject) : []
      } catch (err) {
        console.error('projectsDB.getAll:', err)
      }
    }
    const stored = getData(STORAGE_KEYS.projects, null)
    return Array.isArray(stored) ? stored : []
  },
  async saveAll(projects) {
    if (isApiConfigured()) {
      try {
        const rows = projects.map((project, index) => projectToRow(project, index))
        await cmsWrite('projects', 'upsert', rows)
        await afterWrite(STORAGE_KEYS.projects)
        return true
      } catch (err) {
        console.error('projectsDB.saveAll:', err)
        return false
      }
    }
    saveData(STORAGE_KEYS.projects, projects)
    return true
  },
  async save(project, sortOrder = 0) {
    return this.saveAll([project])
  },
  async delete(id) {
    if (isApiConfigured()) {
      try {
        await cmsWrite('projects', 'delete', { id })
        await afterWrite(STORAGE_KEYS.projects)
        return true
      } catch {
        return false
      }
    }
    const stored = getData(STORAGE_KEYS.projects, []) || []
    saveData(STORAGE_KEYS.projects, stored.filter((p) => p.id !== id))
    return true
  },
  async clear() {
    if (isApiConfigured()) {
      try {
        await cmsWrite('projects', 'clear', {})
        await afterWrite(STORAGE_KEYS.projects)
        return true
      } catch {
        return false
      }
    }
    resetData(STORAGE_KEYS.projects)
    return true
  },
}

export const settingsDB = {
  async get() {
    if (isApiConfigured()) {
      try {
        return await fetchCmsTable('site_settings')
      } catch {
        return null
      }
    }
    return {
      company: getData(STORAGE_KEYS.company, null),
      social: getData(STORAGE_KEYS.social, null),
      stats: getData(STORAGE_KEYS.stats, null),
      team: getData(STORAGE_KEYS.team, null),
      section_images: getData(STORAGE_KEYS.section_images, null),
    }
  },
  async save(updates) {
    if (isApiConfigured()) {
      try {
        await cmsWrite('site_settings', 'save', updates)
        await afterWrite('site_settings')
        return true
      } catch {
        return false
      }
    }
    if (updates.company) saveData(STORAGE_KEYS.company, updates.company)
    if (updates.social) saveData(STORAGE_KEYS.social, updates.social)
    if (updates.stats) saveData(STORAGE_KEYS.stats, updates.stats)
    if (updates.team) saveData(STORAGE_KEYS.team, updates.team)
    if (updates.section_images) saveData(STORAGE_KEYS.section_images, updates.section_images)
    return true
  },
  async clearFields(fields) {
    if (isApiConfigured()) {
      const patch = {}
      for (const field of fields) patch[field] = null
      return this.save(patch)
    }
    const keyMap = {
      company: STORAGE_KEYS.company,
      social: STORAGE_KEYS.social,
      stats: STORAGE_KEYS.stats,
      team: STORAGE_KEYS.team,
      section_images: STORAGE_KEYS.section_images,
    }
    for (const field of fields) {
      if (keyMap[field]) resetData(keyMap[field])
    }
    return true
  },
}

export const translationsDB = {
  async get() {
    if (isApiConfigured()) {
      try {
        return await fetchCmsTable('translations')
      } catch {
        return null
      }
    }
    return getData(STORAGE_KEYS.translations, null)
  },
  async save(ar, en) {
    if (isApiConfigured()) {
      try {
        await cmsWrite('translations', 'save', { ar, en })
        await afterWrite(STORAGE_KEYS.translations)
        return true
      } catch {
        return false
      }
    }
    saveData(STORAGE_KEYS.translations, { ar, en })
    return true
  },
  async clear() {
    if (isApiConfigured()) {
      return this.save({}, {})
    }
    resetData(STORAGE_KEYS.translations)
    return true
  },
}

export const servicesDB = {
  async getAll() {
    if (isApiConfigured()) {
      try {
        const rows = await fetchCmsTable('services')
        return Array.isArray(rows) ? rows : []
      } catch {
        return []
      }
    }
    return getData(STORAGE_KEYS.services, []) || []
  },
  async saveAll(services) {
    if (isApiConfigured()) {
      try {
        const rows = services.map((service, index) => serviceToRow(service, index))
        await cmsWrite('services', 'upsert', rows)
        await afterWrite(STORAGE_KEYS.services)
        return true
      } catch {
        return false
      }
    }
    saveData(STORAGE_KEYS.services, services)
    return true
  },
  async delete(id) {
    if (isApiConfigured()) {
      try {
        await cmsWrite('services', 'delete', { id })
        await afterWrite(STORAGE_KEYS.services)
        return true
      } catch {
        return false
      }
    }
    const stored = getData(STORAGE_KEYS.services, []) || []
    saveData(STORAGE_KEYS.services, stored.filter((s) => s.id !== id))
    return true
  },
  async clear() {
    if (isApiConfigured()) {
      try {
        await cmsWrite('services', 'clear', {})
        await afterWrite(STORAGE_KEYS.services)
        return true
      } catch {
        return false
      }
    }
    resetData(STORAGE_KEYS.services)
    return true
  },
}

export const teamDB = {
  async save(team) {
    return settingsDB.save({ team: serializeTeam(team) })
  },
  async clear() {
    return settingsDB.clearFields(['team'])
  },
}

export const blogDB = {
  async getAll() {
    if (isApiConfigured()) {
      try {
        const rows = await fetchCmsTable('blog_posts')
        return Array.isArray(rows) ? rows : []
      } catch {
        return []
      }
    }
    return getData(STORAGE_KEYS.blog, []) || []
  },
  async saveAll(posts) {
    if (isApiConfigured()) {
      try {
        const rows = posts.map((post, index) => blogToRow(post, index))
        await cmsWrite('blog_posts', 'upsert', rows)
        await afterWrite(STORAGE_KEYS.blog)
        return true
      } catch {
        return false
      }
    }
    saveData(STORAGE_KEYS.blog, posts)
    return true
  },
  async delete(id) {
    if (isApiConfigured()) {
      try {
        await cmsWrite('blog_posts', 'delete', { id })
        await afterWrite(STORAGE_KEYS.blog)
        return true
      } catch {
        return false
      }
    }
    const stored = getData(STORAGE_KEYS.blog, []) || []
    saveData(STORAGE_KEYS.blog, stored.filter((p) => p.id !== id))
    return true
  },
  async clear() {
    if (isApiConfigured()) {
      try {
        await cmsWrite('blog_posts', 'clear', {})
        await afterWrite(STORAGE_KEYS.blog)
        return true
      } catch {
        return false
      }
    }
    resetData(STORAGE_KEYS.blog)
    return true
  },
}

export const sectionImagesDB = {
  async get() {
    if (isApiConfigured()) {
      const settings = await settingsDB.get()
      return settings?.section_images && typeof settings.section_images === 'object'
        ? settings.section_images
        : {}
    }
    return getData(STORAGE_KEYS.section_images, {}) || {}
  },
  async save(images) {
    return settingsDB.save({ section_images: images })
  },
  async clear() {
    return settingsDB.clearFields(['section_images'])
  },
}

function readLocalInquiries() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.inquiries)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeLocalInquiries(items) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEYS.inquiries, JSON.stringify(items))
}

export const inquiriesDB = {
  async insert(submission) {
    if (isApiConfigured()) {
      try {
        const type = submission.source === 'project_detail' ? 'booking' : 'contact'
        await submitInquiryApi({
          name: submission.name,
          phone: submission.phone,
          email: submission.email || null,
          message: submission.message || null,
          project_name: submission.project_name || null,
          district: submission.district || null,
          type,
        })
        return true
      } catch (err) {
        console.error('inquiriesDB.insert:', err)
      }
    }

    const row = {
      source: submission.source,
      name: submission.name,
      phone: submission.phone,
      email: submission.email || null,
      message: submission.message || null,
      project_name: submission.project_name || null,
      district: submission.district || null,
      status: 'new',
      id: `inq-${Date.now()}`,
      created_at: new Date().toISOString(),
    }
    writeLocalInquiries([row, ...readLocalInquiries()])
    return true
  },
  async getAll() {
    if (isApiConfigured()) {
      try {
        return await fetchInquiriesApi()
      } catch (err) {
        console.error('inquiriesDB.getAll:', err)
      }
    }
    return [...readLocalInquiries()].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    )
  },
  async updateStatus(id, status) {
    if (isApiConfigured()) {
      try {
        await updateInquiryStatusApi(id, status)
        return true
      } catch {
        return false
      }
    }
    const updated = readLocalInquiries().map((item) =>
      (String(item.id) === String(id) ? { ...item, status } : item),
    )
    writeLocalInquiries(updated)
    return true
  },
  async delete(id) {
    if (isApiConfigured()) {
      try {
        await deleteInquiryApi(id)
        return true
      } catch {
        return false
      }
    }
    writeLocalInquiries(readLocalInquiries().filter((item) => String(item.id) !== String(id)))
    return true
  },
  async countNew() {
    const all = await this.getAll()
    return all.filter((item) => item.status === 'new').length
  },
}
