import { Navigate, Route, Routes } from 'react-router-dom'
import AdminRoute from './AdminRoute'
import AdminLayout from './AdminLayout'
import AdminLogin from './AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminProjects from './pages/AdminProjects'
import AdminSections from './pages/AdminSections'
import AdminServices from './pages/AdminServices'
import AdminStats from './pages/AdminStats'
import AdminTeam from './pages/AdminTeam'
import AdminBlog from './pages/AdminBlog'
import AdminSettings from './pages/AdminSettings'
import AdminInquiries from './pages/AdminInquiries'

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        element={(
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        )}
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="sections" element={<AdminSections />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="stats" element={<AdminStats />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  )
}
