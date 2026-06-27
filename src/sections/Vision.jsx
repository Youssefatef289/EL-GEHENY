import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { useLang, L } from '../i18n'
import { motionConfig, revealFromBottom, revealToVisible, revealTransition } from '../utils/motion'

import visionImage from '../../images/Our vision.jpeg'

const KASHIDA = '\u0640'

/** يطوّل الكلمة عمودياً: رسالتنا → رسالتنــــــــــــا */
function stretchArabicVertical(word, length = 44) {
  if (!word.endsWith('ا')) return word
  return `${word.slice(0, -1)}${KASHIDA.repeat(length)}ا`
}

const slides = [
  {
    key: 'vision',
    eyebrow: { ar: 'رؤيتنا للمستقبل', en: 'Our Vision for the Future' },
    verticalLabel: { ar: 'رؤيتنا', en: 'VISION' },
    titleA: { ar: 'نُطوّر العقار لنُطوّر', en: 'We develop real estate to elevate' },
    titleB: { ar: 'جودة الحياة', en: 'quality of life' },
    gradientB: true,
  },
  {
    key: 'values',
    eyebrow: { ar: 'قيمنا', en: 'Our Values' },
    verticalLabel: { ar: 'قيمنا', en: 'VALUES' },
    titleA: { ar: 'قيم تصنع الفارق', en: 'Values that make the difference' },
    titleB: null,
    gradientB: false,
  },
  {
    key: 'message',
    eyebrow: { ar: 'رسالتنا', en: 'Our Mission' },
    verticalLabel: { ar: 'رسالتنا', en: 'MISSION' },
    titleA: { ar: 'التزام تجاه عملائنا', en: 'A commitment to our clients' },
    titleB: null,
    gradientB: false,
  },
]

export default function Vision({ showCta = true }) {
  const { t, lang } = useLang()
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return undefined
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [reduceMotion])

  const slide = slides[index]
  const verticalText =
    lang === 'ar'
      ? stretchArabicVertical(L(slide.verticalLabel, lang))
      : L(slide.verticalLabel, lang)

  return (
    <section id="vision" className="relative w-full overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -left-10 top-1/3 h-56 w-56 rounded-full bg-primary-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 end-0 h-48 w-48 rounded-full bg-primary-500/8 blur-[90px]" />

      <div className="grid w-full lg:min-h-[min(88vh,820px)] lg:grid-cols-2">
        {/* صورة — عرض كامل */}
        <Reveal direction="start" duration={0.78} className="relative order-1 min-h-[20rem] sm:min-h-[24rem] lg:min-h-full">
          <img
            src={visionImage}
            alt={L(slide.eyebrow, lang)}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-ink/10 lg:bg-gradient-to-l lg:from-ink/50 lg:via-ink/15 lg:to-transparent"
            aria-hidden="true"
          />

          <div
            className="absolute inset-y-0 start-0 z-10 flex w-14 items-center justify-center bg-black/60 backdrop-blur-[3px] sm:w-16 lg:w-[4.75rem]"
            aria-label={L(slide.verticalLabel, lang)}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={slide.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                className="max-h-[88%] select-none whitespace-nowrap px-1 font-sans text-[0.95rem] font-extrabold leading-none text-white sm:text-base lg:text-lg [writing-mode:vertical-rl] rotate-180"
              >
                {verticalText}
              </motion.span>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* نص السلاider */}
        <Reveal direction="end" duration={0.78} delay={0.1} className="order-2 flex items-center border-t border-white/10 lg:border-t-0 lg:border-s lg:border-white/10">
          <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16 xl:px-16 2xl:px-20">
            <div className="mx-auto w-full max-w-xl lg:mx-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.key}
                  initial={revealFromBottom()}
                  animate={revealToVisible}
                  exit={{ opacity: 0, y: -20 }}
                  transition={revealTransition(0, motionConfig.duration)}
                  className="min-h-[9.5rem] space-y-4 sm:min-h-[10.5rem] sm:space-y-5"
                >
                  <SectionTitle as="h2" className="mb-2" reveal={false}>
                    {L(slide.eyebrow, lang)}
                  </SectionTitle>

                  <h3 className="heading-lg max-w-xl text-navy-900 lg:max-w-2xl lg:text-4xl xl:text-[2.65rem]">
                    {L(slide.titleA, lang)}
                    {slide.titleB && (
                      <>
                        {' '}
                        <span className={slide.gradientB ? 'text-gradient-primary' : ''}>
                          {L(slide.titleB, lang)}
                        </span>
                      </>
                    )}
                  </h3>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex items-center gap-2.5 sm:mt-12">
                {slides.map((s, i) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={L(s.eyebrow, lang)}
                    aria-current={i === index ? 'true' : undefined}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-8 bg-primary-gradient' : 'w-2.5 bg-primary-200 hover:bg-primary-300'
                    }`}
                  />
                ))}
              </div>

              {showCta && (
                <div className="mt-8 sm:mt-10">
                  <Link to="/about" className="btn-primary">
                    {t('vision.cta')}
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 rtl:rotate-180" aria-hidden="true">
                      <path
                        d="M19 12H5M12 19l-7-7 7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
