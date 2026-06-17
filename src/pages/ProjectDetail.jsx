import { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import {
  getProjectById,
  projects,
  UNIT_TYPE_KEYS,
  UNIT_TYPE_LABELS,
  groupUnitDetails,
  getProjectUnitPlans,
} from '../data/projects'
import { company } from '../data/site'
import { useLang, L } from '../i18n'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = getProjectById(id)
  const [activeImg, setActiveImg] = useState(0)
  const [activeUnitType, setActiveUnitType] = useState('ground')
  const [activePlanImg, setActivePlanImg] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const { t, lang } = useLang()

  const unitGroups = useMemo(
    () => groupUnitDetails(project?.unitDetails || []),
    [project?.unitDetails],
  )
  const unitPlans = useMemo(
    () => (project ? getProjectUnitPlans(project) : { ground: [], repeated: [], roof: [] }),
    [project],
  )

  if (!project) return <Navigate to="/projects" replace />

  const related = projects.filter((p) => p.id !== project.id).slice(0, 3)
  const delivered = project.statusKey === 'delivered'
  const deliveryLabel = L(project.deliveryStatus, lang)
  const title = L(project.title, lang)
  const activeUnits = unitGroups[activeUnitType] || []
  const activePlans = unitPlans[activeUnitType] || []
  const activeUnitLabel = L(UNIT_TYPE_LABELS[activeUnitType], lang)

  const handleUnitTypeChange = (type) => {
    setActiveUnitType(type)
    setActivePlanImg(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* رأس الصفحة مع صورة الغلاف */}
      <section className="relative bg-ink pt-28 sm:pt-32">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_45px_110px_-50px_rgba(0,0,0,0.65)] sm:rounded-[2.25rem]">
            <LazyImage
              src={project.cover}
              alt={title}
              className="h-[56vh] min-h-[380px] w-full sm:h-[64vh]"
              imgClassName="object-cover object-center"
            />
            {/* تدرّج داكن ثابت لإبراز النص */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" />

            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10">
              <motion.nav
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/70"
              >
                <Link to="/" className="transition-colors hover:text-primary-300">{t('project.breadcrumbHome')}</Link>
                <span className="text-white/40">/</span>
                <Link to="/projects" className="transition-colors hover:text-primary-300">{t('project.breadcrumbProjects')}</Link>
                <span className="text-white/40">/</span>
                <span className="text-primary-300">{title}</span>
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap items-center gap-3"
              >
                <span className="rounded-full bg-primary-500/25 px-4 py-1.5 text-sm font-semibold text-primary-100 ring-1 ring-primary-300/40 backdrop-blur-md">
                  {L(project.categoryName, lang)}
                </span>
                <span
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold backdrop-blur-md ${
                    delivered
                      ? 'bg-emerald-500/25 text-emerald-100 ring-1 ring-emerald-400/40'
                      : 'bg-amber-500/25 text-amber-100 ring-1 ring-amber-400/40'
                  }`}
                >
                  {deliveryLabel}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="heading-lg mt-4 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-3 flex items-center gap-2 text-white/85"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-primary-300">
                  <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
                </svg>
                {L(project.location, lang)}
              </motion.p>
            </div>
          </div>
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
                <InfoBox label={t('project.unitTypes')} value={activeUnitLabel} />
                <InfoBox label={t('project.areaFrom')} value={L(project.area, lang)} />
                <InfoBox label={t('project.units')} value={L(project.units, lang)} />
                <InfoBox label={t('project.deliveryStatus')} value={deliveryLabel} />
              </div>
            </Reveal>

            {/* الوصف */}
            <Reveal>
              <div>
                <h2 className="heading-md mb-4 text-navy-900">{t('project.about')}</h2>
                <p className="body-md text-body">{L(project.description, lang)}</p>
              </div>
            </Reveal>

            {/* أنواع الوحدات */}
            <Reveal>
              <div>
                <h2 className="heading-md mb-5 text-navy-900">{t('project.unitsTitle')}</h2>

                <div className="unit-type-tabs mb-8">
                  {UNIT_TYPE_KEYS.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleUnitTypeChange(type)}
                      className={activeUnitType === type ? 'unit-type-tab-active' : 'unit-type-tab-idle'}
                    >
                      {L(UNIT_TYPE_LABELS[type], lang)}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeUnitType}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="space-y-6"
                  >
                    {activePlans.length > 0 && (
                      <div>
                        <h3 className="mb-4 font-display text-lg font-bold text-navy-900">{t('project.unitPlansTitle')}</h3>
                        <div className="overflow-hidden rounded-3xl border border-navy-200">
                          <LazyImage
                            src={activePlans[activePlanImg]}
                            alt={`${title} - ${activeUnitLabel}`}
                            className="aspect-[4/3] w-full bg-navy-50"
                            imgClassName="object-contain"
                          />
                        </div>
                        {activePlans.length > 1 && (
                          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                            {activePlans.map((img, i) => (
                              <button
                                key={img}
                                type="button"
                                onClick={() => setActivePlanImg(i)}
                                className={`overflow-hidden rounded-2xl border-2 transition-all ${
                                  activePlanImg === i ? 'border-primary-400' : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                              >
                                <LazyImage src={img} alt="" className="aspect-video w-full" imgClassName="object-cover" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {activeUnits.length > 0 ? (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {activeUnits.map((unit, ui) => (
                          <div key={ui} className="glass rounded-3xl p-6">
                            <h4 className="font-display text-lg font-bold text-navy-900">{L(unit.name, lang)}</h4>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {unit.area && (
                                <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-600 ring-1 ring-primary-500/25">
                                  {L(unit.area, lang)}
                                </span>
                              )}
                              {unit.extra && (
                                <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">
                                  {L(unit.extra, lang)}
                                </span>
                              )}
                              {unit.status && (
                                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                                  {L(unit.status, lang)}
                                </span>
                              )}
                            </div>
                            {unit.rooms?.length > 0 && (
                              <ul className="mt-4 space-y-2 border-t border-navy-200 pt-4">
                                {unit.rooms.map((room, ri) => (
                                  <li key={ri} className="flex items-start justify-between gap-3 text-sm">
                                    <span className="text-body">{room.name ? L(room.name, lang) : L(room, lang)}</span>
                                    {room.dim && (
                                      <span className="flex-shrink-0 font-mono text-xs text-muted" dir="ltr">
                                        {room.dim}
                                      </span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      !activePlans.length && (
                        <p className="rounded-2xl border border-dashed border-navy-200 bg-navy-50/50 px-6 py-10 text-center body-sm text-muted">
                          {t('project.unitsEmpty')}
                        </p>
                      )
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>

            {/* نسبة الإنجاز */}
            <Reveal>
              <div className="glass rounded-3xl p-8">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-navy-900">{t('project.progress')}</h3>
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
                <h2 className="heading-md mb-5 text-navy-900">{t('project.featuresTitle')}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.features.map((f, fi) => (
                    <div
                      key={fi}
                      className="flex items-center gap-3 rounded-2xl border border-navy-200 bg-navy-50 p-4"
                    >
                      <span className="gold-check h-7 w-7 flex-shrink-0 shadow-gold-sm">
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="body-sm text-body">{L(f, lang)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* معرض الصور والمخططات */}
            <Reveal>
              <div>
                <h2 className="heading-md mb-5 text-navy-900">{t('project.galleryTitle')}</h2>
                <div className="overflow-hidden rounded-3xl border border-navy-200">
                  <LazyImage
                    src={project.gallery[activeImg]}
                    alt={`${title} - ${activeImg + 1}`}
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
                      <LazyImage src={img} alt={`${title} ${i + 1}`} className="aspect-video w-full" />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* طرق السداد */}
            <Reveal>
              <div>
                <h2 className="heading-md mb-5 text-navy-900">{t('project.paymentTitle')}</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {project.payment.map((p, pi) => (
                    <div key={pi} className="glass-primary rounded-2xl p-6 text-center">
                      <p className="font-display text-2xl font-extrabold text-gradient-primary">
                        {L(p.value, lang)}
                      </p>
                      <p className="mt-2 body-sm text-body">{L(p.label, lang)}</p>
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
                  <h3 className="font-display text-xl font-bold text-navy-900">{t('project.bookTitle')}</h3>
                  <p className="mt-2 body-sm text-muted">
                    {t('project.bookDesc')}
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
                      <p className="font-semibold text-navy-900">{t('project.successTitle')}</p>
                      <p className="mt-1 body-sm text-body">{t('project.successDesc')}</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <Field
                        label={t('project.fieldName')}
                        value={form.name}
                        onChange={(v) => setForm({ ...form, name: v })}
                        placeholder={t('project.fieldNamePh')}
                        required
                      />
                      <Field
                        label={t('project.fieldPhone')}
                        type="tel"
                        value={form.phone}
                        onChange={(v) => setForm({ ...form, phone: v })}
                        placeholder="01xxxxxxxxx"
                        required
                        isPhone
                        lang={lang}
                      />
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-navy-700">
                          {t('project.fieldMessage')}
                        </label>
                        <textarea
                          rows={3}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder={t('project.fieldMessagePh')}
                          className="w-full rounded-xl border border-navy-200 bg-navy-100 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-500 outline-none transition-colors focus:border-primary-400/60"
                        />
                      </div>
                      <button type="submit" className="btn-primary w-full">
                        {t('project.submitRequest')}
                      </button>
                    </form>
                  )}

                  <div className="mt-6 border-t border-navy-200 pt-6">
                    <a
                      href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent((lang === 'ar' ? 'استفسار عن مشروع: ' : 'Inquiry about project: ') + title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366]/15 px-4 py-3 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/25"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" />
                      </svg>
                      {t('contact.whatsapp')}
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
          <h2 className="heading-md mb-8 text-navy-900">{t('project.relatedTitle')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <RelatedCard key={p.id} project={p} index={i} lang={lang} />
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

function Field({ label, value, onChange, type = 'text', placeholder, required, isPhone, lang = 'ar' }) {
  const phonePattern = /^(010|011|012|015)[0-9]{8}$/
  const phoneInvalid = isPhone && value.length > 0 && !phonePattern.test(value)
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
        onChange={(e) => onChange(e.target.value)}
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

function RelatedCard({ project, index, lang }) {
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
            alt={L(project.title, lang)}
            className="h-full w-full"
            imgClassName="transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-navy-950 dark:to-transparent" />
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-bold text-navy-900 group-hover:text-primary-600">
            {L(project.title, lang)}
          </h3>
          <p className="mt-1 body-sm text-muted">{L(project.categoryName, lang)}</p>
        </div>
      </Link>
    </motion.div>
  )
}
