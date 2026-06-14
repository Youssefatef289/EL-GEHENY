import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { company } from '../data/site'
import { useLang, L } from '../i18n'

const motionCardsData = {
  ar: [
    { title: 'حركة سلسة', text: 'انتقال ناعم مع التمرير يمنح الصفحة إحساساً حيّاً ومريحاً.' },
    { title: 'عمق بصري', text: 'طبقات الضوء والظل تصنع بعداً ثلاثيّاً بدون ازدحام بصري.' },
    { title: 'هوية راقية', text: 'ألوان ذهبية ونفَس معماري يواكب طابع العلامة التجارية.' },
  ],
  en: [
    { title: 'Smooth motion', text: 'A gentle transition on scroll gives the page a lively, comfortable feel.' },
    { title: 'Visual depth', text: 'Layers of light and shadow create a three-dimensional feel without visual clutter.' },
    { title: 'Refined identity', text: 'Golden tones and an architectural touch that match the brand’s character.' },
  ],
}

const bottomPillsData = {
  ar: [
    { label: 'ثقة', value: '01' },
    { label: 'تفاصيل', value: '02' },
    { label: 'رؤية', value: '03' },
  ],
  en: [
    { label: 'Trust', value: '01' },
    { label: 'Detail', value: '02' },
    { label: 'Vision', value: '03' },
  ],
}

export default function PageHeader({ eyebrow, title, description, breadcrumb = [], image, imageAlt, fullImage = false }) {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { t, lang } = useLang()
  const motionCards = motionCardsData[lang]
  const heroPills = [
    { label: t('pageHeader.pillSince'), value: `${company.since}` },
    { label: t('pageHeader.pillIdentity'), value: L(company.nameShort, lang) },
    { label: t('pageHeader.pillMotion'), value: 'Scroll 3D' },
  ]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.92, 0.12])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 42])
  const visualRotate = useTransform(scrollYProgress, [0, 1], [12, -8])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.05, 1])

  const contentStyle = reduceMotion
    ? undefined
    : {
        y: contentY,
        scale: contentScale,
        opacity: contentOpacity,
      }

  const visualStyle = reduceMotion
    ? undefined
    : {
        y: visualY,
        rotateX: 8,
        rotateY: visualRotate,
      }

  const glowStyle = reduceMotion
    ? undefined
    : {
        y: glowY,
        scale: glowScale,
      }

  if (image && fullImage) {
    return (
      <section className="relative isolate flex min-h-[58svh] flex-col justify-end overflow-hidden pt-28 pb-14 sm:min-h-[68svh]">
        <img
          src={image}
          alt={imageAlt || title}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-canvas/92 via-canvas/55 to-canvas/25 sm:from-ink/92 sm:via-ink/55 sm:to-ink/25" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-canvas/70 to-transparent sm:from-ink/70" />

        <div className="container-x relative">
          {breadcrumb.length > 0 && (
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-6 flex items-center gap-2 text-sm text-navy-700 dark:text-white/80"
            >
              {breadcrumb.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  {item.to ? (
                    <Link
                      to={item.to}
                      className="transition-colors hover:text-primary-600 dark:hover:text-primary-300"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-primary-600 dark:text-primary-300">{item.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-navy-400 dark:text-white/40">
                      <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              ))}
            </motion.nav>
          )}

          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="eyebrow mb-5 border-primary-200 bg-primary-100 text-primary-700 dark:border-white/25 dark:bg-white/10 dark:text-white"
            >
              {eyebrow}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="heading-xl max-w-4xl text-navy-900 dark:text-white"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-navy-800 dark:text-navy-100 sm:text-lg dark:sm:text-white/85"
            >
              {description}
            </motion.p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="perspective relative isolate flex h-[100svh] min-h-[100svh] flex-col overflow-hidden pt-24 pb-6 sm:pt-28 sm:pb-8"
    >
      <div className="absolute inset-0 bg-white-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(202,161,63,0.2),transparent_28%),radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.7),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(248,242,231,0.92)_58%,rgba(241,232,216,0.88)_100%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(202,161,63,0.18),transparent_30%),linear-gradient(180deg,rgba(11,18,29,0.4)_0%,rgba(8,13,21,0.7)_100%)]" />
      <motion.div
        style={glowStyle}
        className="pointer-events-none absolute -right-24 top-8 h-80 w-80 rounded-full bg-primary-400/20 blur-[140px]"
      />
      <motion.div
        style={{ ...glowStyle, scale: glowScale }}
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-navy-400/15 blur-[150px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15 mask-fade-b" />
      <motion.div
        style={{ scaleX: progressScale }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-primary-gradient"
      />

      <div className="container-x relative z-10 grid flex-1 items-center gap-8 py-4 sm:gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <motion.div
          style={contentStyle}
          className="relative max-w-3xl text-center lg:text-left"
        >
          {breadcrumb.length > 0 && (
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-6 flex items-center justify-center gap-2 text-sm text-navy-700 lg:justify-start"
            >
              {breadcrumb.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  {item.to ? (
                    <Link to={item.to} className="transition-colors hover:text-primary-600">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-primary-600">{item.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-navy-400">
                      <path
                        d="M15 19l-7-7 7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              ))}
            </motion.nav>
          )}

          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="eyebrow mb-5"
            >
              {eyebrow}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="heading-xl max-w-4xl text-navy-950 dark:text-white"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-navy-800 dark:text-navy-100 sm:text-lg sm:text-white/85"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {heroPills.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-surface/75 px-4 py-2 text-sm font-semibold text-navy-700 shadow-sm backdrop-blur-md dark:bg-navy-900/65 dark:text-navy-100"
              >
                <span className="text-primary-600 dark:text-primary-300">{pill.label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                {pill.value}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={visualStyle}
          className="relative mx-auto w-full max-w-[36rem]"
        >
          <motion.div
            style={glowStyle}
            className="pointer-events-none absolute -inset-10 rounded-full bg-primary-500/15 blur-[120px]"
          />

          {image ? (
            <div className="glass-primary card-3d relative overflow-hidden rounded-[2rem] border border-primary-200/60 p-3 shadow-[0_24px_90px_-40px_rgba(15,23,34,0.25)] sm:rounded-[2.5rem] sm:p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(202,161,63,0.22),transparent_38%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9),transparent_28%)]" />
              <div className="relative overflow-hidden rounded-[1.6rem] sm:rounded-[2rem]">
                <img
                  src={image}
                  alt={imageAlt || title}
                  className="aspect-square w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/85 via-white/20 to-transparent dark:from-navy-950/70 dark:via-navy-950/40 dark:to-navy-950/10" />
                <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/40 sm:rounded-[2rem]" />
              </div>
            </div>
          ) : (
          <div className="glass-primary card-3d relative overflow-hidden rounded-[2rem] border border-primary-200/60 p-4 shadow-[0_24px_90px_-40px_rgba(15,23,34,0.25)] sm:rounded-[2.5rem] sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(202,161,63,0.2),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9),transparent_28%)]" />
            <div className="relative flex min-h-[18rem] flex-col justify-between sm:min-h-[24rem] lg:min-h-[28rem]">
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow border-primary-200 bg-primary-100 text-primary-600">
                  3D Hero
                </span>
                <span className="rounded-full border border-navy-200 bg-surface/75 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-navy-600 dark:bg-navy-900/65 dark:text-navy-100">
                  Scroll Motion
                </span>
              </div>

              <div className="mt-8 space-y-4">
                {motionCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.15 + index * 0.1 }}
                    className="rounded-[1.35rem] border border-primary-100/70 bg-surface/80 p-4 shadow-sm backdrop-blur-md dark:border-navy-200/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl font-bold text-navy-900 dark:text-white">{card.title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-navy-200">{card.text}</p>
                      </div>
                      <span className="gold-metallic flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold text-ink shadow-gold">
                        0{index + 1}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {bottomPillsData[lang].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.1rem] border border-navy-200/80 bg-surface/70 px-3 py-3 text-center dark:bg-navy-900/65"
                  >
                    <p className="font-display text-lg font-bold text-navy-900 dark:text-white">{item.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-navy-500 dark:text-navy-200">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42 }}
            className="mt-3 hidden items-center justify-between rounded-[1.35rem] border border-primary-200 bg-surface/80 px-4 py-3 backdrop-blur-md sm:mt-5 sm:flex"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-navy-500">
                {L(company.nameShort, lang)}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-navy-900">
                {t('pageHeader.pillSince')} {company.since}
              </p>
            </div>
            <div className="flex items-center gap-2 text-right">
              <span className="flex h-3.5 w-3.5 rounded-full bg-primary-400 shadow-[0_0_0_6px_rgba(202,161,63,0.12)]" />
              <span className="text-sm font-semibold text-navy-600">Scroll-ready hero</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.45 }}
        className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-navy-600">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em]">
            {t('common.scrollDown')}
          </span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-primary-300/70 bg-surface/70 p-1.5 backdrop-blur-md">
            <motion.span
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 w-1 rounded-full bg-primary-500"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
