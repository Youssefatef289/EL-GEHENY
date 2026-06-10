import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import SectionReveal from '../components/SectionReveal'
import CTA from '../sections/CTA'
import aboutHero from '../../images/about-hero-banner.png'
import { useLang, L } from '../i18n'

const quickValues = {
  ar: [
    'الجودة في كل تفصيلة',
    'الالتزام والشفافية',
    'احترام استثمارات العملاء',
    'الابتكار والتطوير المستمر',
    'بناء مجتمعات مستدامة',
  ],
  en: [
    'Quality in every detail',
    'Commitment and transparency',
    'Respect for clients’ investments',
    'Continuous innovation and development',
    'Building sustainable communities',
  ],
}

const coreValues = [
  {
    title: { ar: 'التميّز', en: 'Excellence' },
    text: {
      ar: 'نسعى دائماً إلى تقديم أعلى مستويات الجودة في التصميم والتنفيذ والخدمات.',
      en: 'We always strive to deliver the highest levels of quality in design, execution, and services.',
    },
    icon: <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z" />,
  },
  {
    title: { ar: 'النزاهة', en: 'Integrity' },
    text: {
      ar: 'نعمل بشفافية كاملة ونبني علاقات طويلة الأمد قائمة على الثقة.',
      en: 'We work with full transparency and build long-term relationships based on trust.',
    },
    icon: <path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zm0 12.5a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />,
  },
  {
    title: { ar: 'الالتزام', en: 'Commitment' },
    text: {
      ar: 'نحترم تعهداتنا ونضع رضا العميل في مقدمة أولوياتنا.',
      en: 'We honor our commitments and put client satisfaction at the top of our priorities.',
    },
    icon: <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z" />,
  },
  {
    title: { ar: 'الابتكار', en: 'Innovation' },
    text: {
      ar: 'نبحث باستمرار عن حلول أكثر ذكاءً وكفاءة في التطوير العقاري.',
      en: 'We constantly seek smarter and more efficient solutions in real estate development.',
    },
    icon: <path d="M12 2a7 7 0 00-4 12.7V17a1 1 0 001 1h6a1 1 0 001-1v-2.3A7 7 0 0012 2zM9 20a1 1 0 001 1h4a1 1 0 001-1v-1H9v1z" />,
  },
  {
    title: { ar: 'الاستدامة', en: 'Sustainability' },
    text: {
      ar: 'نؤمن بأهمية بناء مجتمعات قادرة على النمو والاستمرار للأجيال القادمة.',
      en: 'We believe in building communities capable of growing and lasting for future generations.',
    },
    icon: <path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11zm0 17a4 4 0 01-4-4c0-2 1-4 4-7 3 3 4 5 4 7a4 4 0 01-4 4z" />,
  },
]

export default function About() {
  const { t, lang } = useLang()
  return (
    <>
      <PageHeader
        eyebrow={t('about.heroEyebrow')}
        title={t('about.heroTitle')}
        description={t('about.heroDesc')}
        breadcrumb={[{ label: t('project.breadcrumbHome'), to: '/' }, { label: t('about.heroEyebrow') }]}
        image={aboutHero}
        imageAlt={t('about.heroTitle')}
        fullImage
      />

      {/* نبذة عن الشركة */}
      <SectionReveal from="left">
      <section className="section-pad">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-3xl border border-primary-200/70">
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80"
                alt={t('about.heroTitle')}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-100/60 to-transparent" />
              <div className="absolute bottom-6 right-6 glass-primary rounded-2xl px-6 py-4">
                <p className="font-display text-3xl font-extrabold text-gradient-primary">+35</p>
                <p className="text-sm text-navy-700">{t('about.yearsBadge')}</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal>
              <span className="eyebrow">{t('about.introEyebrow')}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="heading-lg text-navy-900">
                {t('about.introTitleA')} <span className="text-gradient-primary">{t('about.introTitleB')}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-navy-700">{t('about.introP1')}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="leading-relaxed text-navy-700">{t('about.introP2')}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {quickValues[lang].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-navy-800">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-gradient text-white">
                      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* وعدنا */}
        <div className="container-x mt-12">
          <Reveal>
            <div className="glass-primary relative overflow-hidden rounded-3xl p-8 sm:p-10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-500/20 blur-3xl" />
              <span className="eyebrow border-primary-200 bg-primary-100 text-primary-600">{t('about.promiseLabel')}</span>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-navy-800">
                {t('about.promiseText')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      </SectionReveal>

      {/* قيمنا الأساسية */}
      <SectionReveal from="right">
      <section className="section-pad bg-navy-50/40">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('about.valuesEyebrow')}
            title={t('about.valuesTitle')}
            description={t('about.valuesDesc')}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="group h-full rounded-3xl border border-primary-200/70 bg-white/85 p-8 shadow-[0_24px_70px_-50px_rgba(15,23,34,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-300 hover:shadow-[0_32px_80px_-45px_rgba(189,154,104,0.4)]">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 ring-1 ring-primary-300 transition-colors group-hover:bg-primary-gradient group-hover:text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                      {value.icon}
                    </svg>
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold text-navy-900">{L(value.title, lang)}</h3>
                  <p className="text-sm leading-relaxed text-navy-700">{L(value.text, lang)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      </SectionReveal>

      {/* الرؤية والرسالة */}
      <SectionReveal from="left">
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('about.vmEyebrow')}
            title={t('about.vmTitle')}
            description={t('about.vmDesc')}
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal direction="right">
              <div className="glass-primary relative h-full overflow-hidden rounded-3xl p-10">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-500/20 blur-3xl" />
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-gradient text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                    <path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zm0 12.5a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold text-navy-900">{t('about.visionTitle')}</h3>
                <p className="leading-relaxed text-navy-700">{t('about.visionText')}</p>
              </div>
            </Reveal>

            <Reveal direction="left">
              <div className="glass relative h-full overflow-hidden rounded-3xl p-10">
                <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary-400/20 blur-3xl" />
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 ring-1 ring-primary-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                    <path d="M3 13h2l3 7 4-16 3 9h6v2h-7l-2-6-4 14L6 15H3z" />
                  </svg>
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold text-navy-900">{t('about.missionTitle')}</h3>
                <p className="leading-relaxed text-navy-700">{t('about.missionText')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      </SectionReveal>

      <SectionReveal from="right">
        <CTA />
      </SectionReveal>
    </>
  )
}
