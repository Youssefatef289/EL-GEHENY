import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { projects } from '../data/projects'
import { useLang, L } from '../i18n'
import { useMobileProfile } from '../hooks/useMobileProfile'

import logoImage from '../../images/Logo.png'
import slideJ290 from '../../images/projects/j290/00.jpg'
import slideE80 from '../../images/projects/e80/00.jpg'
import slideM75 from '../../images/projects/m75/00.jpg'
import slideOrchid from '../../images/projects/orchid179/00.jpg'

const SLIDE_MS = 6500

const sliderSlides = [
  {
    projectId: 'j290',
    image: slideJ290,
    nameLine1: { ar: 'الجهيني', en: 'EL-GEHENY' },
    nameLine2: { ar: 'J290 · الحي الثاني', en: 'J290 · SECOND DISTRICT' },
    tagline: { ar: 'فلسفة جديدة للسكن الراقي', en: 'A NEW PHILOSOPHY OF REFINED LIVING' },
  },
  {
    projectId: 'e80',
    image: slideE80,
    nameLine1: { ar: 'الجهيني', en: 'EL-GEHENY' },
    nameLine2: { ar: 'E80 · الحي الخامس', en: 'E80 · FIFTH DISTRICT' },
    tagline: { ar: 'في قلب التجمع الخامس', en: 'AT THE HEART OF THE FIFTH SETTLEMENT' },
  },
  {
    projectId: 'm75',
    image: slideM75,
    nameLine1: { ar: 'الجهيني', en: 'EL-GEHENY' },
    nameLine2: { ar: 'M75 · الحي الثالث', en: 'M75 · THIRD DISTRICT' },
    tagline: { ar: 'استثمار في موقع واعد', en: 'INVESTMENT IN A PROMISING LOCATION' },
  },
  {
    projectId: 'north-orchid-179',
    image: slideOrchid,
    nameLine1: { ar: 'الجهيني', en: 'EL-GEHENY' },
    nameLine2: { ar: '179 · شمال الأوركيد', en: '179 · NORTH ORCHID' },
    tagline: { ar: 'رؤية جديدة للحياة العصرية', en: 'A NEW VISION OF MODERN LIVING' },
  },
]

export default function ProjectsSlider() {
  const { lang, t } = useLang()
  const { isMobile } = useMobileProfile()
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(null)
  const tweenRef = useRef(null)
  const total = sliderSlides.length

  const current = sliderSlides[active]
  const project = projects.find((p) => p.id === current.projectId)

  const goTo = useCallback(
    (index) => {
      setActive((index + total) % total)
      setProgress(0)
    },
    [total],
  )

  const next = useCallback(() => goTo(active + 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1), [active, goTo])

  useEffect(() => {
    if (isMobile) return undefined

    tweenRef.current?.kill()
    setProgress(0)

    const obj = { value: 0 }
    tweenRef.current = gsap.to(obj, {
      value: 1,
      duration: SLIDE_MS / 1000,
      ease: 'none',
      onUpdate: () => setProgress(obj.value),
      onComplete: () => setActive((i) => (i + 1) % total),
    })

    return () => tweenRef.current?.kill()
  }, [active, goTo, isMobile, total])

  if (isMobile) return null

  const slideNum = String(active + 1).padStart(2, '0')
  const totalNum = String(total).padStart(2, '0')

  return (
    <section id="projects-slider" className="projects-slider relative isolate min-h-[100svh] overflow-hidden bg-ink">
      {/* Background slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={current.image}
            alt={L(current.nameLine2, lang)}
            className="h-full w-full object-cover"
            loading={active === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/90" />
      <div className="pointer-events-none absolute inset-0 bg-ink/30" />
      <div className="projects-slider-pattern pointer-events-none absolute inset-y-0 start-0 w-8 opacity-30 sm:w-12" />

      {/* Section header — top left */}
      <div className="absolute start-6 top-28 z-10 sm:start-10 lg:start-16 lg:top-32">
        <img
          src={logoImage}
          alt=""
          className="mb-5 h-10 w-10 rounded-sm object-contain brightness-110 sm:h-12 sm:w-12"
          aria-hidden="true"
        />
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.45em] text-primary-400 sm:text-xs">
          _ {t('projectsSlider.label')}
        </p>
        <h2 className="mt-3 max-w-md font-display text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-[2.75rem]">
          {t('projectsSlider.title')}
        </h2>
        <div className="mt-5 flex items-center gap-3">
          <span className="h-px w-10 bg-white/50 sm:w-14" />
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/75">
            {t('projectsSlider.sectionName')}
          </span>
        </div>
      </div>

      {/* Slider controls — center bottom */}
      <div className="absolute bottom-[11.5rem] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center sm:bottom-[13rem] lg:bottom-[14.5rem]">
        <div className="flex items-center gap-5 text-white">
          <button
            type="button"
            onClick={prev}
            aria-label={t('projectsSlider.prev')}
            className="flex h-8 w-8 items-center justify-center text-lg text-white/70 transition-colors hover:text-white"
          >
            ‹
          </button>
          <span className="min-w-[5.5rem] text-center font-display text-lg font-semibold tracking-widest">
            {slideNum} / {totalNum}
          </span>
          <button
            type="button"
            onClick={next}
            aria-label={t('projectsSlider.next')}
            className="flex h-8 w-8 items-center justify-center text-lg text-white/70 transition-colors hover:text-white"
          >
            ›
          </button>
        </div>
        <div className="mt-3 h-px w-28 overflow-hidden bg-white/20 sm:w-36">
          <div
            ref={progressRef}
            className="h-full origin-left bg-white transition-none"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>

      {/* Bottom info panel */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="grid min-h-[9.5rem] lg:min-h-[11rem] lg:grid-cols-[minmax(0,42%)_minmax(0,58%)]">
          {/* Project name — left */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`name-${active}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-end px-6 pb-6 pt-10 sm:px-10 sm:pb-8 lg:px-14 lg:pb-10"
            >
              <Link to={`/projects/${current.projectId}`} className="group block">
                <span className="block font-display text-4xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {L(current.nameLine1, lang)}
                </span>
                <span className="mt-2 block font-display text-sm font-semibold uppercase tracking-[0.35em] text-white/75 sm:text-base lg:text-lg">
                  {L(current.nameLine2, lang)}
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Description — right dark panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`desc-${active}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center border-t border-white/10 bg-ink/92 px-6 py-6 backdrop-blur-md sm:px-10 sm:py-8 lg:border-s lg:border-t-0 lg:px-14 lg:py-10"
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-primary-400 sm:text-xs">
                {L(current.tagline, lang)}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-[0.95rem] lg:text-base">
                {project ? L(project.description, lang) : ''}
              </p>
              <Link
                to={`/projects/${current.projectId}`}
                className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary-300 transition-colors hover:text-primary-200"
              >
                {t('projectsSlider.viewProject')}
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
