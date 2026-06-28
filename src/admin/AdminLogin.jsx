import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated, adminLogin } from './auth'

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const from = location.state?.from || '/admin/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await adminLogin(username.trim(), password)
    setLoading(false)
    if (!result.success && !result.ok) {
      setError(result.error || 'بيانات الدخول غير صحيحة')
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[#0f0f1a] px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#c8a95a]/30 bg-[#1a1a2e] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold text-[#c8a95a]">لوحة التحكم</p>
          <h1 className="mt-2 text-2xl font-bold text-white">الجهيني للتطوير العقاري</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-white/80">اسم المستخدم</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="admin-input w-full bg-[#0f0f1a] text-white"
              autoComplete="username"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-white/80">كلمة المرور</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input w-full bg-[#0f0f1a] text-white"
              autoComplete="current-password"
            />
          </label>
          {error && <p className="text-sm font-semibold text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="admin-btn-primary w-full">
            {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  )
}
