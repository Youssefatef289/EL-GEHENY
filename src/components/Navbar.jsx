import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { navLinks, company } from '../data/site'
import { useLang } from '../i18n'
import { useTheme } from '../theme'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openKey, setOpenKey] = useState(null)
  const { t, toggleLang } = useLang()
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const open = openKey === location.key
  const isHomeHero = location.pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // منع التمرير عند فتح قائمة الموبايل
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const headerClassName = scrolled
    ? 'border-b border-primary-200/70 dark:border-navy-700/50 bg-canvas/95 py-3 backdrop-blur-xl shadow-lg'
    : 'border-b border-transparent bg-transparent py-6'

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerClassName}`}
    >
      <nav className="container-x flex items-center justify-between">
        <Logo />

        <ul className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
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
            title={isDark ? t('common.themeToLight') : t('common.themeToDark')}
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
          <a href={`tel:${company.phone}`} className="btn-primary !py-2.5 !px-5 text-xs">
            <PhoneIcon />
            {t('common.contactUs')}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? t('common.themeToLight') : t('common.themeToDark')}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
              isHomeHero
                ? 'border-white/15 bg-white/10 text-white backdrop-blur-xl'
                : 'border-navy-300 bg-navy-100 text-navy-900 dark:border-navy-700 dark:bg-navy-900/60 dark:text-navy-100'
            }`}
          >
            <ThemeIcon isDark={isDark} />
          </button>
          <button
            onClick={toggleLang}
            aria-label={t('common.langLabel')}
            className={`flex h-11 items-center gap-1.5 rounded-xl border px-3 text-sm font-bold ${
              isHomeHero
                ? 'border-white/15 bg-white/10 text-white backdrop-blur-xl'
                : 'border-navy-300 bg-navy-100 text-navy-900 dark:border-navy-700 dark:bg-navy-900/60 dark:text-navy-100'
            }`}
          >
            <GlobeIcon />
            {t('common.langButton')}
          </button>
          <button
            onClick={() =>
              setOpenKey((currentKey) => (currentKey === location.key ? null : location.key))
            }
            className={`relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border ${
              isHomeHero
                ? 'border-white/15 bg-white/10 text-white backdrop-blur-xl'
                : 'border-navy-300 bg-navy-100 text-navy-900 dark:border-navy-700 dark:bg-navy-900/60 dark:text-navy-100'
            }`}
            aria-label={t('common.menu')}
          >
          <div className="flex w-5 flex-col gap-1.5">
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-full bg-current"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-full bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-full bg-current"
            />
          </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-40 bg-canvas/95 dark:bg-navy-950/95 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
              }}
              className="container-x flex h-full flex-col justify-center gap-3"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.to}
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block rounded-2xl px-6 py-4 text-2xl font-bold transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-600'
                          : 'text-navy-900 hover:bg-navy-100'
                      }`
                    }
                  >
                    {t(`nav.${link.key}`)}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  show: { opacity: 1, x: 0 },
                }}
                className="mt-4"
              >
                <a href={`tel:${company.phone}`} className="btn-primary w-full">
                  <PhoneIcon />
                  {t('common.callUs')}: {company.phone}
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
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

function ThemeIcon({ isDark }) {
  if (isDark) {
    // أيقونة الشمس (للتبديل إلى الوضع الفاتح)
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
  // أيقونة القمر (للتبديل إلى الوضع الداكن)
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
