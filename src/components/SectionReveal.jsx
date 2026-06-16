import { motion, useReducedMotion } from 'framer-motion'
import {
  motionConfig,
  revealFromBottom,
  revealToVisible,
  revealTransition,
  revealViewport,
} from '../utils/motion'

/** يجعل القسم بأكمله يظهر من الأسفل بحركة بسيطة عند التمرير */
export default function SectionReveal({ children, delay = 0, className = '' }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={revealFromBottom(false, motionConfig.sectionOffsetY)}
      whileInView={revealToVisible}
      viewport={{ ...revealViewport, margin: '0px 0px -8% 0px' }}
      transition={revealTransition(delay, motionConfig.sectionDuration)}
    >
      {children}
    </motion.div>
  )
}
