import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { navLinks, company } from '../data/site'
import { useLang, L } from '../i18n'
import { useTheme } from '../theme'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t, toggleLang, lang } = useLang()
  const { isDark, toggleTheme } = useTheme()
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
              onClick={toggleTheme}
              aria-label={isDark ? t('common.themeToLight') : t('common.themeToDark')}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${
                isHomeHero
                  ? 'border-white/25 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20'
                  : 'border-primary-300 bg-primary-50 text-primary-700 hover:bg-primary-100 dark:border-primary-500/40 dark:bg-primary-500/10 dark:text-primary-300 dark:hover:bg-primary-500/20'
              }`}
            >
              <ThemeIcon isDark={isDark} />
            </button>
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

          {/* Mobile — theme, lang, phone, menu */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? t('common.themeToLight') : t('common.themeToDark')}
              title={isDark ? t('common.themeToLight') : t('common.themeToDark')}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors sm:h-10 sm:w-10 ${mobileBtnClass}`}
            >
              <ThemeIcon isDark={isDark} />
            </button>
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
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[200] lg:hidden"
              >
                <motion.button
                  type="button"
                  aria-label={t('common.close')}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeMenu}
                  className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ x: lang === 'ar' ? '100%' : '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: lang === 'ar' ? '100%' : '-100%' }}
                  transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                  className="absolute inset-y-0 start-0 flex w-full max-w-sm flex-col bg-canvas shadow-2xl dark:bg-navy-950"
                >
                  {/* Modal header */}
                  <div className="flex items-center justify-between border-b border-navy-200/70 px-5 py-4 dark:border-navy-700/50">
                    <div>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary-600 dark:text-primary-400">
                        {t('navMenu.eyebrow')}
                      </p>
                      <p className="font-display text-lg font-bold text-navy-900 dark:text-white">
                        {L(company.nameShort, lang)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={closeMenu}
                      aria-label={t('common.close')}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-navy-200 bg-surface text-navy-700 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-100"
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  {/* Nav links */}
                  <nav className="flex-1 overflow-y-auto px-4 py-5">
                    <ul className="space-y-1">
                      {navLinks.map((link, i) => (
                        <li key={link.to}>
                          <NavLink
                            to={link.to}
                            end={link.to === '/'}
                            onClick={closeMenu}
                            className={({ isActive }) =>
                              `flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors ${
                                isActive
                                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300'
                                  : 'text-navy-800 hover:bg-navy-100 dark:text-navy-100 dark:hover:bg-navy-900/60'
                              }`
                            }
                          >
                            {({ isActive }) => (
                              <>
                                <span
                                  className={`font-display text-sm font-extrabold tabular-nums ${
                                    isActive ? 'text-primary-500' : 'text-navy-400 dark:text-navy-500'
                                  }`}
                                >
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="text-lg font-bold">{t(`nav.${link.key}`)}</span>
                              </>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Modal footer */}
                  <div className="space-y-3 border-t border-navy-200/70 px-4 py-5 dark:border-navy-700/50">
                    <a href={`tel:${company.phone}`} className="btn-primary w-full" dir="ltr">
                      <PhoneIcon />
                      {company.phone}
                    </a>
                    <a
                      href={`https://wa.me/${company.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline w-full"
                    >
                      {t('common.contactWhatsapp')}
                    </a>
                  </div>
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

function ThemeIcon({ isDark }) {
  if (isDark) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-[1.15rem] w-[1.15rem]">
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.15rem] w-[1.15rem]">
      <path
        d="M20.5 14.3A8.5 8.5 0 1 1 9.7 3.5a6.8 6.8 0 0 0 10.8 10.8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
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
