import { useState } from 'react'
import { baseCompany, getCompany } from '../../data/site'
import { socialPlatforms } from '../../data/socialLinks'
import { getSession, changePassword } from '../auth'
import { settingsDB } from '../storage'
import { AdminPageHeader, BilingualInput, useToast } from '../components/AdminUI'

export default function AdminSettings() {
  const { showToast } = useToast()
  const [company, setCompany] = useState(() => {
    const current = getCompany()
    return {
      name: current.name,
      slogan: current.slogan,
      phone: current.phone,
      whatsapp: current.whatsapp,
      email: current.email,
      address: current.address,
      mapUrl: current.mapUrl,
    }
  })
  const [social, setSocial] = useState(() => getCompany().social)
  const session = getSession()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)

  const saveCompany = async () => {
    setSaving(true)
    const ok = await settingsDB.save({ company })
    setSaving(false)
    if (ok) showToast('تم حفظ بيانات الشركة ✓')
    else showToast('فشل الحفظ — تحقق من إعداد Supabase', 'error')
  }

  const saveSocial = async () => {
    setSaving(true)
    const ok = await settingsDB.save({ social })
    setSaving(false)
    if (ok) showToast('تم حفظ روابط السوشيال ✓')
    else showToast('فشل الحفظ — تحقق من إعداد Supabase', 'error')
  }

  const saveAdminPassword = async () => {
    if (!newPassword.trim()) {
      showToast('كلمة المرور مطلوبة', 'error')
      return
    }
    if (newPassword !== confirmPassword) {
      showToast('تأكيد كلمة المرور غير متطابق', 'error')
      return
    }
    setSaving(true)
    const ok = await changePassword(session?.username || 'admin', newPassword)
    setSaving(false)
    if (ok) {
      setNewPassword('')
      setConfirmPassword('')
      showToast('تم تحديث كلمة المرور ✓')
    } else {
      showToast('فشل تحديث كلمة المرور', 'error')
    }
  }

  const resetAll = async () => {
    setSaving(true)
    const ok = await settingsDB.clearFields(['company', 'social'])
    setSaving(false)
    if (ok) {
      setCompany({
        name: baseCompany.name,
        slogan: baseCompany.slogan,
        phone: baseCompany.phone,
        whatsapp: baseCompany.whatsapp,
        email: baseCompany.email,
        address: baseCompany.address,
        mapUrl: baseCompany.mapUrl,
      })
      setSocial(baseCompany.social)
      showToast('تمت استعادة الإعدادات الافتراضية ✓')
    } else {
      showToast('فشلت الاستعادة', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="الإعدادات العامة"
        action={<button type="button" onClick={resetAll} disabled={saving} className="admin-btn-secondary">استعادة الافتراضي</button>}
      />

      <div className="admin-card space-y-4">
        <h2 className="text-lg font-bold text-[#1a1a2e]">بيانات الشركة</h2>
        <BilingualInput label="اسم الشركة" value={company.name} onChange={(name) => setCompany({ ...company, name })} />
        <BilingualInput label="الشعار" value={company.slogan} onChange={(slogan) => setCompany({ ...company, slogan })} />
        <label className="block space-y-1">
          <span className="text-sm font-bold">الهاتف</span>
          <input className="admin-input" dir="ltr" value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-bold">واتساب</span>
          <input className="admin-input" dir="ltr" value={company.whatsapp} onChange={(e) => setCompany({ ...company, whatsapp: e.target.value })} />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-bold">البريد الإلكتروني</span>
          <input className="admin-input" dir="ltr" value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} />
        </label>
        <BilingualInput label="العنوان" value={company.address} onChange={(address) => setCompany({ ...company, address })} multiline />
        <label className="block space-y-1">
          <span className="text-sm font-bold">رابط الخريطة</span>
          <input className="admin-input" dir="ltr" value={company.mapUrl} onChange={(e) => setCompany({ ...company, mapUrl: e.target.value })} />
        </label>
        <button type="button" onClick={saveCompany} disabled={saving} className="admin-btn-primary">حفظ بيانات الشركة</button>
      </div>

      <div className="admin-card space-y-4">
        <h2 className="text-lg font-bold text-[#1a1a2e]">روابط السوشيال ميديا</h2>
        {socialPlatforms.map((platform) => (
          <label key={platform.key} className="block space-y-1">
            <span className="text-sm font-bold">{platform.label}</span>
            <input
              className="admin-input"
              dir="ltr"
              value={social[platform.key] || ''}
              onChange={(e) => setSocial({ ...social, [platform.key]: e.target.value })}
            />
          </label>
        ))}
        <button type="button" onClick={saveSocial} disabled={saving} className="admin-btn-primary">حفظ روابط السوشيال</button>
      </div>

      <div className="admin-card space-y-4">
        <h2 className="text-lg font-bold text-[#1a1a2e]">بيانات الأدمن</h2>
        <label className="block space-y-1">
          <span className="text-sm font-bold">اسم المستخدم</span>
          <input className="admin-input" value={session?.username || 'admin'} readOnly />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-bold">كلمة المرور الجديدة</span>
          <input type="password" className="admin-input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-bold">تأكيد كلمة المرور</span>
          <input type="password" className="admin-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <button type="button" onClick={saveAdminPassword} disabled={saving} className="admin-btn-primary">تحديث كلمة المرور</button>
      </div>
    </div>
  )
}
