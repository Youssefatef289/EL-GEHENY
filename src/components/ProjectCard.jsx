import { useState } from 'react'
import { motion } from 'framer-motion'
import LazyImage from './LazyImage'
import ProjectModal from './ProjectModal'
import { useLang, L } from '../i18n'

function ComingSoonCard({ project, index = 0 }) {
  const { lang } = useLang()
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-3xl border border-primary-500/30 bg-ink p-8 text-center"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(202,161,63,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute -inset-x-10 -top-10 h-40 bg-primary-500/10 blur-3xl" />

      <span className="relative text-xs font-semibold uppercase tracking-[0.45em] text-primary-300/80">
        {lang === 'ar' ? 'ترقّبوا' : 'Stay Tuned'}
      </span>
      <h3 className="relative mt-4 font-display text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl">
        {lang === 'ar' ? 'قريباً' : 'Coming Soon'}
      </h3>
      <span className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-primary-400/50 px-5 py-2 text-sm font-bold text-gradient-primary">
        {L(project.title, lang)}
      </span>
      <p className="relative mt-4 max-w-xs text-sm leading-relaxed text-white/60">
        {L(project.shortDescription, lang)}
      </p>
    </motion.div>
  )
}

export default function ProjectCard({ project, index = 0 }) {
  const { t, lang } = useLang()
  const [modalOpen, setModalOpen] = useState(false)

  if (project.comingSoon) {
    return <ComingSoonCard project={project} index={index} />
  }

  const delivered = project.statusKey === 'delivered'
  const deliveryLabel = L(project.deliveryStatus, lang)
  const title = L(project.title, lang)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          aria-label={`${t('project.details')} — ${title}`}
          className="group relative block w-full overflow-hidden rounded-3xl border border-primary-200/60 bg-ink text-start shadow-[0_24px_70px_-50px_rgba(15,23,34,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-400/60 hover:shadow-[0_34px_85px_-45px_rgba(202,161,63,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <LazyImage
              src={project.cover}
              alt={title}
              className="h-full w-full object-cover"
              imgClassName="transition-transform duration-700 group-hover:scale-110"
            />

            <span
              className={`absolute end-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${
                delivered
                  ? 'bg-emerald-500/25 text-emerald-100 ring-1 ring-emerald-400/40'
                  : 'bg-amber-500/25 text-amber-100 ring-1 ring-amber-400/40'
              }`}
            >
              {deliveryLabel}
            </span>

            <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
          </div>

          <div className="px-5 py-4 text-center">
            <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-primary-300">
              {title}
            </h3>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-white/55">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-primary-400">
                <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
              </svg>
              {L(project.categoryName, lang)}
            </p>
          </div>
        </button>
      </motion.div>

      <ProjectModal project={project} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
