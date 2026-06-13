import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger, registerGsap } from '../gsap/register'
import { projects } from '../data/projects'
import { useLang, L } from '../i18n'
import { useMobileProfile } from '../hooks/useMobileProfile'

const showcaseIds = ['j290', 'e80', 'm75', 'm36']

function shortTitle(project, lang) {
  const title = L(project.title, lang)
  return title.split(' - ')[0]?.split(' · ')[0] || title
}

function MobileProjectCard({ project, lang, viewLabel, index }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group relative block w-full overflow-hidden rounded-2xl bg-ink shadow-lg"
      style={{ height: 'min(52svh, 20rem)' }}
    >
      <img
        src={project.cover}
        alt={L(project.title, lang)}
        className="absolute inset-0 h-full w-full object-cover"
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
      <span className="absolute end-3 top-3 rounded-full border border-white/20 bg-black/25 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-white">
        {L(project.categoryName, lang)}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">
          {shortTitle(project, lang)}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/75 sm:text-sm">
          {L(project.shortDescription, lang)}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary-300">
          {viewLabel}
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 rotate-180">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function ProjectsShowcase() {
  const { lang, t } = useLang()
  const { isMobile, prefersLightAnim } = useMobileProfile()
  const stackRef = useRef(null)
  const cardRefs = useRef([])
  const showcase = showcaseIds.map((id) => projects.find((p) => p.id === id)).filter(Boolean)
  const useStackAnim = !prefersLightAnim

  useEffect(() => {
    if (!useStackAnim) return undefined

    registerGsap()
    const stack = stackRef.current
    const cards = cardRefs.current.filter(Boolean)
    if (!stack || !cards.length) return undefined

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const title = card.querySelector('.stack-card-title')
        const cardHeight = card.offsetHeight
        const isLast = index + 1 === cards.length

        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 20%',
            end: () => (isLast ? 'top 25%' : 'bottom 20%'),
            scrub: 0.5,
            pin: stack,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
          scale: 1 - 0.03 * (cards.length - index - 1),
          marginBottom: -(cardHeight - 40),
          ease: 'none',
        })

        if (title) {
          gsap.to(title, {
            scrollTrigger: {
              trigger: card,
              start: '45% 20%',
              end: () => (isLast ? 'top 25%' : 'bottom 20%'),
              scrub: 1,
              invalidateOnRefresh: true,
            },
            y: -(cardHeight / 2 - 24),
            scale: 0.42,
            opacity: 0.85,
            ease: 'none',
          })
        }
      })
    }, stack)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const timer = setTimeout(refresh, 400)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [lang, showcase.length, useStackAnim])

  return (
    <section id="projects-stack" className="relative overflow-hidden bg-canvas py-14 sm:py-24 lg:py-32">
      <div className="container-x relative z-10 mb-8 text-center sm:mb-14 lg:mb-16">
        <span className="eyebrow mb-3 sm:mb-4">{t('projectsShowcase.eyebrow')}</span>
        <h2 className="heading-lg text-navy-900">{t('projectsShowcase.title')}</h2>
      </div>

      {isMobile ? (
        <div className="container-x flex flex-col gap-4 pb-6 sm:gap-5">
          {showcase.map((project, index) => (
            <MobileProjectCard
              key={project.id}
              project={project}
              lang={lang}
              index={index}
              viewLabel={t('projectsShowcase.viewDetails')}
            />
          ))}
        </div>
      ) : (
        <div ref={stackRef} className="stack relative flex w-full flex-col items-stretch pb-[40vh]">
          {showcase.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className="card group relative flex w-full origin-[center_top] items-center justify-center overflow-hidden bg-surface shadow-[0_-20px_50px_rgba(15,23,34,0.18)]"
              style={{
                height: 'clamp(18rem, 72vh, 42rem)',
                zIndex: index + 1,
              }}
            >
              <img
                src={project.cover}
                alt={L(project.title, lang)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/5" />

              <span className="absolute end-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:text-xs">
                {L(project.categoryName, lang)}
              </span>

              <Link
                to={`/projects/${project.id}`}
                className="relative z-10 flex h-full w-full items-center justify-center p-6"
              >
                <span className="stack-card-title inline-block origin-center font-display text-[clamp(1.75rem,8vmin,4.5rem)] font-extrabold leading-none text-white text-shadow-lg">
                  {shortTitle(project, lang)}
                </span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
