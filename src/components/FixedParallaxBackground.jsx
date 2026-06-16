import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * خلفية parallax — تتحرك بسلاسة مع الـ scroll.
 */
export default function FixedParallaxBackground({
  targetRef,
  image,
  alt = '',
  overlayClassName = '',
  imageClassName = '',
  parallaxRange = 22,
}) {
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [`-${parallaxRange}%`, `${parallaxRange}%`])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden={!alt}>
      <motion.img
        src={image}
        alt={alt}
        draggable={false}
        className={`parallax-scroll-image absolute start-0 top-[-10%] h-[120%] w-full object-cover object-center will-change-transform ${imageClassName}`}
        style={{ y: reduceMotion ? 0 : bgY }}
      />

      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  )
}
