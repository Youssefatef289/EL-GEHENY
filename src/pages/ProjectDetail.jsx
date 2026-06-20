import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import PlanLightbox from '../components/PlanLightbox'
import ImagePageHero, { heroProjectImage } from '../components/ImagePageHero'
import Reveal from '../components/Reveal'
import { sendInquiryEmail } from '../lib/email'
import {
  getProjectById,
  getProjectDisplayTitle,
  getProjectHeroContent,
  getProjectSalesEmail,
  formatProjectCode,
  getAllProjectLayoutPlans,
  projects,
  UNIT_TYPE_KEYS,
  UNIT_TYPE_LABELS,
  groupUnitDetails,
  getProjectUnitDivisions,
  getProjectAutocadPlans,
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
  const [activeDivisionImg, setActiveDivisionImg] = useState(0)
  const [activeAutocadImg, setActiveAutocadImg] = useState(0)
  const [layoutLightboxIndex, setLayoutLightboxIndex] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [sidebarSending, setSidebarSending] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const { t, lang } = useLang()

  const unitGroups = useMemo(
    () => groupUnitDetails(project?.unitDetails || []),
    [project?.unitDetails],
  )
  const unitDivisions = useMemo(
    () => (project ? getProjectUnitDivisions(project) : { ground: [], repeated: [], roof: [] }),
    [project],
  )
  const autocadPlans = useMemo(
    () => (project ? getProjectAutocadPlans(project) : { ground: [], repeated: [], roof: [] }),
    [project],
  )
  const layoutPlans = useMemo(
    () => (project ? getAllProjectLayoutPlans(project) : []),
    [project],
  )

  const activeTypeDivisions = useMemo(
    () => unitDivisions[activeUnitType] || [],
    [unitDivisions, activeUnitType],
  )
  const activeTypeAutocad = useMemo(
    () => autocadPlans[activeUnitType] || [],
    [autocadPlans, activeUnitType],
  )

  useEffect(() => {
    setActiveUnitType('ground')
    setActiveDivisionImg(0)
    setActiveAutocadImg(0)
  }, [project?.id])

  if (!project) return <Navigate to="/projects" replace />

  const related = projects.filter((p) => p.id !== project.id).slice(0, 3)
  const delivered = project.statusKey === 'delivered'
  const activePhase = getActiveConstructionPhase(project.progress, delivered)
  const constructionStages = getConstructionStageState(project.progress)
  const deliveryLabel = L(project.deliveryStatus, lang)
  const displayTitle = getProjectDisplayTitle(project, lang)
  const heroContent = getProjectHeroContent(project, lang)
  const activeUnits = unitGroups[activeUnitType] || []
  const activeUnitLabel = L(UNIT_TYPE_LABELS[activeUnitType], lang)
  const typePlanCount =
    (unitDivisions[activeUnitType]?.length ?? 0) + (autocadPlans[activeUnitType]?.length ?? 0)

  const handleUnitTypeChange = (type) => {
    setActiveUnitType(type)
    setActiveDivisionImg(0)
    setActiveAutocadImg(0)
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
    const planIndex = layoutPlans.findIndex(
      (item) => item.src === plan.src && item.type === plan.type && item.variant === plan.variant,
    )
    setLayoutLightboxIndex(planIndex >= 0 ? planIndex : 0)
  }

  const openDivisionLightbox = (index = activeDivisionImg) => {
    const src = activeTypeDivisions[index]
    if (!src) return
    openLayoutLightbox({ src, type: activeUnitType, variant: 'division' })
  }

  const openAutocadLightbox = (index = activeAutocadImg) => {
    const src = activeTypeAutocad[index]
    if (!src) return
    openLayoutLightbox({ src, type: activeUnitType, variant: 'autocad' })
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
        titleStack={{
          company: heroContent.companyName,
          district: heroContent.districtLine,
          location: heroContent.locationLine,
        }}
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
            <Reveal>
              <div id="project-about" className="project-about-panel">
                <div className="project-about-grid">
                  <div className="project-about-content">
                    <h2 className="project-about-title">
                      <span className="text-gradient-primary">{t('project.about')}</span>
                    </h2>
                    <p className="project-about-desc">{L(project.description, lang)}</p>
                  </div>
                  <figure className="project-about-media">
                    <LazyImage
                      src={project.cover}
                      alt={displayTitle}
                      className="h-full min-h-[16rem] w-full sm:min-h-[20rem] lg:min-h-[22rem]"
                      imgClassName="h-full w-full object-cover object-center"
                    />
                  </figure>
                </div>
              </div>
            </Reveal>

            {/* أنواع الوحدات */}
            <Reveal>
              <div>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="heading-md text-navy-900">{t('project.unitsTitle')}</h2>
                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                      delivered
                        ? 'border border-emerald-400/40 bg-emerald-500/10 text-emerald-300'
                        : 'border border-amber-400/40 bg-amber-500/10 text-amber-200'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wide opacity-80">{t('project.deliveryStatus')}</span>
                    <span>{deliveryLabel}</span>
                  </div>
                </div>

                <div className="unit-type-tabs mb-6">
                  {UNIT_TYPE_KEYS.map((type) => {
                    const count = (unitDivisions[type]?.length ?? 0) + (autocadPlans[type]?.length ?? 0)
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleUnitTypeChange(type)}
                        className={activeUnitType === type ? 'unit-type-tab-active' : 'unit-type-tab-idle'}
                      >
                        {L(UNIT_TYPE_LABELS[type], lang)}
                        {count > 0 && (
                          <span className="ms-1.5 text-[0.65rem] opacity-75">({count})</span>
                        )}
                      </button>
                    )
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeUnitType}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="space-y-8"
                  >
                    {activeTypeDivisions.length > 0 ? (
                      <UnitPlanCarousel
                        images={activeTypeDivisions}
                        activeIndex={activeDivisionImg}
                        onIndexChange={setActiveDivisionImg}
                        onOpenLightbox={openDivisionLightbox}
                        title={displayTitle}
                        unitLabel={activeUnitLabel}
                        lang={lang}
                        plansTitle={t('project.unitDivisionsTitle')}
                        viewLabel={lang === 'ar' ? 'عرض' : 'View'}
                      />
                    ) : null}

                    {activeTypeAutocad.length > 0 ? (
                      <UnitPlanCarousel
                        images={activeTypeAutocad}
                        activeIndex={activeAutocadImg}
                        onIndexChange={setActiveAutocadImg}
                        onOpenLightbox={openAutocadLightbox}
                        title={displayTitle}
                        unitLabel={activeUnitLabel}
                        lang={lang}
                        plansTitle={t('project.layoutPlansTitle')}
                        viewLabel={lang === 'ar' ? 'عرض' : 'View'}
                        variant="autocad"
                      />
                    ) : null}

                    {typePlanCount === 0 && (
                      <p className="rounded-2xl border border-dashed border-navy-200 bg-navy-50/50 px-6 py-10 text-center body-sm text-muted">
                        {t('project.unitsEmpty')}
                      </p>
                    )}

                    {activeUnits.length > 0 && (
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
            <div className="project-sidebar-sticky">
              <Reveal direction="left">
                <div className="project-sidebar-form">
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{t('project.bookTitle')}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {t('project.bookDesc')}
                  </p>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="journey-contact-success mt-6"
                    >
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-primary-400/40 bg-primary-500/10 text-primary-300">
                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="font-display text-lg font-bold text-white">{t('project.successTitle')}</p>
                      <p className="mt-1 text-sm text-white/70">{t('project.successDesc')}</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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
                        placeholder={t('project.fieldPhone')}
                        required
                        isPhone
                        lang={lang}
                      />
                      <div>
                        <label className="journey-contact-label">{t('project.fieldMessage')}</label>
                        <textarea
                          rows={3}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder={t('project.fieldMessagePh')}
                          className="journey-contact-input min-h-[6.5rem] resize-y"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sidebarSending}
                        className="journey-contact-submit w-full disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {sidebarSending ? t('project.contactSending') : t('project.submitRequest')}
                      </button>
                    </form>
                  )}
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

function UnitPlanCarousel({
  images,
  activeIndex,
  onIndexChange,
  onOpenLightbox,
  title,
  unitLabel,
  lang,
  plansTitle,
  viewLabel,
  variant = 'division',
}) {
  const reduceMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const total = images.length
  const currentSrc = images[activeIndex]

  useEffect(() => {
    if (reduceMotion || paused || total <= 1) return undefined
    const id = setInterval(() => {
      onIndexChange((i) => (i + 1) % total)
    }, 4500)
    return () => clearInterval(id)
  }, [reduceMotion, paused, total, onIndexChange])

  const goPrev = () => onIndexChange((activeIndex - 1 + total) % total)
  const goNext = () => onIndexChange((activeIndex + 1) % total)

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-navy-900">{plansTitle}</h3>
        <span className="rounded-full border border-primary-300/40 bg-primary-500/10 px-4 py-1 text-xs font-bold text-primary-400">
          {unitLabel}
        </span>
      </div>

      <div
        className={`unit-plan-carousel ${variant === 'autocad' ? 'unit-plan-carousel--autocad' : ''}`}
        onMouseEnter={() => setPaused(true)}
        onFocus={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onBlur={() => setPaused(false)}
      >
        <button
          type="button"
          onClick={() => onOpenLightbox(activeIndex)}
          className="unit-plan-carousel-stage group"
          aria-label={`${viewLabel} ${activeIndex + 1}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSrc}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <LazyImage
                src={currentSrc}
                alt={`${title} - ${unitLabel} ${activeIndex + 1}`}
                className={`h-full w-full ${variant === 'autocad' ? 'bg-black' : 'bg-navy-50'}`}
                imgClassName={`object-contain p-3 sm:p-4 transition-transform duration-500 group-hover:scale-[1.02] ${variant === 'autocad' ? 'bg-black' : ''}`}
              />
            </motion.div>
          </AnimatePresence>
          <span className="unit-plan-carousel-view">{viewLabel}</span>
        </button>

        {total > 1 && (
          <>
            <button type="button" onClick={goPrev} className="unit-plan-carousel-nav unit-plan-carousel-nav--prev" aria-label={lang === 'ar' ? 'السابق' : 'Previous'}>
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" onClick={goNext} className="unit-plan-carousel-nav unit-plan-carousel-nav--next" aria-label={lang === 'ar' ? 'التالي' : 'Next'}>
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <>
          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => onIndexChange(i)}
                aria-label={`${unitLabel} ${i + 1}`}
                className={`unit-plan-carousel-dot ${activeIndex === i ? 'unit-plan-carousel-dot-active' : ''}`}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {images.map((img, i) => (
              <button
                key={`${img}-${i}`}
                type="button"
                onClick={() => onIndexChange(i)}
                className={`overflow-hidden rounded-2xl border-2 transition-all ${
                  activeIndex === i ? 'border-primary-400 ring-2 ring-primary-400/25' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <LazyImage src={img} alt="" className="aspect-[4/3] w-full bg-navy-50" imgClassName="object-contain p-1" />
              </button>
            ))}
          </div>
        </>
      )}
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
      <label className="journey-contact-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        pattern={isPhone ? '^(010|011|012|015)[0-9]{8}$' : undefined}
        title={isPhone ? phoneTitle : undefined}
        className="journey-contact-input"
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
