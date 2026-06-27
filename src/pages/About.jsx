import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import SectionReveal from '../components/SectionReveal'
import ImagePageHero from '../components/ImagePageHero'
import CompanyBrief from '../sections/CompanyBrief'
import AboutGeheny from '../sections/AboutGeheny'
import AboutTeam from '../sections/AboutTeam'
import Heritage from '../sections/Heritage'
import Vision from '../sections/Vision'
import CTA from '../sections/CTA'
import { company } from '../data/site'
import { useLang, L } from '../i18n'

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
  eyebrow: { ar: 'لماذا الجهيني للتطوير العقاري؟', en: 'Why El-Geheny Real Estate Development?' },
  title: { ar: 'أسباب تجعلنا خيارك الأول', en: 'Reasons that make us your first choice' },
}

function AboutHero() {
  const { t, lang } = useLang()
  const sinceLabel = lang === 'ar' ? `منذ عام ${company.since}` : `Since ${company.since}`

  return (
    <ImagePageHero
      eyebrow={t('about.heroEyebrow')}
      title={t('about.heroTitle')}
      description={t('about.heroDesc')}
      imageAlt={t('about.heroEyebrow')}
      compact
    >
      <div className="flex flex-wrap justify-center gap-3">
        <span className="label-caps border-primary-500/40 bg-primary-500/15 text-primary-100 backdrop-blur-md">
          {sinceLabel}
        </span>
        <span className="label-caps border-white/15 bg-white/10 text-white/90 backdrop-blur-md">
          {L(company.slogan, lang)}
        </span>
      </div>
    </ImagePageHero>
  )
}

export default function About() {
  const { lang } = useLang()

  return (
    <>
      <AboutHero />

      {/* من نحن */}
      <SectionReveal>
        <AboutGeheny />
      </SectionReveal>

      {/* فريق القيادة */}
      <SectionReveal>
        <AboutTeam />
      </SectionReveal>

      {/* نبذة عن الشركة */}
      <SectionReveal>
        <CompanyBrief />
      </SectionReveal>

      {/* إرثنا */}
      <SectionReveal>
        <Heritage />
      </SectionReveal>

      {/* لماذا الجهيني */}
      <SectionReveal>
        <section className="section-pad">
          <div className="container-x">
            <SectionTitle className="mb-4">{L(whyHeading.eyebrow, lang)}</SectionTitle>
            <Reveal delay={0.05}>
              <h2 className="section-subtitle">{L(whyHeading.title, lang)}</h2>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {whyReasons.map((reason, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="group flex h-full items-start gap-5 rounded-3xl border border-primary-200/70 bg-surface/85 p-7 shadow-[0_24px_70px_-50px_rgba(15,23,34,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-300 hover:shadow-[0_32px_80px_-45px_rgba(202,161,63,0.4)]">
                    <span className="hover-gold-metallic flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500 ring-1 ring-primary-500/25 transition-all duration-300">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                        {reason.icon}
                      </svg>
                    </span>
                    <div>
                      <h3 className="card-title mb-2 text-navy-900">{L(reason.title, lang)}</h3>
                      <p className="body-sm text-body">{L(reason.text, lang)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* رؤيتنا للمستقبل */}
      <SectionReveal>
        <Vision />
      </SectionReveal>

      <SectionReveal>
        <CTA />
      </SectionReveal>
    </>
  )
}
