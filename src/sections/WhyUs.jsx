import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

const features = [
  {
    title: 'خبرة حقيقية',
    description: 'خبرة متراكمة بدأت منذ عام 1990 في تنفيذ وتطوير مشروعات متنوعة داخل مصر.',
    icon: (
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z" />
    ),
  },
  {
    title: 'مواقع واعدة',
    description: 'نختار مواقع مشروعاتنا بعناية لضمان أعلى قيمة سكنية واستثمارية.',
    icon: <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />,
  },
  {
    title: 'جودة تنفيذ',
    description: 'نلتزم باستخدام أفضل الخامات ومعايير البناء الحديثة لتحقيق أعلى مستويات الجودة.',
    icon: (
      <path d="M3 21h18v-2H3v2zM5 17h2V9H5v8zm4 0h2V5H9v12zm4 0h2v-7h-2v7zm4 0h2V8h-2v9z" />
    ),
  },
  {
    title: 'ثقة تُبنى على الالتزام',
    description: 'نؤمن أن الثقة تُكتسب بالإنجاز، لذلك نلتزم بالشفافية وجودة التنفيذ واحترام مواعيد التسليم.',
    icon: (
      <path d="M12 1l9 4v6c0 5.25-3.75 9.75-9 11-5.25-1.25-9-5.75-9-11V5l9-4zm-1.2 14.2l6-6-1.4-1.4-4.6 4.6-2-2-1.4 1.4 3.4 3.4z" />
    ),
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(
      `perspective(900px) rotateX(${(-y * 12).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) translateY(-6px)`,
    )
  }

  const reset = () => setTransform('perspective(900px) rotateX(0) rotateY(0) translateY(0)')

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ transform }}
        className="card-3d group relative h-full overflow-hidden rounded-3xl border border-primary-200/70 bg-white/85 p-8 shadow-[0_24px_70px_-50px_rgba(15,23,34,0.4)] backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-200 hover:border-primary-300 hover:shadow-[0_32px_80px_-45px_rgba(255,195,77,0.4)]"
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-400/70 to-transparent" />
        <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary-500/0 blur-3xl transition-all duration-500 group-hover:bg-primary-500/20" />
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 ring-1 ring-primary-300 transition-colors group-hover:bg-primary-gradient group-hover:text-white"
          style={{ transform: 'translateZ(40px)' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
            {feature.icon}
          </svg>
        </div>
        <h3
          className="mb-3 font-display text-xl font-bold text-navy-900"
          style={{ transform: 'translateZ(30px)' }}
        >
          {feature.title}
        </h3>
        <p
          className="text-sm leading-relaxed text-navy-700"
          style={{ transform: 'translateZ(20px)' }}
        >
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function WhyUs() {
  return (
    <section className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="لماذا الجهيني؟"
          title="نبني الثقة قبل أن نبني العقار"
          description="أربعة أسباب تجعل من الجهيني للتطوير العقاري الخيار الأمثل لاستثمارك العقاري الآمن."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
