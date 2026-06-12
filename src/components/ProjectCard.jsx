import { useState } from 'react'
import { motion } from 'framer-motion'
import LazyImage from './LazyImage'
import ProjectModal from './ProjectModal'
import { company } from '../data/site'
import { useLang, L } from '../i18n'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.52 11.99c-.25.7-1.47 1.34-2.02 1.39-.55.06-1.07.26-3.61-.75-3.05-1.2-4.99-4.28-5.14-4.48-.15-.2-1.23-1.63-1.23-3.11 0-1.48.78-2.21 1.05-2.51.27-.3.59-.37.79-.37.2 0 .39 0 .56.01.18.01.42-.07.66.5.25.59.84 2.03.91 2.18.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.3.15.47.13.64-.08.17-.2.74-.86.94-1.16.2-.3.39-.25.66-.15.27.1 1.71.81 2 .96.3.15.49.22.56.34.07.12.07.7-.18 1.39z" />
    </svg>
  )
}

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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(189,154,104,0.18),transparent_60%)]" />
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
  const waMessage = encodeURIComponent(
    lang === 'ar'
      ? `مرحباً، أرغب في معرفة المزيد عن مشروع ${L(project.title, lang)}`
      : `Hello, I'd like to know more about ${L(project.title, lang)}`,
  )
  const waHref = `https://wa.me/${company.whatsapp}?text=${waMessage}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-primary-200/60 bg-ink shadow-[0_24px_70px_-50px_rgba(15,23,34,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-400/60 hover:shadow-[0_34px_85px_-45px_rgba(189,154,104,0.5)]"
    >
      {/* الصورة */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <LazyImage
          src={project.cover}
          alt={L(project.title, lang)}
          className="h-full w-full object-cover"
          imgClassName="transition-transform duration-700 group-hover:scale-110"
        />

        {/* شارة الحالة */}
        <span
          className={`absolute end-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${
            delivered
              ? 'bg-emerald-500/25 text-emerald-100 ring-1 ring-emerald-400/40'
              : 'bg-amber-500/25 text-amber-100 ring-1 ring-amber-400/40'
          }`}
        >
          {delivered ? t('project.delivered') : t('project.inProgress')}
        </span>

        {/* طبقة الأزرار عند المرور */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-ink/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            aria-label={t('whatsapp.aria')}
            className="flex translate-y-3 items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 group-hover:translate-y-0"
          >
            <WhatsAppIcon />
            {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
          </a>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex translate-y-3 items-center gap-2 rounded-full bg-primary-gradient px-4 py-2.5 text-sm font-bold text-ink shadow-lg transition-all delay-75 duration-300 hover:scale-105 group-hover:translate-y-0"
          >
            {t('project.details')}
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* شريط العنوان */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="block w-full px-5 py-4 text-center"
      >
        <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-primary-300">
          {L(project.title, lang)}
        </h3>
        <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-white/55">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-primary-400">
            <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
          </svg>
          {L(project.categoryName, lang)}
        </p>
      </button>

      <ProjectModal project={project} open={modalOpen} onClose={() => setModalOpen(false)} />
    </motion.div>
  )
}
