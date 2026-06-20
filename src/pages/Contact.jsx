import { useState } from 'react'
import { motion } from 'framer-motion'
import { sendInquiryEmail } from '../lib/email'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import SectionReveal from '../components/SectionReveal'
import { company } from '../data/site'
import { useLang, L } from '../i18n'

const EGYPT_PHONE_PATTERN = /^(010|011|012|015)[0-9]{8}$/

function isOfficeOpenNow() {
  const cairo = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' }))
  const day = cairo.getDay()
  const hour = cairo.getHours()
  const isOpenDay = day === 6 || (day >= 0 && day <= 4)
  const isOpenHour = hour >= 9 && hour < 17
  return isOpenDay && isOpenHour
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const { t, lang } = useLang()
  const officeOpen = isOfficeOpenNow()

  const contactItems = [
    {
      label: t('contact.phone'),
      value: company.phone,
      href: `tel:${company.phone}`,
      dir: 'ltr',
      icon: <path d="M3 5.5C3 4.12 4.12 3 5.5 3H7c.6 0 1.1.4 1.3 1l.9 3.2c.1.5 0 1-.4 1.4l-1.3 1.3a13 13 0 005.6 5.6l1.3-1.3c.4-.4.9-.5 1.4-.4l3.2.9c.6.2 1 .7 1 1.3v1.5c0 1.4-1.1 2.5-2.5 2.5C10.5 21 3 13.5 3 5.5z" />,
    },
    {
      label: t('contact.email'),
      value: company.email,
      href: `mailto:${company.email}`,
      dir: 'ltr',
      icon: <path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 7L4 7v1l8 5 8-5V7l-8 5z" />,
    },
    {
      label: t('contact.address'),
      value: L(company.address, lang),
      href: company.mapEmbed.replace('&output=embed', ''),
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      isAddress: true,
      icon: <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />,
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      await sendInquiryEmail({
        toEmail: company.email,
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      })
      setSubmitted(true)
    } catch (err) {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  return (
    <>
      {/* ترويسة مبسّطة */}
      <section className="relative overflow-hidden bg-ink pt-32 pb-6 sm:pt-36">
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-primary-500/10 blur-[130px]" />
        <div className="container-x relative">
          <SectionTitle as="h1">{t('contact.eyebrow')}</SectionTitle>
          <Reveal delay={0.05}>
            <h2 className="section-subtitle mt-4">{t('contact.title')}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-desc mt-5">
              {t('contact.desc')}
            </p>
          </Reveal>
        </div>
      </section>

      <SectionReveal>
      <section className="section-pad pt-10">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          {/* بطاقات معلومات التواصل */}
          <div className="space-y-5 lg:col-span-2">
            {contactItems.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08} direction="right">
                <a
                  href={item.href}
                  target={item.isAddress ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-start gap-4 rounded-3xl border border-navy-200 bg-navy-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-400/40 dark:border-navy-700/50 dark:bg-navy-900/60"
                >
                  <span className="hover-gold-metallic flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500 ring-1 ring-primary-500/25 transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                      {item.icon}
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-navy-600 dark:text-navy-300">{item.label}</p>
                    <p className="mt-1 font-semibold text-navy-900 dark:text-navy-100" dir={item.dir}>
                      {item.value}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.24} direction="right">
              <div className="group flex items-start gap-4 rounded-3xl border border-navy-200 bg-navy-50 p-6 dark:border-navy-700/50 dark:bg-navy-900/60">
                <span className="hover-gold-metallic flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500 ring-1 ring-primary-500/25 transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l3 3-1.5 1.5-3.5-3.5V7H12z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm text-navy-600 dark:text-navy-300">
                    {lang === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                  </p>
                  <p className="mt-1 font-semibold text-navy-900 dark:text-navy-100">
                    {lang === 'ar' ? 'السبت – الخميس: 9 ص – 5 م' : 'Sat – Thu: 9 AM – 5 PM'}
                  </p>
                  <p className="mt-0.5 text-sm text-navy-600 dark:text-navy-300">
                    {lang === 'ar' ? 'الجمعة: مغلق' : 'Friday: Closed'}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${officeOpen ? 'bg-emerald-400' : 'bg-red-400'}`}
                      aria-hidden="true"
                    />
                    <span className={officeOpen ? 'text-emerald-400' : 'text-red-400'}>
                      {officeOpen
                        ? lang === 'ar'
                          ? 'مفتوح الآن'
                          : 'Open Now'
                        : lang === 'ar'
                          ? 'مغلق الآن'
                          : 'Closed Now'}
                    </span>
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.32} direction="right">
              <a
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(t('contact.whatsappMsg'))}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 rounded-3xl bg-[#25D366]/15 p-6 font-semibold text-[#25D366] ring-1 ring-[#25D366]/30 transition-colors hover:bg-[#25D366]/25"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" />
                </svg>
                {t('contact.whatsapp')}
              </a>
            </Reveal>
          </div>

          {/* نموذج التواصل */}
          <div className="lg:col-span-3">
            <Reveal direction="left">
              <div className="glass rounded-3xl p-8 sm:p-10">
                <h2 className="font-display text-2xl font-bold text-navy-900">{t('contact.formTitle')}</h2>
                <p className="mt-2 text-sm text-navy-700">
                  {t('contact.formDesc')}
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 rounded-2xl bg-emerald-500/15 p-8 text-center ring-1 ring-emerald-400/30"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="font-display text-xl font-bold text-navy-900">{t('contact.successTitle')}</p>
                    <p className="mt-2 text-navy-700">{t('contact.successDesc')}</p>
                    <button
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
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl bg-red-500/15 p-6 text-center ring-1 ring-red-400/30"
                      >
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-300">
                          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="font-display text-lg font-bold text-navy-900">
                          {lang === 'ar' ? 'تعذّر إرسال الرسالة' : 'Failed to send message'}
                        </p>
                        <p className="mt-1 text-sm text-red-300">
                          {lang === 'ar'
                            ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.'
                            : 'Something went wrong while sending. Please try again or contact us on WhatsApp.'}
                        </p>
                      </motion.div>
                    )}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label={t('contact.name')} value={form.name} onChange={update('name')} placeholder={t('contact.namePh')} required />
                      <Field
                        label={t('contact.phoneField')}
                        type="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        placeholder="01xxxxxxxxx"
                        required
                        isPhone
                        lang={lang}
                      />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label={t('contact.emailField')} type="email" value={form.email} onChange={update('email')} placeholder="example@mail.com" />
                      <Field label={t('contact.subject')} value={form.subject} onChange={update('subject')} placeholder={t('contact.subjectPh')} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-navy-700">{t('contact.message')}</label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={update('message')}
                        required
                        placeholder={t('contact.messagePh')}
                        className="w-full rounded-xl border border-navy-200 bg-navy-100 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-500 outline-none transition-colors focus:border-primary-400/60"
                      />
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60">
                      {sending ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                          </svg>
                          {lang === 'ar' ? 'جارِ الإرسال...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          {t('contact.send')}
                          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* الخريطة */}
        <div className="container-x mt-12">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-navy-200">
              <iframe
                title={t('contact.mapTitle')}
                src={company.mapEmbed}
                width="100%"
                height="460"
                style={{ border: 0, filter: 'grayscale(0.3) invert(0.9) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
      </SectionReveal>
    </>
  )
}

function Field({ label, value, onChange, type = 'text', placeholder, required, isPhone, lang = 'ar' }) {
  const phoneInvalid = isPhone && value.length > 0 && !EGYPT_PHONE_PATTERN.test(value)
  const phoneTitle = lang === 'ar'
    ? 'رقم هاتف مصري غير صحيح — يبدأ بـ 010 أو 011 أو 012 أو 015'
    : 'Invalid Egyptian mobile number — must start with 010, 011, 012, or 015'
  const phoneErrorMsg = lang === 'ar'
    ? 'يجب أن يبدأ الرقم بـ 010 أو 011 أو 012 أو 015 ويتكون من 11 رقماً'
    : 'Number must start with 010, 011, 012, or 015 and be 11 digits long'

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-navy-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        pattern={isPhone ? '^(010|011|012|015)[0-9]{8}$' : undefined}
        title={isPhone ? phoneTitle : undefined}
        className="w-full rounded-xl border border-navy-200 bg-navy-100 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-500 outline-none transition-colors focus:border-primary-400/60"
      />
      {phoneInvalid && (
        <p className="mt-1 text-xs text-red-400">{phoneErrorMsg}</p>
      )}
    </div>
  )
}
