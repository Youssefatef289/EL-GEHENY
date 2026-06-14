import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import BrandLoaderContent from './BrandLoaderContent'

const MIN_DISPLAY_MS = 2200

export default function IntroLoader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const reduceMotion = useReducedMotion()
  const finishedRef = useRef(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    let loadComplete = document.readyState === 'complete'
    const start = performance.now()
    let rafId = 0

    const finish = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      setProgress(100)
      window.setTimeout(() => setVisible(false), reduceMotion ? 120 : 380)
    }

    const onLoad = () => {
      loadComplete = true
    }

    if (!loadComplete) {
      window.addEventListener('load', onLoad, { once: true })
    }

    const tick = (now) => {
      const elapsed = now - start

      setProgress((prev) => {
        let target
        if (loadComplete && elapsed >= MIN_DISPLAY_MS) {
          target = 100
        } else if (loadComplete) {
          const blend = Math.min(1, elapsed / MIN_DISPLAY_MS)
          target = 88 + blend * 12
        } else {
          const phase = Math.min(1, elapsed / (MIN_DISPLAY_MS * 0.95))
          target = 8 + phase * 78
        }

        const next = prev + (target - prev) * 0.12
        const value = Math.min(100, next)

        if (value >= 99.5 && loadComplete && elapsed >= MIN_DISPLAY_MS) {
          finish()
          return 100
        }

        return value
      })

      if (!finishedRef.current) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('load', onLoad)
    }
  }, [reduceMotion])

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = '' }}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { y: '-100%' }
          }
          transition={
            reduceMotion
              ? { duration: 0.35, ease: 'easeInOut' }
              : { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }
        >
          <BrandLoaderContent progress={progress} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
