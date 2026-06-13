import { motion, useReducedMotion } from 'framer-motion'

// يجعل القسم بأكمله يظهر منزلقاً من الجانب مع ميل ثلاثي الأبعاد بسيط عند التمرير
export default function SectionReveal({ children, from = 'left', delay = 0, className = '' }) {
  const reduceMotion = useReducedMotion()
  const dir = from === 'right' ? 1 : -1

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1200, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, x: 80 * dir, rotateY: 7 * dir }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
