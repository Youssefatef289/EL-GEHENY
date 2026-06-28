import { useEffect, useState } from 'react'

export function useAdminDataRevision() {
  const [revision, setRevision] = useState(0)
  useEffect(() => {
    const handler = () => setRevision((n) => n + 1)
    window.addEventListener('admin-data-updated', handler)
    return () => window.removeEventListener('admin-data-updated', handler)
  }, [])
  return revision
}
