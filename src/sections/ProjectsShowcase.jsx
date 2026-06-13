import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger, registerGsap } from '../gsap/register'
import { projects } from '../data/projects'
import { useLang, L } from '../i18n'

const showcaseIds = ['j290', 'e80', 'm75', 'm36']

function shortTitle(project, lang) {
  const title = L(project.title, lang)
  return title.split(' - ')[0]?.split(' · ')[0] || title
}

export default function ProjectsShowcase() {
  const { lang, t } = useLang()
  const stackRef = useRef(null)
  const cardRefs = useRef([])
  const showcase = showcaseIds.map((id) => projects.find((p) => p.id === id)).filter(Boolean)

  useEffect(() => {
    registerGsap()
    const stack = stackRef.current
    const cards = cardRefs.current.filter(Boolean)
    if (!stack || !cards.length) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

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
  }, [lang, showcase.length])

  return (
    <section id="projects-stack" className="relative overflow-hidden bg-canvas py-24 sm:py-32">
      <div className="container-x relative z-10 mb-14 text-center sm:mb-16">
        <span className="eyebrow mb-4">{t('projectsShowcase.eyebrow')}</span>
        <h2 className="heading-lg text-navy-900">{t('projectsShowcase.title')}</h2>
      </div>

      <div
        ref={stackRef}
        className="stack relative flex w-full flex-col items-stretch pb-[40vh]"
      >
        {showcase.map((project, index) => (
          <article
            key={project.id}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
            className="card group relative flex w-full origin-[center_top] items-center justify-center overflow-hidden rounded-t-[1.75rem] bg-surface shadow-[0_-20px_50px_rgba(15,23,34,0.22)] sm:rounded-t-[2.25rem]"
            style={{
              height: 'clamp(20rem, 72vh, 42rem)',
              zIndex: index + 1,
            }}
          >
            <img
              src={project.cover}
              alt={L(project.title, lang)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/5" />

            <span className="absolute end-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:text-xs">
              {L(project.categoryName, lang)}
            </span>

            <Link
              to={`/projects/${project.id}`}
              className="relative z-10 flex h-full w-full items-center justify-center p-6"
            >
              <span className="stack-card-title inline-block origin-center font-display text-[clamp(1.75rem,8vmin,4.5rem)] font-extrabold leading-none text-white text-shadow-lg will-change-transform">
                {shortTitle(project, lang)}
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
