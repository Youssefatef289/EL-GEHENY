import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { company } from '../data/site'

const contactItems = [
  {
    label: 'الهاتف',
    value: company.phone,
    href: `tel:${company.phone}`,
    dir: 'ltr',
    icon: <path d="M3 5.5C3 4.12 4.12 3 5.5 3H7c.6 0 1.1.4 1.3 1l.9 3.2c.1.5 0 1-.4 1.4l-1.3 1.3a13 13 0 005.6 5.6l1.3-1.3c.4-.4.9-.5 1.4-.4l3.2.9c.6.2 1 .7 1 1.3v1.5c0 1.4-1.1 2.5-2.5 2.5C10.5 21 3 13.5 3 5.5z" />,
  },
  {
    label: 'البريد الإلكتروني',
    value: company.email,
    href: `mailto:${company.email}`,
    dir: 'ltr',
    icon: <path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 7L4 7v1l8 5 8-5V7l-8 5z" />,
  },
  {
    label: 'العنوان',
    value: company.address,
    href: company.mapEmbed.replace('&output=embed', ''),
    dir: 'rtl',
    icon: <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />,
  },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  return (
    <>
      <PageHeader
        eyebrow="تواصل معنا"
        title="نحن هنا لخدمتك"
        description="فريقنا جاهز للإجابة على استفساراتك ومساعدتك في اختيار استثمارك العقاري المثالي."
        breadcrumb={[{ label: 'الرئيسية', to: '/' }, { label: 'تواصل معنا' }]}
      />

      <section className="section-pad pt-10">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          {/* بطاقات معلومات التواصل */}
          <div className="space-y-5 lg:col-span-2">
            {contactItems.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08} direction="right">
                <a
                  href={item.href}
                  target={item.label === 'العنوان' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-start gap-4 rounded-3xl border border-navy-200 bg-navy-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-400/40"
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 ring-1 ring-primary-300 transition-colors group-hover:bg-primary-gradient group-hover:text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                      {item.icon}
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-navy-600">{item.label}</p>
                    <p className="mt-1 font-semibold text-navy-900" dir={item.dir}>
                      {item.value}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.24} direction="right">
              <a
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent('مرحباً، أرغب في الاستفسار')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 rounded-3xl bg-[#25D366]/15 p-6 font-semibold text-[#25D366] ring-1 ring-[#25D366]/30 transition-colors hover:bg-[#25D366]/25"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" />
                </svg>
                تواصل عبر واتساب
              </a>
            </Reveal>
          </div>

          {/* نموذج التواصل */}
          <div className="lg:col-span-3">
            <Reveal direction="left">
              <div className="glass rounded-3xl p-8 sm:p-10">
                <h2 className="font-display text-2xl font-bold text-navy-900">أرسل لنا رسالة</h2>
                <p className="mt-2 text-sm text-navy-700">
                  املأ النموذج وسنعاود الاتصال بك في أقرب وقت ممكن.
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
                    <p className="font-display text-xl font-bold text-navy-900">شكراً لتواصلك معنا!</p>
                    <p className="mt-2 text-navy-700">تم استلام رسالتك وسيتواصل معك فريقنا قريباً.</p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
                      }}
                      className="btn-outline mt-6"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="الاسم" value={form.name} onChange={update('name')} placeholder="اسمك الكامل" required />
                      <Field label="رقم الهاتف" type="tel" value={form.phone} onChange={update('phone')} placeholder="01xxxxxxxxx" required />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="البريد الإلكتروني" type="email" value={form.email} onChange={update('email')} placeholder="example@mail.com" />
                      <Field label="الموضوع" value={form.subject} onChange={update('subject')} placeholder="موضوع الرسالة" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-navy-700">رسالتك</label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={update('message')}
                        required
                        placeholder="اكتب رسالتك هنا..."
                        className="w-full rounded-xl border border-navy-200 bg-navy-100 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-500 outline-none transition-colors focus:border-primary-400/60"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full sm:w-auto">
                      إرسال الرسالة
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
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
                title="موقع الجهيني للتطوير العقاري"
                src={company.mapEmbed}
                width="100%"
                height="420"
                style={{ border: 0, filter: 'grayscale(0.3) invert(0.9) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Field({ label, value, onChange, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-navy-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-navy-200 bg-navy-100 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-500 outline-none transition-colors focus:border-primary-400/60"
      />
    </div>
  )
}
