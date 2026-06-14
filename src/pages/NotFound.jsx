import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../i18n'

export default function NotFound() {
  const { t } = useLang()
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-500/15 blur-[120px]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-x relative text-center"
      >
        <p className="font-display text-8xl font-extrabold text-gradient-primary sm:text-9xl">404</p>
        <h1 className="heading-md mt-4 text-navy-900">{t('notFound.title')}</h1>
        <p className="body-md mx-auto mt-3 max-w-md text-body">
          {t('notFound.desc')}
        </p>
        <Link to="/" className="btn-primary mt-8">
          {t('notFound.back')}
        </Link>
      </motion.div>
    </section>
  )
}
