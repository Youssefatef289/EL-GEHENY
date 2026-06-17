import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import SectionReveal from '../components/SectionReveal'
import { projects, projectCategories } from '../data/projects'
import { useLang, L } from '../i18n'

export default function Projects() {
  const [active, setActive] = useState('all')
  const tabRefs = useRef({})
  const { t, lang } = useLang()

  const selectCategory = (id) => {
    setActive(id)
    tabRefs.current[id]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

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

      <SectionReveal>
      <section className="section-pad pt-10">
        <div className="container-x">
          {/* الفلاتر */}
          <div className="relative mb-12 flex justify-center">
            <div className="pointer-events-none absolute inset-x-8 top-1/2 h-20 -translate-y-1/2 rounded-full bg-primary-500/10 blur-[70px]" />
            <div className="project-filter-shell">
              <div className="project-filter-scroll">
                <div className="project-filter-track">
                  {projectCategories.map((cat) => (
                    <button
                      key={cat.id}
                      ref={(el) => {
                        tabRefs.current[cat.id] = el
                      }}
                      type="button"
                      onClick={() => selectCategory(cat.id)}
                      className={active === cat.id ? 'project-filter-tab-active' : 'project-filter-tab-idle'}
                    >
                      {L(cat.name, lang)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
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
