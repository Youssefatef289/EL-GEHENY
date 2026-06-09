import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import { projects, projectCategories } from '../data/projects'

export default function Projects() {
  const [active, setActive] = useState('all')

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  return (
    <>
      <PageHeader
        eyebrow="مشاريعنا"
        title="مشاريع تصنع قيمة حقيقية"
        description="اكتشف محفظتنا المتنوعة من المشاريع العقارية المتميزة في أرقى مناطق القاهرة الجديدة."
        breadcrumb={[{ label: 'الرئيسية', to: '/' }, { label: 'المشاريع' }]}
      />

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
                {cat.name}
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
            <p className="py-20 text-center text-navy-300">لا توجد مشاريع في هذا التصنيف حالياً.</p>
          )}
        </div>
      </section>
    </>
  )
}
