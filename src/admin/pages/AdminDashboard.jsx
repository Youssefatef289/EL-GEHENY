import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProjectsSync } from '../../data/projects'
import { getBlogPosts } from '../../data/blog'
import { getServices } from '../../data/services'
import { getTeamMembers, getFounder } from '../../data/team'
import { isSupabaseConfigured } from '../../lib/supabase'
import { seedDatabase } from '../seedData'
import { inquiriesDB } from '../storage'
import { AdminPageHeader, useToast } from '../components/AdminUI'

export default function AdminDashboard() {
  const founder = getFounder()
  const { showToast } = useToast()
  const [seeding, setSeeding] = useState(false)
  const [newInquiries, setNewInquiries] = useState(0)
  const supabaseReady = isSupabaseConfigured()

  useEffect(() => {
    inquiriesDB.countNew().then(setNewInquiries).catch(() => {})
  }, [])

  const cards = [
    { to: '/admin/inquiries', label: 'طلبات جديدة', icon: 'fa-inbox', count: () => newInquiries, highlight: true },
    { to: '/admin/projects', label: 'المشاريع', icon: 'fa-building', count: () => getProjectsSync().length },
    { to: '/admin/blog', label: 'مقالات المدونة', icon: 'fa-newspaper', count: () => getBlogPosts().length },
    { to: '/admin/services', label: 'الخدمات', icon: 'fa-briefcase', count: () => getServices().length },
    { to: '/admin/team', label: 'فريق الإدارة', icon: 'fa-users', count: () => getTeamMembers().length + 1 },
  ]

  const handleSeed = async () => {
    if (!window.confirm('سيتم رفع البيانات الافتراضية إلى Supabase. متابعة؟')) return
    setSeeding(true)
    try {
      await seedDatabase()
      showToast('✅ تم رفع البيانات الأولية بنجاح')
    } catch (err) {
      showToast(err.message || 'فشل رفع البيانات', 'error')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="لوحة التحكم"
        subtitle="مرحباً بك — يمكنك إدارة محتوى موقع الجهيني من هنا."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className={`admin-card block transition hover:-translate-y-0.5 ${card.highlight && newInquiries > 0 ? 'ring-2 ring-emerald-400' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-[#1a1a2e]">{card.count()}</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c8a95a]/15 text-[#c8a95a]">
                <i className={`fa-solid ${card.icon}`} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="admin-card mt-6 space-y-3">
        <h2 className="text-lg font-bold text-[#1a1a2e]">نظرة سريعة</h2>
        <p className="text-sm text-gray-600">
          المؤسس: <strong>{founder.name.ar}</strong>
        </p>
        <p className="text-sm text-gray-600">
          {supabaseReady
            ? sessionStorage.getItem('admin_supabase_offline') === '1'
              ? '⚠️ Supabase متوقف مؤقتاً — التعديلات تُحفظ محلياً في هذا المتصفح فقط.'
              : 'التعديلات تُحفظ في Supabase وتظهر لجميع الزوار على أي جهاز.'
            : '⚠️ Supabase غير مُعد — أضف VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env'}
        </p>
        {supabaseReady && (
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="admin-btn-secondary"
          >
            {seeding ? 'جاري الرفع...' : 'رفع البيانات الأولية إلى Supabase'}
          </button>
        )}
      </div>
    </div>
  )
}
