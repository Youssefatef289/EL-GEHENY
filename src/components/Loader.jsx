import { motion } from 'framer-motion'

// شاشة تحميل تظهر أثناء تحميل الصفحات المؤجلة (lazy)
export default function Loader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-16 w-16">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-primary-400/20"
          />
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold text-gradient-primary">
            ج
          </span>
        </div>
        <p className="text-sm tracking-widest text-navy-600">جارِ التحميل...</p>
      </div>
    </div>
  )
}
