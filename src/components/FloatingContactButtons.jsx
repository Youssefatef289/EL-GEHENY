import { motion } from 'framer-motion'
import { company } from '../data/site'
import { useLang } from '../i18n'

export default function FloatingContactButtons() {
  const { t } = useLang()
  const message = encodeURIComponent(t('whatsapp.message'))
  const whatsappHref = `https://wa.me/${company.whatsapp}?text=${message}`
  const phoneHref = `tel:+${company.phoneIntl}`

  const spring = { type: 'spring', stiffness: 260, damping: 20 }

  return (
    <div className="floating-contact-stack">
      <motion.a
        href={phoneHref}
        aria-label={t('nav.callNow')}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...spring, delay: 0.9 }}
        className="floating-contact floating-contact--phone group"
      >
        <span className="floating-contact-tooltip floating-contact-tooltip--phone">{t('nav.callNow')}</span>
        <span className="floating-contact-icon">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path
              d="M3 5.5C3 4.12 4.12 3 5.5 3H7c.6 0 1.1.4 1.3 1l.9 3.2c.1.5 0 1-.4 1.4l-1.3 1.3a13 13 0 005.6 5.6l1.3-1.3c.4-.4.9-.5 1.4-.4l3.2.9c.6.2 1 .7 1 1.3v1.5c0 1.4-1.1 2.5-2.5 2.5C10.5 21 3 13.5 3 5.5z"
              fill="currentColor"
            />
          </svg>
        </span>
      </motion.a>

      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={t('whatsapp.aria')}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...spring, delay: 1 }}
        className="floating-contact floating-contact--whatsapp group"
      >
        <span className="floating-contact-tooltip floating-contact-tooltip--whatsapp">{t('whatsapp.tooltip')}</span>
        <span className="floating-contact-icon floating-contact-icon--whatsapp">
          <span className="floating-contact-ping" aria-hidden="true" />
          <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-7 w-7" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.21 8.21 0 01-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.82c0 4.54-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
          </svg>
        </span>
      </motion.a>
    </div>
  )
}
