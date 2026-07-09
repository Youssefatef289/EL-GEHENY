import { useEffect } from 'react'
import { loadSiteData } from '../lib/siteDataLoader'

export function SiteDataProvider({ children }) {
  useEffect(() => {
    loadSiteData()

    const onUpdate = () => {
      loadSiteData()
    }
    window.addEventListener('admin-data-updated', onUpdate)
    return () => window.removeEventListener('admin-data-updated', onUpdate)
  }, [])

  return children
}
