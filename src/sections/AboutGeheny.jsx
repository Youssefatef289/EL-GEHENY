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

// الإحصائية الكبيرة (سنوات الخبرة)
const bigStat = {
  value: 35,
  suffix: '+',
  label: { ar: 'سنة من الخبرة', en: 'Years of experience' },
}

// الإحصائيات الجانبية
const sideStats = [
  { value: 500, suffix: '+', label: { ar: 'عميل واثق', en: 'Confident clients' } },
  { value: 100, suffix: '+', label: { ar: 'مشروع منجز', en: 'Completed projects' } },
  { value: 0.5, suffix: { ar: ' مليار', en: 'B' }, decimals: 1, label: { ar: 'حجم استثماراتنا', en: 'Investment volume' } },
]

function CountValue({ value, decimals = 0, className }) {
  const { ref, formatted } = useCountUp(value, { duration: 2200, decimals })
  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  )
}

export default function AboutGeheny() {
  const { lang } = useLang()

  return (
    <section className="section-pad relative overflow-hidden">
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
              <h2 className="heading-lg text-navy-900">
                {L(content.titleA, lang)}{' '}
                <span className="text-gradient-primary">{L(content.titleB, lang)}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl font-display text-lg font-bold leading-relaxed text-navy-900 sm:text-xl lg:mx-0">
                {L(content.p1, lang)}
              </p>
            </Reveal>
            <Reveal delay={0.13}>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-600 sm:text-lg lg:mx-0">
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
                    <span className="text-sm font-semibold text-navy-800">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* الإحصائيات */}
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
                {/* الرقم الكبير */}
                <div className="flex items-baseline gap-1">
                  <CountValue
                    value={bigStat.value}
                    className="font-display text-6xl font-extrabold leading-none text-gradient-primary sm:text-7xl"
                  />
                  <span className="font-display text-3xl font-extrabold text-gradient-primary">
                    {bigStat.suffix}
                  </span>
                </div>
                <div className="text-start">
                  <p className="max-w-[7rem] text-sm font-semibold leading-snug text-navy-500">
                    {L(bigStat.label, lang)}
                  </p>
                </div>

                {/* فاصل */}
                <span className="hidden h-16 w-px bg-navy-200/70 sm:block" />

                {/* الإحصائيات الجانبية */}
                <div className="space-y-3">
                  {sideStats.map((stat) => (
                    <div key={L(stat.label, lang)} className="flex items-baseline gap-2">
                      <span className="flex items-baseline font-display text-2xl font-extrabold text-navy-900">
                        <CountValue value={stat.value} decimals={stat.decimals || 0} />
                        <span className="text-primary-500">{L(stat.suffix, lang)}</span>
                      </span>
                      <span className="text-sm font-semibold text-navy-500">{L(stat.label, lang)}</span>
                    </div>
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
