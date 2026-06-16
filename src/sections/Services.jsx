import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'
import { useLang, L } from '../i18n'
import { motionConfig, revealFromBottom, revealToVisible, revealTransition, revealViewport } from '../utils/motion'

import bgTexture from '../../images/imgi_99_MMG-Re-Brand-Presentation_pages-to-jpg-0015-scaled-e1748253692652.jpg'
import iconDeveloper from '../../images/imgi_41_developer.png'
import iconHook from '../../images/imgi_45_hook-3.png'
import iconShelf from '../../images/imgi_37_shelf.png'

const services = [
  {
    icon: iconDeveloper,
    title: { ar: 'التطوير العقاري', en: 'Real Estate Development' },
    description: {
      ar: 'نسعى لتقديم مشروعات عقارية عالية الجودة تلبي تطلعات عملائنا، مع التركيز على الأمان والثقة في كل خطوة من خطوات التطوير.',
      en: 'We strive to deliver high-quality real estate projects that meet our clients’ aspirations, with a focus on security and trust at every stage of development.',
    },
  },
  {
    icon: iconHook,
    title: { ar: 'المقاولات والإنشاءات', en: 'Contracting & Construction' },
    description: {
      ar: 'نلتزم في إنجاز مشروعاتنا بأعلى معايير الجودة والكفاءة، مع الالتزام بالمواعيد الزمنية والتكلفة المتفق عليها.',
      en: 'We commit to completing our projects to the highest standards of quality and efficiency, while honoring agreed timelines and budgets.',
    },
  },
  {
    icon: iconShelf,
    title: { ar: 'التشطيبات', en: 'Finishing & Interiors' },
    description: {
      ar: 'نقدم أعمال تشطيبات عالية الجودة تضيف لمسة فاخرة للمشروعات، لضمان تجربة سكنية راقية تلبي أعلى توقعات عملائنا.',
      en: 'We provide high-quality finishing works that add a luxurious touch to every project, ensuring a refined living experience that exceeds expectations.',
    },
  },
]

export default function Services() {
  const { lang, t } = useLang()

  return (
    <section className="relative overflow-hidden bg-ink py-16 sm:py-20 lg:py-24">
      {/* Textured dark background */}
      <div className="absolute inset-0">
        <img
          src={bgTexture}
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(202,161,63,0.12),transparent_55%)]" />
      </div>

      <div className="container-x relative">
        <SectionTitle className="mb-12 sm:mb-14">{t('services.title')}</SectionTitle>

        <div className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((service, i) => (
            <motion.article
              key={L(service.title, lang)}
              initial={revealFromBottom()}
              whileInView={revealToVisible}
              viewport={revealViewport}
              transition={revealTransition(i * motionConfig.stagger)}
              className="group flex flex-col items-center bg-surface px-6 py-10 text-center shadow-[0_24px_70px_-40px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_34px_90px_-40px_rgba(202,161,63,0.35)] sm:px-8 sm:py-12"
            >
              <div className="mb-6 flex h-24 w-24 items-center justify-center transition-transform duration-500 group-hover:scale-110 sm:h-28 sm:w-28">
                <img
                  src={service.icon}
                  alt=""
                  className="h-full w-full object-contain"
                  aria-hidden="true"
                />
              </div>
              <h3 className="heading-sm text-navy-900">
                {L(service.title, lang)}
              </h3>
              <p className="mt-4 max-w-xs body-sm text-muted">
                {L(service.description, lang)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
