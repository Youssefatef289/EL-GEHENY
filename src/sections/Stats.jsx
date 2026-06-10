import { motion } from 'framer-motion'
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

function StatItem({ stat, index }) {
  const { lang } = useLang()
  const { ref, formatted } = useCountUp(stat.value, {
    duration: 2200,
    decimals: stat.decimals || 0,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl border border-primary-200/70 bg-white/85 p-7 text-center shadow-[0_24px_70px_-45px_rgba(15,23,34,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-300 hover:shadow-[0_32px_80px_-40px_rgba(189,154,104,0.45)] sm:p-8"
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-400/70 to-transparent" />
      <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-primary-500/10 blur-2xl transition-opacity duration-300 group-hover:bg-primary-500/20" />
      <div ref={ref} className="font-display text-4xl font-extrabold text-gradient-primary sm:text-5xl">
        {stat.prefix}
        {formatted}
        {L(stat.suffix, lang)}
      </div>
      <p className="mt-3 text-sm font-semibold text-navy-700 sm:text-base">{L(stat.label, lang)}</p>
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
  return (
    <section className="relative z-30">
      <div className="container-x -mt-24 sm:-mt-28">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>

      <div className="container-x pt-16 sm:pt-24">
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
              <p className="mt-5 text-base leading-relaxed text-navy-700 sm:text-lg">
                {t('stats.p2')}
              </p>
            </Reveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {achievements[lang].map((item, i) => (
              <Reveal key={item} delay={0.1 + i * 0.08} direction="left">
                <li className="flex h-full items-start gap-3 rounded-2xl border border-primary-200/70 bg-white/80 p-4 shadow-[0_18px_50px_-40px_rgba(15,23,34,0.5)] backdrop-blur-md transition-colors hover:border-primary-300">
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-gradient text-white shadow-gold">
                    <CheckIcon />
                  </span>
                  <span className="text-sm font-semibold text-navy-800 sm:text-base">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
