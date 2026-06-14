import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { company } from '../data/site'
import { useLang, L } from '../i18n'
import logoImage from '../../images/Logo.png'

const lineEase = [0.22, 1, 0.36, 1]

export default function BrandLoaderContent({ progress = 0, indeterminate = false, compact = false }) {
  const reduceMotion = useReducedMotion()
  const { t, lang } = useLang()
  const [simProgress, setSimProgress] = useState(12)

  useEffect(() => {
    if (!indeterminate || reduceMotion) return undefined

    let rafId = 0
    const tick = () => {
      setSimProgress((prev) => {
        if (prev >= 94) return 10
        return prev + 0.35 + Math.random() * 0.45
      })
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [indeterminate, reduceMotion])

  const pct = Math.min(100, Math.round(indeterminate ? simProgress : progress))

  return (
    <div className={`relative w-full overflow-hidden bg-ink ${compact ? 'min-h-[70vh]' : 'h-full'}`}>
      {/* توهّج ذهبي ناعم */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(202,161,63,0.22)_0%,rgba(202,161,63,0.06)_42%,transparent_72%)] ${reduceMotion ? '' : 'loader-glow'}`}
      />

      {/* شبكة معمارية خفيفة */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-[0.035]" />

      {/* المحتوى المركزي */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 sm:gap-6">
        <div className="relative flex items-center justify-center">
          {/* حلقة دوّارة */}
          {!reduceMotion && (
            <svg
              aria-hidden="true"
              className="loader-ring absolute h-[min(52vw,240px)] w-[min(52vw,240px)] sm:h-60 sm:w-60 md:h-72 md:w-72"
              viewBox="0 0 120 120"
              fill="none"
            >
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="url(#loaderRingGrad)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeDasharray="80 260"
              />
              <defs>
                <linearGradient id="loaderRingGrad" x1="0" y1="0" x2="120" y2="120">
                  <stop stopColor="#FFF6D5" />
                  <stop offset="0.45" stopColor="#CAA13F" />
                  <stop offset="1" stopColor="#7A5C18" />
                </linearGradient>
              </defs>
            </svg>
          )}

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: lineEase, delay: reduceMotion ? 0 : 0.35 }}
            className={`loader-shimmer relative ${reduceMotion ? '' : 'overflow-hidden rounded-2xl'}`}
          >
            <img
              src={logoImage}
              alt={L(company.name, lang)}
              className="relative z-[1] h-20 w-auto max-w-[min(72vw,300px)] object-contain drop-shadow-[0_14px_44px_rgba(202,161,63,0.28)] sm:h-24 md:h-28"
            />
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: lineEase, delay: reduceMotion ? 0 : 0.55 }}
          className="text-center"
        >
          <p className="font-display text-sm font-semibold tracking-[0.22em] text-gradient-primary sm:text-base">
            {L(company.slogan, lang)}
          </p>
          <p className="mt-2 text-xs font-medium tracking-[0.28em] text-navy-500 sm:text-sm">
            {t('loader.since')} {company.since}
          </p>
        </motion.div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.72 }}
          className="loader-dots text-xs font-semibold uppercase tracking-[0.38em] text-navy-600"
          aria-live="polite"
        >
          {t('common.loading')}
        </motion.p>
      </div>

      {/* شريط التقدّم */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="relative h-px overflow-hidden bg-white/10">
          <motion.div
            className="h-full w-full origin-left gold-metallic shadow-[0_0_18px_rgba(202,161,63,0.45)]"
            animate={{ scaleX: pct / 100 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        <div className="flex items-center justify-between px-6 py-4 sm:px-10 sm:py-5">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-navy-500 sm:text-xs">
            {L(company.nameShort, lang)}
          </span>
          <span
            className="font-display text-lg font-light tabular-nums tracking-[0.06em] text-gradient-primary sm:text-xl"
            aria-label={`${pct}%`}
          >
            %{pct}
          </span>
        </div>
      </div>
    </div>
  )
}
