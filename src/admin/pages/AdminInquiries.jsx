import { useCallback, useEffect, useMemo, useState } from 'react'
import { deleteInquiry, getAllInquiries, updateInquiryStatus } from '../../lib/inquiriesAdmin'
import { AdminPageHeader, ConfirmDialog, useToast } from '../components/AdminUI'

const SOURCE_LABELS = {
  contact: 'صفحة التواصل',
  project_detail: 'صفحة مشروع',
  booking: 'حجز مشروع',
}

const STATUS_LABELS = {
  new: 'جديد',
  in_progress: 'قيد المعالجة',
  done: 'منتهي',
  read: 'مقروء',
  archived: 'مؤرشف',
}

const STATUS_STYLES = {
  new: 'bg-emerald-100 text-emerald-800',
  in_progress: 'bg-amber-100 text-amber-800',
  done: 'bg-gray-100 text-gray-600',
  read: 'bg-blue-100 text-blue-800',
  archived: 'bg-gray-100 text-gray-600',
}

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleString('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getSourceLabel(item) {
  if (item.type === 'booking') return SOURCE_LABELS.booking
  return SOURCE_LABELS[item.source] || SOURCE_LABELS.contact
}

export default function AdminInquiries() {
  const { showToast } = useToast()
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const loadInquiries = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAllInquiries()
      setInquiries(data)
    } catch {
      showToast('فشل تحميل الطلبات', 'error')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    loadInquiries()
  }, [loadInquiries])

  const filtered = useMemo(() => {
    if (filter === 'all') return inquiries
    if (filter === 'contact') return inquiries.filter((item) => item.type === 'contact' || item.source === 'contact')
    if (filter === 'booking') return inquiries.filter((item) => item.type === 'booking' || item.source === 'project_detail')
    return inquiries.filter((item) => item.status === filter)
  }, [inquiries, filter])

  const counts = useMemo(() => ({
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    in_progress: inquiries.filter((i) => i.status === 'in_progress' || i.status === 'read').length,
    done: inquiries.filter((i) => i.status === 'done' || i.status === 'archived').length,
  }), [inquiries])

  const handleStatusChange = async (id, status) => {
    const ok = await updateInquiryStatus(id, status)
    if (ok) {
      setInquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
      if (selected?.id === id) setSelected((prev) => ({ ...prev, status }))
      showToast('تم تحديث الحالة ✓')
    } else {
      showToast('فشل تحديث الحالة', 'error')
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const ok = await deleteInquiry(deleteId)
    if (ok) {
      setInquiries((prev) => prev.filter((item) => item.id !== deleteId))
      if (selected?.id === deleteId) setSelected(null)
      showToast('تم حذف الطلب ✓')
    } else {
      showToast('فشل الحذف', 'error')
    }
    setDeleteId(null)
  }

  const openDetail = (item) => {
    setSelected(item)
    if (item.status === 'new') handleStatusChange(item.id, 'in_progress')
  }

  return (
    <div>
      <AdminPageHeader
        title="طلبات العملاء"
        subtitle="جميع الاستفسارات المرسلة من نماذج الموقع"
        action={(
          <button type="button" onClick={loadInquiries} className="admin-btn-secondary">
            <i className="fa-solid fa-rotate ms-2" aria-hidden="true" />
            تحديث
          </button>
        )}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'الكل' },
          { key: 'new', label: 'جديد' },
          { key: 'in_progress', label: 'قيد المعالجة' },
          { key: 'done', label: 'منتهي' },
          { key: 'contact', label: 'تواصل' },
          { key: 'booking', label: 'حجز' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              filter === tab.key
                ? 'bg-[#c8a95a] text-[#0f0f1a]'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
            {['all', 'new', 'in_progress', 'done'].includes(tab.key) && (
              <span className="ms-2 rounded-full bg-black/10 px-2 py-0.5 text-xs">{counts[tab.key] ?? 0}</span>
            )}
          </button>
        ))}
      </div>

      <div className="admin-card overflow-x-auto">
        {loading ? (
          <p className="py-8 text-center text-sm text-gray-500">جاري التحميل...</p>
        ) : filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">لا توجد طلبات حتى الآن</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>التاريخ</th>
                <th>الاسم</th>
                <th>الهاتف</th>
                <th>النوع</th>
                <th>المشروع / الحي</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="cursor-pointer hover:bg-gray-50" onClick={() => openDetail(item)}>
                  <td className="whitespace-nowrap text-sm">{formatDate(item.created_at)}</td>
                  <td className="font-semibold">{item.name}</td>
                  <td dir="ltr" className="text-sm">
                    <a href={`tel:${item.phone}`} onClick={(e) => e.stopPropagation()} className="text-[#c8a95a] hover:underline">
                      {item.phone}
                    </a>
                  </td>
                  <td className="text-sm">{getSourceLabel(item)}</td>
                  <td className="text-sm">{item.project_name || item.district || '—'}</td>
                  <td>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[item.status] || STATUS_STYLES.new}`}>
                      {STATUS_LABELS[item.status] || item.status}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-wrap items-center gap-1">
                      <select
                        value={['new', 'in_progress', 'done'].includes(item.status) ? item.status : 'in_progress'}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="rounded-lg border border-gray-200 px-2 py-1 text-xs"
                      >
                        <option value="new">جديد</option>
                        <option value="in_progress">قيد المعالجة</option>
                        <option value="done">منتهي</option>
                      </select>
                      <button type="button" onClick={() => setDeleteId(item.id)} className="admin-btn-danger !px-2 !py-1 text-xs" title="حذف">
                        <i className="fa-solid fa-trash" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#1a1a2e]">{selected.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{formatDate(selected.created_at)}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark text-xl" aria-hidden="true" />
              </button>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex gap-2">
                <dt className="font-bold text-gray-500 w-24 shrink-0">الهاتف</dt>
                <dd>
                  <a href={`tel:${selected.phone}`} dir="ltr" className="text-[#c8a95a] hover:underline">{selected.phone}</a>
                  {' · '}
                  <a
                    href={`https://wa.me/2${selected.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    واتساب
                  </a>
                </dd>
              </div>
              {selected.email && (
                <div className="flex gap-2">
                  <dt className="font-bold text-gray-500 w-24 shrink-0">البريد</dt>
                  <dd dir="ltr">{selected.email}</dd>
                </div>
              )}
              <div className="flex gap-2">
                <dt className="font-bold text-gray-500 w-24 shrink-0">النوع</dt>
                <dd>{getSourceLabel(selected)}</dd>
              </div>
              {selected.project_name && (
                <div className="flex gap-2">
                  <dt className="font-bold text-gray-500 w-24 shrink-0">المشروع</dt>
                  <dd>{selected.project_name}</dd>
                </div>
              )}
              {selected.district && (
                <div className="flex gap-2">
                  <dt className="font-bold text-gray-500 w-24 shrink-0">الحي</dt>
                  <dd>{selected.district}</dd>
                </div>
              )}
              {selected.message && (
                <div>
                  <dt className="font-bold text-gray-500">الرسالة</dt>
                  <dd className="mt-1 whitespace-pre-wrap rounded-xl bg-gray-50 p-3 text-gray-700">{selected.message}</dd>
                </div>
              )}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              {selected.status !== 'done' && (
                <button type="button" onClick={() => handleStatusChange(selected.id, 'done')} className="admin-btn-secondary">
                  تعليم كمنتهي
                </button>
              )}
              <button type="button" onClick={() => setDeleteId(selected.id)} className="admin-btn-danger">
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="حذف الطلب"
        message="هل أنت متأكد من حذف هذا الطلب؟ لا يمكن التراجع."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
