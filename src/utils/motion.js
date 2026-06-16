/** إعدادات حركة موحّدة — ظهور من الأسفل */
export const motionEase = [0.22, 1, 0.36, 1]

export const motionConfig = {
  offsetY: 28,
  sectionOffsetY: 40,
  duration: 0.62,
  sectionDuration: 0.72,
  stagger: 0.08,
}

export function revealTransition(delay = 0, duration = motionConfig.duration) {
  return { duration, delay, ease: motionEase }
}

export const revealViewport = { once: true, amount: 0.14 }

export function revealFromBottom(reduceMotion = false, offsetY = motionConfig.offsetY) {
  if (reduceMotion) return false
  return { opacity: 0, y: offsetY }
}

export const revealToVisible = { opacity: 1, y: 0 }
