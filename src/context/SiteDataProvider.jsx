import { useEffect } from 'react'
import { loadSiteDataFromSupabase } from '../lib/siteDataLoader'
import { isSupabaseConfigured } from '../lib/supabase'

export function SiteDataProvider({ children }) {
  useEffect(() => {
    loadSiteDataFromSupabase()

    const onUpdate = () => {
      loadSiteDataFromSupabase()
    }
    window.addEventListener('admin-data-updated', onUpdate)
    return () => window.removeEventListener('admin-data-updated', onUpdate)
  }, [])

  if (!isSupabaseConfigured()) {
    return children
  }

  return children
}
