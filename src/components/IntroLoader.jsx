import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logoImage from '../../images/Logo.png'

// شاشة افتتاحية: يظهر اللوجو ثم تختفي الشاشة (تظهر مرة واحدة لكل جلسة)
export default function IntroLoader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem('elgeheny-intro-seen')
  })

  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      sessionStorage.setItem('elgeheny-intro-seen', '1')
      setVisible(false)
    }, 1900)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            document.body.style.overflow = ''
          }}
        >
          <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-primary-500/15 blur-[120px]" />

          <motion.img
            src={logoImage}
            alt="الجهيني للتطوير العقاري"
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.85, 1, 1, 1.05],
              y: [12, 0, 0, -8],
            }}
            transition={{ duration: 1.9, times: [0, 0.3, 0.75, 1], ease: 'easeInOut' }}
            className="relative h-24 w-auto max-w-[280px] object-contain drop-shadow-[0_10px_34px_rgba(189,154,104,0.3)] sm:h-28"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
