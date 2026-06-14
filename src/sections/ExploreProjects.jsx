import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import SectionTitle from '../components/SectionTitle'
import { projects, projectCategories } from '../data/projects'
import { useLang, L } from '../i18n'

const VISIBLE_COUNT = 3
const slideEase = [0.22, 1, 0.36, 1]

function shortTitle(project, lang) {
  const title = L(project.title, lang)
  return title.split(' - ')[0]?.split(' · ')[0] || title
}

function NavArrow({ direction, onClick, label, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/30 bg-white/[0.04] text-white transition-all duration-300 hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-primary-300 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        {direction === 'prev' ? (
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  )
}

function ProjectTile({ project, lang, index, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08, ease: slideEase }}
      className="min-w-0"
    >
      <Link
        to={`/projects/${project.id}`}
        className="group mx-auto block h-full w-[92%] max-w-[300px] sm:max-w-[320px] lg:w-[88%] lg:max-w-none xl:w-[85%]"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <LazyImage
            src={project.cover}
            alt={shortTitle(project, lang)}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/12" />
        </div>
        <h3 className="card-title mt-3 text-white transition-colors duration-300 group-hover:text-primary-300 sm:mt-4">
          {shortTitle(project, lang)}
        </h3>
      </Link>
    </motion.div>
  )
}

export default function ExploreProjects() {
  const [active, setActive] = useState('all')
  const [startIndex, setStartIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const reduceMotion = useReducedMotion()
  const { t, lang } = useLang()

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  const maxStart = Math.max(0, filtered.length - VISIBLE_COUNT)
  const canSlide = filtered.length > VISIBLE_COUNT

  const visibleProjects = useMemo(() => {
    if (filtered.length <= VISIBLE_COUNT) return filtered
    return filtered.slice(startIndex, startIndex + VISIBLE_COUNT)
  }, [filtered, startIndex])

  useEffect(() => {
    setStartIndex(0)
    setDirection(1)
  }, [active])

  useEffect(() => {
    if (startIndex > maxStart) setStartIndex(maxStart)
  }, [startIndex, maxStart])

  const goNext = () => {
    if (!canSlide) return
    setDirection(1)
    setStartIndex((i) => (i >= maxStart ? 0 : i + 1))
  }

  const goPrev = () => {
    if (!canSlide) return
    setDirection(-1)
    setStartIndex((i) => (i <= 0 ? maxStart : i - 1))
  }

  const slideVariants = {
    enter: (d) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d > 0 ? 56 : -56,
    }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d > 0 ? -56 : 56,
    }),
  }

  const sidebarPad = 'max(1.25rem,calc((100vw-80rem)/2+1.25rem))'

  return (
    <section id="explore-projects" className="section-pad bg-ink">
      <div className="container-x mb-10 sm:mb-12">
        <SectionTitle>{t('projectsShowcase.title')}</SectionTitle>
      </div>

      <div className="flex w-full flex-col lg:flex-row lg:items-center" dir="ltr">
        {/* الشريط الجانبي — فلاتر + أسهم + كل المشاريع */}
        <aside
          className="flex shrink-0 flex-col justify-center px-5 sm:px-8 lg:w-[15.5rem] lg:px-0 lg:ps-[var(--explore-sidebar-pad)] lg:pe-6 xl:w-[17rem]"
          style={{ '--explore-sidebar-pad': sidebarPad }}
        >
          <div className="flex flex-col lg:ms-6 xl:ms-10">
            <ul className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {projectCategories.map((cat) => {
                const isActive = active === cat.id
                return (
                  <li key={cat.id} className="w-full min-w-[10.5rem] shrink-0 lg:min-w-0">
                    <button
                      type="button"
                      onClick={() => setActive(cat.id)}
                      className={`w-full rounded-[5px] px-5 py-4 text-center text-sm font-semibold leading-snug transition-all duration-300 sm:px-6 sm:py-[1.125rem] sm:text-[0.9375rem] lg:px-5 lg:py-4 xl:px-6 xl:py-[1.1875rem] ${
                        isActive
                          ? 'gold-metallic text-ink shadow-gold-sm'
                          : 'bg-white/[0.07] text-white/85 hover:bg-white/[0.11] hover:text-white'
                      }`}
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    >
                      {L(cat.name, lang)}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex flex-col items-center gap-4 lg:items-stretch">
              <div className="flex justify-center gap-2">
                <NavArrow direction="prev" onClick={goPrev} label={t('projectsSlider.prev')} disabled={!canSlide} />
                <NavArrow direction="next" onClick={goNext} label={t('projectsSlider.next')} disabled={!canSlide} />
              </div>
              <Link
                to="/projects"
                className="btn-outline w-full !justify-center !py-3 !text-sm"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              >
                {t('featured.allShort')}
              </Link>
            </div>
          </div>
        </aside>

        {/* المعرض — 3 صور بعرض كامل */}
        <div
          className="mt-8 min-w-0 flex-1 lg:mt-0 lg:pe-[var(--explore-sidebar-pad)]"
          style={{ '--explore-sidebar-pad': sidebarPad }}
        >
          {filtered.length === 0 ? (
            <p className="px-5 py-16 text-center body-sm text-hero-muted sm:px-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              {t('projectsPage.empty')}
            </p>
          ) : (
            <div className="relative px-5 sm:px-8 lg:px-0">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${active}-${startIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: slideEase }}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8 xl:gap-10"
                >
                  {visibleProjects.map((project, i) => (
                    <ProjectTile
                      key={project.id}
                      project={project}
                      lang={lang}
                      index={i}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
