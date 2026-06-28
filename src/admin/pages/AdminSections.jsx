import { useEffect, useMemo, useState } from 'react'
import { translations } from '../../i18n/translations'
import { translationsDB } from '../storage'
import { getSiteCache } from '../../lib/siteDataCache'
import { useAdminDataRevision } from '../useAdminDataRevision'
import { SECTION_CONFIG, getByPath } from '../sectionConfig'
import { AdminPageHeader, useToast } from '../components/AdminUI'

function readValue(overrides, lang, path) {
  const custom = getByPath(overrides?.[lang], path)
  if (custom != null) return custom
  return getByPath(translations[lang], path) ?? ''
}

function writeValue(overrides, lang, path, value) {
  const keys = path.split('.')
  const langTree = { ...(overrides[lang] || {}) }
  let cursor = langTree
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i]
    const next = keys[i + 1]
    if (cursor[key] == null) {
      cursor[key] = Number.isInteger(Number(next)) ? [] : {}
    } else if (Array.isArray(cursor[key])) {
      cursor[key] = [...cursor[key]]
    } else {
      cursor[key] = { ...cursor[key] }
    }
    cursor = cursor[key]
  }
  cursor[keys[keys.length - 1]] = value
  return { ...overrides, [lang]: langTree }
}

function getOverridesFromCache() {
  const cached = getSiteCache().translationOverrides
  return cached ?? { ar: {}, en: {} }
}

export default function AdminSections() {
  const revision = useAdminDataRevision()
  const { showToast } = useToast()
  const overrides = useMemo(() => getOverridesFromCache(), [revision])
  const [activeId, setActiveId] = useState(SECTION_CONFIG[0].id)
  const [draft, setDraft] = useState(overrides)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDraft(getOverridesFromCache())
  }, [revision])

  const section = SECTION_CONFIG.find((s) => s.id === activeId)

  const handleSave = async () => {
    setSaving(true)
    const ok = await translationsDB.save(draft.ar || {}, draft.en || {})
    setSaving(false)
    if (ok) showToast('تم الحفظ بنجاح ✓')
    else showToast('فشل الحفظ — تحقق من إعداد Supabase', 'error')
  }

  const handleReset = async () => {
    setSaving(true)
    const ok = await translationsDB.clear()
    setSaving(false)
    if (ok) {
      setDraft({ ar: {}, en: {} })
      showToast('تمت استعادة النصوص الافتراضية ✓')
    } else {
      showToast('فشلت الاستعادة', 'error')
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="إدارة السيكشنز"
        subtitle="تعديل نصوص الصفحة الرئيسية والأقسام"
        action={(
          <div className="flex flex-wrap gap-2">
            <a href={section?.preview || '/'} target="_blank" rel="noreferrer" className="admin-btn-secondary">معاينة</a>
            <button type="button" onClick={handleSave} disabled={saving} className="admin-btn-primary">
              {saving ? 'جاري الحفظ...' : 'حفظ'}
            </button>
            <button type="button" onClick={handleReset} disabled={saving} className="admin-btn-secondary">استعادة الافتراضي</button>
          </div>
        )}
      />
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <div className="admin-card space-y-2 p-3">
          {SECTION_CONFIG.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`w-full rounded-xl px-4 py-3 text-start text-sm font-semibold ${
                activeId === item.id ? 'bg-[#c8a95a] text-[#0f0f1a]' : 'hover:bg-gray-100 text-[#1a1a2e]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="admin-card space-y-5">
          {section?.fields.map((field) => (
            <div key={field.key} className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-1 sm:col-span-2">
                <span className="text-sm font-bold text-[#1a1a2e]">{field.label}</span>
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-semibold text-gray-500">عربي</span>
                <input
                  className="admin-input"
                  value={readValue(draft, 'ar', field.key)}
                  onChange={(e) => setDraft((prev) => writeValue(prev, 'ar', field.key, e.target.value))}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-semibold text-gray-500">English</span>
                <input
                  className="admin-input"
                  dir="ltr"
                  value={readValue(draft, 'en', field.key)}
                  onChange={(e) => setDraft((prev) => writeValue(prev, 'en', field.key, e.target.value))}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
