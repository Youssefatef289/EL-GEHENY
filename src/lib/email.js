import emailjs from '@emailjs/browser'
import { company } from '../data/site'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export function isEmailJsConfigured() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY && !SERVICE_ID.startsWith('YOUR_'))
}

export async function sendInquiryEmail({
  toEmail,
  name,
  email = '',
  phone = '',
  subject = '',
  message = '',
  projectName = '',
}) {
  const resolvedSubject =
    subject ||
    (projectName
      ? `استفسار عن مشروع: ${projectName}`
      : 'استفسار من موقع الجهيني')

  const payload = {
    from_name: name,
    reply_to: email || company.email,
    to_email: toEmail,
    phone,
    email,
    subject: resolvedSubject,
    message,
    project_name: projectName,
  }

  if (isEmailJsConfigured()) {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY)
    return { method: 'emailjs' }
  }

  const body = [
    projectName ? `المشروع: ${projectName}` : '',
    `الاسم: ${name}`,
    email ? `البريد: ${email}` : '',
    phone ? `الهاتف: ${phone}` : '',
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n')

  window.location.href = `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(resolvedSubject)}&body=${encodeURIComponent(body)}`
  return { method: 'mailto' }
}
