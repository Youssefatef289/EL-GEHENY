import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from './auth'

export default function AdminRoute({ children }) {
  const location = useLocation()
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }
  return children
}
