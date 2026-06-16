import { motion, useReducedMotion } from 'framer-motion'
import {
  motionConfig,
  revealFromBottom,
  revealToVisible,
  revealTransition,
  revealViewport,
} from '../utils/motion'

/** ظهور سلس من الأسفل عند التمرير */
export default function Reveal({
  children,
  direction: _direction = 'up',
  delay = 0,
  duration = motionConfig.duration,
  className = '',
  once = true,
  amount = revealViewport.amount,
  as = 'div',
}) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial={revealFromBottom(reduceMotion)}
      whileInView={revealToVisible}
      viewport={{ once, amount }}
      transition={revealTransition(delay, duration)}
    >
      {children}
    </MotionTag>
  )
}
