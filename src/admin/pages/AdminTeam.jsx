import { useEffect, useMemo, useState } from 'react'
import { baseFounder, baseTeamMembers, getTeamData } from '../../data/team'
import { teamDB } from '../storage'
import { useAdminDataRevision } from '../useAdminDataRevision'
import {
  uploadTeamImage,
  coverPreviewUrl,
  uploadResultMessage,
} from '../../lib/uploadImage'
import {
  AdminPageHeader,
  BilingualInput,
  ConfirmDialog,
  ImageUploadField,
  useToast,
} from '../components/AdminUI'

function TeamMemberForm({ title, member, onChange, onDelete, onUpload }) {
  return (
    <div className="admin-card space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-[#1a1a2e]">{title}</h3>
        {onDelete && (
          <button type="button" onClick={onDelete} className="admin-btn-danger !px-3 !py-1.5">
            حذف
          </button>
        )}
      </div>

      <ImageUploadField
        label="الصورة الشخصية"
        value={coverPreviewUrl(member.image)}
        onChange={(image) => onChange({ ...member, image })}
        onUpload={onUpload}
        hint="صورة العضو كما تظهر في صفحة «من نحن»."
      />

      <BilingualInput
        label="الاسم"
        value={member.name}
        onChange={(name) => onChange({ ...member, name })}
      />
      <BilingualInput
        label="المسمى الوظيفي"
        value={member.role}
        onChange={(role) => onChange({ ...member, role })}
      />
      <BilingualInput
        label="نبذة عن العضو"
        value={member.bio}
        onChange={(bio) => onChange({ ...member, bio })}
        multiline
      />
    </div>
  )
}

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
          image: '',
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

  const uploadFor = async (file, memberId) => {
    const result = await uploadTeamImage(file, memberId)
    showToast(uploadResultMessage(result))
    return result.url
  }

  return (
    <div>
      <AdminPageHeader
        title="إدارة فريق الإدارة"
        subtitle="تعديل صور ونصوص المؤسس وأعضاء فريق القيادة"
        action={(
          <div className="flex flex-wrap gap-2">
            <a href="/about" target="_blank" rel="noreferrer" className="admin-btn-secondary">معاينة</a>
            <button type="button" onClick={addMember} className="admin-btn-secondary">إضافة عضو</button>
            <button type="button" onClick={handleSave} disabled={saving} className="admin-btn-primary">
              {saving ? 'جاري الحفظ...' : 'حفظ'}
            </button>
            <button type="button" onClick={handleReset} disabled={saving} className="admin-btn-secondary">
              استعادة الافتراضي
            </button>
          </div>
        )}
      />

      <div className="space-y-6">
        <TeamMemberForm
          title="المؤسس — رئيس مجلس الإدارة"
          member={draft.founder}
          onChange={(founder) => setDraft((prev) => ({ ...prev, founder }))}
          onUpload={(file) => uploadFor(file, draft.founder.id || 'founder')}
        />

        {draft.members.map((member, index) => (
          <TeamMemberForm
            key={member.id}
            title={`عضو الفريق ${index + 1}`}
            member={member}
            onChange={(updated) =>
              setDraft((prev) => ({
                ...prev,
                members: prev.members.map((m) => (m.id === member.id ? updated : m)),
              }))
            }
            onDelete={() => setDeleteId(member.id)}
            onUpload={(file) => uploadFor(file, member.id)}
          />
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
