import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LazyImage from './LazyImage'

// كارت مشروع بتأثير Tilt ثلاثي الأبعاد عند المرور بالماوس
export default function ProjectCard({ project, index = 0 }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const rotateX = (-y * 10).toFixed(2)
    const rotateY = (x * 12).toFixed(2)
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`)
  }

  const reset = () => setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)')

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="perspective"
    >
      <Link
        to={`/projects/${project.id}`}
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ transform }}
        className="card-3d group relative block overflow-hidden rounded-3xl border border-primary-200/70 bg-white/90 shadow-[0_24px_70px_-50px_rgba(15,23,34,0.4)] backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-200 ease-out hover:border-primary-300 hover:shadow-[0_32px_85px_-45px_rgba(255,195,77,0.45)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <LazyImage
            src={project.cover}
            alt={project.title}
            className="h-full w-full"
            imgClassName="transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
          <span className="absolute right-4 top-4 rounded-full bg-navy-100/70 px-3 py-1 text-xs font-semibold text-primary-600 backdrop-blur-md ring-1 ring-primary-300/30">
            {project.categoryName}
          </span>
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${
              project.status === 'تم التسليم'
                ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30'
                : 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/30'
            }`}
          >
            {project.status}
          </span>
        </div>

        <div className="relative space-y-4 p-6" style={{ transform: 'translateZ(40px)' }}>
          <div>
            <h3 className="font-display text-xl font-bold text-navy-900 transition-colors group-hover:text-primary-600">
              {project.title}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-navy-700">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-primary-500">
                <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
              </svg>
              {project.categoryName}
            </p>
          </div>

          <p className="line-clamp-2 text-sm leading-relaxed text-navy-700">
            {project.shortDescription}
          </p>

          {/* شريط نسبة الإنجاز */}
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-navy-700">نسبة الإنجاز</span>
              <span className="font-bold text-primary-600">{project.progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-navy-200">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${project.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full rounded-full bg-primary-gradient"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-navy-200 pt-4 text-sm">
            <span className="text-navy-700">{project.type}</span>
            <span className="flex items-center gap-1 font-semibold text-primary-600">
              التفاصيل
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform group-hover:-translate-x-1">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
