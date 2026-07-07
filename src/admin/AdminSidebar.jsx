import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from './auth'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'fa-gauge-high' },
  { to: '/admin/projects', label: 'المشاريع', icon: 'fa-building' },
  { to: '/admin/sections', label: 'السيكشنز', icon: 'fa-layer-group' },
  { to: '/admin/services', label: 'الخدمات', icon: 'fa-briefcase' },
  { to: '/admin/stats', label: 'الإحصائيات', icon: 'fa-chart-line' },
  { to: '/admin/team', label: 'الفريق', icon: 'fa-users' },
  { to: '/admin/blog', label: 'المدونة', icon: 'fa-newspaper' },
  { to: '/admin/inquiries', label: 'طلبات العملاء', icon: 'fa-inbox' },
  { to: '/admin/settings', label: 'إعدادات', icon: 'fa-gear' },
]

export default function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="إغلاق القائمة"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 start-0 z-50 flex w-72 flex-col bg-[#0f0f1a] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full lg:rtl:translate-x-0'
        }`}
      >
        <div className="border-b border-white/10 px-6 py-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8a95a]">Admin</p>
          <h2 className="mt-2 text-lg font-bold">الجهيني للتطوير العقاري</h2>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#c8a95a] text-[#0f0f1a]'
                    : 'text-white/75 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <i className={`fa-solid ${link.icon} w-5 text-center`} aria-hidden="true" />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/75 hover:bg-white/5 hover:text-white"
          >
            <i className="fa-solid fa-arrow-up-right-from-square w-5 text-center" aria-hidden="true" />
            معاينة الموقع
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/10"
          >
            <i className="fa-solid fa-right-from-bracket w-5 text-center" aria-hidden="true" />
            تسجيل الخروج
          </button>
        </div>
      </aside>
    </>
  )
}
