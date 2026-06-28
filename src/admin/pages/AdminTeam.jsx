import { useEffect, useMemo, useState } from 'react'
import { baseFounder, baseTeamMembers, getTeamData } from '../../data/team'
import { teamDB } from '../storage'
import { useAdminDataRevision } from '../useAdminDataRevision'
import { AdminPageHeader, BilingualInput, ConfirmDialog, useToast } from '../components/AdminUI'

export default function AdminTeam() {
  const revision = useAdminDataRevision()
  const { showToast } = useToast()
  const team = useMemo(() => getTeamData(), [revision])
  const [draft, setDraft] = useState(team)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDraft(getTeamData())
  }, [revision])

  const handleSave = async () => {
    setSaving(true)
    const ok = await teamDB.save(draft)
    setSaving(false)
    if (ok) showToast('تم الحفظ بنجاح ✓')
    else showToast('فشل الحفظ — تحقق من إعداد Supabase', 'error')
  }

  const handleReset = async () => {
    setSaving(true)
    const ok = await teamDB.clear()
    setSaving(false)
    if (ok) {
      setDraft({ founder: baseFounder, members: baseTeamMembers })
      showToast('تمت استعادة الفريق الافتراضي ✓')
    } else {
      showToast('فشلت الاستعادة', 'error')
    }
  }

  const addMember = () => {
    setDraft((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        {
          id: `member-${Date.now()}`,
          name: { ar: '', en: '' },
          role: { ar: '', en: '' },
          bio: { ar: '', en: '' },
        },
      ],
    }))
  }

  const removeMember = () => {
    setDraft((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== deleteId),
    }))
    setDeleteId(null)
  }

  return (
    <div>
      <AdminPageHeader
        title="إدارة فريق الإدارة"
        action={(
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={addMember} className="admin-btn-secondary">إضافة عضو</button>
            <button type="button" onClick={handleSave} disabled={saving} className="admin-btn-primary">
              {saving ? 'جاري الحفظ...' : 'حفظ'}
            </button>
            <button type="button" onClick={handleReset} disabled={saving} className="admin-btn-secondary">استعادة الافتراضي</button>
          </div>
        )}
      />
      <div className="admin-card mb-4 space-y-4">
        <h3 className="font-bold text-[#1a1a2e]">المؤسس</h3>
        <BilingualInput label="الاسم" value={draft.founder.name} onChange={(name) => setDraft((p) => ({ ...p, founder: { ...p.founder, name } }))} />
        <BilingualInput label="المسمى الوظيفي" value={draft.founder.role} onChange={(role) => setDraft((p) => ({ ...p, founder: { ...p.founder, role } }))} />
        <BilingualInput label="الوصف" value={draft.founder.bio} onChange={(bio) => setDraft((p) => ({ ...p, founder: { ...p.founder, bio } }))} multiline />
      </div>
      <div className="space-y-4">
        {draft.members.map((member, index) => (
          <div key={member.id} className="admin-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#1a1a2e]">عضو {index + 1}</h3>
              <button type="button" onClick={() => setDeleteId(member.id)} className="admin-btn-danger !px-3 !py-1.5">حذف</button>
            </div>
            <BilingualInput label="الاسم" value={member.name} onChange={(name) => setDraft((p) => ({ ...p, members: p.members.map((m) => (m.id === member.id ? { ...m, name } : m)) }))} />
            <BilingualInput label="المسمى الوظيفي" value={member.role} onChange={(role) => setDraft((p) => ({ ...p, members: p.members.map((m) => (m.id === member.id ? { ...m, role } : m)) }))} />
            <BilingualInput label="الوصف" value={member.bio} onChange={(bio) => setDraft((p) => ({ ...p, members: p.members.map((m) => (m.id === member.id ? { ...m, bio } : m)) }))} multiline />
          </div>
        ))}
      </div>
      <ConfirmDialog
        open={Boolean(deleteId)}
        title="حذف العضو"
        message="هل أنت متأكد من حذف هذا العضو؟"
        onCancel={() => setDeleteId(null)}
        onConfirm={removeMember}
      />
    </div>
  )
}
