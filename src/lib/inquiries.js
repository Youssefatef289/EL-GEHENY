import { inquiriesDB } from '../admin/storage'
import { isApiConfigured, submitInquiryApi } from './apiClient'

function mapSourceToType(source) {
  return source === 'project_detail' ? 'booking' : 'contact'
}

async function saveInquiry(payload) {
  if (isApiConfigured()) {
    try {
      const result = await submitInquiryApi({
        name: payload.name,
        phone: payload.phone,
        email: payload.email || null,
        subject: payload.subject || null,
        message: payload.message || null,
        project_name: payload.projectName || null,
        district: payload.district || null,
        type: mapSourceToType(payload.source),
      })
      if (result?.success) return true
    } catch (err) {
      console.error('API inquiry save failed:', err)
    }
  }

  try {
    return await inquiriesDB.insert({
      source: payload.source,
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      message: payload.message,
      project_name: payload.projectName,
      district: payload.district,
    })
  } catch (err) {
    console.error('Local inquiry save failed:', err)
    return false
  }
}

export async function submitInquiry({
  source,
  name,
  phone,
  email = '',
  message = '',
  projectName = '',
  district = '',
  subject = '',
}) {
  const saved = await saveInquiry({
    source,
    name,
    phone,
    email,
    message,
    projectName,
    district,
    subject,
  })

  if (!saved) {
    throw new Error('Failed to save inquiry')
  }

  return { saved: true }
}
