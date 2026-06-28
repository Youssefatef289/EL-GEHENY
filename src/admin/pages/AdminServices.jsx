import { useEffect, useMemo, useState } from 'react'
import { baseServices, getServices } from '../../data/services'
import { servicesDB } from '../storage'
import { useAdminDataRevision } from '../useAdminDataRevision'
import { AdminPageHeader, BilingualInput, ConfirmDialog, useToast } from '../components/AdminUI'

export default function AdminServices() {
  const revision = useAdminDataRevision()
  const { showToast } = useToast()
  const services = useMemo(() => getServices(), [revision])
  const [draft, setDraft] = useState(services)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDraft(getServices())
  }, [revision])

  const handleSave = async () => {
    setSaving(true)
    const ok = await servicesDB.saveAll(draft)
    setSaving(false)
    if (ok) showToast('تم الحفظ بنجاح ✓')
    else showToast('فشل الحفظ — تحقق من إعداد Supabase', 'error')
  }

  const handleReset = async () => {
    setSaving(true)
    const ok = await servicesDB.clear()
    setSaving(false)
    if (ok) {
      setDraft(baseServices)
      showToast('تمت استعادة الخدمات الافتراضية ✓')
    } else {
      showToast('فشلت الاستعادة', 'error')
    }
  }

  const addService = () => {
    setDraft((prev) => [
      ...prev,
      {
        id: `service-${Date.now()}`,
        title: { ar: 'خدمة جديدة', en: 'New service' },
        description: { ar: '', en: '' },
      },
    ])
  }

  const removeService = async () => {
    const next = draft.filter((s) => s.id !== deleteId)
    setDraft(next)
    setDeleteId(null)
    await handleSave()
  }

  return (
    <div>
      <AdminPageHeader
        title="إدارة الخدمات"
        action={(
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={addService} className="admin-btn-secondary">إضافة خدمة</button>
            <button type="button" onClick={handleSave} disabled={saving} className="admin-btn-primary">
              {saving ? 'جاري الحفظ...' : 'حفظ'}
            </button>
            <button type="button" onClick={handleReset} disabled={saving} className="admin-btn-secondary">استعادة الافتراضي</button>
          </div>
        )}
      />
      <div className="space-y-4">
        {draft.map((service, index) => (
          <div key={service.id} className="admin-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#1a1a2e]">خدمة {index + 1}</h3>
              <button type="button" onClick={() => setDeleteId(service.id)} className="admin-btn-danger !px-3 !py-1.5">حذف</button>
            </div>
            <BilingualInput
              label="العنوان"
              value={service.title}
              onChange={(title) => setDraft((prev) => prev.map((s) => (s.id === service.id ? { ...s, title } : s)))}
            />
            <BilingualInput
              label="الوصف"
              value={service.description}
              onChange={(description) => setDraft((prev) => prev.map((s) => (s.id === service.id ? { ...s, description } : s)))}
              multiline
            />
          </div>
        ))}
      </div>
      <ConfirmDialog
        open={Boolean(deleteId)}
        title="حذف الخدمة"
        message="هل أنت متأكد من حذف هذه الخدمة؟"
        onCancel={() => setDeleteId(null)}
        onConfirm={removeService}
      />
    </div>
  )
}
