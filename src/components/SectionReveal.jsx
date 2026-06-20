import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../i18n'
import {
  motionConfig,
  revealInitial,
  revealToVisible,
  revealTransition,
  revealViewport,
} from '../utils/motion'

/** يجعل القسم يظهر من الجانب بحركة تدريجية عند التمرير */
export default function SectionReveal({ children, delay = 0, from = 'start', className = '' }) {
  const reduceMotion = useReducedMotion()
  const { lang } = useLang()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={revealInitial(false, from, {
        offsetX: motionConfig.sectionOffsetX,
        isRtl: lang === 'ar',
      })}
      whileInView={revealToVisible}
      viewport={{ ...revealViewport, margin: '0px 0px -6% 0px' }}
      transition={revealTransition(delay, motionConfig.sectionDuration)}
    >
      {children}
    </motion.div>
  )
}
