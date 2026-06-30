const emptyCache = {
  loaded: false,
  loading: false,
  projects: null,
  translationOverrides: null,
  company: null,
  social: null,
  stats: null,
  team: null,
  services: null,
  blog: null,
  sectionImages: null,
}

let cache = { ...emptyCache }

export function getSiteCache() {
  return cache
}

export function setSiteCache(partial) {
  cache = { ...cache, ...partial, loaded: true }
}

export function resetSiteCache() {
  cache = { ...emptyCache }
}

export function notifySiteDataUpdated(key) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('admin-data-updated', { detail: { key } }))
}
