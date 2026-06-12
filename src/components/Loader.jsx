import { motion } from 'framer-motion'
import { useLang } from '../i18n'
import logoImage from '../../images/Logo.png'

// شاشة تحميل عصرية: اللوجو في المنتصف مع لودر المكعّبات المتحركة
export default function Loader() {
  const { t } = useLang()

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6">
      {/* توهّج خلفي ناعم */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-primary-500/15 blur-[120px]" />

      <div className="relative flex flex-col items-center gap-10">
        {/* اللوجو في المنتصف */}
        <motion.img
          src={logoImage}
          alt="الجهيني للتطوير العقاري"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-20 w-auto max-w-[260px] object-contain drop-shadow-[0_8px_28px_rgba(189,154,104,0.28)] sm:h-24"
        />

        {/* لودر المكعّبات المتحركة */}
        <div className="brand-loader" aria-hidden="true">
          <div className="brand-loader-square" />
          <div className="brand-loader-square" />
          <div className="brand-loader-square" />
          <div className="brand-loader-square" />
          <div className="brand-loader-square" />
          <div className="brand-loader-square" />
          <div className="brand-loader-square" />
        </div>

        <p className="text-sm font-semibold tracking-[0.35em] text-navy-600">
          {t('common.loading')}
        </p>
      </div>
    </div>
  )
}
