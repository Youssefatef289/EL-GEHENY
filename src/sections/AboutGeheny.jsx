import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { useCountUp } from '../hooks/useCountUp'
import { useLang, L } from '../i18n'

import aboutImage from '../../images/about-geheny.jpg'

const content = {
  eyebrow: { ar: 'من نحن', en: 'About Us' },
  statsTitle: { ar: 'من نحن في أرقام', en: 'Us in numbers' },
  p1: {
    ar: 'منذ عام 1990، تواصل الجهيني للتطوير العقاري بناء سجل من النجاحات يعتمد على الجودة، والالتزام، والثقة.',
    en: 'Since 1990, El-Geheny Real Estate Development has been building a record of success rooted in quality, commitment, and trust.',
  },
  p2: {
    ar: 'نطوّر مشروعات سكنية واستثمارية مدروسة بعناية، تجمع بين التصميم العصري، وجودة التنفيذ، والمواقع الواعدة، لنمنح عملاءنا قيمة حقيقية اليوم واستثماراً أكثر قوة للمستقبل.',
    en: 'We develop carefully studied residential and investment projects that combine modern design, quality execution, and promising locations, giving our clients real value today and a stronger investment for the future.',
  },
 
}

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

const stats = [
  { value: 35, suffix: '+', label: { ar: 'سنة خبرة', en: 'Years of experience' } },
  { value: 100, suffix: '+', label: { ar: 'مشروع', en: 'Projects' } },
  {
    text: { ar: 'مشروعات سكنية وتجارية واستثمارية', en: 'Residential, commercial and investment projects' },
  },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CountValue({ value, decimals = 0, className }) {
  const { ref, formatted } = useCountUp(value, { duration: 2200, decimals })
  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  )
}

function StatCard({ stat, lang }) {
  if (stat.text) {
    return (
      <div className="flex min-h-[7.5rem] flex-col items-center justify-center rounded-2xl border border-navy-200/40 bg-surface/70 px-4 py-5 text-center shadow-[0_16px_40px_-30px_rgba(0,0,0,0.55)] sm:min-h-[8rem] sm:px-5 sm:py-6">
        <p className="font-display text-sm font-bold leading-relaxed text-gradient-primary sm:text-base">
          {L(stat.text, lang)}
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-[7.5rem] flex-col items-center justify-center rounded-2xl border border-navy-200/40 bg-surface/70 px-4 py-5 text-center shadow-[0_16px_40px_-30px_rgba(0,0,0,0.55)] sm:min-h-[8rem] sm:px-5 sm:py-6">
      <div className="flex items-baseline justify-center gap-0.5" dir="ltr">
        <span className="font-display text-xl font-extrabold text-primary-500 sm:text-2xl">{stat.suffix}</span>
        <CountValue
          value={stat.value}
          decimals={stat.decimals || 0}
          className="font-display text-4xl font-extrabold leading-none text-gradient-primary sm:text-5xl"
        />
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
      <div className="pointer-events-none absolute -left-16 top-1/4 h-72 w-72 rounded-full bg-primary-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-primary-500/5 blur-[120px]" />

      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          {/* الصورة — يسار في RTL */}
          <Reveal direction="left" className="relative order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-[min(100%,28rem)] sm:max-w-[26rem] lg:max-w-none lg:mx-0">
              <img
                src={aboutImage}
                alt={lang === 'ar' ? 'اكتشف مشروعاتنا — الجهيني للتطوير العقاري' : 'Explore our projects — El-Geheny Real Estate'}
                loading="lazy"
                className="mx-auto w-full scale-105 object-contain object-center sm:scale-100 lg:object-bottom"
              />
            </div>
          </Reveal>

          {/* النص والإحصائيات — يمين في RTL */}
          <div className="order-2 text-center lg:order-1 lg:text-start">
            <SectionTitle className="mb-6">{L(content.eyebrow, lang)}</SectionTitle>

            <Reveal delay={0.05}>
              <p className="mx-auto max-w-xl text-sm font-display font-bold leading-relaxed text-navy-900 sm:text-base sm:body-lg lg:mx-0">
                {L(content.p1, lang)}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:mt-5 sm:section-desc lg:mx-0">
                {L(content.p2, lang)}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="mx-auto mt-8 grid max-w-xl gap-3.5 text-start sm:grid-cols-2 lg:mx-0">
                {achievements[lang].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 gold-check h-6 w-6 flex-shrink-0">
                      <CheckIcon />
                    </span>
                    <span className="text-xs font-semibold text-body sm:body-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mx-auto mt-10 max-w-xl lg:mx-0">
                <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

                <h3 className="section-subtitle mb-6">
                  {L(content.statsTitle, lang)}
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                  {stats.map((stat) => (
                    <StatCard
                      key={stat.text ? L(stat.text, 'ar') : `${stat.value}${stat.suffix}`}
                      stat={stat}
                      lang={lang}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
