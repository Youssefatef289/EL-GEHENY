import { supabase, isSupabaseConfigured } from '../lib/supabase'
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
  return !isSupabaseConfigured()
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
  if (isSupabaseConfigured()) {
    await refreshSiteData(key)
  } else {
    notifySiteDataUpdated(key)
  }
}

export const projectsDB = {
  async getAll() {
    if (!supabase) {
      const stored = getData(STORAGE_KEYS.projects, null)
      return Array.isArray(stored) ? stored : []
    }
    const { data, error } = await supabase.from('projects').select('*').order('sort_order')
    if (error || !data?.length) return []
    return data.map(rowToProject)
  },
  async saveAll(projects) {
    if (!supabase) {
      saveData(STORAGE_KEYS.projects, projects)
      return true
    }
    const rows = projects.map((project, index) => projectToRow(project, index))
    const { error } = await supabase.from('projects').upsert(rows, { onConflict: 'id' })
    if (!error) await afterWrite(STORAGE_KEYS.projects)
    return !error
  },
  async save(project, sortOrder = 0) {
    if (!supabase) return false
    const { error } = await supabase
      .from('projects')
      .upsert(projectToRow(project, sortOrder), { onConflict: 'id' })
    if (!error) await afterWrite(STORAGE_KEYS.projects)
    return !error
  },
  async delete(id) {
    if (!supabase) return false
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (!error) await afterWrite(STORAGE_KEYS.projects)
    return !error
  },
  async clear() {
    if (!supabase) {
      resetData(STORAGE_KEYS.projects)
      return true
    }
    const { error } = await supabase.from('projects').delete().gte('sort_order', -1)
    if (!error) await afterWrite(STORAGE_KEYS.projects)
    return !error
  },
}

export const settingsDB = {
  async get() {
    if (!supabase) return null
    const { data } = await supabase.from('site_settings').select('*').eq('id', 'main').maybeSingle()
    return data
  },
  async save(updates) {
    if (!supabase) {
      if (updates.company) saveData(STORAGE_KEYS.company, updates.company)
      if (updates.social) saveData(STORAGE_KEYS.social, updates.social)
      if (updates.stats) saveData(STORAGE_KEYS.stats, updates.stats)
      if (updates.team) saveData(STORAGE_KEYS.team, updates.team)
      if (updates.section_images) saveData(STORAGE_KEYS.section_images, updates.section_images)
      return true
    }
    const { error } = await supabase.from('site_settings').upsert({
      id: 'main',
      ...updates,
      updated_at: new Date().toISOString(),
    })
    if (!error) await afterWrite('site_settings')
    return !error
  },
  async clearFields(fields) {
    const current = (await this.get()) || { id: 'main' }
    const patch = { id: 'main' }
    for (const field of fields) {
      patch[field] = null
    }
    if (!supabase) {
      for (const field of fields) {
        const keyMap = {
          company: STORAGE_KEYS.company,
          social: STORAGE_KEYS.social,
          stats: STORAGE_KEYS.stats,
          team: STORAGE_KEYS.team,
          section_images: STORAGE_KEYS.section_images,
        }
        if (keyMap[field]) resetData(keyMap[field])
      }
      return true
    }
    const { error } = await supabase.from('site_settings').upsert({
      ...current,
      ...patch,
      updated_at: new Date().toISOString(),
    })
    if (!error) await afterWrite('site_settings')
    return !error
  },
}

export const translationsDB = {
  async get() {
    if (!supabase) return null
    const { data } = await supabase.from('translations').select('*').eq('id', 'main').maybeSingle()
    return data
  },
  async save(ar, en) {
    if (!supabase) {
      saveData(STORAGE_KEYS.translations, { ar, en })
      return true
    }
    const { error } = await supabase.from('translations').upsert({
      id: 'main',
      ar,
      en,
      updated_at: new Date().toISOString(),
    })
    if (!error) await afterWrite(STORAGE_KEYS.translations)
    return !error
  },
  async clear() {
    if (!supabase) {
      resetData(STORAGE_KEYS.translations)
      return true
    }
    const { error } = await supabase.from('translations').upsert({
      id: 'main',
      ar: {},
      en: {},
      updated_at: new Date().toISOString(),
    })
    if (!error) await afterWrite(STORAGE_KEYS.translations)
    return !error
  },
}

export const servicesDB = {
  async getAll() {
    if (!supabase) return []
    const { data } = await supabase.from('services').select('*').order('sort_order')
    return data || []
  },
  async saveAll(services) {
    if (!supabase) {
      saveData(STORAGE_KEYS.services, services)
      return true
    }
    const rows = services.map((service, index) => serviceToRow(service, index))
    const { error } = await supabase.from('services').upsert(rows, { onConflict: 'id' })
    if (!error) await afterWrite(STORAGE_KEYS.services)
    return !error
  },
  async delete(id) {
    if (!supabase) return false
    const { error } = await supabase.from('services').delete().eq('id', id)
    if (!error) await afterWrite(STORAGE_KEYS.services)
    return !error
  },
  async clear() {
    if (!supabase) {
      resetData(STORAGE_KEYS.services)
      return true
    }
    const { error } = await supabase.from('services').delete().gte('sort_order', -1)
    if (!error) await afterWrite(STORAGE_KEYS.services)
    return !error
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
    if (!supabase) return []
    const { data } = await supabase.from('blog_posts').select('*').order('sort_order')
    return data || []
  },
  async saveAll(posts) {
    if (!supabase) {
      saveData(STORAGE_KEYS.blog, posts)
      return true
    }
    const rows = posts.map((post, index) => blogToRow(post, index))
    const { error } = await supabase.from('blog_posts').upsert(rows, { onConflict: 'id' })
    if (!error) await afterWrite(STORAGE_KEYS.blog)
    return !error
  },
  async delete(id) {
    if (!supabase) return false
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (!error) await afterWrite(STORAGE_KEYS.blog)
    return !error
  },
  async clear() {
    if (!supabase) {
      resetData(STORAGE_KEYS.blog)
      return true
    }
    const { error } = await supabase.from('blog_posts').delete().gte('sort_order', -1)
    if (!error) await afterWrite(STORAGE_KEYS.blog)
    return !error
  },
}

export const sectionImagesDB = {
  async get() {
    if (!supabase) {
      return getData(STORAGE_KEYS.section_images, {}) || {}
    }
    const settings = await settingsDB.get()
    return settings?.section_images && typeof settings.section_images === 'object'
      ? settings.section_images
      : {}
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
    const row = {
      source: submission.source,
      name: submission.name,
      phone: submission.phone,
      email: submission.email || null,
      message: submission.message || null,
      project_name: submission.project_name || null,
      district: submission.district || null,
      status: 'new',
    }

    const item = {
      ...row,
      id: `inq-${Date.now()}`,
      created_at: new Date().toISOString(),
    }
    writeLocalInquiries([item, ...readLocalInquiries()])

    if (supabase) {
      await supabase.from('form_submissions').insert(row)
    }

    return true
  },
  async getAll() {
    const local = [...readLocalInquiries()].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    )

    if (!supabase) return local

    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data?.length) return local

    const remoteIds = new Set(data.map((item) => String(item.id)))
    const merged = [
      ...data,
      ...local.filter((item) => !remoteIds.has(String(item.id))),
    ]
    return merged.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  },
  async updateStatus(id, status) {
    const updated = readLocalInquiries().map((item) =>
      (String(item.id) === String(id) ? { ...item, status } : item),
    )
    writeLocalInquiries(updated)

    if (supabase) {
      await supabase.from('form_submissions').update({ status }).eq('id', id)
    }

    return true
  },
  async delete(id) {
    writeLocalInquiries(readLocalInquiries().filter((item) => String(item.id) !== String(id)))

    if (supabase) {
      await supabase.from('form_submissions').delete().eq('id', id)
    }

    return true
  },
  async countNew() {
    const all = await this.getAll()
    return all.filter((item) => item.status === 'new').length
  },
}
