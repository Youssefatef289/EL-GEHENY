import { useEffect, useState } from 'react'
import { getSiteCache } from '../lib/siteDataCache'
import { isSupabaseConfigured } from '../lib/supabase'
import { baseCompany, baseStats } from '../data/site'
import { translations as defaultTranslations } from '../i18n/translations'
import { baseProjects } from '../data/projects'
import { resolveSectionImage, defaultSectionImages } from '../data/sectionImages'
import { deepMerge } from '../lib/deepMerge'

function useSiteDataRevision() {
  const [revision, setRevision] = useState(0)
  useEffect(() => {
    const handler = () => setRevision((n) => n + 1)
    window.addEventListener('admin-data-updated', handler)
    return () => window.removeEventListener('admin-data-updated', handler)
  }, [])
  return revision
}

export function useCompany() {
  useSiteDataRevision()
  const cached = getSiteCache().company
  if (!cached) return baseCompany
  return { ...baseCompany, ...cached }
}

export function useStats() {
  useSiteDataRevision()
  const cached = getSiteCache().stats
  return cached?.length ? cached : baseStats
}

export function useTranslationOverrides() {
  useSiteDataRevision()
  return getSiteCache().translationOverrides
}

export function useTranslations() {
  useSiteDataRevision()
  const overrides = getSiteCache().translationOverrides
  if (!overrides?.ar && !overrides?.en) return defaultTranslations
  return {
    ar: deepMerge(defaultTranslations.ar, overrides.ar || {}),
    en: deepMerge(defaultTranslations.en, overrides.en || {}),
  }
}

export function useSiteDataLoaded() {
  useSiteDataRevision()
  return getSiteCache().loaded
}

export function useProjects() {
  useSiteDataRevision()
  const cache = getSiteCache()
  if (cache.projects?.length) return cache.projects
  if (isSupabaseConfigured() && !cache.loaded) return []
  return baseProjects
}

export function useServices() {
  useSiteDataRevision()
  return getSiteCache().services
}

export function useBlogPosts() {
  useSiteDataRevision()
  return getSiteCache().blog
}

export function useTeamData() {
  useSiteDataRevision()
  return getSiteCache().team
}

export function useSectionImages() {
  useSiteDataRevision()
  const overrides = getSiteCache().sectionImages || {}
  return resolveSectionImagesMap(overrides)
}

export function useSectionImage(key) {
  const images = useSectionImages()
  return images[key] || defaultSectionImages[key] || ''
}

function resolveSectionImagesMap(overrides) {
  return Object.fromEntries(
    Object.keys(defaultSectionImages).map((key) => [key, resolveSectionImage(key, overrides)]),
  )
}
