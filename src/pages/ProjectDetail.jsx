import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import { getProjectById, projects } from '../data/projects'
import { company } from '../data/site'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = getProjectById(id)
  const [activeImg, setActiveImg] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  if (!project) return <Navigate to="/projects" replace />

  const related = projects.filter((p) => p.id !== project.id).slice(0, 3)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* رأس الصفحة مع صورة الغلاف */}
      <section className="relative pt-32 sm:pt-40">
        <div className="absolute inset-0 h-[60vh]">
          <LazyImage src={project.cover} alt={project.title} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/40" />
        </div>

        <div className="container-x relative z-10 flex min-h-[40vh] flex-col justify-end pb-10">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center gap-2 text-sm text-navy-600"
          >
            <Link to="/" className="hover:text-primary-600">الرئيسية</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-primary-600">المشاريع</Link>
            <span>/</span>
            <span className="text-primary-600">{project.title}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="rounded-full bg-primary-400/15 px-4 py-1.5 text-sm font-semibold text-primary-600 ring-1 ring-primary-400/30">
              {project.categoryName}
            </span>
            <span
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                project.status === 'تم التسليم'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-amber-500/20 text-amber-200'
              }`}
            >
              {project.status}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-lg mt-4 text-navy-900"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 flex items-center gap-2 text-navy-600"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-primary-400">
              <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
            </svg>
            {project.location}
          </motion.p>
        </div>
      </section>

      {/* المحتوى الرئيسي */}
      <section className="section-pad pt-10">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          {/* العمود الأيمن - التفاصيل */}
          <div className="space-y-12 lg:col-span-2">
            {/* معلومات سريعة */}
            <Reveal>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <InfoBox label="النوع" value={project.type} />
                <InfoBox label="المساحة تبدأ من" value={project.area} />
                <InfoBox label="عدد الوحدات" value={project.units} />
                <InfoBox label="سنة التسليم" value={project.deliveryYear} />
              </div>
            </Reveal>

            {/* الوصف */}
            <Reveal>
              <div>
                <h2 className="mb-4 font-display text-2xl font-bold text-navy-900">عن المشروع</h2>
                <p className="leading-relaxed text-navy-700">{project.description}</p>
              </div>
            </Reveal>

            {/* نسبة الإنجاز */}
            <Reveal>
              <div className="glass rounded-3xl p-8">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-navy-900">نسبة الإنجاز</h3>
                  <span className="font-display text-2xl font-extrabold text-gradient-primary">
                    {project.progress}%
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-navy-200">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${project.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full rounded-full bg-primary-gradient"
                  />
                </div>
              </div>
            </Reveal>

            {/* المميزات */}
            <Reveal>
              <div>
                <h2 className="mb-5 font-display text-2xl font-bold text-navy-900">مميزات المشروع</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-3 rounded-2xl border border-navy-200 bg-navy-50 p-4"
                    >
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-gradient text-white">
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm text-navy-100">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* معرض الصور والمخططات */}
            <Reveal>
              <div>
                <h2 className="mb-5 font-display text-2xl font-bold text-navy-900">صور المشروع والمخططات</h2>
                <div className="overflow-hidden rounded-3xl border border-navy-200">
                  <LazyImage
                    src={project.gallery[activeImg]}
                    alt={`${project.title} - صورة ${activeImg + 1}`}
                    className="aspect-video w-full"
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {project.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`overflow-hidden rounded-2xl border-2 transition-all ${
                        activeImg === i ? 'border-primary-400' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <LazyImage src={img} alt={`مصغّر ${i + 1}`} className="aspect-video w-full" />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* طرق السداد */}
            <Reveal>
              <div>
                <h2 className="mb-5 font-display text-2xl font-bold text-navy-900">طرق السداد</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {project.payment.map((p) => (
                    <div key={p.label} className="glass-primary rounded-2xl p-6 text-center">
                      <p className="font-display text-2xl font-extrabold text-gradient-primary">
                        {p.value}
                      </p>
                      <p className="mt-2 text-sm text-navy-100">{p.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* العمود الأيسر - نموذج الحجز */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Reveal direction="left">
                <div className="glass rounded-3xl p-8">
                  <h3 className="font-display text-xl font-bold text-navy-900">احجز أو استفسر</h3>
                  <p className="mt-2 text-sm text-navy-300">
                    سجّل بياناتك وسيتواصل معك فريق المبيعات في أقرب وقت.
                  </p>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 rounded-2xl bg-emerald-500/15 p-6 text-center ring-1 ring-emerald-400/30"
                    >
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="font-semibold text-navy-900">تم استلام طلبك بنجاح!</p>
                      <p className="mt-1 text-sm text-navy-700">سنتواصل معك قريباً.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <Field
                        label="الاسم"
                        value={form.name}
                        onChange={(v) => setForm({ ...form, name: v })}
                        placeholder="اسمك الكامل"
                        required
                      />
                      <Field
                        label="رقم الهاتف"
                        type="tel"
                        value={form.phone}
                        onChange={(v) => setForm({ ...form, phone: v })}
                        placeholder="01xxxxxxxxx"
                        required
                      />
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-navy-700">
                          رسالتك
                        </label>
                        <textarea
                          rows={3}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="استفسارك عن المشروع..."
                          className="w-full rounded-xl border border-navy-200 bg-navy-100 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-500 outline-none transition-colors focus:border-primary-400/60"
                        />
                      </div>
                      <button type="submit" className="btn-primary w-full">
                        إرسال الطلب
                      </button>
                    </form>
                  )}

                  <div className="mt-6 border-t border-navy-200 pt-6">
                    <a
                      href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent('استفسار عن مشروع: ' + project.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366]/15 px-4 py-3 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/25"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" />
                      </svg>
                      تواصل عبر واتساب
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* مشاريع مشابهة */}
      <section className="section-pad pt-0">
        <div className="container-x">
          <h2 className="mb-8 font-display text-2xl font-bold text-navy-900">مشاريع قد تهمك</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <RelatedCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-2xl border border-navy-200 bg-navy-50 p-4 text-center">
      <p className="text-xs text-navy-400">{label}</p>
      <p className="mt-1 font-bold text-navy-900">{value}</p>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-navy-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-navy-200 bg-navy-100 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-500 outline-none transition-colors focus:border-primary-400/60"
      />
    </div>
  )
}

function RelatedCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="group block overflow-hidden rounded-3xl border border-navy-200 bg-navy-50 transition-all hover:-translate-y-1 hover:border-primary-400/40"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <LazyImage
            src={project.cover}
            alt={project.title}
            className="h-full w-full"
            imgClassName="transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-bold text-navy-900 group-hover:text-primary-600">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-navy-300">{project.categoryName}</p>
        </div>
      </Link>
    </motion.div>
  )
}
