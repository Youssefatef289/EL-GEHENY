import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { projects } from '../data/projects'
import { useLang, L } from '../i18n'

import logoImage from '../../images/Logo.png'

const SLIDE_EASE = [0.22, 1, 0.36, 1]

const imageSlideVariants = {
  enter: (direction) => ({
    opacity: 0,
    scale: 1.08,
    x: `${direction * 22}%`,
    filter: 'blur(6px)',
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    filter: 'blur(0px)',
  },
  exit: (direction) => ({
    opacity: 0,
    scale: 0.94,
    x: `${direction * -22}%`,
    filter: 'blur(6px)',
  }),
}

const textSlideVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 18 : -18,
  }),
  center: {
    opacity: 1,
    y: 0,
  },
  exit: (direction) => ({
    opacity: 0,
    y: direction > 0 ? -14 : 14,
  }),
}

function shortTitle(project, lang) {
  const title = L(project.title, lang)
  const part = title.split(' - ')[0] || title
  return part.replace(/^El-Geheny Real Estate Development\s+/i, '').replace(/^El-Geheny\s+/i, '').replace(/^الجهيني للتطوير العقاري\s+/i, '').replace(/^الجهيني\s+/i, '').trim()
}

function shortLocation(project, lang) {
  const location = L(project.categoryName, lang)
  return location.replace(/^Beit El-Watan\s*-\s*/i, '').replace(/^بيت الوطن\s*-\s*/i, '').trim()
}

function wrapIndex(index, length) {
  return ((index % length) + length) % length
}

function getDirection(current, next, total) {
  if (current === next) return 0
  const forward = (next - current + total) % total
  const backward = (current - next + total) % total
  return forward <= backward ? 1 : -1
}

function ProjectCard({
  project,
  lang,
  isActive,
  offset,
  direction,
  onSelect,
  onPrev,
  onNext,
  showNav,
  isMobile,
  reduceMotion,
}) {
  const title = shortTitle(project, lang)
  const location = shortLocation(project, lang)
  const absOffset = Math.abs(offset)

  const cardMotion = reduceMotion
    ? {}
    : {
        initial: false,
        animate: isMobile
          ? { x: 0, scale: 1, opacity: 1, zIndex: 20, rotateY: 0 }
          : {
              x: `${offset * 92}%`,
              scale: isActive ? 1 : 0.82,
              opacity: absOffset > 1 ? 0 : isActive ? 1 : 0.5,
              zIndex: isActive ? 20 : 10 - absOffset,
              rotateY: isActive ? 0 : offset * -4,
            },
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 30,
          mass: 0.85,
        },
      }

  const slideTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.55, ease: SLIDE_EASE }

  return (
    <motion.article
      {...cardMotion}
      className={
        isMobile
          ? 'available-projects-card relative mx-auto w-full max-w-[30rem]'
          : `available-projects-card absolute left-1/2 top-0 w-[min(92vw,30rem)] -translate-x-1/2 sm:w-[min(88vw,36rem)] lg:w-[min(74vw,50rem)] xl:w-[min(68vw,56rem)] ${
              isActive ? 'pointer-events-auto' : 'pointer-events-auto cursor-pointer'
            }`
      }
      style={{ perspective: 1200 }}
      onClick={() => {
        if (!isActive) onSelect()
      }}
      aria-hidden={!isActive && absOffset > 0}
    >
      <div className="relative overflow-hidden bg-ink shadow-[0_40px_90px_-35px_rgba(0,0,0,0.85)] transition-shadow duration-500">
        <div className="relative aspect-[4/3] w-full min-h-[14rem] sm:aspect-[16/11] sm:min-h-[16rem] lg:aspect-[16/10] lg:min-h-[22rem] xl:min-h-[24rem]">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={project.id}
              custom={direction}
              variants={reduceMotion ? undefined : imageSlideVariants}
              initial={reduceMotion ? false : 'enter'}
              animate="center"
              exit={reduceMotion ? undefined : 'exit'}
              transition={slideTransition}
              className="absolute inset-0"
            >
              <LazyImage
                src={project.cover}
                alt={title}
                className="h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/35" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={project.id}
              custom={direction}
              variants={reduceMotion ? undefined : textSlideVariants}
              initial={reduceMotion ? false : 'enter'}
              animate="center"
              exit={reduceMotion ? undefined : 'exit'}
              transition={{ ...slideTransition, delay: isActive ? 0.06 : 0 }}
              className="flex flex-col items-center"
            >
              <img
                src={logoImage}
                alt=""
                aria-hidden="true"
                className={`object-contain drop-shadow-lg ${
                  isActive ? 'mb-5 h-14 w-auto sm:h-16 lg:h-[4.5rem]' : 'mb-3 h-10 w-auto opacity-80 sm:h-11'
                }`}
              />
              <h3
                className={`font-display font-extrabold uppercase tracking-[0.14em] text-white ${
                  isActive ? 'text-2xl sm:text-3xl lg:text-[2.35rem]' : 'text-lg sm:text-xl'
                }`}
              >
                {title}
              </h3>
              <p
                className={`mt-2 font-sans text-white/85 ${
                  isActive ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                }`}
              >
                {location}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {showNav && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex items-center justify-center gap-4 sm:bottom-5"
            dir="ltr"
          >
            <motion.button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onPrev()
              }}
              aria-label={L({ ar: 'السابق', en: 'Previous' }, lang)}
              className="available-projects-nav-btn pointer-events-auto"
              data-direction="prev"
              whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            />
            <motion.button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onNext()
              }}
              aria-label={L({ ar: 'التالي', en: 'Next' }, lang)}
              className="available-projects-nav-btn pointer-events-auto"
              data-direction="next"
              whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            />
          </div>
        )}

        {isActive && (
          <Link
            to={`/projects/${project.id}`}
            className="absolute inset-0 z-[5]"
            aria-label={`${title} — ${L({ ar: 'عرض التفاصيل', en: 'View details' }, lang)}`}
          />
        )}
      </div>
    </motion.article>
  )
}

export default function ExploreProjects() {
  const reduceMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const { t, lang } = useLang()
  const availableProjects = useMemo(() => projects.slice(0, 6), [])
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const total = availableProjects.length
  const currentProject = availableProjects[active]

  const goTo = useCallback(
    (index, slideDirection) => {
      const nextIndex = wrapIndex(index, total)
      setDirection(slideDirection ?? getDirection(active, nextIndex, total))
      setActive(nextIndex)
    },
    [active, total],
  )

  const next = useCallback(() => goTo(active + 1, 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1, -1), [active, goTo])

  const visibleOffsets = isMobile ? [0] : [-2, -1, 0, 1, 2]

  return (
    <section id="available-projects" className="section-pad relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-primary-500/5 blur-[120px]" />

      <div className="container-x relative mb-10 sm:mb-12">
        <SectionHeading
          eyebrow={t('projectsShowcase.eyebrow')}
          title={t('projectsShowcase.carouselTitle')}
          description={t('projectsShowcase.description')}
        />
      </div>

      <div className="relative border-y border-white/10 bg-ink/60 py-10 sm:py-14">
        <div className="container-x relative">
          <div
            className={`available-projects-stage relative mx-auto h-[22rem] sm:h-[26rem] lg:h-[34rem] xl:h-[38rem] ${
              isMobile ? 'flex max-w-[30rem] items-start justify-center overflow-hidden' : ''
            }`}
          >
            {visibleOffsets.map((offset) => {
              const index = wrapIndex(active + offset, total)
              const project = availableProjects[index]

              return (
                <ProjectCard
                  key={`slot-${offset}`}
                  project={project}
                  lang={lang}
                  isActive={offset === 0}
                  offset={offset}
                  direction={direction}
                  onSelect={() => goTo(index)}
                  onPrev={prev}
                  onNext={next}
                  showNav={isMobile && offset === 0}
                  isMobile={isMobile}
                  reduceMotion={reduceMotion}
                />
              )
            })}

            <div
              className="pointer-events-none absolute inset-x-0 bottom-5 z-30 hidden items-center justify-center gap-5 lg:flex"
              dir="ltr"
            >
              <motion.button
                type="button"
                onClick={prev}
                aria-label={t('projectsSlider.prev')}
                className="available-projects-nav-btn pointer-events-auto"
                data-direction="prev"
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
              />
              <motion.button
                type="button"
                onClick={next}
                aria-label={t('projectsSlider.next')}
                className="available-projects-nav-btn pointer-events-auto"
                data-direction="next"
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
              />
            </div>
          </div>

          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {availableProjects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={shortTitle(project, lang)}
                  aria-current={index === active ? 'true' : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === active ? 'w-8 bg-primary-400' : 'w-3 bg-white/25 hover:bg-white/45'
                  }`}
                />
              ))}
            </div>
          </Reveal>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={reduceMotion ? false : { opacity: 0, y: direction > 0 ? 16 : -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: direction > 0 ? -12 : 12 }}
              transition={{ duration: 0.4, ease: SLIDE_EASE }}
              className="mt-8 text-center"
            >
              <p className="body-sm mx-auto mb-6 max-w-2xl text-hero-body">
                {L(currentProject.shortDescription, lang)}
              </p>

              <Link to={`/projects/${currentProject.id}`} className="btn-primary mx-auto inline-flex">
                {t('projectsShowcase.viewDetails')}
              </Link>

              <div className="mt-5">
                <Link
                  to="/projects"
                  className="body-sm font-semibold text-primary-100/75 transition-colors hover:text-primary-100"
                >
                  {t('projectsShowcase.exploreAll')}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
