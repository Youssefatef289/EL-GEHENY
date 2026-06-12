import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { stats } from '../data/site'
import Reveal from '../components/Reveal'
import { useLang, L } from '../i18n'

const achievements = {
  ar: [
    'أكثر من 100 مشروع تم تطويره',
    'خبرة تمتد لأكثر من 35 عاماً',
    'ثقة مئات العملاء',
    'التزام بالتسليم وجودة التنفيذ',
  ],
  en: [
    'More than 100 projects developed',
    'Over 35 years of experience',
    'Trusted by hundreds of clients',
    'Commitment to delivery and execution quality',
  ],
}

// حدود الفواصل بين الخلايا: شبكة 2×2 على الموبايل وصف واحد على الشاشات الأكبر
const cellBorder = [
  '',
  'border-s border-navy-200/50',
  'border-t border-navy-200/50 sm:border-t-0 sm:border-s',
  'border-s border-t border-navy-200/50 sm:border-t-0',
]

function StatItem({ stat, index }) {
  const { lang } = useLang()
  const { ref, formatted } = useCountUp(stat.value, {
    duration: 2200,
    decimals: stat.decimals || 0,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className={`px-5 py-7 text-center sm:px-6 sm:py-9 ${cellBorder[index] || ''}`}
    >
      <div
        ref={ref}
        className="font-display text-4xl font-extrabold tracking-tight text-gradient-primary sm:text-5xl"
      >
        {stat.prefix}
        {formatted}
        {L(stat.suffix, lang)}
      </div>
      <p className="mt-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-navy-500 sm:text-sm">
        {L(stat.label, lang)}
      </p>
    </motion.div>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Stats() {
  const { t, lang } = useLang()
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // بارالاكس: حركة عمودية معاكسة لطبقات السكشن أثناء التمرير
  const cardsY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const glowY = useTransform(scrollYProgress, [0, 1], [-30, 80])

  const cardsStyle = reduceMotion ? undefined : { y: cardsY }
  const contentStyle = reduceMotion ? undefined : { y: contentY }
  const glowStyle = reduceMotion ? undefined : { y: glowY }

  return (
    <section ref={sectionRef} className="relative pt-20 sm:pt-28">
      <motion.div
        style={glowStyle}
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-500/10 blur-[130px]"
      />

      {/* شريط الإحصائيات الموحّد */}
      <motion.div style={cardsStyle} className="container-x">
        <div className="grid grid-cols-2 overflow-hidden rounded-[1.75rem] border border-navy-200/70 bg-surface/80 shadow-[0_30px_80px_-50px_rgba(15,23,34,0.5)] backdrop-blur-xl sm:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>
      </motion.div>

      {/* المحتوى السفلي */}
      <motion.div style={contentStyle} className="container-x pt-16 sm:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-start">
            <Reveal>
              <span className="eyebrow mb-5">{t('stats.eyebrow')}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="font-display text-xl font-bold leading-relaxed text-navy-900 sm:text-2xl">
                {t('stats.p1')}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-navy-600 sm:text-lg">
                {t('stats.p2')}
              </p>
            </Reveal>
          </div>

          <ul className="overflow-hidden rounded-2xl border border-navy-200/60 bg-surface/50 backdrop-blur-md">
            {achievements[lang].map((item, i) => (
              <Reveal key={item} delay={0.08 + i * 0.07} direction="left">
                <li
                  className={`flex items-center gap-3.5 px-5 py-4 transition-colors hover:bg-primary-500/5 ${
                    i < achievements[lang].length - 1 ? 'border-b border-navy-200/40' : ''
                  }`}
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-gradient text-ink shadow-gold">
                    <CheckIcon />
                  </span>
                  <span className="text-sm font-semibold text-navy-800 sm:text-base">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
