import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { company } from '../data/site'
import { useLang, L } from '../i18n'

import heroVideo from '../../images/Home page Hero.mp4'

export default function Hero() {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { t, lang } = useLang()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [0, 96])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.1])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18])

  const contentStyle = reduceMotion ? undefined : { y: textY, opacity: textOpacity }
  const bgStyle = reduceMotion ? { scale: 1.05 } : { y: bgY, scale: bgScale }

  return (
    <section
      ref={sectionRef}
      className="perspective relative isolate flex h-[100svh] min-h-[100svh] flex-col overflow-hidden"
    >
      <motion.div style={bgStyle} className="absolute inset-0 -z-10 overflow-hidden bg-ink">
        <video
          className="h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </motion.div>

      {/* تدرّج علوي لإبراز النافبار المدمج فوق الفيديو */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
      {/* تدرّج سفلي ليبقى النص مقروءاً */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/60 to-transparent" />

      <div className="container-x relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-20 pt-28 text-center sm:pt-32">
        <motion.div
          style={contentStyle}
          className="relative flex w-full max-w-3xl flex-col items-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="eyebrow mb-6 border-white/15 bg-white/10 text-white dark:border-navy-200/60 dark:bg-navy-900/30 dark:text-navy-100"
          >
            <span className="h-1.5 w-1.5 rounded-full gold-metallic shadow-gold-sm" />
            {t('hero.badgeSince')} {company.since} - {L(company.nameShort, lang)}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7 }}
            className="heading-xl mx-auto max-w-3xl text-white"
          >
            {t('hero.titleA')} <span className="text-gradient-primary">{t('hero.titleB')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.7 }}
            className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/projects" className="btn-primary w-full sm:w-auto">
              {t('hero.btnProjects')}
              <ArrowIcon />
            </Link>
            <Link
              to="/contact"
              className="btn btn-shine w-full border border-white/15 bg-white/10 text-white backdrop-blur-xl hover:scale-[1.03] hover:border-white/40 hover:bg-white/20 dark:border-navy-300 dark:bg-navy-900/30 dark:text-navy-100 dark:hover:border-navy-400/40 dark:hover:bg-navy-900/40 sm:w-auto"
            >
              {t('hero.btnContact')}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/75">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em]">
            {t('common.scrollDown')}
          </span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 bg-white/10 p-1.5 backdrop-blur-md dark:border-navy-700/50 dark:bg-navy-900/30">
            <motion.span
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 w-1 rounded-full gold-metallic shadow-gold-sm"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`h-4 w-4 ${direction === 'left' ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
