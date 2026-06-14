import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { navLinks, company } from '../data/site'
import { useLang } from '../i18n'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t, toggleLang } = useLang()
  const location = useLocation()
  const isHomeHero = location.pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const headerClassName = scrolled || mobileOpen
    ? 'border-b border-primary-200/70 dark:border-navy-700/50 bg-canvas/95 py-3 backdrop-blur-xl shadow-lg'
    : 'border-b border-transparent bg-transparent py-4 sm:py-5'

  const closeMenu = () => setMobileOpen(false)

  const mobileBtnClass =
    isHomeHero && !mobileOpen
      ? 'border-white/15 bg-white/10 text-white backdrop-blur-xl'
      : 'border-primary-300 bg-primary-50 text-primary-700 dark:border-primary-500/40 dark:bg-primary-500/10 dark:text-primary-300'

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerClassName}`}
      >
        <nav className="container-x flex min-w-0 items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0 shrink">
            <Logo onClick={closeMenu} compact />
          </div>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `group relative px-4 py-2 text-[0.95rem] font-semibold transition-colors duration-300 ${
                      isActive
                        ? isHomeHero
                          ? 'text-white'
                          : 'text-primary-600'
                        : isHomeHero
                          ? 'text-white/80 hover:text-white'
                          : 'text-navy-700 hover:text-navy-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {t(`nav.${link.key}`)}
                      <span
                        className={`pointer-events-none absolute inset-x-3 -bottom-1 h-0.5 origin-center scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100 ${
                          isHomeHero ? 'bg-white' : 'bg-primary-500'
                        }`}
                      />
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className={`absolute inset-x-3 -bottom-1 h-0.5 rounded-full ${
                            isHomeHero ? 'bg-white' : 'bg-primary-500'
                          }`}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={toggleLang}
              aria-label={t('common.langLabel')}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-bold transition-colors duration-300 ${
                isHomeHero
                  ? 'border-white/25 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20'
                  : 'border-primary-300 bg-primary-50 text-primary-700 hover:bg-primary-100 dark:border-primary-500/40 dark:bg-primary-500/10 dark:text-primary-300 dark:hover:bg-primary-500/20'
              }`}
            >
              <GlobeIcon />
              {t('common.langButton')}
            </button>
            <a href={`tel:${company.phone}`} className="btn-primary !px-5 !py-2.5 text-xs">
              <PhoneIcon />
              {t('common.contactUs')}
            </a>
          </div>

          {/* Mobile — lang, phone, menu */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t('common.langLabel')}
              title={t('common.langLabel')}
              className={`flex h-9 min-w-9 items-center justify-center rounded-xl border px-2 text-xs font-bold transition-colors sm:h-10 sm:min-w-10 sm:px-2.5 sm:text-sm ${mobileBtnClass}`}
            >
              {t('common.langButton')}
            </button>
            <a
              href={`tel:${company.phone}`}
              aria-label={t('common.callUs')}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors sm:h-10 sm:w-10 ${mobileBtnClass}`}
            >
              <PhoneIcon />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t('common.close') : t('common.menu')}
              className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-colors sm:h-10 sm:w-10 ${mobileBtnClass}`}
            >
              <div className="flex w-5 flex-col gap-1.5">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-full bg-current"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="block h-0.5 w-full bg-current"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-full bg-current"
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={t('common.menu')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="fixed inset-0 z-[200] lg:hidden"
              >
                <motion.button
                  type="button"
                  aria-label={t('common.close')}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={closeMenu}
                  className="absolute inset-0 bg-ink/75 backdrop-blur-md"
                />

                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 420, damping: 38, mass: 0.85 }}
                  className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col overflow-hidden rounded-t-[1.75rem] border border-primary-500/15 bg-ink shadow-[0_-24px_80px_-20px_rgba(0,0,0,0.65)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(202,161,63,0.12),transparent_55%)]" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

                  {/* مقبض السحب */}
                  <div className="relative flex justify-center pt-3 pb-1">
                    <span className="h-1 w-10 rounded-full bg-white/20" aria-hidden="true" />
                  </div>

                  {/* رأس الموديل */}
                  <div className="relative flex items-center justify-between px-5 pb-4 pt-1">
                    <Logo onClick={closeMenu} compact className="!h-[3.25rem] !max-w-[210px] sm:!h-[3.5rem] sm:!max-w-[235px]" />
                    <button
                      type="button"
                      onClick={closeMenu}
                      aria-label={t('common.close')}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:border-primary-500/30 hover:bg-primary-500/10 hover:text-primary-300"
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  {/* روابط التنقل */}
                  <nav className="relative flex-1 overflow-y-auto px-5 pb-2">
                    <ul className="space-y-1">
                      {navLinks.map((link, i) => (
                        <motion.li
                          key={link.to}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <NavLink
                            to={link.to}
                            end={link.to === '/'}
                            onClick={closeMenu}
                            className={({ isActive }) =>
                              `group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                                isActive
                                  ? 'bg-primary-500/10 text-primary-300'
                                  : 'text-white/75 hover:bg-white/5 hover:text-white'
                              }`
                            }
                          >
                            {({ isActive }) => (
                              <>
                                <span className="text-base font-semibold tracking-wide">{t(`nav.${link.key}`)}</span>
                                <span
                                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                                    isActive
                                      ? 'border-primary-500/40 bg-primary-500/15 text-primary-300'
                                      : 'border-white/10 bg-white/5 text-white/40 group-hover:border-primary-500/25 group-hover:text-primary-400'
                                  }`}
                                >
                                  <ChevronIcon />
                                </span>
                              </>
                            )}
                          </NavLink>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  {/* أزرار التواصل */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative space-y-2.5 border-t border-white/10 px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
                  >
                    <a href={`tel:${company.phone}`} className="btn-primary w-full !py-3" dir="ltr">
                      <PhoneIcon />
                      {company.phone}
                    </a>
                    <a
                      href={`https://wa.me/${company.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline w-full !border-white/15 !bg-white/5 !py-3 !text-white/90 hover:!border-primary-500/40 hover:!bg-primary-500/10 hover:!text-primary-300"
                    >
                      {t('common.contactWhatsapp')}
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M3 5.5C3 4.12 4.12 3 5.5 3H7c.6 0 1.1.4 1.3 1l.9 3.2c.1.5 0 1-.4 1.4l-1.3 1.3a13 13 0 005.6 5.6l1.3-1.3c.4-.4.9-.5 1.4-.4l3.2.9c.6.2 1 .7 1 1.3v1.5c0 1.4-1.1 2.5-2.5 2.5C10.5 21 3 13.5 3 5.5z"
        fill="currentColor"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 rtl:rotate-180" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
