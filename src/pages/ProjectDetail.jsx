import { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import PlanLightbox from '../components/PlanLightbox'
import ImagePageHero, { heroProjectImage } from '../components/ImagePageHero'
import Reveal from '../components/Reveal'
import ProjectContactSection from '../components/ProjectContactSection'
import { sendInquiryEmail } from '../lib/email'
import {
  getProjectById,
  getProjectDisplayTitle,
  getProjectSalesEmail,
  formatProjectCode,
  getProjectAreaRange,
  getProjectUnitsLabel,
  getProjectUnitTypesSummary,
  getAllProjectLayoutPlans,
  projects,
  UNIT_TYPE_KEYS,
  UNIT_TYPE_LABELS,
  groupUnitDetails,
  getProjectUnitPlans,
  getConstructionStageState,
  getActiveConstructionPhase,
} from '../data/projects'
import { company } from '../data/site'
import { useLang, L } from '../i18n'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = getProjectById(id)
  const [activeImg, setActiveImg] = useState(0)
  const [activeUnitType, setActiveUnitType] = useState('ground')
  const [activePlanImg, setActivePlanImg] = useState(0)
  const [layoutLightboxIndex, setLayoutLightboxIndex] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [sidebarSending, setSidebarSending] = useState(false)
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
  const layoutPlans = useMemo(
    () => (project ? getAllProjectLayoutPlans(project) : []),
    [project],
  )

  if (!project) return <Navigate to="/projects" replace />

  const related = projects.filter((p) => p.id !== project.id).slice(0, 3)
  const delivered = project.statusKey === 'delivered'
  const activePhase = getActiveConstructionPhase(project.progress, delivered)
  const constructionStages = getConstructionStageState(project.progress)
  const deliveryLabel = L(project.deliveryStatus, lang)
  const displayTitle = getProjectDisplayTitle(project, lang)
  const unitTypesSummary = getProjectUnitTypesSummary(project, lang)
  const unitsLabel = getProjectUnitsLabel(project, lang)
  const areaRangeLabel = getProjectAreaRange(project, lang)
  const activeUnits = unitGroups[activeUnitType] || []
  const activePlans = unitPlans[activeUnitType] || []
  const activeUnitLabel = L(UNIT_TYPE_LABELS[activeUnitType], lang)

  const handleUnitTypeChange = (type) => {
    setActiveUnitType(type)
    setActivePlanImg(0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSidebarSending(true)
    try {
      await sendInquiryEmail({
        toEmail: getProjectSalesEmail(),
        name: form.name,
        phone: form.phone,
        message: form.message,
        projectName: displayTitle,
      })
      setSubmitted(true)
    } catch {
      // keep form visible on failure
    } finally {
      setSidebarSending(false)
    }
  }

  const openLayoutLightbox = (plan) => {
    const planIndex = layoutPlans.findIndex((item) => item.src === plan.src && item.type === plan.type)
    setLayoutLightboxIndex(planIndex >= 0 ? planIndex : 0)
  }

  return (
    <>
      <PlanLightbox
        items={layoutPlans}
        index={layoutLightboxIndex}
        onClose={() => setLayoutLightboxIndex(null)}
        onChange={setLayoutLightboxIndex}
        title={displayTitle}
      />
      <ImagePageHero
        image={heroProjectImage}
        imageAlt={displayTitle}
        eyebrow={L(project.categoryName, lang)}
        title={displayTitle}
        breadcrumb={[
          { label: t('project.breadcrumbHome'), to: '/' },
          { label: t('project.breadcrumbProjects'), to: '/projects' },
          { label: formatProjectCode(project.id) },
        ]}
      >
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span
            className={`rounded-full px-4 py-1.5 text-sm font-semibold backdrop-blur-md ${
              delivered
                ? 'bg-emerald-500/25 text-emerald-100 ring-1 ring-emerald-400/40'
                : 'bg-amber-500/25 text-amber-100 ring-1 ring-amber-400/40'
            }`}
          >
            {deliveryLabel}
          </span>
          <p className="flex items-center gap-2 text-sm text-white/88 sm:text-base">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0 text-primary-300">
              <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
            </svg>
            {L(project.location, lang)}
          </p>
        </div>
      </ImagePageHero>

      {/* المحتوى الرئيسي */}
      <section className="section-pad pt-10">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          {/* العمود الأيمن - التفاصيل */}
          <div className="space-y-12 lg:col-span-2">
            {/* معلومات سريعة */}
            <Reveal>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <InfoBox label={t('project.unitTypes')} value={unitTypesSummary} />
                <InfoBox label={t('project.areaRange')} value={areaRangeLabel} />
                <InfoBox label={t('project.units')} value={unitsLabel} />
                <InfoBox label={t('project.deliveryStatus')} value={deliveryLabel} />
              </div>
            </Reveal>

            {/* واجهة المشروع */}
            <Reveal>
              <figure className="overflow-hidden rounded-[1.35rem] border border-white/10 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.7)] sm:rounded-[1.75rem]">
                <LazyImage
                  src={project.cover}
                  alt={displayTitle}
                  className="aspect-[16/10] w-full bg-ink sm:aspect-[21/10]"
                  imgClassName="h-full w-full object-cover object-center"
                />
              </figure>
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

                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-primary-200/60 bg-primary-500/5 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary-400">{t('project.unitTypes')}</p>
                    <p className="mt-2 text-base font-semibold leading-relaxed text-navy-900 sm:text-lg">{unitTypesSummary}</p>
                  </div>
                  <div className="rounded-2xl border border-navy-200 bg-navy-50/70 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{t('project.units')}</p>
                    <p className="mt-2 text-base font-semibold text-navy-900 sm:text-lg">{unitsLabel}</p>
                  </div>
                  <div className="rounded-2xl border border-navy-200 bg-navy-50/70 p-5 sm:col-span-1">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{t('project.areaRange')}</p>
                    <p className="mt-2 text-base font-semibold leading-relaxed text-navy-900 sm:text-lg">{areaRangeLabel}</p>
                  </div>
                </div>

                {layoutPlans.length > 0 && (
                  <div className="mb-10">
                    <h3 className="mb-5 font-display text-xl font-bold text-navy-900">{t('project.layoutPlansTitle')}</h3>
                    <div className="space-y-8">
                      {UNIT_TYPE_KEYS.map((type) => {
                        const typePlans = layoutPlans.filter((plan) => plan.type === type)
                        if (typePlans.length === 0) return null
                        return (
                          <div key={type}>
                            <p className="mb-4 inline-flex rounded-full border border-primary-300/40 bg-primary-500/10 px-4 py-1.5 text-sm font-bold text-primary-500">
                              {L(UNIT_TYPE_LABELS[type], lang)}
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                              {typePlans.map((plan, index) => (
                                <button
                                  key={`${plan.src}-${index}`}
                                  type="button"
                                  onClick={() => openLayoutLightbox(plan)}
                                    className="group overflow-hidden rounded-2xl border border-primary-400/20 bg-transparent text-start shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300/50 hover:shadow-[0_20px_50px_-30px_rgba(202,161,63,0.35)]"
                                  >
                                    <LazyImage
                                      src={plan.src}
                                      alt={`${displayTitle} - ${L(plan.label, lang)} ${index + 1}`}
                                      className="aspect-[4/3] w-full bg-transparent"
                                      imgClassName="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                    <span className="flex items-center justify-between gap-2 px-4 py-3 text-xs font-semibold text-primary-300">
                                      <span>{L(plan.label, lang)}</span>
                                      <span className="text-primary-400 opacity-80 transition-opacity group-hover:opacity-100">
                                        {lang === 'ar' ? 'عرض' : 'View'}
                                      </span>
                                    </span>
                                  </button>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

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
                            alt={`${displayTitle} - ${activeUnitLabel}`}
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
                      <div className="grid gap-5 sm:grid-cols-2">
                        {activeUnits.map((unit, ui) => (
                          <div key={ui} className="glass rounded-3xl p-6 sm:p-7">
                            <h4 className="font-display text-xl font-bold leading-snug text-navy-900">{L(unit.name, lang)}</h4>
                            <div className="mt-4 space-y-2 border-b border-navy-200 pb-4">
                              {unit.area && (
                                <p className="flex items-center justify-between gap-3 text-sm sm:text-base">
                                  <span className="font-semibold text-muted">{lang === 'ar' ? 'المساحة' : 'Area'}</span>
                                  <span className="font-bold text-navy-900">{L(unit.area, lang)}</span>
                                </p>
                              )}
                              {unit.extra && (
                                <p className="flex items-center justify-between gap-3 text-sm sm:text-base">
                                  <span className="font-semibold text-muted">{lang === 'ar' ? 'إضافات' : 'Extras'}</span>
                                  <span className="font-bold text-navy-900">{L(unit.extra, lang)}</span>
                                </p>
                              )}
                              {unit.status && (
                                <p className="flex items-center justify-between gap-3 text-sm sm:text-base">
                                  <span className="font-semibold text-muted">{lang === 'ar' ? 'الحالة' : 'Status'}</span>
                                  <span className="font-bold text-emerald-600">{L(unit.status, lang)}</span>
                                </p>
                              )}
                            </div>
                            {unit.rooms?.length > 0 && (
                              <ul className="mt-4 space-y-2.5">
                                {unit.rooms.map((room, ri) => (
                                  <li key={ri} className="flex items-start justify-between gap-3 text-sm sm:text-base">
                                    <span className="text-body">{room.name ? L(room.name, lang) : L(room, lang)}</span>
                                    {room.dim && (
                                      <span className="flex-shrink-0 font-mono text-xs text-muted sm:text-sm" dir="ltr">
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
                <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy-900">{t('project.progress')}</h3>
                    <p className="mt-1 body-sm text-muted">
                      {t('project.progressPhase')}:{' '}
                      <span className="font-semibold text-primary-400">{L(activePhase.label, lang)}</span>
                    </p>
                  </div>
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
                <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                  {constructionStages.map((stage) => (
                    <div
                      key={L(stage.label, 'ar')}
                      className={`rounded-xl border px-3 py-2.5 text-center transition-colors ${
                        stage.completed
                          ? 'border-primary-400/50 bg-primary-500/10'
                          : stage.active
                            ? 'border-primary-400 bg-primary-500/15 ring-1 ring-primary-400/40'
                            : 'border-navy-200 bg-navy-50/50 opacity-60'
                      }`}
                    >
                      <p className={`text-[0.68rem] font-bold leading-snug sm:text-xs ${
                        stage.active ? 'text-primary-300' : stage.completed ? 'text-primary-400' : 'text-muted'
                      }`}
                      >
                        {L(stage.label, lang)}
                      </p>
                    </div>
                  ))}
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
                    alt={`${displayTitle} - ${activeImg + 1}`}
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
                      <LazyImage src={img} alt={`${displayTitle} ${i + 1}`} className="aspect-video w-full" />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* طرق السداد */}
            <Reveal>
              <div>
                <h2 className="heading-md mb-5 text-navy-900">{t('project.paymentTitle')}</h2>
                <div className="glass-primary rounded-3xl p-8 sm:p-10">
                  <p className="font-display text-2xl font-extrabold text-gradient-primary sm:text-3xl">
                    {t('project.paymentFlexible')}
                  </p>
                  <p className="mt-3 body-md text-body">{t('project.paymentContactNow')}</p>
                  <a
                    href={`tel:+${company.phoneIntl}`}
                    className="btn-primary mt-6 inline-flex items-center gap-3"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                      <path d="M3 5.5C3 4.12 4.12 3 5.5 3H7c.6 0 1.1.4 1.3 1l.9 3.2c.1.5 0 1-.4 1.4l-1.3 1.3a13 13 0 005.6 5.6l1.3-1.3c.4-.4.9-.5 1.4-.4l3.2.9c.6.2 1 .7 1 1.3v1.5c0 1.4-1.1 2.5-2.5 2.5C10.5 21 3 13.5 3 5.5z" />
                    </svg>
                    <span>{t('project.paymentCallBtn')}</span>
                    <span className="font-bold" dir="ltr">
                      {company.phone.replace(/(\d{3})(\d{4})(\d{4})/, '+20 $1 $2 $3')}
                    </span>
                  </a>
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
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-primary-400/25 bg-primary-500/10 px-3 py-2 text-xs font-semibold text-primary-500"
                    dir="ltr"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 7L4 7v1l8 5 8-5V7l-8 5z" />
                    </svg>
                    {company.email}
                  </a>

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
                      <button type="submit" disabled={sidebarSending} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
                        {sidebarSending ? (lang === 'ar' ? 'جارِ الإرسال...' : 'Sending...') : t('project.submitRequest')}
                      </button>
                    </form>
                  )}

                  <div className="mt-6 border-t border-navy-200 pt-6">
                    <a
                      href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent((lang === 'ar' ? 'استفسار عن مشروع: ' : 'Inquiry about project: ') + displayTitle)}`}
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

      <ProjectContactSection projectTitle={displayTitle} />

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
