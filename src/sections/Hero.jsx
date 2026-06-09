import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { company } from '../data/site'

import heroVideo from '../../images/website_2.mp4'

export default function Hero() {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()

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
      <motion.div style={bgStyle} className="absolute inset-0 -z-10 overflow-hidden bg-navy-950">
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-950/70 to-transparent" />
      {/* تدرّج سفلي ليبقى النص مقروءاً */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950/60 to-transparent" />

      <div className="container-x relative z-10 flex flex-1 flex-col items-center justify-center pb-20 pt-32 text-center lg:items-start lg:text-start">
        <motion.div
          style={contentStyle}
          className="relative flex max-w-2xl flex-col items-center lg:items-start"
        >
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="eyebrow mb-6 border-white/15 bg-white/10 text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-300" />
            منذ عام {company.since} - {company.nameShort}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7 }}
            className="heading-xl max-w-3xl text-white"
          >
            قوة الخبرة... <span className="text-gradient-primary">برؤية جديدة</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg lg:mx-0"
          >
            رحلة بصرية تكشف مشاريعنا وخبرتنا الممتدة في التطوير العقاري، بحضور سينمائي
            يجمع بين أصالة العلامة وطموح المستقبل.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.7 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start"
          >
            <Link to="/projects" className="btn-primary w-full sm:w-auto">
              استعرض المشاريع
              <ArrowIcon />
            </Link>
            <Link
              to="/contact"
              className="btn btn-shine w-full border border-white/15 bg-white/10 text-white backdrop-blur-xl hover:scale-[1.03] hover:border-white/40 hover:bg-white/20 sm:w-auto"
            >
              تواصل معنا
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="pointer-events-none absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 lg:flex"
      >
        <div className="flex flex-col items-center gap-2 text-white/75">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em]">
            مرر لأسفل
          </span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 bg-white/10 p-1.5 backdrop-blur-md">
            <motion.span
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 w-1 rounded-full bg-primary-300"
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
