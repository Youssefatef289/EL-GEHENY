import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { company } from '../data/site'
import { getProjectSalesEmail } from '../data/projects'
import { sendInquiryEmail } from '../lib/email'
import { useLang } from '../i18n'

const EGYPT_PHONE_PATTERN = /^(010|011|012|015)[0-9]{8}$/

export default function ProjectContactSection({ projectTitle }) {
  const { t, lang } = useLang()
  const salesEmail = getProjectSalesEmail()
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(false)

    try {
      await sendInquiryEmail({
        toEmail: salesEmail,
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject || `${lang === 'ar' ? 'استفسار عن' : 'Inquiry about'} ${projectTitle}`,
        message: form.message,
        projectName: projectTitle,
      })
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  const whatsappText =
    lang === 'ar'
      ? `استفسار عن مشروع: ${projectTitle}`
      : `Inquiry about project: ${projectTitle}`

  return (
    <section className="project-contact-section section-pad">
      <div className="container-x">
        <Reveal>
          <div className="project-contact-grid">
            <div className="project-contact-form-card">
              <h2 className="project-contact-form-title">{t('project.contactFormTitle')}</h2>
              <p className="project-contact-form-desc">{t('project.contactFormDesc')}</p>
              <a
                href={`mailto:${company.email}`}
                className="project-contact-form-email"
                dir="ltr"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0 text-primary-500">
                  <path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 7L4 7v1l8 5 8-5V7l-8 5z" />
                </svg>
                <span>{company.email}</span>
              </a>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 rounded-2xl bg-emerald-500/15 p-8 text-center ring-1 ring-emerald-400/30"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-display text-xl font-bold text-navy-900">{t('project.successTitle')}</p>
                  <p className="mt-2 text-sm text-navy-700">{t('project.successDesc')}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setError(false)
                      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
                    }}
                    className="btn-outline mt-6"
                  >
                    {t('contact.sendAnother')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {error && (
                    <div className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-300 ring-1 ring-red-400/25">
                      {t('project.contactSendError')}
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    <UnderlineField
                      label={t('project.fieldName')}
                      value={form.name}
                      onChange={update('name')}
                      placeholder={t('project.fieldNamePh')}
                      required
                    />
                    <UnderlineField
                      label={t('contact.emailField')}
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="example@mail.com"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <UnderlineField
                      label={t('project.fieldPhone')}
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="01xxxxxxxxx"
                      required
                      isPhone
                      lang={lang}
                    />
                    <UnderlineField
                      label={t('contact.subject')}
                      value={form.subject}
                      onChange={update('subject')}
                      placeholder={t('contact.subjectPh')}
                    />
                  </div>

                  <div>
                    <label className="project-contact-label">{t('project.fieldMessage')}</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={update('message')}
                      required
                      placeholder={t('project.fieldMessagePh')}
                      className="project-contact-textarea"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" disabled={sending} className="project-contact-submit disabled:cursor-not-allowed disabled:opacity-60">
                      {sending ? t('project.contactSending') : t('project.contactSend')}
                      {!sending && (
                        <span className="project-contact-submit-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                            <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <aside className="project-contact-info-card">
              <div className="space-y-6">
                <div className="project-contact-info-row">
                  <span className="project-contact-info-icon shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                      <path d="M3 5.5C3 4.12 4.12 3 5.5 3H7c.6 0 1.1.4 1.3 1l.9 3.2c.1.5 0 1-.4 1.4l-1.3 1.3a13 13 0 005.6 5.6l1.3-1.3c.4-.4.9-.5 1.4-.4l3.2.9c.6.2 1 .7 1 1.3v1.5c0 1.4-1.1 2.5-2.5 2.5C10.5 21 3 13.5 3 5.5z" />
                    </svg>
                  </span>
                  <div className="project-contact-info-body">
                    <p className="text-sm text-white/75">{t('project.contactCallSales')}</p>
                    <a
                      href={`tel:+${company.phoneIntl}`}
                      className="project-contact-info-value"
                      dir="ltr"
                    >
                      {company.phone.replace(/(\d{3})(\d{4})(\d{4})/, '+20 $1 $2 $3')}
                    </a>
                  </div>
                </div>

                <div className="project-contact-info-row">
                  <span className="project-contact-info-icon shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                      <path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 7L4 7v1l8 5 8-5V7l-8 5z" />
                    </svg>
                  </span>
                  <div className="project-contact-info-body">
                    <p className="text-sm text-white/75">{t('project.contactWriteSales')}</p>
                    <a
                      href={`mailto:${company.email}`}
                      className="project-contact-info-value project-contact-info-value-email"
                      dir="ltr"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="project-contact-whatsapp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" />
                  </svg>
                  {t('project.contactWhatsApp')}
                </a>
              </div>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function UnderlineField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  isPhone,
  lang = 'ar',
}) {
  const phoneInvalid = isPhone && value.length > 0 && !EGYPT_PHONE_PATTERN.test(value)
  const phoneTitle =
    lang === 'ar'
      ? 'رقم هاتف مصري غير صحيح — يبدأ بـ 010 أو 011 أو 012 أو 015'
      : 'Invalid Egyptian mobile number — must start with 010, 011, 012, or 015'
  const phoneErrorMsg =
    lang === 'ar'
      ? 'يجب أن يبدأ الرقم بـ 010 أو 011 أو 012 أو 015 ويتكون من 11 رقماً'
      : 'Number must start with 010, 011, 012, or 015 and be 11 digits long'

  return (
    <div>
      <label className="project-contact-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        pattern={isPhone ? '^(010|011|012|015)[0-9]{8}$' : undefined}
        title={isPhone ? phoneTitle : undefined}
        className="project-contact-input"
      />
      {phoneInvalid && <p className="mt-1 text-xs text-red-400">{phoneErrorMsg}</p>}
    </div>
  )
}
