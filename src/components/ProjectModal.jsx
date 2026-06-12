import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import LazyImage from './LazyImage'
import { company } from '../data/site'
import { useLang, L } from '../i18n'

function Arrow({ dir = 'next' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d={dir === 'next' ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Slider({ images, title }) {
  const [index, setIndex] = useState(0)
  const total = images.length
  const go = useCallback(
    (step) => setIndex((i) => (i + step + total) % total),
    [total],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  if (total === 0) return null

  return (
    <div className="space-y-3">
      <div className="group/slider relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <LazyImage
              src={images[index]}
              alt={`${title} - ${index + 1}`}
              className="h-full w-full"
              imgClassName="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute start-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/45 text-white backdrop-blur-md transition-all hover:bg-ink/70 hover:scale-105"
            >
              <span className="rtl:rotate-180">
                <Arrow dir="prev" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute end-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/45 text-white backdrop-blur-md transition-all hover:bg-ink/70 hover:scale-105"
            >
              <span className="rtl:rotate-180">
                <Arrow dir="next" />
              </span>
            </button>

            <span className="absolute bottom-3 end-3 rounded-full bg-ink/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              {index + 1} / {total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                index === i
                  ? 'ring-2 ring-primary-400'
                  : 'opacity-55 hover:opacity-100'
              }`}
            >
              <LazyImage src={img} alt={`${title} ${i + 1}`} className="h-full w-full" imgClassName="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProjectModal({ project, open, onClose }) {
  const { t, lang } = useLang()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!project) return null

  const delivered = project.statusKey === 'delivered'
  const title = L(project.title, lang)
  const images = project.gallery?.length ? project.gallery : project.cover ? [project.cover] : []
  const waMessage = encodeURIComponent(
    lang === 'ar'
      ? `مرحباً، أرغب في معرفة المزيد عن مشروع ${title}`
      : `Hello, I'd like to know more about ${title}`,
  )
  const waHref = `https://wa.me/${company.whatsapp}?text=${waMessage}`

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-canvas shadow-2xl sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t('common.close') || 'Close'}
              className="absolute end-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-ink/55 text-white backdrop-blur-md transition-all hover:bg-ink/80 hover:rotate-90"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="p-4 sm:p-6">
              <Slider images={images} title={title} />

              {/* العنوان والشارات */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary-500/15 px-3 py-1 text-xs font-semibold text-primary-600 ring-1 ring-primary-400/30 dark:text-primary-300">
                  {L(project.categoryName, lang)}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    delivered
                      ? 'bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-400/30 dark:text-emerald-300'
                      : 'bg-amber-500/15 text-amber-600 ring-1 ring-amber-400/30 dark:text-amber-300'
                  }`}
                >
                  {delivered ? t('project.delivered') : t('project.inProgress')}
                </span>
              </div>

              <h2 className="mt-3 font-display text-2xl font-extrabold text-navy-900 sm:text-3xl">{title}</h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-navy-600">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-primary-500">
                  <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
                </svg>
                {L(project.location, lang)}
              </p>

              {/* معلومات سريعة */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Info label={t('project.type')} value={L(project.type, lang)} />
                <Info label={t('project.areaFrom')} value={L(project.area, lang)} />
                <Info label={t('project.units')} value={L(project.units, lang)} />
                <Info
                  label={t('project.deliveryYear')}
                  value={typeof project.deliveryYear === 'object' ? L(project.deliveryYear, lang) : project.deliveryYear}
                />
              </div>

              {/* الوصف */}
              {L(project.description, lang) && (
                <div className="mt-6">
                  <h3 className="mb-2 font-display text-lg font-bold text-navy-900">{t('project.about')}</h3>
                  <p className="text-sm leading-relaxed text-navy-700">{L(project.description, lang)}</p>
                </div>
              )}

              {/* نسبة الإنجاز */}
              {project.progress > 0 && (
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-display text-sm font-bold text-navy-900">{t('project.progress')}</h3>
                    <span className="font-display text-lg font-extrabold text-gradient-primary">{project.progress}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-navy-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="h-full rounded-full bg-primary-gradient"
                    />
                  </div>
                </div>
              )}

              {/* المميزات */}
              {project.features?.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 font-display text-lg font-bold text-navy-900">{t('project.featuresTitle')}</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {project.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2.5 rounded-xl border border-navy-200 bg-navy-50 p-3">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-gradient text-white">
                          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="text-sm text-navy-800">{L(f, lang)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* تقسيمة الوحدات الداخلية */}
              {project.unitDetails?.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 font-display text-lg font-bold text-navy-900">{t('project.unitsTitle')}</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.unitDetails.map((unit, ui) => (
                      <div
                        key={ui}
                        className="rounded-2xl border border-primary-200/60 bg-surface p-5 dark:border-primary-400/20"
                      >
                        <div className="mb-3 border-b border-navy-200 pb-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-display text-base font-bold text-navy-900">{L(unit.name, lang)}</h4>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="rounded-full bg-primary-gradient px-3 py-1 text-xs font-bold text-ink">
                                {L(unit.area, lang)}
                              </span>
                              {unit.extra && (
                                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-600 ring-1 ring-emerald-400/30 dark:text-emerald-300">
                                  {L(unit.extra, lang)}
                                </span>
                              )}
                            </div>
                          </div>
                          {unit.status && (
                            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-600 ring-1 ring-amber-400/30 dark:text-amber-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                              {L(unit.status, lang)}
                            </span>
                          )}
                        </div>
                        <ul className="space-y-1.5">
                          {unit.rooms.map((r, ri) => (
                            <li key={ri} className="flex items-center justify-between gap-2 text-sm text-navy-700">
                              <span className="flex items-center gap-2">
                                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 flex-shrink-0 text-primary-500">
                                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {L(r.name ?? r, lang)}
                              </span>
                              {r.dim && (
                                <span className="flex-shrink-0 rounded-md bg-navy-100 px-2 py-0.5 font-mono text-xs text-navy-500" dir="ltr">
                                  {r.dim}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* مواصفات التسليم */}
              {project.deliverySpecs?.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 font-display text-lg font-bold text-navy-900">{t('project.deliveryTitle')}</h3>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {project.deliverySpecs.map((spec, si) => (
                      <div
                        key={si}
                        className="flex items-center gap-2.5 rounded-xl border border-navy-200 bg-navy-50 p-3"
                      >
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-primary-gradient text-white">
                          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="text-xs leading-snug text-navy-800">{L(spec, lang)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* مميزات الموقع */}
              {project.locationFeatures && (
                <div className="mt-6">
                  <h3 className="mb-3 font-display text-lg font-bold text-navy-900">{t('project.locationTitle')}</h3>
                  <div className="rounded-2xl border border-primary-200/60 bg-surface p-5 dark:border-primary-400/20">
                    {project.locationFeatures.tagline && (
                      <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-gradient px-3 py-1 text-xs font-bold text-ink">
                        {L(project.locationFeatures.tagline, lang)}
                      </span>
                    )}
                    {project.locationFeatures.intro && (
                      <p className="text-sm leading-relaxed text-navy-700">{L(project.locationFeatures.intro, lang)}</p>
                    )}
                    {project.locationFeatures.points?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.locationFeatures.points.map((pt, pi) => (
                          <span
                            key={pi}
                            className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-navy-50 px-3 py-1.5 text-xs font-semibold text-navy-700"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-primary-500">
                              <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
                            </svg>
                            {L(pt, lang)}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.locationFeatures.highlights?.length > 0 && (
                      <div className="mt-4 space-y-3 border-t border-navy-200 pt-4">
                        {project.locationFeatures.highlights.map((h, hi) => (
                          <div key={hi}>
                            <h4 className="flex items-center gap-2 font-display text-sm font-bold text-navy-900">
                              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-gradient text-[10px] font-bold text-ink">
                                {hi + 1}
                              </span>
                              {L(h.title, lang)}
                            </h4>
                            <p className="mt-1 ps-7 text-xs leading-relaxed text-navy-600">{L(h.desc, lang)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* طرق السداد */}
              {project.payment?.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 font-display text-lg font-bold text-navy-900">{t('project.paymentTitle')}</h3>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.payment.map((p, pi) => (
                      <div key={pi} className="glass-primary rounded-2xl p-4 text-center">
                        <p className="font-display text-lg font-extrabold text-gradient-primary">{L(p.value, lang)}</p>
                        <p className="mt-1 text-xs text-navy-700">{L(p.label, lang)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* أزرار التواصل */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" />
                  </svg>
                  {lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-navy-300 px-5 py-3 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-100"
                >
                  {t('common.close') || (lang === 'ar' ? 'إغلاق' : 'Close')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-navy-200 bg-navy-50 p-3 text-center">
      <p className="text-[11px] text-navy-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-navy-900">{value}</p>
    </div>
  )
}
