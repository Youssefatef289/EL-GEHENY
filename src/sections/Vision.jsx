import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { useLang, L } from '../i18n'

import { motionConfig, revealFromBottom, revealToVisible, revealTransition } from '../utils/motion'
import visionImage from '../../images/Our vision.png'
import valuesImage from '../../images/Our values.png'
import messageImage from '../../images/Our message.png'

const slides = [
  {
    key: 'values',
    image: valuesImage,
    eyebrow: { ar: 'قيمنا', en: 'Our Values' },
    title: { ar: 'قيم تصنع الفارق', en: 'Values that make the difference' },
    points: {
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
    },
  },
  {
    key: 'vision',
    image: visionImage,
    eyebrow: { ar: 'رؤيتنا', en: 'Our Vision' },
    title: { ar: 'نحو مستقبل أكثر قيمة', en: 'Toward a more valuable future' },
    text: {
      ar: 'أن نكون من أكثر شركات التطوير العقاري موثوقية وتأثيراً في السوق المصري، من خلال تطوير مجتمعات سكنية واستثمارية ترتقي بجودة الحياة وتحقق قيمة مستدامة للأفراد والمستثمرين.',
      en: 'To be among the most trusted and influential real estate development companies in the Egyptian market, by developing residential and investment communities that elevate quality of life and deliver sustainable value for individuals and investors.',
    },
  },
  {
    key: 'message',
    image: messageImage,
    eyebrow: { ar: 'رسالتنا', en: 'Our Mission' },
    title: { ar: 'التزام تجاه عملائنا', en: 'A commitment to our clients' },
    text: {
      ar: 'نطوّر مشروعات عقارية تجمع بين جودة التنفيذ، والابتكار، والمواقع الواعدة، لنقدم تجربة سكنية واستثمارية تحقق تطلعات عملائنا وتحافظ على قيمة استثماراتهم على المدى الطويل.',
      en: 'We develop real estate projects that combine quality execution, innovation, and promising locations, to deliver a residential and investment experience that meets our clients’ aspirations and preserves the value of their investments over the long term.',
    },
  },
]

export default function Vision() {
  const { t, lang } = useLang()
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [reduceMotion])

  const slide = slides[index]

  return (
    <section className="section-pad relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -left-10 top-1/4 h-40 w-40 rounded-full bg-primary-500/20 blur-[80px]" />

      <div className="container-x">
        <div className="mb-12">
          <SectionTitle className="mb-4">{t('vision.eyebrow')}</SectionTitle>
          <Reveal delay={0.05}>
            <h3 className="section-subtitle">
              {t('vision.titleA')} <span className="text-gradient-primary">{t('vision.titleB')}</span>
            </h3>
          </Reveal>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* الصورة - سلايدر ينزلق من الجانب */}
          <div className="relative order-1 lg:order-2 lg:-mx-8">
            <div className="relative aspect-square w-full overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.img
                  key={slide.key}
                  src={slide.image}
                  alt={L(slide.eyebrow, lang)}
                  loading="lazy"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 h-full w-full object-contain "
                />
              </AnimatePresence>
            </div>
          </div>

          {/* النص الخاص بكل صورة */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.key}
                initial={revealFromBottom()}
                animate={revealToVisible}
                exit={{ opacity: 0, y: -16 }}
                transition={revealTransition(0, motionConfig.duration)}
                className="space-y-5"
              >
                <SectionTitle as="h3" className="mb-1" reveal={false}>
                  {L(slide.eyebrow, lang)}
                </SectionTitle>
                <h4 className="heading-md text-navy-900">
                  {L(slide.title, lang)}
                </h4>

                {slide.text && (
                  <p className="body-md text-body">
                    {L(slide.text, lang)}
                  </p>
                )}

                {slide.points && (
                  <ul className="space-y-3">
                    {L(slide.points, lang).map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 gold-check h-6 w-6 flex-shrink-0 shadow-gold-sm">
                          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="body-sm text-body">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>

            {/* مؤشرات الشرائح */}
            <div className="mt-8 flex items-center gap-2.5">
              {slides.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setIndex(i)}
                  aria-label={L(s.eyebrow, lang)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-primary-gradient' : 'w-2.5 bg-primary-200 hover:bg-primary-300'
                  }`}
                />
              ))}
            </div>

            <div className="mt-8">
              <Link to="/about" className="btn-primary">
                {t('vision.cta')}
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
