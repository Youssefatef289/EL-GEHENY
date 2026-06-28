import { useMemo, useState, useEffect } from 'react'
import { baseProjects } from '../../data/projects'
import {
  uploadProjectCover,
  uploadProjectImage,
  coverPreviewUrl,
  normalizeImageList,
  uploadResultMessage,
} from '../../lib/uploadImage'
import { projectsDB } from '../storage'
import { useAdminDataRevision } from '../useAdminDataRevision'
import { AdminPageHeader, BilingualInput, ConfirmDialog, ImageUploadField, useToast } from '../components/AdminUI'
import { ProjectImageListField } from '../components/ProjectImageListField'
import { ProjectDivisionsField } from '../components/ProjectDivisionsField'

const emptyUnitDivisions = () => ({ ground: [], repeated: [], roof: [] })

const emptyProject = () => ({
  id: `project-${Date.now()}`,
  title: { ar: '', en: '' },
  location: { ar: '', en: '' },
  deliveryStatus: { ar: 'تحت الإنشاء', en: 'Under construction' },
  progress: 0,
  description: { ar: '', en: '' },
  shortDescription: { ar: '', en: '' },
  features: [],
  category: 'hay-thani',
  categoryName: { ar: 'بيت الوطن', en: 'Beit El-Watan' },
  type: { ar: 'مشروع سكني', en: 'Residential project' },
  area: { ar: '', en: '' },
  units: { ar: '', en: '' },
  statusKey: 'in-progress',
  cover: '',
  gallery: [],
  unitDivisions: emptyUnitDivisions(),
})

function initProjectForm(project) {
  return {
    ...project,
    cover: coverPreviewUrl(project.cover),
    gallery: normalizeImageList(project.gallery),
    unitDivisions: project.unitDivisions ?? emptyUnitDivisions(),
  }
}

function prepareProjectForSave(form) {
  const data = { ...form }
  const hasDivisions = ['ground', 'repeated', 'roof'].some(
    (key) => (data.unitDivisions?.[key]?.length ?? 0) > 0,
  )
  if (!hasDivisions) delete data.unitDivisions
  if (!data.gallery?.length) data.gallery = []
  return data
}

function ProjectForm({ project, onSave, onCancel, saving }) {
  const { showToast } = useToast()
  const [form, setForm] = useState(() => initProjectForm(project))
  const [featureAr, setFeatureAr] = useState('')
  const [featureEn, setFeatureEn] = useState('')

  const addFeature = () => {
    if (!featureAr.trim() && !featureEn.trim()) return
    setForm((prev) => ({
      ...prev,
      features: [...(prev.features || []), { ar: featureAr, en: featureEn }],
    }))
    setFeatureAr('')
    setFeatureEn('')
  }

  const removeFeature = (index) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const handleCoverUpload = async (file) => {
    const result = await uploadProjectCover(file, form.id)
    showToast(uploadResultMessage(result))
    return result.url
  }

  const handleGalleryUpload = async (file) => uploadProjectImage(file, form.id, 'gallery')

  const handleDivisionUpload = async (file, type) => uploadProjectImage(file, form.id, `division-${type}`)

  return (
    <div className="space-y-6">
      <div className="admin-card space-y-6">
        <h2 className="text-xl font-bold text-[#1a1a2e]">{project.id ? 'تعديل مشروع' : 'إضافة مشروع'}</h2>
        <BilingualInput label="العنوان" value={form.title} onChange={(title) => setForm({ ...form, title })} />
        <BilingualInput label="الوصف" value={form.description} onChange={(description) => setForm({ ...form, description })} multiline />
        <BilingualInput label="الموقع" value={form.location} onChange={(location) => setForm({ ...form, location })} />
        <BilingualInput label="الحالة" value={form.deliveryStatus} onChange={(deliveryStatus) => setForm({ ...form, deliveryStatus })} />
        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#1a1a2e]">نسبة الإنجاز: {form.progress ?? 0}%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={form.progress ?? 0}
            onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
            className="w-full"
          />
        </label>
        <div className="space-y-3">
          <p className="text-sm font-bold text-[#1a1a2e]">المميزات</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={featureAr} onChange={(e) => setFeatureAr(e.target.value)} placeholder="ميزة بالعربي" className="admin-input" />
            <input value={featureEn} onChange={(e) => setFeatureEn(e.target.value)} placeholder="Feature in English" className="admin-input" dir="ltr" />
          </div>
          <button type="button" onClick={addFeature} className="admin-btn-secondary">إضافة ميزة</button>
          <ul className="space-y-2">
            {(form.features || []).map((feature, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm">
                <span>{feature.ar} / {feature.en}</span>
                <button type="button" onClick={() => removeFeature(i)} className="text-red-500">حذف</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="admin-card space-y-6">
        <h3 className="text-lg font-bold text-[#1a1a2e]">صور المشروع</h3>
        <ImageUploadField
          label="صورة الغلاف"
          value={form.cover}
          onChange={(cover) => setForm({ ...form, cover })}
          onUpload={handleCoverUpload}
          hint="الصورة الرئيسية في بطاقة المشروع وصفحة التفاصيل."
        />
        <ProjectImageListField
          label="صور تفاصيل المشروع (المعرض)"
          description="تظهر في صفحة المشروع ضمن قسم معرض الصور."
          images={form.gallery}
          onChange={(gallery) => setForm({ ...form, gallery })}
          onUpload={handleGalleryUpload}
        />
        <ProjectDivisionsField
          unitDivisions={form.unitDivisions}
          onChange={(unitDivisions) => setForm({ ...form, unitDivisions })}
          onUpload={handleDivisionUpload}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => onSave(prepareProjectForSave(form))} disabled={saving} className="admin-btn-primary">
          {saving ? 'جاري الحفظ...' : 'حفظ المشروع'}
        </button>
        <button type="button" onClick={onCancel} className="admin-btn-secondary">إلغاء</button>
      </div>
    </div>
  )
}

export default function AdminProjects() {
  const revision = useAdminDataRevision()
  const { showToast } = useToast()
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const refreshProjects = async () => {
    const updated = await projectsDB.getAll()
    setProjects(updated.length > 0 ? updated : baseProjects)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    refreshProjects()
  }, [revision])

  const handleSave = async (form) => {
    setSaving(true)
    const index = projects.findIndex((p) => p.id === form.id)
    const sortOrder = index >= 0 ? index : projects.length
    const ok = await projectsDB.save(form, sortOrder)
    if (ok) {
      await projectsDB.getAll().then(setProjects)
      showToast('تم الحفظ بنجاح ✓')
      setEditing(null)
      setCreating(false)
    } else {
      showToast('فشل الحفظ — تحقق من إعداد Supabase', 'error')
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    setSaving(true)
    const ok = await projectsDB.delete(deleteId)
    if (ok) {
      await projectsDB.getAll().then(setProjects)
      showToast('تم الحذف بنجاح ✓')
    } else {
      showToast('فشل الحذف', 'error')
    }
    setSaving(false)
    setDeleteId(null)
  }

  const handleReset = async () => {
    setSaving(true)
    const ok = await projectsDB.clear()
    if (ok) {
      setProjects(baseProjects)
      showToast('تمت استعادة المشاريع الافتراضية ✓')
    } else {
      showToast('فشلت الاستعادة', 'error')
    }
    setSaving(false)
    setEditing(null)
    setCreating(false)
  }

  if (editing || creating) {
    return (
      <ProjectForm
        project={creating ? emptyProject() : editing}
        onSave={handleSave}
        onCancel={() => { setEditing(null); setCreating(false) }}
        saving={saving}
      />
    )
  }

  return (
    <div>
      <AdminPageHeader
        title="إدارة المشاريع"
        subtitle={loading ? 'جاري التحميل...' : `${projects.length} مشروع`}
        action={(
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setCreating(true)} className="admin-btn-primary">إضافة مشروع</button>
            <button type="button" onClick={handleReset} disabled={saving} className="admin-btn-secondary">استعادة الافتراضي</button>
          </div>
        )}
      />
      <div className="admin-card overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>الصورة</th>
              <th>المشروع</th>
              <th>معرض</th>
              <th>الموقع</th>
              <th>الحالة</th>
              <th>الإنجاز</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const thumb = coverPreviewUrl(project.cover)
              const galleryCount = normalizeImageList(project.gallery).length
              return (
                <tr key={project.id}>
                  <td>
                    {thumb ? (
                      <img src={thumb} alt="" className="h-12 w-16 rounded-lg object-cover" />
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td>{project.title?.ar || project.id}</td>
                  <td>{galleryCount || '—'}</td>
                  <td>{project.location?.ar}</td>
                  <td>{project.deliveryStatus?.ar}</td>
                  <td>{project.progress ?? 0}%</td>
                  <td className="space-x-2 space-x-reverse whitespace-nowrap">
                    <button type="button" onClick={() => setEditing(project)} className="admin-btn-secondary !px-3 !py-1.5">تعديل</button>
                    <button type="button" onClick={() => setDeleteId(project.id)} className="admin-btn-danger !px-3 !py-1.5">حذف</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={Boolean(deleteId)}
        title="حذف المشروع"
        message="هل أنت متأكد من حذف هذا المشروع؟"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
      <p className="mt-4 text-xs text-gray-500">المشاريع الافتراضية: {baseProjects.length}</p>
    </div>
  )
}
