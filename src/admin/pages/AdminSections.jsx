import { useEffect, useMemo, useState } from 'react'
import { translations } from '../../i18n/translations'
import {
  defaultSectionImages,
  defaultSectionImageLists,
} from '../../data/sectionImages'
import { translationsDB, sectionImagesDB } from '../storage'
import { getSiteCache } from '../../lib/siteDataCache'
import {
  uploadSectionImage,
  coverPreviewUrl,
  normalizeImageList,
  uploadResultMessage,
} from '../../lib/uploadImage'
import { useAdminDataRevision } from '../useAdminDataRevision'
import { SECTION_CONFIG, getByPath } from '../sectionConfig'
import { AdminPageHeader, ImageUploadField, useToast } from '../components/AdminUI'
import { ProjectImageListField } from '../components/ProjectImageListField'

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

function getImagesFromCache() {
  const cached = getSiteCache().sectionImages
  return cached && typeof cached === 'object' ? { ...cached } : {}
}

function readImageValue(draft, key) {
  const custom = draft?.[key]
  if (typeof custom === 'string' && custom.trim()) return custom.trim()
  return defaultSectionImages[key] || ''
}

function readImageListValue(draft, key) {
  const custom = draft?.[key]
  if (Array.isArray(custom) && custom.length > 0) {
    return normalizeImageList(custom)
  }
  return normalizeImageList(defaultSectionImageLists[key] || [])
}

export default function AdminSections() {
  const revision = useAdminDataRevision()
  const { showToast } = useToast()
  const overrides = useMemo(() => getOverridesFromCache(), [revision])
  const [activeId, setActiveId] = useState(SECTION_CONFIG[0].id)
  const [draft, setDraft] = useState(overrides)
  const [imageDraft, setImageDraft] = useState(() => getImagesFromCache())
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDraft(getOverridesFromCache())
    setImageDraft(getImagesFromCache())
  }, [revision])

  const section = SECTION_CONFIG.find((s) => s.id === activeId)
  const hasImages = (section?.images?.length ?? 0) > 0 || (section?.imageLists?.length ?? 0) > 0

  const handleSave = async () => {
    setSaving(true)
    const [textOk, imagesOk] = await Promise.all([
      translationsDB.save(draft.ar || {}, draft.en || {}),
      sectionImagesDB.save(imageDraft),
    ])
    setSaving(false)
    if (textOk && imagesOk) showToast('تم الحفظ بنجاح ✓')
    else showToast('فشل الحفظ — تحقق من إعداد Supabase', 'error')
  }

  const handleReset = async () => {
    setSaving(true)
    const [textOk, imagesOk] = await Promise.all([
      translationsDB.clear(),
      sectionImagesDB.clear(),
    ])
    setSaving(false)
    if (textOk && imagesOk) {
      setDraft({ ar: {}, en: {} })
      setImageDraft({})
      showToast('تمت استعادة الافتراضي ✓')
    } else {
      showToast('فشلت الاستعادة', 'error')
    }
  }

  const updateImage = (key, url) => {
    setImageDraft((prev) => {
      const next = { ...prev }
      if (!url) delete next[key]
      else next[key] = url
      return next
    })
  }

  const updateImageList = (key, urls) => {
    setImageDraft((prev) => {
      const next = { ...prev }
      if (!urls?.length) delete next[key]
      else next[key] = urls
      return next
    })
  }

  const handleImageUpload = async (file, imageKey) => {
    const result = await uploadSectionImage(file, activeId, imageKey)
    showToast(uploadResultMessage(result))
    return result.url
  }

  return (
    <div>
      <AdminPageHeader
        title="إدارة السيكشنز"
        subtitle="تعديل نصوص وصور كل أقسام الموقع"
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
        <div className="admin-card max-h-[70vh] space-y-2 overflow-y-auto p-3">
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
        <div className="space-y-6">
          {(hasImages || section?.imagesNote) && (
            <div className="admin-card space-y-5">
              <h3 className="text-lg font-bold text-[#1a1a2e]">صور القسم</h3>
              {section?.images?.map((field) => (
                <ImageUploadField
                  key={field.key}
                  label={field.label}
                  value={coverPreviewUrl(readImageValue(imageDraft, field.key))}
                  onChange={(url) => updateImage(field.key, url)}
                  onUpload={(file) => handleImageUpload(file, field.key)}
                  hint="ارفع صورة جديدة أو عدّل الرابط ثم اضغط «حفظ»."
                />
              ))}
              {section?.imageLists?.map((field) => (
                <ProjectImageListField
                  key={field.key}
                  label={field.label}
                  description={field.description}
                  images={readImageListValue(imageDraft, field.key)}
                  onChange={(urls) => updateImageList(field.key, urls)}
                  onUpload={(file) => handleImageUpload(file, field.key)}
                />
              ))}
              {section?.imagesNote && (
                <p className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">{section.imagesNote}</p>
              )}
            </div>
          )}

          {section?.fields?.length > 0 && (
            <div className="admin-card space-y-5">
              <h3 className="text-lg font-bold text-[#1a1a2e]">نصوص القسم</h3>
              {section.fields.map((field) => (
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
          )}
        </div>
      </div>
    </div>
  )
}
