import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import LazyImage from '../components/LazyImage'
import { projects } from '../data/projects'
import { useLang, L } from '../i18n'

const FEATURED_IDS = ['j290', 'e80', 'm75', 'north-orchid-179']

function cardLabel(project, lang) {
  const code = project.id.replace('north-orchid-', '').toUpperCase()
  return lang === 'ar' ? `مشروع ${code}` : `Project ${code}`
}

function FeaturedProjectCard({ project, lang, index }) {
  const { t } = useLang()
  const label = cardLabel(project, lang)
  const title = L(project.title, lang)
  const description = L(project.shortDescription, lang)

  return (
    <Reveal direction="up" delay={index * 0.08} className="h-full min-w-0">
      <Link
        to={`/projects/${project.id}`}
        className="group relative block h-full min-h-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_20px_50px_-30px_rgba(0,0,0,0.65)] transition-all duration-500 hover:-translate-y-1 hover:border-primary-400/40 hover:shadow-[0_28px_70px_-35px_rgba(202,161,63,0.35)] sm:min-h-[26rem] sm:rounded-[1.35rem] lg:min-h-[30rem] xl:min-h-[34rem]"
      >
        <div className="relative h-full w-full min-h-[inherit]">
          <LazyImage
            src={project.cover}
            alt={title}
            className="absolute inset-0 h-full w-full"
            imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* الحالة الافتراضية — اسم المشروع أسفل اليمين */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent px-5 pb-5 pt-20 transition-opacity duration-500 group-hover:opacity-0 sm:px-6 sm:pb-6">
            <p className="text-end font-display text-xl font-bold text-white sm:text-2xl">{label}</p>
          </div>

          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/95 via-ink/55 to-ink/15 p-5 opacity-0 transition-all duration-500 group-hover:opacity-100 sm:p-6 lg:p-7">
            <span className="absolute start-1/2 top-[38%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/85 text-xs font-bold uppercase tracking-[0.14em] text-white opacity-0 transition-all duration-500 group-hover:top-[32%] group-hover:opacity-100 sm:h-14 sm:w-14">
              {t('projectsShowcase.view')}
            </span>

            <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="font-display text-2xl font-bold text-white sm:text-[1.65rem]">{label}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white sm:text-base">{description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-300 sm:text-base">
                {t('projectsShowcase.viewMore')}
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export default function ExploreProjects() {
  const { t, lang } = useLang()
  const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean)

  return (
    <section id="our-projects" className="section-pad relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_50%_100%,rgba(202,161,63,0.06),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.025]" />

      <div className="container-x relative">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <SectionTitle className="mb-4 justify-center">{t('projectsShowcase.eyebrow')}</SectionTitle>
          <Reveal delay={0.05}>
            <h2 className="heading-lg text-navy-900">{t('projectsShowcase.title')}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-desc mx-auto mt-5 max-w-2xl">{t('projectsShowcase.description')}</p>
          </Reveal>
        </div>
      </div>

      <div className="relative w-full px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {featured.map((project, index) => (
            <FeaturedProjectCard key={project.id} project={project} lang={lang} index={index} />
          ))}
        </div>
      </div>

      <div className="container-x relative">
        <Reveal delay={0.2} className="mt-12 flex justify-center sm:mt-14">
          <Link to="/projects" className="btn-primary px-8 py-3.5 sm:px-10">
            {t('projectsShowcase.exploreAll')}
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
