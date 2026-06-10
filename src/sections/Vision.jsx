import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal'
import { useLang, L } from '../i18n'

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
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -left-10 top-1/4 h-40 w-40 rounded-full bg-primary-500/20 blur-[80px]" />

      <div className="container-x">
        <div className="mb-12 text-center">
          <Reveal>
            <span className="eyebrow">{t('vision.eyebrow')}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="heading-lg mt-4 text-navy-900">
              {t('vision.titleA')} <span className="text-gradient-primary">{t('vision.titleB')}</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* الصورة */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] border border-primary-200/70 shadow-[0_40px_120px_-50px_rgba(189,154,104,0.5)] lg:aspect-[5/4]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slide.key}
                  src={slide.image}
                  alt={L(slide.eyebrow, lang)}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* النص الخاص بكل صورة */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.key}
                initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: lang === 'ar' ? -20 : 20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5"
              >
                <span className="eyebrow">{L(slide.eyebrow, lang)}</span>
                <h3 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                  {L(slide.title, lang)}
                </h3>

                {slide.text && (
                  <p className="text-base leading-relaxed text-navy-700 sm:text-lg">
                    {L(slide.text, lang)}
                  </p>
                )}

                {slide.points && (
                  <ul className="space-y-3">
                    {L(slide.points, lang).map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-gradient text-white">
                          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="text-navy-700">{point}</span>
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
