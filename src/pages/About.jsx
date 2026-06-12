import Reveal from '../components/Reveal'
import SectionReveal from '../components/SectionReveal'
import AboutGeheny from '../sections/AboutGeheny'
import Vision from '../sections/Vision'
import CTA from '../sections/CTA'
import { useLang, L } from '../i18n'

import aboutHero from '../../images/projects/j290/00.jpg'

const whyReasons = [
  {
    title: { ar: 'خبرة حقيقية', en: 'Real experience' },
    text: {
      ar: 'خبرة متراكمة بدأت منذ عام 1990 في تنفيذ وتطوير مشروعات متنوعة داخل مصر.',
      en: 'Accumulated experience since 1990 in executing and developing diverse projects across Egypt.',
    },
    icon: <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z" />,
  },
  {
    title: { ar: 'مواقع واعدة', en: 'Promising locations' },
    text: {
      ar: 'نختار مواقع مشروعاتنا بعناية لضمان أعلى قيمة سكنية واستثمارية.',
      en: 'We carefully choose our project locations to ensure the highest residential and investment value.',
    },
    icon: <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />,
  },
  {
    title: { ar: 'جودة تنفيذ', en: 'Quality execution' },
    text: {
      ar: 'نلتزم باستخدام أفضل الخامات ومعايير البناء الحديثة لتحقيق أعلى مستويات الجودة.',
      en: 'We commit to the best materials and modern building standards to achieve the highest quality.',
    },
    icon: <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z" />,
  },
  {
    title: { ar: 'ثقة تُبنى على الالتزام', en: 'Trust built on commitment' },
    text: {
      ar: 'نؤمن أن الثقة تُكتسب بالإنجاز، لذلك نلتزم بالشفافية وجودة التنفيذ واحترام مواعيد التسليم.',
      en: 'We believe trust is earned through achievement, so we commit to transparency, quality, and on-time delivery.',
    },
    icon: <path d="M12 1l9 4v6c0 5-3.8 9.4-9 11-5.2-1.6-9-6-9-11V5l9-4zm0 2.2L5 6.3V11c0 3.9 2.9 7.4 7 8.9 4.1-1.5 7-5 7-8.9V6.3L12 3.2z" />,
  },
]

const whyHeading = {
  eyebrow: { ar: 'لماذا الجهيني؟', en: 'Why El-Geheny?' },
  title: { ar: 'أسباب تجعلنا خيارك الأول', en: 'Reasons that make us your first choice' },
}

function VideoHero() {
  const { t } = useLang()
  return (
    <section className="relative isolate flex min-h-[72svh] flex-col justify-end overflow-hidden pt-28 pb-14 sm:min-h-[82svh]">
      <img
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={aboutHero}
        alt=""
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/35" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-ink/70 to-transparent" />

      <div className="container-x relative">
        <Reveal>
          <span className="eyebrow mb-5 border-white/20 bg-white/10 text-white">{t('about.heroEyebrow')}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="heading-xl max-w-4xl text-white">{t('about.heroTitle')}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {t('about.heroDesc')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default function About() {
  const { lang } = useLang()

  return (
    <>
      <VideoHero />

      {/* نبذة عن الجهيني */}
      <SectionReveal from="left">
        <AboutGeheny />
      </SectionReveal>

      {/* لماذا الجهيني */}
      <SectionReveal from="right">
        <section className="section-pad bg-navy-50/40">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow mb-4">{L(whyHeading.eyebrow, lang)}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="heading-lg mx-auto max-w-3xl text-navy-900">{L(whyHeading.title, lang)}</h2>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {whyReasons.map((reason, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="group flex h-full items-start gap-5 rounded-3xl border border-primary-200/70 bg-surface/85 p-7 shadow-[0_24px_70px_-50px_rgba(15,23,34,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-300 hover:shadow-[0_32px_80px_-45px_rgba(189,154,104,0.4)]">
                    <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 ring-1 ring-primary-300 transition-colors group-hover:bg-primary-gradient group-hover:text-white">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                        {reason.icon}
                      </svg>
                    </span>
                    <div>
                      <h3 className="mb-2 font-display text-xl font-bold text-navy-900">{L(reason.title, lang)}</h3>
                      <p className="text-sm leading-relaxed text-navy-700">{L(reason.text, lang)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* رؤيتنا للمستقبل */}
      <SectionReveal from="left">
        <Vision />
      </SectionReveal>

      <SectionReveal from="right">
        <CTA />
      </SectionReveal>
    </>
  )
}
