import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import ImagePageHero from '../components/ImagePageHero'
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
      <ImagePageHero
        eyebrow={t('projectsPage.eyebrow')}
        title={t('projectsPage.title')}
        description={t('projectsPage.desc')}
        imageAlt={t('projectsPage.title')}
        compact
      />

      <section className="section-pad pb-24 pt-6 sm:pb-16 sm:pt-10">
        <div className="container-x">
          {/* الفلاتر */}
          <div className="relative mb-8 flex justify-center sm:mb-12">
            <div className="pointer-events-none absolute inset-x-4 top-1/2 h-20 -translate-y-1/2 rounded-full bg-primary-500/10 blur-[70px] sm:inset-x-8" />
            <div className="project-filter-shell w-full max-w-full">
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
                  <ProjectCard project={project} index={i} instant />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-muted">{t('projectsPage.empty')}</p>
          )}
        </div>
      </section>
    </>
  )
}
