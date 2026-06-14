import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { useCountUp } from '../hooks/useCountUp'
import { useLang, L } from '../i18n'

import aboutImage from '../../images/about-geheny.jpg'

const content = {
  eyebrow: { ar: 'نبذة عن الجهيني', en: 'About El-Geheny' },
  titleA: { ar: 'اكتشف قصة', en: 'Discover the story' },
  titleB: { ar: 'نجاحنا المتميّزة', en: 'of our success' },
  p1: {
    ar: 'منذ عام 1990، تواصل الجهيني للتطوير العقاري بناء سجل من النجاحات يعتمد على الجودة، والالتزام، والثقة.',
    en: 'Since 1990, El-Geheny Real Estate Development has been building a record of success rooted in quality, commitment, and trust.',
  },
  p2: {
    ar: 'نطوّر مشروعات سكنية واستثمارية مدروسة بعناية، تجمع بين التصميم العصري، وجودة التنفيذ، والمواقع الواعدة، لنمنح عملاءنا قيمة حقيقية اليوم واستثماراً أكثر قوة للمستقبل.',
    en: 'We develop carefully studied residential and investment projects that combine modern design, quality execution, and promising locations, giving our clients real value today and a stronger investment for the future.',
  },
}

// أبرز الإنجازات
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// الإحصائيات
const stats = [
  { value: 35, suffix: '+', label: { ar: 'سنة من الخبرة', en: 'Years of experience' } },
  { value: 500, suffix: '+', label: { ar: 'عميل واثق', en: 'Confident clients' } },
  { value: 100, suffix: '+', label: { ar: 'مشروع منجز', en: 'Completed projects' } },
]

function CountValue({ value, decimals = 0, className }) {
  const { ref, formatted } = useCountUp(value, { duration: 2200, decimals })
  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  )
}

function StatCard({ stat, lang }) {
  return (
    <div className="flex min-h-[7.5rem] flex-col items-center justify-center rounded-2xl border border-navy-200/50 bg-surface/60 px-4 py-5 text-center shadow-[0_16px_40px_-30px_rgba(0,0,0,0.5)] sm:min-h-[8rem] sm:px-5 sm:py-6">
      <div className="flex items-baseline justify-center gap-0.5">
        <CountValue
          value={stat.value}
          decimals={stat.decimals || 0}
          className="font-display text-4xl font-extrabold leading-none text-gradient-primary sm:text-5xl"
        />
        <span className="font-display text-xl font-extrabold text-primary-500 sm:text-2xl">
          {stat.suffix}
        </span>
      </div>
      <p className="mt-3 max-w-[9rem] body-sm font-semibold leading-snug text-subtle">
        {L(stat.label, lang)}
      </p>
    </div>
  )
}

export default function AboutGeheny() {
  const { lang } = useLang()

  return (
    <section className="section-pad relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -right-16 top-1/4 h-72 w-72 rounded-full bg-primary-500/10 blur-[130px]" />

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* الصورة */}
          <Reveal direction="right" className="relative order-1">
            <div className="relative mx-auto w-full max-w-[30rem]">
              <div className="overflow-hidden rounded-[1.6rem] shadow-[0_40px_90px_-45px_rgba(15,23,34,0.55)]">
                <img
                  src={aboutImage}
                  alt={L(content.eyebrow, lang)}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </Reveal>

          {/* النص والإحصائيات */}
          <div className="order-2 text-center lg:text-start">
            <SectionTitle className="mb-5">{L(content.eyebrow, lang)}</SectionTitle>
            <Reveal delay={0.05}>
              <h2 className="section-subtitle">
                {L(content.titleA, lang)}{' '}
                <span className="text-gradient-primary">{L(content.titleB, lang)}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl body-lg font-display font-bold text-navy-900 lg:mx-0">
                {L(content.p1, lang)}
              </p>
            </Reveal>
            <Reveal delay={0.13}>
              <p className="mx-auto mt-4 max-w-xl section-desc lg:mx-0">
                {L(content.p2, lang)}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <ul className="mx-auto mt-7 grid max-w-xl gap-3 text-start sm:grid-cols-2 lg:mx-0">
                {achievements[lang].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 gold-check h-6 w-6 flex-shrink-0 shadow-gold">
                      <CheckIcon />
                    </span>
                    <span className="body-sm font-semibold text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* الإحصائيات */}
            <Reveal delay={0.18}>
              <div className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3 lg:mx-0">
                {stats.map((stat) => (
                  <StatCard key={L(stat.label, 'ar')} stat={stat} lang={lang} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
