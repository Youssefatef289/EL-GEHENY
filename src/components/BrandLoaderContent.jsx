import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { company } from '../data/site'
import { useLang, L } from '../i18n'
import logoImage from '../../images/Logo.png'

const lineEase = [0.22, 1, 0.36, 1]
const DEVELOPMENT = 'DEVELOPMENT'
const LOGO_REVEAL_DELAY = 0.35
const WORD_START_DELAY = 1.05
const LETTER_STAGGER = 0.07

function DevelopmentWord({ startDelay = WORD_START_DELAY }) {
  const reduceMotion = useReducedMotion()

  return (
    <p
      dir="ltr"
      className="flex flex-row flex-nowrap items-center justify-center gap-[0.06em] font-sans text-3xl font-extrabold uppercase leading-none tracking-[0.14em] sm:text-4xl md:text-5xl lg:text-6xl [unicode-bidi:isolate]"
      aria-label={DEVELOPMENT}
    >
      {DEVELOPMENT.split('').map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                  scale: 0.88,
                  filter: 'blur(5px)',
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 0.55,
            delay: startDelay + index * LETTER_STAGGER,
            ease: lineEase,
          }}
          className="inline-flex shrink-0 items-center justify-center text-gradient-primary will-change-transform drop-shadow-[0_2px_14px_rgba(212,175,55,0.35)]"
        >
          {letter}
        </motion.span>
      ))}
    </p>
  )
}

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
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 sm:gap-8">
        <div className="relative flex flex-col items-center gap-6 sm:gap-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: lineEase, delay: reduceMotion ? 0 : LOGO_REVEAL_DELAY }}
            className={`loader-shimmer relative ${reduceMotion ? '' : 'overflow-hidden rounded-2xl'}`}
          >
            <img
              src={logoImage}
              alt={L(company.name, lang)}
              className="relative z-[1] h-20 w-auto max-w-[min(72vw,300px)] object-contain drop-shadow-[0_14px_44px_rgba(212,175,55,0.3)] sm:h-24 md:h-28"
            />
          </motion.div>

          <DevelopmentWord />
        </div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: reduceMotion ? 0 : WORD_START_DELAY + DEVELOPMENT.length * LETTER_STAGGER + 0.25,
          }}
          className="loader-dots text-xs font-semibold uppercase tracking-[0.32em] text-navy-500"
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
