import { motion, useReducedMotion } from 'framer-motion'
import logoImage from '../../images/Logo.png'

const lineEase = [0.22, 1, 0.36, 1]

export default function BrandLoaderContent({ progress = 0 }) {
  const reduceMotion = useReducedMotion()
  const pct = Math.min(100, Math.round(progress))

  return (
    <div className="relative h-full w-full overflow-hidden bg-canvas">
      {/* إطار خطوط ذهبية — أعلى يسار */}
      <motion.span
        aria-hidden="true"
        className="absolute start-0 top-[11%] h-px origin-left gold-metallic opacity-80"
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.15, ease: lineEase, delay: 0.1 }}
        style={{ width: 'min(42vw, 520px)' }}
      />

      {/* أعلى يمين */}
      <motion.span
        aria-hidden="true"
        className="absolute end-[16%] top-0 w-px origin-top gold-metallic opacity-80"
        initial={reduceMotion ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.05, ease: lineEase, delay: 0.22 }}
        style={{ height: 'min(24vh, 220px)' }}
      />

      {/* أسفل يسار */}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 start-[20%] w-px origin-bottom gold-metallic opacity-80"
        initial={reduceMotion ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.1, ease: lineEase, delay: 0.28 }}
        style={{ height: 'min(30vh, 280px)' }}
      />

      {/* أسفل يمين */}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-[26%] end-0 h-px origin-right gold-metallic opacity-80"
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: lineEase, delay: 0.34 }}
        style={{ width: 'min(36vw, 460px)' }}
      />

      {/* اللوجو في المنتصف */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.img
          src={logoImage}
          alt="الجهيني للتطوير العقاري"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: lineEase, delay: reduceMotion ? 0 : 0.45 }}
          className="h-20 w-auto max-w-[min(72vw,320px)] object-contain drop-shadow-[0_12px_40px_rgba(202,161,63,0.22)] sm:h-28 md:h-32"
        />
      </div>

      {/* عدّاد التحميل */}
      <div
        className="absolute bottom-8 end-8 sm:bottom-12 sm:end-12"
        aria-live="polite"
        aria-label={`${pct}%`}
      >
        <span className="font-display text-xl font-light tabular-nums tracking-[0.08em] text-gradient-primary sm:text-2xl">
          %{pct}
        </span>
      </div>
    </div>
  )
}
