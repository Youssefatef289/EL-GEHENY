import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { ToastProvider } from './components/AdminUI'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ToastProvider>
      <div dir="rtl" className="admin-shell flex min-h-screen bg-[#f4f5f8]">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 lg:px-8">
            <button
              type="button"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-[#1a1a2e] lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <i className="fa-solid fa-bars" aria-hidden="true" />
            </button>
            <p className="text-sm font-semibold text-gray-500">لوحة تحكم الموقع</p>
            <span className="hidden text-xs font-bold text-[#c8a95a] lg:inline">El-Geheny Admin</span>
          </header>
          <main className="flex-1 p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
