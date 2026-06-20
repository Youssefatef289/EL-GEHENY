import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { navLinks, company } from '../data/site'
import { useLang } from '../i18n'

function isHeroOverlayRoute(pathname) {
  return (
    pathname === '/' ||
    pathname === '/about' ||
    pathname === '/projects' ||
    pathname.startsWith('/projects/')
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, toggleLang, dir } = useLang()
  const location = useLocation()
  const whatsappMessage = encodeURIComponent(t('whatsapp.message'))

  const isOverlayPage = isHeroOverlayRoute(location.pathname)
  const isOverlay = isOverlayPage && !scrolled && !mobileOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMenu = () => setMobileOpen(false)

  const shellClass = isOverlay
    ? 'nav-shell nav-shell-overlay'
    : scrolled && isOverlayPage
      ? 'nav-shell nav-shell-scrolled'
      : 'nav-shell'

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`${shellClass} fixed inset-x-0 top-0 z-50`}
      >
        <nav className="container-x grid h-[5.75rem] w-full grid-cols-[auto_1fr_auto] items-center gap-2 sm:h-[6.5rem] sm:gap-4 lg:h-[7.25rem] lg:gap-6 xl:h-[7.75rem]">
          {/* اللوجو — أقصى اليمين في RTL */}
          <div className="justify-self-start">
            <Logo
              onClick={closeMenu}
              compact
              className="h-[4.5rem] max-w-[280px] sm:h-[5.25rem] sm:max-w-[340px] lg:h-[6rem] lg:max-w-[420px] xl:h-[6.75rem] xl:max-w-[480px]"
            />
          </div>

          {/* الروابط — الوسط */}
          <ul className="hidden items-center justify-center gap-6 xl:gap-10 lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  {t(`nav.${link.key}`)}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* الأيقونات — أقصى الشمال في RTL */}
          <div className="hidden items-center justify-end gap-2 lg:flex xl:gap-2.5">
            <a href={`tel:${company.phone}`} className="btn-primary px-4 py-2.5 text-[0.68rem]">
              {t('nav.callNow')}
            </a>
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t('common.langLabel')}
              className="btn-outline min-w-10 px-2.5 py-2.5 text-[0.68rem]"
            >
              {t('common.langButton')}
            </button>
            <a
              href={`https://wa.me/${company.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              aria-label={t('whatsapp.aria')}
              className="nav-whatsapp"
            >
              <span className="nav-whatsapp-icon">
                <WhatsAppIcon />
              </span>
              <span className="nav-whatsapp-label">{t('whatsapp.tooltip')}</span>
            </a>
          </div>

          {/* موبايل */}
          <div className="flex items-center justify-end gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t('common.langLabel')}
              className="btn-outline min-w-9 px-2 py-2 text-[0.65rem]"
            >
              {t('common.langButton')}
            </button>
            <a href={`tel:${company.phone}`} aria-label={t('nav.callNow')} className="btn-outline min-h-9 min-w-9 px-0 py-0">
              <PhoneIcon />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t('common.close') : t('common.menu')}
              className="btn-outline min-h-9 min-w-9 px-0 py-0"
            >
              <MenuIcon open={mobileOpen} />
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
                <button
                  type="button"
                  aria-label={t('common.close')}
                  onClick={closeMenu}
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                  className="absolute inset-y-0 end-0 flex w-[min(100%,22rem)] flex-col border-s border-white/10 bg-[#111111] shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <Logo onClick={closeMenu} compact className="h-[4.25rem] max-w-[260px]" />
                    <button type="button" onClick={closeMenu} aria-label={t('common.close')} className="btn-outline min-h-9 min-w-9 px-0 py-0">
                      <CloseIcon />
                    </button>
                  </div>

                  <nav className="flex-1 overflow-y-auto px-4 py-4">
                    <ul className="space-y-1">
                      {navLinks.map((link) => (
                        <li key={link.to}>
                          <NavLink
                            to={link.to}
                            end={link.to === '/'}
                            onClick={closeMenu}
                            className={({ isActive }) =>
                              `block rounded px-3 py-3 text-base font-medium transition-colors ${
                                isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                              }`
                            }
                          >
                            {t(`nav.${link.key}`)}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="space-y-2 border-t border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <a href={`tel:${company.phone}`} className="btn-primary w-full">
                      {t('nav.callNow')}
                    </a>
                    <a
                      href={`https://wa.me/${company.whatsapp}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline w-full"
                    >
                      <WhatsAppIcon />
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

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.15rem] w-[1.15rem]" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.21 8.21 0 01-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.82c0 4.54-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  )
}
