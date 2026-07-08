import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { company } from '../data/site'
import { projectCategories } from '../data/projects'
import { socialPlatforms } from '../data/socialLinks'
import { submitInquiry } from '../lib/inquiries'
import { useLang, L } from '../i18n'

const EGYPT_PHONE_PATTERN = /^(010|011|012|015)[0-9]{8}$/
const DISTRICT_OPTIONS = projectCategories.filter((c) => c.id !== 'all')

function getDefaultDistrict(projectTitle) {
  if (!projectTitle) return 'north-orchid'
  const lower = projectTitle.toLowerCase()
  if (lower.includes('179') || lower.includes('orchid') || lower.includes('أوركيد')) return 'north-orchid'
  if (lower.includes('j290') || lower.includes('ثاني')) return 'hay-thani'
  if (lower.includes('m75') || lower.includes('خامس')) return 'hay-khamis'
  if (lower.includes('e80') || lower.includes('thalith') || lower.includes('ثالث')) return 'hay-thalith'
  return 'north-orchid'
}

export default function ProjectContactSection({ projectTitle }) {
  const { t, lang } = useLang()
  const isProjectInquiry = Boolean(projectTitle)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    district: getDefaultDistrict(projectTitle),
  })

  const districtLabel = useMemo(() => {
    const match = DISTRICT_OPTIONS.find((item) => item.id === form.district)
    return match ? L(match.name, lang) : ''
  }, [form.district, lang])

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(false)

    const subject = isProjectInquiry
      ? `${lang === 'ar' ? 'استفسار عن' : 'Inquiry about'} ${projectTitle}`
      : `${t('contactBlock.districtLabel')}: ${districtLabel}`

    const message = [
      `${t('contactBlock.districtLabel')}: ${districtLabel}`,
      projectTitle ? `${lang === 'ar' ? 'المشروع' : 'Project'}: ${projectTitle}` : '',
      `${t('project.fieldPhone')}: ${form.phone}`,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      await submitInquiry({
        source: isProjectInquiry ? 'project_detail' : 'contact',
        name: form.name,
        phone: form.phone,
        subject,
        message,
        projectName: projectTitle || districtLabel,
        district: districtLabel,
      })
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setError(false)
    setForm({ name: '', phone: '', district: getDefaultDistrict(projectTitle) })
  }

  return (
    <section className="journey-contact section-pad">
      <div className="container-x">
        <Reveal>
          <div className="journey-contact-heading-wrap">
            <h2 className="journey-contact-heading">
              {t('contactBlock.titlePrefix')}{' '}
              <span className="text-gradient-primary">{t('contactBlock.titleHighlight')}</span>
            </h2>
          </div>

          <div className="journey-contact-box">
            <div className="journey-contact-form-col">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="journey-contact-success"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary-400/40 bg-primary-500/10 text-primary-300">
                    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-display text-xl font-bold text-white">{t('project.successTitle')}</p>
                  <p className="mt-2 text-sm text-white/70">{t('project.successDesc')}</p>
                  <button type="button" onClick={resetForm} className="journey-contact-submit mt-6">
                    {t('contact.sendAnother')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {t('project.contactSendError')}
                    </div>
                  )}

                  <BorderField
                    label={t('contact.name')}
                    value={form.name}
                    onChange={update('name')}
                    placeholder={t('contact.name')}
                    required
                  />

                  <BorderField
                    label={t('contact.phoneField')}
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder={t('contact.phoneField')}
                    required
                    isPhone
                    lang={lang}
                  />

                  <div>
                    <label className="journey-contact-label">{t('contactBlock.districtLabel')}</label>
                    <div className="journey-contact-select-wrap">
                      <select
                        value={form.district}
                        onChange={update('district')}
                        className="journey-contact-select"
                        required
                      >
                        {DISTRICT_OPTIONS.map((item) => (
                          <option key={item.id} value={item.id} className="bg-ink text-white">
                            {lang === 'ar' ? `حي ${L(item.name, lang)}` : L(item.name, lang)}
                          </option>
                        ))}
                      </select>
                      <svg viewBox="0 0 24 24" fill="none" className="journey-contact-select-icon" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <button type="submit" disabled={sending} className="journey-contact-submit w-full disabled:cursor-not-allowed disabled:opacity-60">
                    {sending ? t('project.contactSending') : t('project.contactSend')}
                  </button>

                  <div className="journey-contact-map">
                    <iframe
                      title={t('contact.mapTitle')}
                      src={company.mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <a
                      href={company.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="journey-contact-map-link"
                    >
                      {t('contact.openMap')}
                    </a>
                  </div>
                </form>
              )}
            </div>

            <aside className="journey-contact-info-col">
              <h3 className="journey-contact-info-title">
                {t('contactBlock.infoTitlePrefix')}{' '}
                <span className="text-gradient-primary">{t('contactBlock.infoTitleHighlight')}</span>
                {t('contactBlock.infoTitleSuffix') ? ` ${t('contactBlock.infoTitleSuffix')}` : ''}
              </h3>

              <p className="journey-contact-info-desc">{t('contactBlock.infoDesc')}</p>

              <ul className="journey-contact-info-list">
                <li className="journey-contact-info-item">
                  <span className="journey-contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M3 5.5C3 4.12 4.12 3 5.5 3H7c.6 0 1.1.4 1.3 1l.9 3.2c.1.5 0 1-.4 1.4l-1.3 1.3a13 13 0 005.6 5.6l1.3-1.3c.4-.4.9-.5 1.4-.4l3.2.9c.6.2 1 .7 1 1.3v1.5c0 1.4-1.1 2.5-2.5 2.5C10.5 21 3 13.5 3 5.5z" />
                    </svg>
                  </span>
                  <a href={`tel:+${company.phoneIntl}`} className="journey-contact-info-link" dir="ltr">
                    {company.phone}
                  </a>
                </li>

                <li className="journey-contact-info-item">
                  <span className="journey-contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 7L4 7v1l8 5 8-5V7l-8 5z" />
                    </svg>
                  </span>
                  <a href={`mailto:${company.email}`} className="journey-contact-info-link uppercase" dir="ltr">
                    {company.email}
                  </a>
                </li>

                <li className="journey-contact-info-item items-start">
                  <span className="journey-contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
                    </svg>
                  </span>
                  <div>
                    <a
                      href={company.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="journey-contact-info-link leading-relaxed transition-colors hover:text-primary-300"
                    >
                      {L(company.address, lang)}
                    </a>
                    <p className="mt-1 text-sm text-white/55">{t('contactBlock.cityLabel')}</p>
                  </div>
                </li>
              </ul>

              <div className="journey-contact-social">
                {socialPlatforms.map((item) => (
                  <SocialLink
                    key={item.key}
                    href={company.social[item.key]}
                    label={item.label}
                    brand={item.key}
                    icon={item.icon}
                  />
                ))}
              </div>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function BorderField({
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
      <label className="journey-contact-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        pattern={isPhone ? '^(010|011|012|015)[0-9]{8}$' : undefined}
        title={isPhone ? phoneTitle : undefined}
        className="journey-contact-input"
      />
      {phoneInvalid && <p className="mt-1 text-xs text-red-400">{phoneErrorMsg}</p>}
    </div>
  )
}

function SocialLink({ href, label, brand, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`journey-contact-social-link journey-contact-social-link--${brand}`}
    >
      <i className={icon} aria-hidden="true" />
    </a>
  )
}
