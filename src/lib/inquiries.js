import { inquiriesDB } from '../admin/storage'

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
  const saved = await inquiriesDB.insert({
    source,
    name,
    phone,
    email,
    message,
    project_name: projectName,
    district,
    subject,
  })

  if (!saved) {
    throw new Error('Failed to save inquiry')
  }

  return { saved: true }
}
