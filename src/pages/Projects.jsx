import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import SectionReveal from '../components/SectionReveal'
import { projects, projectCategories } from '../data/projects'
import { useLang, L } from '../i18n'

export default function Projects() {
  const [active, setActive] = useState('all')
  const { t, lang } = useLang()

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  return (
    <>
      {/* ترويسة مبسّطة */}
      <section className="relative overflow-hidden pt-32 pb-6 sm:pt-36">
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-primary-500/10 blur-[130px]" />
        <div className="container-x relative text-center">
          <Reveal>
            <span className="eyebrow mb-5">{t('projectsPage.eyebrow')}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="heading-lg mx-auto max-w-3xl text-navy-900">
              {t('projectsPage.title')}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy-600 sm:text-lg">
              {t('projectsPage.desc')}
            </p>
          </Reveal>
        </div>
      </section>

      <SectionReveal from="left">
      <section className="section-pad pt-10">
        <div className="container-x">
          {/* الفلاتر */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  active === cat.id
                    ? 'text-white'
                    : 'text-navy-700 hover:text-navy-900'
                }`}
              >
                {active === cat.id && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-primary-gradient shadow-lg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {active !== cat.id && (
                  <span className="absolute inset-0 -z-10 rounded-full border border-navy-300 bg-navy-50/50" />
                )}
                {L(cat.name, lang)}
              </button>
            ))}
          </div>

          {/* شبكة المشاريع */}
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-navy-300">{t('projectsPage.empty')}</p>
          )}
        </div>
      </section>
      </SectionReveal>
    </>
  )
}
