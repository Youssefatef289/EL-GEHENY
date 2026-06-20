import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../i18n'
import {
  motionConfig,
  revealInitial,
  revealToVisible,
  revealTransition,
  revealViewport,
} from '../utils/motion'

/** ظهور سلس عند التمرير — up | down | left | right | start | end */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = motionConfig.duration,
  className = '',
  once = true,
  amount = revealViewport.amount,
  as = 'div',
}) {
  const reduceMotion = useReducedMotion()
  const { lang } = useLang()
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial={revealInitial(reduceMotion, direction, { isRtl: lang === 'ar' })}
      whileInView={revealToVisible}
      viewport={{ once, amount }}
      transition={revealTransition(delay, duration)}
    >
      {children}
    </MotionTag>
  )
}
