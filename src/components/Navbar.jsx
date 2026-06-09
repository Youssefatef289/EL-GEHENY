import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { navLinks, company } from '../data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openKey, setOpenKey] = useState(null)
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
    ? 'border-b border-primary-200/70 bg-[#fcfbf7]/95 py-3 backdrop-blur-xl shadow-lg'
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
                    {link.label}
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
          <a href={`tel:${company.phone}`} className="btn-primary !py-2.5 !px-5 text-xs">
            <PhoneIcon />
            {company.phone}
          </a>
        </div>

        <button
          onClick={() =>
            setOpenKey((currentKey) => (currentKey === location.key ? null : location.key))
          }
          className={`relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border lg:hidden ${
            isHomeHero
              ? 'border-white/15 bg-white/10 text-white backdrop-blur-xl'
              : 'border-navy-300 bg-navy-100 text-navy-900'
          }`}
          aria-label="القائمة"
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
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-40 bg-[#fcfbf7]/95 backdrop-blur-xl lg:hidden"
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
                    {link.label}
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
                  اتصل بنا: {company.phone}
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
