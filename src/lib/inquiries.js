import { inquiriesDB } from '../admin/storage'
import { sendInquiryEmail } from './email'

export async function submitInquiry({
  source,
  name,
  phone,
  email = '',
  message = '',
  projectName = '',
  district = '',
  toEmail,
  subject = '',
}) {
  let saved = false
  try {
    saved = await inquiriesDB.insert({
      source,
      name,
      phone,
      email,
      message,
      project_name: projectName,
      district,
    })
  } catch (err) {
    console.error('Failed to save inquiry:', err)
  }

  try {
    await sendInquiryEmail({
      toEmail,
      name,
      email,
      phone,
      subject,
      message,
      projectName,
    })
    return { saved, emailed: true }
  } catch (err) {
    if (saved) return { saved: true, emailed: false }
    throw err
  }
}
