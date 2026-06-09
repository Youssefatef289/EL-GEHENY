import { useEffect, useRef, useState } from 'react'

// Hook لعداد رقمي متحرك يبدأ عند ظهور العنصر في الشاشة
export function useCountUp(target, { duration = 2000, decimals = 0, start = 0 } = {}) {
  const [value, setValue] = useState(start)
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const startTime = performance.now()

          const tick = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // easeOutExpo للحصول على حركة سلسة
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            const current = start + (target - start) * eased
            setValue(current)
            if (progress < 1) requestAnimationFrame(tick)
            else setValue(target)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration, start])

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US')

  return { ref, value, formatted }
}
