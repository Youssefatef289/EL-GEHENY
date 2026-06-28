import { useEffect, useMemo, useState } from 'react'
import { baseStats, getStats } from '../../data/site'
import { settingsDB } from '../storage'
import { useAdminDataRevision } from '../useAdminDataRevision'
import { AdminPageHeader, BilingualInput, useToast } from '../components/AdminUI'

export default function AdminStats() {
  const revision = useAdminDataRevision()
  const { showToast } = useToast()
  const stats = useMemo(() => getStats(), [revision])
  const [draft, setDraft] = useState(stats)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDraft(getStats())
  }, [revision])

  const updateItem = (index, patch) => {
    setDraft((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)))
  }

  const handleSave = async () => {
    setSaving(true)
    const ok = await settingsDB.save({ stats: draft })
    setSaving(false)
    if (ok) showToast('تم الحفظ بنجاح ✓')
    else showToast('فشل الحفظ — تحقق من إعداد Supabase', 'error')
  }

  const handleReset = async () => {
    setSaving(true)
    const ok = await settingsDB.clearFields(['stats'])
    setSaving(false)
    if (ok) {
      setDraft(baseStats)
      showToast('تمت استعادة الإحصائيات الافتراضية ✓')
    } else {
      showToast('فشلت الاستعادة', 'error')
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="إدارة الإحصائيات"
        action={(
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={handleSave} disabled={saving} className="admin-btn-primary">
              {saving ? 'جاري الحفظ...' : 'حفظ'}
            </button>
            <button type="button" onClick={handleReset} disabled={saving} className="admin-btn-secondary">استعادة الافتراضي</button>
          </div>
        )}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {draft.map((stat, index) => (
          <div key={index} className="admin-card space-y-4">
            <h3 className="font-bold text-[#1a1a2e]">إحصائية {index + 1}</h3>
            <label className="block space-y-1">
              <span className="text-sm font-bold">القيمة</span>
              <input
                type="number"
                step="0.1"
                className="admin-input"
                value={stat.value}
                onChange={(e) => updateItem(index, { value: Number(e.target.value) })}
              />
            </label>
            <BilingualInput
              label="اللاحقة suffix"
              value={stat.suffix}
              onChange={(suffix) => updateItem(index, { suffix })}
            />
            <BilingualInput
              label="التسمية label"
              value={stat.label}
              onChange={(label) => updateItem(index, { label })}
            />
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={Boolean(stat.decimals)}
                onChange={(e) => updateItem(index, { decimals: e.target.checked ? 1 : 0 })}
              />
              عرض كسور عشرية
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
