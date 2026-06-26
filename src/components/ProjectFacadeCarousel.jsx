import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import LazyImage from './LazyImage'

export default function ProjectFacadeCarousel({ images, alt, onImageClick }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const total = images.length
  const current = images[index]

  useEffect(() => {
    if (reduceMotion || paused || total <= 1) return undefined
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, 4800)
    return () => clearInterval(id)
  }, [reduceMotion, paused, total])

  if (!current) return null

  return (
    <div
      className="project-facade-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={() => onImageClick?.(index)}
        className="project-facade-carousel-stage group"
        aria-label={alt}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <LazyImage
              src={current}
              alt={alt}
              fit="cover"
              className="h-full w-full bg-transparent"
              imgClassName="h-full w-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </button>

      {total > 1 && (
        <div className="project-facade-carousel-dots">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1} / ${total}`}
              aria-current={i === index ? 'true' : undefined}
              className={`project-facade-carousel-dot ${i === index ? 'project-facade-carousel-dot-active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
