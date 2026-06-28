import { useEffect } from 'react'
import { loadSiteDataFromSupabase } from '../lib/siteDataLoader'

export function SiteDataProvider({ children }) {
  useEffect(() => {
    loadSiteDataFromSupabase()

    const onUpdate = () => {
      loadSiteDataFromSupabase()
    }
    window.addEventListener('admin-data-updated', onUpdate)
    return () => window.removeEventListener('admin-data-updated', onUpdate)
  }, [])

  return children
}
