/** إعدادات حركة موحّدة */
export const motionEase = [0.22, 1, 0.36, 1]

export const motionConfig = {
  offsetY: 28,
  offsetX: 52,
  sectionOffsetY: 40,
  sectionOffsetX: 72,
  duration: 0.62,
  sectionDuration: 0.82,
  stagger: 0.08,
}

export function revealTransition(delay = 0, duration = motionConfig.duration) {
  return { duration, delay, ease: motionEase }
}

export const revealViewport = { once: true, amount: 0.18 }

export function revealInitial(
  reduceMotion = false,
  direction = 'up',
  { offsetY = motionConfig.offsetY, offsetX = motionConfig.offsetX, isRtl = false } = {},
) {
  if (reduceMotion) return false

  switch (direction) {
    case 'down':
      return { opacity: 0, y: -offsetY, filter: 'blur(6px)' }
    case 'left':
      return { opacity: 0, x: -offsetX, filter: 'blur(6px)' }
    case 'right':
      return { opacity: 0, x: offsetX, filter: 'blur(6px)' }
    case 'start':
      return { opacity: 0, x: isRtl ? offsetX : -offsetX, filter: 'blur(6px)' }
    case 'end':
      return { opacity: 0, x: isRtl ? -offsetX : offsetX, filter: 'blur(6px)' }
    default:
      return { opacity: 0, y: offsetY, filter: 'blur(4px)' }
  }
}

export function revealFromBottom(reduceMotion = false, offsetY = motionConfig.offsetY) {
  return revealInitial(reduceMotion, 'up', { offsetY })
}

export const revealToVisible = { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }
