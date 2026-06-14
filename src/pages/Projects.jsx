import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
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
      <section className="relative overflow-hidden bg-ink pt-32 pb-6 sm:pt-36">
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-primary-500/10 blur-[130px]" />
        <div className="container-x relative">
          <SectionTitle as="h1">{t('projectsPage.eyebrow')}</SectionTitle>
          <Reveal delay={0.05}>
            <h2 className="section-subtitle mt-4">{t('projectsPage.title')}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-desc mt-5">
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
                type="button"
                onClick={() => setActive(cat.id)}
                className={active === cat.id ? 'tab-pill-active' : 'tab-pill-idle'}
              >
                {active === cat.id && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 -z-10 rounded-full gold-metallic shadow-gold-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
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
            <p className="py-20 text-center text-muted">{t('projectsPage.empty')}</p>
          )}
        </div>
      </section>
      </SectionReveal>
    </>
  )
}
