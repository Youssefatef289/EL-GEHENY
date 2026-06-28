import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations as baseTranslations } from './translations'
import { getSiteCache } from '../lib/siteDataCache'
import { deepMerge } from '../lib/deepMerge'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'elgeheny-lang'

function getInitialLang() {
  if (typeof window === 'undefined') return 'ar'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === 'en' || saved === 'ar' ? saved : 'ar'
}

function resolvePath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), obj)
}

function getMergedTranslations(lang) {
  const overrides = getSiteCache().translationOverrides
  if (!overrides) return baseTranslations[lang]
  return deepMerge(baseTranslations[lang], overrides[lang] || {})
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)
  const [revision, setRevision] = useState(0)

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const onUpdate = () => setRevision((n) => n + 1)
    window.addEventListener('admin-data-updated', onUpdate)
    return () => window.removeEventListener('admin-data-updated', onUpdate)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    root.classList.toggle('lang-en', lang === 'en')
    root.classList.toggle('lang-ar', lang === 'ar')
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang, dir])

  const setLang = (next) => setLangState(next === 'en' ? 'en' : 'ar')
  const toggleLang = () => setLangState((cur) => (cur === 'ar' ? 'en' : 'ar'))

  const t = (path) => {
    const bundle = getMergedTranslations(lang)
    const value = resolvePath(bundle, path)
    if (value == null) {
      const fallback = resolvePath(getMergedTranslations('ar'), path)
      return fallback == null ? path : fallback
    }
    return value
  }

  const value = useMemo(() => ({ lang, dir, setLang, toggleLang, t }), [lang, dir, revision])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}

export function L(value, lang) {
  if (value && typeof value === 'object' && ('ar' in value || 'en' in value)) {
    return value[lang] ?? value.ar ?? value.en
  }
  return value
}
