import { useMemo, useState } from 'react'
import { baseProjects, getProjects } from '../../data/projects'
import { uploadProjectCover, coverPreviewUrl } from '../../lib/uploadImage'
import { projectsDB } from '../storage'
import { useAdminDataRevision } from '../useAdminDataRevision'
import { AdminPageHeader, BilingualInput, ConfirmDialog, ImageUploadField, useToast } from '../components/AdminUI'

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
})

function ProjectForm({ project, onSave, onCancel, saving }) {
  const { showToast } = useToast()
  const [form, setForm] = useState(() => ({
    ...project,
    cover: coverPreviewUrl(project.cover),
  }))
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

  const handleUpload = async (file) => {
    const url = await uploadProjectCover(file, form.id)
    showToast('تم رفع الصورة ✓')
    return url
  }

  return (
    <div className="admin-card space-y-6">
      <h2 className="text-xl font-bold text-[#1a1a2e]">{project.id ? 'تعديل مشروع' : 'إضافة مشروع'}</h2>
      <ImageUploadField
        label="صورة المشروع (الغلاف)"
        value={form.cover}
        onChange={(cover) => setForm({ ...form, cover })}
        onUpload={handleUpload}
        hint="JPG أو PNG أو WebP — حد أقصى 5MB. تُرفع إلى Supabase Storage."
      />
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
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => onSave(form)} disabled={saving} className="admin-btn-primary">
          {saving ? 'جاري الحفظ...' : 'حفظ'}
        </button>
        <button type="button" onClick={onCancel} className="admin-btn-secondary">إلغاء</button>
      </div>
    </div>
  )
}

export default function AdminProjects() {
  const revision = useAdminDataRevision()
  const { showToast } = useToast()
  const projects = useMemo(() => getProjects(), [revision])
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)

  const persist = async (list) => {
    setSaving(true)
    const ok = await projectsDB.saveAll(list)
    setSaving(false)
    if (ok) showToast('تم الحفظ بنجاح ✓')
    else showToast('فشل الحفظ — تحقق من إعداد Supabase', 'error')
  }

  const handleSave = async (form) => {
    const exists = projects.some((p) => p.id === form.id)
    const next = exists
      ? projects.map((p) => (p.id === form.id ? { ...p, ...form } : p))
      : [...projects, form]
    await persist(next)
    setEditing(null)
    setCreating(false)
  }

  const handleDelete = async () => {
    const next = projects.filter((p) => p.id !== deleteId)
    await persist(next)
    setDeleteId(null)
  }

  const handleReset = async () => {
    setSaving(true)
    const ok = await projectsDB.clear()
    setSaving(false)
    if (ok) showToast('تمت استعادة المشاريع الافتراضية ✓')
    else showToast('فشلت الاستعادة', 'error')
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
        subtitle={`${projects.length} مشروع`}
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
              <th>الموقع</th>
              <th>الحالة</th>
              <th>الإنجاز</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const thumb = coverPreviewUrl(project.cover)
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
