import { useEffect, useMemo, useState } from 'react'
import { baseBlogPosts, getBlogPosts } from '../../data/blog'
import { blogDB } from '../storage'
import { useAdminDataRevision } from '../useAdminDataRevision'
import { AdminPageHeader, BilingualInput, ConfirmDialog, useToast } from '../components/AdminUI'

const emptyPost = () => ({
  id: `post-${Date.now()}`,
  title: { ar: '', en: '' },
  date: new Date().toISOString().slice(0, 10),
  cover: '',
  excerpt: { ar: '', en: '' },
  content: { ar: [''], en: [''] },
  category: { ar: 'عام', en: 'General' },
  readTime: { ar: '5 دقائق', en: '5 min read' },
  author: { ar: 'فريق الجهيني', en: 'El-Geheny Team' },
})

export default function AdminBlog() {
  const revision = useAdminDataRevision()
  const { showToast } = useToast()
  const posts = useMemo(() => getBlogPosts(), [revision])
  const [draft, setDraft] = useState(posts)
  const [editingId, setEditingId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDraft(getBlogPosts())
  }, [revision])

  const editing = draft.find((p) => p.id === editingId)

  const handleSaveAll = async () => {
    setSaving(true)
    const ok = await blogDB.saveAll(draft)
    setSaving(false)
    if (ok) showToast('تم الحفظ بنجاح ✓')
    else showToast('فشل الحفظ — تحقق من إعداد Supabase', 'error')
  }

  const handleReset = async () => {
    setSaving(true)
    const ok = await blogDB.clear()
    setSaving(false)
    if (ok) {
      setDraft(baseBlogPosts)
      setEditingId(null)
      showToast('تمت استعادة المدونة الافتراضية ✓')
    } else {
      showToast('فشلت الاستعادة', 'error')
    }
  }

  if (editing) {
    return (
      <div>
        <AdminPageHeader title="تعديل مقال" action={<button type="button" onClick={() => setEditingId(null)} className="admin-btn-secondary">رجوع</button>} />
        <div className="admin-card space-y-4">
          <BilingualInput label="العنوان" value={editing.title} onChange={(title) => setDraft((prev) => prev.map((p) => (p.id === editing.id ? { ...p, title } : p)))} />
          <label className="block space-y-1">
            <span className="text-sm font-bold">التاريخ</span>
            <input type="date" className="admin-input" value={editing.date} onChange={(e) => setDraft((prev) => prev.map((p) => (p.id === editing.id ? { ...p, date: e.target.value } : p)))} />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-bold">رابط الصورة</span>
            <input className="admin-input" dir="ltr" value={editing.cover} onChange={(e) => setDraft((prev) => prev.map((p) => (p.id === editing.id ? { ...p, cover: e.target.value } : p)))} />
          </label>
          <BilingualInput label="المقتطف" value={editing.excerpt} onChange={(excerpt) => setDraft((prev) => prev.map((p) => (p.id === editing.id ? { ...p, excerpt } : p)))} multiline />
          <BilingualInput
            label="المحتوى (فقرة أولى)"
            value={{ ar: editing.content?.ar?.[0] || '', en: editing.content?.en?.[0] || '' }}
            onChange={(value) => setDraft((prev) => prev.map((p) => (
              p.id === editing.id
                ? { ...p, content: { ar: [value.ar], en: [value.en] } }
                : p
            )))}
            multiline
          />
          <button type="button" onClick={handleSaveAll} disabled={saving} className="admin-btn-primary">
            {saving ? 'جاري الحفظ...' : 'حفظ المقال'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader
        title="إدارة المدونة"
        action={(
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                const post = emptyPost()
                setDraft((p) => [post, ...p])
                setEditingId(post.id)
              }}
              className="admin-btn-secondary"
            >
              إضافة مقال
            </button>
            <button type="button" onClick={handleSaveAll} disabled={saving} className="admin-btn-primary">
              {saving ? 'جاري الحفظ...' : 'حفظ الكل'}
            </button>
            <button type="button" onClick={handleReset} disabled={saving} className="admin-btn-secondary">استعادة الافتراضي</button>
          </div>
        )}
      />
      <div className="admin-card overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>العنوان</th>
              <th>التاريخ</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {draft.map((post) => (
              <tr key={post.id}>
                <td>{post.title?.ar}</td>
                <td>{post.date}</td>
                <td className="space-x-2 space-x-reverse whitespace-nowrap">
                  <button type="button" onClick={() => setEditingId(post.id)} className="admin-btn-secondary !px-3 !py-1.5">تعديل</button>
                  <button type="button" onClick={() => setDeleteId(post.id)} className="admin-btn-danger !px-3 !py-1.5">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={Boolean(deleteId)}
        title="حذف المقال"
        message="هل أنت متأكد من حذف هذا المقال؟"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          setDraft((prev) => prev.filter((p) => p.id !== deleteId))
          setDeleteId(null)
        }}
      />
    </div>
  )
}
