import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { useCountUp } from '../hooks/useCountUp'
import { useLang, L } from '../i18n'

import aboutTeamImage from '../../images/من نحن.jpeg'

const content = {
  eyebrow: { ar: 'من نحن', en: 'About Us' },
  statsTitle: { ar: 'من نحن في أرقام', en: 'Us in numbers' },
  imageAlt: {
    ar: 'فريق قيادة الجهيني للتطوير العقاري',
    en: 'El-Geheny Real Estate Development leadership team',
  },
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
    value: 150000,
    suffix: '+',
    unit: { ar: 'م²', en: 'm²' },
    compact: true,
    label: { ar: 'مساحات تم تطويرها وتنميتها', en: 'Areas developed & built' },
  },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
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
  const valueSize = stat.compact ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'
  const suffixSize = stat.compact ? 'text-xs sm:text-sm' : 'text-base sm:text-lg'
  const unitSize = stat.compact ? 'text-sm sm:text-base' : 'text-lg sm:text-xl'

  return (
    <div className="flex min-h-[6.5rem] flex-col items-center justify-center rounded-xl border border-white/10 bg-surface/40 px-2 py-4 text-center sm:min-h-[7rem] sm:rounded-2xl sm:px-3 sm:py-5">
      <div className="flex flex-wrap items-baseline justify-center gap-x-0.5 leading-none" dir="ltr">
        <CountValue
          value={stat.value}
          decimals={stat.decimals || 0}
          className={`font-display font-extrabold leading-snug tracking-tight text-gradient-primary ${valueSize}`}
        />
        {stat.suffix && (
          <span className={`font-display font-extrabold text-primary-500 ${suffixSize}`}>{stat.suffix}</span>
        )}
        {stat.unit && (
          <span className={`font-display font-extrabold text-primary-500 ${unitSize}`}>{L(stat.unit, lang)}</span>
        )}
      </div>
      <p className="mt-2 max-w-[10rem] text-[0.7rem] font-semibold leading-snug text-subtle sm:body-sm">
        {L(stat.label, lang)}
      </p>
    </div>
  )
}

export default function AboutGeheny() {
  const { lang } = useLang()

  return (
    <section id="about-us" className="relative w-full overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/25 to-transparent" />

      <div className="grid w-full lg:min-h-[min(82vh,780px)] lg:grid-cols-2">
        {/* النص + الأرقام — يمين في RTL */}
        <Reveal direction="start" duration={0.78} className="order-2 flex items-center border-t border-white/10 lg:order-1 lg:border-t-0 lg:border-e lg:border-white/10">
          <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16 xl:px-16 2xl:px-20">
            <div className="mx-auto w-full max-w-xl lg:mx-0">
              <SectionTitle className="mb-5">{L(content.eyebrow, lang)}</SectionTitle>

              <Reveal direction="start" delay={0.14}>
                <p className="body-md font-semibold leading-relaxed text-navy-900 sm:body-lg">{L(content.p1, lang)}</p>
              </Reveal>

              <Reveal direction="start" delay={0.2}>
                <p className="section-desc mt-5">{L(content.p2, lang)}</p>
              </Reveal>

              <Reveal direction="start" delay={0.26}>
                <ul className="mt-8 grid gap-3 text-start sm:grid-cols-2 sm:gap-3.5">
                  {achievements[lang].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="gold-check mt-0.5 h-6 w-6 flex-shrink-0">
                        <CheckIcon />
                      </span>
                      <span className="text-xs font-semibold text-body sm:body-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal direction="start" delay={0.32}>
                <div className="mt-10 border-t border-white/10 pt-8 sm:mt-12">
                  <h3 className="mb-5 text-base font-bold text-navy-900 sm:text-lg">{L(content.statsTitle, lang)}</h3>
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    {stats.map((stat) => (
                      <StatCard key={`${stat.value}-${L(stat.label, 'ar')}`} stat={stat} lang={lang} />
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>

        {/* صورة الفريق — يسار في RTL */}
        <Reveal direction="end" duration={0.78} delay={0.1} className="relative order-1 min-h-[16rem] sm:min-h-[20rem] lg:order-2 lg:min-h-full">
          <img
            src={aboutTeamImage}
            alt={L(content.imageAlt, lang)}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/15 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-ink/50"
            aria-hidden="true"
          />
        </Reveal>
      </div>
    </section>
  )
}
