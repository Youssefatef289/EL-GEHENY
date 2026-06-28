import { useEffect, useState } from 'react'
import { getProjects, baseProjects } from '../data/projects'
import { useAdminDataRevision } from '../admin/useAdminDataRevision'

export function useProjectsList() {
  const revision = useAdminDataRevision()
  const [projects, setProjects] = useState(baseProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getProjects().then((list) => {
      if (!cancelled) {
        setProjects(list)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [revision])

  return { projects, loading }
}
